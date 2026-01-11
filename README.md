# Wiki Risk Portal - Vision Demo

Web3 实体排名门户，从规模转向可验证的风险与质量。

## 功能特性

- ✅ **Risk-first 门户**：Proof（可验证）、Ledger（风险事件账本）、Signals（风险预警信号）
- ✅ **10个交易所完整数据**：每个交易所包含Proof、Ledger事件、30天风险曲线
- ✅ **强大的查询体验**：全局搜索 + 结构化筛选（facet）+ 多列排序
- ✅ **URL状态同步**：筛选条件保存在URL中，支持分享链接
- ✅ **数据导出**：支持导出CSV格式
- ✅ **详情页完整展示**：5个Tab（概览、Proof、Ledger、Signals、方法论）

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **图标**: lucide-react
- **图表**: recharts

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
src/
├── app/                    # Next.js App Router页面
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 全局布局
│   ├── rankings/          # 榜单页
│   └── exchanges/         # 详情页
├── components/            # React组件
│   ├── RiskTemperature.tsx
│   ├── ProofBadges.tsx
│   ├── LedgerTimeline.tsx
│   ├── SignalsChart.tsx
│   └── Navbar.tsx
├── data/                  # Mock数据
│   ├── types.ts          # 类型定义
│   └── demo.ts           # 演示数据
└── lib/                   # 工具函数
    └── format.ts         # 格式化函数
```

## 页面说明

### 首页 (`/`)
- 门户入口展示
- 今日风险速览
- 核心功能说明（Proof/Ledger/Signals）

### 交易所榜单 (`/rankings/exchanges`)
- 完整交易所列表
- 全局搜索（支持名称、别名、标签）
- 多维度筛选（地区、PoR状态、事件数、风险温度、类型）
- 多列排序（总分、风险温度、事件数、流动性、成交量）
- URL Query Params同步
- CSV导出功能
- 分享链接功能

### 交易所详情 (`/exchanges/[slug]`)
- Hero区域（总分、风险温度、关键指标）
- 5个Tab内容：
  - **概览**：关键指标、优势、关注点
  - **Proof**：可验证证据列表
  - **Ledger**：风险事件时间线
  - **Signals**：30天风险曲线 + 预警信号
  - **方法论**：评分公式和结构说明

## 数据说明

所有数据为本地mock数据，包含：
- 10个交易所的完整信息
- 每个交易所至少3条Proof记录
- 每个交易所至少5条Ledger风险事件
- 每个交易所30天风险曲线数据

## License

Private
