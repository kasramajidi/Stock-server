import Image from "next/image";

interface MemoryCardProps {
  image: string;
  title: string;
  description: string;
}

export default function MemoryCard({
  image,
  title,
  description,
}: MemoryCardProps) {
  return (
    <div className="shrink-0 w-[280px] bg-white rounded-xl p-4 text-center">
      {/* Logos */}
      <div className="flex justify-between gap-3 mb-3">
        <Image
          src="/Images/Logo/logo stock copy 2.png"
          alt="HPE"
          width={70}
          height={24}
        />

        <Image
          src="/Images/Logo/logo stock copy 2.png"
          alt="Asan Server"
          width={70}
          height={24}
        />
      </div>

      {/* RAM Image */}
      <div className="relative h-[120px] mb-4">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      {/* Text */}
      <h3 className="text-sm font-medium text-gray-800 mb-2 leading-6">
        {title}
      </h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
