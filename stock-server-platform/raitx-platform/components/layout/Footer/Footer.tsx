"use client";

import FooterLeft from "./FooterLeft";
import FooterCenter from "./FooterCenter";
import FooterRight from "./FooterRight";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          <FooterRight />
          <FooterCenter />
          <FooterLeft />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}

