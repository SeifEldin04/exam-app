// import getToken from "@/lib/utils/get-token.server";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const token = await getToken();

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
//       `${process.env.API}/subjects?limit=${limit}&page=${page}`,
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

// app/api/subjects/route.ts
import { NextRequest, NextResponse } from "next/server";
import getToken from "@/lib/utils/get-token.server";

export async function GET(req: NextRequest) {
  const token = await getToken(); // هذا يقرأ التوكن من الكوكيز
  if (!token?.accesstoken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "6";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/subjects?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
        token: `${token.accesstoken}`,
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
