"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function SidebarDropdown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical className="w-full text-gray-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/account">
            <DropdownMenuItem>
              <div className="flex items-center gap-2 text-gray-800">
                <UserRound /> Account
              </div>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <div className="flex items-center gap-2 text-red-600">
              <LogOut /> Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
