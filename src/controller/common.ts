import { db, DB } from '@/database'

export class Common {
  public db: DB
  constructor() {
    const isOpen = db.isOpen()
    if (!isOpen) {
      db.openDB().then(() => {
        this.db = db
      })
    }
    this.db = db
  }

  public isArrayAndNotNull(list: any): boolean {
    if (list && Array.isArray(list) && list.length) {
      return true
    }
    return false
  }

  public getLocationTypeText(type: string): string {
    const map: { [key: string]: string } = {
      SubmergedArea: '淹没区',
      ConstructionArea: '建设区',
      InfluenceArea: '影响区',
      OverlappingArea: '重叠区'
    }
    return map[type]
  }
}
