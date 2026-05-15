import { redirect } from "next/navigation";
import { requirePublisher } from "@/lib/auth";
import { getCategories } from "@/services/posts";
import { Logo } from "@/components/ui/logo";
import { PublishArticleForm } from "@/components/publish/article-form";

export default async function PubliqueNovaPage() {
  const session = await requirePublisher();
  if (!session) redirect("/publique");

  const categories = await getCategories();

  return (
    <div className="card-dark p-6 sm:p-8">
      <Logo size="md" linked={false} />
      <h1 className="mt-4 text-xl font-bold text-white">Nova matéria</h1>
      <p className="text-sm text-zinc-400">Olá, {session.name}. Cole o texto e publique.</p>
      <div className="mt-6">
        <PublishArticleForm categories={categories} />
      </div>
    </div>
  );
}
