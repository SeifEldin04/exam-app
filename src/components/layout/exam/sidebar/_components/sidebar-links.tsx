"use client";

import { GraduationCap, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarLinks() {
  const links = [
    { href: "/", label: "Diplomas", icon: <GraduationCap /> },
    { href: "/account", label: "Account Settings", icon: <UserRound /> },
  ];

  const pathname = usePathname();

  return (
    <ul>
      {links.map((link) => {
        const isActive =
          (pathname === "/account" && link.href === "/account") ||
          (pathname !== "/account" && link.href === "/");

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`flex gap-3 py-5 px-3 cursor-pointer ${
                isActive
                  ? "bg-blue-100 border-2 border-blue-500 text-blue-600"
                  : "hover:bg-blue-100 text-gray-500"
              }`}
            >
              {link.icon} {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
