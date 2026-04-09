# Henry 的收藏集

一个适合部署到 GitHub Pages 的个人数字花园 / 收藏归档站，使用 `Astro + Markdown 内容集合 + 少量原生 JavaScript` 构建。

## 1. 推荐的技术方案

推荐使用 **Astro 静态站点方案**。

为什么适合这次需求：

- **非常适合 GitHub Pages**：构建产物是纯静态文件，直接发布到 `dist/` 即可。
- **维护成本低**：内容主要放在 `src/content/` 里的 Markdown 文件，不依赖数据库或后端。
- **天然适合中文内容**：Markdown、页面模板和内容集合都能直接处理中文标题、正文、标签和摘要。
- **结构清晰**：内容区、模板、样式、配置和示例数据分离，后续修改很直观。
- **可渐进增强**：搜索和筛选只用了少量前端脚本，页面主体依旧是静态 HTML，稳定且易维护。
- **适合“数字花园”气质**：比通用博客模板更自由，既能发文章，也能展示链接、笔记和摘录。

## 2. 网站信息架构

站点分为 5 个主要入口：

1. `首页 /`
   - 站点简介
   - 四个内容区导航
   - 精选内容
   - 最近更新
2. `统一归档 /explore/`
   - 聚合所有内容
   - 支持搜索
   - 支持按标签、分类、年份、内容区筛选
3. `网站收藏 /bookmarks/`
   - 展示外部链接
   - 保留自己的收藏说明
4. `笔记 /notes/`
   - 展示结构化文本内容
5. `文案摘录 /quotes/`
   - 展示句子、段落和简短评论
6. `花园随想 /garden/`
   - 发布较长文章和个人博客

## 3. 页面结构建议

### 首页

- 顶部导航
- Hero 区：一句清晰的站点定位
- “四个房间”分区入口
- 精选内容
- 最近更新

### 分类页

- 页面说明
- 搜索框
- 分类 / 标签 / 年份筛选
- 内容列表

### 内容详情页

- 左侧元信息：标题、日期、分类、标签
- 右侧正文
- 网站收藏详情页额外提供外部链接按钮

## 4. 数据组织方式建议

所有内容都用本地 Markdown 管理，目录如下：

```text
src/content/
├── bookmarks/   # 网站收藏
├── notes/       # 笔记
├── quotes/      # 文案摘录
└── essays/      # 长文 / 博客 / 随想
```

每篇内容都使用统一 frontmatter：

```yaml
---
title: 标题
summary: 简介
category: 分类
tags:
  - 标签1
  - 标签2
date: 2026-04-05
featured: true
externalUrl: https://example.com # 仅 bookmarks 必填
---
```

这种方式的优点：

- 易读
- 易手动新增
- 易版本管理
- 易迁移

## 5. 完整项目代码

当前目录已经包含完整可运行项目，主要结构如下：

```text
.
├── .github/workflows/deploy.yml
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── tests/
├── astro.config.mjs
├── package.json
└── README.md
```

核心文件说明：

- `src/content.config.ts`：定义内容集合 schema
- `src/lib/content.ts`：归档数据结构、排序、筛选元信息、搜索文本生成
- `src/lib/content-service.ts`：把 Astro 内容集合转换为站点可用数据
- `src/components/ArchiveShell.astro`：统一归档和筛选界面
- `src/pages/index.astro`：首页
- `src/pages/bookmarks/`、`notes/`、`quotes/`、`garden/`：各分类页和详情页
- `src/styles/global.css`：全局视觉风格

## 6. GitHub Pages 部署步骤

### 方式一：推荐，使用仓库内置 GitHub Actions

1. 把这个项目推送到 GitHub 仓库。
2. 仓库默认分支使用 `main`。
3. 进入 GitHub 仓库设置：
   - `Settings`
   - `Pages`
   - `Build and deployment`
   - Source 选择 `GitHub Actions`
4. 推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并发布。

这个工作流已经处理了两种情况：

- 用户主页仓库：`username.github.io`
- 项目仓库：`repo-name`

### 方式二：本地构建后手动发布

```bash
npm install
npm run build
```

构建完成后，静态文件在 `dist/` 目录。

## 7. README 使用说明

### 本地运行

```bash
npm install
npm run dev
```

默认开发地址：

```text
http://localhost:4321
```

### 构建

```bash
npm run build
```

### 测试

```bash
npm run test
```

### 新增一条网站收藏

在 `src/content/bookmarks/` 新建一个 Markdown 文件，例如：

```md
---
title: 新收藏的网站
summary: 为什么它值得留下
category: 工具
tags:
  - 效率
  - 收藏
date: 2026-04-09
featured: false
externalUrl: https://example.com
---

这里写你自己的备注。
```

### 新增一篇笔记 / 摘录 / 长文

分别在以下目录创建 Markdown 文件：

- `src/content/notes/`
- `src/content/quotes/`
- `src/content/essays/`

前言区字段保持一致即可。

## 8. 示例内容

项目已经附带示例数据：

- 网站收藏：`Visual Atlas`、`Slow Web Digest`、`Marginalia Search`
- 笔记：`关于慢阅读的笔记`、`如何给内容打标签而不过度纠结`
- 摘录：`安静但不空白的结构`、`笔记像桥，不像仓库`
- 花园随想：`四月的风和内容整理`、`为什么我想要一个个人内容归档站`

## 维护建议

- 每次新增内容时，至少写一句自己的总结，不要只保存链接。
- 标签保持克制，避免一篇内容打太多标签。
- 首页精选内容可以通过 `featured: true` 控制。
- 如果以后内容很多，可以继续加分页、专题页或时间轴页，但当前结构已经足够长期使用。
