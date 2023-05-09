import {
  db,
  LandlordDDL,
  DictionariesDDL,
  FamilyIncomeDDL,
  ResettlementDDL,
  ProjectDDL,
  CollectDDL,
  OtherDDL,
  DistrictDDL,
  VillageDDL,
  AppendantDDL,
  LandlordTableName,
  DictionariesTableName,
  FamilyIncomeTableName,
  ResettlementTableName,
  ProjectTableName,
  CollectTableName,
  OtherTableName,
  DistrictTableName,
  VillageTableName,
  AppendantTableName,
  OtherDataType,
  ImageDDL,
  ImageTableName,
  GraveDDL,
  GraveTableName,
  GraveDDLType
} from '@/database/index'
import { getProjectDataApi, getBaseDataApi, getConfigDataApi, getCollectApi } from './api'
import { StateType, ImgItemType } from '@/types/sync'
import { getCurrentTimeStamp, setStorage, StorageKey } from '@/utils'
import dayjs from 'dayjs'
import { pathToBase64 } from 'image-tools'

// 最大拉取时间 10 分钟
const baseMaxCount = 600
class PullData {
  // 接口返回数据存储
  public state: StateType
  // db实例
  public db: any

  // 拉取的时间限制
  public maxCount: number
  // 缓存拉取的数量
  public count: number
  // 需要拉取的数量
  public needPullCount: number
  // 行政区划 code-name 的map数据
  private districtMap: { [key: string]: string }
  // 图片压缩的质量
  private quality: number

  constructor() {
    // 拉取的计数
    this.count = 0
    this.maxCount = baseMaxCount
    // 需要拉取的数据的数量
    this.needPullCount = 13
    this.quality = 70

    this.state = {
      pullTime: '',
      peasantHouseholdPushDtoList: [],
      project: [],
      dictValList: [],
      immigrantIncomeConfigList: [],
      immigrantWillConfigList: [],
      immigrantAppendantConfigList: [],

      deleteRecordList: [],
      districtTree: [],
      districtList: [],
      villageList: [],
      collectList: [],
      professionalTree: [],
      upgradation: null,
      immigrantGraveList: [],

      peasantHouseholdNum: 0,
      companyNum: 0,
      individualNum: 0,
      villageNum: 0,
      virutalVillageNum: 0
    }

    this.districtMap = {}
  }

  public init() {
    // 数据库是否打开
    const isOpen = db.isOpen()
    if (isOpen) {
      this.db = db
      this.createTable()
    } else {
      db.openDB().then(() => {
        this.db = db
        this.createTable()
      })
    }
  }

  public async pull() {
    // 获取农户数据
    await this.getBaseData()
    // 拉取配置数据
    this.getConfigData()

    // 统计数据
    this.getCollect()
  }

  public pullAll() {
    return new Promise(async (resolve, reject) => {
      this.count = 0
      this.maxCount = baseMaxCount
      const res = await this.pullProjectData()
      if (res) {
        this.pull()
        resolve(true)
      } else {
        reject()
      }
    })
  }

  public getPullStatus(): boolean {
    return this.count === this.needPullCount
  }

  public pullProjectData() {
    return new Promise(async (resolve) => {
      const result = await getProjectDataApi().catch(() => {
        resolve(false)
      })
      console.log('接口: 项目数据', result)
      if (!result) {
        console.error('项目列表获取失败')
        resolve(false)
        return
      }
      this.state.project = result
      const pullRes = await this.pullProject()
      pullRes && this.count++
      console.log('拉取: 项目', pullRes)
      resolve(pullRes)
    })
  }

  public async getConfigData() {
    const result = await getConfigDataApi().catch(() => {
      this.maxCount = -1
    })
    console.log('接口: 配置数据', result)
    if (!result) {
      console.error('配置数据获取失败')
      this.maxCount = -1
      return
    }
    const {
      immigrantIncomeConfigList,
      immigrantWillConfigList,
      immigrantAppendantOptionList,
      dictValList,
      districtTree,
      districtList,
      professionalTree
    } = result

    this.state.immigrantIncomeConfigList = immigrantIncomeConfigList
    this.state.immigrantWillConfigList = immigrantWillConfigList
    this.state.dictValList = dictValList
    this.state.districtTree = districtTree
    this.state.districtList = districtList
    this.state.professionalTree = professionalTree

    this.state.immigrantAppendantConfigList = immigrantAppendantOptionList
    this.pullDict().then((res: boolean) => {
      res && this.count++
      console.log('拉取: 字典', res)
    })
    this.pullFamilyIncome().then((res) => {
      res && this.count++
      console.log('拉取: 家庭收入', res)
    })
    this.pullResettlement().then((res) => {
      res && this.count++
      console.log('拉取: 安置意愿', res)
    })
    this.pullDistrict().then((res) => {
      res && this.count++
      setStorage(StorageKey.DISTRICTMAP, this.districtMap)
      console.log('拉取: 区划', res)
    })
    this.pullAppendant().then((res) => {
      res && this.count++
      console.log('拉取: 附属物', res)
    })
    this.pullOther().then((res) => {
      res && this.count++
      console.log('拉取: 其他', res)
    })
  }

  public async getBaseData() {
    const result = await getBaseDataApi().catch(() => {
      this.maxCount = -1
    })
    console.log('接口: 基础数据', result)
    if (!result) {
      console.error('基础数据获取失败')
      this.maxCount = -1
      return
    }
    const {
      peasantHouseholdPushDtoList,
      pullTime,
      deleteRecordList,
      villageList,
      peasantHouseholdNum,
      companyNum,
      individualNum,
      villageNum,
      virutalVillageNum,
      appVersion,
      immigrantGraveList
    } = result
    this.state.peasantHouseholdPushDtoList = peasantHouseholdPushDtoList
    this.state.deleteRecordList = deleteRecordList
    this.state.pullTime = pullTime
    this.state.villageList = villageList
    this.state.peasantHouseholdNum = peasantHouseholdNum
    this.state.companyNum = companyNum
    this.state.individualNum = individualNum
    this.state.villageNum = villageNum
    this.state.virutalVillageNum = virutalVillageNum
    this.state.upgradation = appVersion
    this.state.immigrantGraveList = immigrantGraveList

    // 数据 新增 修改 删除一起进行
    this.pullLandlord().then((res) => {
      res && this.count++
      console.log('拉取: 业主', res)
    })
    this.pullVillageList().then((res) => {
      res && this.count++
      setStorage(StorageKey.DISTRICTMAP, this.districtMap)
      console.log('拉取: 自然村', res)
    })
    this.deleteDb().then((res) => {
      res && this.count++
      console.log('删除: 数据', res)
    })
    this.pullLandlordHouseImgs().then((res) => {
      res && this.count++
      console.log('拉取: 图片', res)
    })
    this.pullGrave().then((res) => {
      res && this.count++
      console.log('拉取: 坟墓', res)
    })

    if (pullTime) {
      // 同步时间 存入other库
      setStorage(StorageKey.PULLTIME, pullTime)
      const fields = "'type','content','updatedDate'"
      const values = `'${OtherDataType.PullTime}','${pullTime}','${getCurrentTimeStamp()}'`
      this.db.insertOrReplaceData(OtherTableName, values, fields)
    }
  }

  public async getCollect() {
    const result = await getCollectApi().catch(() => {
      this.maxCount = -1
    })
    console.log('接口: 统计数据', result)
    if (!result) {
      console.error('统计数据获取失败')
      this.maxCount = -1
      return
    }
    this.state.collectList = result
    this.pullCollect().then((res) => {
      res && this.count++
      console.log('拉取: 统计数据', res)
    })
  }

  public createTable() {
    // 创建表
    return new Promise((resolve, reject) => {
      Promise.all([
        db.createTableWithDDL(ProjectDDL),
        db.createTableWithDDL(DictionariesDDL),
        db.createTableWithDDL(LandlordDDL),
        db.createTableWithDDL(ResettlementDDL),
        db.createTableWithDDL(FamilyIncomeDDL),
        db.createTableWithDDL(CollectDDL),
        db.createTableWithDDL(OtherDDL),
        db.createTableWithDDL(DistrictDDL),
        db.createTableWithDDL(VillageDDL),
        db.createTableWithDDL(AppendantDDL),
        db.createTableWithDDL(ImageDDL),
        db.createTableWithDDL(GraveDDL)
      ])
        .then((res) => {
          console.log('create表: 成功', res)
          resolve(true)
        })
        .catch((err) => {
          console.error('create表: 失败', err)
          reject()
        })
    })
  }

  public resetTable(): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([
        db.dropTable(ProjectTableName),
        db.dropTable(DictionariesTableName),
        db.dropTable(LandlordTableName),
        db.dropTable(ResettlementTableName),
        db.dropTable(FamilyIncomeTableName),
        db.dropTable(CollectTableName),
        db.dropTable(OtherTableName),
        db.dropTable(DistrictTableName),
        db.dropTable(VillageTableName),
        db.dropTable(AppendantTableName),
        db.dropTable(ImageTableName),
        db.dropTable(GraveTableName)
      ])
        .then((res) => {
          console.log('drop表: 成功', res)
          this.createTable()
            .then(() => {
              resolve(true)
            })
            .catch(() => {
              reject()
            })
        })
        .catch((err) => {
          console.error('drop表: 失败', err)
          reject()
        })
    })
  }

  public execute() {
    /** 是否 串行 */
    let chain = Promise.resolve<any>(null)
    chain = chain.then(() => this.getBaseData())
    // 增加
    return chain
  }

  public getTables(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      const sql = `SELECT tbl_name FROM sqlite_master WHERE type = 'table';`
      const res = await db.selectSql(sql)
      console.log(res, 'res')
      if (res && Array.isArray(res)) {
        const tables = res.filter(
          (item) => item.tbl_name !== 'android_metadata' && item.tbl_name !== 'sqlite_sequence'
        )
        resolve(tables)
      }
      reject([])
    })
  }

  public isArrayAndNotNull(list: any): boolean {
    if (list && Array.isArray(list) && list.length) {
      return true
    }
    return false
  }

  /** 项目 */
  private pullProject(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { project: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(ProjectTableName).catch((err) => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(ProjectTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  private pullGrave(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { immigrantGraveList: list } = this.state
      // 开启事务
      await db.transaction('begin').catch(() => {
        resolve(false)
      })
      if (this.isArrayAndNotNull(list)) {
        list.forEach((item) => {
          // uid: string

          // registrantId: number // 居民户id
          // registrantDoorNo: string // 居民户户号

          // villageId: number // 村集体id
          // doorNo: string // 村集体户号

          // content: string
          // updatedDate: string
          // isDelete: '0' | '1'
          const fields =
            "'uid','registrantId','registrantDoorNo','villageId','villageDoorNo','content','updatedDate','isDelete','status'"
          const values = `'${item.uid}','${item.registrantId}','${item.registrantDoorNo}','${
            item.villageId
          }','${item.villageDoorNo}','${JSON.stringify(
            item
          )}','${getCurrentTimeStamp()}','0','default'`
          db.insertOrReplaceData(GraveTableName, values, fields).catch((err) => {
            console.log(err, '插入坟墓')
          })
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        // 数据为空 不需要拉取
        resolve(true)
      }
    })
  }

  /** 房屋示意图下载 */
  private pullLandlordHouseImgs(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { peasantHouseholdPushDtoList: list } = this.state
      const imgUrls: string[] = []
      if (this.isArrayAndNotNull(list)) {
        list.forEach((item) => {
          const { immigrantHouseList } = item
          // 拿到所有的房屋图片
          if (immigrantHouseList && immigrantHouseList.length) {
            immigrantHouseList.forEach((houseItem) => {
              if (houseItem && houseItem.housePic) {
                try {
                  const imgArr = JSON.parse(houseItem.housePic)
                  imgArr.forEach((imgItem: any) => {
                    if (/\.(jpg|jpeg|png|JPG|PNG)/.test(imgItem.url)) {
                      imgUrls.push(imgItem.url)
                    }
                  })
                } catch (err) {}
              }
            })
          }
        })
        if (!imgUrls.length) {
          resolve(true)
          return
        }
        console.log(imgUrls, 'imgUrls')
        const pathImgs = await this.downLoadImgs(imgUrls)
        console.log(pathImgs, 'pathImgs')
        const base64Imgs = await this.imgPathTobase64Batch(pathImgs)
        console.log('base64Imgs')
        const result = await this.saveImgs(base64Imgs)
        resolve(result)
      } else {
        resolve(true)
      }
    })
  }

  /** 居民户 */
  private pullLandlord(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { peasantHouseholdPushDtoList: list } = this.state
      // 开启事务
      await db.transaction('begin').catch(() => {
        resolve(false)
      })
      if (this.isArrayAndNotNull(list)) {
        list.forEach((item) => {
          const fields =
            "'uid','name','doorNo','type','reportStatus','reportDate','reportUser','status','content','areaCode','townCode','villageCode','virutalVillageCode','updatedDate','isDelete'"
          const values = `'${item.uid}','${item.name}','${item.doorNo}','${item.type}','${
            item.reportStatus
          }','${item.reportDate ? dayjs(item.reportDate).format('YYYY-MM-DD HH:mm:ss') : ''}','${
            item.reportUser
          }','default','${JSON.stringify(item)}','${item.areaCode}','${item.townCode}','${
            item.villageCode
          }','${item.virutalVillageCode}','${getCurrentTimeStamp()}','0'`
          db.insertOrReplaceData(LandlordTableName, values, fields).catch((err) => {
            console.log(err, '插入业主')
          })
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        // 数据为空 不需要拉取
        resolve(true)
      }
    })
  }

  /** 删除本地库中数据 */
  private deleteDb(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { deleteRecordList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          if (item.type === 'peasantHouseholdPushDtoList') {
            // 删除居民户数据
            db.deleteTableData(LandlordTableName, 'uid', item.deleteId)
          }
          // todo
          if (item.type === 'village') {
            // 删除自然村数据
            db.deleteTableData(VillageTableName, 'uid', item.deleteId)
          }
        })

        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  /** 字典 */
  private pullDict(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { dictValList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        // 删除 字典表
        await db.deleteTableData(DictionariesTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          // 重新导入子典
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(DictionariesTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  /** 自然村 */
  private pullVillageList(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { villageList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          this.districtMap[item.code] = item.name
          const fields = "'uid','isDelete','status','parentCode','name','content','updatedDate'"
          const values = `'${item.uid}','0','default','${item.parentCode}','${
            item.name
          }','${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertOrReplaceData(VillageTableName, values, fields).catch((err) => {
            console.log(err, 'err village')
          })
        })

        await db.transaction('commit').catch((err) => {
          console.log(err, 'commit err')
          resolve(false)
        })
        resolve(true)
      } else {
        // 不需要拉取
        resolve(true)
      }
    })
  }

  /** 家庭收入 */
  private pullFamilyIncome(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { immigrantIncomeConfigList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(FamilyIncomeTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertOrReplaceData(FamilyIncomeTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  /** 安置意愿 */
  private pullResettlement(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { immigrantWillConfigList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(ResettlementTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(ResettlementTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  /** 附属物 */
  private pullAppendant(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { immigrantAppendantConfigList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(AppendantTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(AppendantTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(true)
      }
    })
  }

  /** 行政区划 */
  private pullDistrict(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { districtList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(DistrictTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        // 搞一份map: {code: name}存本地

        list.forEach((item) => {
          this.districtMap[item.code] = item.name
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(DistrictTableName, values, fields)
        })

        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  /** 统计数据 */
  private pullCollect(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { collectList: list } = this.state
      if (this.isArrayAndNotNull(list)) {
        await db.deleteTableData(CollectTableName).catch(() => {
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(CollectTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          resolve(false)
        })
        resolve(true)
      } else {
        // 无统计数据
        resolve(true)
      }
    })
  }

  /** 其他 */
  private pullOther(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { districtTree, professionalTree } = this.state
      await db.transaction('begin').catch(() => {
        resolve(false)
      })
      if (districtTree) {
        // 街道树
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.DistrictTree}','${JSON.stringify(
          districtTree
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }

      if (professionalTree && professionalTree.length) {
        // 专业树
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.ProfessionalTree}','${JSON.stringify(
          professionalTree
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      await db.transaction('commit').catch(() => {
        resolve(false)
      })
      resolve(true)
    })
  }

  /** 图片更新到数据库 */
  private saveImgs(imgArray: ImgItemType[]): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (!imgArray || !imgArray.length) {
        resolve(false)
        return
      }
      await this.db.transaction('begin').catch(() => {
        resolve(false)
      })
      imgArray.forEach((item) => {
        // status状态为1 不需要上传
        const fields = `'status','base64','path','url','updatedDate'`
        const values = `'1','${item.base64}','${item.path}','${item.url}','${dayjs().valueOf()}'`
        this.db.insertTableData(ImageTableName, values, fields).catch((err: any) => {
          console.log(err, '更新img err')
        })
      })
      await this.db.transaction('commit').catch(() => {
        resolve(false)
      })
      resolve(true)
    })
  }

  /** 图片转出base64 */
  private imgPathTobase64Batch(imgPathAndUrls: ImgItemType[]): Promise<ImgItemType[]> {
    return new Promise((resolve) => {
      if (!imgPathAndUrls || !imgPathAndUrls.length) {
        resolve([])
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
            resolve(result)
          } else {
            resolve([])
          }
        })
        .catch((error) => {
          console.error('图片转出base64:', error)
          resolve([])
        })
    })
  }

  /** 图片下载 */
  private downLoadImgs(imgUrls: string[]): Promise<ImgItemType[]> {
    return new Promise((resolve) => {
      // 对房屋图片进行下载 绝对压缩到70%
      // 压缩参数 ?x-oss-process=image/quality,Q_70
      if (!imgUrls || !imgUrls.length) {
        resolve([])
        return
      }
      // const imgUrls = [
      //   'https://oss.zdwp.tech/migrate/files/image/33761135-b49f-462f-9078-85da5b55a9f5.jpeg?x-oss-process=image/quality,Q_80'
      // ]

      // 下载图片 拿到本地路经
      const tempFilePathArray: ImgItemType[] = []
      let imgCount = 0
      imgUrls.forEach((img) => {
        const url = img.split('?')[0]
        const zipUrl = `${url}?x-oss-process=image/quality,Q_${this.quality}`
        uni.downloadFile({
          url: zipUrl,
          success: (res) => {
            imgCount++
            const { tempFilePath, statusCode } = res
            if (statusCode === 200) {
              tempFilePathArray.push({
                url: img,
                path: tempFilePath
              })
            }
          },
          fail: () => {
            imgCount++
          },
          complete() {
            if (imgCount === imgUrls.length) {
              // 处理完成
              resolve(tempFilePathArray)
            }
          }
        })
      })
    })
  }
}

export const pullInstance = new PullData()
