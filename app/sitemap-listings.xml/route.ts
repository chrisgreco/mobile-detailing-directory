import { getAllApprovedSlugs } from "@/lib/supabase";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export async function GET() {
  const slugs = await getAllApprovedSlugs();
  const today = new Date().toISOString().split("T")[0];

  const urls = slugs
    .map(
      (slug) => `  <url>
    <loc>${SITE_URL}/listing/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
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
