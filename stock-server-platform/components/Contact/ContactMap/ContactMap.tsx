export default function ContactMap() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d53.68854631525847!3d35.68919738019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3efb69198ad00001%3A0x2c0e5b1b5c5c5c5c!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus";

  return (
    <div className="flex flex-col h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]">
      <div className="flex-1 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
        <iframe
          title="نقشه موقعیت"
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "220px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]"
        />
      </div>
      <a
        href="https://www.google.com/maps/dir//Tehran,+Iran"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-[#17e2fe]/10 border border-[#17e2fe]/30 text-gray-800 font-medium text-sm hover:bg-[#17e2fe]/20 transition-colors"
      >
        <span>شروع مسیر</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </a>
    </div>
  );
}
