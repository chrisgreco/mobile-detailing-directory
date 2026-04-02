import Link from "next/link";

export default function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const h = size === "small" ? "h-7" : "h-9";
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        className={`${h} w-auto`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield shape with water droplet */}
        <path
          d="M20 2L6 10V22C6 31.1 12.1 37.5 20 38C27.9 37.5 34 31.1 34 22V10L20 2Z"
          fill="#0F172A"
          stroke="#F97316"
          strokeWidth="1.5"
        />
        <path
          d="M20 10C20 10 14 18 14 22C14 25.3 16.7 28 20 28C23.3 28 26 25.3 26 22C26 18 20 10 20 10Z"
          fill="#F97316"
        />
        <circle cx="18.5" cy="20.5" r="1.5" fill="white" opacity="0.6" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-navy-900">
          Curb<span className="text-accent">Detail</span>
        </span>
        {size === "default" && (
          <span className="text-[10px] font-medium tracking-widest text-gray-400 uppercase">
            Mobile Detailing
          </span>
        )}
      </div>
    </Link>
  );
}
