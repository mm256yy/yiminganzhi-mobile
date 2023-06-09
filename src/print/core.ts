const pdfMake = require('@/static/js/pdfmake.min.js')
const pdfFonts = require('@/static/js/vfs_fonts.js')
import { LandlordType } from '@/types/sync'
import { logo } from './config'
import {
  getPeopleHouseDefinition,
  getPeopleInfoDefinition,
  getCompanyBaseDefinition,
  getSelfemployedBaseDefinition,
  getSelfemployedEquipmentDefinition,
  getSelfemployedHouseDefinition,
  getSelfemployedInfoDefinition,
  getCollectiveInfoDefinition,
  getCollectiveHouseDefinition
} from './templates'
import { ProjectType } from '@/types/common'
;(pdfMake as any).vfs = pdfFonts.vfs
;(pdfMake as any).fonts = {
  // Roboto: {
  //   normal: 'Roboto-Regular.ttf',
  //   bold: 'Roboto-Regular.ttf',
  //   italics: 'Roboto-Regular.ttf',
  //   bolditalics: 'Roboto-Regular.ttf'
  // },
  PingFang: {
    normal: 'PingFang.ttf',
    bold: 'PingFang.ttf',
    italics: 'PingFang.ttf',
    bolditalics: 'PingFang.ttf'
  }
}

class PrintCore {
  public pdfMake
  public baseConfig: any

  constructor() {
    this.pdfMake = pdfMake
    this.baseConfig = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        font: 'PingFang',
        fontSize: 8,
        color: 'black',
        alignment: 'center'
      },
      styles: {
        // td垂直居中 22: 7 21 28  18: 5 10 15
        td: {
          margin: [0, 0, 0, 0]
        },
        td_2: {
          margin: [0, 10, 0, 0]
        },
        td_3: {
          margin: [0, 15, 0, 0]
        },
        td_5: {
          margin: [0, 25, 0, 0]
        }
      },
      pageMargins: [20, 60, 20, 50],
      header: function (currentPage: number, pageCount: number) {
        return [
          {
            alignment: 'justify',
            columns: [
              {
                text: `${currentPage}/${pageCount}`,
                margin: [20, 20, 0, 0],
                alignment: 'left'
              },
              {
                image: logo,
                width: 240,
                margin: [0, 10, 10, 0],
                alignment: 'right'
              }
            ]
          }
        ]
      }
    }
  }

  public getBase64(definition: any): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const pdfMakeRes = this.pdfMake
          .createPdf({
            ...this.baseConfig,
            ...definition
          })
          .getDataUrl()
          .then(
            (res: string) => {
              if (res) {
                resolve(res)
              } else {
                reject()
              }
            },
            (err: any) => {
              reject()
            }
          )
      } catch (error) {
        reject(error)
      }
    })
  }

  // 创建居民户相关的pdf配置信息
  public createPeople(
    templateIds: number[],
    landlord: LandlordType,
    projectInfo: ProjectType
  ): Promise<string | string[]> {
    /**
     * 两个模版
     * 1.房屋示意图
     * 2.基本信息
     */
    return new Promise(async (resolve, reject) => {
      try {
        if (!templateIds || !templateIds.length) {
          reject('模版信息为空')
          return
        }
        if (!landlord) {
          reject('业主信息为空')
          return
        }
        const stringArray: string[] = []
        if (templateIds.includes(1)) {
          const definition = getPeopleInfoDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成居民户基本信息pdf失败')
            console.error('生成居民户基本信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(2)) {
          const definition = getPeopleHouseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成居民户房屋示意图pdf失败')
            console.error('生成居民户房屋示意图pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (stringArray.length) {
          resolve(stringArray)
          return
        }
        reject('createPeople失败')
      } catch (err) {
        console.log('err', err)
        reject('createPeople错误')
      }
    })
  }

  // 创建个体户相关的pdf配置信息
  public createSelfemployed(
    templateIds: number[],
    landlord: LandlordType,
    projectInfo: ProjectType
  ): Promise<string | string[]> {
    /**
     * 四个模版
     * 1.基本信息
     * 2.调查信息
     * 3.房屋示意图
     * 4.设施设备
     */
    return new Promise(async (resolve, reject) => {
      try {
        if (!templateIds || !templateIds.length) {
          reject('模版信息为空')
          return
        }
        if (!landlord) {
          reject('业主信息为空')
          return
        }
        const stringArray: string[] = []
        if (templateIds.includes(200)) {
          const definition = getSelfemployedBaseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成个体户基本信息pdf失败')
            console.error('生成个体户基本信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(201)) {
          const definition = getSelfemployedInfoDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成个体户调查信息pdf失败')
            console.error('生成个体户调查信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(202)) {
          const definition = getSelfemployedHouseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成个体户房屋示意图pdf失败')
            console.error('生成个体户房屋示意图pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(203)) {
          const definition = getSelfemployedEquipmentDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成个体户设施设备pdf失败')
            console.error('生成个体户设施设备pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (stringArray.length) {
          resolve(stringArray)
          return
        }
        reject('createSelfemployed失败')
      } catch (err) {
        console.error('err', err)
        reject('createSelfemployed错误')
      }
    })
  }

  // 创建公司相关的pdf配置信息
  public createCompany(
    templateIds: number[],
    landlord: LandlordType,
    projectInfo: ProjectType
  ): Promise<string | string[]> {
    /**
     * 四个模版
     * 1.基本信息
     * 2.调查信息
     * 3.房屋示意图
     * 4.设施设备
     */
    return new Promise(async (resolve, reject) => {
      try {
        if (!templateIds || !templateIds.length) {
          reject('模版信息为空')
          return
        }
        if (!landlord) {
          reject('业主信息为空')
          return
        }
        const stringArray: string[] = []
        if (templateIds.includes(100)) {
          const definition = getCompanyBaseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成企业基本信息pdf失败')
            console.error('生成企业基本信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(101)) {
          const definition = getSelfemployedInfoDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成企业调查信息pdf失败')
            console.error('生成企业调查信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(102)) {
          const definition = getSelfemployedHouseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成企业房屋示意图pdf失败')
            console.error('生成企业房屋示意图pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(103)) {
          const definition = getSelfemployedEquipmentDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成企业设施设备pdf失败')
            console.error('生成企业设施设备pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (stringArray.length) {
          resolve(stringArray)
          return
        }
        reject('createCompany失败')
      } catch (err) {
        console.error('err', err)
        reject('createCompany错误')
      }
    })
  }

  // 创建村集体相关的pdf配置信息
  public createCollective(
    templateIds: number[],
    landlord: LandlordType,
    projectInfo: ProjectType
  ): Promise<string | string[]> {
    /**
     * 2个模版
     * 1.基本信息
     * 2.房屋信息
     */
    return new Promise(async (resolve, reject) => {
      try {
        if (!templateIds || !templateIds.length) {
          reject('模版信息为空')
          return
        }
        if (!landlord) {
          reject('业主信息为空')
          return
        }
        const stringArray: string[] = []
        if (templateIds.includes(300)) {
          const definition = getCollectiveInfoDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成村集体基本信息pdf失败')
            console.error('生成村集体基本信息pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (templateIds.includes(301)) {
          const definition = getCollectiveHouseDefinition(landlord, projectInfo)
          const dataUrl = await this.getBase64(definition).catch(() => {
            reject('生成村集体房屋示意图pdf失败')
            console.error('生成村集体房屋示意图pdf失败')
            return
          })
          if (dataUrl) {
            stringArray.push(dataUrl)
          }
        }
        if (stringArray.length) {
          resolve(stringArray)
          return
        }
        reject('createCollective失败')
      } catch (err) {
        console.log('err', err)
        reject('createCollective错误')
      }
    })
  }
}

export const printPdf = new PrintCore()
