import { restoreUrl } from './shared'
import { needAuthPath, pagesMap } from './pages'

interface QueryType {
  replace?: boolean
  [key: string]: any
}

export function routerForward(name: string, query: QueryType = {}): void {
  if (needAuthPath.includes(name)) return routerForward('login')
  const targetPage = pagesMap.find((i) => i.name === name)
  if (!targetPage) return
  const isReplace = query.replace
  delete query.replace
  const { type, path } = targetPage
  const url = restoreUrl(path, query)
  const params = { url }
  if (type === 'tabBarPage') return uni.switchTab(params)
  if (!isReplace) return uni.navigateTo(params)
  uni.redirectTo(params)
}

export function routerBack(delta: number) {
  uni.navigateBack({
    delta
  })
}
