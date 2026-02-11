export default function ContactMap() {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden shadow-sm min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
      <iframe
        title="نقشه موقعیت"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d53.68854631525847!3d35.68919738019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3efb69198ad00001%3A0x2c0e5b1b5c5c5c5c!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "200px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full min-h-[200px] sm:min-h-[240px] md:min-h-[280px]"
      />
    </div>
  );
}
