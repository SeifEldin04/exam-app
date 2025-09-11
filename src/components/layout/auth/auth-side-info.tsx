import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import React from "react";

export default function AuthSideInfo() {
  return (
    <div className="relative w-1/2 bg-gradient-to-br from-white to-blue-50 overflow-hidden">
      {/*  right circle */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-400 rounded-full blur-[140px] opacity-70"></div>

      {/*  left circle */}
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-50"></div>

      <div className="my-28 mx-32">
        <div className="flex items-center gap-4">
          <FolderCode className="fill-blue-600 stroke-none w-10 h-10" />

          <span className="text-blue-600 font-semibold text-xl">Exam App</span>
        </div>

        <div className="mt-36">
          <h1 className="font-bold text-3xl text-black font-inter">
            Empower your learning journey with our smart exam platform.
          </h1>

          <div className="mt-16">
            <div className="flex items-start gap-7">
              <div className="border-2 p-1 border-blue-600">
                <Brain className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-blue-600 font-semibold text-xl">
                  Tailored Diplomas
                </h3>
                <p className="mt-2 text-gray-700">
                  Choose from specialized tracks like Frontend, Backend, and
                  Mobile Development .
                </p>
              </div>
            </div>

            <div className="flex items-start gap-7 mt-7">
              <div className="border-2 p-1 border-blue-600">
                <BookOpenCheck className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-blue-600 font-semibold text-xl">
                  Focused Exams
                </h3>
                <p className="mt-2 text-gray-700">
                  Access topic-specific tests including HTML, CSS, JavaScript,
                  and more.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-7 mt-7">
              <div className="border-2 p-1 border-blue-600">
                <RectangleEllipsis className="text-blue-600" />
              </div>

              <div>
                <h3 className="text-blue-600 font-semibold text-xl">
                  Smart Multi-Step Forms
                </h3>
                <p className="mt-2 text-gray-700">
                  Choose from specialized tracks like Frontend, Backend, and
                  Mobile Development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
