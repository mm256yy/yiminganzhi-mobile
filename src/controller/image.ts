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

  private doneSave(localPaths: string[]) {
    console.log('localPaths:', localPaths)
    return new Promise(async (resolve) => {
      if (!localPaths || !localPaths.length) {
        resolve(false)
        return
      }
      await this.db.transaction('begin').catch(() => {
        resolve(false)
      })
      localPaths.forEach((item) => {
        const fields = `'status','path','url','updatedDate'`
        const values = `'0','${item}','','${dayjs().valueOf()}'`
        this.db.insertTableData(ImageTableName, values, fields)
      })
      await this.db.transaction('commit').catch(() => {
        resolve(false)
      })
      resolve(true)
    })
  }

  batchAddImg(files: string[]): Promise<string[]> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    return new Promise(async (resolve, reject) => {
      try {
        if (!files || !files.length) {
          reject(false)
          console.log('文件列表为空')
          return
        }
        // 本地路径地址存储
        let localPaths: string[] = []
        files.forEach((file, index) => {
          uni.saveFile({
            tempFilePath: file,
            success: function (res) {
              const savedFilePath = res.savedFilePath
              localPaths[index] = savedFilePath
            },
            fail: function () {
              localPaths[index] = ''
            },
            complete: function () {
              if (localPaths.length === files.length) {
                // 此时已经全部转了
                _that
                  .doneSave(localPaths)
                  .then((res) => {
                    if (res) {
                      // 存入数据库成功
                      console.log('图片：存入数据库成功')
                      resolve(localPaths)
                    } else {
                      reject()
                    }
                  })
                  .finally(() => {
                    localPaths = []
                  })
              }
            }
          })
        })
      } catch (error) {
        console.log(error, 'Image-batchAddImg-error')
        reject(false)
      }
    })
  }
}

export const ImageController = new Image()
