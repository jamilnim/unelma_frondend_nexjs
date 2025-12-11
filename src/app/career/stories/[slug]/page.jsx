"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import FullscreenSplitSection from "../../../../component/career/FullscreenSplitSection";
import { careerStories } from "../../../../lib/careerStories";
import { careerStoryContent } from "../../../../lib/careerStoryContent";

export default function CareerStoryPage() {
  const params = useParams();
  const slug = params?.slug;

  // Find story meta (name, image, etc.)
  const meta = careerStories.find((s) => s.slug === slug);

  // Get sections content for this slug
  const sections = careerStoryContent[slug];

  const otherStories = careerStories.filter((s) => s.slug !== slug);


  // If no meta or no sections → show fallback
  if (!meta || !sections) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find that story.</p>
          <Link href="/career" className="text-sky-700 hover:underline">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* your split story layout */}
      <FullscreenSplitSection sections={sections} storyMeta={meta} />

      {/* CTA section under the story */}
      <section className="bg-white py-10 md:py-14 px-4 flex justify-center">
        <div className="max-w-3xl w-full flex justify-center">
          <a
            href="/career"
            className="relative inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 rounded-full text-sm md:text-base font-semibold text-white cursor-pointer overflow-hidden shadow-md"
          >
            {/* animated gradient background */}
            <span className="absolute inset-0 animated-gradient" />
            {/* button label */}
            <span className="relative z-10">View open positions</span>
          </a>
        </div>

        {/* local styles for the animated gradient */}
        <style jsx>{`
          .animated-gradient {
            background-image: linear-gradient(
              90deg,
              #ec4899,
              #8b5cf6,
              #0ea5e9,
              #22c55e
            );
            background-size: 250% 250%;
            transition: filter 0.3s ease;
          }

          a:hover .animated-gradient {
            animation: gradientShift 2.2s linear infinite;
            filter: brightness(1.05);
          }

          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </section>

       {/* MORE STORIES — show all stories except the current one */}
      {otherStories.length > 0 && (
        <section className="bg-gray-50 py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              More career stories
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {otherStories.map((s) => (
                <article
                  key={s.slug}
                  className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="w-full overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-900">
                      {s.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {s.subtitle}
                    </p>

                    <Link
                      href={`/career/stories/${s.slug}`}
                      className={`mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md ${
                        s.color || "bg-sky-600"
                      }`}
                    >
                      Read story
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}