/** Mock /api/metrics payload: sigma-sec fictional marketplace (delivery, merchants, tax-relevant ops). */

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
      variants: ["N. Pizza Collective", "Northside Pizza Co", "NS Pizza Ltd", "Northside Pizza (UK)"],
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
  /**
   * Mock cohort curves: % of merchants placing ≥1 order in week N after signup cohort month.
   * Same shape you would build from a mart fct_orders joined to dim_merchant_first_order.
   */
  cohortMerchantRetentionPct: [
    { relWeek: "W+0", m09: 100, m10: 100, m11: 100, m12: 100 },
    { relWeek: "W+1", m09: 42, m10: 45, m11: 47, m12: 49 },
    { relWeek: "W+2", m09: 35, m10: 38, m11: 40, m12: 42 },
    { relWeek: "W+3", m09: 31, m10: 34, m11: 36, m12: 38 },
    { relWeek: "W+4", m09: 28, m10: 31, m11: 33, m12: 35 },
    { relWeek: "W+8", m09: 22, m10: 25, m11: 27, m12: 29 },
  ],
  /** Funnel from placement to proof-of-delivery (counts), mock ops mart. */
  fulfillmentFunnel: [
    { step: "Placed", count: 284000 },
    { step: "Accepted", count: 268200 },
    { step: "In kitchen", count: 251400 },
    { step: "Out for delivery", count: 239800 },
    { step: "Delivered", count: 228400 },
  ],
  /** % of GMV by segment (stacked = 100), weekly decomposition mock. */
  segmentGmvMixPct: [
    { week: "W40", smb: 52, midMarket: 34, enterprise: 14 },
    { week: "W41", smb: 51, midMarket: 35, enterprise: 14 },
    { week: "W42", smb: 50, midMarket: 35, enterprise: 15 },
    { week: "W43", smb: 49, midMarket: 36, enterprise: 15 },
    { week: "W44", smb: 48, midMarket: 37, enterprise: 15 },
    { week: "W45", smb: 47, midMarket: 38, enterprise: 15 },
    { week: "W46", smb: 47, midMarket: 38, enterprise: 15 },
    { week: "W47", smb: 46, midMarket: 39, enterprise: 15 },
  ],
  /** YoY-style lift drivers (index), illustrative bridge chart. */
  kpiBridgeIndex: [
    { label: "Q3 baseline", value: 100 },
    { label: "+ Orders", value: 108 },
    { label: "+ AOV", value: 114 },
    { label: "− Promo", value: 109 },
    { label: "Q4 outcome", value: 109 },
  ],
};
