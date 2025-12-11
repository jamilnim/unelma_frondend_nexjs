// src/app/api/jobs/route.js
import { NextResponse } from "next/server";
import { sampleJobs } from "../../../lib/jobs/data";

export async function GET() {
  // Return the full array as JSON
  return NextResponse.json(sampleJobs);
}
