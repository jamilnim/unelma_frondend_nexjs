"use client";

import React from "react";
import { Cpu, Heart, BookOpen, Home, Users, Activity } from "lucide-react"; // example icons

const PERKS = [
  {
    title: "Competitive salary & equity",
    description: [
      "Receive market-leading compensation.",
      "Equity ensures you share in our success."
    ],
    icon: <Cpu className="w-8 h-8" />,
    bg: "white",
    textColor: "text-purple-500",
    iconColor: "text-purple-500"
  },
  {
    title: "Health, dental and vision insurance",
    description: [
      "Comprehensive coverage for you and your family.",
      "Peace of mind while you focus on work."
    ],
    icon: <Heart className="w-8 h-8" />,
    bg: "bg-purple-500",
    textColor: "text-white",
    iconColor: "text-white"
  },
  {
    title: "Unlimited days off",
    description: [
      "Take the time you need for yourself.",
      "Encouraging a healthy work-life balance."
    ],
    icon: <Users className="w-8 h-8" />,
    bg: "white",
    textColor: "text-purple-500",
    iconColor: "text-purple-500"
  },
  {
    title: "Mental health & wellness benefits",
    description: [
      "Access to therapy and wellness resources.",
      "Prioritize your mental and physical health."
    ],
    icon: <Activity className="w-8 h-8" />,
    bg: "bg-purple-500",
    textColor: "text-white",
    iconColor: "text-white"
  },
  {
    title: "Learning & development",
    description: [
      "Workshops, courses, and mentorship opportunities.",
      "Grow your skills and advance your career."
    ],
    icon: <BookOpen className="w-8 h-8" />,
    bg: "bg-purple-500",
    textColor: "text-white",
    iconColor: "text-white"
  },
  {
    title: "Work from home",
    description: [
      "Flexible home working options.",
      "Maintain productivity from anywhere."
    ],
    icon: <Home className="w-8 h-8" />,
    bg: "white",
    textColor: "text-purple-500",
    iconColor: "text-purple-500"
  },
];

export default function CareerPerksSection() {
  return (
    <section className="bg-[#5E63F5] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-12">
          Perks
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {PERKS.map((perk, i) => (
            <div
              key={i}
              className={`flex flex-col items-center p-6 rounded-xl shadow-md ${
                perk.bg === "white" ? "bg-white" : perk.bg
              }`}
            >
              <div className={`${perk.iconColor} mb-4`}>
                {perk.icon}
              </div>
              <h3
                className={`text-lg font-semibold mb-2 text-center ${perk.textColor}`}
              >
                {perk.title}
              </h3>
              <p className={`text-sm text-center ${perk.textColor} leading-snug`}>
                {perk.description.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
