export type Service = {
  name: string;
  slug: string;
  description: string;
  avgCostLow: number;
  avgCostHigh: number;
  duration: string;
};

export const services: Service[] = [
  {
    name: "Ceramic Coating",
    slug: "ceramic-coating-near-me",
    description:
      "Professional-grade ceramic coating that bonds to your paint for long-lasting protection against UV rays, bird droppings, tree sap, and chemical stains. Lasts 2-5 years with proper maintenance.",
    avgCostLow: 500,
    avgCostHigh: 1500,
    duration: "4-8 hours",
  },
  {
    name: "Paint Correction",
    slug: "paint-correction-near-me",
    description:
      "Machine polishing to remove swirl marks, scratches, oxidation, and other paint defects. Restores your vehicle's finish to a mirror-like gloss before coating or sealant application.",
    avgCostLow: 300,
    avgCostHigh: 800,
    duration: "3-6 hours",
  },
  {
    name: "Interior Detailing",
    slug: "interior-detailing-near-me",
    description:
      "Deep cleaning of all interior surfaces including leather conditioning, carpet shampooing, dashboard restoration, and odor elimination. Brings your cabin back to showroom condition.",
    avgCostLow: 100,
    avgCostHigh: 250,
    duration: "2-4 hours",
  },
  {
    name: "Exterior Detailing",
    slug: "exterior-detailing-near-me",
    description:
      "Complete exterior treatment including hand wash, clay bar decontamination, polish, and wax or sealant application. Removes embedded contaminants and restores shine.",
    avgCostLow: 75,
    avgCostHigh: 200,
    duration: "2-3 hours",
  },
  {
    name: "Full Detail",
    slug: "full-detail-near-me",
    description:
      "Comprehensive interior and exterior detailing package combining deep interior cleaning with full exterior paint correction and protection. The complete reset for your vehicle.",
    avgCostLow: 200,
    avgCostHigh: 450,
    duration: "4-8 hours",
  },
  {
    name: "Window Tinting",
    slug: "window-tinting-near-me",
    description:
      "Professional window film installation for UV protection, heat rejection, glare reduction, and privacy. Mobile tinting done at your location with high-quality ceramic or carbon films.",
    avgCostLow: 150,
    avgCostHigh: 500,
    duration: "2-4 hours",
  },
  {
    name: "Fleet Detailing",
    slug: "fleet-detailing-near-me",
    description:
      "Volume detailing services for business fleets including cars, trucks, vans, and commercial vehicles. Scheduled mobile service at your lot with fleet pricing discounts.",
    avgCostLow: 75,
    avgCostHigh: 200,
    duration: "1-3 hours per vehicle",
  },
  {
    name: "RV Detailing",
    slug: "rv-detailing-near-me",
    description:
      "Specialized detailing for RVs, motorhomes, and travel trailers. Includes exterior wash, oxidation removal, roof treatment, and interior deep clean tailored for recreational vehicles.",
    avgCostLow: 300,
    avgCostHigh: 800,
    duration: "6-10 hours",
  },
];
