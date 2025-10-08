import React from "react";
import elevateLogo from "../../../../../puplic/assets/elevate 2.png";
import userProfile from "../../../../../puplic/assets/user profile.jpg";
import Image from "next/image";
import { FolderCode } from "lucide-react";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/auth";
import SidebarLinks from "./_components/sidebar-links";
import SidebarDropdown from "./_components/sidebar-dropdown";

export default async function Sidebar() {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <main className="flex flex-col h-screen w-96 bg-blue-50 fixed py-10 px-10">
      {/* elevate logo */}
      <div className="logo w-48">
        <Image
          src={elevateLogo}
          className="w-full mt-0"
          alt="elevate exams logo"
        />

        <div className="flex items-center gap-4 mt-3">
          <FolderCode className="fill-blue-600 stroke-none w-10 h-10" />
          <span className="text-blue-600 font-semibold text-xl">Exam App</span>
        </div>
      </div>

      {/* sidebar */}
      <div className="flex flex-col h-full justify-between w-full mt-16">
        {/* sidebar links */}
        <SidebarLinks />

        {/* user information */}
        <div className="flex gap-3">
          <div className="w-14 h-14 border overflow-hidden border-blue-600">
            <Image src={userProfile} className="w-full" alt="" />
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
  );
}
