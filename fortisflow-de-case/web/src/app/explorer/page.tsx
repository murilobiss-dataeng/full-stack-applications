import { redirect } from "next/navigation";

export default function ExplorerRedirectPage() {
  redirect("/infrastructure?section=explorer");
}
