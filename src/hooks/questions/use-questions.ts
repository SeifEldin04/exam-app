import { getQuestionsByExamId } from "@/lib/apis/question.api";
import { useQuery } from "@tanstack/react-query";

export default function useQuestions(examId: string) {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["questions", examId],
    queryFn: async () => getQuestionsByExamId(examId),
  });

  return { isLoading, error, questions: data?.questions || [] };
}
