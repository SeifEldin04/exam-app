"use client";

import { getExams } from "@/lib/apis/exams.api";
import { useQuery } from "@tanstack/react-query";

export default function useExams() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["exams"],
    queryFn: () => getExams(),
  });

  return { isLoading, error, exams: data?.exams || [] };
}
