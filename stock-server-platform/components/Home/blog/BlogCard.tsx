import Image from "next/image";

interface BlogCardProps {
  title: string;
}

export default function BlogCard({ title }: BlogCardProps) {
  return (
    <div className="w-full max-w-[320px] bg-[#EFFFF5] h-[300px] rounded-xl overflow-hidden shadow-sm flex flex-col">
      <div className="relative w-full h-[140px]">
        <Image
          src="/Images/Baner/Layer 5.png"
          alt={title}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 320px"
          className="object-cover"
        />
      </div>

      <div className="p-4 flex flex-col  flex-1 text-center">
        <p className="text-sm text-green-700 leading-6 mb-4">
          {title}
        </p>

        <button className="text-sm text-[#00DDFF] hover:underline flex items-center justify-center gap-1">
          مشاهده
          <span>›</span>
        </button>
      </div>
    </div>
  );
}
