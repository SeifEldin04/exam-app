export async function getSubjects(page = 1, limit = 6) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMMAIN}/subjects?page=${page}&limit=${limit}`
  );

  const payload: ApiResponse<PaginatedResponse<{ subjects: Subject[] }>> =
    await response.json();

  if ("code" in payload) {
    throw new Error(payload.message);
  }

  return payload;
}
