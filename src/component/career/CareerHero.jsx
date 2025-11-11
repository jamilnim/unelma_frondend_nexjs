"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function CareerHero() {
  const slides = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
        title: "Build with Unelma",
        subtitle: "Internships, part-time, remote and full-time roles.",
      },
      {
        // You can swap to your exact Unsplash link/id if you want
        image:
          "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-laptop-computers-rMILC1PIwM0",
        title: "Grow your career",
        subtitle: "Real projects, impact, and mentorship.",
      },
      {
        image:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
        title: "Create the future",
        subtitle: "Design, engineering, and product opportunities.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer.current);
  }, [paused, slides.length]);

  // arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  return (
    <section
      className="relative isolate overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Careers hero"
    >
      {/* Viewport */}
      <div className="relative h-[60vh] min-h-[340px] w-full overflow-hidden">
        {/* Track (auto width based on slide count) */}
        <div
          className="flex h-full transition-transform duration-700 ease-out will-change-transform"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative h-full w-full flex-none"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {/* Background fill (cover + blur) so hero is always fully filled */}
              <img
                src={s.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-60"
                loading="eager"
                decoding="async"
              />

              {/* Foreground image (contain) so the full photo is visible */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: "center" }}
                loading="eager"
                decoding="async"
              />

              {/* Gradient for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Copy (only fully visible on active slide) */}
              <div className="absolute inset-0 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 pb-10">
                  <div
                    className={`max-w-3xl text-white transition-opacity duration-300 ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-widest text-white/80">
                      Careers at Unelma
                    </p>
                    <h1 className="mt-2 text-4xl font-bold leading-tight">
                      {s.title}
                    </h1>
                    <p className="mt-2 text-base text-white/90">{s.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="pointer-events-auto absolute inset-x-0 bottom-4">
          <div className="mx-auto flex w-full max-w-7xl justify-start px-4">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {paused && (
          <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
            Paused
          </div>
        )}
      </div>

      {/* small pre-header under hero */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Current openings
          </h2>
          <p className="text-sm text-gray-600">
            Explore internships, part-time, remote and full-time roles.
          </p>
        </div>
      </div>
    </section>
  );
}
