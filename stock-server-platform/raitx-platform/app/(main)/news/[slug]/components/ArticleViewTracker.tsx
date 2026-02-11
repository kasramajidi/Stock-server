"use client";

import { useEffect } from "react";
import { incrementArticleView } from "../../lib/articles-api";

interface ArticleViewTrackerProps {
  articleId: number;
}

export default function ArticleViewTracker({ articleId }: ArticleViewTrackerProps) {
  useEffect(() => {
    if (articleId) {
      incrementArticleView(articleId);
    }
  }, [articleId]);
  return null;
}
