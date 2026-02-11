import BlogCard from "./BlogCard";

const blogs = [
  "بررسی مفهوم Hot‑Swap و Hot‑Plug در سرور و استوریج",
  "NVMe در سرورها چیست و چه تفاوتی با SSD معمولی دارد؟",
  "دلایل کند شدن سرور اچ پی",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
  "بررسی مفهوم Hot‑Swap و Hot‑Plug در سرور و استوریج",

  "برای شرکت‌ها نفره چه سرور HP مناسب است",
  "راهنمای انتخاب CPU سرور HP برای رفع کندی CRM، ERP و SQL",
];

export default function BlogSlider() {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollSnapType: "x mandatory" }}
    >
      {blogs.map((title, index) => (
        <div
          key={index}
          className="shrink-0"
          style={{ scrollSnapAlign: "start" }}
        >
          <BlogCard title={title} />
        </div>
      ))}
    </div>
  );
}
