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
}
