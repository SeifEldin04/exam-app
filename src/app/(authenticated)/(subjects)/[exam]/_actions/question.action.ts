"use server";

import { AnswerFields } from "@/lib/schemas/exam.schema";
import getToken from "@/lib/utils/get-token.server";

export async function CheckQuestionAction(fields: AnswerFields) {
  const token = await getToken();

  const response = await fetch(`${process.env.API}/questions/check`, {
    method: "POST",
    body: JSON.stringify(fields),
    headers: {
      "Content-Type": "application/json",
      token: `${token?.accesstoken}`,
    },
  });

  const payload: ApiResponse<CheckResponse> = await response.json();
  return payload;
}
