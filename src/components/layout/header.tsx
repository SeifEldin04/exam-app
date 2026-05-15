// "use client";

// import { usePathname } from "next/navigation";

// type PageProps = {
//   toggleSidebar: () => void;
// };

// export default function Header(toggleSidebar: PageProps) {
//   const pathname = usePathname();
//   const segments = pathname.split("/").filter(Boolean);

//   const isAccountPage = segments[0] === "account";

//   const trail = isAccountPage
//     ? ["Home", "Account"]
//     : [
//         "Exams",
//         ...(segments.length >= 1 ? ["Questions"] : []),
//         // ...(segments.length >= 2 ? ["Questions"] : []),
//       ];

//   return (
//     <div className="ml-96 text-gray-400 bg-white p-4 flex gap-2 items-center">
//       {trail.map((item, idx) => {
//         const isLast = idx === trail.length - 1;
//         return (
//           <div key={idx} className="flex items-center gap-2">
//             {idx > 0 && <span>/</span>}
//             <span
//               className={
//                 isLast ? "text-blue-600 font-medium capitalize" : "capitalize"
//               }
//             >
//               {item}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const isAccountPage = segments[0] === "account";

  const trail = isAccountPage
    ? ["Home", "Account"]
    : ["Exams", ...(segments.length >= 1 ? ["Questions"] : [])];

  return (
    <div className="lg:ml-96 text-gray-400 bg-white p-4 flex gap-3 items-center">
      {/* Hamburger (mobile only) */}
      <button onClick={toggleSidebar} className="lg:hidden text-blue-600">
        <Menu className="w-6 h-6" />
      </button>

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
