// app/api/generate/route.ts
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

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

/** parse questions robustly */
function parseQuestionsFromContent(content: string, subject: string) {
  const questions: any[] = [];
  if (!content || !content.trim()) return [];

  try {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === "object") return [parsed];
  } catch {}

  // JSON array substring
  const firstBracket = content.indexOf("[");
  const lastBracket = content.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try {
      const arr = JSON.parse(content.slice(firstBracket, lastBracket + 1));
      if (Array.isArray(arr)) return arr;
    } catch {}
  }

  // NDJSON / line by line fallback
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  for (const rawLine of lines) {
    try {
      const obj = JSON.parse(rawLine);
      if (obj && typeof obj === "object") {
        questions.push(obj);
        continue;
      }
    } catch {}

    const allObjMatches = [...rawLine.matchAll(/\{[\s\S]*?\}/g)];
    for (const m of allObjMatches) {
      try {
        questions.push(JSON.parse(m[0]));
      } catch {}
    }
  }

  // ✅ If still nothing → fallback question
  if (questions.length === 0) {
    questions.push({
      id: 1,
      subject,
      question: "No question generated. (Fallback)",
      options: ["A", "B", "C", "D"],
      correct: "A",
    });
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
      Physics: 60,
      Biology: 40,
      Chemistry: 30,
      English: 20,
      Analytical: 20,
      Mathematics: 40,
    };

    const TOTAL_DEFAULT_ALL = 20;
    const TOTAL_DEFAULT_SINGLE = 20;

    let allQuestions: any[] = [];

    if (isAllSubjects) {
      const total = clientTotal || TOTAL_DEFAULT_ALL;
      const allocation = allocateByDistribution(baseDistribution, total);

      for (const [subj, count] of Object.entries(allocation)) {
        const prompt = `Generate exactly ${count} multiple-choice questions for subject: "${subj}".
Strict rules:
- Return a JSON array only (one array with all objects).
- Each object: { "id": number, "question": string, "options": ["..."], "correct": "..." }.
- Options = exactly 4 unique, correct ∈ options.
- No explanations, no extra text, only JSON.
- Questions should be at Pakistani University admission test level (ECAT/MDCAT/NTS level). Content drawn from Class 11 & 12 textbooks.
- Mix difficulty (easy/medium/hard) and ensure at least 25% hard conceptual questions across the set.`;

        try {
          const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
          });

          const raw = response?.choices?.[0]?.message?.content ?? "";
          let parsed = parseQuestionsFromContent(raw, subj);

          // ✅ Always return at least one question
          if (!parsed.length) {
            parsed = [
              {
                id: 1,
                subject: subj,
                question: "No question generated. (Fallback)",
                options: ["A", "B", "C", "D"],
                correct: "A",
              },
            ];
          }

          const startIndex = allQuestions.length;
          const sanitized = parsed.map((q: any, i: number) => ({
            id: startIndex + i + 1,
            subject: subj,
            question: q.question ?? "Missing question",
            options:
              Array.isArray(q.options) && q.options.length === 4
                ? q.options
                : ["A", "B", "C", "D"],
            correct:
              q.correct && q.options?.includes(q.correct) ? q.correct : "A",
          }));

          allQuestions.push(...sanitized);
        } catch (err) {
          console.error("❌ Groq error for subject", subj, err);
          allQuestions.push({
            id: allQuestions.length + 1,
            subject: subj,
            question: "Error generating question for " + subj,
            options: ["A", "B", "C", "D"],
            correct: "A",
          });
        }
      }
    } else {
      const total = clientTotal || TOTAL_DEFAULT_SINGLE;
      const prompt = `Generate exactly ${total} multiple-choice questions for subject: "${subject}".
Strict rules:
- Return a JSON array only.
- Each object: { "id": number, "question": string, "options": ["..."], "correct": "..." }.
- Options = exactly 4 unique, correct ∈ options.
- No explanations, no extra text, only JSON.
- Questions should be at Pakistani University admission test level (ECAT/MDCAT/NTS level). Content drawn from Class 11 & 12 textbooks.
- Mix difficulty (easy/medium/hard) and ensure at least 25% hard conceptual questions across the set.`;

      try {
        const response = await groq.chat.completions.create({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        });

        const raw = response?.choices?.[0]?.message?.content ?? "";
        let parsed = parseQuestionsFromContent(raw, subject);

        if (!parsed.length) {
          parsed = [
            {
              id: 1,
              subject,
              question: "No question generated. (Fallback)",
              options: ["A", "B", "C", "D"],
              correct: "A",
            },
          ];
        }

        allQuestions = parsed.map((q: any, i: number) => ({
          id: i + 1,
          subject,
          question: q.question ?? "Missing question",
          options:
            Array.isArray(q.options) && q.options.length === 4
              ? q.options
              : ["A", "B", "C", "D"],
          correct:
            q.correct && q.options?.includes(q.correct) ? q.correct : "A",
        }));
      } catch (err) {
        console.error("❌ Groq error single subject:", err);
        allQuestions = [
          {
            id: 1,
            subject,
            question: "Error generating question for " + subject,
            options: ["A", "B", "C", "D"],
            correct: "A",
          },
        ];
      }
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
