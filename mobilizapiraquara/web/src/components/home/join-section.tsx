import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function JoinSection() {
  return (
    <section
      id="junte-se"
      className="scroll-mt-24 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="border-b border-zinc-200 p-4 dark:border-zinc-800 sm:p-5">
        <h2 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Junte-se a nós</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Contribua com informação e mobilização. Preencha o formulário — contato pelo WhatsApp.
        </p>
        <div className="mt-4">
          <SocialLinks showLabels />
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Quero saber mais</h3>
        <div className="mt-3">
          <JoinForm />
        </div>
      </div>
    </section>
  );
}
