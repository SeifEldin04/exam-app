export async function getExamsBySubject(subjectId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/exams?subject=${subjectId}`
  );

  const payload: ApiResponse<{ exams: Exam[] }> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
