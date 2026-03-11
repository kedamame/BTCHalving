import { redirect } from "next/navigation";

// Redirect root to /en
export default function RootPage() {
  redirect("/en");
}
