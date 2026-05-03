import type { mockPipelineMetrics } from "@/lib/mockPipelineMetrics";

/** Shape returned by GET /api/metrics (including optional generatedAt from the route). */
export type MetricsPayload = typeof mockPipelineMetrics & { generatedAt?: string };
