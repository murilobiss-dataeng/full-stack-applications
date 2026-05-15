import { JoinForm } from "@/components/forms/join-form";
import { SocialLinks } from "@/components/layout/social-links";

export function JoinSection() {
  return (
    <section id="junte-se" className="scroll-mt-28">
      <h2 className="mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        Junte-se a nós
      </h2>
      <div className="card-dark p-6 sm:p-8">
        <p className="text-center text-sm text-zinc-400">
          Deixe seu nome e WhatsApp — entraremos em contato.
        </p>
        <div className="mx-auto mt-6 max-w-md">
          <JoinForm />
        </div>
        <div className="mt-8 flex justify-center border-t border-zinc-800 pt-6">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
