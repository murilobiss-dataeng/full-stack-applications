import { ABOUT_VALUES } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ValueCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ABOUT_VALUES.map((value) => (
        <Card
          key={value.title}
          className="group border-slate-200 transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:hover:border-brand-700"
        >
          <CardHeader>
            <span className="mb-2 text-4xl" role="img" aria-hidden>
              {value.icon}
            </span>
            <CardTitle className="font-serif text-brand-800 dark:text-brand-300">{value.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{value.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
