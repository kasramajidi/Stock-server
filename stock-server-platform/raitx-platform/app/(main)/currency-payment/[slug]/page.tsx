import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../components/servicesData";
import { fetchShopProducts } from "@/app/(main)/shop/lib/shop-api";
import { InternationalSimSelectionProvider } from "./context/InternationalSimSelectionContext";
import {
  ServiceDetailHeader,
  ServiceDetailContent,
  ServiceForm,
  ServiceBenefits,
  ServiceStats,
  ServiceFAQ,
  RelatedServices,
  SimCardTypes,
  VirtualNumberTypes,
  DomainExtensions,
  DomainTips,
  DomainProviders,
  HostTypes,
  HostTips,
  AIAccounts,
  SeoTools,
  GameAccounts,
  LanguageExamTypes,
  LanguageExamServices,
  StudentPaymentTypes,
  StudentPaymentServices,
  InternationalExamTypes,
  VPSTradingSteps,
  VPSTradingPlans,
  VPSTradingBenefits,
  VPSDailySteps,
  VPSDailyPlans,
  VPSDailyBenefits,
  VPSUSASteps,
  VPSUSAPlans,
  VPSUSABenefits,
  VPSNetherlandsSteps,
  VPSNetherlandsPlans,
  VPSNetherlandsBenefits,
  VPSFranceSteps,
  VPSFrancePlans,
  VPSFranceBenefits,
  VPSFranceFeatures,
} from "./components";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "خدمت یافت نشد",
      description: "خدمت مورد نظر یافت نشد",
    };
  }

  const title = `${service.label} | ريتكس`;
  const description =
    service.description.length > 160
      ? service.description.slice(0, 157) + "..."
      : service.description;

  return {
    title,
    description,
    keywords: [
      service.label,
      service.labelEn || "",
      "خدمات پرداخت ارزی",
      "ريتكس",
    ],
    alternates: {
      canonical: `/currency-payment/${service.id}`,
    },
    openGraph: {
      title,
      description,
      url: `/currency-payment/${service.id}`,
      locale: "fa_IR",
      type: "website",
      siteName: "ريتكس",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  let shopProducts: Awaited<ReturnType<typeof fetchShopProducts>> = [];
  try {
    shopProducts = await fetchShopProducts();
  } catch {
    // باکس ثبت سفارش بدون قیمت یا با دکمه fallback نمایش داده می‌شود
  }
  const simCardProducts = shopProducts;

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mrpremiumhub.com";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "صفحه اصلی",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "پرداخت ارزی",
        item: `${baseUrl}/currency-payment`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.label,
        item: `${baseUrl}/currency-payment/${service.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-6 sm:pt-8 md:pt-10 pb-4 sm:pb-6 md:pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl">
        <ServiceDetailHeader service={service} />

        {service.id === "international-sim" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <SimCardTypes initialProducts={simCardProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={simCardProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "virtual-number" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <VirtualNumberTypes initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "domain" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <DomainExtensions initialProducts={shopProducts} />
                <DomainTips />
                <DomainProviders />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "host" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <HostTypes initialProducts={shopProducts} />
                <HostTips />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "ai-account" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <AIAccounts initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "seo-account" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <SeoTools initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "game-account" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <GameAccounts initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "software-account" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "language-exam" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <LanguageExamTypes initialProducts={shopProducts} />
                <LanguageExamServices initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "international-exam" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <InternationalExamTypes initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "vps-trading" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <VPSTradingSteps />
                <VPSTradingPlans initialProducts={shopProducts} />
                <VPSTradingBenefits />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "vps-usa" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <VPSUSASteps />
                <VPSUSAPlans initialProducts={shopProducts} />
                <VPSUSABenefits />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "vps-netherlands" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <VPSNetherlandsSteps />
                <VPSNetherlandsPlans initialProducts={shopProducts} />
                <VPSNetherlandsBenefits />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : service.id === "vps-france" ? (
          <InternationalSimSelectionProvider>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <ServiceDetailContent service={service} />
                <ServiceBenefits service={service} />
                <ServiceStats service={service} />
                <VPSFranceSteps />
                <VPSFrancePlans initialProducts={shopProducts} />
                <VPSFranceBenefits />
                <VPSFranceFeatures />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <ServiceForm service={service} initialProducts={shopProducts} />
                </div>
              </div>
            </div>
          </InternationalSimSelectionProvider>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <ServiceDetailContent service={service} />
            <ServiceBenefits service={service} />
            <ServiceStats service={service} />
            {service.id === "domain" && (
              <>
                <DomainExtensions />
                <DomainTips />
                <DomainProviders />
              </>
            )}
            {service.id === "language-exam" && (
              <>
                <LanguageExamTypes initialProducts={shopProducts} />
                <LanguageExamServices initialProducts={shopProducts} />
                <ServiceFAQ service={service} />
                <RelatedServices currentService={service} />
              </>
            )}
            {service.id === "student-payment" && (
              <>
                <StudentPaymentTypes />
                <StudentPaymentServices />
              </>
            )}
            <ServiceFAQ service={service} />
            <RelatedServices currentService={service} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <ServiceForm service={service} initialProducts={shopProducts} />
            </div>
          </div>
        </div>
        )}
      </div>
    </main>
  );
}
