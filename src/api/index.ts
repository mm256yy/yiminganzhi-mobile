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

// 获取职业字典表数据
export const getOccpationDict = (name: string): Promise<any> => {
  return request.get({
    url: `/dict/tree`,
    data: {
      name
    }
  })
}

// 获取复核修改记录
export const getUpdateLogApi = (data: Partial<any>): Promise<any> => {
  return request.get({
    url: `/updateLog`,
    data
  })
}
