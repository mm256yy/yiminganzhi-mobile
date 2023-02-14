/**
 * 其他表字段定义
 * 此表主要存放 一些不好分类的离线数据 根据类型区分
 */

export interface OtherDDLType {
  id: number
  content: string
  type: 'tree' | ''
  updatedDate: string
}

export const OtherTableName = 'collect'

export const OtherDDL = `
create table if not exists ${OtherTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'type' text,
  'updatedDate' text DEFAULT NULL
);
`
