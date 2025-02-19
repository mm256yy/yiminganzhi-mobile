/**
 * 问题反馈 相关的增改功能
 */

import { OtherTableName, OtherDataType } from '@/database'
import { Common } from './common'
import { getCurrentTimeStamp, guid } from '@/utils'
import { OtherController } from '@/controller'
import dayjs from 'dayjs'

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
        const createdDate = dayjs()
        data.uid = uid
        data.createdDate = createdDate
        data.status = '0'
        const list = await OtherController.getOtherWithType(OtherDataType.FeedbackDtoList)
        // list.push(data)
        console.log(list)

        list.unshift(data)
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
        // if (!data.uids) {
        //   reject(false)
        // }
        const createdDate = getCurrentTimeStamp()
        const uid = guid()
        data.uid = uid
        data.createdDate = createdDate
        const list = await OtherController.getOtherWithType(OtherDataType.FeedbackDtoList)
        list.forEach((item: any) => {
          if (item.uid == data.uids) {
            console.log('进入1', item)
            if (item.hasOwnProperty('feedbackMessageList')) {
              // item.feedbackMessageList = []
              console.log('进入2')
              item.feedbackMessageList.push(data)
              if (item.feedbackMessageList.some((items: any) => items.status == '1')) {
                item.status = '1'
                item.statusText = '已处理'
              }
            } else {
              item.feedbackMessageList = []
              item.feedbackMessageList.push(data)
              if (item.feedbackMessageList.some((items: any) => items.status == '1')) {
                item.status = '1'
                item.statusText = '已处理'
              }
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
        console.log(res)

        // if (res && res.code) {
        //   reject(false)
        //   return
        // }
        // resolve(true)
        res ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateVillage-error')
        reject(false)
      }
    })
  }
}

export const FeedbackDtoListController = new FeedbackDto()
