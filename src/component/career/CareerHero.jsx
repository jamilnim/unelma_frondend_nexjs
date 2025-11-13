"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const FALLBACK =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60";

export default function CareerHero({ onCta }) {
  const slides = useMemo(
    () => [
      {
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        title: "Build with Unelma",
        subtitle: "Internships, part-time, remote and full-time roles.",
        ctas: [
          { label: "See internships", value: "Internship" },
          { label: "Remote roles", value: "Remote" },
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
        title: "Grow your career",
        subtitle: "Real projects, impact, and mentorship.",
        ctas: [
          { label: "Full time", value: "Full time" },
          { label: "Part time", value: "Part time" },
        ],
      },
      {
        image:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1600&q=80",
        title: "Create the future",
        subtitle: "Design, engineering, and product opportunities.",
        ctas: [
          { label: "All openings", value: "All" },
          { label: "Remote roles", value: "Remote" },
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  // autoplay
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      5000
    );
    return () => clearInterval(timerRef.current);
  }, [paused, slides.length]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  // swipe for mobile
  const touchStart = useRef({ x: 0, y: 0, active: false });
  const handleTouchStart = (e) => {
    const t = e.touches?.[0];
    if (!t) return;
    touchStart.current = { x: t.clientX, y: t.clientY, active: true };
  };
  const handleTouchEnd = (e) => {
    if (!touchStart.current.active) return;
    const t = e.changedTouches?.[0];
    if (!t) return;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current.active = false;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) setIndex((i) => (i + 1) % slides.length);
    else setIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const onImgErr = (e) => {
    if (e?.currentTarget?.src !== FALLBACK) e.currentTarget.src = FALLBACK;
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Careers hero"
    >
      {/* Viewport */}
      <div className="relative h-[60vh] min-h-[340px] w-full overflow-hidden">
        {/* Track */}
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
              {/* Background cover (blurred) */}
              <img
                src={s.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-60"
                onError={onImgErr}
              />

              {/* Foreground (contain) */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 h-full w-full object-contain"
                style={{ objectPosition: "center" }}
                onError={onImgErr}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Text with animation */}
              <div className="absolute inset-0 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 pb-10">
                  <motion.div
                    key={i === index ? `active-${i}` : `inactive-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: i === index ? 1 : 0,
                      y: i === index ? 0 : 8,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="max-w-3xl text-white"
                  >
                    <p className="text-xs uppercase tracking-widest text-white/80">
                      Careers at Unelma
                    </p>
                    <h1 className="mt-2 text-4xl font-bold leading-tight">
                      {s.title}
                    </h1>
                    <p className="mt-2 text-base text-white/90">{s.subtitle}</p>

                    {!!s.ctas?.length && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.ctas.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => onCta?.(c.value)}
                            className="rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium text-gray-900 shadow hover:bg-white"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
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
                    i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
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

      {/* Section under hero */}
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
