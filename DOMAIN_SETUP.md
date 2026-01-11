# 域名配置指南 - www.up9.life

## 当前状态

✅ 代码已推送到GitHub: https://github.com/AZsama-666/wikibit

## 部署方案选择

由于项目包含静态HTML文件（index.html），有以下几种部署方案：

### 方案1：GitHub Pages（推荐，最简单）

#### 步骤：

1. **启用GitHub Pages**
   - 访问：https://github.com/AZsama-666/wikibit/settings/pages
   - Source：选择 `main` 分支
   - Folder：选择 `/ (root)`
   - 点击 Save

2. **默认访问地址**
   - GitHub Pages会提供一个地址：`https://azsama-666.github.io/wikibit/`
   - 或者如果设置了自定义域名：`https://www.up9.life`

3. **配置自定义域名 www.up9.life**
   - 在仓库根目录创建 `CNAME` 文件（已创建）
   - 在域名DNS提供商（如Cloudflare, Namecheap等）添加DNS记录：
     - 类型：CNAME
     - 名称：www
     - 值：azsama-666.github.io
     - TTL：3600（或默认）
   
   - 或者使用A记录（如果CNAME不支持）：
     - 类型：A
     - 名称：www
     - 值：185.199.108.153
     - 值：185.199.109.153
     - 值：185.199.110.153
     - 值：185.199.111.153

4. **等待DNS传播**
   - 通常需要几分钟到几小时
   - 可以用 https://dnschecker.org 检查DNS传播状态

### 方案2：Vercel部署（适合静态文件）

#### 步骤：

1. **安装Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   vercel --prod
   ```
   选择：
   - Link to existing project? No
   - Project name: wikibit
   - Directory: ./
   - Override settings: No

4. **配置域名**
   - 访问：https://vercel.com/dashboard
   - 选择项目 → Settings → Domains
   - 添加域名：`www.up9.life`
   - 按照提示配置DNS记录（CNAME到cname.vercel-dns.com）

### 方案3：Netlify部署

#### 步骤：

1. **访问Netlify**
   - 登录 https://app.netlify.com
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub，授权访问 wikibit 仓库

2. **配置构建**
   - Build command: （留空，因为是静态文件）
   - Publish directory: `.` 或 `/`

3. **配置域名**
   - Site settings → Domain management
   - Add custom domain: `www.up9.life`
   - 按照提示配置DNS记录

## DNS配置详细说明

### 对于 www.up9.life

如果使用GitHub Pages：

**选项A：CNAME记录（推荐）**
```
类型：CNAME
名称：www
值：azsama-666.github.io
TTL：3600
```

**选项B：A记录（如果CNAME不支持）**
```
类型：A
名称：www
值：185.199.108.153
值：185.199.109.153
值：185.199.110.153
值：185.199.111.153
TTL：3600
```

如果使用Vercel：
```
类型：CNAME
名称：www
值：cname.vercel-dns.com
TTL：3600
```

如果使用Netlify：
```
类型：CNAME
名称：www
值：your-site.netlify.app
TTL：3600
```

## 验证部署

部署完成后，可以通过以下方式验证：

1. **检查GitHub Pages状态**
   - https://github.com/AZsama-666/wikibit/settings/pages
   - 查看是否显示 "Your site is published at..."

2. **测试访问**
   - 访问：https://azsama-666.github.io/wikibit/
   - 或：https://www.up9.life（配置DNS后）

3. **检查DNS解析**
   - 使用：https://dnschecker.org
   - 输入：www.up9.life
   - 查看是否解析到正确的IP

## 注意事项

1. **静态文件路径**
   - index.html 在根目录，可以直接访问
   - 如果有其他HTML文件，确保路径正确

2. **HTTPS证书**
   - GitHub Pages、Vercel、Netlify都自动提供SSL证书
   - 无需手动配置

3. **缓存问题**
   - 如果更新后看不到变化，尝试清除浏览器缓存
   - 或使用无痕模式访问

4. **域名解析时间**
   - DNS更改可能需要几分钟到48小时生效
   - 通常在几分钟内生效

## 快速开始（GitHub Pages）

1. 访问：https://github.com/AZsama-666/wikibit/settings/pages
2. Source选择：`main` 分支，`/ (root)` 文件夹
3. 点击 Save
4. 等待部署完成（1-2分钟）
5. 访问提供的GitHub Pages地址测试
6. 配置DNS记录指向GitHub Pages
7. 等待DNS生效后访问 www.up9.life
