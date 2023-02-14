/**
 * 提供项目相关的增删改查功能
 */

import { ProjectTableName, ProjectDDLType } from '@/database'
import { Common } from './common'
import { ProjectType } from '@/types/common'

class Project extends Common {
  constructor() {
    super()
  }
  async getList() {
    try {
      const sql = `select * from ${ProjectTableName}`
      const list: ProjectDDLType[] = await this.db.selectSql(sql)
      if (list && Array.isArray(list)) {
        const array: ProjectType[] = []
        list.forEach((item) => {
          array.push(JSON.parse(item.content))
        })
      }
    } catch (error) {
      console.log(error, 'project-get-list-error')
    }
  }
}

export const ProjectController = new Project()
