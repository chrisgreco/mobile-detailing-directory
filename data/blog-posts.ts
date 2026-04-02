export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mobile-car-detailing-cost",
    title: "How Much Does Mobile Car Detailing Cost in 2026?",
    description:
      "Complete pricing guide for mobile car detailing services. Compare costs by service type, vehicle size, and city across the US.",
    publishedAt: "2026-01-15",
    readingTime: "6 min read",
  },
  {
    slug: "ceramic-coating-vs-wax",
    title: "Ceramic Coating vs Wax vs Paint Sealant: Which Is Worth It?",
    description:
      "Side-by-side comparison of ceramic coatings, traditional wax, and paint sealants. Durability, cost, and protection compared.",
    publishedAt: "2026-02-03",
    readingTime: "5 min read",
  },
  {
    slug: "how-to-find-mobile-detailer",
    title:
      "How to Find a Reputable Mobile Car Detailer Near You (7 Things to Check)",
    description:
      "Seven things to look for when hiring a mobile detailer, from insurance and reviews to products and pricing red flags.",
    publishedAt: "2026-02-18",
    readingTime: "5 min read",
  },
  {
    slug: "best-detailing-products",
    title: "Best Car Detailing Products Detailers Actually Use in 2026",
    description:
      "The products professional detailers keep in their van. Ceramic coatings, soaps, interior cleaners, polishes, and microfibers.",
    publishedAt: "2026-03-05",
    readingTime: "6 min read",
  },
  {
    slug: "mobile-vs-shop-detailing",
    title: "Mobile Detailing vs Shop Detailing: Which Is Better?",
    description:
      "Comparing mobile and shop-based detailing on price, convenience, quality, and results. Which option is right for you?",
    publishedAt: "2026-03-15",
    readingTime: "4 min read",
  },
  {
    slug: "what-is-paint-correction",
    title: "What Is Paint Correction? A Complete Guide",
    description:
      "Everything you need to know about paint correction: what it is, the stages, how much it costs, and when your car needs it.",
    publishedAt: "2026-03-28",
    readingTime: "5 min read",
  },
];
