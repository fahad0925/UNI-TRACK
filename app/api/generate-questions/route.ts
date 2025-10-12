// app/api/generate/route.ts

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { questions as storedQuestions } from "@/app/constants/questions";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

// Helper Functions (Unchanged as they are logically sound)

/** Detects trivial math questions like 2+2 */
function isTrivialMath(q: string): boolean {
  const short = q.length < 15;
  const arithmetic = /\b\d+\s*[\+\-\*\/]\s*\d+\b/.test(q);
  return short || arithmetic;
}

/** Allocates a total number across a distribution proportionally */
function allocateByDistribution(
  distribution: Record<string, number>,
  total: number
): Record<string, number> {
  const entries = Object.entries(distribution);
  const sum = entries.reduce((s, [, v]) => s + v, 0);

  if (sum === 0) return {};

  const exacts = entries.map(([k, v]) => {
    const exact = (v / sum) * total;
    const base = Math.floor(exact);
    const frac = exact - base;
    return { k, base, frac };
  });

  const allocated: Record<string, number> = {};
  let baseSum = exacts.reduce((s, e) => s + e.base, 0);
  let remainder = total - baseSum;

  exacts.sort((a, b) => b.frac - a.frac);

  for (const e of exacts) {
    allocated[e.k] = e.base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
  }
  return allocated;
}

/** Ensures a minimum number of questions, repeating from the start if necessary */
function ensureMinimumQuestions(qs: any[], min: number): any[] {
  if (qs.length >= min) return qs.slice(0, min);
  if (qs.length === 0) return []; // Cannot create questions from nothing

  let out = [...qs];
  let i = 0;
  while (out.length < min) {
    // Create a new object to avoid reference issues and allow for new IDs
    out.push({ ...qs[i % qs.length] });
    i++;
  }
  return out;
}

/** Parses question data robustly from a string that might be malformed */
function parseQuestionsFromContent(content: string): any[] {
  if (!content || !content.trim()) return [];

  try {
    // First, try parsing the whole content as a JSON object or array
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
    // Handle cases where the array is nested, e.g., { "questions": [...] }
    if (parsed && typeof parsed === "object") {
      const key = Object.keys(parsed).find((k) => Array.isArray(parsed[k]));
      if (key) return parsed[key];
      return [parsed];
    }
  } catch {
    // If full parse fails, try to find a JSON array substring
    const firstBracket = content.indexOf("[");
    const lastBracket = content.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      try {
        const jsonArrayString = content.slice(firstBracket, lastBracket + 1);
        const arr = JSON.parse(jsonArrayString);
        if (Array.isArray(arr)) return arr;
      } catch {}
    }
  }
  // If all else fails, return empty
  return [];
}

/**
 * **NEW & REFACTORED CORE LOGIC**
 * Fetches questions for a single subject, with built-in fallback and sanitization.
 */
async function getQuestionsForSubject(
  subject: string,
  count: number
): Promise<any[]> {
  let parsed: any[] = [];

  // 1. Attempt to fetch from Groq AI
  try {
    console.log(
      `🧠 Attempting to fetch ${count} questions for "${subject}" from Groq...`
    );
    const prompt = `Generate exactly ${count} multiple-choice questions for the subject: "${subject}". The level should be for a Pakistani University admission test (like ECAT/MDCAT). Focus on concepts from Class 11 & 12. Ensure at least 25% of questions are "hard".

STRICT OUTPUT FORMAT:
Your entire response MUST be a single, valid JSON array of objects. Do not include any text, explanations, or markdown formatting outside of this array.
Example format for each object:
{
  "question": "What is the powerhouse of the cell?",
  "options": ["Mitochondria", "Nucleus", "Ribosome", "Chloroplast"],
  "correct": "Mitochondria",
  "difficulty": "easy"
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawContent = response?.choices?.[0]?.message?.content ?? "";
    parsed = parseQuestionsFromContent(rawContent);
    if (parsed.length > 0) {
      console.log(
        `✅ Successfully fetched and parsed ${parsed.length} questions for "${subject}" from Groq.`
      );
    } else {
      console.warn(
        `⚠️ Groq returned an empty or unparsable response for "${subject}".`
      );
    }
  } catch (err) {
    console.error(`❌ Groq API error for subject "${subject}":`, err);
    parsed = []; // Ensure parsed is empty on error to trigger fallback
  }

  // 2. Fallback to stored questions if Groq failed
  if (parsed.length === 0) {
    console.warn(`🛡️ Using stored questions as a fallback for "${subject}".`);
    const stored = storedQuestions.find(
      (q) => q.subject.toLowerCase() === subject.toLowerCase()
    );
    parsed = stored ? stored.questions : [];
    if (parsed.length === 0) {
      console.error(
        `‼️ CRITICAL: No stored questions found for fallback on subject "${subject}".`
      );
    }
  }

  // 3. Sanitize and validate the questions
  const sanitized = parsed
    .map((q: any) => ({
      subject: subject,
      question: q.question || "Missing question text",
      options:
        Array.isArray(q.options) && q.options.length >= 2
          ? q.options
          : ["Option A", "Option B", "Option C", "Option D"],
      correct: q.correct || q.options?.[0],
      difficulty: q.difficulty || "medium",
    }))
    .filter((q) => q.options.includes(q.correct)) // Ensure correct answer is one of the options
    .filter(
      (q) =>
        subject.toLowerCase() !== "mathematics" || !isTrivialMath(q.question)
    );

  // 4. Ensure we meet the required count, repeating questions if necessary
  return ensureMinimumQuestions(sanitized, count);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const subject = (body.subject || "").toString().trim();
    const clientTotal = Math.max(10, Number(body.total) || 30); // Default to 30, min 10

    if (!subject) {
      return NextResponse.json(
        { error: "No subject provided" },
        { status: 400 }
      );
    }

    const allSubjectKeywords = ["fast", "ned", "dow", "nust", "all subjects"];
    const isAllSubjects = allSubjectKeywords.some((keyword) =>
      subject.toLowerCase().includes(keyword)
    );

    let allQuestions: any[] = [];

    if (isAllSubjects) {
      const baseDistribution = {
        Physics: 1,
        Biology: 1,
        Chemistry: 1,
        English: 1,
        Analytical: 1,
        Mathematics: 1,
        IQ: 1,
      };
      const allocation = allocateByDistribution(baseDistribution, clientTotal);

      console.log(
        `🚀 Generating a test with multiple subjects. Total: ${clientTotal}`,
        allocation
      );

      // Fetch all subjects in parallel for speed
      const promises = Object.entries(allocation).map(([subj, count]) =>
        getQuestionsForSubject(subj, count)
      );

      const results = await Promise.all(promises);
      allQuestions = results.flat(); // Combine arrays of questions
    } else {
      console.log(
        `🚀 Generating a single-subject test for "${subject}". Total: ${clientTotal}`
      );
      allQuestions = await getQuestionsForSubject(subject, clientTotal);
    }

    // Final step: Assign unique IDs to the entire question list
    const finalQuestions = allQuestions.map((q, i) => ({ ...q, id: i + 1 }));

    if (finalQuestions.length === 0) {
      console.error(
        `‼️ Final question list is empty for subject: "${subject}". This should not happen.`
      );
      return NextResponse.json(
        { error: "Failed to generate or find any questions." },
        { status: 500 }
      );
    }

    return NextResponse.json({ subject, questions: finalQuestions });
  } catch (error: any) {
    console.error("❌ Unhandled API Error in generate route:", error);
    return NextResponse.json(
      { error: error?.message || "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
