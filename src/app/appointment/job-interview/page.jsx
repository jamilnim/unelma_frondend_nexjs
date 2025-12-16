"use client";

import AppointmentHerospot from "../../../component/appointmentHerospot/AppointmentHerospot";
import AppointmentForm from "../../../component/appointment/AppointmentForm";
import styles from "../appointmentLanding.module.css";

export default function JobInterviewPage() {
  return (
    <>

     <div className={styles.header}> </div>
            
              
<div className={styles.mainbody}>
      <AppointmentHerospot type="job-interview" />
      <AppointmentForm type="job-interview" />
      </div>
     
      
    </>
  );
}
