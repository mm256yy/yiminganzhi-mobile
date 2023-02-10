import { db } from '@/database/db'
import { getBaseDataApi } from './api'

export class PullData {
  public state: any

  constructor() {
    console.log('开始拉取数据')
    this.getBaseData()
  }

  init() {
    this.pullPopulation()
    this.pullLandlord()
    this.pullDict()
  }

  async getBaseData() {
    const result = await getBaseDataApi()
    console.log(result, '同步获取数据')
    this.state = result
    this.init()
  }

  pullPopulation() {
    const {} = this.state
  }

  pullLandlord() {
    const { peasantHouseholdPushDtoList } = this.state
  }

  pullDict() {}
}
