/** Mock output shaped like a curated pipeline + warehouse metrics (used by /api/metrics). */

export const mockPipelineMetrics = {
  generatedAt: "2026-05-01T12:00:00.000Z",
  batchId: "demo-batch-42",
  pipeline: {
    stages: ["raw", "staging", "curated", "warehouse_views"],
    lastRunDurationMs: 18420,
    rowsProcessed: 128400,
    validationPassRate: 0.997,
  },
  entityResolution: {
    clustersMerged: 8420,
    avgConfidence: 0.91,
    sampleCluster: {
      canonicalName: "Jonathan A. Smith",
      variants: ["John Smith", "J. Smith", "Jonathan Smith", "Smith, John A."],
    },
  },
  caseDurationTrend: [
    { quarter: "Q1 24", avgDays: 312 },
    { quarter: "Q2 24", avgDays: 298 },
    { quarter: "Q3 24", avgDays: 305 },
    { quarter: "Q4 24", avgDays: 288 },
    { quarter: "Q1 26", avgDays: 276 },
  ],
  winRateByCourt: [
    { court: "SDNY", rate: 0.42 },
    { court: "NDCA", rate: 0.38 },
    { court: "EDTX", rate: 0.51 },
    { court: "D.Del.", rate: 0.45 },
    { court: "N.D.Ill.", rate: 0.39 },
  ],
  lawyerPerformance: [
    { name: "Resolved Entity A", cases: 48, winRate: 0.61, medianDays: 240 },
    { name: "Resolved Entity B", cases: 36, winRate: 0.54, medianDays: 265 },
    { name: "Resolved Entity C", cases: 52, winRate: 0.58, medianDays: 228 },
    { name: "Resolved Entity D", cases: 29, winRate: 0.49, medianDays: 302 },
  ],
};
