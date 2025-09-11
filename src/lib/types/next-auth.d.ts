import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  // خصائص المستخدم اللي هتجيلك من الـ provider
  interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    accessToken: string;
  }

  // بنحدد Session هنا بشكل واضح بدل ما نخليه يطابق User مباشرة
  interface Session {
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: string;
      isVerified: boolean;
      createdAt: string;
    };
    accessToken?: string; // اختياري لو حبيت تمرر التوكن في السيشن
  }
}

declare module "next-auth/jwt" {
  // هنا نضيف خصائص إضافية بدل ما نخليه فارغ
  interface JWT extends Record<string, unknown> {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    accessToken: string;
  }
}
