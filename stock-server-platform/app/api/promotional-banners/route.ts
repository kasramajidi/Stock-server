import { NextResponse } from "next/server";

interface PromotionalBanner {
  id: string;
  image: string;
  alt: string;
  link?: string;
}

// TODO: Replace with actual database/API call
const getPromotionalBanners = async (): Promise<PromotionalBanner[]> => {
  // For now, return default banners
  // In production, fetch from database or external API
  return [
    {
      id: "1",
      image: "/Images/PromotionalBanners/Baner.png",
      alt: "بنر تبلیغاتی HPE - آموزش کامل تجهیزات",
    },
    {
      id: "2",
      image: "/Images/PromotionalBanners/Baner.png",
      alt: "بنر گواهینامه‌ها و اعتبارات",
    },
  ];
};

export async function GET() {
  try {
    const banners = await getPromotionalBanners();

    return NextResponse.json(
      {
        banners,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching promotional banners:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch promotional banners",
      },
      { status: 500 }
    );
  }
}

