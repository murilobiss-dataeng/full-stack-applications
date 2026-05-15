import { redirect } from "next/navigation";
import { requirePublisher } from "@/lib/auth";
import { Logo } from "@/components/ui/logo";
import { PublishLoginForm } from "@/components/publish/login-form";

export default async function PubliquePage() {
  const session = await requirePublisher();
  if (session) redirect("/publique/nova");

  return (
    <div className="card-dark p-8">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo size="lg" linked={false} className="items-center" />
        <h1 className="mt-6 text-xl font-bold text-white">Área de publicação</h1>
        <p className="mt-2 text-sm text-zinc-400">Acesso restrito à redação.</p>
      </div>
      <PublishLoginForm />
    </div>
  );
}
