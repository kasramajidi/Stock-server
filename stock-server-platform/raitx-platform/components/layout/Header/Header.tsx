"use client";

import LoginButton from "./LoginButton";
import CartIcon from "./CartIcon";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  cartCount?: number;
  isAuthenticated?: boolean;
}

export default function Header({
  cartCount = 0,
  isAuthenticated = false,
}: HeaderProps) {
  return (
    <header className="z-50 bg-white border-b-2 border-[#ff5538]/20 shadow-sm">
      <div className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between max-sm:h-18 min-[500px]:max-sm:h-20 sm:h-20 md:h-24 lg:h-28 xl:h-32 max-w-7xl mx-auto gap-2 sm:gap-3 md:gap-4 lg:gap-4 py-0">
          <div className="flex items-center justify-center order-1 shrink-0 max-[500px]:flex h-full min-h-0 self-center">
            <MobileMenu cartCount={cartCount} isAuthenticated={isAuthenticated} />
          </div>

          <div className="hidden min-[500px]:flex lg:hidden items-center gap-3 md:gap-4 order-1 shrink-0">
            <CartIcon cartCount={cartCount} />
          </div>

          <div className="hidden lg:flex items-center gap-2 sm:gap-3 md:gap-4 order-1 shrink-0">
            <CartIcon cartCount={cartCount} />
            <LoginButton isAuthenticated={isAuthenticated} />
          </div>

          <div className="hidden min-[500px]:flex lg:hidden items-center flex-1 justify-center px-3 md:px-4 order-2 overflow-visible min-w-0">
            <NavLinks />
          </div>

          <div className="hidden lg:flex items-center flex-1 justify-center px-2 md:px-4 lg:px-6 xl:px-8 order-2 overflow-visible">
            <NavLinks />
          </div>

          <div className="shrink-0 order-3 flex items-center h-full min-h-0 self-center">
            <Logo />
          </div>
        </div>
      </div>
    </header>
  );
}

