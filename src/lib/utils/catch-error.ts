export default async function catchError<T>(
  callback: () => Promise<ApiResponse<T>>
): Promise<[SuccessResponse<T> | null, string | null]> {
  try {
    const payload = await callback();

    if ("code" in payload) throw new Error(payload.message);

    return [payload, null];
  } catch (error) {
    return [null, (error as Error).message];
  }
}
