/**
 * 图片 表字段定义
 */

export interface ImageDDLType {
  id: number
  url: string
  name: string
  base64: string
  status: 'default' | 'modify'
  updatedDate: string
}

export const ImageTableName = 'image'

export const ImageDDL = `
create table if not exists ${ImageTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'url' text,
  'name' text,
  'base64' text,
  'status' text,
  'updatedDate' text DEFAULT NULL
);
`
