"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { careerStories } from "../../lib/careerStories"; 


// components/career/CareerStories.jsx
//import React, { useEffect, useRef, useState } from "react";

/**
 * CareerStories
 * - Responsive carousel: 3 visible on desktop, 2 on tablet, 1 on mobile.
 * - Smooth arrow-driven sliding plus native touch scroll.
 * - Replace `stories` images and texts with your real content.
 */
//export default function CareerStories() {
  // Replace these sample items with your real images & content
  /*const stories = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1721918316096-dbf92c7a9450?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Mari Jokiranta",
      subtitle: "helping to shape what it means to work at Vincit",
      color: "bg-red-500",
      href: "/stories/mari",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1611095973763-414019e72400?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Liam Anders",
      subtitle: "building great teams and products",
      color: "bg-blue-500",
      href: "/stories/liam",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1758874384556-cc2b9dcbb6e0?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sara Müller",
      subtitle: "crafting delightful user experiences",
      color: "bg-green-500",
      href: "/stories/sara",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Noah Patel",
      subtitle: "innovating at scale",
      color: "bg-indigo-500",
      href: "/stories/noah",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1573497161079-f3fd25cc6b90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Aisha Khan",
      subtitle: "mentoring and growing talent",
      color: "bg-pink-500",
      href: "/stories/aisha",
    },
  ];

  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3); // 3 desktop default

  // update visibleCount responsively
  useEffect(() => {
    function updateVisibleCount() {
      const w = window.innerWidth;
      if (w >= 1200) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // check scroll state (left/right)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function check() {
      const maxScrollLeft = el.scrollWidth - el.clientWidth - 1; // tolerance
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < maxScrollLeft);
    }

    // initial check
    check();

    el.addEventListener("scroll", check, { passive: true });
    // observe resize of container to re-check
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [visibleCount]);

  // helper: scroll by N cards (positive = right)
  const scrollByCards = (direction = 1) => {
    const el = containerRef.current;
    if (!el) return;

    // Find first child width (assumes all cards same width)
    const card = el.querySelector("[data-card]");
    if (!card) return;

    const style = getComputedStyle(card);
    const gap = parseFloat(getComputedStyle(el).gap || 28) || 28; // fallback
    const cardWidth = card.getBoundingClientRect().width;

    // Amount to scroll equals one "page" = visibleCount * (cardWidth + gap)
    const amount = (cardWidth + gap) * visibleCount * direction;

    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">*/
        //{/* Title */}
        //<div className="mb-6">
          //<h2 className="text-2xl md:text-3xl font-bold text-[#111827]">Career Stories</h2>
        //</div>

        //{/* Carousel wrapper */}
        //<div className="relative">
          //{/* Left arrow */}
          /*
          <button
            aria-label="Scroll left"
            onClick={() => scrollByCards(-1)}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-50 border border-pink-100 shadow-sm transition-opacity duration-200 ${
              canScrollLeft ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ transform: canScrollLeft ? "translateY(-50%)" : "translateY(-50%)" }}
          > */

            //{/* left arrow icon */}
            /*
            <svg className="w-4 h-4 md:w-5 md:h-5 text-pink-600" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          */

          //{/* Right arrow */}
          /*
          <button
            aria-label="Scroll right"
            onClick={() => scrollByCards(1)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-50 border border-pink-100 shadow-sm transition-opacity duration-200 ${
              canScrollRight ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
            style={{ transform: canScrollRight ? "translateY(-50%)" : "translateY(-50%)" }}
          >
          */

            //{/* right arrow icon */}
            /*
            <svg className="w-4 h-4 md:w-5 md:h-5 text-pink-600" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
                    */
          //{/* Scrollable track */}
          /*<div
            ref={containerRef}
            className="overflow-x-auto scroll-smooth no-scrollbar"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              gap: "28px",
              display: "flex",
              padding: "8px 48px", // leave space for arrows so cards don't run under them
            }}
          >
            {stories.map((s) => (
              <article
                key={s.id}
                data-card
                className="flex-shrink-0 bg-white rounded-lg shadow-sm"
                style={{
                  scrollSnapAlign: "center",
                  width:
                    visibleCount === 3 ? "calc((100% - 56px) / 3)" : visibleCount === 2 ? "calc((100% - 28px) / 2)" : "100%",
                  minWidth:
                    visibleCount === 3 ? "calc((100% - 56px) / 3)" : visibleCount === 2 ? "calc((100% - 28px) / 2)" : "100%",
                }}
              >
              */
                //{/* image */}
                /*
                <div className="w-full overflow-hidden rounded-t-lg">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-[260px] md:h-[300px] object-cover rounded-t-lg"
                    style={{ borderRadius: "10px 10px 0 0" }}
                    loading="lazy"
                  />
                </div>
                */

                //{/* text block */}
                /*
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#111827]">{s.name}</h3>
                  <p className="text-sm text-[#1f2937] mt-1 mb-4">{s.subtitle}</p>

                  <a
                    href={s.href}
                    className={`inline-flex items-center justify-center w-[92px] h-[36px] text-white text-sm rounded-md ${s.color} shadow-sm`}
                    aria-label={`Read more about ${s.name}`}
                  >
                    Read more
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      */

      //{/* small helper styles */}
      /*
      <style jsx>{`
        /* hide native scrollbar for modern browsers */
        //.no-scrollbar::-webkit-scrollbar {
         // display: none;
       // }
       // .no-scrollbar {
         // -ms-overflow-style: none;
          //scrollbar-width: none;
        //}

        //@media (min-width: 1200px) {
          /* ensure big gap between visible cards */
          /* gap already handled inline; this media rule can be used for tweaks */
        //}
      //`}</style>
    //</section>
  //);
//}


// src/component/career/CareerStories.jsx

export default function CareerStories() {
  const stories = careerStories;

  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    function updateVisibleCount() {
      const w = window.innerWidth;
      if (w >= 1200) setVisibleCount(3);
      else if (w >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function check() {
      const maxScrollLeft = el.scrollWidth - el.clientWidth - 1;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < maxScrollLeft);
    }
    check();
    el.addEventListener("scroll", check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [visibleCount]);

  const scrollByCards = (direction = 1) => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap || 28) || 28;
    const cardWidth = card.getBoundingClientRect().width;
    const amount = (cardWidth + gap) * visibleCount * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-10 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">Career Stories</h2>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollByCards(-1)}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-pink-50 p-2 transition-opacity ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            ‹
          </button>

          <div
            ref={containerRef}
            className="overflow-x-auto scroll-smooth no-scrollbar"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              gap: "24px",
              display: "flex",
              padding: "8px 48px",
            }}
          >
            {stories.map((s) => (
              <article
                key={s.id}
                data-card
                className="flex-shrink-0 bg-white rounded-lg shadow-sm"
                style={{
                  scrollSnapAlign: "center",
                  width:
                    visibleCount === 3 ? "calc((100% - 48px) / 3)" : visibleCount === 2 ? "calc((100% - 24px) / 2)" : "100%",
                  minWidth:
                    visibleCount === 3 ? "calc((100% - 48px) / 3)" : visibleCount === 2 ? "calc((100% - 24px) / 2)" : "100%",
                }}
              >
                <div className="w-full overflow-hidden rounded-t-lg">
                  <img src={s.image} alt={s.name} className="w-full h-[260px] md:h-[300px] object-cover rounded-t-lg" loading="lazy" />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#111827]">{s.name}</h3>
                  <p className="text-sm text-[#1f2937] mt-1 mb-4">{s.subtitle}</p>

                  <Link
                    href={`/career/stories/${s.slug}`}
                    className={`inline-flex items-center justify-center w-[92px] h-[36px] text-white text-sm rounded-md ${s.color} shadow-sm`}
                    aria-label={`Read more about ${s.name}`}
                  >
                    Read more
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            onClick={() => scrollByCards(1)}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full bg-pink-50 p-2 transition-opacity ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            ›
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
