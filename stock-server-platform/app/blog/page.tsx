import BlogPageClient from "@/components/Blog/BlogPageClient";
import { getArticlesForList } from "@/lib/articles-server";
import { blogPosts } from "@/lib/blogData";
import type { ArticleListItem } from "@/lib/article-types";

function staticBlogToListItem(
  post: (typeof blogPosts)[number]
): ArticleListItem {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    image: post.image,
    category: post.category,
    date: post.date,
    comments: post.comments,
    readTime: post.readTime,
  };
}

export default async function BlogPage() {
  let posts: ArticleListItem[] = [];
  try {
    posts = await getArticlesForList();
  } catch {
    posts = [];
  }

  if (posts.length === 0) {
    posts = blogPosts.map(staticBlogToListItem);
  }

  return <BlogPageClient initialPosts={posts} />;
}
