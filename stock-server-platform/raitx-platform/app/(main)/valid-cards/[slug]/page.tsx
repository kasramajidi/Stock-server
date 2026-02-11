import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../components/servicesData";
import { fetchShopProducts } from "@/app/(main)/shop/lib/shop-api";
import {
  ServiceDetailHeader,
  ServiceDetailContent,
  ServiceForm,
  ServiceBenefits,
  ServiceStats,
  ServiceFAQ,
  RelatedServices,
  PlayStationDenominationsBox,
} from "./components";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "خدمت یافت نشد",
      description: "خدمت مورد نظر یافت نشد",
    };
  }

  return {
    title: `${service.label} | ريتكس`,
    description: service.description,
    keywords: [
      service.label,
      service.labelEn || "",
      "خدمات",
      "ريتكس",
    ],
    alternates: {
      canonical: `/valid-cards/${service.id}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  let initialProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    initialProducts = await fetchShopProducts();
  } catch {
    // client shows fallback
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 md:pb-8">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ServiceDetailHeader service={service} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ServiceDetailContent service={service} />
            <PlayStationDenominationsBox service={service} />
            <ServiceBenefits service={service} />
            <ServiceStats service={service} />
            <ServiceFAQ service={service} />
            <RelatedServices currentService={service} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ServiceForm service={service} initialProducts={initialProducts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

