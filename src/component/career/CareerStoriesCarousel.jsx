"use client";
import React from "react";
import Link from "next/link";
import { careerStories } from "../../lib/careerStories";
/*
export default function CareerStoriesCarousel() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Career Stories</h2>
      <div className="flex overflow-x-auto gap-6 px-2 md:px-0">
        {careerStories.map((person) => (
          <div
            key={person.slug}
            className="min-w-[300px] md:min-w-[350px] bg-gray-50 rounded-lg shadow-md flex-shrink-0"
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{person.name}</h3>
              <p className="text-sm text-gray-700 mt-1">{person.date}</p>
              <Link
                href={`/career/stories/${person.slug}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
*/

export default function CareerStoriesCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Career Stories</h2>
        <div className="flex gap-6 overflow-auto no-scrollbar">
          {careerStories.map((person) => (
            <div key={person.slug} className="min-w-[280px] bg-gray-50 rounded-lg shadow-md flex-shrink-0">
              <img src={person.image} alt={person.name} className="w-full h-44 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-sm text-gray-700 mt-1">{person.subtitle}</p>
                <Link href={`/career/stories/${person.slug}`} className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
