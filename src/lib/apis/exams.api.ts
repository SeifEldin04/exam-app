export async function getExamsBySubject(subjectId: string) {
  const response = await fetch(`/api/exams?subject=${subjectId}`);

  const payload: ApiResponse<{ exams: Exam[] }> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
