import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCategories } from "@/services/posts";
import { Logo } from "@/components/ui/logo";
import { PublishArticleForm } from "@/components/publish/article-form";

export default async function PubliqueNovaPage() {
  const session = await getSession();
  if (!session) redirect("/publique");

  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8">
        <Logo size="sm" linked={false} />
        <h1 className="mt-4 font-serif text-2xl font-bold">Nova matéria</h1>
        <p className="text-sm text-slate-400">Olá, {session.name}. Cole o texto e publique.</p>
      </div>
      <PublishArticleForm categories={categories} />
    </div>
  );
}
