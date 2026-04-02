import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatServiceName(slug: string): string {
  return slug
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatPriceRange(range: string | null): string {
  switch (range) {
    case "budget":
      return "$";
    case "mid":
      return "$$";
    case "premium":
      return "$$$";
    default:
      return "$$";
  }
}

export function getPricingByTier(tier: "metro" | "mid" | "small"): {
  low: number;
  high: number;
} {
  switch (tier) {
    case "metro":
      return { low: 150, high: 350 };
    case "mid":
      return { low: 100, high: 250 };
    case "small":
      return { low: 75, high: 175 };
  }
}

export function generateStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

export const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "curbdetail.com";
export const SITE_NAME = "CurbDetail";
export const SITE_URL = `https://${DOMAIN}`;
