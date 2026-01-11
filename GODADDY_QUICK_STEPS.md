# GoDaddy DNS 配置 - 快速步骤

## 🚀 3步完成DNS配置

### 步骤1：登录并进入DNS管理

1. 访问：https://www.godaddy.com 并登录
2. 点击右上角头像 → **"My Products"**
3. 找到域名 **up9.life**，点击 **"DNS"** 按钮

### 步骤2：添加CNAME记录

在DNS管理页面：

1. 点击 **"Add"**（添加）按钮
2. 填写信息：
   - **Type（类型）**：选择 `CNAME`
   - **Name（名称）**：输入 `www`
   - **Value（值）**：输入 `azsama-666.github.io`
   - **TTL**：选择 `600 seconds`（或默认值）
3. 点击 **"Save"**（保存）

### 步骤3：等待生效

- 等待 10-30 分钟让DNS生效
- 使用 https://dnschecker.org 检查状态（输入 `www.up9.life`）

## ✅ 完成！

配置完成后，在GitHub Pages设置中添加域名 `www.up9.life`

---

详细说明请查看：`GODADDY_DNS_SETUP.md`
