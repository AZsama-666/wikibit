"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { exchanges, riskEventsByExchange, riskSeriesByExchange } from "@/data/demo";
import RiskTemperature from "@/components/RiskTemperature";
import ProofBadges from "@/components/ProofBadges";
import LedgerTimeline from "@/components/LedgerTimeline";
import SignalsChart from "@/components/SignalsChart";
import { formatUSD, formatScore, formatDate } from "@/lib/format";
import { ExternalLink, CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ExchangeDetailPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const exchange = exchanges.find((e) => e.slug === params.slug);

  if (!exchange) {
    notFound();
  }

  const events = riskEventsByExchange[exchange.slug] || [];
  const riskSeries = riskSeriesByExchange[exchange.slug] || [];

  // 计算评分结构（mock数据，按照文档要求的公式）
  const baseQuality = Math.round(exchange.totalScore * 0.9);
  const riskPenalty = exchange.riskScore / 100;
  const proofBonus = exchange.porStatus === "verified" ? 12 : exchange.porStatus === "partial" ? 6 : 0;
  const calculatedTotal = Math.round(baseQuality * (1 - riskPenalty) + proofBonus);

  const tabs = [
    { id: "overview", label: "概览" },
    { id: "proof", label: "Proof" },
    { id: "ledger", label: "Ledger" },
    { id: "signals", label: "Signals" },
    { id: "method", label: "方法论" },
  ];

  const getLevelColor = (level: "A" | "B" | "C") => {
    switch (level) {
      case "A":
        return "bg-green-100 text-green-700 border-green-300";
      case "B":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "C":
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{exchange.name}</h1>
              <p className="text-gray-600">{exchange.cnName}</p>
              {exchange.aliases.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  别名: {exchange.aliases.join(", ")}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {formatScore(exchange.totalScore)}
              </div>
              <div className="text-sm text-gray-500">总分</div>
            </div>
          </div>

          {/* 风险温度计 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">风险温度</span>
              <span className="text-2xl font-bold text-gray-900">{exchange.riskScore}</span>
            </div>
            <RiskTemperature riskScore={exchange.riskScore} />
          </div>

          {/* 关键徽章 */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
            <div>
              <span className="text-xs text-gray-500 block mb-1">PoR状态</span>
              <ProofBadges porStatus={exchange.porStatus} />
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">近90天事件</span>
              <span className="text-lg font-semibold text-gray-900">
                {exchange.majorIncidents90d}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">流动性评分</span>
              <span className="text-lg font-semibold text-gray-900">
                {exchange.liquidityScore}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500 block mb-1">司法辖区</span>
              <span className="text-sm font-medium text-gray-700">
                {exchange.jurisdictions.join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* 概览 Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* 结论卡片 */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">结论</h3>
                  <p className="text-blue-800">{exchange.highlights.oneLiner}</p>
                </div>

                {/* 关键指标卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">24小时成交量</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatUSD(exchange.volume24hUsd)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">流动性评分</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {exchange.liquidityScore}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">交易所类型</div>
                    <div className="text-2xl font-bold text-gray-900">{exchange.type}</div>
                  </div>
                </div>

                {/* Strengths */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">优势</h3>
                  <ul className="space-y-2">
                    {exchange.highlights.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Concerns */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">关注点</h3>
                  <ul className="space-y-2">
                    {exchange.highlights.concerns.map((concern, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">⚠</span>
                        <span className="text-gray-700">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Proof Tab */}
            {activeTab === "proof" && (
              <div className="space-y-4">
                {exchange.proof.length > 0 ? (
                  exchange.proof.map((proof, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {proof.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <span>快照日期: {formatDate(proof.snapshotDate)}</span>
                            <span>来源: {proof.sourceName}</span>
                          </div>
                          <p className="text-gray-700">{proof.note}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(
                            proof.level
                          )}`}
                        >
                          可信度 {proof.level}
                        </span>
                      </div>
                      <a
                        href={proof.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <span>查看证据</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <XCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>暂无Proof记录</p>
                  </div>
                )}
              </div>
            )}

            {/* Ledger Tab */}
            {activeTab === "ledger" && <LedgerTimeline events={events} />}

            {/* Signals Tab */}
            {activeTab === "signals" && <SignalsChart riskSeries={riskSeries} />}

            {/* 方法论 Tab */}
            {activeTab === "method" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">评分公式</h3>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-4">
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Total Score = Base Quality × (1 - Risk Penalty) + Proof Bonus
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Base Quality（基础质量）</h4>
                      <p className="text-gray-700 mb-2">
                        评估交易所的基础质量，包括流动性、成交结构、稳定性和规模代理等因素。
                      </p>
                      <div className="text-2xl font-bold text-gray-900">{baseQuality}</div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Risk Penalty（风险惩罚）</h4>
                      <p className="text-gray-700 mb-2">
                        根据Ledger记录的严重程度和时间衰减，以及Signals显示的上升趋势计算。
                      </p>
                      <div className="text-2xl font-bold text-gray-900">
                        {riskPenalty.toFixed(2)} ({formatScore(riskPenalty * 100)}%)
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Proof Bonus（Proof奖励）</h4>
                      <p className="text-gray-700 mb-2">
                        根据PoR状态、审计情况和透明度维护情况给予奖励。
                      </p>
                      <div className="text-2xl font-bold text-green-600">+{proofBonus}</div>
                    </div>

                    <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-semibold text-gray-900 mb-2">Total Score（总分）</h4>
                      <div className="text-3xl font-bold text-gray-900">
                        {calculatedTotal} ≈ {formatScore(exchange.totalScore)}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {baseQuality} × (1 - {riskPenalty.toFixed(2)}) + {proofBonus} = {calculatedTotal}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">评分说明</h3>
                  <div className="space-y-3 text-gray-700">
                    <p>
                      • <strong>Base Quality</strong>：评估交易所的基础质量，主要考虑流动性（24小时成交量）、交易对丰富程度、系统稳定性等因素。
                    </p>
                    <p>
                      • <strong>Risk Penalty</strong>：基于风险事件账本（Ledger）和风险信号（Signals）计算。严重事件（S4/S5）惩罚更高，且根据时间衰减。Signals显示上升趋势也会增加惩罚。
                    </p>
                    <p>
                      • <strong>Proof Bonus</strong>：PoR状态为&ldquo;已验证&rdquo;（verified）给予最高奖励，部分披露（partial）给予中等奖励，无PoR（none）或已过期（expired）不给予奖励。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
