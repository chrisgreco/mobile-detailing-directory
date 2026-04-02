import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // Return a dummy client for build time — no DB calls will succeed
      return createClient("https://placeholder.supabase.co", "placeholder");
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Keep backward compat alias
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getSupabase() as any)[prop];
  },
});

export function getServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(url, serviceRoleKey);
}

export type Listing = {
  id: string;
  slug: string;
  business_name: string;
  owner_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  city: string;
  state: string;
  state_abbr: string;
  zip_codes: string[];
  cities_served: string[];
  services: string[];
  price_range: string | null;
  is_mobile: boolean;
  featured: boolean;
  status: string;
  rating: number | null;
  review_count: number;
  photos: string[];
  created_at: string;
};

export type Review = {
  id: string;
  listing_id: string;
  reviewer_name: string | null;
  rating: number;
  body: string | null;
  created_at: string;
};

export type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  vehicle_type: string | null;
  service_needed: string | null;
  created_at: string;
};

export async function getApprovedListings() {
  const { data } = await supabase
    .from("md_listings")
    .select("*")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });
  return (data as Listing[]) || [];
}

export async function getFeaturedListings(limit = 12) {
  const { data } = await supabase
    .from("md_listings")
    .select("*")
    .eq("status", "approved")
    .eq("featured", true)
    .order("rating", { ascending: false })
    .limit(limit);
  return (data as Listing[]) || [];
}

export async function getListingsByCity(city: string, stateAbbr: string) {
  const { data } = await supabase
    .from("md_listings")
    .select("*")
    .eq("status", "approved")
    .eq("city", city)
    .eq("state_abbr", stateAbbr)
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });
  return (data as Listing[]) || [];
}

export async function getListingsByService(service: string) {
  const { data } = await supabase
    .from("md_listings")
    .select("*")
    .eq("status", "approved")
    .contains("services", [service])
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });
  return (data as Listing[]) || [];
}

export async function getListingBySlug(slug: string) {
  const { data } = await supabase
    .from("md_listings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();
  return data as Listing | null;
}

export async function getReviewsForListing(listingId: string) {
  const { data } = await supabase
    .from("md_reviews")
    .select("*")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });
  return (data as Review[]) || [];
}

export async function getAllApprovedSlugs() {
  const { data } = await supabase
    .from("md_listings")
    .select("slug")
    .eq("status", "approved");
  return (data?.map((d) => d.slug) as string[]) || [];
}
