export type PorStatus = "verified" | "partial" | "none" | "expired";
export type ExchangeType = "CEX" | "DEX";

export type Exchange = {
  id: string;
  slug: string;
  name: string;
  cnName: string;
  aliases: string[];
  type: ExchangeType;
  jurisdictions: string[]; // e.g. ["Global", "EU"]
  totalScore: number; // 0-100
  riskScore: number;  // 0-100
  porStatus: PorStatus;
  liquidityScore: number; // 0-100
  volume24hUsd: number; // raw number
  majorIncidents90d: number; // integer
  tags: string[];
  highlights: {
    oneLiner: string; // e.g. "高流动性，但近90天出现2次提币异常"
    strengths: string[];
    concerns: string[];
  };
  proof: {
    title: string;
    level: "A" | "B" | "C";
    snapshotDate: string; // ISO date
    sourceName: string;
    sourceUrl: string;
    note: string;
  }[];
};

export type RiskEvent = {
  id: string;
  exchangeSlug: string;
  category: "Security" | "Withdrawal" | "Compliance" | "Outage" | "DataIntegrity";
  severity: "S1" | "S2" | "S3" | "S4" | "S5";
  status: "Ongoing" | "Resolved" | "Disputed";
  startDate: string; // ISO
  endDate?: string;  // ISO
  title: string;
  impactNote: string;
  evidence: { sourceName: string; url: string; capturedAt: string; level: "A" | "B" | "C" }[];
};

export type RiskPoint = { date: string; score: number };
