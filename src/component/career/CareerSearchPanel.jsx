// src/component/career/CareerSearchPanel.jsx
"use client";

import { Search, X } from "lucide-react";
import React from "react";


export default function CareerSearchPanel({
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  suggestions = [],
  typeOptions = [],
  selectedTypes = [],
  onToggleType,
  cityOptions = [],
  selectedCities = [],
  onToggleCity,
  allCitiesSelected = false,
  onToggleAllCities,
}) {
  function handleResetFilters() {
    try {
      onSearchTermChange?.("");
      // uncheck types
      selectedTypes.forEach((t) => {
        onToggleType?.(t);
      });
      // reset cities to "all selected"
      onToggleAllCities?.(true);
    } catch (e) {
      // ignore
    }
  }

  // NEW: Remove a single active chip
  function removeChip(type, value) {
    if (type === "type") onToggleType?.(value);
    if (type === "city") onToggleCity?.(value);
  }

  return (
    <section
      aria-label="Search and filters"
      className="bg-white"
      style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }} 
    >
      <div className="mx-auto max-w-7xl px-4"> 
        {/* CARD: gradient rounded box  */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-r from-sky-50 via-white to-indigo-50/60 shadow-sm">
          {/* TOP ROW: copy + main search */}
          <div className="flex flex-col gap-4 border-b border-gray-200/70 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5">
            {/* Left copy */}
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                Find your next role
              </p>
              <h2 className="mt-1 text-xl font-semibold text-gray-900 md:text-2xl">
                Search open positions at Unelma
              </h2>
              <p className="mt-1 text-xs text-gray-600 md:text-sm">
                Search by job title, company or city, then refine with job type
                and location filters.
              </p>
            </div>

            {/* Main search input */}
            <div className="relative w-full max-w-md">
              <label className="sr-only" htmlFor="job-search">
                Search by job title, company or location
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-sky-500/70">
                <Search className="h-4 w-4 flex-shrink-0 text-gray-500" />
                <input
                  id="job-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchTermChange?.(e.target.value)}
                  placeholder="Job title, company or location"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => onSearchSubmit?.(searchTerm)}
                  className="hidden flex-shrink-0 rounded-xl bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-black md:inline-block"
                >
                  Search
                </button>
              </div>

              {/* Suggestions dropdown */}
              {searchTerm?.trim().length >= 3 && suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                  <ul className="max-h-64 overflow-auto text-sm">
                    {suggestions.map((s) => (
                      <li key={`${s.type}-${s.label}`}>
                        <button
                          type="button"
                          onClick={() => onSearchSubmit?.(s.label)}
                          className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="truncate text-gray-900">{s.label}</span>
                          <span className="ml-3 flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                            {s.type}
                          </span>
                        </button>
                      </li>
                    ))}
                    <li className="border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => onSearchSubmit?.(searchTerm)}
                        className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-gray-50"
                      >
                        <span className="truncate text-gray-900">
                          Search for “{searchTerm.trim()}”
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* ACTIVE FILTERS ROW (NEW) */}
          <div className="px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {/* show active search term chip */}
                {searchTerm?.trim() ? (
                  <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm shadow">
                    <span className="text-sm text-gray-800 truncate max-w-xs">
                      "{searchTerm.trim()}"
                    </span>
                    <button
                      onClick={() => onSearchTermChange?.("")}
                      className="rounded-full p-1 text-gray-500 hover:text-gray-800"
                      aria-label="Clear search term"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : null}

                {/* selected type chips */}
                {selectedTypes?.map((t) => (
                  <div
                    key={`chip-type-${t}`}
                    className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm shadow"
                  >
                    <span className="text-sm text-gray-800">{t}</span>
                    <button
                      onClick={() => removeChip("type", t)}
                      className="rounded-full p-1 text-gray-500 hover:text-gray-800"
                      aria-label={`Remove ${t}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {/* selected city chips */}
                {selectedCities?.map((c) => (
                  <div
                    key={`chip-city-${c}`}
                    className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm shadow"
                  >
                    <span className="text-sm text-gray-800">{c}</span>
                    <button
                      onClick={() => removeChip("city", c)}
                      className="rounded-full p-1 text-gray-500 hover:text-gray-800"
                      aria-label={`Remove ${c}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="rounded-md border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Reset filters
                </button>
                {/* small helper text */}
                <span className="hidden text-xs text-gray-500 md:inline">
                  {selectedTypes.length + selectedCities.length === 0 &&
                  !searchTerm
                    ? "No filters active"
                    : `${selectedTypes.length} type(s), ${selectedCities.length} city(ies)`}
                </span>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: job type + cities */}
          <div className="grid gap-4 px-4 py-4 md:grid-cols-2 md:px-6 md:py-5">
            {/* Job type / categories */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Job type
                  </p>
                  <p className="text-xs text-gray-500">
                    Choose contract types that fit you.
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm">
                {typeOptions.length === 0 && (
                  <p className="text-xs text-gray-500">No job types yet.</p>
                )}
                {typeOptions.map((t) => (
                  <label
                    key={t.value}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 py-1.5 hover:bg-sky-50"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t.value)}
                        onChange={() => onToggleType?.(t.value)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm text-gray-800">{t.label}</span>
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {t.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                    Cities
                  </p>
                  <p className="text-xs text-gray-500">
                    Focus on Helsinki, Espoo, Vantaa and more.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleAllCities?.(!allCitiesSelected)}
                  className="text-[11px] font-medium text-sky-700 hover:text-sky-900"
                >
                  {allCitiesSelected ? "Clear all" : "Select all"}
                </button>
              </div>
              <div className="space-y-1.5 rounded-2xl border border-gray-200 bg-white/90 p-3 shadow-sm">
                {cityOptions.length === 0 && (
                  <p className="text-xs text-gray-500">No city information yet.</p>
                )}
                {cityOptions.map((c) => (
                  <label
                    key={c.value}
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 py-1.5 hover:bg-sky-50"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(c.value)}
                        onChange={() => onToggleCity?.(c.value)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                      <span className="text-sm text-gray-800">{c.label}</span>
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {c.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
