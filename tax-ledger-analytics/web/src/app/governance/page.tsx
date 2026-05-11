import { redirect } from "next/navigation";

export default function GovernanceRedirectPage() {
  redirect("/architecture?section=governance");
}
