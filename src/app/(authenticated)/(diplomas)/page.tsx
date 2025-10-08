import React from "react";
import Title from "../../../components/layout/title";
import { GraduationCap } from "lucide-react";
import FetchSubjects from "./_components/fetch-subjects";

export default async function Page() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <Title title="Diplomas" icon={<GraduationCap className="w-11 h-11" />} />

      <div className="p-6 grid grid-cols-3 gap-4">
        <FetchSubjects />
      </div>
    </main>
  );
}
