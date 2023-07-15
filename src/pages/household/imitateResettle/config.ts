export const resettleWay1 = [
  {
    text: '定点有土安置',
    value: 1
  },
  {
    text: '自谋职业安置',
    value: 2
  },
  {
    text: '自谋出路安置',
    value: 3
  },
  {
    text: '养老保险安置',
    value: 4
  }
]

// 非农生成安置方式
export const resettleWay2 = [
  {
    text: '无土公寓安置',
    value: 5
  },
  {
    text: '集中供养安置',
    value: 6
  },
  {
    text: '投亲靠友安置',
    value: 7
  },
  {
    text: '人户一致安置',
    value: 8
  }
]

export const resettleArea = [
  {
    id: 1,
    name: '曙光安置区'
  },
  {
    id: 2,
    name: '东坪安置区'
  }
]

// 宅基地面积
export const homesteadAreaSize = [
  {
    id: 1,
    name: 65,
    unit: 'm²（小户）',
    isSelected: false
  },
  {
    id: 2,
    name: 105,
    unit: 'm²（中户）',
    isSelected: false
  },
  {
    id: 3,
    name: 125,
    unit: 'm²（大户）',
    isSelected: false
  }
]

// 公寓

export const apartmentAreaSize = [
  {
    id: 1,
    name: 65,
    unit: 'm²',
    isSelected: false,
    num: null
  },
  {
    id: 2,
    name: 85,
    unit: 'm²',
    isSelected: false,
    num: null
  },
  {
    id: 3,
    name: 110,
    unit: 'm²',
    isSelected: false,
    num: null
  },
  {
    id: 4,
    name: 140,
    unit: 'm²',
    isSelected: false,
    num: null
  }
]

// 安置方案 基础信息
export const baseInfoDefault: {
  isSelected: boolean

  homesteadResettleNum: number | null
  homesteadResettleRegion: number | null
  homesteadResettleArea: number | null
  homesteadResettleLayersCount: number | null
  homesteadResettlePrice: number | null

  apartmentResettleNum: number | null
  apartmentResettleRegion: number | null
  apartmentResettleArea: any[] // 公寓安置面积

  noResettleNum: number | null

  homesteadBuildPrice: number
  apartmentBuyPrice: number
  subsidyCompensatePrice: number
  cropsCompensatePrice: number
  homesteadCompensatePrice: number

  buildHouseSubsidyPrice: number
  relocateSubsidyPrice: number
  lifeSubsidyPrice: number

  signAgreementRewardPrice: number
  houseEmptyRewardPrice: number
  startBuildHouseRewardPrice: number
  endBuildHouseRewardPrice: number
  moveInHouseRewardPrice: number
} = {
  // 是否选择该方案
  isSelected: false,

  homesteadResettleNum: null, // 宅基地安置人数
  homesteadResettleRegion: null, // 宅基地安置地块
  homesteadResettleArea: null, // 宅基地安置面积
  homesteadResettleLayersCount: null, // 宅基地建房层数
  homesteadResettlePrice: null, // 宅基地建房预估单价

  apartmentResettleNum: null, // 公寓安置人数
  apartmentResettleRegion: null, // 公寓安置地块
  apartmentResettleArea: [], // 公寓安置面积

  noResettleNum: null, // 无需搬迁安置人数

  homesteadBuildPrice: 185000, // 宅基地建安费
  apartmentBuyPrice: 100000, // 公寓购房金
  subsidyCompensatePrice: 1500, // 补偿补助
  cropsCompensatePrice: 1200, // 土地青苗补助
  homesteadCompensatePrice: 1000, // 宅基地补偿

  buildHouseSubsidyPrice: 1500, // 建房补助费
  relocateSubsidyPrice: 1200, // 搬迁补助费
  lifeSubsidyPrice: 1000, // 生活补助费

  signAgreementRewardPrice: 1500, // 签协议奖励费
  houseEmptyRewardPrice: 1200, // 房屋腾空奖励费
  startBuildHouseRewardPrice: 1000, // 启动建房奖励费
  endBuildHouseRewardPrice: 2400, // 结束建房奖励费
  moveInHouseRewardPrice: 3600 // 房屋腾空奖励费
}
