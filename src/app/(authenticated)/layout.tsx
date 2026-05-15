// Athenticated Layout

"use client";

import { useState } from "react";
import Header from "../../components/layout/header";
import Sidebar from "../../components/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Header toggleSidebar={toggleSidebar} />

      <main className="lg:ml-96">{children}</main>
    </>
  );
}
