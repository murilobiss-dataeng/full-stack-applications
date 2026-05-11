const layers = [
  { title: "Ingestion", items: ["ERP / OMS APIs", "POS / partner feeds", "Reference masters"], x: 40, y: 20 },
  { title: "Data Lake (S3)", items: ["Raw zone", "Partitioned by source / date"], x: 220, y: 20 },
  { title: "Processing", items: ["Python ETL", "Entity resolution", "DQ checks"], x: 400, y: 20 },
  { title: "Warehouse", items: ["PostgreSQL", "Relational core"], x: 40, y: 140 },
  { title: "Transform (dbt)", items: ["Models", "Tests", "Lineage"], x: 220, y: 140 },
  { title: "Serving API", items: ["Next.js / Edge", "Metrics & search"], x: 400, y: 140 },
];

export function ArchitectureDiagram() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-cyan-50/30 p-6">
      <svg viewBox="0 0 560 260" className="mx-auto h-auto min-w-[560px]" aria-label="FortisFlow system architecture diagram">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="hsl(199, 92%, 45%)" />
          </marker>
        </defs>
        {layers.map((box) => (
          <g key={box.title} transform={`translate(${box.x},${box.y})`}>
            <rect width="150" height="100" rx="12" fill="hsl(0, 0%, 100%)" stroke="hsl(199, 92%, 56%)" strokeWidth="1.5" />
            <text x="12" y="22" fill="hsl(222, 47%, 11%)" fontSize="11" fontWeight="600">
              {box.title}
            </text>
            {box.items.map((line, i) => (
              <text key={line} x="12" y={40 + i * 16} fill="hsl(220, 9%, 40%)" fontSize="10">
                {line}
              </text>
            ))}
          </g>
        ))}
        <line x1="115" y1="70" x2="210" y2="70" stroke="hsl(199, 70%, 70%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="295" y1="70" x2="390" y2="70" stroke="hsl(199, 70%, 70%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="475" y1="120" x2="475" y2="135" stroke="hsl(199, 70%, 70%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="115" y1="190" x2="210" y2="190" stroke="hsl(199, 70%, 70%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <line x1="295" y1="190" x2="390" y2="190" stroke="hsl(199, 70%, 70%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path
          d="M 475 70 L 475 110 L 115 125 L 115 140"
          fill="none"
          stroke="hsl(199, 92%, 56%)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.85"
        />
        <text x="280" y="252" textAnchor="middle" fill="hsl(220, 9%, 45%)" fontSize="10">
          FortisFlow: bronze → silver → gold, contracts in dbt and at the API boundary
        </text>
      </svg>
    </div>
  );
}
