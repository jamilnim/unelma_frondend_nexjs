"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, MapPin, Calendar, DollarSign, Building } from "lucide-react";

async function fetchJob(id) {
  const res = await fetch(`/api/jobs/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to load job");
  return res.json();
}

export default function JobDetailPage() {
  const { id } = useParams();

  const { data: job, isLoading, isError, error } = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 h-10 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded border border-gray-200 bg-gray-100" />
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/career" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" /> Back to openings
        </Link>
        <p className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/career" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" /> Back to openings
        </Link>
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-10 text-center text-gray-700">
          Job not found
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/career" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" /> Back to openings
      </Link>

      <div className="mt-6">
        <div className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {job.type}
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{job.title}</h1>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: <Building className="h-4 w-4" />, label: "Company", value: job.company },
            { icon: <MapPin className="h-4 w-4" />, label: "Location", value: job.location },
            { icon: <Calendar className="h-4 w-4" />, label: "Deadline", value: job.deadline },
            { icon: <DollarSign className="h-4 w-4" />, label: "Salary", value: job.salary },
          ].map((it) => (
            <div key={it.label} className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                {it.icon}
                {it.label}
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900">{it.value || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        {[
          { h: "Job Description", v: job.description },
          { h: "Requirements", v: job.requirements },
          { h: "Responsibilities", v: job.responsibilities },
          { h: "Benefits", v: job.benefits },
          { h: "How to Apply", v: job.howToApply, accent: true },
        ].map((sec) => (
          <section
            key={sec.h}
            className={sec.accent ? "rounded-xl border border-indigo-100 bg-indigo-50 p-6" : ""}
          >
            <h2 className="text-lg font-semibold text-gray-900">{sec.h}</h2>
            <div
              className={`mt-3 whitespace-pre-wrap text-base leading-relaxed ${
                sec.accent ? "text-indigo-900" : "text-gray-700"
              }`}
            >
              {sec.v}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
