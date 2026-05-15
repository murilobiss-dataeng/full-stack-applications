import { redirect } from "next/navigation";
import { requirePublisher } from "@/lib/auth";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";
import { PublishLoginForm } from "@/components/publish/login-form";

export default async function PubliquePage() {
  const session = await requirePublisher();
  if (session) redirect("/publique/nova");

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
      <div className="mb-8 text-center">
        <Logo size="lg" linked={false} onDarkBackground className="mx-auto items-center" />
        <p className="mt-4 text-sm font-medium text-brand-400">{SITE.tagline}</p>
        <h1 className="mt-6 font-serif text-2xl font-bold">Área de publicação</h1>
        <p className="mt-2 text-sm text-slate-400">Acesso restrito à redação.</p>
      </div>
      <PublishLoginForm />
    </div>
  );
}
