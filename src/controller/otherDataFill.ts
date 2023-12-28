/**
 * 问题反馈 相关的增改功能
 */

import { OtherTableName, OtherDataType } from '@/database'
import { Common } from './common'
import { getCurrentTimeStamp, guid } from '@/utils'
class FeedbackDto extends Common {
  constructor() {
    super()
  }

  // 问题反馈 新增
  addFeedbackDtoList(data:any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const uid = guid()
        data.uid = uid
        const fields = `'id','type','content','updatedDate'`
        const values = `'${uid}','${OtherDataType.FeedbackDtoList}','${JSON.stringify(
          data
        )}','${getCurrentTimeStamp()}'`
        const res = await this.db.insertTableData(OtherTableName, values, fields)
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'addVillage-error')
        reject(false)
      }
    })
  }

  // 问题反馈修改
  updateFeedbackDtoList(data:any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const values = `type = '${OtherDataType.FeedbackDtoList}',',content = '${JSON.stringify(data)}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${OtherTableName} set ${values} where id = '${data.uid}'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateVillage-error')
        reject(false)
      }
    })
  }

}

export const FeedbackDtoListController = new FeedbackDto()
