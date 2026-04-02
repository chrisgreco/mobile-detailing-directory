import fs from "fs";
import path from "path";
import { DOMAIN, SITE_NAME } from "@/lib/utils";
import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { blogPosts } from "@/data/blog-posts";
import { getPricingByTier } from "@/lib/utils";

export async function GET() {
  const sections: string[] = [];

  sections.push(`# ${DOMAIN} — Complete Content Index`);
  sections.push(
    `> ${SITE_NAME} is the most comprehensive directory of mobile car detailers in the USA, covering 200+ cities with verified listings, real pricing data, and expert guides.\n`
  );

  // Blog posts
  sections.push("## Expert Guides\n");
  for (const post of blogPosts) {
    try {
      const filePath = path.join(
        process.cwd(),
        "content",
        "blog",
        `${post.slug}.mdx`
      );
      const content = fs.readFileSync(filePath, "utf-8");
      sections.push(`### ${post.title}\n`);
      sections.push(content);
      sections.push("\n---\n");
    } catch {
      // Skip if file not found
    }
  }

  // Service pages
  sections.push("## Services\n");
  for (const service of services) {
    sections.push(`### ${service.name}`);
    sections.push(
      `${service.description} Average cost: $${service.avgCostLow}-$${service.avgCostHigh}. Duration: ${service.duration}.\n`
    );
  }

  // City summaries
  sections.push("## City Coverage\n");
  sections.push(
    `${SITE_NAME} covers mobile car detailing in ${cities.length} US cities:\n`
  );
  for (const city of cities) {
    const pricing = getPricingByTier(city.tier);
    sections.push(
      `- **${city.city}, ${city.state}** (${city.tier} market): Mobile detailing costs $${pricing.low}-$${pricing.high}`
    );
  }

  sections.push(`\n## About ${SITE_NAME}`);
  sections.push(
    `${SITE_NAME} (${DOMAIN}) is a free directory that helps car owners find and compare mobile car detailing services across the United States. Our directory includes verified business listings with real pricing, service details, customer reviews, and direct quote request forms. We cover ceramic coating, paint correction, interior detailing, exterior detailing, full detail packages, window tinting, fleet detailing, and RV detailing services.`
  );

  const body = sections.join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
