"use client";

import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return <div className="w-full">{children}</div>;
}
