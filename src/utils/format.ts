import { getStorage, StorageKey } from '@/utils'

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
  // 获取数据字典
  const dict = getStorage(StorageKey.DICT)
  if (value) {
    console.log('value:', value)
    return dict[id][value].text
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
