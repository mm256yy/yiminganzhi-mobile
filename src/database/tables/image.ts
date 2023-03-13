/**
 * 图片 表字段定义
 */
// status 0 未上传 1 已上传
export interface ImageDDLType {
  id: number
  path: string
  url: string
  status: '0' | '1'
  updatedDate: string
}

export const ImageTableName = 'image'

export const ImageDDL = `
create table if not exists ${ImageTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'path' text,
  'url' text,
  'status' text,
  'updatedDate' text DEFAULT NULL
);
`
