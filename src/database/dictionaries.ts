/**
 * 农户表字段定义
 */

const TableName = 'dictionaries'

export const DictionariesDDL = `
CREATE TABLE IF NOT EXISTS ${TableName} (
  'id' bigint NOT NULL AUTO_INCREMENT,
  'content' text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '数据内容',
  'createdDate' datetime(6) DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='字典列表';
`
