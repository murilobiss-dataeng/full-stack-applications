import { Logo } from "@/components/ui/logo";

export function PublishShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-800 bg-black">
        <div className="mx-auto flex max-w-2xl justify-center px-4 py-4 sm:py-5">
          <Logo size="md" href="/" className="items-center" />
        </div>
      </header>
      <div className="mx-auto w-full max-w-md px-4 py-8 sm:py-10">{children}</div>
    </div>
  );
}
