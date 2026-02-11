import Image from "next/image";

interface BlogCardProps {
  title: string;
}

export default function BlogCard({ title }: BlogCardProps) {
  return (
    <div className="min-w-[220px] max-w-[220px] bg-[#EFFFF5] h-[300px] rounded-xl overflow-hidden shadow-sm flex flex-col ">

      <Image
        src="/Images/Baner/Layer 5.png"
        alt={title}
        width={220}
        height={240}
        className="object-cover h-[140px]"
        style={{ width: "auto", height: "auto" }}
      />

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
