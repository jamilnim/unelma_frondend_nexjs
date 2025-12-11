"use client";

import React, { useMemo, useState } from "react";
import { sampleJobs } from "@/lib/jobs/data";
import CareerIntro from "./CareerIntro";
import CareerSearchPanel from "./CareerSearchPanel";
import JobCard from "./JobCard";

// Fixed lists: always shown in the panel
const ALL_TYPES = [
  { value: "internship", label: "Internship" },
  { value: "full time", label: "Full time" },
  { value: "part time", label: "Part time" },
  { value: "remote", label: "Remote" },
];

const ALL_CITIES = [
  { value: "Remote", label: "Remote" },
  { value: "Helsinki", label: "Helsinki" },
  { value: "Espoo", label: "Espoo" },
  { value: "Vantaa", label: "Vantaa" },
];

// Normalize job.type into one of the fixed types above
function getJobTypeKey(job) {
  const t = (job.type || "").toLowerCase();
  if (t.includes("intern")) return "internship";
  if (t.includes("full")) return "full time";
  if (t.includes("part")) return "part time";
  if (t.includes("remote")) return "remote";
  return ""; // unknown / other
}

// Normalize job.location into one of the city labels above (if possible)
function getJobCities(job) {
  const loc = (job.location || "").toLowerCase();
  const matches = [];

  if (loc.includes("remote")) matches.push("Remote");
  if (loc.includes("helsinki")) matches.push("Helsinki");
  if (loc.includes("espoo")) matches.push("Espoo");
  if (loc.includes("vantaa")) matches.push("Vantaa");

  // If nothing matches and it's not empty, just return the raw location once
  if (matches.length === 0 && loc.trim()) {
    matches.push(job.location);
  }

  return matches;
}

export default function CareerJobsBlock() {
  // ---- STATE ----
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]); // e.g. ["full time"]
  const [selectedCities, setSelectedCities] = useState([]); // e.g. ["Espoo"]
  const [allCitiesSelected, setAllCitiesSelected] = useState(true);

  // ---- OPTIONS WITH COUNTS (ALWAYS SHOW FULL LIST) ----
  const typeOptions = useMemo(() => {
    // Count jobs per normalized type
    const counts = ALL_TYPES.reduce((acc, t) => {
      acc[t.value] = 0;
      return acc;
    }, {});

    sampleJobs.forEach((job) => {
      const key = getJobTypeKey(job); // "full time", "part time", etc
      if (key && counts[key] !== undefined) {
        counts[key] += 1;
      }
    });

    return ALL_TYPES.map((t) => ({
      value: t.value,
      label: t.label,
      count: counts[t.value] ?? 0,
    }));
  }, []);

  const cityOptions = useMemo(() => {
    const counts = ALL_CITIES.reduce((acc, c) => {
      acc[c.value] = 0;
      return acc;
    }, {});

    sampleJobs.forEach((job) => {
      const jobCities = getJobCities(job); // e.g. ["Espoo", "Finland"] or ["Remote"]
      jobCities.forEach((c) => {
        if (counts[c] !== undefined) {
          counts[c] += 1;
        }
      });
    });

    return ALL_CITIES.map((c) => ({
      value: c.value,
      label: c.label,
      count: counts[c.value] ?? 0,
    }));
  }, []);

  // ---- FILTERED JOBS ----
  const filteredJobs = useMemo(() => {
    return sampleJobs.filter((job) => {
      // 1) SEARCH TERM
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const text =
          `${job.title || ""} ${job.company || ""} ${job.location || ""}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      // 2) TYPE FILTER
      if (selectedTypes.length > 0) {
        const key = getJobTypeKey(job); // "full time", "part time", etc
        if (!selectedTypes.includes(key)) return false;
      }

      // 3) CITY FILTER
      if (!allCitiesSelected && selectedCities.length > 0) {
        const jobCities = getJobCities(job); // canonical labels
        const match = jobCities.some((c) => selectedCities.includes(c));
        if (!match) return false;
      }

      return true;
    });
  }, [searchTerm, selectedTypes, selectedCities, allCitiesSelected]);

  // ---- COUNTS FOR HEADER (CareerIntro) ----
  const introCounts = useMemo(() => {
    let internship = 0;
    let full = 0;
    let part = 0;
    let remote = 0;

    sampleJobs.forEach((job) => {
      const key = getJobTypeKey(job);
      if (key === "internship") internship += 1;
      if (key === "full time") full += 1;
      if (key === "part time") part += 1;
      if (key === "remote") remote += 1;
    });

    return { internship, full, part, remote };
  }, []);

  // ---- SUGGESTIONS (simple) ----
  const suggestions = useMemo(() => {
    if (searchTerm.trim().length < 3) return [];

    const q = searchTerm.toLowerCase();
    const set = new Set();

    sampleJobs.forEach((job) => {
      if (job.title && job.title.toLowerCase().includes(q)) {
        set.add(JSON.stringify({ type: "Job title", label: job.title }));
      }
      if (job.company && job.company.toLowerCase().includes(q)) {
        set.add(JSON.stringify({ type: "Company", label: job.company }));
      }
      if (job.location && job.location.toLowerCase().includes(q)) {
        set.add(JSON.stringify({ type: "Location", label: job.location }));
      }
    });

    return Array.from(set).map((s) => JSON.parse(s));
  }, [searchTerm]);

  // ---- HANDLERS ----
  const handleToggleType = (value) => {
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const handleToggleCity = (value) => {
    setAllCitiesSelected(false);
    setSelectedCities((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleToggleAllCities = (nextAll) => {
    setAllCitiesSelected(nextAll);
    if (nextAll) {
      setSelectedCities([]);
    } else {
      // start with all cities selected
      setSelectedCities(ALL_CITIES.map((c) => c.value));
    }
  };

  const handleSearchSubmit = (value) => {
    setSearchTerm(value || "");
  };

  return (
    <section id="open-position"  className="bg-gray-50 pb-16">
      {/* Intro stats */}
      <CareerIntro
        total={sampleJobs.length}
        counts={introCounts}
      />

      {/* Search + filters */}
      <CareerSearchPanel
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
        suggestions={suggestions}
        typeOptions={typeOptions}
        selectedTypes={selectedTypes}
        onToggleType={handleToggleType}
        cityOptions={cityOptions}
        selectedCities={selectedCities}
        onToggleCity={handleToggleCity}
        allCitiesSelected={allCitiesSelected}
        onToggleAllCities={handleToggleAllCities}
      />

      {/* Results grid */}
      <div className="mx-auto mt-6 max-w-7xl px-4">
        {filteredJobs.length === 0 ? (
          <p className="text-sm text-gray-600">
            No jobs match your filters yet. Try adjusting your search or filters.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
