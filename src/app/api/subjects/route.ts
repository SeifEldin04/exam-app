// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const token = await getToken({ req });

//     if (!token || !token.accesstoken) {
//       return NextResponse.json(
//         { code: 401, message: "Unauthorized - No valid token" },
//         { status: 401 }
//       );
//     }

//     const { searchParams } = new URL(req.url);
//     const limit = searchParams.get("limit") || "4";
//     const page = searchParams.get("page") || "1";

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API}/subjects?limit=${limit}&page=${page}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           token: `${token.accesstoken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           code: response.status,
//           message: `External API error: ${response.statusText}`,
//         },
//         { status: response.status }
//       );
//     }

//     const payload: ApiResponse<PaginatedResponse<{ subjects: Subject[] }>> =
//       await response.json();

//     return NextResponse.json(payload, { status: 200 });
//   } catch (error) {
//     console.error("Subjects API Route Error:", error);
//     return NextResponse.json(
//       { code: 500, message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

"use server";

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // جيب التوكن من السيشن
    const token = await getToken({ req });

    if (!token || !token.accesstoken) {
      return NextResponse.json(
        { code: 401, message: "Unauthorized - No valid token" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "6";

    // استدعاء الـ API الخارجي على السيرفر
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/subjects?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          token: `${token.accesstoken}`,
        },
      }
    );

    const payload = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { code: response.status, message: payload.message || "Error" },
        { status: response.status }
      );
    }

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Subjects API Route Error:", error);
    return NextResponse.json(
      { code: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
}
