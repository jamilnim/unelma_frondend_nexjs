"use client";

import { useSelector } from "react-redux";
import InquiryForm from "../../component/inquiry/InquiryForm";

export default function InquiryPage() {
  const { user, jwt } = useSelector((state) => state.auth);

  return <InquiryForm user={user} jwt={jwt} />;
}
