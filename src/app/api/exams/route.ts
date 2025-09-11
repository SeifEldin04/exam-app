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

    // Get the subject parameter from the URL
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");

    if (!subject) {
      return NextResponse.json(
        { code: 400, message: "Subject parameter is required" },
        { status: 400 }
      );
    }

    // Construct the URL with the subject parameter
    const apiUrl = `${process.env.API}/exams?subject=${subject}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: `${token?.accesstoken}` || "",
      },
    });

    // Check if the external API response is successful
    if (!response.ok) {
      return NextResponse.json(
        {
          code: response.status,
          message: `API request failed with status ${response.status}`,
        },
        { status: response.status }
      );
    }

    const payload: ApiResponse<PaginatedResponse<{ exams: Exam[] }>> =
      await response.json();

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
