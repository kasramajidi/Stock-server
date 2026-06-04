import { prisma } from "@/lib/prisma";

export async function getProductsForSitemap(): Promise<
  { slug: string; id: string; updatedAt: Date }[]
> {
  return prisma.product.findMany({
    select: { id: true, slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
}
