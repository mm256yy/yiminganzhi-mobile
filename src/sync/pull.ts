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
  LandlordHasStatusTableName,
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
  getLandlordValues,
  landlordFields,
  getLandlordHasStatusValues,
  LandlordHasStatusDDL,
  landlordHasStatusFields,
  landEstimateDtoListName,
  landEstimateDtoListDDL,
  landEstimateDtoListlds,
  getLandEstimateDtoListValues
} from '@/database/index'
import {
  getProjectDataApi,
  getBaseDataApi,
  getConfigDataApi,
  getCollectApi,
  getPullLandlordListApi
} from './api'
import { StateType, ImgItemType, LandlordWithPageType } from '@/types/sync'
import { getCurrentTimeStamp, getStorage, setStorage, StorageKey, guid } from '@/utils'
import dayjs from 'dayjs'
import { pathToBase64 } from 'image-tools'
import {
  getLandlordListBySearchApi
  // getLandlordListBySearchApiTwo,
} from '@/service'
// 最大拉取时间 30 分钟
const baseMaxCount = 1800
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
  public districtMap: { [key: string]: string }
  // 图片压缩的质量
  private quality: number
  // 拉取失败 返回的对象
  public pullError: any

  constructor() {
    // 拉取的计数
    this.count = 0
    this.maxCount = baseMaxCount
    // 需要拉取的数据的数量
    this.needPullCount = 12
    this.quality = 100

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
      top5Statistic: null,

      peasantHouseholdNum: 0,
      companyNum: 0,
      individualNum: 0,
      villageNum: 0,
      virutalVillageNum: 0,

      peasantHouseholdLagNum: 0,
      peasantHouseholdWarnNum: 0,

      companyLagNum: 0,
      companyWarnNum: 0,

      individualLagNum: 0,
      individualWarnNum: 0,

      villageLagNum: 0,
      villageWarnNum: 0,
      landNoMoveNum: 0,
      landNoMoveCompleteNum: 0,
      landNoMoveIncompleteNum: 0,
      chooseConfig: [],
      houseConfig: [],
      immigrantCompensationCardConfig: [],
      rankDtoList: [],
      feedbackDtoList: [],
      pgTop: [],
      evaluatorStatisticsDto: null,
      settleAddressList: [],
      peasantHouseholdDtoList: [],
      notifyDtoList: [],
      landPeasantHouseholdDtoList: [],
      landEstimateDtoList: [],
      landAppendantList: []
    }

    this.districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
    this.pullError = null
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
    // 获取基础数据
    await this.getBaseData()

    // 获取调查对象数据
    this.getLandlordData(true)

    // 拉取配置数据
    this.getConfigData()

    // 统计数据
    this.getCollect()
  }

  public pullAll() {
    return new Promise(async (resolve, reject) => {
      this.count = 0
      this.maxCount = baseMaxCount
      this.pullError = null
      // 优先拉取项目

      const res = await this.pullProjectData()
      if (res) {
        this.pull()
        resolve(true)
      } else {
        // 项目拉取失败 唯一特殊的情况
        reject()
      }
    })
  }

  public getPullStatus(): boolean {
    const status = this.count === this.needPullCount
    if (status) {
      // 同步成功 更新拉取时间
      const { pullTime } = this.state
      if (pullTime) {
        // 同步时间 存入other库
        setStorage(StorageKey.PULLTIME, pullTime)
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.PullTime}','${pullTime}','${getCurrentTimeStamp()}'`
        this.db.insertOrReplaceData(OtherTableName, values, fields)
      }
      // 同步成功 写入行政区划map数据
      setStorage(StorageKey.DISTRICTMAP, this.districtMap)
      // 推送拉取都成功 写入状态
      setStorage(StorageKey.PUSHSTATUS, 'syncEnd')
    }
    return status
  }

  public pullProjectData() {
    return new Promise(async (resolve) => {
      const result = await getProjectDataApi().catch((error) => {
        if (error && !this.pullError) {
          this.pullError = error
        }
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
      // 重置 释放缓存
      this.state.project = []
      console.log('拉取: 项目', pullRes)
      resolve(pullRes)
    })
  }

  // 获取配置信息
  public async getConfigData() {
    const result = await getConfigDataApi().catch((error) => {
      if (error && !this.pullError) {
        this.pullError = error
      }
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
      professionalTree,

      homeReportTop,
      homeReportTopToday,
      homeSignTop,
      homeSignTopToday,
      chooseConfig,
      houseConfig,
      immigrantCompensationCardConfig,
      rankDtoList,
      pgTop,
      feedbackDtoList,
      settleAddressList,
      notifyDtoList,
      landEstimateDtoList,
      landPeasantHouseholdDtoList
    } = result
    // 需要reset
    this.state.immigrantIncomeConfigList = immigrantIncomeConfigList
    this.state.immigrantWillConfigList = immigrantWillConfigList
    this.state.dictValList = dictValList
    this.state.districtTree = districtTree
    this.state.districtList = districtList
    this.state.professionalTree = professionalTree
    this.state.immigrantAppendantConfigList = immigrantAppendantOptionList
    this.state.top5Statistic = {
      homeReportTop,
      homeReportTopToday,
      homeSignTop,
      homeSignTopToday
    }
    this.state.chooseConfig = chooseConfig
    this.state.houseConfig = houseConfig
    this.state.immigrantCompensationCardConfig = immigrantCompensationCardConfig
    this.state.rankDtoList = rankDtoList
    this.state.pgTop = pgTop
    this.state.feedbackDtoList = feedbackDtoList
    this.state.settleAddressList = settleAddressList
    ;(this.state.notifyDtoList = notifyDtoList),
      (this.state.landPeasantHouseholdDtoList = landPeasantHouseholdDtoList)
    this.state.landEstimateDtoList = landEstimateDtoList
    console.log(this.state.landEstimateDtoList, '土地数据')
    console.log(this.state.notifyDtoList, '测试接口数据')
    this.pullDict().then((res: boolean) => {
      res && this.count++
      // 重置 释放缓存
      this.state.dictValList = []
      console.log('拉取: 字典', res)
    })
    this.pullFamilyIncome().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.immigrantIncomeConfigList = []
      console.log('拉取: 家庭收入', res)
    })
    this.pullResettlement().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.immigrantWillConfigList = []

      console.log('拉取: 安置意愿', res)
    })
    this.pullDistrict().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.districtList = []

      console.log('拉取: 区划', res)
    })
    this.pullAppendant().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.immigrantAppendantConfigList = []

      console.log('拉取: 附属物', res)
    })
    this.pullOther().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.districtTree = []
      this.state.professionalTree = []
      this.state.top5Statistic = null

      this.state.chooseConfig = []
      this.state.houseConfig = []
      this.state.immigrantCompensationCardConfig = []
      this.state.rankDtoList = []
      this.state.pgTop = []
      this.state.feedbackDtoList = []
      this.state.settleAddressList = []
      this.state.notifyDtoList = []
      this.state.landPeasantHouseholdDtoList = []
      this.state.landEstimateDtoList = []
      console.log('拉取: 其他', res)
    })
  }

  // 获取调查对象列表
  public getLandlordData(first: boolean, lastId?: number | null) {
    /**
     * 分批拉取数据，一次存储sqllite
     *
     * 说明: 1.当数据量过大时，一次性拉取调查对象数据会导致pad上内存溢出，参考7000条数据40M的返回体
     * 2.递归的条件：lastId 为null 时表示请求数据完毕
     * 3.目前数据的阀值由后端控制 一次限定2000条
     */
    if (first) {
      // 需要重置一次
      this.state.peasantHouseholdPushDtoList = []
    }
    getPullLandlordListApi(lastId)
      .then((res: LandlordWithPageType) => {
        if (res) {
          console.log('接口: 调查对象数据', res)
          const { peasantHouseholdPushDtoList, lastId, pullTime } = res
          if (peasantHouseholdPushDtoList && peasantHouseholdPushDtoList.length) {
            // 需要合并数据
            this.state.peasantHouseholdPushDtoList = [
              ...this.state.peasantHouseholdPushDtoList,
              ...peasantHouseholdPushDtoList
            ]
          }
          console.log('递归:', lastId, this.count)
          // 存储拉取时间
          this.state.pullTime = pullTime
          if (lastId) {
            // id存在 表明还有数据，需要继续递归请求
            this.getLandlordData(false, lastId)
          } else {
            // id不存在 表明数据已经获取完毕，不再需继续请求
            console.log('接口: 调查对象数据length', this.state.peasantHouseholdPushDtoList.length)
            this.getLandlordDataSuccess()
          }
        } else {
          // 接口返回有误
          this.maxCount = -1
        }
      })
      .catch((error) => {
        if (error && !this.pullError) {
          this.pullError = error
        }
        this.maxCount = -1
      })
  }

  // 获取调查对象成功处理函数
  private getLandlordDataSuccess() {
    console.log('接口: 调查对象数据', 'getLandlordDataSuccess')

    // 存储调查对象数据
    this.pullLandlord().then((res) => {
      res && this.count++
      this.state.peasantHouseholdPushDtoList = []
      console.log('拉取: 业主', res)
    })
  }

  // 获取基础信息
  public async getBaseData() {
    const result = await getBaseDataApi().catch((error) => {
      if (error && !this.pullError) {
        this.pullError = error
      }
      this.maxCount = -1
    })
    console.log('接口: 基础数据', result)
    if (!result) {
      console.error('基础数据获取失败')
      this.maxCount = -1
      return
    }
    // peasantHouseholdDtoList lqh新加
    const {
      deleteRecordList,
      villageList,
      immigrantGraveList,

      peasantHouseholdNum,
      companyNum,
      individualNum,
      villageNum,
      virutalVillageNum,
      appVersion,

      peasantHouseholdLagNum,
      peasantHouseholdWarnNum,
      landNoMoveNum,
      landNoMoveCompleteNum,
      landNoMoveIncompleteNum,
      companyLagNum,
      companyWarnNum,

      individualLagNum,
      individualWarnNum,

      villageLagNum,
      villageWarnNum,
      evaluatorStatisticsDto,
      peasantHouseholdDtoList
    } = result
    // 需要reset
    this.state.deleteRecordList = deleteRecordList
    this.state.villageList = villageList
    this.state.immigrantGraveList = immigrantGraveList
    // 不能reset
    this.state.peasantHouseholdNum = peasantHouseholdNum
    this.state.companyNum = companyNum
    this.state.individualNum = individualNum
    this.state.villageNum = villageNum
    this.state.virutalVillageNum = virutalVillageNum
    this.state.upgradation = appVersion
    this.state.landNoMoveNum = landNoMoveNum
    this.state.landNoMoveCompleteNum = landNoMoveCompleteNum
    this.state.landNoMoveIncompleteNum = landNoMoveIncompleteNum
    this.state.peasantHouseholdLagNum = peasantHouseholdLagNum
    this.state.peasantHouseholdWarnNum = peasantHouseholdWarnNum

    this.state.companyLagNum = companyLagNum
    this.state.companyWarnNum = companyWarnNum

    this.state.individualLagNum = individualLagNum
    this.state.individualWarnNum = individualWarnNum

    this.state.villageLagNum = villageLagNum
    this.state.villageWarnNum = villageWarnNum
    this.state.evaluatorStatisticsDto = evaluatorStatisticsDto
    this.state.peasantHouseholdDtoList = peasantHouseholdDtoList
    // 数据 新增 修改 删除一起进行
    this.pullVillageList().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.villageList = []
      console.log('拉取: 自然村', res)
    })
    this.deleteDb().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.deleteRecordList = []
      console.log('删除: 数据', res)
    })
    this.pullGrave().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.immigrantGraveList = []

      console.log('拉取: 坟墓', res)
    })
  }

  // 获取统计数据
  public async getCollect() {
    const result = await getCollectApi().catch((error) => {
      if (error && !this.pullError) {
        this.pullError = error
      }
      this.maxCount = -1
    })
    console.log('接口: 统计数据', result)
    // if (!result) {
    //   console.error('统计数据获取失败')
    //   this.maxCount = -1
    //   return
    // }
    this.state.collectList = result ? result : []
    this.pullCollect().then((res) => {
      res && this.count++
      // 重置 释放缓存
      this.state.collectList = []

      console.log('拉取: 统计数据', res)
    })
  }

  public createTable() {
    console.log('==创建表===========开始====')
    // 创建表
    return new Promise((resolve, reject) => {
      Promise.all([
        db.createTableWithDDL(ProjectDDL),
        db.createTableWithDDL(DictionariesDDL),
        db.createTableWithDDL(LandlordDDL),
        db.createTableWithDDL(LandlordHasStatusDDL),
        db.createTableWithDDL(landEstimateDtoListDDL),
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
    /**
     * 为啥要做清理？
     * 表字段有新增或者修改 如果不做删除 字段就不会被更新 就会导致操作表时报错
     */
    return new Promise((resolve, reject) => {
      Promise.all([
        db.dropTable(ProjectTableName),
        db.dropTable(DictionariesTableName),
        db.dropTable(LandlordTableName),
        db.dropTable(LandlordHasStatusTableName),
        db.dropTable(ResettlementTableName),
        db.dropTable(FamilyIncomeTableName),
        db.dropTable(CollectTableName),
        db.dropTable(OtherTableName),
        db.dropTable(DistrictTableName),
        db.dropTable(VillageTableName),
        db.dropTable(AppendantTableName),
        db.dropTable(landEstimateDtoListName),
        // db.dropTable(ImageTableName), // 图片库不做清理 数据库字段不要做变更
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
      if (this.isArrayAndNotNull(list)) {
        // 开启事务
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item) => {
          // uid: string

          // registrantId: number // 居民户id
          // registrantDoorNo: string // 居民户户号

          // villageId: number // 村集体id
          // doorNo: string // 村集体户号

          // content: string
          // updatedDate: string
          // isPadDelete: '0' | '1'
          const fields =
            "'uid','registrantId','registrantDoorNo','villageId','villageDoorNo','content','updatedDate','isPadDelete','padStatus'"
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
                    if (/\.(jpg|jpeg|png|JPEG|JPG|PNG)/.test(imgItem.url)) {
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
        // const base64Imgs = await this.imgPathTobase64Batch(pathImgs)
        // console.log('base64Imgs')
        const result = await this.saveImgs(pathImgs)
        resolve(result)
      } else {
        resolve(true)
      }
    })
  }

  /** 居民户  包括带状态（滞后或者预警状态）的居民户*/
  private pullLandlord(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { peasantHouseholdPushDtoList: list, peasantHouseholdDtoList: listTwo } = this.state
      console.log('===========listTwo=============', listTwo?.length, list)
      if (this.isArrayAndNotNull(list)) {
        // 开启事务
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        list.forEach((item, index) => {
          if (this.isArrayAndNotNull(item.immigrantBuildOneselfList)) {
            // 自建房增加uid
            item.immigrantBuildOneselfList = item.immigrantBuildOneselfList.map((ytem) => {
              if (!ytem.uid) {
                ytem.uid = guid()
              }
              return ytem
            })
          }
          const values = getLandlordValues(item, 'default')
          console.log(values, `企业数据${index}`)
          db.insertOrReplaceData(LandlordTableName, values, landlordFields)
            .then((res) => {
              console.log(res, '插入业主')
            })
            .catch((err) => {
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

      if (this.isArrayAndNotNull(listTwo)) {
        // 开启事务
        await db.transaction('begin').catch(() => {
          resolve(false)
        })
        const res = await getLandlordListBySearchApi()
        // console.log('===========listTwo=============', listTwo, res, list)
        res.forEach((key: any) => {
          let m = false
          listTwo.forEach((item) => {
            if (key.id == item.id) {
              m = true
            }
          })
          console.log(m, 'begin')

          if (!m && key.type != 'LandNoMove') {
            db.deleteTableData(LandlordTableName, 'id', key.id)
              .then((res) => {
                console.log(res, '插入业主')
              })
              .catch((err) => {
                console.log(err, '删除业主')
              })
          }
        })
        listTwo.forEach((item) => {
          const values = getLandlordHasStatusValues(item, 'default')
          db.insertOrReplaceData(LandlordHasStatusTableName, values, landlordHasStatusFields).catch(
            (err) => {
              console.log(err, '插入业主带状态')
            }
          )
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
          if (item.type === 'village') {
            // 删除自然村数据
            db.deleteTableData(VillageTableName, 'uid', item.deleteId)
          }
          if (item.type === 'peasantHouseholdDtoList') {
            // 删除居民户数据
            db.deleteTableData(LandlordHasStatusTableName, 'uid', item.deleteId)
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
          const fields =
            "'uid','isPadDelete','padStatus','parentCode','name','content','updatedDate'"
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
      const {
        districtTree,
        professionalTree,
        top5Statistic,
        chooseConfig,
        houseConfig,
        immigrantCompensationCardConfig,
        rankDtoList,
        pgTop,
        feedbackDtoList,
        settleAddressList,
        peasantHouseholdNum,
        companyNum,
        individualNum,
        villageNum,
        peasantHouseholdLagNum,
        peasantHouseholdWarnNum,
        companyLagNum,
        companyWarnNum,
        individualLagNum,
        individualWarnNum,
        villageLagNum,
        villageWarnNum,
        evaluatorStatisticsDto,
        notifyDtoList,
        landEstimateDtoList,
        landPeasantHouseholdDtoList,
        landNoMoveNum,
        landNoMoveCompleteNum,
        landNoMoveIncompleteNum
      } = this.state
      await db.transaction('begin').catch(() => {
        resolve(false)
      })
      if (districtTree && districtTree.length) {
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

      if (top5Statistic) {
        // top5
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.Top5}','${JSON.stringify(
          top5Statistic
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }

      if (chooseConfig && chooseConfig.length) {
        // 地块配置
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.ChooseConfig}','${JSON.stringify(
          chooseConfig
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }

      if (houseConfig && houseConfig.length) {
        // 撞号房号配置
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.HouseConfig}','${JSON.stringify(
          houseConfig
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }

      if (immigrantCompensationCardConfig && immigrantCompensationCardConfig.length) {
        // 移民建卡配置
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.ImmigrantCompensationCardConfig}','${JSON.stringify(
          immigrantCompensationCardConfig
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }

      // 实施阶段首页统计
      const fields = "'type','content','updatedDate'"
      const values = `'${OtherDataType.ImpHomeCollect}','${JSON.stringify({
        peasantHouseholdNum,
        peasantHouseholdLagNum,
        peasantHouseholdWarnNum,
        peasantHouseholdDoneNum:
          peasantHouseholdNum - peasantHouseholdLagNum - peasantHouseholdWarnNum,

        companyNum,
        companyLagNum,
        companyWarnNum,
        companyDoneNum: companyNum - companyLagNum - companyWarnNum,

        individualNum,
        individualLagNum,
        individualWarnNum,
        individualDoneNum: individualNum - individualLagNum - individualWarnNum,

        villageNum,
        villageLagNum,
        villageWarnNum,
        villageDoneNum: villageNum - villageLagNum - villageWarnNum,
        landNoMoveNum,
        landNoMoveCompleteNum,
        landNoMoveIncompleteNum
      })}','${getCurrentTimeStamp()}'`
      db.insertOrReplaceData(OtherTableName, values, fields)
      //资产评估统计首页
      if (evaluatorStatisticsDto) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.EvaluatorStatisticsDto}','${JSON.stringify(
          evaluatorStatisticsDto
        )}','${getCurrentTimeStamp()}'`
        console.log(values, '测试资产评估统计首页')
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      // 排行榜
      if (rankDtoList && rankDtoList.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.RankDtoList}','${JSON.stringify(
          rankDtoList
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      //TOP5首页排行榜
      if (pgTop && pgTop.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.PgTop}','${JSON.stringify(
          pgTop
        )}','${getCurrentTimeStamp()}'`
        console.log(values, '测试TOP5首页排行榜')
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      // 问题反馈
      if (feedbackDtoList && feedbackDtoList.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.FeedbackDtoList}','${JSON.stringify(
          feedbackDtoList
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      //安置地详情
      if (settleAddressList && settleAddressList.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.settleAddressList}','${JSON.stringify(
          settleAddressList
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      //消息通知
      if (notifyDtoList && notifyDtoList.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.notifyDtoList}','${JSON.stringify(
          notifyDtoList
        )}','${getCurrentTimeStamp()}'`
        console.log(values, '消息通知数据')
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      //土地数据
      if (landEstimateDtoList && landEstimateDtoList.length) {
        console.log(landEstimateDtoList, '测试土地数据')
        landEstimateDtoList.forEach((item) => {
          if (!item.uid) {
            item.uid = guid()
          }
          const fields = landEstimateDtoListlds
          const values = getLandEstimateDtoListValues(item, 'default')
          console.log(values, fields)

          db.insertOrReplaceData(landEstimateDtoListName, values, fields)
            .then((res) => {
              console.log(`成功`, res)
            })
            .catch((err) => {
              console.log(err, '插入土地失败')
            })
        })
        // const fields = "'type','content','updatedDate'"
        // const values = `'${OtherDataType.landEstimateDtoList}','${JSON.stringify(
        //   landEstimateDtoList
        // )}','${getCurrentTimeStamp()}'`
        // console.log(values, '测试土地数据')
        // db.insertOrReplaceData(OtherTableName, values, fields)
      }
      //土地关联用户数据
      if (landPeasantHouseholdDtoList && landPeasantHouseholdDtoList.length) {
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.landPeasantHouseholdDtoList}','${JSON.stringify(
          landPeasantHouseholdDtoList
        )}','${getCurrentTimeStamp()}'`
        // console.log(values, '测试土地关联用户数据')
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
        const values = `'1','${item.base64 || ''}','${item.path}','${
          item.url
        }','${dayjs().valueOf()}'`
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
