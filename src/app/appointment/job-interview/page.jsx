"use client";

import AppointmentHerospot from "../../../component/appointmentHerospot/AppointmentHerospot";
import AppointmentForm from "../../../component/appointment/AppointmentForm";

export default function JobInterviewPage() {
  return (
    <>
      <AppointmentHerospot type="job-interview" />
      <AppointmentForm type="job-interview" />
    </>
  );
}
