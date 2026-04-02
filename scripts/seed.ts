/**
 * Seed script for mobile detailing directory.
 *
 * Inserts 50 realistic listings into md_listings and 2-3 reviews
 * for each of the 10 featured listings into md_reviews.
 *
 * Prerequisites:
 *   npm install -D dotenv
 *   (also needs @supabase/supabase-js which should already be installed)
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Required env vars (in .env or .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ---------------------------------------------------------------------------
// 50 listings across 10 cities (5 per city)
// The first 2 in each city are featured = true
// ---------------------------------------------------------------------------

const listings = [
  // =========================================================================
  // NEW YORK, NY
  // =========================================================================
  {
    business_name: "ShineRight Mobile Detailing",
    slug: "shineright-mobile-detailing-new-york",
    owner_name: "Marcus Johnson",
    email: "marcus@shinerightdetailing.com",
    phone: "(212) 555-0147",
    website: "https://www.shinerightdetailing.com",
    description:
      "ShineRight Mobile Detailing brings showroom-quality results to your doorstep anywhere in Manhattan and the surrounding boroughs. We specialize in ceramic coatings and paint correction using only premium products. Our team has over 12 years of experience working with luxury and exotic vehicles.",
    city: "New York",
    state: "New York",
    state_abbr: "NY",
    zip_codes: ["10001", "10011", "10018"],
    cities_served: ["Manhattan", "Brooklyn", "Queens", "Hoboken", "Jersey City"],
    services: ["ceramic_coating", "paint_correction", "full_detail", "interior"],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.9,
    review_count: 142,
    photos: [],
  },
  {
    business_name: "Empire State Auto Spa",
    slug: "empire-state-auto-spa-new-york",
    owner_name: "David Kim",
    email: "david@empirestateautospa.com",
    phone: "(212) 555-0283",
    website: "https://www.empirestateautospa.com",
    description:
      "Empire State Auto Spa offers a full suite of mobile detailing services across New York City. From basic washes to multi-stage paint correction, we treat every car like it belongs in a showroom. We are fully insured and bring our own water supply.",
    city: "New York",
    state: "New York",
    state_abbr: "NY",
    zip_codes: ["10002", "10003", "10012"],
    cities_served: ["Manhattan", "Bronx", "Staten Island", "Yonkers"],
    services: ["full_detail", "exterior", "interior", "paint_correction"],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 98,
    photos: [],
  },
  {
    business_name: "Five Borough Detail Co.",
    slug: "five-borough-detail-co-new-york",
    owner_name: "Anthony Russo",
    email: "anthony@fiveboroughdetail.com",
    phone: "(718) 555-0391",
    website: "https://www.fiveboroughdetail.com",
    description:
      "Five Borough Detail Co. proudly serves all five boroughs of New York City. We offer affordable exterior and interior packages perfect for daily drivers and weekend warriors alike. Book online and we come to you within 24 hours.",
    city: "New York",
    state: "New York",
    state_abbr: "NY",
    zip_codes: ["10301", "11201", "10451"],
    cities_served: ["Brooklyn", "Staten Island", "Bronx"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.5,
    review_count: 67,
    photos: [],
  },
  {
    business_name: "Gotham Gloss Detailing",
    slug: "gotham-gloss-detailing-new-york",
    owner_name: "Samantha Torres",
    email: "samantha@gothamgloss.com",
    phone: "(347) 555-0174",
    website: "https://www.gothamgloss.com",
    description:
      "Gotham Gloss Detailing focuses on convenience and quality for busy New Yorkers. Our express detail packages fit into your lunch break while our premium options rival the best fixed-location shops. We serve residential and commercial garage locations.",
    city: "New York",
    state: "New York",
    state_abbr: "NY",
    zip_codes: ["10016", "10017", "10022"],
    cities_served: ["Midtown", "Upper East Side", "Long Island City", "Astoria"],
    services: ["exterior", "interior", "ceramic_coating"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.3,
    review_count: 41,
    photos: [],
  },
  {
    business_name: "Hudson River Auto Care",
    slug: "hudson-river-auto-care-new-york",
    owner_name: "Brian Walsh",
    email: "brian@hudsonriverautocare.com",
    phone: "(917) 555-0462",
    website: "https://www.hudsonriverautocare.com",
    description:
      "Hudson River Auto Care provides eco-friendly mobile detailing throughout the west side of Manhattan and into New Jersey. We use waterless wash technology and biodegradable products to deliver outstanding results with minimal environmental impact.",
    city: "New York",
    state: "New York",
    state_abbr: "NY",
    zip_codes: ["10023", "10024", "10025"],
    cities_served: ["Upper West Side", "Harlem", "Washington Heights"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.1,
    review_count: 29,
    photos: [],
  },

  // =========================================================================
  // LOS ANGELES, CA
  // =========================================================================
  {
    business_name: "Elite Auto Spa LA",
    slug: "elite-auto-spa-los-angeles",
    owner_name: "Carlos Mendez",
    email: "carlos@eliteautospala.com",
    phone: "(310) 555-0198",
    website: "https://www.eliteautospala.com",
    description:
      "Elite Auto Spa LA is the go-to mobile detailing service for car enthusiasts across Los Angeles. We work with everything from classic muscle cars to the latest supercars. Our ceramic coating packages come with a 5-year warranty and unmatched gloss.",
    city: "Los Angeles",
    state: "California",
    state_abbr: "CA",
    zip_codes: ["90001", "90012", "90024"],
    cities_served: [
      "Beverly Hills",
      "Santa Monica",
      "West Hollywood",
      "Culver City",
      "Brentwood",
    ],
    services: [
      "ceramic_coating",
      "paint_correction",
      "full_detail",
      "window_tint",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.9,
    review_count: 134,
    photos: [],
  },
  {
    business_name: "SoCal Shine Mobile Detail",
    slug: "socal-shine-mobile-detail-los-angeles",
    owner_name: "Tyler Brooks",
    email: "tyler@socalshine.com",
    phone: "(323) 555-0327",
    website: "https://www.socalshine.com",
    description:
      "SoCal Shine brings professional-grade mobile detailing directly to homes and offices across greater Los Angeles. Our technicians are IDA-certified and use only pH-balanced, paint-safe products. We also offer fleet accounts for businesses with multiple vehicles.",
    city: "Los Angeles",
    state: "California",
    state_abbr: "CA",
    zip_codes: ["90028", "90036", "90046"],
    cities_served: ["Hollywood", "Silver Lake", "Echo Park", "Los Feliz"],
    services: ["full_detail", "exterior", "interior", "fleet"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 89,
    photos: [],
  },
  {
    business_name: "Sunset Strip Detailing",
    slug: "sunset-strip-detailing-los-angeles",
    owner_name: "Rachel Nguyen",
    email: "rachel@sunsetstripdetailing.com",
    phone: "(424) 555-0215",
    website: "https://www.sunsetstripdetailing.com",
    description:
      "Sunset Strip Detailing caters to the entertainment industry professionals of Los Angeles. We understand the importance of first impressions and ensure your vehicle always looks camera-ready. Flexible scheduling accommodates even the busiest production schedules.",
    city: "Los Angeles",
    state: "California",
    state_abbr: "CA",
    zip_codes: ["90069", "90048", "90038"],
    cities_served: [
      "West Hollywood",
      "Beverly Hills",
      "Hancock Park",
      "Miracle Mile",
    ],
    services: ["full_detail", "interior", "exterior", "ceramic_coating"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.6,
    review_count: 72,
    photos: [],
  },
  {
    business_name: "Pacific Coast Auto Detail",
    slug: "pacific-coast-auto-detail-los-angeles",
    owner_name: "James O'Brien",
    email: "james@pacificcoastautodetail.com",
    phone: "(310) 555-0489",
    website: "https://www.pacificcoastautodetail.com",
    description:
      "Pacific Coast Auto Detail specializes in protecting your vehicle from the harsh Southern California sun. Our UV-resistant ceramic coatings and interior conditioning treatments keep your car looking new year-round. We serve the entire Westside.",
    city: "Los Angeles",
    state: "California",
    state_abbr: "CA",
    zip_codes: ["90401", "90291", "90066"],
    cities_served: [
      "Santa Monica",
      "Venice",
      "Marina del Rey",
      "Playa del Rey",
    ],
    services: ["ceramic_coating", "interior", "exterior"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.4,
    review_count: 53,
    photos: [],
  },
  {
    business_name: "LA Fresh Auto Care",
    slug: "la-fresh-auto-care-los-angeles",
    owner_name: "Miguel Santos",
    email: "miguel@lafreshautocare.com",
    phone: "(213) 555-0573",
    website: "https://www.lafreshautocare.com",
    description:
      "LA Fresh Auto Care delivers affordable mobile detailing services across downtown Los Angeles and surrounding neighborhoods. We offer same-day appointments and bundle deals for repeat customers. Perfect for commuters who want a clean ride without the hassle.",
    city: "Los Angeles",
    state: "California",
    state_abbr: "CA",
    zip_codes: ["90013", "90014", "90015"],
    cities_served: ["Downtown LA", "Koreatown", "Boyle Heights"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 38,
    photos: [],
  },

  // =========================================================================
  // MIAMI, FL
  // =========================================================================
  {
    business_name: "Diamond Gloss Detailing",
    slug: "diamond-gloss-detailing-miami",
    owner_name: "Ricardo Alvarez",
    email: "ricardo@diamondglossdetailing.com",
    phone: "(305) 555-0163",
    website: "https://www.diamondglossdetailing.com",
    description:
      "Diamond Gloss Detailing is Miami's premier mobile detailing service for luxury and exotic vehicles. We work extensively with Lamborghini, Ferrari, and Rolls-Royce owners across South Florida. Our graphene ceramic coatings provide unmatched protection against the tropical climate.",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    zip_codes: ["33101", "33130", "33132"],
    cities_served: [
      "Miami Beach",
      "Coral Gables",
      "Brickell",
      "Coconut Grove",
      "Key Biscayne",
    ],
    services: [
      "ceramic_coating",
      "paint_correction",
      "full_detail",
      "interior",
      "window_tint",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 117,
    photos: [],
  },
  {
    business_name: "Ocean Drive Auto Detail",
    slug: "ocean-drive-auto-detail-miami",
    owner_name: "Vanessa Cruz",
    email: "vanessa@oceandriveautodetail.com",
    phone: "(786) 555-0294",
    website: "https://www.oceandriveautodetail.com",
    description:
      "Ocean Drive Auto Detail brings the South Beach lifestyle to your vehicle care routine. We offer convenient mobile detailing with salt-removal treatments specially formulated for coastal living. Our team comes to your home, office, or condo parking garage.",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    zip_codes: ["33139", "33140", "33141"],
    cities_served: ["Miami Beach", "South Beach", "North Beach", "Surfside"],
    services: ["full_detail", "exterior", "interior", "ceramic_coating"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 83,
    photos: [],
  },
  {
    business_name: "305 Mobile Wash & Detail",
    slug: "305-mobile-wash-and-detail-miami",
    owner_name: "Jason Pierre",
    email: "jason@305mobilewash.com",
    phone: "(305) 555-0478",
    website: "https://www.305mobilewash.com",
    description:
      "305 Mobile Wash & Detail is the affordable choice for Miami drivers who want a clean car without breaking the bank. We offer quick express washes and detailed interior cleanings perfect for rideshare drivers and busy professionals.",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    zip_codes: ["33125", "33126", "33145"],
    cities_served: ["Little Havana", "Flagami", "Westchester"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.3,
    review_count: 56,
    photos: [],
  },
  {
    business_name: "Tropical Shine Auto Care",
    slug: "tropical-shine-auto-care-miami",
    owner_name: "Andrea Reyes",
    email: "andrea@tropicalshineautocare.com",
    phone: "(954) 555-0382",
    website: "https://www.tropicalshineautocare.com",
    description:
      "Tropical Shine Auto Care specializes in protecting vehicles from Florida's intense sun, humidity, and salt air. Our signature detail package includes UV-blocking sealants and leather conditioning designed for the tropical climate. Serving Miami-Dade and Broward counties.",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    zip_codes: ["33156", "33157", "33158"],
    cities_served: [
      "Pinecrest",
      "Kendall",
      "Palmetto Bay",
      "Cutler Bay",
      "Homestead",
    ],
    services: ["full_detail", "interior", "exterior", "window_tint"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.4,
    review_count: 47,
    photos: [],
  },
  {
    business_name: "Biscayne Bay Detailing",
    slug: "biscayne-bay-detailing-miami",
    owner_name: "Hector Dominguez",
    email: "hector@biscaynebaydetailing.com",
    phone: "(305) 555-0617",
    website: "https://www.biscaynebaydetailing.com",
    description:
      "Biscayne Bay Detailing offers comprehensive mobile detailing services for boats and cars throughout the Miami waterfront. Whether your vehicle sits in a marina lot or a high-rise garage, we come to you with everything needed for a perfect finish.",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    zip_codes: ["33137", "33138", "33161"],
    cities_served: ["Edgewater", "Wynwood", "Design District"],
    services: ["exterior", "interior", "full_detail", "rv"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 34,
    photos: [],
  },

  // =========================================================================
  // CHICAGO, IL
  // =========================================================================
  {
    business_name: "Precision Mobile Detail",
    slug: "precision-mobile-detail-chicago",
    owner_name: "Derek Williams",
    email: "derek@precisionmobiledetail.com",
    phone: "(312) 555-0241",
    website: "https://www.precisionmobiledetail.com",
    description:
      "Precision Mobile Detail has been Chicago's trusted mobile detailing service for over a decade. We specialize in paint correction and ceramic coating to protect vehicles from the brutal Midwest winters. Our enclosed trailer setup lets us work rain or shine.",
    city: "Chicago",
    state: "Illinois",
    state_abbr: "IL",
    zip_codes: ["60601", "60602", "60611"],
    cities_served: [
      "Loop",
      "River North",
      "Gold Coast",
      "Lincoln Park",
      "Lakeview",
    ],
    services: ["paint_correction", "ceramic_coating", "full_detail", "interior"],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 109,
    photos: [],
  },
  {
    business_name: "Windy City Auto Shine",
    slug: "windy-city-auto-shine-chicago",
    owner_name: "Patricia O'Malley",
    email: "patricia@windycityautoshine.com",
    phone: "(773) 555-0356",
    website: "https://www.windycityautoshine.com",
    description:
      "Windy City Auto Shine delivers professional mobile detailing services across Chicagoland. We are known for our winter salt-damage restoration packages that bring neglected vehicles back to life. Garage-to-garage service means no weather worries.",
    city: "Chicago",
    state: "Illinois",
    state_abbr: "IL",
    zip_codes: ["60614", "60618", "60657"],
    cities_served: ["Lincoln Park", "Wicker Park", "Bucktown", "Logan Square"],
    services: ["full_detail", "exterior", "interior", "paint_correction"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.6,
    review_count: 76,
    photos: [],
  },
  {
    business_name: "Lakeshore Detail Pros",
    slug: "lakeshore-detail-pros-chicago",
    owner_name: "Michael Chen",
    email: "michael@lakeshoredetailpros.com",
    phone: "(312) 555-0519",
    website: "https://www.lakeshoredetailpros.com",
    description:
      "Lakeshore Detail Pros caters to Chicago's North Shore communities with premium mobile detailing. We work within private garages and covered parking structures, offering thorough decontamination washes and long-lasting protective treatments.",
    city: "Chicago",
    state: "Illinois",
    state_abbr: "IL",
    zip_codes: ["60201", "60091", "60093"],
    cities_served: ["Evanston", "Wilmette", "Winnetka", "Glencoe"],
    services: ["ceramic_coating", "full_detail", "exterior"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.5,
    review_count: 62,
    photos: [],
  },
  {
    business_name: "Chi-Town Clean Auto",
    slug: "chi-town-clean-auto-chicago",
    owner_name: "Robert Taylor",
    email: "robert@chitownclean.com",
    phone: "(773) 555-0684",
    website: "https://www.chitownclean.com",
    description:
      "Chi-Town Clean Auto is the budget-friendly mobile detail shop serving Chicago's South Side and western suburbs. We believe every vehicle deserves to look its best without costing a fortune. Weekly maintenance plans start at just $29.",
    city: "Chicago",
    state: "Illinois",
    state_abbr: "IL",
    zip_codes: ["60609", "60616", "60653"],
    cities_served: ["Bridgeport", "Chinatown", "Bronzeville"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.1,
    review_count: 33,
    photos: [],
  },
  {
    business_name: "Magnificent Mile Motors Detail",
    slug: "magnificent-mile-motors-detail-chicago",
    owner_name: "Stephanie Grant",
    email: "stephanie@magmiledetail.com",
    phone: "(312) 555-0793",
    website: "https://www.magmiledetail.com",
    description:
      "Magnificent Mile Motors Detail serves the discerning clientele of Chicago's downtown and near-north neighborhoods. We offer concierge-level mobile detailing with flexible scheduling that works around your calendar. Same-day availability most weekdays.",
    city: "Chicago",
    state: "Illinois",
    state_abbr: "IL",
    zip_codes: ["60610", "60654", "60642"],
    cities_served: [
      "Streeterville",
      "River North",
      "Old Town",
      "Goose Island",
    ],
    services: ["full_detail", "interior", "exterior", "window_tint"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.3,
    review_count: 45,
    photos: [],
  },

  // =========================================================================
  // DALLAS, TX
  // =========================================================================
  {
    business_name: "Lone Star Mobile Detail",
    slug: "lone-star-mobile-detail-dallas",
    owner_name: "Travis McCoy",
    email: "travis@lonestarmobiledetail.com",
    phone: "(214) 555-0178",
    website: "https://www.lonestarmobiledetail.com",
    description:
      "Lone Star Mobile Detail is Dallas-Fort Worth's highest-rated mobile detailing service. We combine Texas-sized hospitality with meticulous attention to detail. Our paint correction and ceramic coating work has been featured in local automotive publications.",
    city: "Dallas",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["75201", "75204", "75205"],
    cities_served: [
      "Uptown",
      "Highland Park",
      "University Park",
      "Preston Hollow",
      "Lakewood",
    ],
    services: [
      "ceramic_coating",
      "paint_correction",
      "full_detail",
      "window_tint",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.9,
    review_count: 128,
    photos: [],
  },
  {
    business_name: "Big D Auto Shine",
    slug: "big-d-auto-shine-dallas",
    owner_name: "Amanda Foster",
    email: "amanda@bigdautoshine.com",
    phone: "(972) 555-0345",
    website: "https://www.bigdautoshine.com",
    description:
      "Big D Auto Shine offers professional mobile detailing services throughout the Dallas metro area. Our team specializes in fleet detailing for corporate clients as well as individual vehicle care. We handle everything from sedans to full-size trucks.",
    city: "Dallas",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["75206", "75214", "75218"],
    cities_served: ["Deep Ellum", "Lakewood", "White Rock", "Casa Linda"],
    services: ["full_detail", "exterior", "interior", "fleet"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 91,
    photos: [],
  },
  {
    business_name: "DFW Express Detail",
    slug: "dfw-express-detail-dallas",
    owner_name: "Kevin Stewart",
    email: "kevin@dfwexpressdetail.com",
    phone: "(469) 555-0267",
    website: "https://www.dfwexpressdetail.com",
    description:
      "DFW Express Detail provides fast, affordable mobile detailing across Dallas and Fort Worth. Our express packages are designed for busy professionals who need their vehicle looking great without a long wait. Most services completed in under two hours.",
    city: "Dallas",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["75219", "75207", "75226"],
    cities_served: ["Oak Lawn", "Design District", "Deep Ellum"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 44,
    photos: [],
  },
  {
    business_name: "North Texas Ceramic Coatings",
    slug: "north-texas-ceramic-coatings-dallas",
    owner_name: "Brandon Hall",
    email: "brandon@northtexasceramics.com",
    phone: "(214) 555-0531",
    website: "https://www.northtexasceramics.com",
    description:
      "North Texas Ceramic Coatings is a specialist mobile service focused exclusively on ceramic and graphene coatings. We prep, correct, and coat vehicles on-site at your location with professional-grade products that carry manufacturer warranties up to 7 years.",
    city: "Dallas",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["75225", "75230", "75240"],
    cities_served: ["Preston Hollow", "North Dallas", "Addison", "Richardson"],
    services: ["ceramic_coating", "paint_correction"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.6,
    review_count: 58,
    photos: [],
  },
  {
    business_name: "Trinity River Auto Detail",
    slug: "trinity-river-auto-detail-dallas",
    owner_name: "Lisa Hernandez",
    email: "lisa@trinityriverautodetail.com",
    phone: "(972) 555-0692",
    website: "https://www.trinityriverautodetail.com",
    description:
      "Trinity River Auto Detail serves the southern Dallas metro with reliable and thorough mobile detailing. We pride ourselves on honest pricing and consistent results. Monthly subscription plans are available for customers who want a perpetually clean vehicle.",
    city: "Dallas",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["75208", "75211", "75224"],
    cities_served: ["Oak Cliff", "Bishop Arts", "Kessler Park"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.0,
    review_count: 22,
    photos: [],
  },

  // =========================================================================
  // HOUSTON, TX
  // =========================================================================
  {
    business_name: "Fresh Finish Auto Care",
    slug: "fresh-finish-auto-care-houston",
    owner_name: "Jordan Mitchell",
    email: "jordan@freshfinishautocare.com",
    phone: "(713) 555-0142",
    website: "https://www.freshfinishautocare.com",
    description:
      "Fresh Finish Auto Care delivers top-tier mobile detailing across the Houston metro. Our specialty is restoring vehicles damaged by Houston's heat and humidity. We offer comprehensive packages that include clay bar treatment, polish, and long-lasting sealant protection.",
    city: "Houston",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["77002", "77006", "77019"],
    cities_served: [
      "Montrose",
      "River Oaks",
      "The Heights",
      "Midtown",
      "Museum District",
    ],
    services: ["full_detail", "paint_correction", "ceramic_coating", "interior"],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 105,
    photos: [],
  },
  {
    business_name: "Space City Shine",
    slug: "space-city-shine-houston",
    owner_name: "Nicole Patterson",
    email: "nicole@spacecityshine.com",
    phone: "(281) 555-0287",
    website: "https://www.spacecityshine.com",
    description:
      "Space City Shine is Houston's family-owned mobile detailing business serving the community since 2015. We treat your vehicle like it's our own, with careful attention to every surface. Our interior deep-cleaning service eliminates odors and allergens for a healthier ride.",
    city: "Houston",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["77007", "77008", "77009"],
    cities_served: ["The Heights", "Garden Oaks", "Oak Forest", "Timbergrove"],
    services: ["interior", "exterior", "full_detail"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 88,
    photos: [],
  },
  {
    business_name: "Bayou City Detailing",
    slug: "bayou-city-detailing-houston",
    owner_name: "William Jackson",
    email: "william@bayoucitydetailing.com",
    phone: "(832) 555-0413",
    website: "https://www.bayoucitydetailing.com",
    description:
      "Bayou City Detailing offers affordable and reliable mobile detailing throughout Houston's inner loop. We specialize in quick turnaround without cutting corners. Book through our app for instant pricing and scheduling.",
    city: "Houston",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["77003", "77004", "77021"],
    cities_served: ["East Downtown", "Third Ward", "MacGregor"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.3,
    review_count: 51,
    photos: [],
  },
  {
    business_name: "Gulf Coast Ceramic Pro",
    slug: "gulf-coast-ceramic-pro-houston",
    owner_name: "Daniel Wright",
    email: "daniel@gulfcoastceramicpro.com",
    phone: "(713) 555-0568",
    website: "https://www.gulfcoastceramicpro.com",
    description:
      "Gulf Coast Ceramic Pro is Houston's mobile ceramic coating specialist. We bring professional paint protection to your driveway or garage with full paint correction and coating packages. Ideal for new car owners who want to preserve that factory finish from day one.",
    city: "Houston",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["77005", "77025", "77030"],
    cities_served: ["West University", "Bellaire", "Medical Center", "Meyerland"],
    services: ["ceramic_coating", "paint_correction", "window_tint"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.5,
    review_count: 63,
    photos: [],
  },
  {
    business_name: "H-Town Sparkle Detail",
    slug: "h-town-sparkle-detail-houston",
    owner_name: "Christina Morales",
    email: "christina@htownsparkle.com",
    phone: "(281) 555-0739",
    website: "https://www.htownsparkle.com",
    description:
      "H-Town Sparkle Detail makes mobile detailing easy and accessible for everyday Houstonians. Our straightforward pricing and online booking system mean no surprises. We also offer monthly subscription plans with discounted rates for regular customers.",
    city: "Houston",
    state: "Texas",
    state_abbr: "TX",
    zip_codes: ["77040", "77041", "77043"],
    cities_served: ["Spring Branch", "Memorial", "Katy"],
    services: ["exterior", "interior", "full_detail", "fleet"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.1,
    review_count: 27,
    photos: [],
  },

  // =========================================================================
  // ATLANTA, GA
  // =========================================================================
  {
    business_name: "Peachtree Mobile Detailing",
    slug: "peachtree-mobile-detailing-atlanta",
    owner_name: "Marcus Robinson",
    email: "marcus@peachtreemobiledetailing.com",
    phone: "(404) 555-0193",
    website: "https://www.peachtreemobiledetailing.com",
    description:
      "Peachtree Mobile Detailing is Atlanta's most trusted name in mobile car care. Our experienced team handles everything from daily-driver maintenance washes to full paint restoration on high-end vehicles. We serve all of metro Atlanta with same-day availability.",
    city: "Atlanta",
    state: "Georgia",
    state_abbr: "GA",
    zip_codes: ["30301", "30308", "30309"],
    cities_served: [
      "Buckhead",
      "Midtown",
      "Virginia-Highland",
      "Decatur",
      "Sandy Springs",
    ],
    services: [
      "full_detail",
      "paint_correction",
      "ceramic_coating",
      "interior",
      "exterior",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.9,
    review_count: 137,
    photos: [],
  },
  {
    business_name: "ATL Drip Auto Spa",
    slug: "atl-drip-auto-spa-atlanta",
    owner_name: "Jasmine Carter",
    email: "jasmine@atldrip.com",
    phone: "(678) 555-0321",
    website: "https://www.atldrip.com",
    description:
      "ATL Drip Auto Spa combines urban style with professional detailing expertise. Based in Atlanta, we cater to car enthusiasts and everyday drivers alike. Our signature interior steam-cleaning treatment leaves your cabin looking and smelling brand new.",
    city: "Atlanta",
    state: "Georgia",
    state_abbr: "GA",
    zip_codes: ["30312", "30315", "30316"],
    cities_served: ["East Atlanta", "Grant Park", "Cabbagetown", "Reynoldstown"],
    services: ["interior", "exterior", "full_detail"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.6,
    review_count: 74,
    photos: [],
  },
  {
    business_name: "Georgia Gleam Detailing",
    slug: "georgia-gleam-detailing-atlanta",
    owner_name: "Thomas Walker",
    email: "thomas@georgiagleam.com",
    phone: "(770) 555-0456",
    website: "https://www.georgiagleam.com",
    description:
      "Georgia Gleam Detailing provides high-quality mobile detailing services to Atlanta's northern suburbs. We are specialists in SUV and truck detailing, handling everything from mud-caked off-roaders to pristine daily drivers. Family-owned and operated since 2017.",
    city: "Atlanta",
    state: "Georgia",
    state_abbr: "GA",
    zip_codes: ["30326", "30327", "30342"],
    cities_served: ["Buckhead", "Sandy Springs", "Dunwoody", "Brookhaven"],
    services: ["full_detail", "exterior", "interior", "rv"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.4,
    review_count: 52,
    photos: [],
  },
  {
    business_name: "Southern Comfort Auto Detail",
    slug: "southern-comfort-auto-detail-atlanta",
    owner_name: "Keith Brown",
    email: "keith@southerncomfortautodetail.com",
    phone: "(404) 555-0587",
    website: "https://www.southerncomfortautodetail.com",
    description:
      "Southern Comfort Auto Detail brings old-fashioned Southern service to mobile car care. We take our time to get every detail right, from meticulous interior vacuuming to hand-applied wax finishes. Serving the greater Atlanta area with pride.",
    city: "Atlanta",
    state: "Georgia",
    state_abbr: "GA",
    zip_codes: ["30310", "30311", "30314"],
    cities_served: ["West End", "Cascade", "Bankhead"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 39,
    photos: [],
  },
  {
    business_name: "Piedmont Polish Mobile Detail",
    slug: "piedmont-polish-mobile-detail-atlanta",
    owner_name: "Laura Bennett",
    email: "laura@piedmontpolish.com",
    phone: "(678) 555-0714",
    website: "https://www.piedmontpolish.com",
    description:
      "Piedmont Polish Mobile Detail offers convenient scheduling and premium products for Atlanta professionals. We work around your busy schedule with early morning, evening, and weekend appointments. Our ceramic spray sealant adds months of protection in a single visit.",
    city: "Atlanta",
    state: "Georgia",
    state_abbr: "GA",
    zip_codes: ["30305", "30306", "30307"],
    cities_served: [
      "Virginia-Highland",
      "Inman Park",
      "Little Five Points",
      "Morningside",
    ],
    services: ["ceramic_coating", "exterior", "interior"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.3,
    review_count: 41,
    photos: [],
  },

  // =========================================================================
  // PHOENIX, AZ
  // =========================================================================
  {
    business_name: "Desert Shield Auto Detail",
    slug: "desert-shield-auto-detail-phoenix",
    owner_name: "Ryan Cooper",
    email: "ryan@desertshieldautodetail.com",
    phone: "(602) 555-0156",
    website: "https://www.desertshieldautodetail.com",
    description:
      "Desert Shield Auto Detail protects your vehicle from Arizona's extreme sun and heat. Our ceramic and graphene coatings are specifically selected for desert climates and provide exceptional UV resistance. We are the Valley's top-rated mobile detailing service.",
    city: "Phoenix",
    state: "Arizona",
    state_abbr: "AZ",
    zip_codes: ["85003", "85004", "85006"],
    cities_served: [
      "Scottsdale",
      "Tempe",
      "Paradise Valley",
      "Arcadia",
      "Biltmore",
    ],
    services: [
      "ceramic_coating",
      "paint_correction",
      "full_detail",
      "window_tint",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 121,
    photos: [],
  },
  {
    business_name: "Cactus Clean Auto Spa",
    slug: "cactus-clean-auto-spa-phoenix",
    owner_name: "Maria Gutierrez",
    email: "maria@cactuscleanauto.com",
    phone: "(480) 555-0293",
    website: "https://www.cactuscleanauto.com",
    description:
      "Cactus Clean Auto Spa brings eco-friendly mobile detailing to the Phoenix metro. We use waterless and rinseless wash methods that conserve water while delivering stunning results. Perfect for environmentally conscious Arizona residents.",
    city: "Phoenix",
    state: "Arizona",
    state_abbr: "AZ",
    zip_codes: ["85008", "85014", "85016"],
    cities_served: ["Arcadia", "Camelback East", "Scottsdale", "Tempe"],
    services: ["full_detail", "exterior", "interior"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 86,
    photos: [],
  },
  {
    business_name: "Valley of the Sun Detailing",
    slug: "valley-of-the-sun-detailing-phoenix",
    owner_name: "Craig Henderson",
    email: "craig@valleysundetailing.com",
    phone: "(623) 555-0417",
    website: "https://www.valleysundetailing.com",
    description:
      "Valley of the Sun Detailing serves the entire Phoenix metropolitan area with reliable and affordable mobile car care. Our team handles both residential and commercial accounts, keeping fleets and personal vehicles looking sharp year-round.",
    city: "Phoenix",
    state: "Arizona",
    state_abbr: "AZ",
    zip_codes: ["85020", "85021", "85023"],
    cities_served: ["Glendale", "Peoria", "North Phoenix"],
    services: ["exterior", "interior", "full_detail", "fleet"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 48,
    photos: [],
  },
  {
    business_name: "Sonoran Gloss Detailing",
    slug: "sonoran-gloss-detailing-phoenix",
    owner_name: "Ashley Morgan",
    email: "ashley@sonorangloss.com",
    phone: "(602) 555-0582",
    website: "https://www.sonorangloss.com",
    description:
      "Sonoran Gloss Detailing specializes in luxury vehicle care across Scottsdale and Paradise Valley. Our attention to detail and use of premium European products set us apart. We offer a white-glove pickup and delivery service for select packages.",
    city: "Phoenix",
    state: "Arizona",
    state_abbr: "AZ",
    zip_codes: ["85251", "85253", "85254"],
    cities_served: [
      "Scottsdale",
      "Paradise Valley",
      "Fountain Hills",
      "Cave Creek",
    ],
    services: ["full_detail", "ceramic_coating", "paint_correction", "interior"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.6,
    review_count: 69,
    photos: [],
  },
  {
    business_name: "AZ Quick Detail",
    slug: "az-quick-detail-phoenix",
    owner_name: "Tony Ramirez",
    email: "tony@azquickdetail.com",
    phone: "(480) 555-0748",
    website: "https://www.azquickdetail.com",
    description:
      "AZ Quick Detail offers no-frills, high-quality mobile detailing at prices that work for everyone. We focus on speed and efficiency without sacrificing quality. Our express wash and vacuum package is the most popular service in the East Valley.",
    city: "Phoenix",
    state: "Arizona",
    state_abbr: "AZ",
    zip_codes: ["85281", "85282", "85283"],
    cities_served: ["Tempe", "Mesa", "Chandler"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.0,
    review_count: 31,
    photos: [],
  },

  // =========================================================================
  // SEATTLE, WA
  // =========================================================================
  {
    business_name: "Emerald City Auto Detail",
    slug: "emerald-city-auto-detail-seattle",
    owner_name: "Nathan Park",
    email: "nathan@emeraldcityautodetail.com",
    phone: "(206) 555-0184",
    website: "https://www.emeraldcityautodetail.com",
    description:
      "Emerald City Auto Detail is Seattle's premier mobile detailing service specializing in rain and moisture protection. Our hydrophobic coatings keep your vehicle cleaner longer in the Pacific Northwest climate. We also offer comprehensive interior treatments to combat mold and mildew.",
    city: "Seattle",
    state: "Washington",
    state_abbr: "WA",
    zip_codes: ["98101", "98104", "98122"],
    cities_served: [
      "Capitol Hill",
      "Queen Anne",
      "Fremont",
      "Ballard",
      "Wallingford",
    ],
    services: ["ceramic_coating", "paint_correction", "full_detail", "interior"],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.8,
    review_count: 96,
    photos: [],
  },
  {
    business_name: "Puget Sound Polish",
    slug: "puget-sound-polish-seattle",
    owner_name: "Megan Sullivan",
    email: "megan@pugetsoundpolish.com",
    phone: "(425) 555-0326",
    website: "https://www.pugetsoundpolish.com",
    description:
      "Puget Sound Polish provides meticulous mobile detailing across Seattle and the Eastside communities. We work inside covered garages and parking structures to ensure a perfect finish regardless of weather. Our team is trained in the latest detailing techniques and products.",
    city: "Seattle",
    state: "Washington",
    state_abbr: "WA",
    zip_codes: ["98103", "98105", "98115"],
    cities_served: [
      "Greenlake",
      "University District",
      "Wedgwood",
      "Ravenna",
    ],
    services: ["full_detail", "exterior", "interior", "paint_correction"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.6,
    review_count: 71,
    photos: [],
  },
  {
    business_name: "Northwest Gloss Mobile Detail",
    slug: "northwest-gloss-mobile-detail-seattle",
    owner_name: "Aaron Tanaka",
    email: "aaron@northwestgloss.com",
    phone: "(206) 555-0478",
    website: "https://www.northwestgloss.com",
    description:
      "Northwest Gloss Mobile Detail brings professional car care to Seattle's tech corridors and residential neighborhoods. We offer convenient office-park detailing for busy professionals and weekend appointments for families. Eco-friendly products are standard on every service.",
    city: "Seattle",
    state: "Washington",
    state_abbr: "WA",
    zip_codes: ["98109", "98119", "98199"],
    cities_served: ["Queen Anne", "Magnolia", "Interbay"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.4,
    review_count: 55,
    photos: [],
  },
  {
    business_name: "Rain City Detailing Co.",
    slug: "rain-city-detailing-co-seattle",
    owner_name: "Jessica Olson",
    email: "jessica@raincitydetailing.com",
    phone: "(253) 555-0594",
    website: "https://www.raincitydetailing.com",
    description:
      "Rain City Detailing Co. embraces the Seattle weather with services designed to protect and restore vehicles in wet conditions. Our decontamination wash removes tree sap, bird droppings, and road film that accumulate quickly in the Pacific Northwest.",
    city: "Seattle",
    state: "Washington",
    state_abbr: "WA",
    zip_codes: ["98118", "98144", "98108"],
    cities_served: ["Beacon Hill", "Columbia City", "Georgetown", "Rainier Valley"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.2,
    review_count: 36,
    photos: [],
  },
  {
    business_name: "Cascade Range Auto Care",
    slug: "cascade-range-auto-care-seattle",
    owner_name: "Dustin Larsen",
    email: "dustin@cascaderangeautocare.com",
    phone: "(425) 555-0731",
    website: "https://www.cascaderangeautocare.com",
    description:
      "Cascade Range Auto Care serves Seattle's Eastside suburbs with premium mobile detailing and ceramic coating services. We travel to Bellevue, Kirkland, Redmond, and beyond. Our RV and boat detailing packages are popular with outdoor enthusiasts heading to the mountains.",
    city: "Seattle",
    state: "Washington",
    state_abbr: "WA",
    zip_codes: ["98004", "98033", "98052"],
    cities_served: ["Bellevue", "Kirkland", "Redmond", "Woodinville"],
    services: ["ceramic_coating", "full_detail", "rv", "exterior"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.5,
    review_count: 59,
    photos: [],
  },

  // =========================================================================
  // DENVER, CO
  // =========================================================================
  {
    business_name: "Mile High Mobile Detail",
    slug: "mile-high-mobile-detail-denver",
    owner_name: "Chris Anderson",
    email: "chris@milehighmobiledetail.com",
    phone: "(303) 555-0167",
    website: "https://www.milehighmobiledetail.com",
    description:
      "Mile High Mobile Detail is Denver's leading mobile detailing service, protecting vehicles from Colorado's intense UV exposure and harsh winter road treatments. Our ceramic coatings are formulated to withstand extreme temperature swings and provide year-round protection.",
    city: "Denver",
    state: "Colorado",
    state_abbr: "CO",
    zip_codes: ["80202", "80203", "80205"],
    cities_served: [
      "LoDo",
      "Capitol Hill",
      "Cherry Creek",
      "Highlands",
      "Wash Park",
    ],
    services: [
      "ceramic_coating",
      "paint_correction",
      "full_detail",
      "interior",
      "exterior",
    ],
    price_range: "premium",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.9,
    review_count: 148,
    photos: [],
  },
  {
    business_name: "Rocky Mountain Shine Co.",
    slug: "rocky-mountain-shine-co-denver",
    owner_name: "Emily Thatcher",
    email: "emily@rockymountainshine.com",
    phone: "(720) 555-0298",
    website: "https://www.rockymountainshine.com",
    description:
      "Rocky Mountain Shine Co. provides exceptional mobile detailing tailored to Colorado's unique climate challenges. From removing mag chloride road salt to restoring sun-faded paint, our team has the expertise to keep your vehicle in peak condition at altitude.",
    city: "Denver",
    state: "Colorado",
    state_abbr: "CO",
    zip_codes: ["80206", "80209", "80210"],
    cities_served: [
      "Cherry Creek",
      "Wash Park",
      "Platt Park",
      "University Hills",
    ],
    services: ["full_detail", "exterior", "interior", "paint_correction"],
    price_range: "mid",
    is_mobile: true,
    featured: true,
    status: "approved",
    rating: 4.7,
    review_count: 82,
    photos: [],
  },
  {
    business_name: "Front Range Auto Detailing",
    slug: "front-range-auto-detailing-denver",
    owner_name: "Jake Morrison",
    email: "jake@frontrangeautodetailing.com",
    phone: "(303) 555-0435",
    website: "https://www.frontrangeautodetailing.com",
    description:
      "Front Range Auto Detailing serves Denver's western suburbs and mountain communities. We detail everything from Subarus fresh off a trail run to luxury SUVs in Cherry Hills Village. Our mud and clay removal process is second to none.",
    city: "Denver",
    state: "Colorado",
    state_abbr: "CO",
    zip_codes: ["80226", "80227", "80228"],
    cities_served: ["Lakewood", "Golden", "Wheat Ridge"],
    services: ["exterior", "interior", "full_detail", "rv"],
    price_range: "mid",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.4,
    review_count: 57,
    photos: [],
  },
  {
    business_name: "5280 Express Detail",
    slug: "5280-express-detail-denver",
    owner_name: "Sarah Kowalski",
    email: "sarah@5280expressdetail.com",
    phone: "(720) 555-0561",
    website: "https://www.5280expressdetail.com",
    description:
      "5280 Express Detail offers fast and affordable mobile car cleaning throughout Denver. Our express packages are designed for Colorado's active lifestyle crowd who need their adventure vehicles cleaned quickly between trips. Online booking with transparent pricing.",
    city: "Denver",
    state: "Colorado",
    state_abbr: "CO",
    zip_codes: ["80211", "80212", "80221"],
    cities_served: ["Highlands", "Sunnyside", "Berkeley", "Westminster"],
    services: ["exterior", "interior", "full_detail"],
    price_range: "budget",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.1,
    review_count: 35,
    photos: [],
  },
  {
    business_name: "Centennial State Ceramic Coat",
    slug: "centennial-state-ceramic-coat-denver",
    owner_name: "Mark Dillon",
    email: "mark@centennialstatecoat.com",
    phone: "(303) 555-0689",
    website: "https://www.centennialstatecoat.com",
    description:
      "Centennial State Ceramic Coat is Denver's specialist for mobile ceramic coating and paint protection film consultation. We bring the full paint correction and coating experience to your garage, saving you the hassle of dropping off your vehicle. Our coatings are rated for Colorado's extreme UV index.",
    city: "Denver",
    state: "Colorado",
    state_abbr: "CO",
    zip_codes: ["80113", "80121", "80222"],
    cities_served: [
      "Englewood",
      "Greenwood Village",
      "Cherry Hills Village",
      "Centennial",
    ],
    services: ["ceramic_coating", "paint_correction", "window_tint"],
    price_range: "premium",
    is_mobile: true,
    featured: false,
    status: "approved",
    rating: 4.5,
    review_count: 64,
    photos: [],
  },
];

// ---------------------------------------------------------------------------
// Reviews for the 10 featured listings (2-3 each)
// We reference listings by slug and will resolve listing_id after insert.
// ---------------------------------------------------------------------------

const reviewsBySlug: Record<
  string,
  Array<{ reviewer_name: string; rating: number; body: string }>
> = {
  "shineright-mobile-detailing-new-york": [
    {
      reviewer_name: "Lauren M.",
      rating: 5,
      body: "Marcus and his team did an incredible job on my black BMW. The ceramic coating looks phenomenal and water just beads right off. Worth every penny for the quality of work.",
    },
    {
      reviewer_name: "Phil T.",
      rating: 5,
      body: "Best mobile detailing experience I have had in NYC. They arrived on time, were extremely professional, and my Tesla Model 3 has never looked better. The paint correction removed years of swirl marks.",
    },
    {
      reviewer_name: "Diana K.",
      rating: 4,
      body: "Excellent service overall. They came to my parking garage in Midtown and did a full detail. Only reason for 4 stars is scheduling took a few days, but the result was outstanding.",
    },
  ],
  "empire-state-auto-spa-new-york": [
    {
      reviewer_name: "Steven R.",
      rating: 5,
      body: "David's team transformed my 10-year-old Lexus. The interior deep clean removed stains I thought were permanent. Highly recommend for anyone in Manhattan.",
    },
    {
      reviewer_name: "Christine L.",
      rating: 5,
      body: "I have used Empire State Auto Spa three times now and the quality is consistently excellent. They bring everything they need and leave no mess behind. My white Mercedes always looks showroom fresh.",
    },
  ],
  "elite-auto-spa-los-angeles": [
    {
      reviewer_name: "Kevin W.",
      rating: 5,
      body: "Carlos did an amazing ceramic coating on my Porsche 911. The depth of gloss is unreal. He took his time to make sure every panel was perfect. This is the only detailer I will use in LA.",
    },
    {
      reviewer_name: "Brittany S.",
      rating: 5,
      body: "Had a full detail and paint correction done on my Range Rover. The swirl marks from the dealer wash are completely gone. The team was professional, on time, and the results speak for themselves.",
    },
    {
      reviewer_name: "Oscar G.",
      rating: 4,
      body: "Great service and fantastic results on my Audi Q7. The ceramic coating has held up beautifully for six months now. Would definitely recommend to anyone on the Westside.",
    },
  ],
  "socal-shine-mobile-detail-los-angeles": [
    {
      reviewer_name: "Amanda H.",
      rating: 5,
      body: "Tyler and his team are the real deal. They detailed our entire fleet of five company vehicles in one day. Every single car looked brand new. We now have them on a monthly schedule.",
    },
    {
      reviewer_name: "Jason P.",
      rating: 4,
      body: "Really solid mobile detail service. They came to my apartment complex in Silver Lake and did a great job on my Honda Civic. Fair pricing and good communication throughout.",
    },
  ],
  "diamond-gloss-detailing-miami": [
    {
      reviewer_name: "Roberto F.",
      rating: 5,
      body: "Ricardo is an artist when it comes to paint correction. He spent eight hours on my Lamborghini Huracan and the results are absolutely stunning. The graphene coating keeps it looking wet 24/7.",
    },
    {
      reviewer_name: "Sophia M.",
      rating: 5,
      body: "I have tried several detailers in Miami and Diamond Gloss is hands down the best. They detailed my white Rolls-Royce Cullinan and it looks better than the day I bought it. Incredible attention to detail.",
    },
    {
      reviewer_name: "Carlos V.",
      rating: 4,
      body: "Outstanding work on my Mercedes AMG GT. The ceramic coating has been holding up great against the salty Miami air. Premium pricing but premium results. They come right to my condo in Brickell.",
    },
  ],
  "ocean-drive-auto-detail-miami": [
    {
      reviewer_name: "Natalie R.",
      rating: 5,
      body: "Vanessa and her team are wonderful. They came to our condo garage in South Beach and did a full detail with their salt-removal treatment. Our cars have never looked this good living near the ocean.",
    },
    {
      reviewer_name: "Derek J.",
      rating: 5,
      body: "Fantastic mobile detailing service. They were flexible with scheduling and did an amazing job on my Jeep Wrangler. The interior was spotless and the exterior had a mirror-like finish.",
    },
    {
      reviewer_name: "Isabella C.",
      rating: 4,
      body: "Very good service and the salt-removal treatment really makes a difference living in Miami Beach. My BMW X5 stays cleaner for much longer after their treatment. Will be booking again.",
    },
  ],
  "precision-mobile-detail-chicago": [
    {
      reviewer_name: "Mike D.",
      rating: 5,
      body: "Derek and his crew are the best in Chicago, period. They did a full paint correction and ceramic coating on my Audi RS6 and the results are jaw-dropping. They work inside their enclosed trailer so the weather is never an issue.",
    },
    {
      reviewer_name: "Sarah W.",
      rating: 5,
      body: "After a brutal Chicago winter, my car looked terrible. Precision Mobile Detail brought it back to life with their winter damage restoration package. Salt stains, water spots, all gone. Incredible work.",
    },
    {
      reviewer_name: "Tom H.",
      rating: 4,
      body: "Excellent detail on my Ford F-150. They came to my garage in Lincoln Park and spent four hours making it look new. The ceramic coating should help protect it through next winter. Very pleased.",
    },
  ],
  "windy-city-auto-shine-chicago": [
    {
      reviewer_name: "Jennifer B.",
      rating: 5,
      body: "Patricia runs an amazing operation. Her team detailed my Volvo XC90 and it looks like it just rolled off the lot. The winter salt restoration was exactly what my car needed after February.",
    },
    {
      reviewer_name: "Alex K.",
      rating: 4,
      body: "Good quality detail at a fair price. They came to my spot in Wicker Park and did a thorough interior and exterior cleaning. My only note would be slightly faster response time on booking, but the work itself was excellent.",
    },
  ],
  "lone-star-mobile-detail-dallas": [
    {
      reviewer_name: "Beth A.",
      rating: 5,
      body: "Travis is a true professional. He spent an entire day doing a multi-stage paint correction and ceramic coating on my black Cadillac Escalade. The finish is absolutely flawless. Best detailer in DFW.",
    },
    {
      reviewer_name: "Ryan M.",
      rating: 5,
      body: "I have had my truck detailed by Lone Star three times now and the quality never drops. They are always on time, always thorough, and always leave my vehicle looking incredible. Cannot recommend them enough.",
    },
    {
      reviewer_name: "Michelle T.",
      rating: 5,
      body: "The ceramic coating on my new Tesla Model Y is gorgeous. Travis explained the entire process and the coating has made washing so much easier. Water just sheets right off. Five stars all the way.",
    },
  ],
  "big-d-auto-shine-dallas": [
    {
      reviewer_name: "Greg P.",
      rating: 5,
      body: "Amanda's team detailed our company fleet of twelve vehicles and every single one looked perfect. The fleet pricing was very competitive and the scheduling was seamless. We have them on a bi-weekly rotation now.",
    },
    {
      reviewer_name: "Courtney L.",
      rating: 4,
      body: "Great mobile detail service in the Dallas area. They came to my office parking lot and had my SUV looking brand new in about three hours. Really convenient and the results were solid.",
    },
  ],
  "fresh-finish-auto-care-houston": [
    {
      reviewer_name: "David N.",
      rating: 5,
      body: "Jordan and his team are the best mobile detailers in Houston. They did a complete paint correction and ceramic coating on my Corvette C8 and the results are showroom quality. The clay bar treatment was incredibly thorough.",
    },
    {
      reviewer_name: "Angela W.",
      rating: 5,
      body: "We have used Fresh Finish for both of our vehicles and they always exceed expectations. They came to our home in River Oaks and treated our cars like they were their own. Top-notch professionalism.",
    },
    {
      reviewer_name: "Marcus T.",
      rating: 4,
      body: "Very impressed with the full detail on my Toyota 4Runner. The Houston heat and humidity had taken a toll but Fresh Finish brought it back. Great communication and fair pricing.",
    },
  ],
  "space-city-shine-houston": [
    {
      reviewer_name: "Kimberly S.",
      rating: 5,
      body: "Nicole and her team are wonderful. The interior deep-clean on my minivan was life-changing. Three kids had done their worst and Space City Shine made it look and smell brand new. Absolute miracle workers.",
    },
    {
      reviewer_name: "Patrick O.",
      rating: 5,
      body: "Family-owned business that truly cares about quality. They detailed my truck in the Heights and did an outstanding job. The attention to detail on the interior was impressive. Will definitely be back.",
    },
  ],
  "peachtree-mobile-detailing-atlanta": [
    {
      reviewer_name: "Tamara J.",
      rating: 5,
      body: "Marcus is the best detailer in Atlanta, hands down. He did a full paint correction and ceramic coating on my Mercedes GLE and the results are breathtaking. Every neighbor has asked me where I got my car done.",
    },
    {
      reviewer_name: "William H.",
      rating: 5,
      body: "Peachtree Mobile Detailing has been taking care of my vehicles for two years now. Consistent quality every single time. They handle my BMW M4 and my wife's Lexus RX and both always look amazing.",
    },
    {
      reviewer_name: "Denise P.",
      rating: 4,
      body: "Excellent detail on my Honda Accord. The team was professional and thorough. They came to my office in Buckhead and had everything done before my work day ended. Very convenient service.",
    },
  ],
  "atl-drip-auto-spa-atlanta": [
    {
      reviewer_name: "Terrence B.",
      rating: 5,
      body: "Jasmine and her crew killed it on my Dodge Challenger. The interior steam clean was incredible - every crevice was spotless. The car smells brand new. Best detail I have ever had in Atlanta.",
    },
    {
      reviewer_name: "Monica S.",
      rating: 4,
      body: "Really good mobile detail service. They came out to East Atlanta and did a thorough job on my Subaru. The pricing is fair for the quality of work. I would recommend them to anyone looking for a solid detail.",
    },
  ],
  "desert-shield-auto-detail-phoenix": [
    {
      reviewer_name: "Scott L.",
      rating: 5,
      body: "Ryan is a ceramic coating expert. He did a full correction and coating on my black Mustang GT and the Arizona sun has not faded it one bit after a full year. This is essential protection for any car owner in Phoenix.",
    },
    {
      reviewer_name: "Catherine M.",
      rating: 5,
      body: "Desert Shield saved my car's paint. The UV damage was starting to show after two Phoenix summers but their paint correction brought it back to life. The ceramic coating gives me peace of mind now.",
    },
    {
      reviewer_name: "Brian R.",
      rating: 4,
      body: "Excellent work on my Toyota Tundra. The window tint and ceramic coating combo is perfect for the Arizona heat. My truck's interior stays so much cooler now. Professional service from start to finish.",
    },
  ],
  "cactus-clean-auto-spa-phoenix": [
    {
      reviewer_name: "Lisa K.",
      rating: 5,
      body: "I love that Cactus Clean uses waterless products. Living in the desert, water conservation matters to me. And the results are just as good as any traditional wash. My Prius has never looked better.",
    },
    {
      reviewer_name: "Raj P.",
      rating: 5,
      body: "Maria runs an excellent operation. Her team detailed my Tesla Model X using their eco-friendly process and I was blown away by the results. No water waste and a beautiful finish. Highly recommended.",
    },
  ],
  "emerald-city-auto-detail-seattle": [
    {
      reviewer_name: "Hannah T.",
      rating: 5,
      body: "Nathan's hydrophobic coating has been a game-changer for Seattle driving. Rain just beads off my windshield and the paint stays cleaner so much longer. Absolutely worth the investment for PNW living.",
    },
    {
      reviewer_name: "Chris B.",
      rating: 5,
      body: "Emerald City Auto Detail did a phenomenal job on my Subaru Outback. The interior treatment addressed the musty smell that comes from Seattle's moisture and now it smells completely fresh. Outstanding work.",
    },
    {
      reviewer_name: "Priya N.",
      rating: 4,
      body: "Great detailing service that understands Seattle's unique climate challenges. They ceramic coated my Audi A4 and it has held up beautifully through months of rain. Would definitely use them again.",
    },
  ],
  "puget-sound-polish-seattle": [
    {
      reviewer_name: "Eric M.",
      rating: 5,
      body: "Megan's team came to my covered parking spot in Greenlake and did an amazing full detail. They were thorough, professional, and the results were excellent. My Honda CR-V looks brand new.",
    },
    {
      reviewer_name: "Yuki S.",
      rating: 4,
      body: "Solid detail work from Puget Sound Polish. They worked inside my garage which was great given the weather. The paint correction on my Mazda CX-5 removed all the micro scratches. Good value for the price.",
    },
  ],
  "mile-high-mobile-detail-denver": [
    {
      reviewer_name: "Andrew F.",
      rating: 5,
      body: "Chris is the best in Denver, no contest. He did a full paint correction and ceramic coating on my Porsche Taycan and the results are absolutely stunning. The UV protection is critical at altitude and his coatings deliver.",
    },
    {
      reviewer_name: "Kelly D.",
      rating: 5,
      body: "Mile High Mobile Detail saved my car after a brutal Colorado winter. The mag chloride had done serious damage but their restoration process brought my paint back to life. Now I have them on a seasonal schedule.",
    },
    {
      reviewer_name: "Samantha R.",
      rating: 5,
      body: "Three years running and they are still the best mobile detailer in Denver. My husband and I both use them for our vehicles. Consistent quality, fair pricing, and they always go above and beyond.",
    },
  ],
  "rocky-mountain-shine-co-denver": [
    {
      reviewer_name: "Jeff H.",
      rating: 5,
      body: "Emily and her team did an excellent job on my Jeep Grand Cherokee. They removed all the road salt buildup and applied a protective coating that has lasted through the entire spring. Highly recommend.",
    },
    {
      reviewer_name: "Lindsey C.",
      rating: 4,
      body: "Good quality detail at a reasonable price. They came to my place in Wash Park and did a thorough interior and exterior cleaning. My Volkswagen Atlas looks great. Will book again before winter hits.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function seed() {
  console.log("Starting seed...\n");

  // 1. Insert listings
  console.log(`Inserting ${listings.length} listings into md_listings...`);
  const { data: insertedListings, error: listingsError } = await supabase
    .from("md_listings")
    .upsert(listings, { onConflict: "slug" })
    .select("id, slug");

  if (listingsError) {
    console.error("Error inserting listings:", listingsError);
    process.exit(1);
  }

  console.log(`Successfully inserted ${insertedListings?.length ?? 0} listings.\n`);

  // 2. Build slug -> id map
  const slugToId: Record<string, string> = {};
  for (const row of insertedListings ?? []) {
    slugToId[row.slug] = row.id;
  }

  // 3. Insert reviews for featured listings
  const reviewRows: Array<{
    listing_id: string;
    reviewer_name: string;
    rating: number;
    body: string;
  }> = [];

  for (const [slug, reviews] of Object.entries(reviewsBySlug)) {
    const listingId = slugToId[slug];
    if (!listingId) {
      console.warn(`Warning: Could not find listing_id for slug "${slug}", skipping reviews.`);
      continue;
    }
    for (const review of reviews) {
      reviewRows.push({
        listing_id: listingId,
        reviewer_name: review.reviewer_name,
        rating: review.rating,
        body: review.body,
      });
    }
  }

  console.log(`Inserting ${reviewRows.length} reviews into md_reviews...`);
  const { error: reviewsError } = await supabase
    .from("md_reviews")
    .insert(reviewRows);

  if (reviewsError) {
    console.error("Error inserting reviews:", reviewsError);
    process.exit(1);
  }

  console.log(`Successfully inserted ${reviewRows.length} reviews.\n`);
  console.log("Seed complete!");
}

seed();
