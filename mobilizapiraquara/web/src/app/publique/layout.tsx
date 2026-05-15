import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicar",
  robots: { index: false, follow: false },
};

export default function PubliqueLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-md px-4 py-10">{children}</div>
    </div>
  );
}
