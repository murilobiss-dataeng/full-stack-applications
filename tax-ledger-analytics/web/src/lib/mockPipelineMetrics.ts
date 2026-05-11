/** Mock /api/metrics payload — DoorRush fictional marketplace (delivery, merchants, tax-relevant ops). */

export const mockPipelineMetrics = {
  generatedAt: "2026-05-01T12:00:00.000Z",
  batchId: "doorrush-demo-uk-42",
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
      canonicalName: "Northside Pizza Collective Ltd",
      variants: ["N. Pizza Collective", "Northside Pizza Co", "NS Pizza Ltd", "Northside Pizza — UK"],
    },
  },
  /** Avg hours from order placed to delivered (mock mart). */
  fulfillmentLatencyTrend: [
    { quarter: "Q1 24", avgHours: 38 },
    { quarter: "Q2 24", avgHours: 36 },
    { quarter: "Q3 24", avgHours: 35 },
    { quarter: "Q4 24", avgHours: 33 },
    { quarter: "Q1 26", avgHours: 31 },
  ],
  /** On-time delivery rate by city hub (mock). */
  onTimeRateByHub: [
    { hub: "London", rate: 0.94 },
    { hub: "Manchester", rate: 0.91 },
    { hub: "Birmingham", rate: 0.89 },
    { hub: "Leeds", rate: 0.92 },
    { hub: "Bristol", rate: 0.90 },
  ],
  /** Top merchant partners after golden-entity roll-up (mock). */
  partnerPerformance: [
    { name: "Merchant cluster A", orders: 48200, onTimeRate: 0.96, prepMins: 12 },
    { name: "Merchant cluster B", orders: 36100, onTimeRate: 0.93, prepMins: 14 },
    { name: "Merchant cluster C", orders: 52400, onTimeRate: 0.95, prepMins: 11 },
    { name: "Merchant cluster D", orders: 28900, onTimeRate: 0.90, prepMins: 16 },
  ],
  ingestVolumeDaily: [
    { day: "Mon", files: 118 },
    { day: "Tue", files: 132 },
    { day: "Wed", files: 105 },
    { day: "Thu", files: 141 },
    { day: "Fri", files: 128 },
    { day: "Sat", files: 44 },
    { day: "Sun", files: 38 },
  ],
  dqCheckResults: [
    { name: "not_null keys", passRate: 99.9 },
    { name: "unique resolved_entity", passRate: 100 },
    { name: "relationships FKs", passRate: 99.4 },
    { name: "accepted_values status", passRate: 100 },
    { name: "freshness bronze", passRate: 98.2 },
  ],
  ordersByStatus: [
    { status: "Delivered", count: 184200 },
    { status: "In transit", count: 22100 },
    { status: "Cancelled", count: 8900 },
    { status: "Refund pending", count: 4200 },
  ],
  monthlyThroughput: [
    { month: "Nov", millionRows: 1.1 },
    { month: "Dec", millionRows: 1.25 },
    { month: "Jan", millionRows: 1.42 },
    { month: "Feb", millionRows: 1.38 },
    { month: "Mar", millionRows: 1.55 },
    { month: "Apr", millionRows: 1.62 },
  ],
  resolutionConfidenceBuckets: [
    { bucket: "0.95–1.0", count: 6120 },
    { bucket: "0.85–0.94", count: 1580 },
    { bucket: "0.70–0.84", count: 520 },
    { bucket: "<0.70", count: 200 },
  ],
};
