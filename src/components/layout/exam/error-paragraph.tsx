import { CircleAlert, CircleX } from "lucide-react";
import React from "react";

type ErrorProps = {
  message: string;
};

export default function Error({ message }: ErrorProps) {
  return (
    <div className="relative border border-red-600 bg-red-50 my-9 p-3 text-sm rounded">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2  px-2">
        <CircleAlert className="fill-current text-white rounded-full">
          <CircleX className="text-red-600" />
        </CircleAlert>
      </div>

      <p className="text-center text-red-600">{message}</p>
    </div>
  );
}
