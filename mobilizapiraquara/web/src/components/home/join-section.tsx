import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function JoinSection() {
  return (
    <section id="junte-se" className="scroll-mt-20 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-500">Junte-se</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Deixe nome e WhatsApp — entraremos em contato.
      </p>
      <div className="mt-3">
        <JoinForm />
      </div>
      <div className="mt-4 border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <SocialLinks />
      </div>
    </section>
  );
}
