"use client";

import React, { useState } from "react";
import CareerIntro from "../../../component/career/CareerIntro";
import CareerSearchPanel from "../../../component/career/CareerSearchPanel";
import JobCard from "../../../component/career/JobCard";

export default function JobsPage() {
  // Mock data for demonstration
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  const counts = { internship: 2, full: 5, part: 3, remote: 4 };

  const jobs = [
    { id: 1, title: "Open application", company: "Unelma", location: "Helsinki", type: "Full-time" },
    { id: 2, title: "Internship/Traineeship", company: "Unelma", location: "Remote", type: "Remote" },
    { id: 3, title: "Graphic Designer", company: "Unelma", location: "Espoo", type: "Part-time" },
    { id: 4, title: "Drupal Developer", company: "Unelma", location: "Vantaa", type: "Internship" },
    { id: 5, title: "Junior WordPress Developer", company: "Unelma", location: "Vantaa", type: "Internship" },

  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Career Intro */}
      <CareerIntro
        total={jobs.length}
        counts={counts}
        onSelect={(type) =>
          console.log("Selected type:", type)
        }
      />

      {/* Search / Filter Panel */}
      <CareerSearchPanel
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onSearchSubmit={(term) => console.log("Search:", term)}
        typeOptions={[
          { label: "Internship", value: "Internship", count: 2 },
          { label: "Full-time", value: "Full-time", count: 5 },
          { label: "Part-time", value: "Part-time", count: 3 },
          { label: "Remote", value: "Remote", count: 4 },
        ]}
        selectedTypes={selectedTypes}
        onToggleType={(t) =>
          setSelectedTypes((prev) =>
            prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]
          )
        }
        cityOptions={[
          { label: "Helsinki", value: "Helsinki", count: 3 },
          { label: "Espoo", value: "Espoo", count: 2 },
          { label: "Vantaa", value: "Vantaa", count: 1 },
        ]}
        selectedCities={selectedCities}
        onToggleCity={(c) =>
          setSelectedCities((prev) =>
            prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c]
          )
        }
        allCitiesSelected={false}
        onToggleAllCities={() => setSelectedCities([])}
      />

      {/* Job Cards */}
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  );
}
