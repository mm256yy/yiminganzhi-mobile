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
