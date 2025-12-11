"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Briefcase, ArrowRight, Calendar, DollarSign } from "lucide-react";

export default function JobCard({ job, variant = "linkUnderline" }) {
  if (!job) return null;
  const { id, title, company, location, type, salary, deadline } = job;

  const badgeClass = (() => {
    const v = (type || "").toLowerCase();
    if (v.includes("intern")) return "bg-amber-100 text-amber-700";
    if (v.includes("part")) return "bg-sky-100 text-sky-700";
    if (v.includes("full")) return "bg-emerald-100 text-emerald-700";
    if (v.includes("remote")) return "bg-violet-100 text-violet-700";
    return "bg-gray-100 text-gray-700";
  })();

  return (
    <article
      aria-labelledby={`job-${id}-title`}
      className="
        group relative flex h-full flex-col justify-between
        rounded-xl border border-gray-200 bg-white p-6
        shadow-sm transition-all duration-200 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:border-sky-200 hover:bg-sky-50/60
      "
    >
      <div>
        {type && (
          <div className="mb-3">
            <span
              className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badgeClass}
                transition-colors duration-200 group-hover:bg-opacity-90
              `}
            >
              {type}
            </span>
          </div>
        )}

        <h3
          id={`job-${id}-title`}
          className="text-lg font-semibold text-gray-900 group-hover:text-gray-950"
        >
          {title}
        </h3>

        <p className="mt-2 text-sm text-gray-600 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-400" />
          <span>{company || "Unelma Platforms"}</span>
        </p>

        <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>{location || "Remote"}</span>
        </p>

        {/* NEW: deadline + salary meta row */}
        {(deadline || salary) && (
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            {deadline && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span>Apply by {deadline}</span>
              </span>
            )}
            {salary && (
              <span className="inline-flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                <span>{salary}</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500" aria-hidden>
          {/* placeholder for extra meta */}
        </div>

        <Link href={`/career/${encodeURIComponent(id)}`} className="ml-4">
          <span
            className={`
              inline-flex items-center gap-2 text-sm font-medium
              transition-colors duration-200
              ${
                variant === "linkUnderline"
                  ? "text-sky-700 underline-offset-2 group-hover:underline"
                  : "text-sky-700 hover:text-sky-900"
              }
            `}
            aria-label={`View job ${title} at ${company}`}
          >
            View
            <ArrowRight
              className="
                h-4 w-4
                transition-transform duration-200
                group-hover:translate-x-1.5
              "
            />
          </span>
        </Link>
      </div>
    </article>
  );
}
