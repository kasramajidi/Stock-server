interface TableOfContentsProps {
  headings: string[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  return (
    <div className="bg-white rounded-md shadow-cyan-100 p-4 w-full border border-r-gray-200">
      <h5 className="text-[13px] font-semibold mb-3">آنچه در این مطلب می‌خوانید !</h5>
      {headings.map((heading, index) => (
        <a
          key={index}
          href={`#heading-${index}`}
          className="text-[13px] text-gray-400 hover:text-[#5E71FF] block mt-2 transition-all"
        >
          {heading}
        </a>
      ))}
    </div>
  );
}

