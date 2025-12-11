"use client";

import React, { useState } from "react";

export default function RegularAppointmentPage() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
    console.log({ name, date, time, notes });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-white px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Schedule a Regular Appointment
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Fill out the form below to book your appointment
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-50 p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <label className="flex flex-col">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="flex flex-col">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="flex flex-col">
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>

        <label className="flex flex-col">
          Notes (Optional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Schedule
        </button>
      </form>
    </div>
  );
}
