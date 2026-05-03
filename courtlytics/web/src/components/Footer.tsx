import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-sm text-muted-foreground md:py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-medium text-foreground">Courtlytics</p>
          <p className="mt-1 max-w-md">
            Clean, structured, connected legal data — portfolio demo (method inspired by industry CSC-style programs).
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="transition-colors duration-200 hover:text-foreground" href="/method">
            Method
          </Link>
          <Link className="transition-colors duration-200 hover:text-foreground" href="/explorer">
            Explorer
          </Link>
          <Link className="transition-colors duration-200 hover:text-foreground" href="/architecture">
            Architecture
          </Link>
          <Link className="transition-colors duration-200 hover:text-foreground" href="/api/metrics">
            API metrics
          </Link>
        </div>
      </div>
    </footer>
  );
}
