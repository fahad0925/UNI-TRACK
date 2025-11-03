import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
  name?: string;
};

export async function POST(req: Request) {
  try {
    const { message, history } = (await req.json()) as {
      message: string;
      history?: ChatMessage[];
    };

    const messages: ChatMessage[] = [
      {
        role: "system",
        content: `
          You are a highly knowledgeable assistant. 
          Always try to answer the user question clearly and completely. 
          If the user asks for data like university admission fees, provide it if you know it. 
          If you don’t know the exact answer, give a helpful estimate or guidance on where to find it. 
          If the user asks to compare two things (like universities), explain the comparison in detail. 
          Be friendly, concise, and natural.
        `,
      },
      ...(history || []),
      { role: "user", content: message },
    ];

    const chat = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: messages as any,
      temperature: 0.6, // slightly lower for consistency
      max_tokens: 1024, // allow longer answers
    });

    const reply =
      chat.choices?.[0]?.message?.content?.trim() ??
      "I’m sorry, I don’t know that, but I can help you find out.";

    return new NextResponse(reply, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    return new NextResponse("Error: " + String(error), {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
