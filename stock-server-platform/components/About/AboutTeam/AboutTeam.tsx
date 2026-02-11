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
      <div className="absolute inset-0 flex items-center justify-center bg-[#17e2fe]/10">
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#17e2fe]/60">{member.name.charAt(0)}</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#17e2fe]/30 transition-all flex flex-col">
            <div className="relative w-full aspect-square min-h-[140px] sm:min-h-[160px] md:min-h-[180px] bg-gray-100 shrink-0">
              <TeamMemberImage member={member} />
            </div>
            <div className="p-3 sm:p-4 flex flex-col items-center text-center flex-1">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-800 mb-0.5 sm:mb-1">{member.name}</h3>
              <p className="text-[10px] min-[400px]:text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">{member.role}</p>
              <StarRating rating={member.rating} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
