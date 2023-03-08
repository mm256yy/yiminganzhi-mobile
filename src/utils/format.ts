import { getStorage, StorageKey } from '@/utils'

/**
 * 枚举数据处理
 * @param(Array) arr 枚举数据列表
 * @param(Object) val 枚举的 value 值
 */
export const dictOption = (arr: any, val: any) => {
  let str = '-'
  arr.map((item: any) => {
    if (item.value === 'true') {
      if (item.value === val.toString()) {
        str = item.text
      }
    } else {
      if (item.value === val) {
        str = item.text
      }
    }
  })
  return str
}

/**
 * 字典回显处理
 * 1、字典的 value 不为空或存在时，取字典表中对应的 text
 * 2、字典的 value 值为控或不存在时，显示 '-'
 * @param(Object) value 字典 value
 * @param(Object) id 对应字典的 id
 */
export const formatDict = (value: any, id: number) => {
  let str = ''
  // 获取数据字典
  const dict = getStorage(StorageKey.DICT)
  if (value) {
    const arr: any = dict[id]
    arr.map((item: any) => {
      if (String(item.value) === String(value)) {
        str = item.text
      }
    })
    return str
  } else {
    return '-'
  }
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
