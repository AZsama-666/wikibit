# 完整DNS配置指南 - 从零开始

这是一个完整的、一步一步的DNS配置指南，确保不遗漏任何步骤。

---

## 📋 配置总览

你需要完成以下3个步骤：
1. **在GoDaddy中添加CNAME记录**
2. **等待DNS生效（15-30分钟）**
3. **在GitHub中验证并保存域名**

预计时间：**20-30分钟**（主要是等待DNS生效）

---

## 步骤1：在GoDaddy中配置DNS记录

### 1.1 登录GoDaddy

1. 打开浏览器，访问：**https://www.godaddy.com**
2. 点击右上角 **"Sign In"**（登录）
3. 输入你的邮箱和密码登录

### 1.2 进入DNS管理

**方法1：通过菜单**
1. 登录后，点击右上角的头像/账号名称
2. 在下拉菜单中点击 **"My Products"**（我的产品）

**方法2：直接访问**
- 访问：**https://sso.godaddy.com/products**

3. 在域名列表中找到 **"up9.life"**
4. 点击域名右侧的 **"DNS"** 按钮

### 1.3 清理现有记录（重要！）

在DNS记录列表中：

1. **查找所有www相关记录**
   - 查看记录列表，找到所有 Name/Host 列显示为 `www` 的记录
   - 记录下它们的类型（Type）：是A记录还是CNAME记录

2. **删除所有www记录**
   - 对于每个www记录，点击记录右侧的 **删除图标**（垃圾桶图标 🗑️）
   - 或者点击 **编辑图标**（铅笔图标 ✏️），然后在编辑页面点击 **"Delete"**
   - **重要**：删除所有www相关的记录（A记录和CNAME记录都要删除）

3. **确认删除完成**
   - 刷新页面，确认记录列表中不再有 `www` 的记录

### 1.4 添加CNAME记录

1. **点击"Add"按钮**
   - 在DNS记录列表的上方或下方，找到 **"Add"** 或 **"+ Add"** 按钮
   - 点击它，会弹出添加记录的对话框

2. **填写记录信息**

   在对话框中，填写以下信息：

   **Type（类型）**：
   - 从下拉菜单中选择：**"CNAME"**
   - ⚠️ 不要选择A记录或其他类型

   **Name（名称）或 Host（主机名）**：
   - 输入：**`www`**
   - ⚠️ **重要**：只填写 `www`，不要填写 `www.up9.life` 或 `up9.life`
   - ⚠️ 不要带任何其他字符

   **Value（值）或 Points to（指向）或 Target（目标）**：
   - 输入：**`azsama-666.github.io`**
   - ⚠️ **重要**：
     - 不要带 `https://`
     - 不要带 `http://`
     - 不要带末尾的点（`.`）
     - 只填写：`azsama-666.github.io`

   **TTL（生存时间）**：
   - 选择：**"600 seconds"** 或 **"10 minutes"**
   - 或者使用默认值

3. **保存记录**
   - 检查所有信息是否正确
   - 点击 **"Save"** 或 **"Add Record"** 按钮
   - 等待保存完成

### 1.5 验证记录已添加

保存后，在DNS记录列表中应该看到：

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | azsama-666.github.io | 600 |

**确认要点：**
- ✅ Type列显示：**CNAME**
- ✅ Name列显示：**www**（只显示www，不显示www.up9.life）
- ✅ Value列显示：**azsama-666.github.io**（不带https://）
- ✅ 只有一条www记录（如果有多条，删除多余的）

**如果记录显示不正确：**
- 点击记录右侧的编辑图标
- 修改错误的字段
- 保存更改

---

## 步骤2：等待DNS生效

### 2.1 理解DNS传播时间

DNS更改不会立即生效，需要等待全球DNS服务器更新：

- **最快**：5-10分钟
- **通常**：15-30分钟
- **最长**：48小时
- **平均**：20-30分钟

### 2.2 使用在线工具检查DNS状态

在等待期间，可以使用在线工具检查DNS是否已生效：

1. **访问DNS检查工具**
   - 打开：**https://dnschecker.org**

2. **检查DNS记录**
   - 在输入框中输入：**`www.up9.life`**
   - 在记录类型下拉菜单中，选择：**"CNAME"**
   - 点击 **"Search"** 按钮

3. **查看结果**
   
   **如果DNS已生效：**
   - 全球大部分服务器（绿色对勾）会显示：**`azsama-666.github.io`**
   - 这表示DNS记录已正确配置并开始传播

   **如果DNS还未生效：**
   - 大部分服务器显示 "Not found" 或空值
   - 需要继续等待

4. **继续检查**
   - 等待10-15分钟后，再次使用dnschecker.org检查
   - 重复检查，直到看到大部分服务器显示正确的值

---

## 步骤3：在GitHub中配置自定义域名

### 3.1 访问GitHub Pages设置

1. 打开浏览器，访问：**https://github.com/AZsama-666/wikibit/settings/pages**
2. 或者：
   - 访问：https://github.com/AZsama-666/wikibit
   - 点击顶部标签栏的 **"Settings"**
   - 在左侧菜单中点击 **"Pages"**

### 3.2 添加自定义域名

在 "Custom domain"（自定义域名）部分：

1. **输入域名**
   - 在输入框中输入：**`www.up9.life`**
   - ⚠️ **注意**：
     - 不要带 `https://`
     - 不要带 `http://`
     - 只填写：`www.up9.life`

2. **保存域名**
   - 点击输入框右侧的 **"Save"** 按钮

### 3.3 等待GitHub验证DNS

点击Save后，GitHub会自动验证DNS配置：

1. **初始状态**
   - 可能会显示："DNS check unsuccessful"（DNS检查未成功）
   - 这是正常的，因为DNS可能还未完全生效

2. **重新检查**
   - 在错误提示框的右上角，找到 **"Check again"** 按钮
   - 点击它，让GitHub重新检查DNS

3. **等待验证通过**
   - 如果DNS已生效，错误提示会消失
   - 显示：**"Custom domain verified and saved"**（自定义域名已验证并保存）
   - 或者显示一个绿色的对勾 ✅

4. **如果还显示错误**
   - 等待5-10分钟
   - 使用dnschecker.org再次确认DNS已生效
   - 如果dnschecker显示正确，但GitHub还报错，继续等待并重试
   - GitHub的DNS检查可能有延迟

### 3.4 启用HTTPS（可选但推荐）

验证成功后：

1. **查看"Enforce HTTPS"选项**
   - 在Custom domain部分，可能会看到一个复选框：**"Enforce HTTPS"**
   - 或者在设置的其他地方

2. **勾选"Enforce HTTPS"**
   - 勾选这个选项，强制使用HTTPS访问网站
   - 这会自动将HTTP请求重定向到HTTPS

3. **等待SSL证书配置**
   - GitHub会自动为你的域名配置SSL证书
   - 通常需要5-15分钟
   - SSL证书配置完成后，网站可以通过HTTPS安全访问

---

## 步骤4：验证配置完成

### 4.1 最终检查清单

使用这个清单确认所有步骤都已完成：

**GoDaddy DNS配置：**
- [ ] 已登录GoDaddy账户
- [ ] 已进入up9.life的DNS管理页面
- [ ] 已删除所有现有的www记录
- [ ] 已添加CNAME记录：
  - [ ] Type: CNAME
  - [ ] Name: www
  - [ ] Value: azsama-666.github.io
  - [ ] TTL: 600
- [ ] 在记录列表中确认记录存在且正确

**DNS生效验证：**
- [ ] 已等待至少15-30分钟
- [ ] 已使用dnschecker.org检查DNS
- [ ] dnschecker显示大部分服务器解析到 azsama-666.github.io

**GitHub配置：**
- [ ] 已访问GitHub Pages设置页面
- [ ] 已在Custom domain输入：www.up9.life
- [ ] 已点击Save
- [ ] 已点击"Check again"重新验证
- [ ] GitHub显示验证成功（无错误提示）
- [ ] 已启用"Enforce HTTPS"（可选）

### 4.2 测试网站访问

配置完成后，测试网站是否可以正常访问：

1. **访问网站**
   - 打开浏览器，访问：**https://www.up9.life**
   - 或者：**http://www.up9.life**（会自动跳转到HTTPS）

2. **验证网站内容**
   - 应该能看到你的网站内容（Wiki Risk Portal）
   - 如果显示404或其他错误，检查GitHub Pages部署状态

3. **验证HTTPS**
   - 确认地址栏显示锁图标 🔒
   - 确认URL以 `https://` 开头
   - 如果显示"不安全"，等待SSL证书配置完成

### 4.3 成功标志

配置成功的标志：

- ✅ GoDaddy DNS记录列表显示正确的CNAME记录
- ✅ dnschecker.org显示DNS已正确传播
- ✅ GitHub Pages设置显示"Custom domain verified"
- ✅ 可以通过 https://www.up9.life 访问网站
- ✅ 网站正常显示内容
- ✅ 地址栏显示HTTPS锁定图标

---

## 🆘 常见问题快速解决

### Q1: GoDaddy中找不到"Add"按钮？

**A:** 
- 确保你在DNS管理页面（点击了域名的"DNS"按钮）
- 滚动页面查找，按钮可能在记录列表的上方或下方
- 如果是新界面，可能显示为 "+ Add" 或 "+ Add Record"

### Q2: 添加记录时提示"record could not be added"？

**A:**
- 检查是否还有未删除的www记录（需要先删除）
- 确认Name字段只填写 `www`（不要带域名）
- 确认Value字段只填写 `azsama-666.github.io`（不带https://）
- 等待1-2分钟后重试

### Q3: DNS记录添加成功，但dnschecker显示"Not found"？

**A:**
- 这是正常的，DNS传播需要时间
- 等待15-30分钟后再次检查
- 如果超过1小时还显示"Not found"，检查记录配置是否正确

### Q4: dnschecker显示正确，但GitHub还显示错误？

**A:**
- GitHub的DNS检查可能有延迟（有缓存）
- 等待10-15分钟后，点击GitHub中的"Check again"按钮
- 如果等待1小时后还显示错误，但dnschecker显示正确，可以尝试移除域名后重新添加

### Q5: 网站无法访问或显示404？

**A:**
1. 先访问默认地址确认：https://azsama-666.github.io/wikibit/
2. 如果默认地址可以访问，说明问题在DNS配置
3. 如果默认地址无法访问，检查GitHub Pages部署状态
4. 确认GitHub Pages设置中Source选择正确（main分支，/ (root)文件夹）

### Q6: 需要等多久？

**A:**
- DNS生效：15-30分钟（通常）
- GitHub验证：1-15分钟（DNS生效后）
- SSL证书：5-15分钟（验证通过后）
- **总计**：通常30-60分钟，最长可能需要48小时

---

## 📝 关键信息速查表

| 项目 | 值 |
|------|-----|
| 域名 | www.up9.life |
| DNS记录类型 | CNAME |
| DNS记录名称 | www |
| DNS记录值 | azsama-666.github.io |
| TTL | 600 seconds |
| GitHub仓库 | azsama-666/wikibit |
| GitHub Pages默认地址 | https://azsama-666.github.io/wikibit/ |

---

## ✅ 配置完成

完成以上所有步骤后，你的网站就可以通过 **https://www.up9.life** 访问了！

如果遇到任何问题，请参考：
- `FIX_DNS_ERROR.md` - DNS错误修复指南
- `GODADDY_TROUBLESHOOTING.md` - GoDaddy故障排查
- `COMPLETE_SETUP_GUIDE.md` - 完整部署指南

祝配置顺利！🚀
