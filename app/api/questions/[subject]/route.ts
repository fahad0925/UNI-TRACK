import { questions } from "@/app/constants/questions";
import { NextResponse } from "next/server";

interface Props {
  params: { subject: string };
}

export async function GET(_: Request, { params }: Props) {
  const { subject } = params;
  const subjectData = questions.find(
    (q) => q.subject.toLowerCase() === decodeURIComponent(subject).toLowerCase()
  );

  if (!subjectData) {
    return NextResponse.json({ error: "Subject not found" }, { status: 404 });
  }

  return NextResponse.json(subjectData);
}
