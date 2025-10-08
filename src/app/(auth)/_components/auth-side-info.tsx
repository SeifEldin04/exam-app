import {
  BookOpenCheck,
  Brain,
  FolderCode,
  RectangleEllipsis,
} from "lucide-react";
import React from "react";

export default function AuthSideInfo() {
  // Variables
  const features = [
    {
      icon: <Brain />,
      title: "Tailored Diplomas",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development .",
    },
    {
      icon: <BookOpenCheck />,
      title: "Focused Exams",
      description:
        "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
    },
    {
      icon: <RectangleEllipsis />,
      title: "Smart Multi-Step Forms",
      description:
        "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
    },
  ];

  return (
    <aside className="py-20 px-32 flex flex-col items-center justify-center relative bg-gradient-to-br from-white to-blue-50 overflow-hidden min-h-screen">
      {/*  right circle */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-400 rounded-full blur-[140px] opacity-70"></div>

      {/*  left circle */}
      <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-50"></div>

      {/* Header */}
      <header className="w-full max-w-[28.5rem] font-semibold text-xl text-blue-600 flex items-center gap-2.5 mb-[15%]">
        <FolderCode className="text-blue-600" /> Exam App
      </header>

      {/* Content */}
      <div className="text-blue-600 space-y-16 max-w-[28.5rem]">
        {/* Headline */}
        <p className="font-bold font-inter text-3xl text-gray-800">
          {" "}
          Empower your learning journey with our smart exam platform.{" "}
        </p>

        {/* Features */}
        <ul className="flex flex-col gap-9">
          {features.map((feature, i) => (
            <li key={i} className="flex gap-5">
              {/* Icon */}
              <span className="size-9 flex items-center justify-center border border-blue-600 shrink-0">
                {feature.icon}
              </span>

              <div className="flex flex-col gap-2.5">
                {/* Title */}
                <p className="font-semibold text-xl">{feature.title}</p>

                {/* Description */}
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
