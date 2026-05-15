import React from "react";
import FetchQuestions from "./_components/fetch-questions";
import Title from "@/components/layout/title";
import { CircleQuestionMark } from "lucide-react";

type PageProps = {
  params: {
    exam: string;
  };
};

export default async function Page({ params }: PageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Title
        title={`Quiz Questions`}
        icon={<CircleQuestionMark className="w-11 h-11" />}
      />

      <FetchQuestions
        // subject={params.subject}
        examId={params.exam}
      />
    </main>
  );
}
