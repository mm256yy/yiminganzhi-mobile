/**
 * 图片 相关的增删改查功能
 */

import { ImageTableName, ImageDDLType } from '@/database'
import dayjs from 'dayjs'
import { Common } from './common'

class Image extends Common {
  constructor() {
    super()
  }

  getList(): Promise<ImageDDLType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${ImageTableName}`
        const list: ImageDDLType[] = await this.db.selectSql(sql)
        resolve(list)
      } catch (error) {
        console.log(error, 'Image-get-list-error')
        reject([])
      }
    })
  }

  add(data: ImageDDLType) {
    // url: string
    // file: string
    // base64: string
    // status: '0' | '1'
    // updatedDate: string
    return new Promise(async (resolve, reject) => {
      try {
        const fields = `'status','url','file','base64','updatedDate'`
        const base64 = ''
        const values = `'0','${data.url}','${data.file}','${base64}','${dayjs().valueOf()}'`
        const res = await this.db.insertTableData(ImageTableName, values, fields)
        resolve(res)
      } catch (error) {
        console.log(error, 'Image-get-list-error')
        reject([])
      }
    })
  }
}

export const ImageController = new Image()
