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
