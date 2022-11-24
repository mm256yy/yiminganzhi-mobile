import pagesJson from '../pages.json'

// tabBar页面
const tabBarPagesMap = (pagesJson.tabBar ? pagesJson.tabBar.list : []).map((i) => {
  return {
    type: 'tabBarPage',
    name: i.name,
    path: `/${i.pagePath}`
  }
})

// 其他页面
const subPagesMap = (pagesJson.pages || []).map((i) => {
  return {
    type: 'normalPage',
    name: i.name,
    path: `/${i.path}`
  }
})

// 页面列表
export const pagesMap = [...tabBarPagesMap, ...subPagesMap]

// 需要登录权限的页面
export const needAuthPath = ['']
