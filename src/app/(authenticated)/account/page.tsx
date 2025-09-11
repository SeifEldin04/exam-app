import React from "react";
import Title from "../../../components/layout/exam/title";
import { UserRound } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import AccountSettingsClient from "./_components/account-settings-client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Title
        title="Account Settings"
        icon={<UserRound className="w-11 h-11" />}
      />

      <div className="p-6 flex gap-6 h-full">
        <AccountSettingsClient session={session} />
      </div>
    </main>
  );
}
