import HeroSection from "@/components/Home/HeroSection/HeroSection";

// TODO: جایگزین کنید با API endpoint واقعی
async function getBannerImage() {
  try {
    // مثال: const response = await fetch('YOUR_API_ENDPOINT/banner');
    // const data = await response.json();
    // return data.bannerImage || null;
    
    // برای تست، null برمی‌گرداند (تصویر پیش‌فرض نمایش داده می‌شود)
    return null;
  } catch (error) {
    console.error("Error fetching banner:", error);
    return null;
  }
}

export default async function Home() {
  const bannerImage = await getBannerImage();

  return (
    <main>
      <HeroSection bannerImage={bannerImage} />
    </main>
  );
}
