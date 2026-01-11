# GitHub Pages 设置详细步骤

## 如何找到 "Source" 选项

### 步骤1：进入仓库设置页面

1. 访问你的仓库：https://github.com/AZsama-666/wikibit
2. 点击仓库页面顶部的 **"Settings"** 标签（在 Code、Issues、Pull requests 等标签的右边）
   - 如果看不到 Settings，可能是仓库权限问题，确保你是仓库所有者

### 步骤2：找到 GitHub Pages 部分

在 Settings 页面中：

1. 在左侧边栏中找到 **"Pages"** 选项
   - 位置：在 Settings 左侧菜单中，通常在 "Actions" 和 "Security" 之间
   - 如果没有看到 "Pages"，向下滚动左侧菜单

2. 点击 **"Pages"**，进入 GitHub Pages 设置页面

### 步骤3：配置 Source

在 GitHub Pages 设置页面的顶部，你会看到：

```
Build and deployment
┌─────────────────────────────────────────────┐
│ Source: [下拉菜单 ▼]                        │
│         Deploy from a branch                │
│                                              │
│ Branch: [main ▼]   /   [ / (root) ▼]      │
│                                              │
│           [Save] 按钮                        │
└─────────────────────────────────────────────┘
```

**操作步骤：**
1. 在 **"Source"** 下拉菜单中，选择 **"Deploy from a branch"**（如果还没有选择）
2. 在 **"Branch"** 下拉菜单中，选择 **"main"**
3. 在 **"Folder"** 下拉菜单中，选择 **"/ (root)"**
4. 点击 **"Save"** 按钮

### 如果找不到 Pages 选项

如果左侧菜单中没有 "Pages" 选项，可能的原因：

1. **仓库是私有仓库**（免费账户不支持私有仓库的 GitHub Pages）
   - 解决方案：将仓库设置为公开（Public）
   - 操作：Settings → General → Danger Zone → Change repository visibility → Make public

2. **权限不足**
   - 确保你是仓库的所有者或有管理员权限

3. **GitHub Pages 功能被禁用**
   - 这很少见，通常不会发生

## 替代方案：使用 GitHub CLI

如果你安装了 GitHub CLI，可以在命令行操作：

```powershell
# 安装 GitHub CLI（如果还没有）
winget install GitHub.cli

# 登录
gh auth login

# 启用 Pages
gh api repos/AZsama-666/wikibit/pages -X PUT -f source[branch]=main -f source[path]=/
```

## 直接链接

如果以上步骤还是找不到，直接访问这个链接：

**https://github.com/AZsama-666/wikibit/settings/pages**

这个链接会直接跳转到 GitHub Pages 设置页面。

## 界面截图说明

GitHub Pages 设置页面的结构大致如下：

```
GitHub Pages Settings
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Build and deployment
┌─────────────────────────────────────────────┐
│ Source                                      │
│ ┌───────────────────────────────────────┐  │
│ │ Deploy from a branch              ▼  │  │
│ └───────────────────────────────────────┘  │
│                                              │
│ Branch:  [main ▼]   Folder:  [/ (root) ▼] │
│                                              │
│                  [Save]                      │
└─────────────────────────────────────────────┘

Custom domain
┌─────────────────────────────────────────────┐
│ www.up9.life                                │
│ [输入域名]                          [Save] │
└─────────────────────────────────────────────┘
```

## 需要帮助？

如果还是找不到，请告诉我：
1. 你在 Settings 页面的左侧菜单中看到了哪些选项？
2. 仓库是公开的还是私有的？
3. 你能访问这个链接吗：https://github.com/AZsama-666/wikibit/settings/pages
