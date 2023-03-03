/**
 * 图片 表字段定义
 */
// status 0 未上传 1 已上传
export interface ImageDDLType {
  id: number
  url: string
  file: string
  base64: string
  status: '0' | '1'
  updatedDate: string
}

export const ImageTableName = 'image'

export const ImageDDL = `
create table if not exists ${ImageTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'url' text,
  'file' text,
  'base64' text,
  'status' text,
  'updatedDate' text DEFAULT NULL
);
`
