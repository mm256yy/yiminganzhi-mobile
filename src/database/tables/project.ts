/**
 * 项目表字段定义
 */

export interface ProjectDDLType {
  id: number
  content: string
  updatedDate: string
}

export const ProjectTableName = 'project'

export const ProjectDDL = `
create table if not exists ${ProjectTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
