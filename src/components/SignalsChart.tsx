"use client";

import type { RiskPoint } from "@/data/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDateShort } from "@/lib/format";

interface SignalsChartProps {
  riskSeries: RiskPoint[];
}

export default function SignalsChart({ riskSeries }: SignalsChartProps) {
  // 格式化数据供图表使用
  const chartData = riskSeries.map((point) => ({
    date: formatDateShort(point.date),
    score: Math.round(point.score * 10) / 10, // 保留1位小数
    fullDate: point.date,
  }));

  // 检测风险信号
  const getSignals = () => {
    const signals: string[] = [];
    const scores = riskSeries.map((p) => p.score);
    
    // 检测上升趋势（最近7天 vs 之前7天）
    if (scores.length >= 14) {
      const recent7 = scores.slice(-7);
      const previous7 = scores.slice(-14, -7);
      const recentAvg = recent7.reduce((a, b) => a + b, 0) / 7;
      const previousAvg = previous7.reduce((a, b) => a + b, 0) / 7;
      if (recentAvg > previousAvg + 5) {
        signals.push("⚠️ 风险评分上升趋势：最近7天平均分较之前7天上升超过5分");
      }
    }

    // 检测高波动
    if (scores.length >= 7) {
      const recent = scores.slice(-7);
      const avg = recent.reduce((a, b) => a + b, 0) / 7;
      const variance = recent.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / 7;
      if (variance > 25) {
        signals.push("⚠️ 高风险波动：最近7天风险评分波动较大");
      }
    }

    // 检测高分值
    const maxScore = Math.max(...scores);
    if (maxScore > 70) {
      signals.push("🔴 高风险警告：风险评分曾超过70分");
    } else if (maxScore > 50) {
      signals.push("🟡 中等风险：风险评分曾超过50分");
    }

    // 检测持续高分
    const recent10 = scores.slice(-10);
    const highCount = recent10.filter((s) => s > 60).length;
    if (highCount >= 5) {
      signals.push("⚠️ 持续高风险：最近10天中有5天以上风险评分超过60分");
    }

    return signals.length > 0 ? signals : ["✅ 无异常风险信号"];
  };

  const signals = getSignals();

  return (
    <div className="space-y-6">
      {/* 图表 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">30天风险曲线</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: "#6b7280" }}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tick={{ fill: "#6b7280" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#374151", fontWeight: 600 }}
              formatter={(value: number) => [`风险评分: ${value}`, ""]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 触发的信号解释 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">触发的风险信号</h3>
        <div className="space-y-2">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-gray-700 whitespace-pre-line">{signal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
