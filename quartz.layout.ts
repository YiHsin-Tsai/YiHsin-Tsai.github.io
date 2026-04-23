import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer(),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({
  showReadingTime: false, // 隱藏 1 min read
}),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
  title: "", // 將標題設為空字串
  filter: (node) => {
    // 1. 排除名為 "papers" 的資料夾
    if (node.name.toLowerCase() === "papers") return false
    
    // 2. 排除所有路徑中包含 "papers/" 的檔案
    // node.file.path 通常是 content/papers/long-paper-title.md
    if (node.file?.path?.includes("papers/")) return false
    
    // 3. 確保 node.file.slug 也不包含該路徑
    if (node.file?.slug?.includes("papers/")) return false

    return true
  },
}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta({
  showReadingTime: false, // 隱藏 1 min read
})],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
  title: "", // 將標題設為空字串
  filter: (node) => {
    // 1. 排除名為 "papers" 的資料夾
    if (node.name.toLowerCase() === "papers") return false
    
    // 2. 排除所有路徑中包含 "papers/" 的檔案
    // node.file.path 通常是 content/papers/long-paper-title.md
    if (node.file?.path?.includes("papers/")) return false
    
    // 3. 確保 node.file.slug 也不包含該路徑
    if (node.file?.slug?.includes("papers/")) return false

    return true
  },
}),
  ],
  right: [],
}
