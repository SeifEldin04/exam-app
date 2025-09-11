"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isAccountPage = segments[0] === "account";

  const trail = isAccountPage
    ? ["Home", "Account"]
    : [
        "Home",
        ...(segments.length >= 1 ? ["Exams"] : []),
        ...(segments.length >= 2 ? ["Questions"] : []),
      ];

  return (
    <div className="ml-96 text-gray-400 bg-white p-4 flex gap-2 items-center">
      {trail.map((item, idx) => {
        const isLast = idx === trail.length - 1;
        return (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <span>/</span>}
            <span
              className={
                isLast ? "text-blue-600 font-medium capitalize" : "capitalize"
              }
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
