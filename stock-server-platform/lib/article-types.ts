/** آیتم مقاله برای لیست وبلاگ — از API یا دادهٔ ثابت */
export type ArticleListItem = {
  id: string | number;
  title: string;
  summary: string;
  image: string;
  category: string;
  date: string;
  comments: number;
  readTime: string;
  /** وقتی از API می‌آید — لینک به /article/[id] */
  articleId?: string;
  /** وقتی از blogData می‌آید — لینک به /blog/[slug] */
  slug?: string;
};

export function getArticleHref(post: ArticleListItem): string {
  if (post.articleId) return `/article/${post.articleId}`;
  if (post.slug) return `/blog/${post.slug}`;
  return "#";
}
