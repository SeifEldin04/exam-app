export async function getSubjects(page = 1, limit = 6) {
  const response = await fetch(
    `https://exam-app-opal.vercel.app/api/subjects?page=${page}&limit=${limit}`
  );

  const payload: ApiResponse<PaginatedResponse<{ subjects: Subject[] }>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
