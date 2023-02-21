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
  getList(): Promise<ProjectType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: ProjectType[] = []
        const sql = `select * from ${ProjectTableName}`
        const list: ProjectDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'project-get-list-error')
        reject([])
      }
    })
  }
}

export const ProjectController = new Project()
