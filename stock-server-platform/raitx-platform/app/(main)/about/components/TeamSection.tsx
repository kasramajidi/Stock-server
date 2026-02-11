import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "حامد علیزاده",
    role: "طراح سایت",
    rating: 3,
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 2,
    name: "مهدی نظری",
    role: "طراح ui/ux",
    rating: 5,
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 3,
    name: "سهیل رسولی",
    role: "برنامه نویس فرانت اند",
    rating: 3,
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
  {
    id: 4,
    name: "ایمان افضلی",
    role: "برنامه نویس بک اند",
    rating: 4,
    image: "/Images/tp-best-mens-hairstyles.jpg",
  },
];

export default function TeamSection() {
  return (
    <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8">
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 rounded-full">
            <div className="w-1 h-1 rounded-full bg-orange-500"></div>
            <span className="text-[10px] sm:text-xs text-orange-600 font-medium">اعضای یک تیم حرفه ای</span>
          </div>
        </div>

        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center" style={{ color: '#1a3760' }}>
          معرفی اعضای تیم دیجیتال مارکتینگ
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg p-2 sm:p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2">
            <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-lg overflow-hidden mb-2">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-center"
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">{member.name}</h3>
              <p className="text-[10px] sm:text-xs text-gray-600 mb-1.5">{member.role}</p>
              <div className="flex items-center justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-2.5 h-2.5 sm:w-3 sm:h-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill={star <= member.rating ? "currentColor" : "none"}
                      stroke={star > member.rating ? "currentColor" : "none"}
                      strokeWidth="2"
                      className={star <= member.rating ? "text-[#ff5538]" : "text-gray-300"}
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

