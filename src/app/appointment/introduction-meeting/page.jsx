"use client";

import AppointmentHerospot from "../../../component/appointmentHerospot/AppointmentHerospot";
import AppointmentForm from "../../../component/appointment/AppointmentForm";
import styles from "../appointmentLanding.module.css";
import PageTransition from "../../../component/animation/PageTransition";
import FadeInSection from "../../../component/animation/FadeInSection";

export default function IntroductionMeetingPage() {
  return (
    <>
      <div className={styles.header}></div>
      <div className={styles.mainbody}>
        <PageTransition>
          <FadeInSection>
            <AppointmentHerospot type="introduction-meeting" />
            <AppointmentForm type="introduction-meeting" />
          </FadeInSection>
        </PageTransition>
      </div>
    </>
  );
}
