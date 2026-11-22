# Furpony Institute 视觉重设计

## 1. 当前目标
按用户显式指定的 build-websites-v2 重设计现有三语文化博客。本地实现及浏览器检查已完成，待推送与线上核验。文章原文、译文、路由和联系方式保持不变；不迁移框架或托管。

## 2. 完成条件
三语首页与文章页在桌面和手机可读；语言切换保留文章、QQ 复制与邮件链接可用；原文内容不变。构建、测试、浏览器与线上回读通过。推送 Furpony，更新 Home/Site 同版本日志，并核验仓库 README、许可证和元数据。

## 3. 已确认事实
Furpony 基线 main 为 7b4f088，开始时工作树干净。Node 无依赖生成 HTML，Pages 发布 main 根目录，正式地址 https://furpony.hachile.org/。Site 树主题已独立提交，Pony 任务正在更新 Home/Site 的 1.10.17 日志，发布前重新读取版本。Home 的 assets/app.js 和 assets/home.css 有独立任务改动，不能提交或覆盖。

## 4. 相关文件与命令
scripts/build.mjs 生成共享页面；assets/site.css 控制视觉；content/posts/consumption-and-belonging.json 保存三语文章，Git 差异为空。npm run build、npm test 已通过。archive/furpony-redesign-20261123/browser-check.cjs 为仓库外检查脚本，已验证三语首页/文章的 1440、390、320px、段落与列表完整性、语言深链及刷新、键盘焦点、QQ 复制、无脚本阅读和无控制台错误。同目录保存截图。Home 使用 tools/build-en.mjs。

## 5. 已否决方案
不新增 CMS、数据库、账号系统或外部字体依赖。没有用户指定参考站，因此不声称还原任何外部设计。旧版为回滚基线，不将其重叠圆图继续作为主要视觉。

## 6. 风险与待确认项
并行任务占用日志版本，最后同步时必须核对实际 Git 状态。Furpony 已补代码 MIT、文章保留权利说明及 README，仓库 description、topics、homepage 已设置；文件仍需推送及远程回读。没有其他已知阻塞。

## 7. 下一步动作
提交并推送 Furpony 改版，随后在 Home/Site 的最新日志上追加本次记录，验证各仓库 Pages 提交与线上内容；完成后将本文件标记已完成。
