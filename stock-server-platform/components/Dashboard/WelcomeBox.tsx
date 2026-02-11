"use client";

import React, { useState, useEffect } from "react";
import { fetchUserProfileFallback } from "@/lib/dashboard-api";

export default function WelcomeBox() {
  const [username, setUsername] = useState("کاربر");

  useEffect(() => {
    let mounted = true;
    fetchUserProfileFallback().then((profile) => {
      if (!mounted) return;
      if (profile?.name) {
        setUsername(profile.name);
        if (typeof localStorage !== "undefined") {
          try {
            const prev = JSON.parse(localStorage.getItem("user") || "{}");
            localStorage.setItem("user", JSON.stringify({ ...prev, username: profile.name, name: profile.name }));
          } catch {
            // ignore
          }
        }
        return;
      }
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const user = JSON.parse(stored) as Record<string, unknown>;
          if (user?.username || user?.name) setUsername((user.username as string) || (user.name as string) || "کاربر");
        }
      } catch {
        // ignore
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/40 px-5 py-4 sm:gap-6 sm:px-6 sm:py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-medium text-muted-foreground">
        {initial}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">سلام،</p>
        <p className="text-lg font-medium tracking-tight text-foreground">{username}</p>
      </div>
      <span className="mr-auto rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        پیشخوان
      </span>
    </div>
  );
}
