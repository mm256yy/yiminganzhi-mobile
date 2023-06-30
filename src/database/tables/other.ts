/**
 * 其他表字段定义
 * 此表主要存放 一些不好分类的离线数据 根据类型区分
 */
export enum OtherDataType {
  MainTree = 'tree', // 主树 镇/行政/自然/农户
  DistrictTree = 'districtTree', // 街道树
  PullTime = 'pullTime', // 同步时间
  ProfessionalTree = 'professionalTree', // 专业树
  Top5 = 'top5' // top5
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
