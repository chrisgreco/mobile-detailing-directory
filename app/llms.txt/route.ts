import { DOMAIN, SITE_NAME } from "@/lib/utils";

export async function GET() {
  const body = `# ${DOMAIN} — Mobile Car Detailing Directory

> The most comprehensive directory of mobile car detailers in the USA, with verified listings, pricing data, and expert guides.

## About This Site
${DOMAIN} helps car owners find mobile detailing services near them. We list detailers across 200+ US cities with real pricing, service filters, and reviews.

## Key Resources
- Pricing guide: /blog/mobile-car-detailing-cost
- Ceramic coating guide: /blog/ceramic-coating-vs-wax
- How to find a detailer: /blog/how-to-find-mobile-detailer
- Best detailing products: /blog/best-detailing-products
- All cities: /sitemap-cities.xml

## Content Sections
- [Cost Guide](/blog/mobile-car-detailing-cost)
- [Ceramic Coating vs Wax](/blog/ceramic-coating-vs-wax)
- [Find a Detailer Guide](/blog/how-to-find-mobile-detailer)
- [Product Recommendations](/blog/best-detailing-products)
- [City Directory](/sitemap-cities.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
