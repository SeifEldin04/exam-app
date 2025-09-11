import { CheckQuestionAction } from "@/app/(authenticated)/(diplomas)/[subject]/[exam]/_actions/question.action";
import { AnswerFields } from "@/lib/schemas/exam.schema";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useCheckQuestions() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: AnswerFields) => {
      const payload = await CheckQuestionAction(fields);

      if ("code" in payload) throw new Error(payload.message);

      return payload;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { isPending, error, checkQuestions: mutate };
}
