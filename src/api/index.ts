import { request } from '@/utils'
import { TemplateParamsType } from '@/types/datafill'

export const login = () => {
  return request.post({
    url: '/sss',
    data: {}
  })
}

export const getPrintTemplateListApi = (data: Partial<TemplateParamsType>): Promise<any> => {
  return request.get({
    url: `/import_template`,
    data
  })
}

/**
 * 打印/下载
 */
export const printLandlordApi = (
  templateIds: Array<number | string>,
  peasantHouseholdIds: number[]
): Promise<any> => {
  return request.post({
    url: `/peasantHousehold/printPad`,
    data: {
      templateIds: templateIds.join(','),
      peasantHouseholdIds: peasantHouseholdIds.join(',')
    }
  })
}
