# 完整部署配置指南 - www.up9.life

这是一个完整的、从零开始的手动配置方案，包含所有步骤和截图说明。

---

## 📋 配置概览

本指南包含3个主要步骤：
1. **启用GitHub Pages**
2. **配置GoDaddy DNS记录**
3. **在GitHub中添加自定义域名**

预计总时间：**10-15分钟**

---

## 步骤1：启用GitHub Pages

### 1.1 访问GitHub仓库设置

1. 打开浏览器，访问：https://github.com/AZsama-666/wikibit
2. 点击仓库页面顶部的 **"Settings"** 标签（在 Code、Issues、Pull requests 等标签的右边）

### 1.2 进入Pages设置

1. 在Settings页面的左侧边栏，找到并点击 **"Pages"**（通常在 "Actions" 和 "Security" 之间）
2. 或者直接访问：https://github.com/AZsama-666/wikibit/settings/pages

### 1.3 配置Pages源

在 "Build and deployment" 部分：

1. **Source（源）**：在下拉菜单中选择 **"Deploy from a branch"**
2. **Branch（分支）**：选择 **"main"**
3. **Folder（文件夹）**：选择 **"/ (root)"**
4. 点击 **"Save"** 按钮

### 1.4 等待部署完成

- 等待1-2分钟
- 页面会显示：**"Your site is published at https://azsama-666.github.io/wikibit/"**
- 记住这个地址，稍后需要验证

### 1.5 验证部署（可选）

访问 https://azsama-666.github.io/wikibit/ 确认网站可以正常显示。

---

## 步骤2：配置GoDaddy DNS记录

### 2.1 登录GoDaddy账户

1. 访问：https://www.godaddy.com
2. 点击右上角的 **"Sign In"**（登录）
3. 输入你的邮箱和密码登录

### 2.2 进入域名DNS管理

**方法1：通过My Products**
1. 登录后，点击右上角的头像/账号名称
2. 在下拉菜单中选择 **"My Products"**（我的产品）

**方法2：直接访问**
- 访问：https://sso.godaddy.com/products

3. 在域名列表中，找到 **"up9.life"**
4. 点击域名右侧的 **"DNS"** 按钮

### 2.3 检查现有记录

在DNS管理页面的 "Records"（记录）部分：

1. **查看是否有www记录**
   - 在记录列表中查找 Name/Host 为 `www` 的记录
   - 如果存在，记录下它的 Type（类型）

2. **删除现有www记录（如果存在）**
   - 找到所有 `www` 相关的记录
   - 点击记录右侧的 **删除图标**（垃圾桶图标）或 **编辑图标**（铅笔图标）
   - 如果选择编辑，在编辑页面点击 **"Delete"**（删除）
   - 确认删除所有 `www` 记录

### 2.4 添加CNAME记录

1. **点击"Add"按钮**
   - 在DNS记录列表上方或下方找到 **"Add"** 或 **"+ Add"** 按钮
   - 点击它

2. **填写记录信息**
   
   在添加记录的对话框中：
   
   - **Type（类型）**：从下拉菜单选择 **"CNAME"**
   - **Name（名称）或 Host（主机）**：输入 `www`
     - ⚠️ **重要**：只填写 `www`，不要填写 `www.up9.life` 或 `up9.life`
   - **Value（值）或 Points to（指向）**：输入 `azsama-666.github.io`
     - ⚠️ **重要**：不要带 `https://`，不要带末尾的点（`.`）
   - **TTL（生存时间）**：选择 `600 seconds` 或使用默认值

3. **保存记录**
   - 点击 **"Save"** 或 **"Add Record"** 按钮

### 2.5 验证DNS记录

添加成功后，在DNS记录列表中应该看到：

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | azsama-666.github.io | 600 |

### 2.6 等待DNS生效

- 等待 **10-30分钟** 让DNS更改生效
- 可以使用 https://dnschecker.org 检查DNS传播状态
  - 输入：`www.up9.life`
  - 查看是否解析到GitHub的IP地址（185.199.108.x等）

---

## 步骤3：在GitHub中添加自定义域名

### 3.1 返回GitHub Pages设置

1. 访问：https://github.com/AZsama-666/wikibit/settings/pages
2. 或者：仓库 → Settings → Pages

### 3.2 添加自定义域名

在 "Custom domain"（自定义域名）部分：

1. 在输入框中输入：`www.up9.life`
   - ⚠️ **注意**：不要带 `https://`，只填写域名
2. 点击 **"Save"** 按钮

### 3.3 等待GitHub验证

- GitHub会自动验证DNS配置
- 如果DNS已生效，验证会很快完成（1-2分钟）
- 如果DNS还未生效，可能需要等待更长时间

### 3.4 查看验证状态

验证成功后，你会看到：

- ✅ **"Custom domain verified and saved"**（自定义域名已验证并保存）
- 在域名输入框下方显示一个绿色的勾号
- 可能会显示一个复选框："Enforce HTTPS"（强制HTTPS）- 建议勾选

### 3.5 等待SSL证书配置

- GitHub会自动为自定义域名配置SSL证书
- 通常需要 **5-15分钟**
- SSL配置完成后，网站可以通过HTTPS访问

---

## 步骤4：验证配置

### 4.1 检查DNS解析

使用在线工具检查DNS：

1. 访问：https://dnschecker.org
2. 输入：`www.up9.life`
3. 选择记录类型：`CNAME`
4. 点击 "Search"
5. 查看结果，应该显示解析到 `azsama-666.github.io`

### 4.2 测试网站访问

等待所有配置生效后（通常15-30分钟）：

1. 打开浏览器，访问：https://www.up9.life
2. 如果显示你的网站内容，说明配置成功！
3. 如果显示错误，继续等待或检查配置

### 4.3 验证HTTPS

- 确认网站使用HTTPS（地址栏显示锁图标）
- 如果显示"不安全"，说明SSL证书还在配置中，继续等待

---

## 📝 完整配置清单

使用这个清单跟踪你的进度：

### GitHub Pages配置
- [ ] 已访问GitHub仓库Settings页面
- [ ] 已进入Pages设置
- [ ] Source设置为 "Deploy from a branch"
- [ ] Branch设置为 "main"
- [ ] Folder设置为 "/ (root)"
- [ ] 已点击Save
- [ ] 等待部署完成（1-2分钟）
- [ ] 验证默认地址可访问

### GoDaddy DNS配置
- [ ] 已登录GoDaddy账户
- [ ] 已进入up9.life的DNS管理
- [ ] 已检查并删除现有的www记录（如果有）
- [ ] 已添加CNAME记录：
  - [ ] Type: CNAME
  - [ ] Name/Host: www
  - [ ] Value/Points to: azsama-666.github.io
  - [ ] TTL: 600
- [ ] 已保存记录
- [ ] 已在DNS记录列表中确认记录存在

### GitHub自定义域名配置
- [ ] 已返回GitHub Pages设置
- [ ] 已在Custom domain输入：www.up9.life
- [ ] 已点击Save
- [ ] 已等待GitHub验证DNS（1-15分钟）
- [ ] 验证状态显示成功

### 最终验证
- [ ] 已使用dnschecker.org检查DNS解析
- [ ] 已访问 https://www.up9.life
- [ ] 网站正常显示
- [ ] HTTPS正常工作（显示锁图标）

---

## 🆘 常见问题解决

### 问题1：GitHub Pages找不到Settings或Pages选项

**可能原因**：
- 仓库是私有的（免费账户不支持私有仓库的GitHub Pages）
- 权限不足

**解决方案**：
1. 检查仓库是否为Public（公开）
   - 如果为Private，需要改为Public：
   - Settings → General → Danger Zone → Change repository visibility → Make public
2. 确保你是仓库的所有者或有管理员权限

### 问题2：GoDaddy DNS添加失败 - "record could not be added"

**可能原因**：
- 已存在www记录
- 名称或值填写错误

**解决方案**：
1. 删除所有现有的www记录
2. 确认填写格式：
   - Name/Host: 只填 `www`
   - Value/Points to: 只填 `azsama-666.github.io`（不带https://）
3. 如果CNAME无法添加，使用A记录替代（见下文）

### 问题3：CNAME记录无法添加（使用A记录替代）

如果CNAME一直失败，可以添加4条A记录：

1. 点击 "Add"
2. Type: 选择 `A`
3. Name/Host: 输入 `www`
4. Value/Points to: 输入 `185.199.108.153`
5. TTL: `600`
6. 保存

重复以上步骤，为每个IP地址添加一条记录：
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

### 问题4：DNS验证失败

**可能原因**：
- DNS还未生效（需要等待）
- DNS记录配置错误

**解决方案**：
1. 等待更长时间（最多48小时，通常10-30分钟）
2. 使用 https://dnschecker.org 检查DNS是否已生效
3. 检查DNS记录配置是否正确
4. 确认记录类型、名称、值都正确

### 问题5：网站无法访问或显示404

**可能原因**：
- GitHub Pages还未部署完成
- DNS还未生效
- 自定义域名配置错误

**解决方案**：
1. 先访问默认地址确认：https://azsama-666.github.io/wikibit/
2. 如果默认地址可以访问，等待DNS生效
3. 如果默认地址无法访问，检查GitHub Pages部署状态
4. 检查GitHub Pages设置中的Custom domain是否正确

### 问题6：HTTPS证书未配置

**可能原因**：
- SSL证书还在配置中（通常需要5-15分钟）
- DNS验证未通过

**解决方案**：
1. 等待更长时间（最多24小时）
2. 确认DNS验证已通过
3. 在GitHub Pages设置中勾选 "Enforce HTTPS"
4. 清除浏览器缓存后重试

---

## ⏱️ 时间线参考

- **GitHub Pages部署**：1-2分钟
- **DNS更改生效**：10-30分钟（最多48小时）
- **DNS验证**：1-15分钟
- **SSL证书配置**：5-15分钟（最多24小时）

**总计**：通常15-30分钟，最长可能需要48-72小时

---

## ✅ 配置完成标志

当以下所有条件满足时，配置完成：

1. ✅ GitHub Pages默认地址可访问
2. ✅ DNS记录已添加并在dnschecker.org中显示正确
3. ✅ GitHub Pages设置中显示"Custom domain verified"
4. ✅ 可以通过 https://www.up9.life 访问网站
5. ✅ 网站显示HTTPS锁定图标（安全连接）

---

## 📞 需要帮助？

如果遇到问题，请提供：

1. 错误信息的具体内容
2. 当前在哪一步
3. DNS记录列表的截图（隐藏敏感信息）
4. GitHub Pages设置页面的状态

---

## 📚 相关文档

- 详细GoDaddy DNS配置：`GODADDY_DNS_SETUP.md`
- DNS故障排查：`GODADDY_TROUBLESHOOTING.md`
- GitHub Pages设置：`GITHUB_PAGES_SETUP.md`
- 快速部署步骤：`QUICK_DEPLOY.md`

---

**祝配置顺利！** 🚀
