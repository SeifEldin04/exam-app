"use client";

import { getExamsBySubject } from "@/lib/apis/exams.api";
import { useQuery } from "@tanstack/react-query";

export default function useExams(subjectId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exams", subjectId],
    queryFn: () => getExamsBySubject(subjectId),
  });

  return { isLoading, error, exams: data?.exams || [] };
}
