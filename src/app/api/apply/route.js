import { NextResponse } from "next/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const raw = formData.get("data");
    const resume = formData.get("files.resume");

    if (!raw || typeof raw !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid data payload" },
        { status: 400 }
      );
    }

    const parsed = JSON.parse(raw);

    const {
      applicantName,
      applicantEmail,
      coverLetter = "",
      aboutYourself = "",
      jobId,
    } = parsed;

    if (!applicantName || !applicantEmail || !jobId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!resume || typeof resume.arrayBuffer !== "function") {
      return NextResponse.json(
        { success: false, error: "Resume file required" },
        { status: 400 }
      );
    }

    // Normalize jobId for Strapi (prefer number when possible)
    const jobRef =
      typeof jobId === "string" && !Number.isNaN(Number(jobId))
        ? Number(jobId)
        : jobId;

    // Reuse the original multipart payload to preserve the boundary Strapi expects
    formData.set(
      "data",
      JSON.stringify({
        applicantName,
        applicantEmail,
        coverLetter,
        aboutYourself,
        // Strapi REST expects an array of relation ids for many-to-many
        job_postings: [jobRef],
      })
    );

    // Ensure the file part is present and named correctly
    if (!formData.has("files.resume")) {
      formData.append("files.resume", resume, resume.name || "resume");
    }

    // Helpful debug if Strapi still complains
    console.log("Outgoing form keys:", [...formData.keys()]);
    console.log("Outgoing payload preview:", {
      applicantName,
      applicantEmail,
      jobId: jobRef,
      hasResume: !!resume,
    });

    const strapiRes = await fetch(`${STRAPI_URL}/api/applications`, {
      method: "POST",
      body: formData,
    });

    const result = await strapiRes.json();

    if (!strapiRes.ok) {
      console.error("Strapi error:", result);
      return NextResponse.json(
        {
          success: false,
          error: result?.error?.message || "Strapi request failed",
        },
        { status: strapiRes.status }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err) {
    console.error("Apply API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
