"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Star,
  Trash2,
  Eye,
  BarChart3,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import { supabase, type Listing, type Lead } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"pending" | "approved" | "leads" | "stats">(
    "pending"
  );
  const [listings, setListings] = useState<Listing[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    cities: 0,
    newThisMonth: 0,
    totalLeads: 0,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session, tab]);

  async function loadData() {
    if (tab === "pending") {
      const { data } = await supabase
        .from("md_listings")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      setListings((data as Listing[]) || []);
    } else if (tab === "approved") {
      const { data } = await supabase
        .from("md_listings")
        .select("*")
        .eq("status", "approved")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      setListings((data as Listing[]) || []);
    } else if (tab === "leads") {
      const { data } = await supabase
        .from("md_leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads((data as Lead[]) || []);
    } else if (tab === "stats") {
      const { count: total } = await supabase
        .from("md_listings")
        .select("*", { count: "exact", head: true })
        .eq("status", "approved");

      const { data: cityData } = await supabase
        .from("md_listings")
        .select("city")
        .eq("status", "approved");
      const uniqueCities = new Set(cityData?.map((d) => d.city));

      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      const { count: newCount } = await supabase
        .from("md_listings")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthAgo.toISOString());

      const { count: leadCount } = await supabase
        .from("md_leads")
        .select("*", { count: "exact", head: true });

      setStats({
        total: total || 0,
        cities: uniqueCities.size,
        newThisMonth: newCount || 0,
        totalLeads: leadCount || 0,
      });
    }
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("md_listings").update({ status }).eq("id", id);
    loadData();
  }

  async function toggleFeatured(id: string, current: boolean) {
    await supabase
      .from("md_listings")
      .update({ featured: !current })
      .eq("id", id);
    loadData();
  }

  async function deleteListing(id: string) {
    if (confirm("Are you sure you want to delete this listing?")) {
      await supabase.from("md_listings").delete().eq("id", id);
      loadData();
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
    if (error) alert(error.message);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <h1 className="mb-6 text-center text-2xl font-bold text-navy-900">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="input"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="input"
          />
          <button type="submit" className="btn-primary w-full">
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm text-gray-500 hover:text-red-500"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1">
        {(
          [
            { key: "pending", label: "Pending", icon: Clock },
            { key: "approved", label: "Approved", icon: CheckCircle },
            { key: "leads", label: "Leads", icon: Users },
            { key: "stats", label: "Stats", icon: BarChart3 },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-white text-navy-900 shadow-sm"
                : "text-gray-500 hover:text-navy-900"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Stats tab */}
      {tab === "stats" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Listings", value: stats.total, icon: Eye },
            { label: "Cities Covered", value: stats.cities, icon: MapPin },
            { label: "New This Month", value: stats.newThisMonth, icon: Clock },
            { label: "Total Leads", value: stats.totalLeads, icon: Users },
          ].map((s) => (
            <div key={s.label} className="card p-6">
              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                <s.icon className="h-4 w-4" />
                {s.label}
              </div>
              <p className="text-3xl font-bold text-navy-900">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Listings tabs */}
      {(tab === "pending" || tab === "approved") && (
        <div className="space-y-3">
          {listings.length === 0 ? (
            <p className="py-12 text-center text-gray-500">
              No {tab} listings.
            </p>
          ) : (
            listings.map((listing) => (
              <div
                key={listing.id}
                className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy-900">
                      {listing.business_name}
                    </span>
                    {listing.featured && (
                      <span className="badge-featured text-xs">Featured</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {listing.city}, {listing.state_abbr} &middot;{" "}
                    {listing.email}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {tab === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(listing.id, "approved")}
                        className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                      >
                        <CheckCircle className="h-3.5 w-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(listing.id, "rejected")}
                        className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                      >
                        <XCircle className="h-3.5 w-3.5" /> Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() =>
                      toggleFeatured(listing.id, listing.featured)
                    }
                    className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
                      listing.featured
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Star className="h-3.5 w-3.5" />
                    {listing.featured ? "Unfeature" : "Feature"}
                  </button>
                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Leads tab */}
      {tab === "leads" && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm">
                <th className="pb-3 font-semibold text-gray-500">Name</th>
                <th className="pb-3 font-semibold text-gray-500">Email</th>
                <th className="pb-3 font-semibold text-gray-500">Location</th>
                <th className="pb-3 font-semibold text-gray-500">Service</th>
                <th className="pb-3 font-semibold text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-gray-100 text-sm"
                >
                  <td className="py-3 font-medium text-navy-900">
                    {lead.name}
                  </td>
                  <td className="py-3 text-gray-600">{lead.email}</td>
                  <td className="py-3 text-gray-600">
                    {lead.city}, {lead.state}
                  </td>
                  <td className="py-3 text-gray-600">
                    {lead.service_needed || "—"}
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && (
            <p className="py-12 text-center text-gray-500">No leads yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
