import Link from "next/link";
import { ArrowRight, Search, Star, Shield, Clock } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import ListingCard from "@/components/ListingCard";
import LeadForm from "@/components/LeadForm";
import MvAdBox from "@/components/MvAdBox";
import { getFeaturedListings } from "@/lib/supabase";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog-posts";
import { SITE_NAME, SITE_URL, DOMAIN } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const featuredListings = await getFeaturedListings(12);
  const topCities = cities.filter((c) => c.tier === "metro").slice(0, 20);

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/mobile-detailing-{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "The most comprehensive directory of mobile car detailers in the USA.",
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: featuredListings.map((listing, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: listing.business_name,
        url: `${SITE_URL}/listing/${listing.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-navy-900 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Find Mobile Car Detailing Near You
          </h1>
          <p className="mb-8 text-lg text-gray-300">
            Compare prices, read reviews, and get free quotes from verified
            mobile detailers across 200+ US cities.
          </p>
          <div className="mx-auto max-w-xl">
            <CitySearch size="lg" />
          </div>
        </div>
      </section>

      {/* Service chips */}
      <section className="border-b border-gray-100 bg-gray-50 px-4 py-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-navy-900 transition-colors hover:border-accent hover:text-accent-dark"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">
              Featured Detailers
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Top-rated mobile detailing professionals across the country
            </p>
          </div>
        </div>
        {featuredListings.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
            <p className="text-gray-500">
              Listings will appear here once the database is seeded.
            </p>
          </div>
        )}
      </section>

      <MvAdBox slot="in-feed" />

      {/* How It Works */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-navy-900">
            How It Works
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Search",
                desc: "Enter your city to find mobile detailers near you. Filter by service, price, and ratings.",
              },
              {
                icon: Star,
                title: "Compare",
                desc: "Read reviews, compare pricing, and check services offered by each detailer in your area.",
              },
              {
                icon: Shield,
                title: "Book",
                desc: "Request free quotes from up to 3 detailers. They come to you — no shop visit required.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <step.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-bold text-navy-900">
              Get Free Quotes in Minutes
            </h2>
            <p className="mb-6 text-gray-600">
              Tell us what you need and we&apos;ll connect you with up to 3
              top-rated mobile detailers in your area. No obligation, no cost.
            </p>
            <div className="space-y-4">
              {[
                "Verified, insured professionals",
                "Free quotes within 24 hours",
                "Compare prices side by side",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-3.5 w-3.5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* Top Cities */}
      <section className="bg-navy-900 px-4 py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Mobile Detailing by City
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="rounded-lg border border-gray-700 px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-accent hover:text-white"
              >
                {city.city}, {city.stateAbbr}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-navy-900">
            Latest from the Blog
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm font-medium text-accent-dark hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card overflow-hidden transition-shadow hover:shadow-md"
            >
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mb-2 font-bold text-navy-900 leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA for detailers */}
      <section className="bg-accent px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Are You a Mobile Detailer?
          </h2>
          <p className="mb-6 text-orange-100">
            Get found by thousands of car owners searching for detailing
            services in your area. List your business for free.
          </p>
          <Link
            href="/add-listing"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-semibold text-accent-dark transition-colors hover:bg-gray-50"
          >
            Add Your Business <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* PDF CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="rounded-2xl bg-navy-800 p-8 text-center md:p-12">
          <h2 className="mb-3 text-xl font-bold text-white md:text-2xl">
            The Mobile Detailing Checklist
          </h2>
          <p className="mb-6 text-gray-300">
            What to ask, red flags to watch for, and how to get the best price.
            The only checklist you need before hiring a detailer.
          </p>
          <a
            href="https://gumroad.com/YOURPRODUCT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Download for $19
          </a>
        </div>
      </section>

      {/* Full City List for SEO */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-lg font-bold text-navy-900">
            All Cities We Cover
          </h2>
          <div className="columns-2 gap-4 text-sm sm:columns-3 md:columns-4 lg:columns-5">
            {cities
              .sort((a, b) => a.city.localeCompare(b.city))
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="mb-1 block text-gray-500 hover:text-accent-dark"
                >
                  {city.city}, {city.stateAbbr}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
