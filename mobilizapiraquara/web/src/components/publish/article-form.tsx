"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { publishArticle, publishLogout } from "@/app/actions/publish";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogOut, Sparkles } from "lucide-react";

type Category = { id: string; name: string };

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-zinc-400";

export function PublishArticleForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await publishArticle(formData);
    setLoading(false);

    if (result.success && result.slug) {
      toast.success("Matéria publicada!");
      router.push(`/noticia/${result.slug}`);
    } else {
      toast.error(result.error ?? "Erro ao publicar");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Título (opcional — a IA pode gerar)</Label>
          <Input id="title" name="title" placeholder="Título sugerido" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rawText">Texto bruto da matéria *</Label>
          <textarea
            id="rawText"
            name="rawText"
            required
            rows={14}
            placeholder="Cole aqui o texto da notícia. A IA irá corrigir gramática, organizar parágrafos e gerar título/subtítulo sem inventar fatos."
            className={fieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImageUrl">URL da imagem de capa (opcional)</Label>
          <Input id="coverImageUrl" name="coverImageUrl" type="url" placeholder="https://..." />
          <p className="text-xs text-zinc-500">Se vazio, usamos imagem padrão da categoria.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoryId">Categoria</Label>
          <select id="categoryId" name="categoryId" className={`${fieldClass} h-11 py-2`}>
            <option value="">Sem categoria</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input type="checkbox" name="featured" className="rounded border-zinc-400" />
          Destaque na homepage
        </label>

        <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Formatando e publicando...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Publicar com IA
            </>
          )}
        </Button>
      </form>

      <form action={publishLogout}>
        <Button type="submit" variant="outline" className="gap-2">
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </form>
    </div>
  );
}
