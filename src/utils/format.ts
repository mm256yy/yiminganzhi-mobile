import { getStorage, StorageKey } from '@/utils'

/**
 * 枚举数据处理
 * @param(Array) arr 枚举数据列表
 * @param(Object) val 枚举的 value 值
 */
export const dictOption = (arr: any, val: any) => {
  let str = '-'
  if (String(val)) {
    const arrItem = arr && arr.length && arr.find((item: any) => String(item.value) === String(val))
    str = arrItem ? arrItem.text : '-'
    return str
  }
  return str
}

/**
 * 字典回显处理
 * 1、字典的 val 不为空或存在时，取字典表中对应的 text
 * 2、字典的 val 值为控或不存在时，显示 '-'
 * @param(Object) val 对应字典的 value
 * @param(Object) id 对应字典的 id
 */
export const formatDict = (val: any, id: number) => {
  let str = '-'
  // 获取数据字典
  const dict = getStorage(StorageKey.DICT)
  if (String(val)) {
    const arr: any = dict[id]

    // 方法一
    // const arrItem = arr && arr.length && arr.find((item: any) => String(item.value) === String(val))
    // str = arrItem ? arrItem.text : '-'

    // 方法二
    arr.map((item: any) => {
      if (typeof item.value === typeof val && item.value === val) {
        str = item.text
        return str
      } else {
        if (String(item.value) === String(val)) {
          str = item.text
          return str
        }
      }
    })
    return str
  }
  return str
}

/**
 * 字符串处理
 * 1、带单位的字符串进行拼接后显示，不带单位的直接显示
 * 2、字符串为空或不存在的，显示 '-'
 * @param(Object) str 字符串
 * @param(Object) unit 单位
 */
export const formatStr = (str: any, unit?: string) => {
  if (str) {
    if (unit) {
      return str + unit
    } else {
      return str
    }
  } else {
    return '-'
  }
}

/**
 * 保留两位小数
 * @param {Object} value 需要截取的数字
 */
export const formatNum = (value: any, unit?: string) => {
  let result = ''
  if (value) {
    if (String(value).indexOf('.') !== -1) {
      result = String(value).substr(0, String(value).indexOf('.') + 3)
      if (unit) {
        return result + unit
      } else {
        return result
      }
    } else {
      return value
    }
  } else {
    return '-'
  }
}

/**
 * 截取字符串
 * @param(Object) str 被截取的字符串
 * @param(Object) startIndex 起始下标
 * @param(Object) endIndex 结束下标
 */
export const splitStr = (str: any, startIndex: number, endIndex: number) => {
  if (str) {
    if (startIndex && endIndex) {
      return str.slice(startIndex, endIndex)
    } else {
      return str
    }
  } else {
    return str
  }
}

/**
 * 超出长度的字符串进行隐藏
 * @param{Object} str 字符串
 * @param{Object} num 截取字符串的位数
 */
export const hideStr = (str: string, num: number) => {
  if (str) {
    if (str.length > num) {
      str = str.substring(0, num) + '...'
    }
  }
  return str
}

// 格式化时间
export const fmtTime = (date: any, fmt: any) => {
  const o: { [key: string]: any } = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

// 时间戳转日期型
export const fmtDate = (time: any, fmt = 1) => {
  if (time > 0) {
    switch (fmt) {
      case 1:
        return fmtTime(new Date(time), 'yyyy-MM-dd')
      case 2:
        return fmtTime(new Date(time), 'yyyy-MM-dd hh:mm')
      case 3:
        return fmtTime(new Date(time), 'MM月dd日 hh:mm')
      case 4:
        return fmtTime(new Date(time), 'yyyy-MM-dd hh:mm:ss')
      case 5:
        return fmtTime(new Date(time), 'hh:mm')
      case 6:
        return fmtTime(new Date(time), 'hh:mm:ss')
      case 7:
        return fmtTime(new Date(time), 'yyyy年MM月dd日')
      case 8:
        return fmtTime(new Date(time), 'yyyy.MM.dd')
      case 9:
        return fmtTime(new Date(time), 'yyyy/MM/dd')
      default:
        return fmtTime(new Date(time), 'yyyy-MM-dd')
    }
  }
}

/**
 * 处理图片 URL
 * @param {Object} url
 */
export const fmtPicUrl = (url: any) => {
  if (url) {
    if (typeof url === 'string') {
      return url
    } else if (typeof url === 'object') {
      return JSON.stringify(url)
    } else {
      return JSON.parse(url)
    }
  } else {
    return '[]'
  }
}

/**
 * 通过选项及选择的选项获取职业的label
 * @param{Object} arr 职业选项数组
 * @param{Object} val 已选择的职业选项
 */
export const fmtOccupation = (arr: any[], val: string) => {
  const newArr: any = []
  if (arr && arr.length > 0 && val) {
    const selectedVal = JSON.parse(val)
    arr.map((item: any) => {
      if (item.value === selectedVal[0]) {
        newArr.push(item.label)
        item.children.map((data: any) => {
          if (data.value === selectedVal[1]) {
            newArr.push(data.label)
            return
          }
        })
      }
    })
    return newArr
  } else {
    return newArr
  }
}

/**
 * 通过选项及选择的选项获取职业的label
 * @param{Object} arr 职业选项数组
 * @param{Object} val 已选择的职业选项
 * @param{Object} type 回显数据格式，1、 aaa/bbb  2、 bbb
 */
export const fmtOccupationStr = (arr: any[], val: string, type: number) => {
  const newArr = fmtOccupation(arr, val)
  let str = '-'
  if (newArr && newArr.length > 0) {
    if (type === 1) {
      str = newArr[0] + '/' + newArr[1]
    } else if (type === 2) {
      str = newArr[1]
    } else {
      str = newArr[0] + '/' + newArr[1]
    }
  }
  return str
}

/**
 * 获取复核修改记录
 * @param {Array} arr 原数组
 * @param {Object} type 类型：
 * 人口信息、房屋信息、附属物信息、果树信息
 * 坟墓信息、收入信息、安置意愿信息
 */
export const fmtUpdateLog = (arr: any, type: string) => {
  let newArr: any = []
  if (arr && arr.length) {
    newArr = arr.filter((item: any) => item.type === type)
  }
  return newArr
}

/**
 *  判断经纬度是否超出中国境内
 */
export const isLocationOutOfChina = (latitude: number, longitude: number) => {
  if (longitude < 72.004 || longitude > 137.8347 || latitude < 0.8293 || latitude > 55.8271) {
    return true
  }
  return false
}

/**
 *  将WGS-84(国际标准)转为GCJ-02(火星坐标)
 */
export const transformFromWGSToGCJ = (longitude: number, latitude: number) => {
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const ee = 0.00669342162296594323
  const a = 6378245.0
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const pi = 3.14159265358979324

  if (!isLocationOutOfChina(longitude, latitude)) {
    let adjustLat = transformLatWithXY(longitude - 105.0, latitude - 35.0)
    let adjustLon = transformLonWithXY(longitude - 105.0, latitude - 35.0)
    const radLat = (latitude / 180.0) * pi
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    adjustLat = (adjustLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi)
    adjustLon = (adjustLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi)
    latitude = latitude + adjustLat
    longitude = longitude + adjustLon
  }
  return { longitude: longitude, latitude: latitude }
}

/**
 *  将GCJ-02(火星坐标)转为WGS-84
 */
export const transformFromGCJToWGS = (longitude: number, latitude: number) => {
  const threshold = 0.00001

  // The boundary
  let minLng = longitude - 0.5
  let maxLng = longitude + 0.5
  let minLat = latitude - 0.5
  let maxLat = latitude + 0.5

  let delta = 1
  let maxIteration = 30

  while (true) {
    const leftBottom = transformFromWGSToGCJ(minLat, minLng)
    const rightBottom = transformFromWGSToGCJ(minLat, maxLng)
    const leftUp = transformFromWGSToGCJ(maxLat, minLng)
    const midPoint = transformFromWGSToGCJ((minLat + maxLat) / 2, (minLng + maxLng) / 2)
    delta = Math.abs(midPoint.latitude - latitude) + Math.abs(midPoint.longitude - longitude)

    if (maxIteration-- <= 0 || delta <= threshold) {
      return { longitude: (minLng + maxLng) / 2, latitude: (minLat + maxLat) / 2 }
    }

    if (isContains({ latitude: latitude, longitude: longitude }, leftBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2
      maxLng = (minLng + maxLng) / 2
    } else if (isContains({ latitude: latitude, longitude: longitude }, rightBottom, midPoint)) {
      maxLat = (minLat + maxLat) / 2
      minLng = (minLng + maxLng) / 2
    } else if (isContains({ latitude: latitude, longitude: longitude }, leftUp, midPoint)) {
      minLat = (minLat + maxLat) / 2
      maxLng = (minLng + maxLng) / 2
    } else {
      minLat = (minLat + maxLat) / 2
      minLng = (minLng + maxLng) / 2
    }
  }
}

export const isContains = (point: any, p1: any, p2: any) => {
  return (
    point.latitude >= Math.min(p1.latitude, p2.latitude) &&
    point.latitude <= Math.max(p1.latitude, p2.latitude) &&
    point.longitude >= Math.min(p1.longitude, p2.longitude) &&
    point.longitude <= Math.max(p1.longitude, p2.longitude)
  )
}

export const transformLatWithXY = (x: number, y: number) => {
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const pi = 3.14159265358979324
  let lat = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  lat += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
  lat += ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0
  lat += ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) * 2.0) / 3.0
  return lat
}

export const transformLonWithXY = (x: number, y: number) => {
  // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
  const pi = 3.14159265358979324
  let lon = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  lon += ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) / 3.0
  lon += ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0
  lon += ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) * 2.0) / 3.0
  return lon
}
