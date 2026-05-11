import { redirect } from "next/navigation";

export default function DataModelingRedirectPage() {
  redirect("/infrastructure?section=modeling");
}
