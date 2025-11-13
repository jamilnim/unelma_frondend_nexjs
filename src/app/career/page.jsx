"use client";


import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";
import CareerHero from "../../component/career/CareerHero";
import CareerIntro from "../../component/career/CareerIntro";
import CareerSearchPanel from "../../component/career/CareerSearchPanel";
import { useSearchParams, useRouter } from "next/navigation"; 

async function fetchJobs() {
  const res = await fetch("/api/jobs", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

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

// Optional helper to normalize text → your labels
function normalizeFilter(s) {
  if (!s) return "All";
  const t = s.toLowerCase();
  const found = FILTERS.find((f) => f.toLowerCase() === t);
  return found || "All";
}

// city's locations e.g espoo
function extractCity(location = "") {
  if (!location) return "";
  return location.split(",")[0].trim();
}

export default function CareerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // initialize from URL (?type=Remote, etc.)
  const initialType = normalizeFilter(searchParams.get("type"));
  const [filter, setFilter] = useState(initialType);

    //use state for the search panel for extra filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);   // job type checkboxes
  const [selectedCities, setSelectedCities] = useState([]); // city checkboxes


  // If URL changes (e.g., back/forward), keep state in sync
  useEffect(() => {
    const next = normalizeFilter(searchParams.get("type"));
    setFilter(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const { data: jobs = [], isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  /*const visibleJobs = useMemo(() => {
    if (filter === "All") return jobs;
    const f = filter.toLowerCase();
    return jobs.filter((j) => (j.type || "").toLowerCase().includes(f));
  }, [jobs, filter]);

  // count for intro stat
  const counts = useMemo(() => {
    const lc = (s = "") => s.toLowerCase();
    let internship = 0,
      full = 0,
      part = 0,
      remote = 0;
    for (const j of jobs) {
      const t = lc(j.type || "");
      if (t.includes("intern")) internship++;
      if (t.includes("full")) full++;
      if (t.includes("part")) part++;
      if (t.includes("remote")) remote++;
    }
    return { internship, full, part, remote, total: jobs.length };
  }, [jobs]); */

  const counts = useMemo(() => {
    const lc = (s = "") => s.toLowerCase();
    let internship = 0,
      full = 0,
      part = 0,
      remote = 0;
    for (const j of jobs) {
      const t = lc(j.type || "");
      if (t.includes("intern")) internship++;
      if (t.includes("full")) full++;
      if (t.includes("part")) part++;
      if (t.includes("remote")) remote++;
    }
    return { internship, full, part, remote, total: jobs.length };
  }, [jobs]);

   //counts for jobtype and available  jobs type.
  const typeOptions = useMemo(() => {
    const map = new Map();
    for (const j of jobs) {
      const label = j.type?.trim();
      if (!label) continue;
      map.set(label, (map.get(label) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([label, count]) => ({ label, value: label, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [jobs]);

  // ✅ called by hero CTAs; also used by filter buttons
  function applyFilter(nextFilter) {
    const nf = normalizeFilter(nextFilter);
    setFilter(nf);
    // reflect in URL (no full reload)
    const url = nf === "All" ? "/career" : `/career?type=${encodeURIComponent(nf)}`;
    router.replace(url, { scroll: true });

    // scroll to filters/cards for a nice UX
    const el = document.getElementById("filters") || document.getElementById("cards");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen">
      {/* HERO: pass CTA handler */}
      <CareerHero onCta={applyFilter} />

      <CareerIntro total={counts.total}
        counts={{
          internship: counts.internship,
          full: counts.full,
          part: counts.part,
          remote: counts.remote,
        }}
        onSelect={applyFilter}
      />

      {/* Filters (unchanged visually) */}
      <section id="filters" className="mx-auto max-w-7xl px-4 pb-4">
        <div className="mt-2 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => applyFilter(f)} 
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* LIST */}
      <section id="cards" className="mx-auto max-w-7xl px-4 pb-16">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-100" />
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
                <p className="text-gray-700">No openings match this filter right now. Please check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {visibleJobs.slice(0, 9).map((job) => (
                  <Link key={job.id} href={`/career/${job.id}`}>
                    <div className="group flex h-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                      <div>
                        <div
                          className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-gray-200 ${badgeColor(
                            job.type
                          )}`}
                        >
                          {job.type}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>

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
                              {job.openingDate ? `Opens: ${fmt(job.openingDate)}` : `Deadline: ${fmt(job.deadline)}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">View details</span>
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
