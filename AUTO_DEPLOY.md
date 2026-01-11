# 自动部署说明

## 我能够自动完成的部分 ✅

1. ✅ **代码推送** - 已完成，代码已推送到GitHub
2. ✅ **创建配置文件** - 已完成（CNAME文件等）
3. ⚠️ **启用GitHub Pages** - 可以尝试，但需要你的GitHub Token

## 我无法自动完成的部分 ❌

以下操作需要你在网页界面手动完成（因为需要你的账号权限）：

1. ❌ **启用GitHub Pages** - 需要在GitHub网页设置中操作
2. ❌ **配置DNS记录** - 需要在域名提供商的网页界面操作
3. ❌ **添加自定义域名** - 需要在GitHub网页设置中操作

## 方案1：使用脚本自动启用Pages（需要Token）

如果你想尝试自动化，可以：

### 步骤1：创建GitHub Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 给token起个名字，比如 "Pages Deploy"
4. 选择权限：
   - ✅ `repo` (Full control of private repositories)
5. 点击 "Generate token"
6. **重要**：复制token（只显示一次！）

### 步骤2：运行自动化脚本

在PowerShell中运行：

```powershell
.\deploy.ps1 -GitHubToken YOUR_TOKEN_HERE
```

**注意**：脚本会尝试通过GitHub API启用Pages，但DNS配置和自定义域名添加仍需要手动操作。

## 方案2：手动操作（推荐，更简单）

手动操作实际上只需要2-3分钟，而且更安全：

### 步骤1：启用GitHub Pages（1分钟）

1. 访问：https://github.com/AZsama-666/wikibit/settings/pages
2. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
3. 点击 "Save"
4. 等待1-2分钟

### 步骤2：配置DNS（在域名提供商，2分钟）

在你的域名DNS提供商（如Cloudflare、Namecheap等）添加：

**CNAME记录**
```
类型：CNAME
名称：www
值：azsama-666.github.io
TTL：3600
```

### 步骤3：添加自定义域名（1分钟）

1. 再次访问：https://github.com/AZsama-666/wikibit/settings/pages
2. 在 "Custom domain" 输入：`www.up9.life`
3. 点击 "Save"

## 方案3：使用其他平台（完全自动化）

如果你想完全自动化，可以考虑：

### Vercel（推荐）

1. 访问：https://vercel.com
2. 使用GitHub账号登录
3. 点击 "Add New Project"
4. 导入 `wikibit` 仓库
5. 部署设置：
   - Framework Preset: Other
   - Root Directory: ./
6. 点击 Deploy
7. 部署后，在项目设置中添加自定义域名

### Netlify

1. 访问：https://app.netlify.com
2. 使用GitHub账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 `wikibit` 仓库
5. 构建设置：
   - Build command: （留空）
   - Publish directory: .
6. 点击 "Deploy site"
7. 在站点设置中添加自定义域名

## 推荐方案

**推荐使用方案2（手动操作）**，因为：
- ✅ 更安全（不需要token）
- ✅ 更快速（只需要2-3分钟）
- ✅ 更可靠（直接在官方界面操作）
- ✅ 可以立即看到结果

如果你想要完全自动化，推荐使用 **Vercel**，因为它对GitHub集成支持最好，而且配置最简单。
