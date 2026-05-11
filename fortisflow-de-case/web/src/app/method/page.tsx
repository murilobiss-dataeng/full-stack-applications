import { redirect } from "next/navigation";

/** Legacy route: portfolio centers on Analytics Engineering and visualization, not a standalone methodology page. */
export default function MethodRedirectPage() {
  redirect("/");
}
