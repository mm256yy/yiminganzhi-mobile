// 防止快速点击
let lastClickTime = 0

export function isFastClick(num = 1000) {
  const time = new Date().getTime()
  if (time - lastClickTime > num) {
    return false
  }
  lastClickTime = time
  return true
}

// 解析 path
export function parseUrl(fullPath: string) {
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query: { [key: string]: any } = {}
  queryStr
    ?.split('&')
    .map((i) => i.split('='))
    .forEach((i) => (query[i[0] as string] = i[1]))
  return {
    name,
    path,
    query
  }
}

// 还原url
export function restoreUrl(path: string, query: { [key: string]: any }) {
  let count = 0
  for (const key in query) {
    path += `${count === 0 ? '?' : '&'}${key}=${query[key]}`
    count += 1
  }
  return path
}

// guid
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getCurrentTimeStamp() {
  return new Date().getTime()
}

export function arrayToTree(items: any[]) {
  const result: any[] = [] // 存放结果集
  const itemMap: any = {} //
  for (const item of items) {
    const id = item.code
    const pid = item.parentCode

    // Country = 'Country',
    // Township = 'Township',
    // Village = 'Village',
    // naturalVillage = 'naturalVillage'
    if (item.districtType === 'Country') {
      item.level = 1
    } else if (item.districtType === 'Township') {
      item.level = 2
    } else if (item.districtType === 'Village') {
      item.level = 3
    } else if (item.districtType === 'naturalVillage') {
      item.level = 4
    } else {
      item.level = 5
    }

    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem = itemMap[id]

    if (item.districtType === 'Country') {
      result.push(treeItem)
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        }
      }
      itemMap[pid].children.push(treeItem)
    }
  }
  return result
}
