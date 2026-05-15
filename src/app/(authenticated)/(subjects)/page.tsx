import Title from "@/components/layout/title";
import { BookOpenCheck } from "lucide-react";
import React from "react";
import FetchExams from "./_components/fetch-exams";

export default function Page() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Title title="Exams" icon={<BookOpenCheck className="w-11 h-11" />} />
      <FetchExams />
    </main>
  );
}
