import { sampleJobs } from "@/lib/jobs/data.js";


export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json([{ id: "test", title: "Hello from API" }]);
}
