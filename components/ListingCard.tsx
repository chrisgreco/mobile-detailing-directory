import Link from "next/link";
import { MapPin, Star, Phone, ExternalLink } from "lucide-react";
import { type Listing } from "@/lib/supabase";
import { formatPriceRange, formatServiceName } from "@/lib/utils";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="card overflow-hidden">
      {listing.featured && (
        <div className="bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase">
          Featured
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/listing/${listing.slug}`}
              className="text-lg font-bold text-navy-900 hover:text-accent-dark transition-colors"
            >
              {listing.business_name}
            </Link>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {listing.city}, {listing.state_abbr}
              </span>
            </div>
          </div>
          <span className="shrink-0 rounded-lg bg-navy-900/5 px-2.5 py-1 text-sm font-semibold text-navy-700">
            {formatPriceRange(listing.price_range)}
          </span>
        </div>

        {listing.rating && (
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{listing.rating}</span>
            </div>
            <span className="text-sm text-gray-400">
              ({listing.review_count} reviews)
            </span>
          </div>
        )}

        {listing.description && (
          <p className="mb-3 text-sm leading-relaxed text-gray-600 line-clamp-2">
            {listing.description}
          </p>
        )}

        <div className="mb-4 flex flex-wrap gap-1.5">
          {listing.services.slice(0, 4).map((service) => (
            <span key={service} className="badge-service">
              {formatServiceName(service)}
            </span>
          ))}
          {listing.services.length > 4 && (
            <span className="badge-service">
              +{listing.services.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/listing/${listing.slug}`}
            className="btn-primary flex-1 text-center text-sm py-2.5"
          >
            View Details
          </Link>
          {listing.phone && (
            <a
              href={`tel:${listing.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-accent hover:text-accent"
              aria-label={`Call ${listing.business_name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
          {listing.website && (
            <a
              href={listing.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-accent hover:text-accent"
              aria-label={`Visit ${listing.business_name} website`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
