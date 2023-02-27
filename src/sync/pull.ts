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
  OtherDataType
} from '@/database/index'
import { getProjectDataApi, getBaseDataApi, getConfigDataApi, getCollectApi } from './api'
import { StateType } from '@/types/sync'
import { getCurrentTimeStamp, setStorage, StorageKey } from '@/utils'
import dayjs from 'dayjs'

class PullData {
  // 接口返回数据存储
  public state: StateType
  // db实例
  public db: any
  // 缓存拉取的数量
  public count: number
  // 需要拉取的数量
  public needPullCount: number
  // 行政区划 code-name 的map数据
  private districtMap: { [key: string]: string }

  constructor() {
    this.count = 0
    this.needPullCount = 11

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
      collectList: []
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

  public pull() {
    // 获取农户数据
    this.getBaseData()
    // 拉取配置数据
    this.getConfigData()
    // 统计数据
    this.getCollect()
  }

  public async pullAll() {
    this.count = 0
    await this.pullProjectData()
    this.pull()
  }

  public getPullStatus(): boolean {
    return this.count === this.needPullCount
  }

  public pullProjectData() {
    return new Promise(async (resolve) => {
      const result = await getProjectDataApi()
      console.log('接口项目数据', result)
      if (!result) {
        resolve(false)
      }
      this.state.project = result
      const pullRes = await this.pullProject()
      pullRes && this.count++
      console.log('拉取项目', pullRes)
      resolve(pullRes)
    })
  }

  public async getConfigData() {
    const result = await getConfigDataApi()
    console.log('接口配置数据', result)
    if (!result) return
    const {
      immigrantIncomeConfigList,
      immigrantWillConfigList,
      immigrantAppendantOptionList,
      dictValList,
      districtTree,
      districtList
    } = result

    this.state.immigrantIncomeConfigList = immigrantIncomeConfigList
    this.state.immigrantWillConfigList = immigrantWillConfigList
    this.state.dictValList = dictValList
    this.state.districtTree = districtTree
    this.state.districtList = districtList

    this.state.immigrantAppendantConfigList = immigrantAppendantOptionList
    this.pullDict().then((res: boolean) => {
      res && this.count++
      console.log('拉取字典', res)
    })
    this.pullFamilyIncome().then((res) => {
      res && this.count++
      console.log('拉取家庭收入', res)
    })
    this.pullResettlement().then((res) => {
      res && this.count++
      console.log('拉取安置意愿', res)
    })
    this.pullDistrict().then((res) => {
      res && this.count++
      setStorage(StorageKey.DISTRICTMAP, this.districtMap)
      console.log('拉取区划', res)
    })
    this.pullAppendant().then((res) => {
      res && this.count++
      console.log('拉取附属物', res)
    })
    this.pullOther().then((res) => {
      res && this.count++
      console.log('拉取其他', res)
    })
  }

  public async getBaseData() {
    const result = await getBaseDataApi()
    console.log('接口基础数据', result)
    if (!result) return
    const { peasantHouseholdPushDtoList, pullTime, deleteRecordList, villageList } = result
    this.state.peasantHouseholdPushDtoList = peasantHouseholdPushDtoList
    this.state.deleteRecordList = deleteRecordList
    this.state.pullTime = pullTime
    this.state.villageList = villageList

    // 数据 新增 修改 删除一起进行
    this.pullLandlord().then((res) => {
      res && this.count++
      console.log('拉取业主', res)
    })
    this.pullVillageList().then((res) => {
      res && this.count++
      console.log('拉取自然村', res)
    })
    this.deleteDb().then((res) => {
      res && this.count++
      console.log('删除数据', res)
    })
  }

  public async getCollect() {
    const result = await getCollectApi()
    console.log('接口统计数据', result)
    if (!result) return
    this.state.collectList = result
    this.pullCollect().then((res) => {
      res && this.count++
      console.log('统计数据', res)
    })
  }

  public createTable() {
    // 创建表
    db.createTableWithDDL(ProjectDDL)
    db.createTableWithDDL(DictionariesDDL)
    db.createTableWithDDL(LandlordDDL)
    db.createTableWithDDL(ResettlementDDL)
    db.createTableWithDDL(FamilyIncomeDDL)
    db.createTableWithDDL(CollectDDL)
    db.createTableWithDDL(OtherDDL)
    db.createTableWithDDL(DistrictDDL)
    db.createTableWithDDL(VillageDDL)
    db.createTableWithDDL(AppendantDDL)
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
          console.log(77, err)
          resolve(false)
        })
        await db.transaction('begin').catch(() => {
          console.log(88)
          resolve(false)
        })
        list.forEach((item) => {
          const fields = "'content','updatedDate'"
          const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
          db.insertTableData(ProjectTableName, values, fields)
        })
        await db.transaction('commit').catch(() => {
          console.log(99)
          resolve(false)
        })
        resolve(true)
      } else {
        console.log(111)
        resolve(false)
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
            "'uid','name','type','reportDate','reportUser','status','content','villageCode', 'updatedDate','isDelete'"
          const values = `'${item.uid}','${item.name}','${item.type}','${
            item.reportDate ? dayjs(item.reportDate).format('YYYY-MM-DD HH:mm:ss') : ''
          }','${item.reportUser}','default','${JSON.stringify(item)}','${
            item.villageCode
          }','${getCurrentTimeStamp()}','0'`
          db.insertOrReplaceData(LandlordTableName, values, fields)
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
        resolve(false)
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
          const fields = "'uid','status','parentCode','content','updatedDate'"
          const values = `'${item.uid}','default','${item.parentCode}','${JSON.stringify(
            item
          )}','${getCurrentTimeStamp()}'`
          db.insertOrReplaceData(VillageTableName, values, fields)
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
        resolve(false)
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
        resolve(false)
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
        resolve(false)
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
        resolve(false)
      }
    })
  }

  /** 其他 */
  private pullOther(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const { districtTree, pullTime } = this.state
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

      if (pullTime) {
        // 同步时间
        const fields = "'type','content','updatedDate'"
        const values = `'${OtherDataType.PullTime}','${dayjs(pullTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(OtherTableName, values, fields)
      }
      await db.transaction('commit').catch(() => {
        resolve(false)
      })
      resolve(true)
    })
  }
}

export const pullInstance = new PullData()
