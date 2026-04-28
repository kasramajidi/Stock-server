"use client";

import { useState, useEffect } from "react";
import { BlogHero } from "@/components/Blog/BlogHero";
import { BlogCategoryFilter } from "@/components/Blog/BlogCategoryFilter";
import { BlogList } from "@/components/Blog/BlogList";
import { BlogSidebar } from "@/components/Blog/BlogSidebar";
import { BlogPagination } from "@/components/Blog/BlogPagination";
import type { ArticleListItem } from "@/lib/article-types";

const ITEMS_PER_PAGE = 6;

function mapApiArticle(a: {
  id: string;
  title: string;
  excerpt?: string | null;
  image?: string | null;
  category: string;
  publishedAt: string;
  viewCount?: number;
  comments?: unknown[];
}): ArticleListItem {
  const commentCount = Array.isArray(a.comments) ? a.comments.length : 0;
  return {
    id: a.id,
    articleId: a.id,
    title: a.title,
    summary: a.excerpt ?? "",
    image: a.image ?? "/Images/Baner/Layer 5.png",
    category: a.category,
    date: new Date(a.publishedAt).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    comments: commentCount,
    readTime: "۵ دقیقه مطالعه",
  };
}

export default function BlogPage() {
  const [posts, setPosts] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.articles)) {
          setPosts(data.articles.map(mapApiArticle));
        } else {
          setPosts([]);
        }
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categoryKeys = [...new Set(posts.map((p) => p.category).filter(Boolean))].sort();
  const categories: { key: string | null; label: string }[] = [
    { key: null, label: "همه مطالب" },
    ...categoryKeys.map((cat) => ({ key: cat, label: cat })),
  ];

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

  if (loading && posts.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#17e2fe]/30 border-t-[#17e2fe] animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-3 min-[400px]:mx-4 sm:mx-6 md:mx-8 lg:mx-10 header-1080 xl:mx-12 header-4k py-8 sm:py-10 space-y-8 md:space-y-10">
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
          <BlogSidebar categories={categories} posts={posts} />
        </section>
      </div>
    </main>
  );
}
