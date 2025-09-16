// app/api/generate/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { questions as storedQuestions } from "@/app/constants/questions"; // ✅

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

/** Detect trivial math questions like 2+2 */
function isTrivialMath(q: string): boolean {
  const short = q.length < 15;
  const arithmetic = /\b\d+\s*[\+\-\*\/]\s*\d+\b/.test(q); // 2+2
  return short || arithmetic;
}

/** allocate totals across distribution proportionally */
function allocateByDistribution(
  distribution: Record<string, number>,
  total: number
) {
  const entries = Object.entries(distribution);
  const sum = entries.reduce((s, [, v]) => s + v, 0);

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

/** ensure minimum questions by repeating if needed */
function ensureMinimumQuestions(subject: string, qs: any[], min = 30) {
  if (qs.length >= min) return qs.slice(0, min);
  let out = [...qs];
  let i = 0;
  while (out.length < min && qs.length > 0) {
    out.push({ ...qs[i % qs.length], id: out.length + 1, subject });
    i++;
  }
  return out;
}

/** parse questions robustly */
function parseQuestionsFromContent(content: string) {
  if (!content || !content.trim()) return [];

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return [parsed];
  } catch {}

  const firstBracket = content.indexOf("[");
  const lastBracket = content.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try {
      const arr = JSON.parse(content.slice(firstBracket, lastBracket + 1));
      if (Array.isArray(arr)) return arr;
    } catch {}
  }

  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const questions: any[] = [];
  for (const rawLine of lines) {
    try {
      const obj = JSON.parse(rawLine);
      if (obj && typeof obj === "object") {
        questions.push(obj);
        continue;
      }
    } catch {}
  }

  return questions;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let subject = (body.subject || "").toString().trim();
    const clientTotal = Number(body.total) || undefined;

    if (!subject) {
      return NextResponse.json(
        { error: "No subject provided" },
        { status: 400 }
      );
    }

    const uniAllCodes = ["fast", "ned", "dow", "nust"];
    const isAllSubjects =
      uniAllCodes.includes(subject.toLowerCase()) ||
      /all subject/i.test(subject);

    const baseDistribution = {
      Physics: 30,
      Biology: 30,
      Chemistry: 30,
      English: 30,
      Analytical: 30,
      Mathematics: 30,
      IQ: 30,
    };

    const TOTAL_DEFAULT_ALL = 30;
    const TOTAL_DEFAULT_SINGLE = 30;

    let allQuestions: any[] = [];

    if (isAllSubjects) {
      const total = clientTotal || TOTAL_DEFAULT_ALL;
      const allocation = allocateByDistribution(baseDistribution, total);

      for (const [subj, count] of Object.entries(allocation)) {
        let parsed: any[] = [];

        try {
          const prompt = `Generate exactly ${count} multiple-choice questions for subject: "${subj}".

STRICT RULES:
- Level: Pakistani University admission test (ECAT/MDCAT/NTS), Class 11 & 12 curriculum.
- DO NOT include trivial math like 2+2, 3*4, or rote memory definitions.
- Focus on: Calculus, Algebra, Trigonometry, Probability, Matrices, Differentiation, Integration, etc.
- At least 25% must be "hard" — multi-step reasoning or conceptual.
- Format: JSON array only, each object like:
{
  "id": 1,
  "question": "What is the derivative of sin(x)?",
  "options": ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
  "correct": "cos(x)",
  "difficulty": "easy"
}
- No explanations, no text outside JSON.`;

          const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
          });

          const raw = response?.choices?.[0]?.message?.content ?? "";
          parsed = parseQuestionsFromContent(raw);
        } catch (err) {
          console.error("❌ Groq error for subject", subj, err);
        }

        // ✅ fallback
        if (!parsed || parsed.length === 0) {
          const stored = storedQuestions.find((q) => q.subject === subj);
          parsed = stored ? stored.questions : [];
        }

        // ✅ sanitize + filter trivial math
        let sanitized = parsed
          .map((q: any, i: number) => ({
            id: allQuestions.length + i + 1,
            subject: subj,
            question: q.question ?? "Missing question",
            options:
              Array.isArray(q.options) && q.options.length === 4
                ? q.options
                : ["A", "B", "C", "D"],
            correct:
              q.correct && q.options?.includes(q.correct) ? q.correct : "A",
            difficulty: q.difficulty ?? "medium",
          }))
          .filter(
            (q) =>
              subj.toLowerCase() !== "mathematics" || !isTrivialMath(q.question)
          );

        sanitized = ensureMinimumQuestions(subj, sanitized, count);
        allQuestions.push(...sanitized);
      }
    } else {
      const total = clientTotal || TOTAL_DEFAULT_SINGLE;
      let parsed: any[] = [];

      try {
        const prompt = `Generate exactly ${total} multiple-choice questions for subject: "${subject}".
Strict rules:
- Return a JSON array only.
- No trivial math (2+2, 3*4, etc).
- Each object: { "id": number, "question": string, "options": ["..."], "correct": "...", "difficulty": "easy|medium|hard" }
- Content must match Pakistani University admission test level (ECAT/MDCAT/NTS).`;

        const response = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        });

        const raw = response?.choices?.[0]?.message?.content ?? "";
        parsed = parseQuestionsFromContent(raw);
      } catch (err) {
        console.error("❌ Groq error single subject:", err);
      }

      if (!parsed || parsed.length === 0) {
        const stored = storedQuestions.find((q) => q.subject === subject);
        parsed = stored ? stored.questions : [];
      }

      allQuestions = ensureMinimumQuestions(
        subject,
        parsed
          .map((q: any, i: number) => ({
            id: i + 1,
            subject,
            question: q.question ?? "Missing question",
            options:
              Array.isArray(q.options) && q.options.length === 4
                ? q.options
                : ["A", "B", "C", "D"],
            correct:
              q.correct && q.options?.includes(q.correct) ? q.correct : "A",
            difficulty: q.difficulty ?? "medium",
          }))
          .filter(
            (q) =>
              subject.toLowerCase() !== "mathematics" ||
              !isTrivialMath(q.question)
          ),
        total
      );
    }

    return NextResponse.json({ subject, questions: allQuestions });
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
