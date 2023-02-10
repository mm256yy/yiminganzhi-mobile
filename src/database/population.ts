/**
 * 人口表字段定义
 */

const TableName = 'population'

export const PopulationDDL = `
CREATE TABLE IF NOT EXISTS ${TableName} (
  'id' bigint NOT NULL AUTO_INCREMENT,
  'userId' bigint DEFAULT NULL COMMENT '用户ID',
  'projectId' bigint DEFAULT NULL COMMENT '项目ID',
  'name' text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '用户名',
  'content' text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '数据内容',
  'createdDate' datetime(6) DEFAULT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='人口列表';
`
