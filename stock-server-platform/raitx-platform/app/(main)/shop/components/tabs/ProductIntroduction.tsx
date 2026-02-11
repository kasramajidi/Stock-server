"use client";

import React, { useState } from "react";
import Image from "next/image";
import { shouldUnoptimizeImage } from "@/app/(main)/lib/image-utils";
import type { Product } from "../productsData";
import FlightTicketContent from "../FlightTicketContent";

const PLACEHOLDER_TEXTS = [
  "این محصول توسط ريتكس (RAITX) ارائه می‌شود. برای جزئیات بیشتر و خرید با پشتیبانی تماس بگیرید: ۰۲۱-۹۱۳۲۰۷۰۰ یا support@mrpremiumhub.org",
];

function normalizeText(t: string): string {
  return t
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

function AnswerContent({ text }: { text: string }) {
  const normalized = normalizeText(text);
  if (!normalized) return null;

  const blocks = normalized.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);
  const isSubheading = (line: string) => {
    const t = line.trim();
    return t.length > 0 && (t.length <= 55 || /:\s*$/.test(t));
  };
  const isListItem = (line: string) => /^[\s]*[•\-ـ]\s/.test(line) || /^[\s]*\d+[\.\)]\s/.test(line) || /^[\s]*[۰-۹]+[\.\)]\s/.test(line);

  return (
    <div className="space-y-4 text-[1rem] sm:text-[1.05rem] leading-[1.9] text-gray-800">
      {blocks.map((block, blockIdx) => {
        const lines = block.split(/\n/).map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) return null;
        if (lines.length === 1) {
          const line = lines[0];
          if (isSubheading(line)) {
            return (
              <h4 key={blockIdx} className="font-bold text-gray-900 mt-5 mb-1.5 first:mt-0 text-base sm:text-[1.05rem] border-r-2 border-[#ff5538]/40 pr-2">
                {line}
              </h4>
            );
          }
          return (
            <p key={blockIdx} className="text-gray-800 leading-[1.9] py-0.5">
              {line}
            </p>
          );
        }
        const firstIsSub = isSubheading(lines[0]);
        const rest = firstIsSub ? lines.slice(1) : lines;
        const hasListItems = firstIsSub && rest.length > 0 && rest.some(isListItem);
        return (
          <div key={blockIdx} className="space-y-2">
            {firstIsSub && (
              <h4 className="font-bold text-gray-900 mt-5 mb-1.5 first:mt-0 text-base sm:text-[1.05rem] border-r-2 border-[#ff5538]/40 pr-2">
                {lines[0]}
              </h4>
            )}
            {hasListItems ? (
              <ul className="list-none pr-0 pl-0 space-y-2 mt-1">
                {rest.map((line, i) => {
                  const label = line.replace(/^[\s•\-ـ]+/, "").replace(/^[۰-۹0-9]+[\.\)]\s*/, "").trim() || line;
                  return (
                    <li key={i} className="flex gap-2.5 items-start text-gray-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5538] shrink-0 mt-2" aria-hidden />
                      <span className="leading-[1.9]">{label}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              rest.map((line, i) => (
                <p key={i} className="text-gray-800 leading-[1.9] py-0.5">
                  {line}
                </p>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
}

interface ProductIntroductionProps {
  product?: Product | null;
}

function ProductIntroduction({ product }: ProductIntroductionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (product?.useFlightTicketIntro) {
    return (
      <article className="text-right" aria-label="معرفی محصول">
        <FlightTicketContent />
      </article>
    );
  }

  const rawContent = normalizeText(product?.description ?? "");
  const introParagraphs = Array.isArray(product?.introductionParagraphs) ? product.introductionParagraphs : [];
  const images = Array.isArray(product?.introductionImages) ? product.introductionImages.filter((src): src is string => Boolean(src?.trim())) : [];
  const faq = Array.isArray(product?.faq) ? product.faq.filter((item): item is { question: string; answer: string } => Boolean(item && (item.question != null || item.answer != null))) : [];

  const contentBlocks =
    rawContent !== ""
      ? rawContent.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
      : [];
  const introBlocks = introParagraphs.map((p) => normalizeText(p ?? "")).filter(Boolean);
  const allBlocks = [...contentBlocks, ...introBlocks];

  const endsWithQuestion = (text: string) => /[؟?]\s*$/.test(text.trim());

  type QaPair = { question: string; answer: string };
  const qaPairs: QaPair[] = [];
  let i = 0;
  while (i < allBlocks.length) {
    const block = allBlocks[i];
    if (endsWithQuestion(block)) {
      const question = block;
      const answerParts: string[] = [];
      i += 1;
      while (i < allBlocks.length && !endsWithQuestion(allBlocks[i])) {
        answerParts.push(allBlocks[i]);
        i += 1;
      }
      qaPairs.push({ question, answer: answerParts.join("\n\n") });
    } else {
      i += 1;
    }
  }

  const hasQa = qaPairs.length > 0;
  const hasText = allBlocks.length > 0;
  const hasAnyContent = images.length > 0 || hasText || faq.length > 0;

  return (
    <article
      className="w-full text-right min-h-[50vh]"
      aria-label="معرفی محصول"
      dir="rtl"
    >
      {images.length > 0 && (
        <section className="w-full mb-10" aria-label="تصاویر معرفی">
          <div
            className={`grid gap-5 w-full ${
              images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg ring-1 ring-gray-200/60"
              >
                <Image
                  src={src}
                  alt={`معرفی محصول - تصویر ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  unoptimized={src.startsWith("data:") || src.includes("?") || shouldUnoptimizeImage(src)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {hasQa && (
        <section className="w-full space-y-5 py-0">
          {qaPairs.map((item, index) => (
            <div key={index} className="w-full rounded-xl overflow-hidden border border-gray-200/80 bg-white shadow-sm">
              <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-r-4 border-[#ff5538] bg-[#ff5538]/5">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {item.question}
                </p>
              </div>
              <div className="px-5 py-4 sm:px-6 sm:py-5 bg-gray-50/80 border-t border-gray-100/80">
                <AnswerContent text={item.answer} />
              </div>
            </div>
          ))}
        </section>
      )}

      {hasText && !hasQa && (
        <section className="w-full">
          <div className="w-full max-w-none space-y-6 py-1">
            {allBlocks.map((paragraph, index) => (
              <p
                key={index}
                className="w-full text-[1.1rem] sm:text-[1.2rem] leading-[2.3] text-gray-800 font-normal py-4 px-5 rounded-xl bg-white/70 border border-gray-100 shadow-sm"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="w-full mt-14 pt-8 border-t border-gray-200/80" aria-label="سوالات متداول">
          <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-[#ff5538]" />
            سوالات متداول
          </h3>
          <ul className="w-full space-y-3 list-none p-0 m-0">
            {faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <li key={index} className="w-full rounded-xl overflow-hidden bg-white border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-right hover:bg-gray-50/80 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-gray-900 flex-1">{item?.question ?? ""}</span>
                    <span className={`shrink-0 w-9 h-9 flex items-center justify-center rounded-xl bg-[#ff5538]/10 text-[#ff5538] transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-0 bg-gray-50/50">
                      <p className="text-[1.05rem] text-gray-700 leading-loose border-t border-gray-100 pt-4">
                        {item?.answer ?? ""}
                      </p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {!hasAnyContent && (
        <p className="w-full text-[1.1rem] text-gray-500 leading-loose py-4 px-5 rounded-xl bg-white/60 border border-gray-100">
          {PLACEHOLDER_TEXTS[0]}
        </p>
      )}
    </article>
  );
}

export default React.memo(ProductIntroduction);
