export interface FeaturedArticle {
  id: number;
  title: string;
  category: string;
  comments: number;
  image: string;
  link: string;
  slug: string;
}

export interface LatestArticle {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  link: string;
  slug: string;
}

export interface ArticleDetail {
  id: number;
  title: string;
  slug: string;
  category: string;
  comments: number;
  date: string;
  image: string;
  content: string[];
  headings: string[];
  relatedService?: {
    title: string;
    description: string;
    image: string;
    link: string;
  };
}


export const featuredArticles: FeaturedArticle[] = [
  {
    id: 1,
    title: "مواردی که قبل از طراحی سایت باید بدانید !",
    category: "designer",
    comments: 0,
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/ui-ux",
    slug: "مواردی-که-قبل-از-طراحی-سایت-باید-بدانید",
  },
  {
    id: 2,
    title: "چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما جادو میکند !",
    category: "designer",
    comments: 0,
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/projects",
    slug: "چند-نکته-برای-لینک-سازی-داخلی-که-در-افزایش-رتبه-سایت-شما-جادو-می-کند",
  },
  {
    id: 3,
    title: "معرفی 5 ایده طراحی سایت",
    category: "designer",
    comments: 0,
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/links",
    slug: "معرفی-5-ایده-طراحی-سایت",
  },
  {
    id: 4,
    title: "چجوری از برنامه نویسی پول در بیاریم",
    category: "designer",
    comments: 0,
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/build-site",
    slug: "چجوری-از-برنامه-نویسی-پول-در-بیاریم",
  },
  {
    id: 5,
    title: "سالادی که هندی ها دوست دارند !",
    category: "designer",
    comments: 0,
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/back-links",
    slug: "سالادی-که-هندی-ها-دوست-دارند",
  },
];

export const latestArticles: LatestArticle[] = [
  {
    id: 1,
    title: "نکاتی در رابطه با قرارداد طراحی گرافیک و تعیین مبلغ طراحی",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-1",
    slug: "نکاتی-در-رابطه-با-قرارداد-طراحی-گرافیک-و-تعیین-مبلغ-طراحی",
  },
  {
    id: 2,
    title: "چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-2",
    slug: "چند-نکته-برای-لینک-سازی-داخلی-که-در-افزایش-رتبه-سایت-شما",
  },
  {
    id: 3,
    title: "مواردی که قبل از طراحی سایت باید بدانید !",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-3",
    slug: "مواردی-که-قبل-از-طراحی-سایت-باید-بدانید",
  },
  {
    id: 4,
    title: "معرفی پنج ایده جدید برای طراحی Ui , Ux",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-4",
    slug: "معرفی-پنج-ایده-جدید-برای-طراحی-ui-ux",
  },
  {
    id: 5,
    title: "بهترین روش‌های بهینه‌سازی سرعت سایت",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "18 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-5",
    slug: "بهترین-روش-های-بهینه-سازی-سرعت-سایت",
  },
  {
    id: 6,
    title: "راهنمای کامل سئو برای کسب و کارهای آنلاین",
    description: "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی...",
    date: "15 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    link: "/news/article-6",
    slug: "راهنمای-کامل-سئو-برای-کسب-و-کارهای-آنلاین",
  },
];

const defaultContent = [
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به همین خاطر شروع می‌کند به پرسیدن از مردم شهر و آنها نشانی یک مکان دیدنی را به او می‌دهند! توریست با خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به همین خاطر شروع می‌کند به پرسیدن از مردم شهر و آنها نشانی یک مکان دیدنی را به او می‌دهند! توریست با خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به همین خاطر شروع می‌کند به پرسیدن از مردم شهر و آنها نشانی یک مکان دیدنی را به او می‌دهند! توریست با خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
  "در نظر بگیرید که یک گردشگر وارد شهر شده و به اماکن تاریخی، فرهنگی و دیدنی شهر شما هم آشنایی ندارد؛ اما این شهر دارای آثار بسیار معروفی است که شهره عام و خاص شده و همه را از تمام نقاط به آنجا می‌کشاند! گردشگر دوست دارد جاهای دیدنی شهر را ببیند؛ اما اطلاع درستی ندارد؛ به خودش فکر می‌کند که اینجا حتماً ارزش دیدن را دارد.",
];

const defaultHeadings = [
  "استراتژی لینک سازی خارجی چیست؟",
  "تنظیم استراتژی لینک سازی خارجی",
  "۱- محتوای یونیک و منحصربه‌فرد تولید کنید",
  "۲- شبکه‌سازی کنید",
  "۳- پست مهمان بنویسید",
  "۴- رپورتاژ آگهی منتشر کنید",
];

export const allArticles: ArticleDetail[] = [
  {
    id: 1,
    title: "مواردی که قبل از طراحی سایت باید بدانید !",
    slug: "مواردی-که-قبل-از-طراحی-سایت-باید-بدانید",
    category: "designer",
    comments: 1,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 2,
    title: "چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما جادو میکند !",
    slug: "چند-نکته-برای-لینک-سازی-داخلی-که-در-افزایش-رتبه-سایت-شما-جادو-می-کند",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 3,
    title: "معرفی 5 ایده طراحی سایت",
    slug: "معرفی-5-ایده-طراحی-سایت",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 4,
    title: "چجوری از برنامه نویسی پول در بیاریم",
    slug: "چجوری-از-برنامه-نویسی-پول-در-بیاریم",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 5,
    title: "سالادی که هندی ها دوست دارند !",
    slug: "سالادی-که-هندی-ها-دوست-دارند",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 6,
    title: "نکاتی در رابطه با قرارداد طراحی گرافیک و تعیین مبلغ طراحی",
    slug: "نکاتی-در-رابطه-با-قرارداد-طراحی-گرافیک-و-تعیین-مبلغ-طراحی",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 7,
    title: "چند نکته برای لینک سازی داخلی که در افزایش رتبه سایت شما",
    slug: "چند-نکته-برای-لینک-سازی-داخلی-که-در-افزایش-رتبه-سایت-شما",
    category: "designer",
    comments: 0,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 8,
    title: "معرفی پنج ایده جدید برای طراحی Ui , Ux",
    slug: "معرفی-پنج-ایده-جدید-برای-طراحی-ui-ux",
    category: "designer",
    comments: 1,
    date: "21 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 9,
    title: "بهترین روش‌های بهینه‌سازی سرعت سایت",
    slug: "بهترین-روش-های-بهینه-سازی-سرعت-سایت",
    category: "designer",
    comments: 0,
    date: "18 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
  {
    id: 10,
    title: "راهنمای کامل سئو برای کسب و کارهای آنلاین",
    slug: "راهنمای-کامل-سئو-برای-کسب-و-کارهای-آنلاین",
    category: "designer",
    comments: 0,
    date: "15 سپتامبر 2023",
    image: "/Images/tp-best-mens-hairstyles.jpg",
    headings: defaultHeadings,
    content: defaultContent,
    relatedService: {
      title: "طراحی وبسایت وردپرس",
      description: "خدمات مرتبط با ريتكس - پرداخت ارزی و خدمات بین‌المللی.",
      image: "/Images/tp-best-mens-hairstyles.jpg",
      link: "/services/wordpress",
    },
  },
];

// Create a map for faster lookup (both encoded and decoded slugs)
const slugMap = new Map<string, ArticleDetail>();
allArticles.forEach((article) => {
  const articleSlug = article.slug;
  // Store with original slug
  slugMap.set(articleSlug, article);
  // Also store with encoded slug for lookup
  try {
    slugMap.set(encodeURIComponent(articleSlug), article);
  } catch {
    // Ignore encoding errors
  }
});

export function getArticleBySlug(slug: string): ArticleDetail | undefined {
  // First try direct lookup
  if (slugMap.has(slug)) {
    return slugMap.get(slug);
  }
  
  // Try to decode and lookup
  try {
    const decoded = decodeURIComponent(slug);
    if (decoded !== slug && slugMap.has(decoded)) {
      return slugMap.get(decoded);
    }
  } catch {
    // If decode fails, slug is already decoded or invalid
  }
  
  // Fallback: search in articles (for edge cases)
  return allArticles.find((article) => {
    const articleSlug = article.slug;
    if (articleSlug === slug) {
      return true;
    }
    try {
      const decodedSlug = decodeURIComponent(slug);
      if (articleSlug === decodedSlug) {
        return true;
      }
      if (encodeURIComponent(articleSlug) === slug) {
        return true;
      }
    } catch {
      // Ignore decode errors
    }
    return false;
  });
}

export function getAllArticleSlugs(): string[] {
  return allArticles.map((article) => article.slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 5): ArticleDetail[] {
  return allArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
}

