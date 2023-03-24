const pdfMake = require('@/static/js/pdfmake.min.js')
const pdfFonts = require('@/static/js/vfs_fonts.js')
import { LandlordType } from '@/types/sync'
;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs
;(pdfMake as any).fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Regular.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf'
  },
  fangzhen: {
    normal: 'fzhei-jt.TTF',
    bold: 'fzhei-jt.TTF',
    italics: 'fzhei-jt.TTF',
    bolditalics: 'fzhei-jt.TTF'
  }
}

class PrintCore {
  public pdfMake
  public lineCount: number
  public baseConfig: any

  constructor() {
    this.lineCount = 30
    this.pdfMake = pdfMake
    this.baseConfig = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      defaultStyle: {
        font: 'fangzhen',
        fontSize: 14
      }
    }
  }

  // 创建居民户相关的pdf配置信息
  public createPeople(templateIds: string[], landlord: LandlordType) {
    /**
     * 两个模版
     * 1.房屋示意图
     * 2.基本信息
     */
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }

  // 创建个体户相关的pdf配置信息
  public createSelfemployed() {
    /**
     * 四个模版
     * 1.基本信息
     * 2.商户信息
     * 3.房屋信息
     * 4.设施设备
     */
    return new Promise((resolve, reject) => {})
  }

  // 创建公司相关的pdf配置信息
  public createCompany() {
    /**
     * 四个模版
     * 1.基本信息
     * 2.商户信息
     * 3.房屋信息
     * 4.设施设备
     */
    return new Promise((resolve, reject) => {})
  }
}

export const printPdf = new PrintCore()
