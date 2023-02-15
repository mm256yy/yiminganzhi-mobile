/**
 * 家庭收入配置表字段定义
 */

export interface FamilyIncomeDDLType {
  id: number
  content: string
  updatedDate: string
}

export const FamilyIncomeTableName = 'family_income'

export const FamilyIncomeDDL = `
create table if not exists ${FamilyIncomeTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
