"use client";

import React, { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
  className?: string;
}

const MainContainer = ({ children, className = "" }: MainContainerProps) => (
  <div className={`w-[95%] mx-auto ${className}`}>{children}</div>
);

export default MainContainer;
