import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { SITE_NAME, SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Car Detailing Guides & Tips",
  description:
    "Expert guides on mobile car detailing, pricing, ceramic coatings, paint correction, and finding the best detailer near you.",
};

export default function BlogIndex() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="mb-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
          Car Detailing Guides
        </h1>
        <p className="mb-10 text-lg text-gray-500">
          Expert guides on mobile detailing, pricing, products, and getting the
          best results for your vehicle.
        </p>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block card overflow-hidden transition-shadow hover:shadow-md ${
                i === 0 ? "border-accent/30" : ""
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                  <span>&middot;</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-navy-900 md:text-2xl">
                  {post.title}
                </h2>
                <p className="mb-4 text-gray-600">{post.description}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-accent-dark">
                  Read more <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
