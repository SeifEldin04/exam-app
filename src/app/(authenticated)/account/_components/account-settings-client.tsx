"use client";

import { useState } from "react";
import { CircleUserRound, Lock, LogOut } from "lucide-react";
import AccountSettingsForm from "./account-settings-form";
import AccountSettingsChangepassword from "./account-settings-changepassword";
import { signOut } from "next-auth/react";

export default function AccountSettingsClient({ session }: { session: any }) {
  const [activeTab, setActiveTab] = useState<"profile" | "changePassword">(
    "profile"
  );

  return (
    <>
      {/* Sidebar */}
      <div className="bg-white w-96 p-6 flex flex-col h-full justify-between">
        <div>
          <ul>
            <li
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-3 flex items-center gap-3 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <CircleUserRound /> Profile
            </li>

            <li
              onClick={() => setActiveTab("changePassword")}
              className={`px-5 py-3 flex items-center gap-3 cursor-pointer ${
                activeTab === "changePassword"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Lock /> Change Password
            </li>
          </ul>
        </div>

        <div>
          <div
            className="px-5 py-3 flex gap-3 bg-red-50 text-red-600 cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
          >
            <LogOut /> Logout
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full">
        {activeTab === "profile" && (
          <div className="bg-white p-6 w-full">
            <AccountSettingsForm session={session} />
          </div>
        )}

        {activeTab === "changePassword" && (
          <div className="bg-white p-6 w-full">
            <AccountSettingsChangepassword />
          </div>
        )}
      </div>
    </>
  );
}
