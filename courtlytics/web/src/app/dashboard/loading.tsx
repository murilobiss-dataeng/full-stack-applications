import { PageShell } from "@/components/PageShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <PageShell wide>
      <Skeleton className="h-24 w-full max-w-lg rounded-lg" />
      <Skeleton className="mt-2 h-4 w-full max-w-xl rounded" />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-[280px] w-full rounded-xl" />
        <Skeleton className="h-[280px] w-full rounded-xl" />
        <Skeleton className="h-[280px] w-full lg:col-span-2" />
      </div>
    </PageShell>
  );
}
