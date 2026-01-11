import Link from "next/link";
import { ArrowRight, Shield, BookOpen, Activity } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Web3 实体排名，从规模转向可验证的风险与质量
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Proof（可验证） / Ledger（可追溯） / Signals（可预警）
          </p>
          <Link
            href="/rankings/exchanges"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            查看交易所榜单
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* 今日风险速览 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">今日风险速览</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">活跃风险事件</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">待验证交易所</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">已验证 Proof</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
        </div>

        {/* 核心功能说明 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Shield className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Proof（可验证）</h3>
            <p className="text-gray-600">
              每项证据都有来源、快照日期和可信度等级，确保信息可追溯、可验证。
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <BookOpen className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ledger（风险账本）</h3>
            <p className="text-gray-600">
              完整记录所有风险事件，按严重程度分类，支持时间线追溯和证据链接。
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Activity className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Signals（风险预警）</h3>
            <p className="text-gray-600">
              基于30天风险曲线，识别异常趋势和潜在风险信号，提前预警。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
