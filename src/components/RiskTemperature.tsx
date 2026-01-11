interface RiskTemperatureProps {
  riskScore: number; // 0-100
}

export default function RiskTemperature({ riskScore }: RiskTemperatureProps) {
  // 根据风险分数确定等级和颜色
  const getRiskLevel = (score: number) => {
    if (score < 30) return { level: "低", color: "bg-green-500", textColor: "text-green-700", bgColor: "bg-green-100" };
    if (score < 60) return { level: "中", color: "bg-yellow-500", textColor: "text-yellow-700", bgColor: "bg-yellow-100" };
    return { level: "高", color: "bg-red-500", textColor: "text-red-700", bgColor: "bg-red-100" };
  };

  const { level, color, textColor, bgColor } = getRiskLevel(riskScore);

  return (
    <div className="flex items-center space-x-2">
      {/* 温度计进度条 */}
      <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 rounded-full flex items-center justify-end pr-2`}
          style={{ width: `${Math.min(riskScore, 100)}%` }}
        >
          {riskScore > 15 && (
            <span className="text-xs font-medium text-white">{Math.round(riskScore)}</span>
          )}
        </div>
      </div>
      {/* 等级标签 */}
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} min-w-[3rem] text-center`}>
        {level}
      </span>
    </div>
  );
}
