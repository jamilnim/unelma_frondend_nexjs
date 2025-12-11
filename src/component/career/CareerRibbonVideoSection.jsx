// components/career/CareerRibbonVideoSection.jsx
import React, { useEffect, useRef } from "react";

/**
 * CareerRibbonVideoSection
 * - Loads Lottie JSON from /lottie/wave-animation.json
 * - Uses dynamic import of lottie-web (safe with Next.js SSR)
 * - Section height ~900px (desktop). Text block positioned middle-right.
 *
 * To change file path: update `LOTTIE_PATH` constant below.
 * To change speed: call anim.setSpeed(value) after load (see example).
 */
export default function CareerRibbonVideoSection({
  lottiePath = "/lottie/ribbon-loop.json",
  initialSpeed = 1, // 1 = normal speed. Use <1 to slow (e.g. 0.6)
}) {
  const lottieContainer = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // Respect prefers-reduced-motion: don't autoplay if reduced motion is requested
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dynamic import to avoid SSR errors
    (async () => {
      try {
        const lottie = (await import("lottie-web")).default;
        if (!mounted || !lottieContainer.current) return;

        const anim = lottie.loadAnimation({
          container: lottieContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: !prefersReduced,
          path: lottiePath,
        });

        // Store reference so we can change speed or destroy later
        animRef.current = anim;

        // apply initial speed (can be <1 to slow)
        if (typeof initialSpeed === "number" && anim.setSpeed) {
          anim.setSpeed(initialSpeed);
        }

        // if user prefers reduced motion, pause (double-safety)
        if (prefersReduced && anim.pause) anim.pause();

      } catch (err) {
        // If loading fails, log a helpful message
        // (do not throw — keep page usable)
        // eslint-disable-next-line no-console
        console.warn("Lottie failed to load:", err);
      }
    })();

    // Cleanup on unmount
    return () => {
      mounted = false;
      if (animRef.current && animRef.current.destroy) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [lottiePath, initialSpeed]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#faf9f3]"
      aria-labelledby="ribbon-video-heading"
      role="region"
    >
      {/* Container sized to ~900px tall (desktop). Tailwind arbitrary value used for precision. */}
      <div className="relative mx-auto w-[92%] max-w-[1600px] h-[900px]">
        {/* Lottie background container */}
        <div
          ref={lottieContainer}
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
          aria-hidden="true"
        />

        {/* subtle overlay to ensure text contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-black/6"
        />

        {/* Content (text block) */}
        <div className="relative z-10 h-full flex items-center">
          <div
  id="ribbon-video-heading"
  className="text-[#0b1220] font-sans"
  style={{
    position: "absolute",
    top: "50%",
    left: "58%",
    transform: "translateY(-50%)",
    maxWidth: "45%",
    padding: "20px",
  }}
>
  {/* Subheading */}
  <div className="ribbon-card">
  <span className="block text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#6b7280] mb-3">
    Our purpose
  </span>

  <p className="text-lg sm:text-xl md:text-2xl font-semibold md:font-bold leading-snug md:leading-snug text-[#0b1220] mb-3">
    Technology is how we answer the biggest challenges of our time.
  </p>

  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#111827]/90">
    Together with our customers, we&apos;re building digital solutions that support a more
    sustainable, resilient future — one project, one product, and one relationship at a time.
  </p>

  <a
    href="/about"
    className="inline-flex mt-6 items-center justify-center px-6 py-3 rounded-xl bg-[#0b1220] text-white text-sm sm:text-base font-medium shadow-md hover:bg-[#1c2539] transition-all duration-200"
  >
    About us
  </a>
</div>
</div>
        </div>
      </div>

      {/* Responsive tweaks and reduced-motion fallback */}
      <style jsx>{`
  .ribbon-card {
    background: rgba(248, 250, 252, 0.96);
    border-radius: 1.25rem;
    padding: 20px 22px;
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
    backdrop-filter: blur(8px);
  }

  @media (max-width: 1024px) {
    #ribbon-video-heading {
      left: 52% !important;
      max-width: 48% !important;
      padding: 16px !important;
    }
    .ribbon-card {
      padding: 18px 20px;
    }
  }

  @media (max-width: 720px) {
    #ribbon-video-heading {
      left: 6% !important;
      top: 60% !important;
      transform: translateY(-50%) !important;
      max-width: 88% !important;
      padding: 0 !important;
    }
    .ribbon-card {
      padding: 16px 16px;
      border-radius: 1rem;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.16);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    /* visual hint — JS will also pause the animation */
    [aria-hidden="true"] {
      opacity: 0.98;
    }
  }
`}</style>
    </section>
  );
}
