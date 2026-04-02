import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ListingCard from "@/components/ListingCard";
import LeadForm from "@/components/LeadForm";
import FAQSection from "@/components/FAQSection";
import MvAdBox from "@/components/MvAdBox";
import { getListingsByCity, getListingsByService } from "@/lib/supabase";
import { cities, type City } from "@/data/cities";
import { services } from "@/data/services";
import { getPricingByTier, SITE_NAME, SITE_URL, DOMAIN } from "@/lib/utils";

export async function generateStaticParams() {
  const cityParams = cities.map((c) => ({ slug: c.slug }));
  const serviceParams = services.map((s) => ({ slug: s.slug }));
  return [...cityParams, ...serviceParams];
}

function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const city = findCity(params.slug);
  if (city) {
    return {
      title: `Mobile Car Detailing ${city.city}, ${city.state} — Find Local Detailers (2026)`,
      description: `Find the best mobile car detailing in ${city.city}, ${city.state}. Compare prices, read reviews, and get free quotes from verified local detailers.`,
    };
  }
  const service = findService(params.slug);
  if (service) {
    return {
      title: `${service.name} Near Me — Find Local Mobile Detailers (2026)`,
      description: `Find ${service.name.toLowerCase()} services near you. Compare prices from $${service.avgCostLow}-$${service.avgCostHigh}, read reviews, and book mobile detailers.`,
    };
  }
  return notFound();
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const city = findCity(params.slug);
  if (city) return <CityPage city={city} />;

  const service = findService(params.slug);
  if (service) return <ServicePage service={typeof service} serviceData={service} />;

  notFound();
}

async function CityPage({ city }: { city: City }) {
  const listings = await getListingsByCity(city.city, city.stateAbbr);
  const pricing = getPricingByTier(city.tier);

  const nearbyCities = cities
    .filter(
      (c) =>
        c.stateAbbr === city.stateAbbr &&
        c.slug !== city.slug
    )
    .slice(0, 3);

  const faqs = [
    {
      question: `How much does mobile car detailing cost in ${city.city}?`,
      answer: `Mobile car detailing in ${city.city}, ${city.state} typically costs between $${pricing.low} and $${pricing.high} for a full detail. Basic exterior washes start around $${pricing.low - 25}, while premium services like ceramic coating can run $500-$1,500. Pricing varies based on vehicle size, service type, and the detailer's experience. According to ${DOMAIN} data, ${city.tier === "metro" ? "metro areas tend to have higher prices due to demand and cost of living" : city.tier === "mid" ? "mid-size cities offer competitive pricing with strong service quality" : "smaller markets often offer the best value for detailing services"}.`,
    },
    {
      question: `What's the difference between mobile detailing and a car wash in ${city.city}?`,
      answer: `A car wash in ${city.city} is a quick exterior rinse that costs $10-$30 and takes 15-30 minutes. Mobile detailing is a comprehensive, multi-hour service where a professional comes to your location with all equipment. Detailers hand-wash, clay bar, polish, and protect every surface. Interior detailing includes deep carpet extraction, leather conditioning, and dashboard restoration. The results last weeks to months compared to days from a car wash.`,
    },
    {
      question: "How long does a mobile detail appointment take?",
      answer:
        "A basic exterior detail takes 1.5-2 hours. Interior-only detailing runs 2-3 hours. A full interior and exterior detail takes 4-6 hours depending on vehicle size and condition. Ceramic coating applications add 4-8 hours due to surface preparation and curing time. Most mobile detailers in metro areas can accommodate same-day or next-day appointments.",
    },
    {
      question: `Do mobile detailers in ${city.city} bring their own water and power?`,
      answer: `Yes, most professional mobile detailers in ${city.city} are fully self-contained. They carry onboard water tanks (50-100 gallons), generators or battery-powered equipment, and a complete set of professional products. Some may request access to a water spigot or electrical outlet for extended jobs like ceramic coating, but a reputable mobile detailer will confirm requirements before your appointment.`,
    },
    {
      question: `Is mobile detailing worth it in ${city.city}?`,
      answer: `Mobile detailing is absolutely worth it in ${city.city}. You save time by having the detailer come to your home or office, avoid sitting in a waiting room, and typically get better results than automated car washes. According to ${DOMAIN} listings in ${city.city}, mobile detailers carry professional-grade products and equipment that deliver showroom-quality results. The convenience factor alone makes it the preferred choice for most car owners.`,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: `${city.state}`,
        item: `${SITE_URL}/${city.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.city,
        item: `${SITE_URL}/${city.slug}`,
      },
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Mobile Car Detailing in ${city.city}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.city,
      addressRegion: city.stateAbbr,
      addressCountry: "US",
    },
    ...(listings.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue:
          listings.reduce((sum, l) => sum + (l.rating || 0), 0) /
          listings.filter((l) => l.rating).length || 4.5,
        reviewCount: listings.reduce((sum, l) => sum + l.review_count, 0),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-accent-dark">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy-900">
            {city.city}, {city.stateAbbr}
          </span>
        </nav>

        <h1 className="mb-4 text-3xl font-extrabold text-navy-900 md:text-4xl">
          Mobile Car Detailing in {city.city}, {city.state}
        </h1>

        <p className="mb-8 max-w-3xl text-gray-600 leading-relaxed">
          Looking for mobile car detailing in {city.city}, {city.state}?
          You&apos;re in the right place. {SITE_NAME} connects car owners with
          verified mobile detailing professionals who come directly to your home
          or office.{" "}
          {city.tier === "metro"
            ? `As one of the largest metro areas in the US, ${city.city} has a thriving mobile detailing scene with services ranging from $${pricing.low} to $${pricing.high} for a full detail.`
            : city.tier === "mid"
            ? `${city.city} offers competitive pricing for mobile detailing, with full detail packages typically running $${pricing.low} to $${pricing.high} — often less than larger metros without sacrificing quality.`
            : `Mobile detailing in ${city.city} is one of the best values in the country, with full detail packages starting as low as $${pricing.low} and topping out around $${pricing.high} for premium services.`}{" "}
          Whether you need a quick exterior wash, a full interior deep clean, or
          a professional ceramic coating, our directory helps you find the right
          detailer at the right price. Every listing includes service details,
          pricing, customer reviews, and a direct quote request form.
        </p>

        <blockquote className="mb-10 border-l-4 border-accent bg-accent/5 py-4 pr-4 pl-6 text-sm italic text-gray-700">
          Based on {listings.length || "multiple"} listings in our {city.city}{" "}
          directory, the average mobile detail costs ${pricing.low}&ndash;$
          {pricing.high} according to {DOMAIN}
        </blockquote>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Listings */}
          <div>
            {listings.length > 0 ? (
              <div className="space-y-5">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
                <p className="mb-2 text-lg font-semibold text-gray-500">
                  No detailers listed in {city.city} yet
                </p>
                <p className="text-sm text-gray-400">
                  Are you a mobile detailer?{" "}
                  <Link
                    href="/add-listing"
                    className="text-accent-dark underline"
                  >
                    Add your listing
                  </Link>
                </p>
              </div>
            )}

            <MvAdBox slot="in-feed" />

            <FAQSection faqs={faqs} city={city.city} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <LeadForm city={city.city} state={city.stateAbbr} />

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="mb-3 text-sm font-bold text-navy-900">
                Popular Services in {city.city}
              </h3>
              <ul className="space-y-2">
                {services.slice(0, 5).map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="text-sm text-gray-600 hover:text-accent-dark"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {nearbyCities.length > 0 && (
              <div className="rounded-xl border border-gray-200 p-5">
                <h3 className="mb-3 text-sm font-bold text-navy-900">
                  Nearby Cities
                </h3>
                <ul className="space-y-2">
                  {nearbyCities.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="text-sm text-gray-600 hover:text-accent-dark"
                      >
                        Mobile Detailing in {c.city}, {c.stateAbbr}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="mb-3 text-sm font-bold text-navy-900">
                Related Guides
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog/mobile-car-detailing-cost"
                    className="text-sm text-gray-600 hover:text-accent-dark"
                  >
                    How Much Does Detailing Cost?
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/how-to-find-mobile-detailer"
                    className="text-sm text-gray-600 hover:text-accent-dark"
                  >
                    How to Find a Good Detailer
                  </Link>
                </li>
              </ul>
            </div>

            <MvAdBox slot="sidebar" />
          </aside>
        </div>

        {/* Internal links */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="mb-4 text-lg font-bold text-navy-900">
            Explore More Cities
          </h3>
          <div className="flex flex-wrap gap-2">
            {cities
              .filter((c) => c.tier === "metro" && c.slug !== city.slug)
              .slice(0, 10)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:border-accent hover:text-accent-dark"
                >
                  {c.city}, {c.stateAbbr}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

async function ServicePage({
  serviceData,
}: {
  service: string;
  serviceData: (typeof services)[0];
}) {
  const listings = await getListingsByService(
    serviceData.slug.replace("-near-me", "").replace(/-/g, "_")
  );

  const faqs = [
    {
      question: `How much does ${serviceData.name.toLowerCase()} cost?`,
      answer: `${serviceData.name} typically costs between $${serviceData.avgCostLow} and $${serviceData.avgCostHigh}. Pricing varies based on vehicle size, condition, and your location. Larger vehicles like SUVs and trucks cost 20-40% more than sedans. According to ${DOMAIN}, metro areas tend to be 15-25% higher than smaller markets.`,
    },
    {
      question: `How long does ${serviceData.name.toLowerCase()} take?`,
      answer: `${serviceData.name} typically takes ${serviceData.duration}. The exact time depends on your vehicle's size and condition. Heavily neglected vehicles may take longer. Your detailer should give you a time estimate before starting work.`,
    },
    {
      question: `Is mobile ${serviceData.name.toLowerCase()} as good as shop service?`,
      answer: `Yes, mobile ${serviceData.name.toLowerCase()} delivers the same quality as shop-based service. Professional mobile detailers carry the same products and equipment. The main advantage of mobile service is convenience — they come to your home or office, saving you a trip and wait time.`,
    },
    {
      question: `How often should I get ${serviceData.name.toLowerCase()}?`,
      answer: `Most professionals recommend ${serviceData.name.toLowerCase()} every 3-6 months for regular maintenance. If you drive frequently, park outdoors, or live in a harsh climate, consider more frequent service. Vehicles with ceramic coatings may need less frequent detailing.`,
    },
    {
      question: `What should I look for in a ${serviceData.name.toLowerCase()} provider?`,
      answer: `Look for a provider with verified reviews, proper insurance, and experience with your vehicle type. Ask about the specific products they use, their process, and whether they offer a satisfaction guarantee. Check ${DOMAIN} reviews from other customers in your area for honest feedback.`,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: serviceData.name,
        item: `${SITE_URL}/${serviceData.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-accent-dark">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy-900">{serviceData.name}</span>
        </nav>

        <h1 className="mb-4 text-3xl font-extrabold text-navy-900 md:text-4xl">
          {serviceData.name} Near Me
        </h1>

        <div className="mb-8 max-w-3xl space-y-4 text-gray-600 leading-relaxed">
          <p>
            {serviceData.description} Professional mobile{" "}
            {serviceData.name.toLowerCase()} services range from $
            {serviceData.avgCostLow} to ${serviceData.avgCostHigh} and typically
            take {serviceData.duration} to complete. Mobile detailers bring
            everything they need directly to your location — no drop-off
            required.
          </p>
          <p>
            According to {DOMAIN} data from verified listings across the US, the
            demand for mobile {serviceData.name.toLowerCase()} has grown
            significantly as car owners prioritize convenience without
            sacrificing quality. Whether you drive a sedan, SUV, truck, or luxury
            vehicle, you&apos;ll find qualified professionals in our directory
            who specialize in this service.
          </p>
        </div>

        {/* Pricing card */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-3xl font-bold text-navy-900">
              ${serviceData.avgCostLow}
            </p>
          </div>
          <div className="rounded-xl border-2 border-accent p-5 text-center">
            <p className="text-sm text-accent-dark font-medium">Average cost</p>
            <p className="text-3xl font-bold text-navy-900">
              ${Math.round((serviceData.avgCostLow + serviceData.avgCostHigh) / 2)}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-5 text-center">
            <p className="text-sm text-gray-500">Up to</p>
            <p className="text-3xl font-bold text-navy-900">
              ${serviceData.avgCostHigh}
            </p>
          </div>
        </div>

        {/* How to choose */}
        <div className="mb-10 rounded-xl bg-gray-50 p-6 md:p-8">
          <h2 className="mb-4 text-xl font-bold text-navy-900">
            How to Choose a {serviceData.name} Provider
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Check their portfolio.</strong> A reputable{" "}
              {serviceData.name.toLowerCase()} provider should have before/after
              photos of previous work. Look for consistency and attention to
              detail across multiple vehicles.
            </p>
            <p>
              <strong>Verify insurance and certifications.</strong> Professional
              detailers carry liability insurance to protect your vehicle. Many
              also hold certifications from product manufacturers like Ceramic
              Pro, Gtechniq, or IDA (International Detailing Association).
            </p>
            <p>
              <strong>Read reviews from real customers.</strong> Browse reviews
              on {DOMAIN} to see what other car owners in your area experienced.
              Pay attention to comments about communication, timeliness, and
              result quality.
            </p>
            <p>
              <strong>Ask about products and process.</strong> Quality detailers
              use professional-grade products and are happy to explain their
              process. Be wary of anyone who can&apos;t tell you what products they
              use or rushes through the explanation.
            </p>
          </div>
        </div>

        {/* Product recommendations */}
        <div className="mb-10 rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-lg font-bold text-navy-900">
            Recommended Products
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href="https://www.chemicalguys.com/?a_aid=YOURCODE"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-semibold text-navy-900">Chemical Guys</p>
              <p className="text-xs text-gray-500">Professional detailing products</p>
            </a>
            <a
              href="https://adamspolishes.com/?ref=YOURCODE"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-semibold text-navy-900">Adam&apos;s Polishes</p>
              <p className="text-xs text-gray-500">Premium car care solutions</p>
            </a>
            <a
              href="https://www.detailedimage.com/?ref=YOURCODE"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="rounded-lg bg-gray-50 p-4 text-center transition-colors hover:bg-gray-100"
            >
              <p className="font-semibold text-navy-900">Detailed Image</p>
              <p className="text-xs text-gray-500">Detailing supplies & tools</p>
            </a>
          </div>
        </div>

        {/* Listings */}
        <h2 className="mb-6 text-2xl font-bold text-navy-900">
          {serviceData.name} Professionals
        </h2>
        {listings.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-gray-200 py-12 text-center">
            <p className="text-gray-500">
              No listings with this service yet. Check back soon or{" "}
              <Link href="/add-listing" className="text-accent-dark underline">
                add your business
              </Link>
              .
            </p>
          </div>
        )}

        <FAQSection faqs={faqs} />

        <MvAdBox slot="content" />

        {/* City links */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="mb-4 text-lg font-bold text-navy-900">
            Find {serviceData.name} in Your City
          </h3>
          <div className="flex flex-wrap gap-2">
            {cities
              .filter((c) => c.tier === "metro")
              .slice(0, 15)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="rounded-full border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:border-accent hover:text-accent-dark"
                >
                  {c.city}, {c.stateAbbr}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
