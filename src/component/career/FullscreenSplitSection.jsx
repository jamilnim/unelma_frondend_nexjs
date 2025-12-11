// src/component/career/FullscreenSplitSection.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";

export default function FullscreenSplitSection({ sections = [], storyMeta = {} }) {
  const [active, setActive] = useState(sections[0] || null);
  const refs = useRef([]);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    refs.current = refs.current.slice(0, sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null;
        entries.forEach((entry) => {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        });

        if (best && best.isIntersecting) {
          const idx = Number(best.target.dataset.index);
          setActive(sections[idx]);
        }
      },
      {
        root: null,
        threshold: [0.3, 0.5, 0.75],
      }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!sections || sections.length === 0) return null;

  return (
    <main className="w-full min-h-screen bg-white">
      <div className="flex flex-col md:flex-row w-full">
        {/* LEFT SIDE (image or heading) */}
        <aside className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 left-0 bg-gray-50 flex items-center justify-center overflow-hidden">
          {/* 
            key={active?.key} ensures React remounts this wrapper whenever the 
            active section changes, which re-triggers the CSS animation.
          */}
          <div key={active?.key} className="fade-slide w-full h-full flex items-center justify-center">
            {active?.leftType === "image" ? (
              <img
                src={active.leftContent}
                alt={storyMeta.name || "story image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="px-6 md:px-10">
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                  {active?.leftContent}
                </h2>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT SIDE (scrolling sections) */}
        <section className="w-full md:w-1/2">
          {sections.map((sec, idx) => (
            <article
  key={sec.key}
  data-index={idx}
  ref={(el) => (refs.current[idx] = el)}
  className={`
    min-h-[100vh] flex items-center px-6 md:px-10 py-10 md:py-16
    ${idx === 0 ? "bg-purple-300" : "bg-white"}
  `}
>
              <div className="max-w-3xl mx-auto">
                {sec.rightHeading && (
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 md:mb-6 leading-snug">
                    {sec.rightHeading}
                  </h1>
                )}

                {sec.rightText && (
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                    {sec.rightText}
                  </p>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Local CSS for fade/slide animation */}
      <style jsx>{`
        .fade-slide {
          animation: fadeSlideIn 0.35s ease-out;
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}