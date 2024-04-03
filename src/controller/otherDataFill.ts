/**
 * 问题反馈 相关的增改功能
 */

import { OtherTableName, OtherDataType } from '@/database'
import { Common } from './common'
import { getCurrentTimeStamp, guid } from '@/utils'
import { OtherController } from '@/controller'
class FeedbackDto extends Common {
  constructor() {
    super()
  }

  // 问题反馈 新增
  addFeedbackDtoList(data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const uid = guid()
        const createdDate = getCurrentTimeStamp()
        data.uid = uid
        data.createdDate = createdDate
        const list = await OtherController.getOtherWithType(OtherDataType.FeedbackDtoList)
        list.push(data)
        const values = `content='${JSON.stringify(list)}',updatedDate='${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(
          OtherTableName,
          values,
          'type',
          OtherDataType.FeedbackDtoList
        )
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

  // 问题反馈中意见评论新增
  updateFeedbackDtoList(data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data.uid) {
          reject(false)
        }
        const createdDate = getCurrentTimeStamp()
        data.createdDate = createdDate
        const list = await OtherController.getOtherWithType(OtherDataType.FeedbackDtoList)
        list.forEach((item: any) => {
          if (item.uid === data.uid) {
            if (item.hasOwnProperty('feedbackMessageList')) {
              item.feedbackMessageList = []
              item.feedbackMessageList.push(data)
            }
          }
        })
        const values = `content='${JSON.stringify(list)}',updatedDate='${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(
          OtherTableName,
          values,
          'type',
          OtherDataType.FeedbackDtoList
        )
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
