# 部署步骤 - www.up9.one

## ✅ 已完成

1. ✅ 代码已推送到GitHub: https://github.com/AZsama-666/wikibit
2. ✅ 创建了GitHub Pages部署配置
3. ✅ 创建了CNAME文件（用于域名配置）

## 📋 接下来需要做的步骤

### 步骤1：启用GitHub Pages

1. 访问：https://github.com/AZsama-666/wikibit/settings/pages
2. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/ (root)`
3. 点击 "Save" 按钮
4. 等待1-2分钟，GitHub会自动构建并部署

### 步骤2：测试GitHub Pages

部署完成后，你会看到一个类似这样的地址：
- `https://azsama-666.github.io/wikibit/`

访问这个地址，确认网站可以正常显示。

### 步骤3：配置域名DNS

在你的域名DNS提供商（如Cloudflare、Namecheap、GoDaddy等）添加DNS记录：

**推荐：CNAME记录**
```
类型：CNAME
主机/名称：www
值/指向：azsama-666.github.io
TTL：3600（或自动）
```

**或者：A记录（如果CNAME不支持）**
```
类型：A
主机/名称：www
值/指向：185.199.108.153
值/指向：185.199.109.153
值/指向：185.199.110.153
值/指向：185.199.111.153
TTL：3600
```

### 步骤4：在GitHub中启用自定义域名

1. 访问：https://github.com/AZsama-666/wikibit/settings/pages
2. 在 "Custom domain" 部分：
   - 输入：`www.up9.one`
   - 点击 "Save"
3. GitHub会自动验证DNS配置

### 步骤5：等待DNS生效

- DNS更改通常需要几分钟到几小时生效
- 可以使用 https://dnschecker.org 检查DNS传播状态
- 输入 `www.up9.one` 查看是否解析到GitHub Pages的IP

### 步骤6：验证访问

DNS生效后：
- 访问：https://www.up9.one
- 确认网站正常显示
- GitHub会自动提供SSL证书（HTTPS）

## 🚀 快速命令（如果使用Git CLI）

```bash
# 如果需要更新代码
git add .
git commit -m "Your commit message"
git push origin main

# GitHub Pages会自动重新部署
```

## 📝 注意事项

1. **首次部署**：GitHub Pages可能需要几分钟来构建和部署
2. **DNS传播**：域名DNS更改可能需要几分钟到48小时，通常几分钟内生效
3. **SSL证书**：GitHub会自动为自定义域名配置SSL证书，可能需要几分钟
4. **文件路径**：确保index.html在根目录，访问路径正确

## 🔍 故障排查

如果遇到问题：

1. **GitHub Pages未部署**
   - 检查 Settings → Pages 是否有错误
   - 查看 Actions 标签页是否有构建错误

2. **域名无法访问**
   - 使用 https://dnschecker.org 检查DNS是否生效
   - 确认CNAME或A记录配置正确
   - 等待DNS传播（最多48小时）

3. **HTTPS证书问题**
   - GitHub会自动配置，等待几分钟
   - 确认DNS记录正确后，证书会自动生成

## 📞 需要帮助？

如果遇到任何问题，请检查：
- GitHub仓库设置：https://github.com/AZsama-666/wikibit/settings/pages
- GitHub Actions日志：https://github.com/AZsama-666/wikibit/actions
- DNS检查工具：https://dnschecker.org
