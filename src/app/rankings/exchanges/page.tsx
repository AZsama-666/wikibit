"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { exchanges } from "@/data/demo";
import RiskTemperature from "@/components/RiskTemperature";
import ProofBadges from "@/components/ProofBadges";
import { formatUSD, formatScore } from "@/lib/format";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter, Download, Share2, X } from "lucide-react";
import type { PorStatus, ExchangeType } from "@/data/types";

type SortField = "totalScore" | "riskScore" | "majorIncidents90d" | "liquidityScore" | "volume24hUsd";
type SortOrder = "asc" | "desc";

export default function RankingsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 从URL读取状态
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(
    searchParams.get("jurisdictions")?.split(",").filter(Boolean) || []
  );
  const [selectedPorStatus, setSelectedPorStatus] = useState<PorStatus[]>(
    (searchParams.get("porStatus")?.split(",") as PorStatus[]) || []
  );
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>(
    searchParams.get("incidents")?.split(",").filter(Boolean) || []
  );
  const [riskRange, setRiskRange] = useState<[number, number]>([
    parseInt(searchParams.get("riskMin") || "0"),
    parseInt(searchParams.get("riskMax") || "100"),
  ]);
  const [selectedType, setSelectedType] = useState<ExchangeType[]>(
    (searchParams.get("type")?.split(",") as ExchangeType[]) || []
  );
  const [sortField, setSortField] = useState<SortField>(
    (searchParams.get("sort") as SortField) || "totalScore"
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get("order") as SortOrder) || "desc"
  );
  const [showFilters, setShowFilters] = useState(false);

  // 更新URL参数
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedJurisdictions.length > 0) params.set("jurisdictions", selectedJurisdictions.join(","));
    if (selectedPorStatus.length > 0) params.set("porStatus", selectedPorStatus.join(","));
    if (selectedIncidents.length > 0) params.set("incidents", selectedIncidents.join(","));
    if (riskRange[0] !== 0) params.set("riskMin", riskRange[0].toString());
    if (riskRange[1] !== 100) params.set("riskMax", riskRange[1].toString());
    if (selectedType.length > 0) params.set("type", selectedType.join(","));
    if (sortField !== "totalScore") params.set("sort", sortField);
    if (sortOrder !== "desc") params.set("order", sortOrder);
    
    router.replace(`/rankings/exchanges?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedJurisdictions, selectedPorStatus, selectedIncidents, riskRange, selectedType, sortField, sortOrder, router]);

  // 筛选和搜索
  const filteredExchanges = useMemo(() => {
    return exchanges.filter((exchange) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = exchange.name.toLowerCase().includes(query);
        const matchesCnName = exchange.cnName.toLowerCase().includes(query);
        const matchesAliases = exchange.aliases.some((alias) => alias.toLowerCase().includes(query));
        const matchesTags = exchange.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesCnName && !matchesAliases && !matchesTags) {
          return false;
        }
      }

      // 地区过滤
      if (selectedJurisdictions.length > 0) {
        const hasMatchingJurisdiction = exchange.jurisdictions.some((j) =>
          selectedJurisdictions.includes(j)
        );
        if (!hasMatchingJurisdiction) return false;
      }

      // PoR状态过滤
      if (selectedPorStatus.length > 0) {
        if (!selectedPorStatus.includes(exchange.porStatus)) return false;
      }

      // 近90天事件过滤
      if (selectedIncidents.length > 0) {
        let matches = false;
        if (selectedIncidents.includes("0") && exchange.majorIncidents90d === 0) matches = true;
        if (selectedIncidents.includes("1-2") && exchange.majorIncidents90d >= 1 && exchange.majorIncidents90d <= 2) matches = true;
        if (selectedIncidents.includes("3+") && exchange.majorIncidents90d >= 3) matches = true;
        if (!matches) return false;
      }

      // 风险温度范围过滤
      if (exchange.riskScore < riskRange[0] || exchange.riskScore > riskRange[1]) {
        return false;
      }

      // 类型过滤
      if (selectedType.length > 0) {
        if (!selectedType.includes(exchange.type)) return false;
      }

      return true;
    });
  }, [searchQuery, selectedJurisdictions, selectedPorStatus, selectedIncidents, riskRange, selectedType]);

  // 排序
  const sortedExchanges = useMemo(() => {
    const sorted = [...filteredExchanges];
    sorted.sort((a, b) => {
      let aValue: number;
      let bValue: number;
      
      switch (sortField) {
        case "totalScore":
          aValue = a.totalScore;
          bValue = b.totalScore;
          break;
        case "riskScore":
          aValue = a.riskScore;
          bValue = b.riskScore;
          break;
        case "majorIncidents90d":
          aValue = a.majorIncidents90d;
          bValue = b.majorIncidents90d;
          break;
        case "liquidityScore":
          aValue = a.liquidityScore;
          bValue = b.liquidityScore;
          break;
        case "volume24hUsd":
          aValue = a.volume24hUsd;
          bValue = b.volume24hUsd;
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
    return sorted;
  }, [filteredExchanges, sortField, sortOrder]);

  // 切换排序
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // 导出CSV
  const handleExportCSV = () => {
    const headers = ["排名", "交易所", "总分", "风险温度", "PoR状态", "90天事件", "流动性", "24H成交量"];
    const rows = sortedExchanges.map((exchange, index) => [
      index + 1,
      exchange.name,
      exchange.totalScore.toFixed(1),
      exchange.riskScore.toFixed(1),
      exchange.porStatus,
      exchange.majorIncidents90d,
      exchange.liquidityScore,
      formatUSD(exchange.volume24hUsd),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `交易所排名_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // 复制分享链接
  const handleShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("分享链接已复制到剪贴板！");
    } catch (err) {
      alert("复制失败，请手动复制URL");
    }
  };

  const allJurisdictions = Array.from(new Set(exchanges.flatMap((e) => e.jurisdictions)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题和操作按钮 */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              交易所综合榜（Risk-first Quality Rank）
            </h1>
            <p className="text-gray-600">不是谁最大，而是谁更透明、更稳、更可验证。</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareLink}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>分享链接</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>导出CSV</span>
            </button>
          </div>
        </div>

        {/* 搜索和筛选栏 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="搜索交易所名称、别名或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>筛选</span>
            </button>
          </div>

          {/* 筛选面板 */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-4 space-y-4">
              {/* 地区/司法辖区 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">地区/司法辖区</label>
                <div className="flex flex-wrap gap-2">
                  {allJurisdictions.map((jurisdiction) => (
                    <button
                      key={jurisdiction}
                      onClick={() => {
                        setSelectedJurisdictions((prev) =>
                          prev.includes(jurisdiction)
                            ? prev.filter((j) => j !== jurisdiction)
                            : [...prev, jurisdiction]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedJurisdictions.includes(jurisdiction)
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {jurisdiction}
                    </button>
                  ))}
                </div>
              </div>

              {/* PoR状态 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PoR状态</label>
                <div className="flex flex-wrap gap-2">
                  {(["verified", "partial", "none", "expired"] as PorStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedPorStatus((prev) =>
                          prev.includes(status)
                            ? prev.filter((s) => s !== status)
                            : [...prev, status]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedPorStatus.includes(status)
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {status === "verified" ? "已验证" : status === "partial" ? "部分披露" : status === "none" ? "无" : "已过期"}
                    </button>
                  ))}
                </div>
              </div>

              {/* 近90天重大事件 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">近90天重大事件</label>
                <div className="flex flex-wrap gap-2">
                  {["0", "1-2", "3+"].map((incident) => (
                    <button
                      key={incident}
                      onClick={() => {
                        setSelectedIncidents((prev) =>
                          prev.includes(incident)
                            ? prev.filter((i) => i !== incident)
                            : [...prev, incident]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedIncidents.includes(incident)
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {incident === "0" ? "0次" : incident === "1-2" ? "1-2次" : "3次及以上"}
                    </button>
                  ))}
                </div>
              </div>

              {/* 风险温度范围 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  风险温度范围: {riskRange[0]} - {riskRange[1]}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskRange[0]}
                    onChange={(e) => setRiskRange([parseInt(e.target.value), riskRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskRange[1]}
                    onChange={(e) => setRiskRange([riskRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* 类型 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">类型</label>
                <div className="flex flex-wrap gap-2">
                  {(["CEX", "DEX"] as ExchangeType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType((prev) =>
                          prev.includes(type)
                            ? prev.filter((t) => t !== type)
                            : [...prev, type]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                        selectedType.includes(type)
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* 清除筛选 */}
              {(selectedJurisdictions.length > 0 ||
                selectedPorStatus.length > 0 ||
                selectedIncidents.length > 0 ||
                riskRange[0] !== 0 ||
                riskRange[1] !== 100 ||
                selectedType.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedJurisdictions([]);
                    setSelectedPorStatus([]);
                    setSelectedIncidents([]);
                    setRiskRange([0, 100]);
                    setSelectedType([]);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>清除所有筛选</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 结果统计 */}
        <div className="mb-4 text-sm text-gray-600">
          显示 {sortedExchanges.length} / {exchanges.length} 个交易所
        </div>

        {/* 榜单表格 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    排名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易所
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("totalScore")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>总分</span>
                      {sortField === "totalScore" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("riskScore")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>风险温度</span>
                      {sortField === "riskScore" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Proof
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("majorIncidents90d")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>90天事件</span>
                      {sortField === "majorIncidents90d" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("liquidityScore")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>流动性</span>
                      {sortField === "liquidityScore" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("volume24hUsd")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>24H成交量</span>
                      {sortField === "volume24hUsd" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedExchanges.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
                      没有找到匹配的交易所
                    </td>
                  </tr>
                ) : (
                  sortedExchanges.map((exchange, index) => (
                    <tr key={exchange.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-xs font-medium text-blue-600">
                              {exchange.name.substring(0, 1)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {exchange.name}
                            </div>
                            <div className="text-xs text-gray-500">{exchange.cnName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {formatScore(exchange.totalScore)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-48">
                          <RiskTemperature riskScore={exchange.riskScore} />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ProofBadges porStatus={exchange.porStatus} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {exchange.majorIncidents90d}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {exchange.liquidityScore}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatUSD(exchange.volume24hUsd)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/exchanges/${exchange.slug}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          查看
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
