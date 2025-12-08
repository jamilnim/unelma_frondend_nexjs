"use client";

import AppointmentHerospot from "../../../component/appointmentHerospot/AppointmentHerospot";
import AppointmentForm from "../../../component/appointment/AppointmentForm";

export default function IntroductionMeetingPage() {
  return (
    <>
      <AppointmentHerospot type="introduction-meeting" />
      <AppointmentForm type="introduction-meeting" />
    </>
  );
}
