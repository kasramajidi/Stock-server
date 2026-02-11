"use client";

import { useState } from "react";
import { blogPosts, type BlogPost } from "@/lib/blogData";
import { BlogHero } from "@/components/Blog/BlogHero";
import { BlogCategoryFilter } from "@/components/Blog/BlogCategoryFilter";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogSidebar } from "@/components/Blog/BlogSidebar";
import { BlogPagination } from "@/components/Blog/BlogPagination";

const categories: { key: string | null; label: string }[] = [
  { key: null, label: "همه مطالب" },
  { key: "راهنمای خرید", label: "راهنمای خرید" },
  { key: "زیرساخت و استوریج", label: "زیرساخت و استوریج" },
  { key: "عیب‌یابی و نگه‌داری", label: "عیب‌یابی و نگه‌داری" },
  { key: "مجازی‌سازی", label: "مجازی‌سازی" },
];

const ITEMS_PER_PAGE = 6;

function shufflePosts(items: BlogPost[]): BlogPost[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [posts] = useState<BlogPost[]>(() => shufflePosts(blogPosts));

  const filteredPosts =
    selectedCategory === null
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

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
    <main className="mx-auto my-8 w-[92%] max-w-6xl space-y-8 md:space-y-10">
      <BlogHero featured={posts.slice(0, 2)} />

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
        <BlogSidebar categories={categories} posts={blogPosts} />
      </section>
    </main>
  );
}
