import { getStorage, StorageKey } from '@/utils'

export const getHeaderCommonParams = () => {
  const token = getStorage(StorageKey.TOKEN)
  const projectId = getStorage(StorageKey.PROJECTID) || 0
  const projectInfo = getStorage(StorageKey.PROJECTINFO) || {}
  const status = projectInfo.status || 'survey' // 阶段， 如 survey 填报、review 复核
  const systemInfo = uni.getSystemInfoSync()
  return {
    Authorization: token,
    'Project-id': projectId,
    'Project-Status': status,
    DeviceType: 'pad',
    AppId: systemInfo.appId,
    AppVersion: systemInfo.appWgtVersion
  }
}

export const locationTypes = [
  {
    label: '淹没区',
    text: '淹没区',
    value: 'SubmergedArea',
    disable: false,
    disabled: false
  },
  {
    label: '建设区',
    text: '建设区',
    value: 'ConstructionArea',
    disable: false,
    disabled: false
  },
  {
    label: '影响区',
    text: '影响区',
    value: 'InfluenceArea',
    disable: false,
    disabled: false
  },
  {
    label: '重叠区',
    text: '重叠区',
    value: 'OverlappingArea',
    disable: false,
    disabled: false
  }
]

export const getLocationText = (key: string) => {
  return locationTypes.find((item) => item.value === key)?.label
}

export const yesAndNoEnums = [
  { text: '是', value: 'true', disable: false },
  { text: '否', value: 'false', disable: false }
]

export const ossDomain = 'https://oss.zdwp.tech/'

// 缓存图片 url: { path : xxx, base64: xxxx }
export const imageUrlAndBase64Map: { [key: string]: any } = {}
