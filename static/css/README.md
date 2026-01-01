# CSS 文件结构说明

## 概述

UX 样式已按功能模块拆分成多个文件，便于管理和维护。主文件 `ux.css` 作为入口点，使用 `@import` 导入所有子模块。

## 文件结构

### ux.css
主入口文件，负责导入所有其他 CSS 文件。

### 功能模块

#### 1. ux-variables.css
- **用途**：CSS 变量和主题定义
- **包含**：全局颜色变量、主题变量、深色模式变量
- **依赖**：无

#### 2. ux-typography.css
- **用途**：全局排版和标题样式
- **包含**：body 样式、标题大小、链接样式
- **依赖**：ux-variables.css

#### 3. ux-header.css
- **用途**：页头、导航栏样式
- **包含**：.site-header、.site-navi、.site-title、.site-navi-items 等
- **依赖**：ux-variables.css、ux-typography.css

#### 4. ux-layout.css
- **用途**：页面布局和网格系统
- **包含**：.container-article、.main、.sidebar、响应式布局规则
- **依赖**：ux-variables.css

#### 5. ux-toc.css
- **用途**：目录（TOC）和导航样式
- **包含**：浮动目录、内联目录、移动端 TOC 弹窗、目录列表样式
- **依赖**：ux-variables.css、ux-layout.css

#### 6. ux-blockquote.css
- **用途**：区块引用和折叠样式
- **包含**：blockquote、折叠/展开按钮、代码块样式
- **依赖**：ux-variables.css

#### 7. ux-theorem.css
- **用途**：定理、证明、引理等数学块样式
- **包含**：.ux-block、.theorem-proof、证明块样式、各类型证明块
- **依赖**：ux-variables.css

#### 8. ux-components.css
- **用途**：按钮、链接、列表、评论等组件样式
- **包含**：.btn、.theme-toggle、列表嵌套样式、评论区样式
- **依赖**：ux-variables.css

#### 9. ux-dark-mode.css
- **用途**：深色模式适配
- **包含**：@media (prefers-color-scheme: dark) 规则、body.dark-mode 规则
- **依赖**：所有其他模块

#### 10. ux-mobile.css
- **用途**：移动端响应式样式
- **包含**：@media (max-width: 768px/600px/400px) 规则
- **依赖**：所有其他模块

## 文件大小统计

| 文件名 | 大小 | 行数 |
|--------|------|------|
| ux.css | 0.81 KB | ~30 |
| ux-variables.css | 0.61 KB | ~22 |
| ux-typography.css | 0.57 KB | ~27 |
| ux-header.css | 1.33 KB | ~60 |
| ux-layout.css | 2.23 KB | ~110 |
| ux-toc.css | 5.21 KB | ~250 |
| ux-blockquote.css | 3.48 KB | ~170 |
| ux-theorem.css | 4.33 KB | ~220 |
| ux-components.css | 3.34 KB | ~200 |
| ux-dark-mode.css | 2.95 KB | ~150 |
| ux-mobile.css | 1.95 KB | ~110 |
| **总计** | **~26.7 KB** | **~1350** |

## 使用指南

### 如何添加新样式

1. **全局样式**：如果是所有模块都需要的，添加到 `ux-variables.css`
2. **特定模块样式**：添加到对应的模块文件，例如：
   - 新页头样式 → `ux-header.css`
   - 新列表样式 → `ux-components.css`
   - 新定理块样式 → `ux-theorem.css`

### 如何修改现有样式

1. 找到相关的模块文件
2. 编辑该文件中的规则
3. 刷新浏览器查看效果

### 如何删除或重命名模块

1. 编辑 `ux.css` 中的 `@import` 语句
2. 删除或重命名对应的文件
3. 验证没有遗漏的导入

## 加载顺序

CSS 文件按照以下顺序加载和应用：

```
1. ux-variables.css (变量定义)
   ↓
2. ux-typography.css (排版)
   ↓
3. ux-header.css (页头)
   ↓
4. ux-layout.css (布局)
   ↓
5. ux-toc.css (目录)
   ↓
6. ux-blockquote.css (引用)
   ↓
7. ux-theorem.css (定理)
   ↓
8. ux-components.css (组件)
   ↓
9. ux-dark-mode.css (深色模式覆盖)
   ↓
10. ux-mobile.css (移动端覆盖)
```

## 注意事项

- 深色模式和移动端规则放在最后，以便覆盖前面的规则
- 避免在多个文件中定义同一个选择器（会导致冲突）
- 变量定义在最前面，所有其他文件都可以使用
- 使用 `@import url('filename.css')` 而非 `@import 'filename'` 以兼容更多浏览器

## 浏览器兼容性

- 现代浏览器（Chrome、Firefox、Safari、Edge）都支持 CSS @import
- 生产环境可考虑预处理（如 Sass）或构建工具（如 Gulp）合并 CSS 文件以减少 HTTP 请求
