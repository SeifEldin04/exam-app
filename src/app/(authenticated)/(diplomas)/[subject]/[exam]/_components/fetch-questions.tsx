"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ChevronLeft,
  ChevronRight,
  FolderSearch,
  Loader,
  Loader2,
  RotateCcw,
} from "lucide-react";
import React, { useRef, useState } from "react";
import useQuestions from "../../../../../../hooks/questions/use-questions";
import { SubmitHandler, useForm } from "react-hook-form";
import { AnswerFields, ExamSchema } from "@/lib/schemas/exam.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ExamDuration from "./exam-duration";
import useCheckQuestions from "@/hooks/questions/use-check-questions";
import { useRouter } from "next/navigation";
import { ResultChart } from "./result-chart";

// props type
interface FetchQuestionProps {
  examId: string;
}

export default function FetchQuestions({ examId }: FetchQuestionProps) {
  // Hooks
  const { isLoading, error, questions } = useQuestions(examId);
  const { isPending, checkQuestions } = useCheckQuestions();
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<AnswerFields>({
    resolver: zodResolver(ExamSchema),
  });

  // Variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<CheckResponse | null>(null);

  //   Submit handler
  const onSubmit: SubmitHandler<AnswerFields> = (values) => {
    checkQuestions(values, {
      onSuccess: (data) => {
        setResult(data);
        setShowResult(true);
      },
    });
  };

  // Next handler function
  const handleNext = () => {
    if (currentIndex === questions.length - 1) return;

    const nextAnswer = form.getValues(`answers.${currentIndex + 1}`);

    if (!nextAnswer?.correct) {
      setAnswer("");
    } else {
      setAnswer(nextAnswer.correct);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  // Prev handler function
  const handlePrev = () => {
    const prevAnswer = form.getValues(`answers.${currentIndex - 1}`);

    if (!prevAnswer?.correct) {
      setAnswer("");
    } else {
      setAnswer(prevAnswer.correct);
    }

    setCurrentIndex((prev) => prev - 1);
  };

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
        <p className="text-red-600">Error loading Questions</p>
      </div>
    );

  return (
    <>
      {/* page (3) [ Questions ] */}

      <div className="bg-white p-6 m-6">
        {/* Header */}

        {/* Question Number */}
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-500 text-sm">
            {" "}
            Frontend Development - {questions[0]?.exam.title}{" "}
          </p>
          <p className="text-gray-500 text-sm">
            {" "}
            Question <span className="text-blue-600">
              {" "}
              {currentIndex + 1}{" "}
            </span>{" "}
            of <span className="text-blue-600"> {questions.length} </span>
          </p>
        </div>

        {/* Progress Bar */}
        <Progress
          value={((currentIndex + 1) / questions.length) * 100}
          className="mb-10 bg-blue-50 text-blue-600"
        />

        {/* Result Modal */}
        {showResult && result && (
          <div className="bg-white p-6 m-6">
            <h1 className="text-2xl font-semibold text-blue-600 mb-6">
              Results :
            </h1>

            <div className="flex gap-4">
              {/* Chart */}
              <div className="h-[293px] mt-10">
                <ResultChart />
              </div>

              {/* Incorrect Questions */}
              {result.WrongQuestions.length === 0 ? (
                <p className="text-green-600">All answers correct!</p>
              ) : (
                <ul className="space-y-4 p-4 w-full h-[514px] border overflow-y-auto">
                  {result.WrongQuestions.map((q) => (
                    <li key={q.QID}>
                      <p className="font-semibold text-xl text-blue-600 mb-3">
                        {q.Question}
                      </p>

                      <div className="p-4 bg-red-50 text-sm rounded-md">
                        <span className="flex items-center gap-2">
                          <RadioGroup>
                            <RadioGroupItem value="" checked />
                          </RadioGroup>
                          <span>{q.inCorrectAnswer}</span>
                        </span>
                      </div>

                      <div className="p-4 bg-emerald-50 text-sm mt-3 rounded-md">
                        <span className="flex items-center gap-2">
                          <RadioGroup>
                            <RadioGroupItem value="" />
                          </RadioGroup>
                          <span>{q.correctAnswer}</span>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between gap-6 mt-10">
              <Button
                onClick={() => {
                  router.push("/");
                }}
                type="button"
                className="w-1/2 bg-gray-200 hover:bg-gray-300"
              >
                <RotateCcw /> Restart
              </Button>

              <Button
                onClick={() => {
                  router.push("/");
                }}
                type="button"
                className="w-1/2"
              >
                <FolderSearch /> Explore
              </Button>
            </div>
          </div>
        )}

        {!showResult && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
              <FormField
                control={form.control}
                name={`answers.${currentIndex}`}
                render={({ field }) => (
                  <FormItem>
                    {/* Label || Question */}
                    <FormLabel className="text-2xl font-semibold text-blue-600 mb-4">
                      {currentQuestion?.question}
                    </FormLabel>

                    {/* Options */}
                    <FormControl>
                      <RadioGroup
                        disabled={isPending}
                        className="space-y-2"
                        name={currentQuestion?._id}
                        value={answer}
                        onValueChange={(value) => {
                          setAnswer(value);

                          field.onChange({
                            questionId: currentQuestion?._id,
                            correct: value,
                          });
                        }}
                      >
                        {currentQuestion?.answers.map((answer) => (
                          <FormItem key={answer.key}>
                            <FormControl>
                              <label
                                htmlFor={answer.key}
                                className="p-4 bg-gray-50 text-gray-800 text-sm hover:bg-gray-100 flex items-center gap-3 rounded-md cursor-pointer"
                              >
                                <RadioGroupItem
                                  id={answer.key}
                                  value={answer.key}
                                />
                                <span>{answer.answer}</span>
                              </label>
                            </FormControl>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Navigation */}
              <div className="flex justify-between gap-6 mt-10">
                {/* Prev */}
                <Button
                  onClick={handlePrev}
                  disabled={isPending || currentIndex === 0}
                  type="button"
                  className="w-1/2 bg-gray-200 hover:bg-gray-300 text-black"
                >
                  <ChevronLeft /> Previous
                </Button>

                {/* Timer */}
                <ExamDuration
                  duration={questions[0].exam.duration}
                  onTimeChange={(date) =>
                    form.setValue("time", date.getMinutes())
                  }
                  timerEnded={() => {
                    formRef.current?.requestSubmit();
                  }}
                />

                {/* Next */}
                <Button
                  disabled={(() => {
                    if (isPending) return true;

                    const currentAnswer = form.getValues(
                      `answers.${currentIndex}`
                    );

                    if (currentAnswer?.correct) return false;

                    return true;
                  })()}
                  type={
                    currentIndex < questions.length - 1 ? "button" : "submit"
                  }
                  onClick={handleNext}
                  className="w-1/2"
                >
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>
                      Next <ChevronRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </>
  );
}
