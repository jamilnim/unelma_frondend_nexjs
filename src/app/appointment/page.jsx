import { redirect } from "next/navigation";

export default function AppointmentPageRedirect() {
  redirect("/appointment/introduction-meeting"); // your main form page
}
