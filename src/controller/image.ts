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

  add(data: Pick<ImageDDLType, 'file' | 'url'>) {
    // url: string
    // file: any
    // base64: string
    // status: '0' | '1'
    // updatedDate: string
    return new Promise(async (resolve, reject) => {
      try {
        const fields = `'status','url','file','base64','updatedDate'`
        let base64 = ''
        const reader = new FileReader()
        reader.readAsDataURL(data.file)
        reader.addEventListener('load', () => {
          base64 = reader.result as string
          const values = `'0','${data.url}','${data.file}','${base64}','${dayjs().valueOf()}'`
          this.db
            .insertTableData(ImageTableName, values, fields)
            .then(() => {
              resolve(true)
            })
            .catch(() => {
              reject(false)
            })
        })
      } catch (error) {
        console.log(error, 'Image-get-list-error')
        reject(false)
      }
    })
  }

  batchAddImg(files: Pick<ImageDDLType, 'file' | 'url'>[]) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!files || !files.length) {
          reject()
          return
        }
        files.forEach((file) => {
          this.add(file)
        })
      } catch (error) {
        console.log(error, 'Image-get-list-error')
        reject(false)
      }
    })
  }
}

export const ImageController = new Image()
