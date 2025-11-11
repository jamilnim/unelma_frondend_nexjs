import { sampleJobs } from "@/lib/jobs/data";
export const dynamic = "force-dynamic";
export async function GET(_req, { params }) {
  const job = sampleJobs.find((j) => j.id === params.id);
  if (!job) return new Response("Not found", { status: 404 });
  return Response.json(job);
}