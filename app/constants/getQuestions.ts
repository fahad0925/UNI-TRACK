export const fetchQuestionsBySubject = async (subject: string) => {
  const res = await fetch("/api/generate-questions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject }),
  });

  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
};
