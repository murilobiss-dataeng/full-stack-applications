import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-foreground">Courtlytics</p>
          <p className="mt-1 max-w-md">Legal entity resolution and analytics — portfolio demonstration.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="hover:text-foreground" href="/architecture">
            Architecture
          </Link>
          <Link className="hover:text-foreground" href="/api/metrics">
            API metrics
          </Link>
        </div>
      </div>
    </footer>
  );
}
