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
import {
  getProjectDataApi,
  getBaseDataApi,
  getConfigDataApi,
  getCollectApi,
  getMainTreeApi
} from './api'
import { StateType } from '@/types/sync'
import { getCurrentTimeStamp } from '@/utils'
import dayjs from 'dayjs'

class PullData {
  public state: StateType
  public db: any

  constructor() {
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
      mainTree: []
    }
  }

  public async init() {
    console.log('开始拉取数据')
    // 拉取项目信息
    this.getProjectData()
    // 拉取配置数据
    this.getConfigData()
    // 获取农户数据
    this.getBaseData()
    // 统计数据
    this.getCollect()
    // 主树信息
    this.getMainTree()
  }

  public async getProjectData() {
    const result = await getProjectDataApi()
    if (!result) return
    this.state.project = result
    this.pullProject()
  }

  public async getConfigData() {
    const result = await getConfigDataApi()
    if (!result) return
    const {
      project,
      immigrantIncomeConfigList,
      immigrantWillConfigList,
      immigrantAppendantConfigList,
      dictValList,
      districtTree,
      districtList,
      villageList
    } = result

    this.state.immigrantIncomeConfigList = immigrantIncomeConfigList
    this.state.immigrantWillConfigList = immigrantWillConfigList
    this.state.dictValList = dictValList
    this.state.districtTree = districtTree
    this.state.districtList = districtList
    this.state.villageList = villageList
    this.state.immigrantAppendantConfigList = immigrantAppendantConfigList
    this.pullDict()
    this.pullVillageList()
    this.pullFamilyIncome()
    this.pullResettlement()
    this.pullDistrict()
    this.pullAppendant()
  }

  public async getBaseData() {
    const result = await getBaseDataApi()
    if (!result) return
    const { peasantHouseholdPushDtoList, pullTime, deleteRecordList } = result
    this.state.peasantHouseholdPushDtoList = peasantHouseholdPushDtoList
    this.state.deleteRecordList = deleteRecordList
    this.state.pullTime = pullTime

    // 数据 新增 修改 删除一起进行
    this.pullLandlord()
    this.deleteDb()
  }

  public async getCollect() {
    const result = await getCollectApi()
    if (!result) return
    this.state.collectList = result
    this.pullCollect()
  }

  public async getMainTree() {
    const result = await getMainTreeApi()
    if (!result) return
    this.state.mainTree = result
    this.pullOther()
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

  /** 项目 */
  private async pullProject() {
    // 'projectId'
    // 'content'
    // 'updatedDate'
    const { project: list } = this.state
    if (list && list.length) {
      await db.deleteTableData(ProjectTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertTableData(ProjectTableName, values, fields)
      })
    }
  }

  /** 居民户 */
  private pullLandlord() {
    // uid: string
    // content: string
    // name: string
    // reportDate: string
    // reportUser: string
    // status: 'modify' | 'default'
    // isDelete: '0' | '1'
    // updatedDate: string
    const { peasantHouseholdPushDtoList: list } = this.state
    if (list && Array.isArray(list)) {
      list.forEach((item) => {
        const fields =
          "'uid','name','reportDate','reportUser','status','content','updatedDate','isDelete'"
        const values = `'${item.uid}','${item.name}','${
          item.reportDate ? dayjs(item.reportDate).format('YYYY-MM-DD HH:mm:ss') : ''
        }','${item.reportUser}','default','${JSON.stringify(item)}','${getCurrentTimeStamp()}','0'`
        db.insertOrReplaceData(LandlordTableName, values, fields)
      })
    }
  }

  /** 删除本地库中数据 */
  private deleteDb() {
    const { deleteRecordList } = this.state
    if (deleteRecordList && Array.isArray(deleteRecordList)) {
      deleteRecordList.forEach((item) => {
        if (item.type === 'PeasantHousehold') {
          // 删除居民户数据
          db.deleteTableData(LandlordTableName, 'uid', item.deleteId)
        }
        if (item.type === 'village') {
          // 删除自然村数据
          db.deleteTableData(VillageTableName, 'uid', item.deleteId)
        }
      })
    }
  }

  /** 字典 */
  private async pullDict() {
    const { dictValList } = this.state
    if (dictValList && Array.isArray(dictValList)) {
      // 删除 字典表
      await db.deleteTableData(DictionariesTableName)
      dictValList.forEach((item) => {
        // 重新导入子典
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertTableData(DictionariesTableName, values, fields)
      })
    }
  }

  /** 自然村 */
  private pullVillageList() {
    // parentCode: string
    // content: string
    // updatedDate: string
    const { villageList } = this.state
    if (villageList && Array.isArray(villageList)) {
      villageList.forEach((item) => {
        const fields = "'uid','status','parentCode','content','updatedDate'"
        const values = `'${item.uid}','default','${item.parentCode}','${JSON.stringify(
          item
        )}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(VillageTableName, values, fields)
      })
    }
  }

  /** 家庭收入 */
  private async pullFamilyIncome() {
    const { immigrantIncomeConfigList: list } = this.state
    if (list && Array.isArray(list)) {
      await db.deleteTableData(FamilyIncomeTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(FamilyIncomeTableName, values, fields)
      })
    }
  }

  /** 安置意愿 */
  private async pullResettlement() {
    const { immigrantWillConfigList: list } = this.state
    if (list && Array.isArray(list)) {
      await db.deleteTableData(ResettlementTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(ResettlementTableName, values, fields)
      })
    }
  }

  /** 附属物 */
  private async pullAppendant() {
    const { immigrantAppendantConfigList: list } = this.state
    if (list && Array.isArray(list)) {
      await db.deleteTableData(AppendantTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertOrReplaceData(AppendantTableName, values, fields)
      })
    }
  }

  /** 行政区划 */
  private async pullDistrict() {
    const { districtList: list } = this.state
    if (list && Array.isArray(list)) {
      await db.deleteTableData(DistrictTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertTableData(DistrictTableName, values, fields)
      })
    }
  }

  /** 统计数据 */
  private async pullCollect() {
    const { collectList: list } = this.state
    if (list && Array.isArray(list)) {
      await db.deleteTableData(CollectTableName)
      list.forEach((item) => {
        const fields = "'content','updatedDate'"
        const values = `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`
        db.insertTableData(CollectTableName, values, fields)
      })
    }
  }

  /** 其他 */
  private pullOther() {
    const { districtTree, mainTree, pullTime } = this.state
    if (districtTree) {
      // 街道树
      const fields = "'type','content','updatedDate'"
      const values = `'${OtherDataType.DistrictTree}','${JSON.stringify(
        districtTree
      )}','${getCurrentTimeStamp()}'`
      db.insertOrReplaceData(OtherTableName, values, fields)
    }

    if (mainTree) {
      // 主树
      const fields = "'type','content','updatedDate'"
      const values = `'${OtherDataType.MainTree}','${JSON.stringify(
        mainTree
      )}','${getCurrentTimeStamp()}'`
      db.insertOrReplaceData(OtherTableName, values, fields)
    }

    if (pullTime) {
      // 同步时间
      const fields = "'type','content','updatedDate'"
      const values = `'${OtherDataType.PullTime}','${JSON.stringify(
        mainTree
      )}','${getCurrentTimeStamp()}'`
      db.insertOrReplaceData(OtherTableName, values, fields)
    }
  }
}

export const pullInstance = new PullData()
