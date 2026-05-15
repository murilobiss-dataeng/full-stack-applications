import { getSiteUrl } from "@/lib/site-url";

export const SITE = {
  name: "Mobiliza Piraquara",
  tagline: "A cidade que queremos começa por nós!",
  description:
    "Portal de notícias e mobilização cívica de Piraquara. Transparência, informação e união pela cidade que queremos.",
  get url() {
    return getSiteUrl();
  },
  locale: "pt-BR",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mobilizapiraquara",
  facebook: "https://www.facebook.com/profile.php?id=61580773003213",
  whatsapp: "https://wa.me/554174034026",
} as const;

/** Navegação âncora — tudo na homepage */
export const NAV_LINKS = [
  { href: "/#noticias", label: "Notícias" },
  { href: "/#sobre", label: "Quem Somos" },
  { href: "/#pilares", label: "Pilares" },
  { href: "/#junte-se", label: "Junte-se" },
] as const;

export const HOME_QUICK_LINKS = [
  { href: "/#noticias", label: "Notícias", icon: "📰" },
  { href: "/#sobre", label: "Quem Somos", icon: "ℹ️" },
  { href: "/#pilares", label: "Nossos Pilares", icon: "🌿" },
  { href: "/#junte-se", label: "Participar", icon: "✊" },
] as const;

export const ABOUT_VALUES = [
  {
    id: "foco-em-resultado",
    icon: "🎯",
    title: "Foco em Resultado",
    description:
      "Queremos que de fato as ações em prol da sociedade apresentem valor real a Piraquara.",
    accent: "from-zinc-300/60 to-zinc-500/10 border-zinc-400/60 dark:from-zinc-700/40 dark:to-zinc-900/20 dark:border-zinc-600/50",
  },
  {
    id: "colaboracao",
    icon: "🤝",
    title: "Colaboração",
    description:
      "Não somos da prefeitura, portanto, precisamos do esforço de todos para que a gente consiga expandir e alcançar cada vez mais vidas.",
    accent: "from-zinc-400/50 to-zinc-600/10 border-zinc-500/50 dark:from-zinc-700/40 dark:to-zinc-900/20 dark:border-zinc-600/50",
  },
  {
    id: "visao-de-futuro",
    icon: "🌍",
    title: "Visão de Futuro",
    description:
      "A longo prazo, queremos trabalho de qualidade no município, uma logística que funciona, cidade desenvolvida e sustentável.",
    accent: "from-zinc-200/80 to-zinc-500/15 border-zinc-400/55 dark:from-zinc-700/40 dark:to-zinc-900/20 dark:border-zinc-600/50",
  },
] as const;

export const ABOUT_INTRO =
  "Um canal de comunicação que representa a transparência e a união de lideranças locais que querem contribuir para uma Piraquara mais desenvolvida. Queremos dar espaço para aqueles que querem fazer a diferença seja na vida política ou até mesmo moradores que queiram ajudar a nossa cidade.";
