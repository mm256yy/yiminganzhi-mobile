import {
  db,
  LandlordDDL,
  DictionariesDDL,
  FamilyIncomeDDL,
  ResettlementDDL,
  ProjectDDL,
  CollectDDL,
  OtherDDL,
  WorkDDL,
  LandlordTableName,
  DictionariesTableName,
  FamilyIncomeTableName,
  ResettlementTableName,
  ProjectTableName,
  CollectTableName,
  OtherTableName,
  WorkTableName
} from '@/database/index'
import { getBaseDataApi, getConfigDataApi } from './api'
import { StateType } from '@/types/pull'
import { getCurrentTimeStamp } from '@/utils'

export class PullData {
  public state: StateType
  public db: any

  constructor() {
    // 数据库是否打开
    const isOpen = this.checkDbStatus()
    if (isOpen) {
      this.db = db
      this.init()
    } else {
      db.openDB().then(() => {
        this.db = db
        this.init()
      })
    }
    this.state = {
      pullTime: '',
      peasantHouseholdPushDtoList: [],
      project: [],
      dict: [],
      immigrantIncomeConfigList: [],
      immigrantWillConfigList: []
    }
  }

  checkDbStatus() {
    return db.isOpen()
  }

  init() {
    // 创建表
    this.createTable()
    console.log('开始拉取数据')
    // 拉取配置数据
    this.getConfigData()
    // 获取农户数据
    this.getBaseData()
  }

  async getConfigData() {
    const result = await getConfigDataApi()
    console.log(result, '配置数据')
    if (!result) return
    const { project, immigrantIncomeConfigList, immigrantWillConfigList, dictValList } = result
    this.state.project = project
    this.state.immigrantIncomeConfigList = immigrantIncomeConfigList
    this.state.immigrantWillConfigList = immigrantWillConfigList
    this.state.dict = dictValList
    this.pullProject()
  }

  async getBaseData() {
    const result = await getBaseDataApi()
    console.log(result, '同步获取数据')
    if (!result) return
    const { peasantHouseholdPushDtoList, pullTime } = result
    this.state.peasantHouseholdPushDtoList = peasantHouseholdPushDtoList
    this.state.pullTime = pullTime
    this.pullLandlord()
  }

  createTable() {
    // 创建表
    db.createTableWithDDL(ProjectDDL)
    db.createTableWithDDL(DictionariesDDL)
    db.createTableWithDDL(LandlordDDL)
    db.createTableWithDDL(ResettlementDDL)
    db.createTableWithDDL(FamilyIncomeDDL)
    db.createTableWithDDL(CollectDDL)
    db.createTableWithDDL(OtherDDL)
    db.createTableWithDDL(WorkDDL)
  }

  pullProject() {
    // 'projectId'
    // 'content'
    // 'updatedDate'
    const { project: list } = this.state
    if (list && list.length) {
      list.forEach((item) => {
        console.log('--')
        db.insertOrReplaceData(
          ProjectTableName,
          `'${JSON.stringify(item)}','${getCurrentTimeStamp()}'`,
          "'content','updatedDate'"
        )
          .then((res) => {
            console.log(res, 'res')
          })
          .catch((err) => {
            console.log(err, 'err')
          })
      })
    }
  }

  pullLandlord() {
    // 'uid'
    // 'status'
    // 'content'
    // 'isDelete'
    // 'updatedDate'
    const { peasantHouseholdPushDtoList: list } = this.state
    if (list && list.length) {
      list.forEach((item) => {
        db.insertOrReplaceData(
          LandlordTableName,
          `'${item.uid}','default','${JSON.stringify(item)}','${getCurrentTimeStamp()}','0'`,
          "'uid','status','content','updatedDate','isDelete'"
        )
      })
    }
  }

  pullDict() {}
}
