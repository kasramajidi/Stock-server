"use client";

import { useState } from "react";
import { BlogHero } from "@/components/Blog/BlogHero";
import { BlogCategoryFilter } from "@/components/Blog/BlogCategoryFilter";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogSidebar } from "@/components/Blog/BlogSidebar";
import { BlogPagination } from "@/components/Blog/BlogPagination";
import type { ArticleListItem } from "@/lib/article-types";

const ITEMS_PER_PAGE = 6;

type Props = {
  initialPosts: ArticleListItem[];
};

export default function BlogPageClient({ initialPosts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const categoryKeys = [
    ...new Set(initialPosts.map((p) => p.category).filter(Boolean)),
  ].sort();
  const categories: { key: string | null; label: string }[] = [
    { key: null, label: "همه مطالب" },
    ...categoryKeys.map((cat) => ({ key: cat, label: cat })),
  ];

  const filteredPosts =
    selectedCategory === null
      ? initialPosts
      : initialPosts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  );

  const currentItems = filteredPosts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) setCurrentPage(page);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  return (
    <main className="min-h-screen">
      <h1 className="sr-only">وبلاگ استوک سرور — مقالات سرور و تجهیزات شبکه</h1>
      <div className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 header-4k py-8 sm:py-10 space-y-8 md:space-y-10">
        <BlogHero featured={initialPosts.slice(0, 2)} />

        <BlogCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />

        <section className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 space-y-4">
            <BlogList posts={currentItems} currentPage={currentPage} />
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <BlogSidebar categories={categories} posts={initialPosts} />
        </section>
      </div>
    </main>
  );
}
