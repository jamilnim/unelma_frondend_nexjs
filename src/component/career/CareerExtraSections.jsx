"use client";

import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const VALUES = [
  {
    title: "Build community",
    description:
      "Collaborate with peers, share knowledge, and create an environment where everyone thrives.",
    image:
      "https://images.unsplash.com/photo-1543269866-487350d6fa5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Love your craft",
    description:
      "Focus on excellence in your work, continuously improving and mastering your skills.",
    image:
      "https://images.unsplash.com/photo-1526657782461-9fe13402a841?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Grow as you go",
    description:
      "Take on challenges, explore new opportunities, and advance your career while making an impact.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  },
];

export default function CareerExtraSections() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      const playPromise = videoEl.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.warn("Video play was blocked or interrupted:", error);
          });
      } else {
        setIsPlaying(true);
      }
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Our Values Section */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Our Values
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map((val, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <img
                src={val.image}
                alt={val.title}
                className="h-48 w-full rounded-t-lg object-cover"
              />
              <div className="flex flex-grow flex-col p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-600">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at Our Company Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          Life at Our Company
        </h2>

        <div className="relative mx-auto w-full max-w-3xl">
          {/* Video */}
          <video
            ref={videoRef}
            className="h-auto w-full rounded-xl object-cover"
            poster="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
            muted
            playsInline
            // remove autoPlay unless you really want it
            // autoPlay
            // loop
          >
            <source src="/videos/life-at-our-company.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause overlay button */}
          <button
            type="button"
            onClick={toggleVideo}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/70 shadow-lg">
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="ml-1 h-8 w-8 text-white" />
              )}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
