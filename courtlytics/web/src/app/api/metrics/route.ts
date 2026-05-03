import { NextResponse } from "next/server";
import { mockPipelineMetrics } from "@/lib/mockPipelineMetrics";

export async function GET() {
  return NextResponse.json({
    ...mockPipelineMetrics,
    generatedAt: new Date().toISOString(),
  });
}
