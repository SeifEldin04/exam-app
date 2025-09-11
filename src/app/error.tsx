"use client";

import { useEffect } from "react";
import ErrorUI from "@/components/layout/exam/error-paragraph";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Error message */}
      <ErrorUI message={error.message || "Something went wrong"} />

      {/* Error button */}
      <Button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try agin
      </Button>
    </div>
  );
}
