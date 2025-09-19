import Title from "@/components/layout/exam/title";
import { BookOpenCheck } from "lucide-react";
import React from "react";
import FetchExams from "./_components/fetch-exams";

type PageProps = {
  params: {
    subject: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Title title="Exams" icon={<BookOpenCheck className="w-11 h-11" />} />

      {/* Exams List */}
      <FetchExams subjectId={params.subject} />
    </main>
  );
}
