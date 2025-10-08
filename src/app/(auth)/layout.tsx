import AuthSideInfo from "./_components/auth-side-info";

// Auth Layout
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="grid grid-cols-2 h-full">
      {/* Left side (sidebar) */}
      <AuthSideInfo />

      {/* Right side ( login | register | forgot password )*/}
      {children}
    </div>
  );
}
