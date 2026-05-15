export const SITE = {
  name: "Mobiliza Piraquara",
  tagline: "A cidade que queremos começa por nós!",
  description:
    "Portal de notícias e mobilização cívica de Piraquara. Transparência, informação e união pela cidade que queremos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobilizapiraquara.vercel.app",
  locale: "pt-BR",
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mobilizapiraquara",
  facebook: "https://www.facebook.com/profile.php?id=61580773003213",
  whatsapp: "https://wa.me/554174034026",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Notícias" },
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/junte-se", label: "Junte-se a nós" },
] as const;

export const ABOUT_VALUES = [
  {
    icon: "🎯",
    title: "Foco em Resultado",
    description:
      "Queremos que de fato as ações em prol da sociedade apresentem valor real a Piraquara.",
  },
  {
    icon: "🤝",
    title: "Colaboração",
    description:
      "Não somos da prefeitura, portanto, precisamos do esforço de todos para que a gente consiga expandir e alcançar cada vez mais vidas.",
  },
  {
    icon: "🌍",
    title: "Visão de Futuro",
    description:
      "A longo prazo, queremos trabalho de qualidade no município, uma logística que funciona, cidade desenvolvida e sustentável.",
  },
] as const;

export const ABOUT_INTRO =
  "Um canal de comunicação que representa a transparência e a união de lideranças locais que querem contribuir para uma Piraquara mais desenvolvida. Queremos dar espaço para aqueles que querem fazer a diferença seja na vida política ou até mesmo moradores que queiram ajudar a nossa cidade.";
