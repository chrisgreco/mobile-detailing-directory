"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { services } from "@/data/services";
import { formatServiceName } from "@/lib/utils";

type Filters = {
  service: string;
  priceRange: string;
  mobileOnly: boolean;
};

export default function FilterDrawer({
  onFilter,
  initialFilters,
}: {
  onFilter: (filters: Filters) => void;
  initialFilters?: Partial<Filters>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    service: initialFilters?.service || "",
    priceRange: initialFilters?.priceRange || "",
    mobileOnly: initialFilters?.mobileOnly ?? false,
  });

  const serviceOptions = [
    "ceramic_coating",
    "paint_correction",
    "interior",
    "exterior",
    "full_detail",
    "window_tint",
    "fleet",
    "rv",
  ];

  const handleApply = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const cleared = { service: "", priceRange: "", mobileOnly: false };
    setFilters(cleared);
    onFilter(cleared);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-secondary gap-2 lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
      </button>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <FilterContent
              filters={filters}
              setFilters={setFilters}
              serviceOptions={serviceOptions}
            />

            <div className="mt-6 flex gap-3">
              <button onClick={handleClear} className="btn-secondary flex-1">
                Clear All
              </button>
              <button onClick={handleApply} className="btn-primary flex-1">
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-base font-bold">Filter Results</h3>
          <FilterContent
            filters={filters}
            setFilters={setFilters}
            serviceOptions={serviceOptions}
          />
          <div className="mt-5 flex gap-3">
            <button
              onClick={handleClear}
              className="btn-secondary flex-1 py-2 text-xs"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="btn-primary flex-1 py-2 text-xs"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterContent({
  filters,
  setFilters,
  serviceOptions,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  serviceOptions: string[];
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy-900">
          Service Type
        </label>
        <select
          value={filters.service}
          onChange={(e) => setFilters({ ...filters, service: e.target.value })}
          className="input"
        >
          <option value="">All Services</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {formatServiceName(s)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-navy-900">
          Price Range
        </label>
        <div className="space-y-2">
          {[
            { value: "", label: "Any Price" },
            { value: "budget", label: "$ — Budget-Friendly" },
            { value: "mid", label: "$$ — Mid-Range" },
            { value: "premium", label: "$$$ — Premium" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5">
              <input
                type="radio"
                name="priceRange"
                value={opt.value}
                checked={filters.priceRange === opt.value}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="h-4 w-4 border-gray-300 text-accent focus:ring-accent"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2.5">
          <input
            type="checkbox"
            checked={filters.mobileOnly}
            onChange={(e) =>
              setFilters({ ...filters, mobileOnly: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
          />
          <span className="text-sm font-medium text-navy-900">
            Mobile Service Only
          </span>
        </label>
      </div>
    </div>
  );
}
