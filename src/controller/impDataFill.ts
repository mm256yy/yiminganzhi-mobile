/**
 * 部分实施阶段 数据填报
 */

import { LandlordType } from '@/types/sync'
import { guid } from '@/utils'
import {
  PopulationType,
  AppendantType,
  WillType,
  TreeType,
  HouseType,
  FamilyIncomeType,
  GraveType,
  ImmigrantFileType,
  // CompanyType,
  EquipmentType,
  FacilitiesType,
  ManagementType
} from '@/types/datafill'
import { Landlord } from './landlord'
import { getCurrentTimeStamp } from '@/utils'

class ImpDataFill extends Landlord {
  constructor() {
    super()
  }

  // 资产评估
  getArchivesInfo(uid: string): Promise<any | null> {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(null)
      } catch (error) {
        console.log(error, 'Archives-getArchivesInfo-error')
        reject(null)
      }
    })
  }

  saveArchivesInfo(data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid) {
          reject(false)
          console.log('uid缺失')
          return
        }

        // 拿到详情信息
        let mergeObj: any = {}
        const archivesDetail = await this.getArchivesInfo(data.uid)
        if (archivesDetail) {
          // 存在
          mergeObj = { ...archivesDetail, ...data }
        } else {
          // 不存在
          const defaultObj = {
            produceVerifyPic: '[]',
            produceOtherPic: '[]',
            relocateVerifyPic: '[]',
            relocateOtherPic: '[]',
            graveVerifyPic: '[]',
            graveOtherPic: '[]',
            graveChoosePic: '[]',
            graveChooseOtherPic: '[]',
            houseEmptyPic: '[]',
            houseEmptyOtherPic: '[]',
            landEmptyPic: '[]',
            landEmptyOtherPic: '[]',
            excessVerifyPic: '[]',
            excessAgreementPic: '[]',
            excessVerifyOtherPic: '[]',
            buildOneselfPic: '[]',
            buildOneselfCheckPic: '[]',
            buildOneselfOtherPic: '[]',
            flatAgreementPic: '[]',
            flatMeasurementPic: '[]',
            flatOtherPic: '[]',
            agriculturePic: '[]',
            agricultureOtherPic: '[]',
            compensationCardPic: '[]',
            compensationCardOtherPic: '[]',
            houseEstimatePic: '[]',
            landEstimatePic: '[]',
            agreementPic: '[]',
            agreementOtherPic: '[]'
          }
          mergeObj = { ...defaultObj, ...data }
        }
        const fields = "'uid','content','updatedDate'"
        const values = `'${data.uid}','${JSON.stringify(mergeObj)}','${getCurrentTimeStamp()}'`
        // await this.db.insertOrReplaceData(ArchivesTableName, values, fields).catch(() => {
        //   reject(false)
        // })
        resolve(true)
      } catch (error) {
        console.log(error, 'ImpDataFill-saveArchivesInfo-error')
        reject(false)
      }
    })
  }
}

export const ArchivesController = new ImpDataFill()
