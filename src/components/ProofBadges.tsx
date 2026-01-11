import type { PorStatus } from "@/data/types";
import { CheckCircle2, AlertCircle, XCircle, Clock } from "lucide-react";

interface ProofBadgesProps {
  porStatus: PorStatus;
  showLabel?: boolean;
}

export default function ProofBadges({ porStatus, showLabel = true }: ProofBadgesProps) {
  const getStatusConfig = (status: PorStatus) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle2,
          label: "已验证",
          color: "bg-green-100 text-green-700 border-green-300",
          iconColor: "text-green-600",
        };
      case "partial":
        return {
          icon: AlertCircle,
          label: "部分披露",
          color: "bg-yellow-100 text-yellow-700 border-yellow-300",
          iconColor: "text-yellow-600",
        };
      case "expired":
        return {
          icon: Clock,
          label: "已过期",
          color: "bg-orange-100 text-orange-700 border-orange-300",
          iconColor: "text-orange-600",
        };
      case "none":
        return {
          icon: XCircle,
          label: "无",
          color: "bg-red-100 text-red-700 border-red-300",
          iconColor: "text-red-600",
        };
    }
  };

  const config = getStatusConfig(porStatus);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${config.color}`}
    >
      <Icon className={`h-3.5 w-3.5 ${config.iconColor}`} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
