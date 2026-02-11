"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Accordion, AccordionItem, AccordionContent } from "@/components/ui";
import { HiPlus, HiMinus } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQContentProps {
  faqs: FAQItem[];
}

const FAQAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-2.5 sm:py-3 md:py-4 text-right hover:no-underline cursor-pointer",
        "[&[data-state=open]>span]:text-[#ff5538]",
        "[&[data-state=open]>div]:bg-[#ff5538]",
        "[&[data-state=open]>div]:text-white",
        "[&[data-state=open]>div>svg:first-child]:hidden",
        "[&[data-state=open]>div>svg:last-child]:block",
        className
      )}
      {...props}
    >
      <span className="text-xs sm:text-sm md:text-base font-medium text-right flex-1 pr-3 text-gray-800 transition-colors">
        {children}
      </span>
      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all duration-200 bg-gray-200 text-gray-700">
        <HiPlus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 block" />
        <HiMinus className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 hidden" />
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
FAQAccordionTrigger.displayName = "FAQAccordionTrigger";

export default function FAQContent({ faqs }: FAQContentProps) {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-0" defaultValue={faqs[0]?.id}>
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="border-b border-gray-100 last:border-b-0"
          >
            <FAQAccordionTrigger>
              {faq.question}
            </FAQAccordionTrigger>
            <AccordionContent className="text-right text-gray-600 text-[10px] sm:text-xs md:text-sm leading-5 sm:leading-6 md:leading-7 pr-0 sm:pr-2 pb-3 sm:pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

