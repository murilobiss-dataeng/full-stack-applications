import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-zinc-100">
      <SiteHeader />
      <main className="flex-1 bg-black">{children}</main>
      <SiteFooter />
    </div>
  );
}
