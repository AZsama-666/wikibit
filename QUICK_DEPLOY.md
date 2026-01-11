# 快速部署指南

## 🎯 最简单的方式（推荐）

由于部分操作需要在网页界面完成，我无法完全自动部署。但手动操作只需要**2-3分钟**！

## 3步完成部署

### 步骤1：启用GitHub Pages（1分钟）

访问：**https://github.com/AZsama-666/wikibit/settings/pages**

1. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
2. 点击 "Save"
3. 等待1-2分钟，看到 "Your site is published at..."

### 步骤2：配置DNS（在你的域名提供商，1分钟）

在域名DNS设置中添加：

```
类型：CNAME
名称：www
值：azsama-666.github.io
TTL：3600
```

### 步骤3：添加自定义域名（1分钟）

访问：**https://github.com/AZsama-666/wikibit/settings/pages**

1. 在 "Custom domain" 输入：`www.up9.life`
2. 点击 "Save"
3. 等待DNS生效（通常几分钟）

## ✅ 完成！

访问：**https://www.up9.life**

---

## 🤖 如果想尝试自动化

我创建了一个脚本 `deploy.ps1`，但需要GitHub Token：

1. 创建Token：https://github.com/settings/tokens
2. 运行：`.\deploy.ps1 -GitHubToken YOUR_TOKEN`

**但DNS配置仍需要手动操作。**

## 📝 总结

- ✅ 代码已推送：已完成
- ✅ 配置文件已创建：已完成  
- ⚠️ GitHub Pages启用：需要你操作（1分钟）
- ⚠️ DNS配置：需要你操作（1分钟）
- ⚠️ 自定义域名：需要你操作（1分钟）

总共只需要**3分钟手动操作**！
