"use client";

import Image from "next/image";
import { useState } from "react";

const teamMembers = [
  { id: 1, name: "حامد علیزاده", role: "پشتیبانی فروش", image: "/Images/Team/1.jpg" },
  { id: 2, name: "مهدی نظری", role: "فنی و مشاوره", image: "/Images/Team/2.jpg" },
  { id: 3, name: "سهیل رسولی", role: "فروش سرور", image: "/Images/Team/3.jpg" },
  { id: 4, name: "ایمان افضلی", role: "پشتیبانی فنی", image: "/Images/Team/4.jpg" },
];

function TeamMemberImage({ member }: { member: (typeof teamMembers)[0] }) {
  const [failed, setFailed] = useState(false);

  if (failed || !member.image) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#17e2fe]/10">
        <span className="text-3xl sm:text-4xl font-bold text-[#0e7490]/60">
          {member.name.charAt(0)}
        </span>
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
    <section aria-labelledby="team-heading">
      <div className="text-center mb-10 sm:mb-12">
        <h2 id="team-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
          تیم استوک سرور
        </h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          اعضای تیم پشتیبانی، فروش و مشاورهٔ فنی در خدمت شما هستند.
        </p>
        <div className="w-16 h-1 rounded-full bg-[#17e2fe] mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[#17e2fe]/30"
          >
            <div className="relative w-full aspect-[4/5] min-h-[200px] bg-slate-100">
              <TeamMemberImage member={member} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-5 sm:p-6 text-center border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-800">{member.name}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
