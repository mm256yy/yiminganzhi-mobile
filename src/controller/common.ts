import { db } from '@/database'

export class Common {
  public db: any
  constructor() {
    const isOpen = db.isOpen()
    if (!isOpen) {
      db.openDB().then(() => {
        this.db = db
      })
    }
    this.db = db
  }
}
