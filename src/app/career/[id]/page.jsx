"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, CalendarCheck, DollarSign } from "lucide-react";
import { sampleJobs } from "../../../lib/jobs/data";

const slugify = (str = "") =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");


// Ensure all jobs have an `id` (slugified title)
sampleJobs.forEach((job) => {
  if (!job.id) {
    job.id = job.title.toLowerCase().replace(/\s+/g, "-");
  }
});

// Helper to extract email from text
function extractEmail(text = "") {
  const m = text.match(/[\w.+-]+@[\w.-]+\.\w+/);
  return m ? m[0] : null;
}

// Helper to build fallback templates (optional)
function buildDefaultTemplate(job) {
  const title = job?.title || "Open Position";
  const location = job?.location || "Remote";
  const company = job?.company || "Our client";
  const salary = job?.salary || "";

  return {
    overview: `${title}, ${location}

Join ${company}, a fast-growing company, where your work will impact millions of end users worldwide. Be part of a small, senior, and tight-knit team tackling meaningful and technically challenging projects.`,
    about: `${title} — About the role

As a ${title}, you will play a crucial role in ensuring the reliability and quality of software used by many end users.`,
    offered: `You are offered

${company} offers meaningful and technically challenging projects within a compact, senior team free from heavy bureaucracy.` + (salary ? ` The salary range is ${salary}.` : ""),
    responsibilitiesList: [
      "Analyze the stability and performance of customer software.",
      "Identify root causes of software issues and design solutions.",
      "Report findings and collaborate with customers and engineering teams.",
      "Run tests to determine device stability and functionality (reboots, freezes, memory leaks).",
      "Work in Linux and embedded environments.",
      "Use Python (or similar) for analysis and automation.",
    ],
    requirementsList: [
      "Strong practical experience with Linux environments.",
      "Proactive approach to problem-solving and troubleshooting software issues.",
      "Ability to learn new technologies quickly.",
      "Strong problem-solving skills and technical curiosity.",
      "Good communication skills in English.",
      "Basic knowledge of Python for analysis and automation.",
      "Good understanding of embedded software.",
    ],
    niceToHaveList: [
      "Experience with Java, C#, or C/C++.",
      "Experience with software performance debugging.",
      "Experience with Android OS.",
      "A continuous improvement mindset.",
    ],
    recruitment:
      `Our recruitment process

This recruitment process may be handled by a partner and their contact details will be shown in the advert. The selection process may include tests and interviews and is continuous; the advert may close once a suitable candidate is found.`,
  };
}

export default function JobDetailPage() {
  const params = useParams() || {};
  const { id } = params;
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Fetch job from sampleJobs
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setNotFound(false);

    const found = sampleJobs.find(
  (j) => j.id === id || slugify(j.title) === id
);

if (!found) setNotFound(true);
else setJob(found);

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="animate-pulse rounded-lg bg-gray-100 p-8">
          <div className="h-6 w-72 bg-gray-200 mb-4" />
          <div className="h-4 w-40 bg-gray-200 mb-2" />
          <div className="h-4 w-40 bg-gray-200" />
        </div>
      </div>
    );
  }

  if (notFound || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn’t find a job matching that ID.
          </p>
          <button
            className="px-4 py-2 rounded bg-sky-700 text-white hover:bg-sky-800 transition"
            onClick={() => router.push("/career")}
          >
            Back to Careers
          </button>
        </div>
      </div>
    );
  }

  const template = buildDefaultTemplate(job);
  const overview = job.description || template.overview;
  const about = job.about || template.about;
  const offered = job.offered || template.offered;
  const responsibilities = job.responsibilities || template.responsibilitiesList.join("\n");
  const requirements = job.requirements || template.requirementsList.join("\n");
  const benefits = job.benefits || "";
  const niceToHave = template.niceToHaveList;
  const recruitment = job.recruitment || template.recruitment;
  const email = extractEmail(job.howToApply || "");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white shadow-md rounded-xl p-8 relative">
        {/* Header + image + CTAs */}
        <div className="mb-6 relative">
          {/* Centered image + title + meta */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-full flex justify-center">
              <img
                src={job.image || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80"}
                alt={job.company ? `${job.company} logo` : `${job.title} image`}
                onError={(e) => {
                  if (!e.currentTarget.dataset.fallback) {
                    e.currentTarget.dataset.fallback = "1";
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80";
                  }
                }}
                className="h-52 w-52 max-w-full object-cover rounded-xl shadow-sm border border-gray-100"
                style={{ objectPosition: "center" }}
              />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <p className="text-gray-700 flex flex-wrap items-center gap-4 justify-center">
                <span className="inline-flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>{job.company}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{job.location}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-gray-400" />
                  <span>{job.type}</span>
                </span>
                {job.salary && (
                  <span className="inline-flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span>{job.salary}</span>
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Floating Apply button (mobile) */}
          <div className="md:hidden fixed bottom-6 right-4 z-50">
            <a
              href={email ? `mailto:${email}` : "#howtoapply"}
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-sky-800 transition"
            >
              Apply
            </a>
          </div>
        </div>

        {/* Overview / About / Responsibilities / Requirements */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-700 whitespace-pre-line">{overview}</p>
        </section>

        {about && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About the role</h2>
            <p className="text-gray-700 whitespace-pre-line">{about}</p>
          </section>
        )}

        {(offered || benefits) && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">You are offered</h2>
            {offered && <p className="text-gray-700 whitespace-pre-line">{offered}</p>}
            {benefits && <p className="text-gray-700 whitespace-pre-line">{benefits}</p>}
          </section>
        )}

        {responsibilities && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Work tasks / Responsibilities</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {responsibilities
                .split("\n")
                .filter(Boolean)
                .map((r, i) => (
                  <li key={i} className="mb-1">{r}</li>
                ))}
            </ul>
          </section>
        )}

        {requirements && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {requirements
                .split("\n")
                .filter(Boolean)
                .map((r, i) => (
                  <li key={i} className="mb-1">{r}</li>
                ))}
            </ul>
          </section>
        )}

        {niceToHave && niceToHave.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">It is meritorious if you have</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {niceToHave.map((n, i) => (
                <li key={i} className="mb-1">{n}</li>
              ))}
            </ul>
          </section>
        )}

        {recruitment && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Our recruitment process</h2>
            <p className="text-gray-700 whitespace-pre-line">{recruitment}</p>
          </section>
        )}

        {/* Apply button */}
        <section className="text-center mt-8">
  <Link
    href="/career/apply"
    className="inline-block rounded-xl bg-sky-700 px-6 py-3 text-white font-medium hover:bg-sky-800 transition"
  >
    Apply now
  </Link>
</section>

        {job.howToApply && (
          <div
            id="howtoapply"
            className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 text-left text-sm text-gray-700"
          >
            <div className="font-medium mb-2">How to apply</div>
            <div className="whitespace-pre-line">{job.howToApply}</div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/career" className="text-sky-700 hover:underline text-sm font-medium">
            ← Back to Careers
          </Link>
        </div>
      </div>
    </div>
  );
}


