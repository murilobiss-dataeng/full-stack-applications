import { redirect } from "next/navigation";

export default function DataPipelineRedirectPage() {
  redirect("/infrastructure?section=infrastructure");
}
