import { MainType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

// 基础配置-字体
;(pdfMake as any).vfs = pdfFonts.pdfMake.vfs

class PrintCore {
  public pdfMake
  public lineCount: number
  public config: {
    type: MainType
    uids: string[]
    templateIds: string[]
  }

  constructor() {
    this.lineCount = 30
    this.pdfMake = pdfMake
    this.config = {
      type: MainType.PeasantHousehold,
      uids: [],
      templateIds: []
    }
  }

  // 创建居民户相关的pdf配置信息
  public createPeople(templateIds: string[], landlord: LandlordType) {
    /**
     * 两个模版
     * 1.房屋示意图
     * 2.基本信息
     */
  }

  // 创建个体户相关的pdf配置信息
  public createSelfemployed() {}

  // 创建公司相关的pdf配置信息
  public createCompany() {}
}

export const printPdf = new PrintCore()
