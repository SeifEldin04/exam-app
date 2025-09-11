"use client";

import useExams from "@/hooks/exams/use-exams";
import { Loader2, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type FetchExamsProps = {
  subjectId?: string;
};

export default function FetchExams({ subjectId }: FetchExamsProps) {
  // Hooks
  const { isLoading, error, exams } = useExams(subjectId || "");
  const router = useRouter();

  //   Navigation to questions
  function questionsNavigate(examSubject: string, examId: string) {
    router.push(`/${examSubject}/${examId}`);
  }

  // Remove timer from localstorage Effect
  useEffect(() => {
    return () => {
      localStorage.removeItem("examEndTime");
    };
  }, []);

  // loading & error
  if (isLoading)
    return (
      <div className="bg-white m-6 p-6 flex items-center justify-center">
        <Loader2 className="text-blue-600 animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="bg-white m-6 p-6 flex items-center justify-center">
        <p className="text-red-600">Error loading exams</p>
      </div>
    );

  return exams.length > 0 ? (
    // page (2) [ Exams ]

    // Exam List
    <div className="bg-white m-6 p-6">
      {exams.map((exam) => (
        <div
          key={exam._id}
          className="p-4 border-b flex justify-between bg-blue-50 hover:bg-blue-100 duration-100 cursor-pointer"
          onClick={() => questionsNavigate(exam.subject, exam._id)}
        >
          <div>
            <h2 className="text-xl font-semibold mb-1 text-blue-600">
              {exam.title}
            </h2>
            <p className="text-gray-500 text-sm">
              {exam.numberOfQuestions} Questions
            </p>
          </div>

          <p className="text-gray-500 text-sm flex items-center">
            {" "}
            <Timer /> Duration: {exam.duration} minutes
          </p>
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-white m-6 p-6">
      <p className="text-gray-500">No exams found for this subject.</p>
    </div>
  );
}
