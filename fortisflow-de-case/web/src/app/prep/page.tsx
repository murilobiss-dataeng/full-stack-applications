import { redirect } from "next/navigation";

/** Legacy route: PM prep removed; AI Lab carries the interactive “prompt the stack” story. */
export default function PrepRedirectPage() {
  redirect("/ai-lab");
}
