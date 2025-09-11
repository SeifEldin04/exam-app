export async function getQuestionsByExamId(examId: string) {
  const response = await fetch(`/api/questions?exam=${examId}`);

  const payload: ApiResponse<{ questions: Question[] }> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
