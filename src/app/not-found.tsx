import Image from "next/image";
import React from "react";
import notFound from "../../puplic/assets/404.jpg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Not found image  */}
      <Image src={notFound} alt="404 not founded" className="w-3/4 h-1/2" />

      {/* Not found content */}
      <p className="mt-2 bg-blue-600 text-white w-full text-center py-2 text-2xl font-inter">
        {" "}
        Page is not found{" "}
      </p>
    </div>
  );
}
