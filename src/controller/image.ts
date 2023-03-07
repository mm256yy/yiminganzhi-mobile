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
        if (!data || !data.file || !data.url) {
          reject(false)
          console.log('文件缺失')
          return
        }
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
              console.log('插入数据失败')
            })
        })
      } catch (error) {
        console.log(error, 'Image-add-error')
        reject(false)
      }
    })
  }

  batchAddImg(files: Pick<ImageDDLType, 'file' | 'url'>[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!files || !files.length) {
          reject(false)
          console.log('文件列表为空')
          return
        }
        // 串行
        let chain = Promise.resolve<any>(null)
        files.forEach((file) => {
          chain = chain.then(() => this.add(file))
        })
        chain
          .then(() => {
            resolve(true)
          })
          .catch(() => {
            reject(false)
            console.log('批量插入失败')
            return
          })
      } catch (error) {
        console.log(error, 'Image-batchAddImg-error')
        reject(false)
      }
    })
  }
}

export const ImageController = new Image()
