/**
 * 打印相关的
 * 模版列表
 * 生成pdf
 */
import { templates } from '@/config'
import { Landlord } from './landlord'
import { PrintType } from '@/types/common'

class Print extends Landlord {
  public templates: any[]

  constructor() {
    super()
    this.templates = templates
  }

  // 获取模版列表
  getTemplateList(type: PrintType) {
    return this.templates.filter((item) => item.templateType === type)
  }

  // 获取pdf
  getPdf(printPdf: any, peasantHouseholdIds: string[], templateIds: number[], type: PrintType) {
    return new Promise(async (resolve, reject) => {
      if (!peasantHouseholdIds || !peasantHouseholdIds.length) {
        reject('peasantHouseholdIds数据为空')
        return
      }
      if (!templateIds || !templateIds.length) {
        reject('templateIds数据为空')
        return
      }

      try {
        // 拿到业主详情
        // 根据模版id生成对应的pdf 拿到base64

        const landlordArray = await this.getLandlordByUidWithPrint(peasantHouseholdIds, templateIds)
        if (!landlordArray || !landlordArray.length) {
          reject('业主信息为空')
          return
        }
        const promiseArray: any[] = []
        landlordArray.forEach((landlord) => {
          if (type === PrintType.print) {
            promiseArray.push(printPdf.createPeople(templateIds, landlord))
          } else if (type === PrintType.printIndividualHousehold) {
            promiseArray.push(printPdf.createSelfemployed(templateIds, landlord))
          } else if (type === PrintType.printCompany) {
            promiseArray.push(printPdf.createCompany(templateIds, landlord))
          } else if (type === PrintType.printCollective) {
            promiseArray.push(printPdf.createCollective(templateIds, landlord))
          }
        })
        // 并行生成
        Promise.all(promiseArray)
          .then((result: any[]) => {
            // [['',''], ['', '']] 两个业主返回的数据结构
            // [['']] 单个业主 单个模版的数据结构
            resolve(result)
          })
          .catch(() => {
            reject([])
          })
      } catch (error) {
        console.error(error)
      }
    })
  }
}

export const PrintController = new Print()
