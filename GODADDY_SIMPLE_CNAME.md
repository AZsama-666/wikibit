# GoDaddy DNS 配置 - 只需CNAME记录

## ✅ 简单回答

**是的，你只需要配置CNAME记录就可以了！**

不需要A记录、TXT记录或其他任何记录。

---

## 📋 你需要做的（只有3步）

### 步骤1：登录并进入DNS管理

1. 访问：https://www.godaddy.com 并登录
2. 点击右上角头像 → "My Products"
3. 找到域名 "up9.life" → 点击 "DNS" 按钮

### 步骤2：删除现有的www记录（如果有）

- 如果记录列表中有Name为 `www` 的记录（无论是什么类型），全部删除

### 步骤3：添加一条CNAME记录

点击 "Add" 按钮，填写：

| 字段 | 值 |
|------|-----|
| **Type（类型）** | CNAME |
| **Name/Host（名称）** | www |
| **Value/Points to（值）** | azsama-666.github.io |
| **TTL** | 600（或默认值） |

点击 "Save" 保存。

---

## ✅ 完成！

就这么简单！你只需要这一条CNAME记录。

**不需要：**
- ❌ A记录
- ❌ TXT记录
- ❌ 其他任何记录

**只需要：**
- ✅ 一条CNAME记录：www → azsama-666.github.io

---

## 📝 配置信息速查

```
Type:    CNAME
Name:    www
Value:   azsama-666.github.io
TTL:     600 seconds
```

---

## ⏱️ 等待生效

- 保存后等待 **15-30分钟** 让DNS生效
- 使用 https://dnschecker.org 检查状态
- 输入：www.up9.life，类型选择：CNAME
- 应该显示：azsama-666.github.io

---

## ❓ 为什么只需要CNAME？

- **CNAME记录**：指向另一个域名（azsama-666.github.io），GitHub会自动处理IP地址
- **A记录**：直接指向IP地址，需要手动维护，且GitHub的IP可能会变化

**结论**：CNAME更简单、更灵活，GitHub官方推荐使用CNAME记录。

---

## 🆘 如果CNAME无法添加？

只有在极少数情况下（比如GoDaddy不支持www的CNAME），才需要使用A记录作为备选方案。但通常CNAME都能正常工作。

如果遇到问题，参考：`GODADDY_TROUBLESHOOTING.md`
