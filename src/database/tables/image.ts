/**
 * 图片 表字段定义
 */
// status 0 未上传 1 已上传||下载的
export interface ImageDDLType {
  id: number
  url: string
  status: '0' | '1'
  base64: string
  path: string
  updatedDate: string
}

export const ImageTableName = 'image'

export const ImageDDL = `
create table if not exists ${ImageTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'url' text,
  'status' text,
  'path' text,
  'base64' text,
  'updatedDate' text DEFAULT NULL
);
`
