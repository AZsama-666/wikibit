# GitHub Pages 自动部署脚本
# 使用方法：需要先设置 GitHub Personal Access Token

param(
    [string]$GitHubToken = "",
    [string]$Owner = "AZsama-666",
    [string]$Repo = "wikibit",
    [string]$Domain = "www.up9.life"
)

Write-Host "=== GitHub Pages 自动部署脚本 ===" -ForegroundColor Cyan
Write-Host ""

# 检查是否提供了Token
if ([string]::IsNullOrEmpty($GitHubToken)) {
    Write-Host "❌ 错误：需要提供 GitHub Personal Access Token" -ForegroundColor Red
    Write-Host ""
    Write-Host "请按以下步骤操作：" -ForegroundColor Yellow
    Write-Host "1. 访问：https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. 点击 'Generate new token (classic)'" -ForegroundColor White
    Write-Host "3. 选择权限：repo (Full control of private repositories)" -ForegroundColor White
    Write-Host "4. 生成token后，运行：" -ForegroundColor White
    Write-Host "   .\deploy.ps1 -GitHubToken YOUR_TOKEN" -ForegroundColor Green
    Write-Host ""
    Write-Host "或者，你可以手动操作（更简单）：" -ForegroundColor Yellow
    Write-Host "1. 访问：https://github.com/$Owner/$Repo/settings/pages" -ForegroundColor White
    Write-Host "2. Source 选择：main 分支，/ (root) 文件夹" -ForegroundColor White
    Write-Host "3. 点击 Save" -ForegroundColor White
    exit 1
}

# 设置GitHub API基础URL
$baseUrl = "https://api.github.com/repos/$Owner/$Repo/pages"
$headers = @{
    "Authorization" = "token $GitHubToken"
    "Accept" = "application/vnd.github.v3+json"
}

Write-Host "正在启用 GitHub Pages..." -ForegroundColor Yellow

# 启用GitHub Pages
$body = @{
    source = @{
        branch = "main"
        path = "/"
    }
} | ConvertTo-Json -Depth 10

try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method Put -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "✅ GitHub Pages 已启用！" -ForegroundColor Green
    Write-Host "   状态: $($response.status)" -ForegroundColor White
    Write-Host "   访问地址: $($response.html_url)" -ForegroundColor White
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    $errorBody = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
    
    if ($statusCode -eq 422 -and $errorBody.message -like "*already enabled*") {
        Write-Host "✅ GitHub Pages 已经启用" -ForegroundColor Green
    } else {
        Write-Host "❌ 错误: $($_.Exception.Message)" -ForegroundColor Red
        if ($errorBody) {
            Write-Host "   详情: $($errorBody.message)" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "提示：如果遇到权限错误，请确保token有repo权限" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "=== 下一步操作 ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 等待1-2分钟，让GitHub部署完成" -ForegroundColor White
Write-Host "2. 访问测试地址：https://$Owner.github.io/$Repo/" -ForegroundColor Green
Write-Host ""
Write-Host "3. 配置DNS（需要在域名提供商界面操作）：" -ForegroundColor Yellow
Write-Host "   类型：CNAME" -ForegroundColor White
Write-Host "   名称：www" -ForegroundColor White
Write-Host "   值：$Owner.github.io" -ForegroundColor White
Write-Host ""
Write-Host "4. 在GitHub中添加自定义域名：" -ForegroundColor Yellow
Write-Host "   访问：https://github.com/$Owner/$Repo/settings/pages" -ForegroundColor White
Write-Host "   在 Custom domain 输入：$Domain" -ForegroundColor White
Write-Host "   点击 Save" -ForegroundColor White
Write-Host ""
