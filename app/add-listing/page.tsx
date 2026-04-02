"use client";

import { useState } from "react";
import { CheckCircle, ShieldCheck } from "lucide-react";

export default function ClaimListingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          type: "claim_request",
          business_name: data.get("business_name"),
          contact_name: data.get("contact_name"),
          email: data.get("email"),
          phone: data.get("phone"),
          role: data.get("role"),
          message: data.get("message"),
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
          Claim Request Submitted!
        </h1>
        <p className="text-gray-600">
          Your claim request has been submitted. We&apos;ll verify and connect
          you within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
          <ShieldCheck className="h-7 w-7 text-accent" />
        </div>
        <h1 className="mb-2 text-3xl font-extrabold text-navy-900">
          Claim Your Listing
        </h1>
        <p className="text-gray-500">
          We&apos;ve already listed your business based on public information.
          Claim your listing to update your description, add photos, and respond
          to reviews.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-900">
            Business Name *
          </label>
          <input
            name="business_name"
            type="text"
            required
            placeholder="Search for your business name as it appears on our site"
            className="input"
          />
          <p className="mt-1 text-xs text-gray-400">
            Enter your business name exactly as it appears in our directory
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Your Name *
            </label>
            <input
              name="contact_name"
              type="text"
              required
              placeholder="Your full name"
              className="input"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-900">
              Your Role *
            </label>
            <select name="role" required className="input">
              <option value="">Select your role...</option>
              <option value="owner">Owner</option>
              <option value="manager">Manager</option>
              <option value="authorized_rep">Authorized Representative</option>
            </select>
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
            What would you like to update?
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us what information you'd like to correct or add — updated description, photos, hours, services, etc."
            className="input resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-base"
        >
          {loading ? "Submitting..." : "Submit Claim Request"}
        </button>

        <p className="text-center text-xs text-gray-400">
          We&apos;ll verify your identity and connect you with your listing
          within 48 hours.
        </p>
      </form>
    </div>
  );
}
