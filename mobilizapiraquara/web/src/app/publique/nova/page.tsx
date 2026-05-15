import { redirect } from "next/navigation";
import { requirePublisher } from "@/lib/auth";
import { getCategories } from "@/services/posts";
import { PublishArticleForm } from "@/components/publish/article-form";

export default async function PubliqueNovaPage() {
  const session = await requirePublisher();
  if (!session) redirect("/publique");

  const categories = await getCategories();

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-xl font-bold text-zinc-900">Nova matéria</h1>
      <p className="mt-1 text-sm text-zinc-600">Olá, {session.name}. Cole o texto e publique.</p>
      <div className="mt-6">
        <PublishArticleForm categories={categories} />
      </div>
    </div>
  );
}
