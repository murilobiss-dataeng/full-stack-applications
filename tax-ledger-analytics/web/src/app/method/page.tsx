import { redirect } from "next/navigation";

/** Legacy route — portfolio is framed around Data Analyst delivery, not a separate methodology page. */
export default function MethodRedirectPage() {
  redirect("/");
}
