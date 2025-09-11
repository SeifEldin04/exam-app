"use client";

import { getSubjects } from "@/lib/apis/subjects.api";
import { useQuery } from "@tanstack/react-query";

export default function useSubjects() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => getSubjects(),
  });

  return { isLoading, error, subjects: data?.subjects || [] };
}
