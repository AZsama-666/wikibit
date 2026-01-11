import type { RiskEvent } from "@/data/types";
import { formatDate } from "@/lib/format";
import { Shield, AlertTriangle, XCircle, Clock, CheckCircle } from "lucide-react";
import { ExternalLink } from "lucide-react";

interface LedgerTimelineProps {
  events: RiskEvent[];
}

const severityConfig = {
  S1: { color: "bg-blue-100 text-blue-700 border-blue-300", label: "S1 轻微" },
  S2: { color: "bg-green-100 text-green-700 border-green-300", label: "S2 低" },
  S3: { color: "bg-yellow-100 text-yellow-700 border-yellow-300", label: "S3 中" },
  S4: { color: "bg-orange-100 text-orange-700 border-orange-300", label: "S4 高" },
  S5: { color: "bg-red-100 text-red-700 border-red-300", label: "S5 严重" },
};

const statusConfig = {
  Ongoing: { icon: Clock, color: "text-orange-600", label: "进行中" },
  Resolved: { icon: CheckCircle, color: "text-green-600", label: "已解决" },
  Disputed: { icon: XCircle, color: "text-red-600", label: "有争议" },
};

const categoryConfig = {
  Security: { icon: Shield, label: "安全" },
  Withdrawal: { icon: AlertTriangle, label: "提币" },
  Compliance: { icon: Shield, label: "合规" },
  Outage: { icon: Clock, label: "服务中断" },
  DataIntegrity: { icon: XCircle, label: "数据完整性" },
};

export default function LedgerTimeline({ events }: LedgerTimelineProps) {
  // 按日期倒序排序
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>暂无风险事件记录</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedEvents.map((event, index) => {
        const severity = severityConfig[event.severity];
        const status = statusConfig[event.status];
        const category = categoryConfig[event.category];
        const StatusIcon = status.icon;
        const CategoryIcon = category.icon;

        return (
          <div key={event.id} className="relative pl-8 border-l-2 border-gray-200 pb-8">
            {/* 时间点 */}
            <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-gray-400 border-2 border-white" />

            {/* 事件卡片 */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              {/* 头部：标题和时间 */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CategoryIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatDate(event.startDate)}</span>
                    {event.endDate && <span>至 {formatDate(event.endDate)}</span>}
                    {!event.endDate && event.status === "Ongoing" && (
                      <span className="text-orange-600">进行中</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 标签：严重程度和状态 */}
              <div className="flex items-center space-x-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${severity.color}`}
                >
                  {severity.label}
                </span>
                <span
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border bg-gray-50 ${status.color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  <span>{status.label}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                  {category.label}
                </span>
              </div>

              {/* 影响说明 */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{event.impactNote}</p>
              </div>

              {/* 证据链接 */}
              {event.evidence && event.evidence.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">证据链接</h4>
                  <div className="space-y-2">
                    {event.evidence.map((ev, idx) => (
                      <a
                        key={idx}
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>
                          {ev.sourceName} ({ev.level}级)
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
