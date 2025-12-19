"use client";

import DndContextWrapper from "../../component/StartupIdes/DndContextWrapper";
import MotherBoard from "../../component/StartupIdes/MotherBoard";
import GroupIndustry from "../../component/StartupIdes/GroupIndustry";
import GroupUser from "../../component/StartupIdes/GroupUser";
import GroupProblem from "../../component/StartupIdes/GroupProblem";
import GroupTime from "../../component/StartupIdes/GroupTime";
import GroupBudget from "../../component/StartupIdes/GroupBudget";
import GroupSolution from "../../component/StartupIdes/GroupSolution";
import ProgressBar from "../../component/StartupIdes/ProgressBar";
import UserInfoForm from "../../component/StartupIdes/UserInfoForm";
import ReportWithSubmit from "../../component/StartupIdes/ReportWithSubmit";
import SubmitReportButton from "../../component/StartupIdes/SubmitReportButton";

import styles from "../../component/StartupIdes/Builder.module.css";

export default function Page() {
  return (
   
    <DndContextWrapper>
        <div className={styles.header}> Build Your Idea </div>
      <div className={styles.pageWrapper}>

     

        {/* 2️⃣ All group cards in a single row */}
        <div className={styles.groupRow}>
          <GroupIndustry />
          <GroupUser />
          <GroupProblem />
          <GroupTime />
          <GroupBudget />
          <GroupSolution />
        </div>

        {/* 3️⃣ MotherBoard below groups */}
        <MotherBoard />

        {/* 4️⃣ User info form */}
        <UserInfoForm />

        {/* 5️⃣ Report form */}
        <ReportWithSubmit />

      </div>
    </DndContextWrapper>
  );
}
