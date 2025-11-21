"use client";

import AppointmentHerospot from "../../../component/appointmentHerospot/AppointmentHerospot";
import AppointmentForm from "../../../component/appointment/AppointmentForm";

export default function AppointmentPage() {
  return (
    <>
      <AppointmentHerospot 
        title="Schedule Your Consultation" 
        subtitle="Choose a convenient date and time for your meeting with us." 
      />
      <AppointmentForm />
    </>
  );
}
