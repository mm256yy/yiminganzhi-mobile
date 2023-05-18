import { getStorage, StorageKey } from '@/utils'

export const compatibleOldSystems =
  (getStorage(StorageKey.PROJECTINFO) || {}).reservoirCode === 'fxsk'
