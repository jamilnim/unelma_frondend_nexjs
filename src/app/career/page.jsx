"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";

// ---- data fetching ----
async function fetchJobs() {
  const res = await fetch("/api/jobs", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

// ---- small helpers ----
const fmt = (d) => d || "Open now";
const badgeColor = (t = "") => {
  const v = t.toLowerCase();
  if (v.includes("intern")) return "bg-amber-100 text-amber-700";
  if (v.includes("part")) return "bg-sky-100 text-sky-700";
  if (v.includes("full")) return "bg-emerald-100 text-emerald-700";
  if (v.includes("remote")) return "bg-violet-100 text-violet-700";
  return "bg-gray-100 text-gray-700";
};

const FILTERS = ["All", "Internship", "Full time", "Part time", "Remote"];

export default function CareerPage() {
  const { data: jobs = [], isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const [filter, setFilter] = useState("All");

  const visibleJobs = useMemo(() => {
    if (filter === "All") return jobs;
    const f = filter.toLowerCase();
    return jobs.filter((j) => (j.type || "").toLowerCase().includes(f));
  }, [jobs, filter]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <p className="text-sm/6 uppercase tracking-widest text-gray-500">
              Join Unelma Platforms
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
              Careers — current openings
            </h1>
            <p className="mt-3 text-base text-gray-600">
              Explore internships, part-time, remote, and full-time roles.
              Click any card to see details and how to apply.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-3 py-1 text-sm transition
                    ${active ? "bg-black text-white border-black" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"}`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error?.message || "Something went wrong loading jobs."}
          </p>
        )}

        {!isLoading && !isError && (
          <>
            {visibleJobs.length === 0 ? (
              <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-gray-700">
                  No openings match this filter right now. Please check back
                  later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.slice(0, 9).map((job) => (
                  <Link key={job.id} href={`/career/${job.id}`}>
                    <div className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                      <div>
                        <div className="mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-gray-200
                          {badgeColor(job.type)}">
                          {job.type}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">
                          {job.title}
                        </h3>

                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location || "—"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" />
                            <span>{job.company || "Unelma Platforms"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {job.openingDate
                                ? `Opens: ${fmt(job.openingDate)}`
                                : `Deadline: ${fmt(job.deadline)}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          View details
                        </span>
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
