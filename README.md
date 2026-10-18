# Furpony Institute

研究 Furry 与 Brony 的文化异同，以及两者之间关系的独立博客。提供中文、英语和德语版本。

正式域名：https://furpony.hachile.org/

## 本地预览

需要 Node.js 22 或更新版本，不需要安装依赖。

```powershell
npm run build
npm test
python -m http.server 18818 --bind 127.0.0.1
```

打开 http://127.0.0.1:18818/ 。中文首页在 `/`，英文在 `/en/`，德文在 `/de/`。语言切换会保留当前文章。

## 发布文章

1. 在 `content/posts/` 中新增一个 JSON 文件，可以复制现有文章作为模板。
2. 设置唯一的 `slug` 和 `YYYY-MM-DD` 格式的发布日期。
3. 在 `translations` 的 `zh`、`en`、`de` 中分别填写 `title`、`description` 和 `body`。
4. `body` 中一个字符串对应一个段落；列表写成 `{ "list": ["第一项", "第二项"] }`。正文按纯文本处理，不执行 HTML。
5. 运行 `npm run build` 和 `npm test`。生成的首页、文章页、RSS 和 sitemap 一起提交并推送。

文章按日期从新到旧排列。三个语言版本共用 slug 和日期。不要手动修改生成的 HTML，修改内容文件后重新生成。

## GitHub Pages

仓库：GPDdev/furpony.hachile.org

Pages 使用 `main` 分支的根目录，`.nojekyll` 禁用 Jekyll；所有页面均为静态文件。`CNAME` 为 `furpony.hachile.org`。

在 Cloudflare DNS 中添加 CNAME：名称 `furpony`，目标 `gpddev.github.io`，先使用 DNS only。GitHub Pages 中设置自定义域名，DNS 校验和证书签发完成后启用 HTTPS。

## 联系方式

- 投稿邮箱：hejiale.ai@outlook.com
- Furpony Institüt QQ 交流群：1130961239
- QQ：1213956808

本站通过邮件接收投稿，没有在线投稿表单或账号系统。正文和联系方式公开托管于 GitHub Pages。
