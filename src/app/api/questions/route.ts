import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParam = req.nextUrl.searchParams;
    const token = await getToken({ req });

    if (!token || !token.accesstoken) {
      return NextResponse.json(
        { code: 401, message: "Unauthorized - No valid token" },
        { status: 401 }
      );
    }

    // Build the API URL with search parameters
    const apiUrl = `${process.env.API}/questions?${searchParam.toString()}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token.accesstoken as string,
      },
    });

    // Check if the external API response is successful
    if (!response.ok) {
      console.error(
        "External API error:",
        response.status,
        response.statusText
      );
      return NextResponse.json(
        {
          code: response.status,
          message: `External API error: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const payload: ApiResponse<{ questions: Question[] }> =
      await response.json();

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Questions API Route Error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
