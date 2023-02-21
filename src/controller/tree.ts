/**
 * 区划/业主 树 查询
 */

import { DistrictTableName, DistrictDDLType } from '@/database'
import { Common } from './common'
import { DistrictType } from '@/types/common'

class DistrictTree extends Common {
  constructor() {
    super()
  }
  getTree(): Promise<any> {
    return new Promise(async (resolve, reject) => {})
  }
}

export const DistrictTreeController = new DistrictTree()
