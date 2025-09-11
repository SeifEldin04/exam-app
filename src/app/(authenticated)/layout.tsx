// Athenticated Layout

import Header from "../../components/layout/exam/header";
import Sidebar from "../../components/layout/exam/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-96">{children}</main>
    </>
  );
}
