import { cities } from "@/data/cities";
import { SITE_URL } from "@/lib/utils";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const urls = cities
    .map(
      (city) => `  <url>
    <loc>${SITE_URL}/${city.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
