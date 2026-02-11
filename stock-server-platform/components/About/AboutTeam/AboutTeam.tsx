"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import StarRating from "@/components/ui/StarRating/StarRating";

const teamMembers = [
  { id: 1, name: "حامد علیزاده", role: "پشتیبانی فروش", rating: 3, image: "/Images/Team/1.jpg" },
  { id: 2, name: "مهدی نظری", role: "فنی و مشاوره", rating: 5, image: "/Images/Team/2.jpg" },
  { id: 3, name: "سهیل رسولی", role: "فروش سرور", rating: 3, image: "/Images/Team/3.jpg" },
  { id: 4, name: "ایمان افضلی", role: "پشتیبانی فنی", rating: 4, image: "/Images/Team/4.jpg" },
];

function TeamMemberImage({ member }: { member: (typeof teamMembers)[0] }) {
  const [failed, setFailed] = useState(false);

  if (failed || !member.image) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[var(--primary-hover)]/10">
        <span className="text-4xl sm:text-5xl font-bold text-[var(--primary-hover)]/50">{member.name.charAt(0)}</span>
      </div>
    );
  }

  return (
    <Image
      src={member.image}
      alt={member.name}
      fill
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setFailed(true)}
    />
  );
}

export default function AboutTeam() {
  return (
    <section>
      <SectionHeader title="تیم استوک سرور" subtitle="اعضای تیم پشتیبانی و فروش" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-[var(--primary-hover)]/40 flex flex-col"
          >
            <div className="relative w-full aspect-square min-h-[160px] sm:min-h-[180px] bg-muted shrink-0">
              <TeamMemberImage member={member} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4 sm:p-5 flex flex-col items-center text-center flex-1 border-t border-border">
              <h3 className="text-sm font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-[13px] text-muted-foreground mb-2">{member.role}</p>
              <StarRating rating={member.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
