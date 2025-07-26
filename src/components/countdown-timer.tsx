"use client";

import { useState, useEffect } from "react";

const COUNTDOWN_DURATION = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

const getEndDate = (): number => {
  if (typeof window !== "undefined") {
    const savedEndDate = localStorage.getItem("airdropEndDate");
    if (savedEndDate) {
      const endDate = parseInt(savedEndDate, 10);
      if (endDate > Date.now()) {
        return endDate;
      }
    }
    const newEndDate = Date.now() + COUNTDOWN_DURATION;
    localStorage.setItem("airdropEndDate", newEndDate.toString());
    return newEndDate;
  }
  return Date.now() + COUNTDOWN_DURATION;
};

export function CountdownTimer() {
  const [endDate, setEndDate] = useState<number>(
    () => Date.now() + COUNTDOWN_DURATION
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setEndDate(getEndDate());
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Time's up, reset the timer
        const newEndDate = Date.now() + COUNTDOWN_DURATION;
        localStorage.setItem("airdropEndDate", newEndDate.toString());
        setEndDate(newEndDate);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex justify-center space-x-2 md:space-x-4 my-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm border rounded-lg w-24 h-24 md:w-28 md:h-28"
        >
          <span className="text-4xl md:text-5xl font-bold font-headline text-primary tracking-tighter">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase text-muted-foreground tracking-widest pt-1">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}