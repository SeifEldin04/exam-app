import AuthSideInfo from "./_components/auth-side-info";

// Auth Layout
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen p-5">
      {/* Left side (sidebar) */}
      <AuthSideInfo />

      {/* Right side ( login | register | forgot password )*/}
      {children}
    </div>
  );
}
