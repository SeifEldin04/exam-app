"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CircleX, FolderCode, Menu, X } from "lucide-react";
import SidebarLinks from "./_components/sidebar-links";
import SidebarDropdown from "./_components/sidebar-dropdown";
import { useSession } from "next-auth/react";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const { data: session } = useSession();

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <main
        className={`
        fixed top-0 left-0 h-screen w-80 bg-blue-50 pb-10 pt-5 px-6
        flex flex-col transition-transform duration-300
        lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:w-96
        z-40
      `}
      >
        {/* Close sidebar button */}
        <div
          className="lg:hidden flex justify-end text-blue-600 cursor-pointer"
          onClick={toggleSidebar}
        >
          <CircleX />
        </div>

        {/* elevate logo */}
        <div className="logo w-48">
          <div className="flex">
            <Image
              src="/assets/elevate.png"
              className="w-full mt-0"
              alt="elevate exams logo"
              width={200}
              height={200}
            />
          </div>

          <div className="flex items-center gap-4 mt-3">
            <FolderCode className="fill-blue-600 stroke-none w-10 h-10" />
            <span className="text-blue-600 font-semibold text-xl">
              Exam App
            </span>
          </div>
        </div>

        {/* sidebar */}
        <div className="flex flex-col h-full justify-between w-full mt-16">
          {/* sidebar links */}
          <SidebarLinks />

          {/* user information */}
          <div className="flex gap-3">
            <div className="w-14 h-14 border overflow-hidden border-blue-600">
              <Image
                src="/assets/userProfile.jpg"
                className="w-full"
                alt=""
                width={100}
                height={100}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <div>
                <h4 className="text-blue-600">{session?.user.firstName}</h4>
                <p className="text-gray-500 text-sm">{session?.user.email}</p>
              </div>

              {/* user dropdown */}
              <div className="w-4 h-4 mr-1">
                <SidebarDropdown />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
