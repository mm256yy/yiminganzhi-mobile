import { getStorage, StorageKey } from '@/utils'

export const getHeaderCommonParams = () => {
  const token = getStorage(StorageKey.TOKEN)
  const projectId = getStorage(StorageKey.PROJECTID) || 2
  return {
    Authorization: token,
    'Project-id': projectId,
    DeviceType: 'pad'
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
