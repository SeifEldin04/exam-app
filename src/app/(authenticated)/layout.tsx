// Athenticated Layout

import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <Header />

      <main className="ml-96">{children}</main>
    </>
  );
}
