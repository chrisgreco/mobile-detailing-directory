import { NextRequest, NextResponse } from "next/server";
import { getServiceRoleClient } from "@/lib/supabase";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || "re_placeholder");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, city, state, vehicle_type, service_needed } = body;

    if (!name || !email || !city || !state) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getServiceRoleClient();

    const { error } = await supabase.from("md_leads").insert({
      name,
      email,
      city,
      state,
      vehicle_type,
      service_needed,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    // Email featured detailers in the area
    const { data: detailers } = await supabase
      .from("md_listings")
      .select("email, business_name")
      .eq("status", "approved")
      .eq("featured", true)
      .eq("city", city)
      .limit(3);

    if (detailers && detailers.length > 0) {
      for (const detailer of detailers) {
        if (detailer.email) {
          await getResend().emails.send({
            from: `leads@${process.env.NEXT_PUBLIC_SITE_DOMAIN || "curbdetail.com"}`,
            to: detailer.email,
            subject: `New Lead: ${name} in ${city}, ${state}`,
            html: `
              <h2>New Quote Request</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Location:</strong> ${city}, ${state}</p>
              <p><strong>Vehicle:</strong> ${vehicle_type || "Not specified"}</p>
              <p><strong>Service:</strong> ${service_needed || "Not specified"}</p>
              <p>Reply directly to this lead at <a href="mailto:${email}">${email}</a></p>
            `,
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
