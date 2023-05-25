/**
 * 图片 相关的增删改查功能
 */

import { ImageTableName, ImageDDLType } from '@/database'
import dayjs from 'dayjs'
import { Common } from './common'
import { pathToBase64 } from 'image-tools'
import { ImgItemType } from '@/types/sync'

class Image extends Common {
  public imgs: ImgItemType[]
  constructor() {
    super()
    this.imgs = []
  }

  getList(): Promise<ImageDDLType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${ImageTableName} where status = '1'`
        const list: ImageDDLType[] = await this.db.selectSql(sql)
        resolve(list)
      } catch (error) {
        console.log(error, 'Image-get-list-error')
        reject([])
      }
    })
  }

  /** 图片转出base64 */
  private imgPathTobase64Batch(imgPathAndUrls: ImgItemType[]): Promise<ImgItemType[]> {
    return new Promise((resolve, reject) => {
      if (!imgPathAndUrls || !imgPathAndUrls.length) {
        reject([])
        return
      }
      Promise.all(imgPathAndUrls.map((item) => pathToBase64(item.path)))
        .then((res) => {
          // [base64, base64...]
          // 按照顺序组成需要的数据
          if (res && res.length) {
            const result = imgPathAndUrls.map((item, index) => {
              item.base64 = res[index]
              return item
            })
            // 拿到base64后 第二次赋值
            this.imgs = result
            resolve(result)
          } else {
            reject([])
          }
        })
        .catch((error) => {
          console.error('图片转出base64:', error)
          reject([])
        })
    })
  }

  private doneSave(localPaths: ImgItemType[]): Promise<boolean> {
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
        // 不存储base64
        const fields = `'status','path','url','base64','updatedDate'`
        const values = `'0','${item.path}','${item.url}','${''}','${dayjs().valueOf()}'`
        this.db.insertTableData(ImageTableName, values, fields).catch((err) => {
          console.log(err, '上传err')
        })
      })
      await this.db.transaction('commit').catch(() => {
        resolve(false)
      })
      resolve(true)
    })
  }

  batchAddImg(files: string[]): Promise<ImgItemType[]> {
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
                const imgPathAndUrls = localPaths
                  .filter((item) => !!item)
                  .map((item) => {
                    return {
                      url: '',
                      base64: '',
                      path: item
                    }
                  })
                // 第一次赋值
                _that.imgs = imgPathAndUrls
                _that
                  .imgPathTobase64Batch(imgPathAndUrls)
                  .then((res) => _that.doneSave(res))
                  .then((res) => {
                    if (res) {
                      // 存入数据库成功
                      console.log('图片：存入数据库成功')
                      resolve(_that.imgs)
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
