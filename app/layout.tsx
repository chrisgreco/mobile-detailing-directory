import type { Metadata } from "next";
import Link from "next/link";
import { Car } from "lucide-react";
import Logo from "@/components/Logo";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find Mobile Car Detailing Near You`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Find the best mobile car detailing services near you. Compare prices, read reviews, and get free quotes from verified local detailers across 200+ US cities.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://curbdetail.com"),
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/ceramic-coating-near-me"
            className="text-sm font-medium text-gray-600 hover:text-navy-900"
          >
            Ceramic Coating
          </Link>
          <Link
            href="/full-detail-near-me"
            className="text-sm font-medium text-gray-600 hover:text-navy-900"
          >
            Full Detail
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-gray-600 hover:text-navy-900"
          >
            Guides
          </Link>
          <Link href="/add-listing" className="btn-primary py-2 text-sm">
            List Your Business
          </Link>
        </div>
        <Link
          href="/add-listing"
          className="btn-primary py-2 text-sm md:hidden"
        >
          List Your Business
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4">
              <Logo size="small" />
            </div>
            <p className="text-sm text-gray-400">
              The most comprehensive directory of mobile car detailers in the
              USA. Find, compare, and book local detailing services.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ceramic-coating-near-me" className="text-gray-300 hover:text-white">
                  Ceramic Coating
                </Link>
              </li>
              <li>
                <Link href="/paint-correction-near-me" className="text-gray-300 hover:text-white">
                  Paint Correction
                </Link>
              </li>
              <li>
                <Link href="/full-detail-near-me" className="text-gray-300 hover:text-white">
                  Full Detail
                </Link>
              </li>
              <li>
                <Link href="/interior-detailing-near-me" className="text-gray-300 hover:text-white">
                  Interior Detailing
                </Link>
              </li>
              <li>
                <Link href="/window-tinting-near-me" className="text-gray-300 hover:text-white">
                  Window Tinting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog/mobile-car-detailing-cost" className="text-gray-300 hover:text-white">
                  Detailing Cost Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/ceramic-coating-vs-wax" className="text-gray-300 hover:text-white">
                  Ceramic Coating vs Wax
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/add-listing" className="text-gray-300 hover:text-white">
                  Add Your Business
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
              Top Cities
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mobile-detailing-new-york-ny" className="text-gray-300 hover:text-white">
                  New York, NY
                </Link>
              </li>
              <li>
                <Link href="/mobile-detailing-los-angeles-ca" className="text-gray-300 hover:text-white">
                  Los Angeles, CA
                </Link>
              </li>
              <li>
                <Link href="/mobile-detailing-miami-fl" className="text-gray-300 hover:text-white">
                  Miami, FL
                </Link>
              </li>
              <li>
                <Link href="/mobile-detailing-chicago-il" className="text-gray-300 hover:text-white">
                  Chicago, IL
                </Link>
              </li>
              <li>
                <Link href="/mobile-detailing-houston-tx" className="text-gray-300 hover:text-white">
                  Houston, TX
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
