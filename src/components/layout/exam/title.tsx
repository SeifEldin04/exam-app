"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type TitleProps = {
  title: string;
  icon: React.ReactNode;
};

export default function Title({ title, icon }: TitleProps) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="flex items-center justify">
      {path !== "/" && (
        <div
          className="border border-blue-600 text-blue-600 py-7 px-3 mt-6 mx-6 cursor-pointer"
          onClick={() => router.back()}
        >
          <ChevronLeft />
        </div>
      )}

      <div
        className={`bg-blue-600 text-white p-5 mt-6 ${
          path === "/" ? "mx-6" : "mr-6"
        } w-full`}
      >
        <div className="flex gap-5 items-center">
          {icon}

          <h1 className="font-inter text-3xl font-semibold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
