export async function getExams() {
  const response = await fetch(`/api/exams`);

  const payload: ApiResponse<{ exams: Exam[] }> = await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
