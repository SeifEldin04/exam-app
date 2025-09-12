// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export default async function getToken() {
//   const tokenCookie = cookies().get("next-auth.session-token")?.value;

//   if (!tokenCookie) return null;

//   try {
//     const jwt = await decode({
//       token: tokenCookie,
//       secret: process.env.NEXTAUTH_SECRET!,
//     });

//     return jwt;
//   } catch (error) {
//     console.error("JWT decode error:", error);

//     return null;
//   }
// }

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

export default async function getToken() {
  const session = await getServerSession(authOptions);

  // هنا المفروض تاخد الـ access token الفعلي من الـ session
  if (!session?.accessToken) return null;

  return {
    accesstoken: session.accessToken,
  };
}
