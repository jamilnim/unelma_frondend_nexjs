// src/component/career/CareerIntro.jsx
"use client";

import { Briefcase, Clock, Globe, Sparkles } from "lucide-react";

export default function CareerIntro({ total = 0, counts = {}, onSelect }) {
  const { internship = 0, full = 0, part = 0, remote = 0 } = counts;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="rounded-2xl border border-gray-200/70 bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Careers at Unelma
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                Current openings
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Explore <span className="font-medium text-gray-900">internships</span>,{" "}
                <span className="font-medium text-gray-900">part-time</span>,{" "}
                <span className="font-medium text-gray-900">remote</span> and{" "}
                <span className="font-medium text-gray-900">full-time</span> roles.
                Real projects, mentorship and growth.
              </p>
            </div>

            {/* Quick actions */}
            <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
              <button
                onClick={() => onSelect?.("Internship")}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                See internships
              </button>
              <button
                onClick={() => onSelect?.("Remote")}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Remote roles
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Sparkles} label="Open roles" value={total} hint="All teams" />
            <Stat icon={Briefcase} label="Full-time" value={full} hint="Permanent" />
            <Stat icon={Clock} label="Part-time" value={part} hint="Flexible" />
            <Stat icon={Globe} label="Remote" value={remote} hint="Work from anywhere" />
          </div>

          {/* Sub CTA strip (mobile-friendly) */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge onClick={() => onSelect?.("All")}>All</Badge>
            <Badge onClick={() => onSelect?.("Internship")}>Internship</Badge>
            <Badge onClick={() => onSelect?.("Full time")}>Full time</Badge>
            <Badge onClick={() => onSelect?.("Part time")}>Part time</Badge>
            <Badge onClick={() => onSelect?.("Remote")}>Remote</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, hint }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
        <Icon className="h-4 w-4 text-gray-700" />
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{value}</div>
        <div className="text-xs text-gray-600">{label}</div>
        {hint && <div className="text-[10px] text-gray-500">{hint}</div>}
      </div>
    </div>
  );
}

function Badge({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}
