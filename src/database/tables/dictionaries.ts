/**
 * 农户表字段定义
 */

export interface DictionariesDDLType {
  id: number
  content: string
  updatedDate: string
}

export const DictionariesTableName = 'dictionaries'

export const DictionariesDDL = `
create table if not exists ${DictionariesTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
