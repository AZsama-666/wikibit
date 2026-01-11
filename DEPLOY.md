# 部署指南 - Wiki Risk Portal

## 部署到 www.up9.life

由于 www.up9.life 是新域名，有以下几种部署方案：

### 方案1：使用Vercel部署（推荐）

Vercel 是 Next.js 官方推荐的部署平台，配置简单且性能优秀。

#### 步骤：

1. **安装 Vercel CLI**（如果还没有）
   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```
   首次部署会提示：
   - 是否关联现有项目？选择 N（新建项目）
   - 项目名称：输入 `wiki-risk-portal` 或你想要的名称
   - 目录：直接回车（当前目录）
   - 是否覆盖设置：直接回车

4. **配置自定义域名**
   - 访问 https://vercel.com/dashboard
   - 选择你的项目
   - 进入 Settings → Domains
   - 添加域名：`www.up9.life` 或 `wiki.up9.one`（如果使用子域名）
   - 按照提示配置DNS记录

#### DNS配置：
如果使用 `www.up9.life` 作为主域名，需要在域名DNS设置中添加：
- 类型：CNAME
- 名称：www
- 值：cname.vercel-dns.com

如果使用子域名（如 `wiki.up9.one`）：
- 类型：CNAME
- 名称：wiki
- 值：cname.vercel-dns.com

### 方案2：使用子路径部署

如果 www.up9.life 上已有其他项目，可以使用子路径（如 `/wiki`）部署。

需要修改 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/wiki',  // 添加这行
  assetPrefix: '/wiki',  // 添加这行（如果需要）
}

module.exports = nextConfig
```

然后部署到 Vercel，访问地址将是：`www.up9.life/wiki`

### 方案3：使用其他部署平台

#### Netlify
1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`.next`
4. 在 Netlify 设置中配置自定义域名

#### Railway
1. 连接 GitHub 仓库
2. Railway 会自动检测 Next.js 项目
3. 配置自定义域名

## 快速部署命令（Vercel）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署到生产环境
vercel --prod

# 4. 配置域名（在 Vercel Dashboard 中完成）
```

## 注意事项

1. **环境变量**：如果未来需要添加环境变量，在 Vercel Dashboard → Settings → Environment Variables 中配置

2. **构建优化**：项目已经优化，构建成功，可以直接部署

3. **域名冲突**：如果 www.up9.life 已被其他项目使用，建议：
   - 使用子域名（wiki.up9.one）
   - 或使用子路径（www.up9.life/wiki）
   - 或联系我讨论替换现有项目的方案

## 当前项目状态

✅ 构建成功
✅ 所有功能完整
✅ 无构建错误
✅ 可立即部署
