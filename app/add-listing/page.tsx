"use client";

import { useState } from "react";
import { CheckCircle, Building2 } from "lucide-react";

const serviceOptions = [
  { value: "ceramic_coating", label: "Ceramic Coating" },
  { value: "paint_correction", label: "Paint Correction" },
  { value: "interior", label: "Interior Detailing" },
  { value: "exterior", label: "Exterior Detailing" },
  { value: "full_detail", label: "Full Detail" },
  { value: "window_tint", label: "Window Tinting" },
  { value: "fleet", label: "Fleet Detailing" },
  { value: "rv", label: "RV Detailing" },
];

export default function AddListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_name: data.get("business_name"),
          owner_name: data.get("owner_name"),
          email: data.get("email"),
          phone: data.get("phone"),
          website: data.get("website"),
          description: data.get("description"),
          city: data.get("city"),
          state: data.get("state"),
          state_abbr: data.get("state_abbr"),
          cities_served: data.get("cities_served"),
          services: selectedServices,
          price_range: data.get("price_range"),
          is_mobile: data.get("is_mobile"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setError(err.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-3 text-3xl font-bold text-navy-900">
          Listing Submitted!
        </h1>
        <p className="text-gray-600">
          Your listing is pending review. We&apos;ll notify you by email once
          it&apos;s approved and live on the site. This typically takes 24-48
          hours.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
          <Building2 className="h-7 w-7 text-accent" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-navy-900">
          List Your Detailing Business
        </h1>
        <p className="text-gray-500">
          Get found by thousands of car owners searching for mobile detailing
          in your area. Free to list.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Business Name *
            </label>
            <input
              name="business_name"
              type="text"
              required
              placeholder="e.g. ShineRight Mobile Detailing"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Owner Name
            </label>
            <input
              name="owner_name"
              type="text"
              placeholder="Your full name"
              className="input"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Email *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@yourbusiness.com"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">
            Website
          </label>
          <input
            name="website"
            type="url"
            placeholder="https://www.yourbusiness.com"
            className="input"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              City *
            </label>
            <input
              name="city"
              type="text"
              required
              placeholder="e.g. Miami"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              State *
            </label>
            <input
              name="state"
              type="text"
              required
              placeholder="e.g. Florida"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              State Abbr *
            </label>
            <input
              name="state_abbr"
              type="text"
              required
              maxLength={2}
              placeholder="e.g. FL"
              className="input uppercase"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">
            Cities Served
          </label>
          <input
            name="cities_served"
            type="text"
            placeholder="e.g. Miami, Miami Beach, Coral Gables, Hialeah"
            className="input"
          />
          <p className="mt-1 text-xs text-gray-400">Comma-separated list</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">
            Services Offered *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {serviceOptions.map((s) => (
              <label
                key={s.value}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
              >
                <input
                  type="checkbox"
                  value={s.value}
                  checked={selectedServices.includes(s.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedServices([...selectedServices, s.value]);
                    } else {
                      setSelectedServices(
                        selectedServices.filter((v) => v !== s.value)
                      );
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                />
                {s.label}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Price Range *
            </label>
            <select name="price_range" required className="input">
              <option value="">Select...</option>
              <option value="budget">$ — Budget-Friendly</option>
              <option value="mid">$$ — Mid-Range</option>
              <option value="premium">$$$ — Premium</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Mobile Service? *
            </label>
            <div className="flex gap-4 pt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="is_mobile"
                  value="true"
                  defaultChecked
                  className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm">Yes, we come to you</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="is_mobile"
                  value="false"
                  className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm">Shop only</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">
            Business Description *
          </label>
          <textarea
            name="description"
            required
            minLength={50}
            maxLength={500}
            rows={4}
            placeholder="Tell potential customers about your services, experience, and what makes your business stand out..."
            className="input resize-none"
          />
          <p className="mt-1 text-xs text-gray-400">50-500 characters</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-base"
        >
          {loading ? "Submitting..." : "Submit Listing for Review"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Your listing will be reviewed within 24-48 hours. We&apos;ll email
          you when it&apos;s live.
        </p>
      </form>
    </div>
  );
}
