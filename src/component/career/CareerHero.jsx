"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";


const FALLBACK =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60";

export default function CareerHero() {
  // Slides data
  const slides = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Build with Unelma",
        subtitle: "Internships, part-time, remote and full-time roles.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Grow your career",
        subtitle: "Real projects, impact, and mentorship.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80",
        title: "Create the future",
        subtitle: "Design, engineering, and product opportunities.",
      },
    ],
    []
  );

  // State
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // Autoplay slides
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  // Image error fallback
  const onImgErr = (e) => {
    if (e?.currentTarget?.src !== FALLBACK) e.currentTarget.src = FALLBACK;
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Careers hero"
    >
      {/* Hero Images */}
      <div className="relative h-[60vh] min-h-[340px] w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="relative h-full w-full flex-none">*/
              {/* Background */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-cover"
                onError={onImgErr}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Text & CTA */}
             <div className="absolute inset-0 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 pb-10 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/80">
                    Careers at Unelma
                  </p>
                  <h1 className="mt-2 text-4xl font-bold leading-tight">{s.title}</h1>
                  <p className="mt-2 text-base">{s.subtitle}</p>

                  {/* BIG CTA */}
                  <div className="mt-8 flex justify-start">
  <button
    onClick={() => {
      const el = document.getElementById("jobs-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }}
    className="rounded-full bg-white/95 px-6 py-3 text-lg font-semibold text-gray-900 shadow hover:bg-white"
  >
    View Open Positions
  </button>
</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full mx-1 transition ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {paused && (
        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
          Paused
        </div>
      )}
    </section>
  );
}


// CareerHeroMosaic.jsx

{/*const images = [
"https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=450",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=350",
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=420",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=380",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=460",
];

const rowConfigs = [
  { speed: 0.15, sizes: ["w-32 h-32", "w-40 h-40", "w-28 h-28"] },
];

export default function CareerHeroMosaic() {
  const rowRefs = useRef([]);

  useEffect(() => {
    rowRefs.current.forEach((track, index) => {
      if (!track) return;
      const items = Array.from(track.children);

      // Duplicate for seamless scroll
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });

      const gap = 10;
      const totalWidth = items.reduce((sum, item) => sum + item.offsetWidth + gap, 0);
      track.style.width = `${totalWidth * 2}px`;

      let x = 0;
      const speed = rowConfigs[index].speed;

      const animate = () => {
        x -= speed;
        if (x <= -totalWidth) x = 0;
        track.style.transform = `translateX(${x}px)`;
        requestAnimationFrame(animate);
      };
      animate();
    });
  }, []);

  return (
    <section className="w-full bg-gray-50">*/}
      {/* Top Hero Section */}
     {/* <div className="text-center py-12 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Become the one of Unelma platform
        </h1>
        <div className="inline-flex flex-col sm:flex-row justify-center gap-4">
          <a
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            href="/job-openings"
            target="_blank"
            rel="noopener"
          >
            See Job Openings
          </a>
          <a
            className="text-blue-600 underline hover:text-blue-700 transition"
            href="/internships"
            target="_blank"
            rel="noopener"
          >
            Looking for internships?
          </a>
        </div>
      </div>*/

      {/* Multi-row Mosaic */} 
      /*<div className="overflow-hidden w-full px-4 pb-12 flex flex-col gap-6">
        {rowConfigs.map((config, rowIndex) => (
          <div
            key={rowIndex}
            ref={(el) => (rowRefs.current[rowIndex] = el)}
            className="flex gap-[10px] whitespace-nowrap items-center"
          >
            {images.map((src, i) => {
              const sizeClass = config.sizes[i % config.sizes.length];
              return (
                <img
                  key={i}
                  src={src}
                  alt={`Mosaic ${i}`}
                  className={`object-cover flex-shrink-0 ${sizeClass} rounded-lg shadow-md`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}*/}
