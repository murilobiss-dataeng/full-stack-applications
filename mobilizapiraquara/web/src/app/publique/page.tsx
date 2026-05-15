import { redirect } from "next/navigation";
import { requirePublisher } from "@/lib/auth";
import { PublishLoginForm } from "@/components/publish/login-form";

export default async function PubliquePage() {
  const session = await requirePublisher();
  if (session) redirect("/publique/nova");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-zinc-900">Área de publicação</h1>
        <p className="mt-2 text-sm text-zinc-600">Acesso restrito à redação.</p>
      </div>
      <PublishLoginForm />
    </div>
  );
}
