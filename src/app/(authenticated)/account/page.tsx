import React from "react";
import Title from "../../../components/layout/title";
import { UserRound } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import AccountSettingsClient from "./_components/account-settings-client";
import { AccountSettings } from "@/lib/types/account-settings";

export default async function Page() {
  const session = await getServerSession(authOptions);

  // نحول session.user إلى النوع AccountSettings لو الجلسة موجودة
  const accountSettings: AccountSettings | null = session?.user
    ? (session.user as AccountSettings)
    : null;

  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Title
        title="Account Settings"
        icon={<UserRound className="w-11 h-11" />}
      />

      <div className="p-6 flex gap-6 h-full">
        <AccountSettingsClient session={accountSettings} />
      </div>
    </main>
  );
}
