import AuthSideInfo from "@/components/layout/auth/auth-side-info";

// Auth Layout
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-auto min-h-screen">
      {/* left side (info) */}
      <AuthSideInfo />

      {/* Auth Forms */}
      {children}
    </div>
  );
}
