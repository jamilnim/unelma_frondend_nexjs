"use client";

import React from "react";
import { Calendar, Briefcase, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppointmentLandingPage() {
  const isLoggedIn = false; // Replace with your auth state
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Make an Appointment
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Choose your appointment type below
      </p>

      {/* Cards container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Regular Appointment Card */}
        <div className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center shadow hover:shadow-md transition">
          <Calendar className="h-10 w-10 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Regular Appointment
          </h2>
          <p className="text-gray-600 mb-4">
            Schedule a standard meeting with our team for general inquiries or services.
          </p>
          <button
            onClick={() => router.push("/appointment/regular")}
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            Schedule Now
          </button>
        </div>

        {/* Job Interview Card */}
        <div className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center shadow hover:shadow-md transition">
          <Briefcase className="h-10 w-10 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Job Interview
          </h2>
          <p className="text-gray-600 mb-4">
            Apply for open positions and connect with our hiring managers.
          </p>
          <button
            onClick={() => router.push("/appointment/interview")}
            className="w-full rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
          >
            Apply for Interview
          </button>
        </div>
      </div>

      {/* Login status */}
      <div className="mt-8 text-center">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-600">You are not logged in.</span>
            <button className="inline-flex items-center gap-2 rounded-xl bg-gray-800 px-4 py-2 text-white font-medium hover:bg-gray-900 transition">
              Login <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <span className="text-gray-600">You are logged in.</span>
        )}
      </div>
    </div>
  );
}
