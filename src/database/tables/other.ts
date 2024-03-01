/**
 * 其他表字段定义
 * 此表主要存放 一些不好分类的离线数据 根据类型区分
 */
export enum OtherDataType {
  MainTree = 'tree', // 主树 镇/行政/自然/农户
  DistrictTree = 'districtTree', // 街道树
  PullTime = 'pullTime', // 同步时间
  ProfessionalTree = 'professionalTree', // 专业树
  Top5 = 'top5', // top5
  ChooseConfig = 'chooseConfig', // 	地块等配置
  HouseConfig = 'houseConfig', // 幢号房号配置
  ImmigrantCompensationCardConfig = 'immigrantCompensationCardConfig', // 移民建卡配置
  ImpHomeCollect = 'impHomeCollect', // 实施阶段首页统计
  RankDtoList = 'rankDtoList', // 首页排行榜
  FeedbackDtoList = 'feedbackDtoList', // 问题反馈
  PgTop = 'pgTop', //TOP5首页排行榜
  EvaluatorStatisticsDto = 'evaluatorStatisticsDto', //资产评估首页
  settleAddressList = 'settleAddressList', //安置点详情
  notifyDtoList = 'notifyDtoList', // 消息通知
  landEstimateDtoList = 'landEstimateDtoList', //土地列表
  landPeasantHouseholdDtoList = 'landPeasantHouseholdDtoList' //土地关联的用户（企业，村集体，居民户，只征地不搬迁）
}

export interface OtherDDLType {
  id: number
  content: string
  type: OtherDataType
  updatedDate: string
}

export const OtherTableName = 'other'

export const OtherDDL = `
create table if not exists ${OtherTableName} (
  'content' text,
  'type' text PRIMARY KEY,
  'updatedDate' text DEFAULT NULL
);
`
