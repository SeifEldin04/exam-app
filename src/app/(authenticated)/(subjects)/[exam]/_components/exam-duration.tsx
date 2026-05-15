"use client";

import React, { useEffect, useState, useRef } from "react";

type ExamDurationProps = {
  duration: number; // بالدقايق
  timerEnded?: () => void;
  onTimeChange?: (date: Date) => void;
};

export default function ExamDuration({
  duration,
  timerEnded,
  onTimeChange,
}: ExamDurationProps) {
  const [endTime] = useState<number>(() => {
    const saved = localStorage.getItem("examEndTime");
    if (saved) {
      return parseInt(saved, 10);
    }
    const newEndTime = Date.now() + duration * 60 * 1000;
    localStorage.setItem("examEndTime", newEndTime.toString());
    return newEndTime;
  });

  const [remaining, setRemaining] = useState(endTime - Date.now());

  // عشان نتأكد إن timerEnded يتنادى مرة واحدة بس
  const endedRef = useRef(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      const newRemaining = endTime - Date.now();

      if (newRemaining <= 0) {
        clearInterval(timerId);
        localStorage.removeItem("examEndTime");

        if (!endedRef.current) {
          endedRef.current = true; // اتنفذ خلاص
          timerEnded?.();
        }

        setRemaining(0);
        return;
      }

      onTimeChange?.(new Date(newRemaining));
      setRemaining(newRemaining);
    }, 1000);

    return () => clearInterval(timerId);
  }, [endTime, timerEnded, onTimeChange]);

  const minutes = Math.floor((remaining / 1000 / 60) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <span>
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}
