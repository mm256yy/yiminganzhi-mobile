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

export function debounce(fn: (t?: any) => any, delay = 300) {
  let timer: any = null
  return function (...args: any) {
    if (timer != null) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.call(this, ...args)
    }, delay)
  }
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

export function guidFour() {
  return 'xyxy'.replace(/[xy]/g, function (c) {
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

export const networkCheck = (): Promise<boolean> => {
  // 检测网络情况
  return new Promise((resolve, reject) => {
    uni.getNetworkType({
      success: function (res) {
        const networkType = res.networkType
        if (networkType === 'none' || networkType === '2g') {
          // 无网络 为离线状态
          resolve(false)
        } else {
          resolve(true)
        }
      },
      fail: function () {
        reject()
      }
    })
  })
}

/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
export function compareVersion(version1 = '0', version2 = '0') {
  const v1 = String(version1).split('.')
  const v2 = String(version2).split('.')
  const minVersionLens = Math.min(v1.length, v2.length)

  let result = 0
  for (let i = 0; i < minVersionLens; i++) {
    const curV1 = Number(v1[i])
    const curV2 = Number(v2[i])

    if (curV1 > curV2) {
      result = 1
      break
    } else if (curV1 < curV2) {
      result = -1
      break
    }
  }

  if (result === 0 && v1.length !== v2.length) {
    const v1BiggerThenv2 = v1.length > v2.length
    const maxLensVersion = v1BiggerThenv2 ? v1 : v2
    for (let i = minVersionLens; i < maxLensVersion.length; i++) {
      const curVersion = Number(maxLensVersion[i])
      if (curVersion > 0) {
        v1BiggerThenv2 ? (result = 1) : (result = -1)
        break
      }
    }
  }

  return result
}

/**
 * 深拷贝
 * @param {object} target - 需要被深拷贝的对象
 * @param {object} map - 注入到已有对象，选填
 * @return {object} 结果对象
 */
export function deepClone(target: any, map?: any) {
  let cloneTarget: any
  if (!map) {
    map = new WeakMap()
  }
  if (target !== null && (typeof target === 'object' || Array.isArray(target))) {
    cloneTarget = Array.isArray(target) ? [] : {}
    const keys = Object.keys(target)
    if (map.has(target)) {
      return map.get(target)
    }
    for (const key of keys) {
      cloneTarget[key] = deepClone(target[key], map) // eslint-disable-line
    }
    map.set(target, cloneTarget)
  } else {
    cloneTarget = target
  }

  return cloneTarget
}
export function setlocationType(target: any) {
  if (target == 'SubmergedArea') {
    return '1'
  } else if (target == 'InfluenceArea') {
    return ''
  } else {
    return '3'
  }
 
}
