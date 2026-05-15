"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchPostsAction } from "@/app/actions/search";

type Props = {
  trigger: React.ReactNode;
};

export function SearchDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string; slug: string; excerpt?: string | null }[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSearch(q: string) {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    startTransition(async () => {
      const items = await searchPostsAction(q);
      setResults(items);
    });
  }

  function goToSearch() {
    if (query.trim()) {
      setOpen(false);
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Buscar notícias">
          {trigger}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="font-serif text-lg font-bold">Buscar notícias</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Fechar">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Digite palavras-chave..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToSearch()}
              autoFocus
            />
            <Button onClick={goToSearch} disabled={isPending}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          {results.length > 0 && (
            <ul className="mt-4 max-h-64 space-y-2 overflow-y-auto">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/noticia/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg p-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="font-semibold">{r.title}</span>
                    {r.excerpt && <p className="line-clamp-1 text-slate-500">{r.excerpt}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
