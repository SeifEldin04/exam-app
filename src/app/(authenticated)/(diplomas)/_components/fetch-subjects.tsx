"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/apis/subjects.api";

export default function FetchSubjects() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data: payload,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["subjects"],
    queryFn: ({ pageParam }) => getSubjects(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage === lastPage.metadata.numberOfPages) {
        return undefined;
      }
      return lastPage.metadata.currentPage + 1;
    },
  });

  console.log("Environment Check:", {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  });

  // Auto load on scroll Effect
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    // خزن قيمة الـ ref الحالية
    const target = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Navigation to exams
  const examsNavigate = (subjectId: string) => {
    router.push(`/${subjectId}`);
  };

  // loading & error
  if (isLoading)
    return (
      <div className="bg-white m-6 p-6 flex items-center justify-center col-span-3">
        <Loader2 className="text-blue-600 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="bg-white m-6 p-6 flex items-center justify-center">
        <p className="text-red-600">Error loading subjects</p>
      </div>
    );

  return (
    <>
      {/* page (1) [ Subjects ] */}

      {/* Subjects List */}
      {payload?.pages
        .flatMap((page) => page.subjects)
        .map((subject, index) => (
          <div
            key={`${subject._id}-${index}`}
            className="relative w-full h-96 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => examsNavigate(subject._id)}
          >
            <Image
              src={subject.icon}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={`${subject.name} Logo`}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-[#155DFC80] backdrop-blur-sm rounded">
              <div className="flex items-center justify-center py-4">
                <span className="text-white text-lg font-bold">
                  {subject.name}
                </span>
              </div>
            </div>
          </div>
        ))}

      {/* Loader when fetching next page */}
      <div ref={loadMoreRef} className="grid col-span-3 w-full py-4">
        {isFetchingNextPage ? (
          <Loader2 className="animate-spin text-blue-600 m-auto" />
        ) : (
          <div className="bg-red-100 text-red-600 py-6 text-center w-full">
            No more for load
          </div>
        )}
      </div>
    </>
  );
}
