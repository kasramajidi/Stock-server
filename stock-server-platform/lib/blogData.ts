export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  image: string;
  readTime: string;
  category: string;
  date: string;
  comments: number;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "hotswap-vs-hotplug-server-storage",
    title: "بررسی مفهوم Hot‑Swap و Hot‑Plug در سرور و استوریج",
    summary:
      "در این مطلب تفاوت Hot‑Swap و Hot‑Plug و تأثیر آن‌ها بر در دسترس بودن سرور و استوریج را بررسی می‌کنیم.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "7 دقیقه مطالعه",
    category: "زیرساخت و استوریج",
    date: "20 دی 1404",
    comments: 4,
  },
  {
    id: 2,
    slug: "nvme-vs-ssd-in-servers",
    title: "NVMe در سرورها چیست و چه تفاوتی با SSD معمولی دارد؟",
    summary:
      "تفاوت‌های کلیدی NVMe و SSD معمولی در کارایی، تأخیر و مناسب‌ترین سناریوهای استفاده در سرورهای سازمانی.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "6 دقیقه مطالعه",
    category: "زیرساخت و استوریج",
    date: "15 دی 1404",
    comments: 3,
  },
  {
    id: 3,
    slug: "why-hp-server-is-slow",
    title: "دلایل کند شدن سرور HP و راه‌حل‌های عملی",
    summary:
      "از مشکلات RAM و CPU تا کانفیگ اشتباه RAID؛ مهم‌ترین دلایل کند شدن سرور HP را به همراه راه‌کار مرور می‌کنیم.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "9 دقیقه مطالعه",
    category: "عیب‌یابی و نگه‌داری",
    date: "10 دی 1404",
    comments: 6,
  },
  {
    id: 4,
    slug: "choose-cpu-for-crm-erp-sql",
    title: "راهنمای انتخاب CPU سرور HP برای CRM، ERP و SQL",
    summary:
      "برای نرم‌افزارهای سازمانی مانند CRM، ERP و دیتابیس SQL چه پردازنده‌ای مناسب‌تر است و به چه نکاتی باید توجه کنیم؟",
    image: "/Images/Baner/Layer 5.png",
    readTime: "8 دقیقه مطالعه",
    category: "راهنمای خرید",
    date: "5 دی 1404",
    comments: 2,
  },
  {
    id: 5,
    slug: "hp-server-for-small-business",
    title: "برای شرکت‌های کوچک چه سرور HP مناسب است؟",
    summary:
      "اگر یک شرکت کوچک یا استارتاپ هستید، در این مطلب چند پیشنهاد اقتصادی و مطمئن برای انتخاب سرور HP بررسی شده است.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "5 دقیقه مطالعه",
    category: "راهنمای خرید",
    date: "28 آذر 1404",
    comments: 1,
  },
  {
    id: 6,
    slug: "choose-ram-for-server",
    title: "نکات مهم در انتخاب RAM سرور",
    summary:
      "تفاوت Registered و Unbuffered، ECC و سرعت فرکانس از مهم‌ترین نکاتی است که قبل از خرید RAM سرور باید بدانید.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "6 دقیقه مطالعه",
    category: "راهنمای خرید",
    date: "20 آذر 1404",
    comments: 5,
  },
  {
    id: 7,
    slug: "backup-strategies-for-hp-servers",
    title: "بهترین راهکارهای بکاپ‌گیری در سرورهای HP",
    summary:
      "از استفاده از استوریج‌های خارجی تا پیاده‌سازی RAID مناسب؛ استراتژی‌های بکاپ‌گیری امن برای سرورهای HP را بررسی می‌کنیم.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "10 دقیقه مطالعه",
    category: "زیرساخت و استوریج",
    date: "10 آذر 1404",
    comments: 0,
  },
  {
    id: 8,
    slug: "common-raid-mistakes",
    title: "اشتباهات رایج در پیکربندی RAID",
    summary:
      "چند خطای تکراری در انتخاب سطح RAID و تنظیمات آن که می‌تواند کارایی و امنیت داده‌های شما را به خطر بیندازد.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "7 دقیقه مطالعه",
    category: "عیب‌یابی و نگه‌داری",
    date: "5 آذر 1404",
    comments: 3,
  },
  {
    id: 9,
    slug: "getting-started-with-virtualization-on-hp",
    title: "راهنمای مقدماتی مجازی‌سازی روی سرور HP",
    summary:
      "اگر تازه می‌خواهید با VMware یا Hyper‑V روی سرور HP کار را شروع کنید، این مطلب نقطه شروع مناسبی است.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "11 دقیقه مطالعه",
    category: "مجازی‌سازی",
    date: "1 آذر 1404",
    comments: 7,
  },
  {
    id: 10,
    slug: "popular-hp-server-series",
    title: "معرفی پرکاربردترین سری‌های سرور HP",
    summary:
      "در این مطلب به‌صورت خلاصه تفاوت سری‌های DL، ML و Blade را توضیح می‌دهیم و کاربرد هر کدام را بررسی می‌کنیم.",
    image: "/Images/Baner/Layer 5.png",
    readTime: "6 دقیقه مطالعه",
    category: "راهنمای خرید",
    date: "25 آبان 1404",
    comments: 2,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

