// 项目类型定义
export type ProjectType = {
  id: number
  name: string
  description?: string
  dingCorpId?: number
  showName: string
  reservoirCode: string
  projectType: string
  townCode: string
  reservoirName: string
  districtTree: string[]
}

// 家庭收入配置类型定义
export type FamilyIncomeConfigType = {
  id?: number
  name: string
  type: string
  sort: string
}

// 安置意愿配置信息
export type WillConfigType = {
  id: number
  projectId: number
  type: string
  way: string
  area: string
}

// 附属物配置信息
export type AppendantType = {
  id?: number
  name: string
  size: string
  unit: string
}

// 字典类型定义
export type DictConfigType = {
  id: number
  dictId: number
  projectId: number
  label: string
  value: string
  sort: number
}

// 数据统计 类型定义
export type CollectType = {
  [key: string]: any
}

// 其他 类型定义
export type OtherType = {
  [key: string]: any
}
