# 前端重构教程（简明）

概览
- 本次重构主要在 `layouts/`、`static/css/`、`static/js/`、`data/` 中添加/修改文件，实现：评论区（本地示例）、引用样式优化、代码/证明块折叠、可折叠多层列表、右侧侧栏（近期文章 + 最新评论）、移动端适配。

主要文件
- `layouts/_default/single.html`：插入评论区与侧栏。
- `layouts/partials/comments.html`：评论区（本地表单示例）。
- `layouts/partials/sidebar.html`：近期文章与最新评论展示（支持 `data/comments.json`）。
- `layouts/partials/head_style.html`：引入 `css/ux.css`。
- `static/css/ux.css`：新增的交互样式。
- `static/js/ux.js`：交互脚本，实现折叠与本地评论提交演示。
- `data/comments.json`：示例评论数据（可替换为真实数据源）。

如何维护与修改
1. 评论持久化
   - 选项 A：启用 Disqus（在 `config` 中设置 `disqusShortname`），并在 `single.html` 保留/启用 Disqus 模板。
   - 选项 B：使用 GitHub Issues + 静态渲染（推荐）——需要一个小的 serverless 函数（Netlify/Azure/AWS Lambda）来将评论推送到 Issues，并在构建时拉取到 `data/comments.json`。
   - 选项 C：使用第三方评论平台（Valine、Giscus、Utterances 等），在 `comments.html` 中替换表单与加载脚本。

2. 调整引用样式
   - 在 `static/css/ux.css` 中修改 `blockquote` 的 `font-family` 或 `padding-left`，若要使用其他字体请在 `head` 中加载。

3. 代码/证明块样式
   - `pre` 的边界样式与折叠逻辑在 `ux.css` 与 `ux.js` 中统一管理。若要更改边界样式，编辑 `pre` 的 `border-style` 与 `.theorem-proof` 的 `border-style`。

4. 多层列表交互
   - 折叠逻辑由 `ux.js` 的多层列表代码添加。如果要默认全部折叠，请修改脚本使其在页面加载时对 `.post-content li` 添加 `collapsed` 类。

5. 侧栏最新评论
   - 当前优先使用 `data/comments.json`。若想在构建时从第三方加载，请在 `data/` 生成脚本中写入对应数据（建议添加 `post_url` 字段使跳转正确）。

运行与调试
- 本地运行 Hugo 服务器：

```powershell
hugo server -D
```

- 打开浏览器访问 `http://localhost:1313` 并打开开发者工具查看 `ux.js` 是否加载。

注意事项与限制
- 本次提供的评论表单为前端展示；不含后端持久化，生产环境请接入外部服务或 GitHub Issues。
- 若主题或现有样式与 `ux.css` 冲突，可能需要增加更高的选择器优先级或调整变量。

下一步建议
- 决定评论持久化方案（我可以帮你实现 Giscus / Utterances / GitHub-Issues + Netlify Functions 的集成）。
- 若需要，我可以将样式进一步精简并增加主题变量支持（颜色/圆角/间距）。

作者：自动生成重构助手
