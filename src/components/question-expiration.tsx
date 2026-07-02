"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useState } from "react";

import { formatDateTime } from "@/lib/date";
import { formatTimeLeft } from "@/lib/time-left";

type QuestionExpirationProps = {
  expiresAt: string;
};

export function QuestionExpiration({ expiresAt }: QuestionExpirationProps) {
  const [tick, setTick] = useState(0);
  const timeLeft = formatTimeLeft(expiresAt);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [expiresAt]);

  void tick;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-white/70 px-2 py-1 text-xs font-medium text-zinc-600"
      title={`Expira exatamente em ${formatDateTime(expiresAt)}`}
    >
      <Clock3 size={13} />
      expira em {timeLeft}
    </span>
  );
}
