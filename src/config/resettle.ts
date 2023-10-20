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

// 宅基地安置区块
export const resettleArea = [
  {
    id: '1',
    name: '曙光安置区'
  },
  {
    id: '2',
    name: '镜岭集镇安置区'
  }
]

// 公寓安置地块
export const apartmentArea = [
  {
    id: '3',
    name: '棠村安置区'
  },
  {
    id: '4',
    name: '麻家田安置区'
  },
  {
    id: '5',
    name: '东坪安置区'
  }
]

export const resettleHouseType = [
  {
    value: 'homestead',
    text: '宅基地',
    disabled: false
  },
  {
    value: 'flat',
    text: '公寓房',
    disabled: false
  },
  {
    value: 'oneself',
    text: '自谋出路',
    disabled: false
  },
  {
    value: 'concentrate',
    text: '集中供养',
    disabled: false
  }
]

// 宅基地面积
export const homesteadAreaSize = [
  {
    id: '1',
    name: 48,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 1,
    isSelected: false
  },
  {
    id: '2',
    name: 72,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 3,
    isSelected: false
  },
  {
    id: '3',
    name: 96,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 5,
    isSelected: false
  },
  {
    id: '4',
    name: 120,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 7,
    isSelected: false
  },
  {
    id: '5',
    name: 144,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 9,
    isSelected: false
  },
  {
    id: '6',
    name: 168,
    unit: 'm²',
    disabled: false,
    needPeopleNumber: 11,
    isSelected: false
  }
]

// 公寓

export const apartmentAreaSize = [
  {
    id: '1',
    name: 70,
    unit: 'm²',
    isSelected: false,
    num: 0
  },
  {
    id: '2',
    name: 90,
    unit: 'm²',
    isSelected: false,
    num: 0
  },
  {
    id: '3',
    name: 110,
    unit: 'm²',
    isSelected: false,
    num: 0
  },
  {
    id: '4',
    name: 130,
    unit: 'm²',
    isSelected: false,
    num: 0
  }
]

// 自谋出路
export const selfResettleData = [
  {
    id: 0,
    type: 'compensate',
    title: '补偿费',
    subProject: '房屋补偿补助款',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 3
  },
  {
    id: 1,
    type: 'compensate',
    title: '补偿费',
    subProject: '地面青苗附着物补偿款',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },
  {
    id: 2,
    type: 'compensate',
    title: '补偿费',
    subProject: '宅基地补偿款 (超面积)',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },

  {
    id: 3,
    type: 'subsidy',
    title: '补助费',
    subProject: '建房补助费',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 3
  },
  {
    id: 4,
    type: 'subsidy',
    title: '补助费',
    subProject: '搬迁补助费',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },
  {
    id: 5,
    type: 'subsidy',
    title: '补助费',
    subProject: '过渡期生产生活补助款',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },

  {
    id: 6,
    type: 'reward',
    title: '奖励费',
    subProject: '签订动迁安置协议奖励',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 5
  },
  {
    id: 7,
    type: 'reward',
    title: '奖励费',
    subProject: '房屋腾空奖励',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },
  {
    id: 8,
    type: 'reward',
    title: '奖励费',
    subProject: '启动建房奖励',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },
  {
    id: 9,
    type: 'reward',
    title: '奖励费',
    subProject: '完成建房奖励',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  },
  {
    id: 10,
    type: 'reward',
    title: '奖励费',
    subProject: '搬迁入驻奖励',
    unit: 'm²',
    number: 2,
    costPrice: 1000,
    totalPrice: 22222,
    rowspan: 0
  }
]
