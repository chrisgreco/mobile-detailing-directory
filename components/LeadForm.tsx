"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function LeadForm({
  city,
  state,
}: {
  city?: string;
  state?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          city: data.get("city"),
          state: data.get("state"),
          vehicle_type: data.get("vehicle_type"),
          service_needed: data.get("service_needed"),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Silently handle
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="mx-auto mb-3 h-10 w-10 text-green-500" />
        <h3 className="mb-1 text-lg font-bold text-green-900">
          Request Sent!
        </h3>
        <p className="text-sm text-green-700">
          Local detailers will reach out within 24 hours with free quotes.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-accent/20 bg-accent/5 p-6">
      <h3 className="mb-1 text-lg font-bold text-navy-900">
        Get 3 Free Quotes
      </h3>
      <p className="mb-5 text-sm text-gray-600">
        Compare prices from top-rated mobile detailers near you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className="input"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="input"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            type="text"
            required
            placeholder="City"
            defaultValue={city || ""}
            className="input"
          />
          <input
            name="state"
            type="text"
            required
            placeholder="State"
            defaultValue={state || ""}
            className="input"
          />
        </div>
        <select name="vehicle_type" required className="input">
          <option value="">Vehicle type</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV / Crossover</option>
          <option value="truck">Truck</option>
          <option value="van">Van / Minivan</option>
          <option value="coupe">Coupe</option>
          <option value="luxury">Luxury / Exotic</option>
          <option value="rv">RV / Motorhome</option>
        </select>
        <select name="service_needed" required className="input">
          <option value="">Service needed</option>
          <option value="exterior">Exterior Detail</option>
          <option value="interior">Interior Detail</option>
          <option value="full_detail">Full Detail</option>
          <option value="ceramic_coating">Ceramic Coating</option>
          <option value="paint_correction">Paint Correction</option>
          <option value="window_tint">Window Tinting</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full gap-2 py-3.5"
        >
          <Send className="h-4 w-4" />
          {loading ? "Sending..." : "Get Free Quotes"}
        </button>
      </form>
    </div>
  );
}
