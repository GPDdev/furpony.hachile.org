# Furpony Institute

<div align="center"><img alt="Node.js 22+" src="https://img.shields.io/badge/Node.js-22%2B-2339bd"><img alt="Tests: npm test" src="https://img.shields.io/badge/tests-npm%20test-2339bd"><img alt="Code license: MIT" src="https://img.shields.io/badge/code-MIT-green"><img alt="Design: 2026.11" src="https://img.shields.io/badge/design-2026.11-ffab72"><img alt="Languages: Chinese, English, German" src="https://img.shields.io/badge/content-ZH%20%2F%20EN%20%2F%20DE-2339bd"></div>

[中文网站](https://furpony.hachile.org/) / [English](https://furpony.hachile.org/en/) / [Deutsch](https://furpony.hachile.org/de/)

研究 Furry 与 Brony 的文化异同，以及两者之间关系的独立博客，开放文章投稿。

## 目录

- [设计与实现](#设计与实现)
- [本地预览](#本地预览)
- [发布文章](#发布文章)
- [文件结构](#文件结构)
- [GitHub Pages](#github-pages)
- [联系方式与贡献](#联系方式与贡献)
- [许可证](#许可证)

## 设计与实现

2026 年 11 月改版采用钴蓝、暖橙与暖白配色，搭配大字号刊头和原创狐狸、小马对话插画。首页包含文章、关于与投稿区；详情页提供独立阅读栏和三语切换。支持手机布局、键盘焦点与减少动态效果设置。

网站是无运行时依赖的静态页面。Node.js 将 JSON 内容与共享模板生成 HTML、RSS 和 sitemap。现有文章与译文由内容文件维护，不需要 CMS 或 API。视觉规则见 [DESIGN.md](DESIGN.md)。

## 本地预览

需要 Node.js 22 或更新版本，不需要安装依赖。

```powershell
npm run build
npm test
python -m http.server 18818 --bind 127.0.0.1
```

打开 http://127.0.0.1:18818/ 。中文首页在 `/`，英文在 `/en/`，德文在 `/de/`。语言切换会保留当前文章。Python 仅用于本地静态预览。

## 发布文章

1. 在 `content/posts/` 中新增一个 JSON 文件，可以复制现有文章作为模板。
2. 设置唯一的 `slug` 和 `YYYY-MM-DD` 格式的发布日期。
3. 在 `translations` 的 `zh`、`en`、`de` 中分别填写 `title`、`description` 和 `body`。
4. `body` 中一个字符串对应一个段落；列表写成 `{ "list": ["第一项", "第二项"] }`。正文按纯文本处理，不执行 HTML。
5. 运行 `npm run build` 和 `npm test`，预览并核对三个语言版本。生成的首页、文章页、RSS 和 sitemap 一起提交并推送。

文章按日期从新到旧排列。三个语言版本共用 slug 和日期。不要手动修改生成的 HTML，修改内容文件后重新生成。

## 文件结构

| 文件或目录 | 用途 |
| --- | --- |
| `content/posts/*.json` | 文章、译文和元数据 |
| `scripts/build.mjs` | 校验内容并生成页面、RSS、sitemap |
| `scripts/build.test.mjs` | 转义、内容校验和语言深链回归检查 |
| `assets/site.css` | 共享视觉与响应式规则 |
| `assets/dialogue.svg`、`assets/mark.svg` | 原创插画和标志 |
| `assets/site.js` | 复制公开 QQ 号码 |
| `index.html`、`en/`、`de/`、`articles/` | 提交到 Pages 的生成页面 |
| `CNAME`、`.nojekyll` | 自定义域名与静态部署配置 |

## GitHub Pages

仓库：[GPDdev/furpony.hachile.org](https://github.com/GPDdev/furpony.hachile.org)。

Pages 使用 `main` 分支的根目录，`.nojekyll` 禁用 Jekyll。所有页面均为静态文件，`CNAME` 为 `furpony.hachile.org`。DNS 的 CNAME 目标为 `gpddev.github.io`，正式网站使用 HTTPS。

恢复视觉版本时，通过一个新提交恢复选定的生成器、样式和资源，重新运行构建和检查后推送；保留需要继续使用的文章。改版前的视觉基线为 `7b4f088`。

## 联系方式与贡献

- 投稿邮箱：hejiale.ai@outlook.com
- Furpony Institüt QQ 交流群：1130961239
- QQ：1213956808
- 页面问题：[GitHub Issues](https://github.com/GPDdev/furpony.hachile.org/issues)

本站通过邮件接收投稿，没有在线投稿表单或账号系统。投稿请注明署名、来源以及是否同意公开发布和翻译。修改代码后运行构建和测试，贡献文章须拥有必要授权。

## 许可证

程序代码与原创界面资产使用 [MIT License](LICENSE)。文章正文、译文及其在生成页面中的副本保留著作权，不随程序代码授予 MIT 许可，详见 [CONTENT-LICENSE.md](CONTENT-LICENSE.md)。第三方内容遵守其原有授权。
