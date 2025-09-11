import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || !token.accesstoken) {
      return NextResponse.json(
        { code: 401, message: "Unauthorized - No valid token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || "4";
    const page = searchParams.get("page") || "1";

    const response = await fetch(
      `${process.env.API}/subjects?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token.accesstoken as string,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          code: response.status,
          message: `External API error: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const payload: ApiResponse<PaginatedResponse<{ subjects: Subject[] }>> =
      await response.json();

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Subjects API Route Error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
