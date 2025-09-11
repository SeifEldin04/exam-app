declare type Answer = {
  answer: string;
  key: string;
};

declare type Question = {
  answers: Answer[];
  type: "single_choice" | "multiple_choice";
  question: string;
  correct: string;
  subject:
    | ({
        name: string;
        icon: string;
      } & DatabaseProperties)
    | null;
  exam: Exam;
} & DatabaseProperties;
