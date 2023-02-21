import { CollectController, OtherController } from '@/controller'
import { OtherDataType } from '@/database'

export const getListApi = () => {
  return CollectController.getList()
}

export const getPullTimeApi = () => {
  return OtherController.getOtherWithType(OtherDataType.PullTime)
}
