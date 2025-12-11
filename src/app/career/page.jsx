"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import CareerHero from "@/component/career/CareerHero";
import CareerJobsBlock from "../../component/career/CareerJobsBlock";
import CareerExtraSections from "../../component/career/CareerExtraSections";
import CareerPerksSection from "../../component/career/CareerPerksSection";
import CareerRibbonVideoSection from "../../component/career/CareerRibbonVideoSection";
import CareerStories from "../../component/career/CareerStories";
// Data fetch
async function fetchJobs() {
  const res = await fetch("/api/jobs", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

// Helpers
const FILTERS = ["All", "Internship", "Full time", "Part time", "Remote"];
function normalizeFilter(s) {
  if (!s) return "All";
  const t = s.toLowerCase();
  const found = FILTERS.find((f) => f.toLowerCase() === t);
  return found || "All";
}

export default function CareerPage() {
  // Top filter from URL
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = normalizeFilter(searchParams.get("type"));
  const [filter, setFilter] = useState(initialType);

  // Sync URL -> filter
  useEffect(() => {
    const next = normalizeFilter(searchParams.get("type"));
    setFilter(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch jobs
  const { data: jobs = [], isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <CareerHero />
      <CareerExtraSections />
      <CareerPerksSection />
      <CareerStories />
      <CareerRibbonVideoSection lottiePath="/lottie/wave-animation.json" initialSpeed={0.7} />
      <CareerJobsBlock />
      
      
      
      {/* NOTHING ELSE HERE */}
      {/* When user clicks "View Open Positions" CTA in the hero, they go to /career/jobs */}
    </div>
  );
}

