import { redirect } from "next/navigation";

export default function ExplorerRedirectPage() {
  redirect("/architecture?section=explorer");
}
