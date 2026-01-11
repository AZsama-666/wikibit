# 域名更改摘要

## ✅ 已完成的更改

域名已从 **www.up9.one** 更改为 **www.up9.life**

### 更新的文件：

1. ✅ `CNAME` - 域名配置文件
2. ✅ `DOMAIN_SETUP.md` - 域名设置指南
3. ✅ `DEPLOYMENT_STEPS.md` - 部署步骤
4. ✅ `QUICK_DEPLOY.md` - 快速部署指南
5. ✅ `AUTO_DEPLOY.md` - 自动部署说明
6. ✅ `GITHUB_PAGES_SETUP.md` - GitHub Pages 设置指南
7. ✅ `deploy.ps1` - 部署脚本
8. ✅ `DEPLOY.md` - 部署指南

## 📋 下一步操作

### 步骤1：启用GitHub Pages

访问：https://github.com/AZsama-666/wikibit/settings/pages

1. Source: 选择 `main` 分支
2. Folder: 选择 `/ (root)`
3. 点击 Save

### 步骤2：配置DNS（在域名提供商）

在你的域名DNS提供商（如Cloudflare、Namecheap等）添加：

**CNAME记录：**
```
类型：CNAME
名称：www
值：azsama-666.github.io
TTL：3600
```

**或者A记录（如果CNAME不支持）：**
```
类型：A
名称：www
值：185.199.108.153
值：185.199.109.153
值：185.199.110.153
值：185.199.111.153
```

### 步骤3：在GitHub中添加自定义域名

访问：https://github.com/AZsama-666/wikibit/settings/pages

1. 在 "Custom domain" 输入：`www.up9.life`
2. 点击 Save
3. 等待DNS生效（通常几分钟）

## ✅ 完成后访问

部署完成后，访问：**https://www.up9.life**
