import type { ShopProduct } from "@/lib/shop-api";

export const categories: string[] = [
  "سرور HP",
  "CPU سرور HP",
  "رم سرور HP",
  "مادربرد سرور HP",
  "هارد سرور",
  "فن سرور HP",
  "پاور سرور HP",
  "رید کنترلر سرور HP",
  "باتری سرور HP",
  "کارت شبکه",
  "سایر قطعات سرور",
];

export const brands: string[] = ["HP", "HPE"];

/** برای سازگاری با ProductGrid و فیلترها — همان نوع ShopProduct */
export type Product = ShopProduct;
