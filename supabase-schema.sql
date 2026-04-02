-- Mobile Detailing Directory Schema
-- Run this in your Supabase project SQL editor
-- All tables prefixed with md_ for "mobile detailing"

create table md_listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  business_name text not null,
  owner_name text,
  email text,
  phone text,
  website text,
  description text,
  city text not null,
  state text not null,
  state_abbr text not null,
  zip_codes text[],
  cities_served text[],
  services text[],
  price_range text,
  is_mobile boolean default true,
  featured boolean default false,
  status text default 'pending',
  rating numeric(3,2),
  review_count integer default 0,
  photos text[],
  created_at timestamptz default now()
);

create table md_reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references md_listings(id) on delete cascade,
  reviewer_name text,
  rating integer check (rating between 1 and 5),
  body text,
  created_at timestamptz default now()
);

create table md_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  city text,
  state text,
  vehicle_type text,
  service_needed text,
  created_at timestamptz default now()
);

-- Indexes for performance
create index idx_md_listings_status on md_listings(status);
create index idx_md_listings_city on md_listings(city, state_abbr);
create index idx_md_listings_featured on md_listings(featured) where featured = true;
create index idx_md_listings_slug on md_listings(slug);
create index idx_md_reviews_listing on md_reviews(listing_id);

-- Row Level Security
alter table md_listings enable row level security;
alter table md_reviews enable row level security;
alter table md_leads enable row level security;

-- Public read access for approved listings
create policy "Public can read approved listings"
  on md_listings for select
  using (status = 'approved');

-- Public can insert pending listings
create policy "Anyone can submit a listing"
  on md_listings for insert
  with check (status = 'pending');

-- Public read access for reviews
create policy "Public can read reviews"
  on md_reviews for select
  using (true);

-- Public can submit leads
create policy "Anyone can submit a lead"
  on md_leads for insert
  with check (true);

-- Service role has full access (handled by service_role key)
-- The service role key bypasses RLS automatically

-- Create storage bucket for photos
-- Run this separately or via the Supabase dashboard:
-- insert into storage.buckets (id, name, public) values ('md-photos', 'md-photos', true);
