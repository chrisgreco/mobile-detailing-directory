import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      business_name,
      owner_name,
      email,
      phone,
      website,
      description,
      city,
      state,
      state_abbr,
      cities_served,
      services,
      price_range,
      is_mobile,
    } = body;

    if (!business_name || !email || !city || !state || !state_abbr) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = `${business_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${city.toLowerCase().replace(/\s+/g, "-")}`;

    const supabase = getServiceRoleClient();

    const { error } = await supabase.from("md_listings").insert({
      slug,
      business_name,
      owner_name,
      email,
      phone,
      website,
      description,
      city,
      state,
      state_abbr,
      cities_served: cities_served
        ? cities_served.split(",").map((c: string) => c.trim())
        : [],
      services: services || [],
      price_range,
      is_mobile: is_mobile === "true" || is_mobile === true,
      status: "pending",
      photos: [],
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "A listing with this name already exists in this city" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Failed to create listing" },
        { status: 500 }
      );
    }

    // Send confirmation email
    if (email) {
      await getResend().emails.send({
        from: `noreply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || "curbdetail.com"}`,
        to: email,
        subject: `Listing Submitted: ${business_name}`,
        html: `
          <h2>Your Listing Has Been Submitted</h2>
          <p>Hi ${owner_name || "there"},</p>
          <p>Your listing for <strong>${business_name}</strong> in ${city}, ${state} has been submitted and is pending review.</p>
          <p>We'll notify you once it's approved and live on the site.</p>
        `,
      });
    }

    return NextResponse.json({ success: true, slug });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
