import type { Metadata } from "next";
import { PublishShell } from "@/components/publish/publish-shell";

export const metadata: Metadata = {
  title: "Publicar",
  robots: { index: false, follow: false },
};

export default function PubliqueLayout({ children }: { children: React.ReactNode }) {
  return <PublishShell>{children}</PublishShell>;
}
