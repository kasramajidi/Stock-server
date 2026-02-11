import Image from 'next/image'
import React from 'react'

const images = [
  '/Images/Baner/Layer 5.png',
  '/Images/Baner/Layer 5.png',
  '/Images/Baner/Layer 5.png',
]

export default function Baner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-full h-[160px] sm:h-[180px] xl:h-[200px] rounded-xl overflow-hidden"
        >
          <Image
            src={src}
            alt={`Promotional Banner ${index + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
