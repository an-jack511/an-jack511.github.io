# 前端重构教程（详细）

本文件记录本次前端重构思路、如何启用/维护评论、常用 Markdown/shortcode 写法与 KaTeX 速查，便于今后维护与扩展。

概览
- 本次改动涉及：`layouts/`、`layouts/partials/`、`static/css/`、`static/js/`、`data/`。
- 功能要点：统一的 `ux` 样式、可折叠代码/证明块、可折叠多层列表、侧栏近期文章与最新评论（仅在存在真实数据时显示）、评论后端可选（Giscus/Utterances/Disqus/GitHub-Issues）。

关键文件说明
- `layouts/_default/single.html`：文章页主模板，包含 TOC 与 `partials/comments.html`。
- `layouts/partials/comments.html`：根据 `config` 或 `params.comments` 条件加载评论系统（Giscus/Utterances/Disqus）或回退到本地展示（读取 `data/comments.json`）。
- `layouts/partials/sidebar.html`：侧栏模板，已改为仅在 `data/comments.json` 有数据时才展示“最新评论”。
- `layouts/partials/head.html` & `head_style.html`：样式加载顺序管理，`ux.css` 放在主样式之后以覆盖主题样式。
- `static/css/ux.css`：UX 覆盖样式（TOC、ux-block、列表折叠、整体平移等）。
- `static/js/ux.js`：交互脚本（折叠、TOC、列表切换、示例评论渲染）。
- `data/comments.json`：本地评论数据格式，构建时可由脚本生成真实数据。

启用评论（推荐）
- Giscus（最简单，基于 GitHub Discussions）：在 `hugo.toml` 的 `[params.comments]` 中配置 `provider = "giscus"` 与 `giscus_repo`、`giscus_category` 等字段；`partials/comments.html` 会在检测到配置后自动插入 Giscus 脚本。
- Utterances：类似 Giscus，需要在 `params.comments.provider = "utterances"` 并提供 `repo`、`issue-term` 等配置。
- GitHub Issues + 静态渲染：适合完全控制的方案。工作流程：用户评论触发 serverless 函数将评论写入 Issue，CI 在构建时拉取 Issues 并写入 `data/comments.json`，模板从 `data/` 渲染最新评论。
- Disqus：设置 `disqusShortname` 即可使用（请注意 GDPR 与隐私问题）。

数据格式（`data/comments.json`）
示例：
```
{
   "posts/some-post.md": [
      { "author": "张三", "body": "很棒的文章！", "date": "2025-12-01", "post_url": "/posts/some-post/" }
   ]
}
```

如何在侧栏显示最新评论
- 逻辑已实现：`layouts/partials/sidebar.html` 会检查 `.Site.Data.comments` 是否存在且非空，最多列出最近 6 条评论。

本地调试
- 运行 Hugo 本地服务器并在浏览器打开：

```powershell
hugo server --disableFastRender -D
```

短语速查：Markdown 常用写法
- 标题：`# 一级标题` 、`## 二级`。
- 段落：空行分隔。
- 行内代码：`` `code` ``。
- 代码块（带语言）：
   ```
   ```python
   def f():
      return 1
   ```
   ```
- 图片：`![alt](path/to/img.jpg)`。
- 链接：`[文本](url)`。
- 列表：`
   - 无序项
   1. 有序项
   `。
- 引用：`> 引用文本`。

Shortcode 写法（示例）
- 在 `layouts/shortcodes/` 下可以添加短代码，例如 `theorem.html`：

```html
<div class="ux-block ux-block--theorem">
   <div class="ux-block__header">
      <div class="ux-block__title">{{ .Get "title" }}</div>
   </div>
   <div class="ux-block__content">{{ .Inner }}</div>
</div>
```

使用方式（文章中）：
```
{{< theorem title="引理 1" >}}
证明内容……
{{< /theorem >}}
```

KaTeX / MathJax 常用符号速查
- 行内公式：`$a^2 + b^2 = c^2$`。
- 行间公式：`$$\int_0^1 x^2 dx$$`。
- 常用符号：
   - 上标/下标：`x^2`, `a_{i}`
   - 分数：`\frac{a}{b}`
   - 根号：`\sqrt{2}`
   - 求和：`\sum_{i=1}^n i`
   - 积分：`\int_a^b f(x) dx`
   - 希腊字母：`\alpha, \beta, \gamma` 等

进阶：如果你使用 MathJax 的 `physics` 扩展，可以直接写 `\vec{v}`、`\nabla` 等符号。

常见问题与排查
- 样式冲突：如果主题样式覆盖了 `ux.css`，调整 `head` 中的引入顺序，确保 `ux.css` 在主样式之后，或在选择器中增加命名空间（例如 `.ux-` 前缀）以提高权重。
- 首篇文章宽度收缩：在 Grid 布局下，子元素最小内容宽度可能导致列收缩，已在 `ux.css` 中通过 `min-width:0` 和 `grid-auto-columns:1fr` 解决。

后续工作建议
- 决定评论后端并配置 `hugo.toml` 中的 `params.comments`。
- 如需，我可以为你实现一个小的 Netlify Function/ GitHub Action 来把 Issue 评论拉取到 `data/comments.json`，并配置自动构建。

作者：自动生成重构助手
