import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract JSON data
    const raw = formData.get("data");
    if (!raw || typeof raw !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid data payload" },
        { status: 400 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    const {
      applicantName,
      applicantEmail,
      coverLetter = "",
      job_postings,
    } = parsed;

    const resume = formData.get("files.resume");

    // Required field validation
    if (!applicantName || !applicantEmail) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required." },
        { status: 400 }
      );
    }

    // File validation without relying on File instanceof (Node runtime)
    if (
      !resume ||
      typeof resume !== "object" ||
      typeof resume.name !== "string" ||
      typeof resume.arrayBuffer !== "function"
    ) {
      return NextResponse.json(
        { success: false, error: "Resume file is required." },
        { status: 400 }
      );
    }

    const jobConnections = Array.isArray(job_postings)
      ? job_postings.filter(Boolean)
      : job_postings
      ? [job_postings]
      : [];

    if (jobConnections.length === 0) {
      return NextResponse.json(
        { success: false, error: "job_postings must include at least 1 id." },
        { status: 400 }
      );
    }

    // Prepare Strapi payload
    const sendData = new FormData();
    sendData.append(
      "data",
      JSON.stringify({
        applicantName,
        applicantEmail,
        coverLetter,
        job_postings: { connect: jobConnections },
      })
    );
    sendData.append("files.resume", resume, resume.name);

    // POST to Strapi (collection type: applications)
    const strapiRes = await fetch(`${STRAPI_URL}/api/applications`, {
      method: "POST",
      body: sendData,
      // headers: { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }, // If needed
    });

    const result = await strapiRes.json();

    if (!strapiRes.ok) {
      console.error("STRAPI ERROR:", result);
      return NextResponse.json(
        {
          success: false,
          error:
            result?.error?.message ||
            result?.message ||
            result?.error ||
            "Strapi request failed",
        },
        { status: strapiRes.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    console.error("Apply API ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
