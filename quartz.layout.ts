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
 sort(a, b) {
    // 定義你想置頂的檔案名稱 (不含 .md)
    const sticky = ["publish", "cv"] 
    
    if (sticky.includes(a.name) && !sticky.includes(b.name)) {
      return -1
    }
    if (!sticky.includes(a.name) && sticky.includes(b.name)) {
      return 1
    }
    
    // 其餘部分維持預設：資料夾在前，之後按字母排序
    return a.name.localeCompare(b.name)
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
 sort(a, b) {
    // 定義你想置頂的檔案名稱 (不含 .md)
    const sticky = ["publish", "cv"] 
    
    if (sticky.includes(a.name) && !sticky.includes(b.name)) {
      return -1
    }
    if (!sticky.includes(a.name) && sticky.includes(b.name)) {
      return 1
    }
    
    // 其餘部分維持預設：資料夾在前，之後按字母排序
    return a.name.localeCompare(b.name)
  },
}),
  ],
  right: [],
}
