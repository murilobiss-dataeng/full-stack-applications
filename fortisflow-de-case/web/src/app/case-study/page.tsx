import { redirect } from "next/navigation";

export default function CaseStudyRedirectPage() {
  redirect("/source-of-truth?section=narrative");
}
