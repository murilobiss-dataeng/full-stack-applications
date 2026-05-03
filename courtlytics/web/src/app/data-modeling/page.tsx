import { redirect } from "next/navigation";

export default function DataModelingRedirectPage() {
  redirect("/data-pipeline?section=modeling");
}
