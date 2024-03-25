/**
 * 提供业主相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType, getLandlordSqlValues } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import { getStorage, StorageKey, guid } from '@/utils'
import { LandlordSearchType, HouseAreaType, RoleCodeType, MainType } from '@/types/common'
import { GraveController } from './grave'
import { defaultDocumentObj, defaultFillingObj } from './config'

export class ImpLandlord extends Common {
  public format: string
  constructor() {
    super()
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }
  private isNotNullPic(pic: string | undefined) {
    return pic && pic !== '[]'
  }
  // 内部方法 判断填报完成状态
  private updateImpFillStatus(landlordItem: LandlordType): LandlordType {
    if (!landlordItem) {
      return landlordItem
    }
    const role: RoleCodeType = getStorage(StorageKey.USERROLE)
    const {
      demographicList,
      immigrantHouseList,
      immigrantSettle,
      immigrantGraveList,
      immigrantLand,
      immigrantChooseHouseList,
      immigrantCompensationCardList,
      immigrantHouseEmpty,
      immigrantLandEmpty,
      immigrantExcess,
      immigrantBuildOneselfList,
      immigrantProceduresList,
      immigrantSelfSeeking,
      immigrantFilling,
      type
    } = landlordItem
    console.log(landlordItem, '数据状态1')
    const {
      produceVerifyPic,
      relocateVerifyPic,
      graveVerifyPic,
      graveChoosePic,
      agreementPic,
      compensationCardPic,
      houseEmptyPic,
      landEmptyPic,
      excessVerifyPic,
      buildOneselfPic,
      buildOneselfCheckPic,
      flatAgreementPic,
      flatMeasurementPic,
      agriculturePic,
      collectiveAssetsPic,

      houseEstimatePic,
      landEstimatePic,
      devicePic,
      specialPic,
      proceduresPic
    } = landlordItem.immigrantDocumentation
    const {
      houseMainStatus, //房屋主体评估完成状态
      houseRenovationStatus, //房屋装修评估完成状态
      appendageStatus, //附属设施评估完成状态
      treeStatus, //零星(林)果木评估完成状态
      specialStatus, //小型专项评估
      infrastructureStatus, //基础设施评估
      deviceStatus, //设施设备评估完成状态
      otherStatus //其他评估完成状态
    } = landlordItem.immigrantFilling
    // 判断初始化
    landlordItem.immigrantFilling = { ...defaultFillingObj, ...immigrantFilling }

    // 居民户信息填报完成
    if (this.isNotNullPic(landlordItem.householdPic)) {
      landlordItem.immigrantFilling.householdPicStatus = '1'
    } else {
      landlordItem.immigrantFilling.householdPicStatus = '0'
    }

    // 资产评估 - 填报状态 为报告上传完成
    if (role === RoleCodeType.assessor) {
      // 资产评估-房屋

      if (
        this.isNotNullPic(houseEstimatePic) &&
        type === MainType.PeasantHousehold &&
        houseMainStatus === '1' &&
        houseRenovationStatus === '1' &&
        appendageStatus === '1' &&
        treeStatus === '1'
      ) {
        // 评估总状态
        landlordItem.immigrantFilling.estimateeStatus = '1'
        landlordItem.houseImplementEscalationStatus = '1'
      } else if (
        (type === MainType.Company || type === MainType.IndividualHousehold) &&
        this.isNotNullPic(houseEstimatePic) &&
        this.isNotNullPic(devicePic) &&
        houseMainStatus === '1' &&
        houseRenovationStatus === '1' &&
        appendageStatus === '1' &&
        treeStatus === '1' &&
        infrastructureStatus === '1' &&
        otherStatus === '1' &&
        deviceStatus === '1'
      ) {
        landlordItem.immigrantFilling.estimateeStatus = '1'
        landlordItem.houseImplementEscalationStatus = '1'
      } else if (
        type === MainType.Village &&
        this.isNotNullPic(houseEstimatePic) &&
        this.isNotNullPic(specialPic) &&
        houseMainStatus === '1' &&
        houseRenovationStatus === '1' &&
        appendageStatus === '1' &&
        treeStatus === '1' &&
        specialStatus === '1' &&
        infrastructureStatus === '1'
      ) {
        // 农村小型专项
        landlordItem.immigrantFilling.estimateeStatus = '1'
        landlordItem.houseImplementEscalationStatus = '1'
      } else {
        landlordItem.immigrantFilling.estimateeStatus = '0'
        landlordItem.houseImplementEscalationStatus = '0'
      }
    } else if (role === RoleCodeType.assessorland) {
      // 资产评估土地
      if (this.isNotNullPic(landEstimatePic)) {
        // 评估总状态
        landlordItem.immigrantFilling.estimateeStatus = '1'
        landlordItem.landImplementEscalationStatus = '1'
      } else {
        landlordItem.immigrantFilling.estimateeStatus = '0'
        landlordItem.landImplementEscalationStatus = '0'
      }
    }

    // 人口核定完成条件：人口性质设置成功
    // if (this.isArrayAndNotNull(demographicList)) {
    //   const res = demographicList.find((item) => !item.populationNature)
    //   if (!res) {
    //     landlordItem.immigrantFilling.populationStatus = '1'
    //   } else {
    //     landlordItem.immigrantFilling.populationStatus = '0'
    //   }
    // }
    // 房屋产权完成条件：列表中所有数据的是否合法均已设置完成
    // if (this.isArrayAndNotNull(immigrantHouseList)) {
    //   const res = immigrantHouseList.find((item) => item.isCompliance !== '1')
    //   if (!res) {
    //     landlordItem.immigrantFilling.propertyStatus = '1'
    //   } else {
    //     landlordItem.immigrantFilling.propertyStatus = '0'
    //   }
    // }
    // 资格认定总状态
    if (
      landlordItem.immigrantFilling.populationStatus === '1' &&
      landlordItem.immigrantFilling.propertyStatus === '1'
    ) {
      landlordItem.immigrantFilling.qualificationStatus = '1'
    } else {
      landlordItem.immigrantFilling.qualificationStatus = '0'
    }

    // 生产安置：列表所有安置方式设置完成，生产安置确认单上传完成

    if (this.isArrayAndNotNull(demographicList)) {
      const res = demographicList.find((item) => !item.settingWay && item.name != '增计人口')
      console.log(res, '增计人口')

      if (!res && this.isNotNullPic(produceVerifyPic)) {
        landlordItem.immigrantFilling.productionArrangementStatus = '1'
      } else {
        landlordItem.immigrantFilling.productionArrangementStatus = '0'
        landlordItem.immigrantFilling.landUseStatus = '0'
      }
    }

    // 搬迁安置：填报完成判定条件：安置数据已设置，安置确认单上传完成
    if (immigrantSettle && immigrantSettle.houseAreaType && this.isNotNullPic(relocateVerifyPic)) {
      landlordItem.immigrantFilling.relocateArrangementStatus = '1'
    } else {
      landlordItem.immigrantFilling.relocateArrangementStatus = '0'
    }
    // 坟墓安置: 所有数据坟墓处置方式已选择，坟墓安置确认单上传完成
    if (landlordItem.immigrantFilling.graveArrangementStatus == '1') {
      landlordItem.immigrantFilling.graveArrangementStatus = '1'
    } else {
      if (this.isArrayAndNotNull(immigrantGraveList)) {
        const res = immigrantGraveList.find((item) => !item.handleWay)
        console.log(res, this.isNotNullPic(graveVerifyPic), '测试坟墓')
        if (res && this.isNotNullPic(graveVerifyPic)) {
          landlordItem.immigrantFilling.graveArrangementStatus = '1'
        } else {
          landlordItem.immigrantFilling.graveArrangementStatus = '0'
        }
      } else {
        landlordItem.immigrantFilling.graveArrangementStatus = '0'
      }
    }
    // 生产安置总状态
    if (
      landlordItem.immigrantFilling.productionArrangementStatus === '1' &&
      landlordItem.immigrantFilling.relocateArrangementStatus === '1' &&
      landlordItem.immigrantFilling.graveArrangementStatus === '1'
    ) {
      landlordItem.immigrantFilling.arrangementStatus = '1'
    } else {
      landlordItem.immigrantFilling.arrangementStatus = '0'
    }

    // 生产用地：生产安置确认里该户安置方式不是农业安置，文字提示，该节点自动完成
    if (landlordItem.settingWay !== '1') {
      const res = demographicList.find((item) => !item.settingWay && item.name != '增计人口')
      if (!res && this.isNotNullPic(produceVerifyPic)) {
        landlordItem.immigrantFilling.landUseStatus = '1'
      } else {
        landlordItem.immigrantFilling.landUseStatus = '0'
      }
      // landlordItem.immigrantFilling.landUseStatus = '1'
    } else if (immigrantLand && immigrantLand.landNo) {
      // 填写数据后
      landlordItem.immigrantFilling.landUseStatus = '1'
    } else {
      landlordItem.immigrantFilling.landUseStatus = '0'
    }
    // 选房择址：列表中数据的所有字段填写完成  档案上传完成
    if (
      immigrantSettle &&
      immigrantSettle.houseAreaType &&
      (immigrantSettle.houseAreaType === HouseAreaType.homestead ||
        immigrantSettle.houseAreaType === HouseAreaType.flat)
    ) {
      // 公寓房
      if (this.isArrayAndNotNull(immigrantChooseHouseList)) {
        const res = immigrantChooseHouseList.find(
          (item) => !item.houseNo && !this.isNotNullPic(item.chooseHousePic)
        )
        if (!res) {
          landlordItem.immigrantFilling.chooseHouseStatus = '1'
        } else {
          landlordItem.immigrantFilling.chooseHouseStatus = '0'
        }
      }
    } else if (
      immigrantSettle &&
      immigrantSettle.houseAreaType &&
      (immigrantSettle.houseAreaType === HouseAreaType.concentrate ||
        immigrantSettle.houseAreaType === HouseAreaType.oneself)
    ) {
      landlordItem.immigrantFilling.chooseHouseStatus = '1'
    } else {
      landlordItem.immigrantFilling.chooseHouseStatus = '0'
    }

    // 坟墓择址: 完成条件：无坟墓 或者坟墓编号&&档案 有
    if (this.isArrayAndNotNull(immigrantGraveList)) {
      const res1 = immigrantGraveList.find((item) => !item.handleWay)
      const res2 = immigrantGraveList.find((item) => !item.graveNo)
      console.log(this.isArrayAndNotNull(immigrantGraveList), res1, res2, '查看坟墓信息')
      // if (res1) {
      //   // 安置确认 坟墓没有确认
      //   landlordItem.immigrantFilling.chooseGraveStatus = '0'
      // } else {
      if (!res2 && this.isNotNullPic(graveChoosePic)) {
        landlordItem.immigrantFilling.chooseGraveStatus = '1'
      } else {
        landlordItem.immigrantFilling.chooseGraveStatus = '0'
      }
      // }
    } else {
      if (landlordItem.immigrantFilling.graveArrangementStatus == '1') {
        landlordItem.immigrantFilling.chooseGraveStatus = '1'
      } else {
        landlordItem.immigrantFilling.chooseGraveStatus = '0'
      }
    }
    // // 房屋腾空
    // if (
    //   immigrantHouseEmpty &&
    //   immigrantHouseEmpty.isHouseEmpty === '1' &&
    //   this.isNotNullPic(houseEmptyPic)
    // ) {
    //   landlordItem.immigrantFilling.houseSoarStatus = '1'
    // } else if (immigrantHouseEmpty && immigrantHouseEmpty.isHouseEmpty === '0') {
    //   landlordItem.immigrantFilling.houseSoarStatus = '1'
    // } else {
    //   landlordItem.immigrantFilling.houseSoarStatus = '0'
    // }
    // 择址总状态
    if (
      landlordItem.immigrantFilling.landUseStatus === '1' &&
      landlordItem.immigrantFilling.chooseHouseStatus === '1' &&
      landlordItem.immigrantFilling.chooseGraveStatus === '1'
    ) {
      landlordItem.immigrantFilling.chooseStatus = '1'
    } else {
      landlordItem.immigrantFilling.chooseStatus = '0'
    }

    // 协议总状态
    if (this.isNotNullPic(agreementPic)) {
      landlordItem.immigrantFilling.agreementStatus = '1'
    } else {
      landlordItem.immigrantFilling.agreementStatus = '0'
    }

    // 移民建卡
    if (this.isArrayAndNotNull(immigrantCompensationCardList)) {
      // const res = immigrantCompensationCardList.find((item) => !item.isVerify)不需要确认 是否有奖励费确认
      if (this.isNotNullPic(compensationCardPic)) {
        landlordItem.immigrantFilling.cardStatus = '1'
      } else {
        landlordItem.immigrantFilling.cardStatus = '0'
      }
    }

    // 房屋腾空
    if (
      immigrantHouseEmpty &&
      immigrantHouseEmpty.isHouseEmpty === '1' &&
      this.isNotNullPic(houseEmptyPic)
    ) {
      landlordItem.immigrantFilling.houseSoarStatus = '1'
    } else if (immigrantHouseEmpty && immigrantHouseEmpty.isHouseEmpty === '0') {
      landlordItem.immigrantFilling.houseSoarStatus = '1'
    } else {
      landlordItem.immigrantFilling.houseSoarStatus = '0'
    }

    // 土地腾空
    if (
      immigrantLandEmpty &&
      immigrantLandEmpty.isLandEmpty === '1' &&
      this.isNotNullPic(landEmptyPic)
    ) {
      landlordItem.immigrantFilling.landSoarStatus = '1'
    } else if (immigrantLandEmpty && immigrantLandEmpty.isLandEmpty === '0') {
      landlordItem.immigrantFilling.landSoarStatus = '1'
    } else {
      landlordItem.immigrantFilling.landSoarStatus = '0'
    }

    // 过渡安置
    if (
      immigrantExcess &&
      immigrantExcess.isExcess === '1' &&
      immigrantExcess.excessEndDate &&
      this.isNotNullPic(excessVerifyPic)
    ) {
      landlordItem.immigrantFilling.excessStatus = '1'
    } else if (immigrantExcess && immigrantExcess.isExcess === '0') {
      landlordItem.immigrantFilling.excessStatus = '1'
    } else {
      landlordItem.immigrantFilling.excessStatus = '0'
    }

    // 腾空过渡 总状态
    if (
      landlordItem.immigrantFilling.houseSoarStatus === '1' &&
      landlordItem.immigrantFilling.landSoarStatus === '1' &&
      landlordItem.immigrantFilling.excessStatus === '1'
    ) {
      landlordItem.immigrantFilling.excessSoarStatus = '1'
    } else {
      landlordItem.immigrantFilling.excessSoarStatus = '0'
    }

    // 搬迁安置：自建房
    if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.homestead) {
      if (this.isArrayAndNotNull(immigrantBuildOneselfList)) {
        // const res = immigrantBuildOneselfList.find((item) => item.isComplete !== '1')
        console.log(
          this.isNotNullPic(buildOneselfPic),
          this.isNotNullPic(buildOneselfCheckPic),
          '查看自建房信息'
        )
        if (this.isNotNullPic(buildOneselfPic) && this.isNotNullPic(buildOneselfCheckPic)) {
          landlordItem.immigrantFilling.buildOneselfStatus = '1'
          console.log(
            landlordItem.immigrantFilling.buildOneselfStatus,
            immigrantSettle,
            immigrantSettle.houseAreaType === HouseAreaType.homestead,
            '测试111'
          )
        } else {
          landlordItem.immigrantFilling.buildOneselfStatus = '0'
        }
      } else {
        landlordItem.immigrantFilling.buildOneselfStatus = '0'
      }
    } else {
      landlordItem.immigrantFilling.buildOneselfStatus = '0'
    }

    // 公寓房
    if (
      immigrantSettle &&
      immigrantSettle.houseAreaType === HouseAreaType.flat &&
      this.isNotNullPic(flatAgreementPic)
    ) {
      landlordItem.immigrantFilling.flatsStatus = '1'
    } else {
      landlordItem.immigrantFilling.flatsStatus = '0'
    }

    // 集中供养
    if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.concentrate) {
      const res = demographicList.find((item) => item.relocateStatus !== '1')
      if (!res) {
        landlordItem.immigrantFilling.centralizedSupportStatus = '1'
      } else {
        landlordItem.immigrantFilling.centralizedSupportStatus = '0'
      }
    } else {
      landlordItem.immigrantFilling.centralizedSupportStatus = '0'
    }
    // 自谋出路
    if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.oneself) {
      if (immigrantSelfSeeking && this.isNotNullPic(immigrantSelfSeeking.selfSeekingPic)) {
        landlordItem.immigrantFilling.selfSeekingStatus = '1'
      } else {
        landlordItem.immigrantFilling.selfSeekingStatus = '0'
      }
    } else {
      landlordItem.immigrantFilling.selfSeekingStatus = '0'
    }
    // 搬迁安置联动问题
    if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.homestead) {
      landlordItem.immigrantFilling.flatsStatus = '1'
      landlordItem.immigrantFilling.centralizedSupportStatus = '1'
      landlordItem.immigrantFilling.selfSeekingStatus = '1'
    } else if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.flat) {
      landlordItem.immigrantFilling.buildOneselfStatus = '1'
      landlordItem.immigrantFilling.centralizedSupportStatus = '1'
      landlordItem.immigrantFilling.selfSeekingStatus = '1'
    } else if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.concentrate) {
      landlordItem.immigrantFilling.flatsStatus = '1'
      landlordItem.immigrantFilling.buildOneselfStatus = '1'
      landlordItem.immigrantFilling.selfSeekingStatus = '1'
    } else if (immigrantSettle && immigrantSettle.houseAreaType === HouseAreaType.oneself) {
      landlordItem.immigrantFilling.flatsStatus = '1'
      landlordItem.immigrantFilling.centralizedSupportStatus = '1'
      landlordItem.immigrantFilling.buildOneselfStatus = '1'
    }
    // 搬迁安置 总状态 四选 1
    if (
      landlordItem.immigrantFilling.buildOneselfStatus === '1' &&
      landlordItem.immigrantFilling.flatsStatus === '1' &&
      landlordItem.immigrantFilling.centralizedSupportStatus === '1' &&
      landlordItem.immigrantFilling.selfSeekingStatus === '1'
    ) {
      landlordItem.immigrantFilling.relocateArrangementAllStatus = '1'
    } else {
      landlordItem.immigrantFilling.relocateArrangementAllStatus = '0'
    }

    // 农业安置
    if (this.isArrayAndNotNull(demographicList)) {
      const res = demographicList.find((item) => !item.settingWay && item.name != '增计人口')
      if (res) {
        // 安置确认 没有选择
        landlordItem.immigrantFilling.agricultureArrangementStatus = '0'
      } else {
        const realList = demographicList.filter((item) => item.settingWay === '1')
        if (this.isArrayAndNotNull(realList)) {
          if (this.isNotNullPic(agriculturePic)) {
            landlordItem.immigrantFilling.agricultureArrangementStatus = '1'
          } else {
            landlordItem.immigrantFilling.agricultureArrangementStatus = '0'
          }
        } else {
          // 无农业安置
          landlordItem.immigrantFilling.agricultureArrangementStatus = '1'
        }
      }
    }

    // 养老保险
    if (this.isArrayAndNotNull(demographicList)) {
      const res = demographicList.find((item) => !item.settingWay && item.name != '增计人口')
      if (res) {
        // 安置确认 没有选择
        landlordItem.immigrantFilling.retirementStatus = '0'
      } else {
        const realList = demographicList.filter((item) => item.settingWay === '2')
        if (this.isArrayAndNotNull(realList)) {
          const res = realList.find((item) => item.productionStatus !== '1')
          if (!res) {
            landlordItem.immigrantFilling.retirementStatus = '1'
          } else {
            landlordItem.immigrantFilling.retirementStatus = '0'
          }
        } else {
          // 无养老保险
          landlordItem.immigrantFilling.retirementStatus = '1'
        }
      }
    }
    // 自谋职业
    if (this.isArrayAndNotNull(demographicList)) {
      const res = demographicList.find((item) => !item.settingWay && item.name != '增计人口')
      if (res) {
        // 安置确认 没有选择
        landlordItem.immigrantFilling.selfEmploymentStatus = '0'
      } else {
        const realList = demographicList.filter((item) => item.settingWay === '3')
        if (this.isArrayAndNotNull(realList)) {
          const res = realList.find((item) => item.productionStatus !== '1')
          if (!res) {
            landlordItem.immigrantFilling.selfEmploymentStatus = '1'
          } else {
            landlordItem.immigrantFilling.selfEmploymentStatus = '0'
          }
        } else {
          // 无自谋职业
          landlordItem.immigrantFilling.selfEmploymentStatus = '1'
        }
      }
    }

    // 生产安置总状态
    if (
      landlordItem.immigrantFilling.agricultureArrangementStatus === '1' &&
      landlordItem.immigrantFilling.retirementStatus === '1' &&
      landlordItem.immigrantFilling.selfEmploymentStatus === '1'
    ) {
      landlordItem.immigrantFilling.productionArrangementAllStatus = '1'
    } else {
      landlordItem.immigrantFilling.productionArrangementAllStatus = '0'
    }

    // 相关手续
    if (type === MainType.PeasantHousehold) {
      if (this.isArrayAndNotNull(immigrantProceduresList)) {
        const res = immigrantProceduresList.find((item) => item.isComplete !== '1')
        if (!res) {
          landlordItem.immigrantFilling.proceduresStatus = '1'
        } else {
          landlordItem.immigrantFilling.proceduresStatus = '0'
        }
      }
    } else {
      if (this.isNotNullPic(proceduresPic)) {
        landlordItem.immigrantFilling.proceduresStatus = '1'
      } else {
        landlordItem.immigrantFilling.proceduresStatus = '0'
      }
    }

    // 集体资产
    if (this.isNotNullPic(collectiveAssetsPic)) {
      landlordItem.immigrantFilling.disposalMeasuresStatus = '1'
    } else {
      landlordItem.immigrantFilling.disposalMeasuresStatus = '0'
    }

    return landlordItem
  }

  // 调查对象-uid查询单个数据-页面使用(除去资产评估的其他实施阶段使用)
  getImpLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}

        // 获取坟墓信息
        const graveList = await GraveController.getImpListWithLandlord(res.type, res.doorNo)
        if (res && res.uid) {
          // 赋值坟墓信息
          res.immigrantGraveList = graveList || []
          console.log('res坟墓信息', res.immigrantGraveList)
          // if (this.isArrayAndNotNull(res.demographicList)) {
          //   res.demographicList = res.demographicList.filter((item) => item.isDelete !== '1')
          // }

          if (this.isArrayAndNotNull(res.immigrantHouseList)) {
            res.immigrantHouseList = res.immigrantHouseList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantTreeList)) {
            res.immigrantTreeList = res.immigrantTreeList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantEquipmentList)) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantInfrastructureList)) {
            res.immigrantInfrastructureList = res.immigrantInfrastructureList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantOtherList)) {
            res.immigrantOtherList = res.immigrantOtherList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantFacilitiesList)) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetHouseFitUpList)) {
            res.assetHouseFitUpList = res.assetHouseFitUpList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.landEstimateDtoList)) {
            res.landEstimateDtoList = res.landEstimateDtoList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetAppendantList)) {
            res.assetAppendantList = res.assetAppendantList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantChooseHouseList)) {
            res.immigrantChooseHouseList = res.immigrantChooseHouseList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantCompensationCardList)) {
            res.immigrantCompensationCardList = res.immigrantCompensationCardList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantBuildOneselfList)) {
            res.immigrantBuildOneselfList = res.immigrantBuildOneselfList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantProceduresList)) {
            res.immigrantProceduresList = res.immigrantProceduresList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (!res.immigrantDocumentation) {
            res.immigrantDocumentation = { ...defaultDocumentObj }
          }
          if (!res.immigrantFilling) {
            res.immigrantFilling = { ...defaultFillingObj }
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          // 选择户型类型
          res.houseAreaType = res.immigrantSettle ? res.immigrantSettle.houseAreaType : null
          // 户主的 settingWay
          res.settingWay =
            (res.demographicList || []).find((demographic) => demographic.relation === '1')
              ?.settingWay || ''
          // console.log(res, '业主详情')

          resolve(this.updateImpFillStatus(res))
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getImpLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 调查对象-uid查询单个数据-页面使用(资产评估专用)
  getEvaLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}
        console.log(res, '查询数据是什么？')
        // 获取坟墓信息
        const graveList = await GraveController.getImpListWithLandlord(res.type, res.doorNo)
        if (res && res.uid) {
          // 赋值坟墓信息
          res.immigrantGraveList = graveList || []
          if (this.isArrayAndNotNull(res.demographicList)) {
            res.demographicList = res.demographicList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantHouseList)) {
            res.immigrantHouseList = res.immigrantHouseList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantTreeList)) {
            res.immigrantTreeList = res.immigrantTreeList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantEquipmentList)) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantInfrastructureList)) {
            res.immigrantInfrastructureList = res.immigrantInfrastructureList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantOtherList)) {
            res.immigrantOtherList = res.immigrantOtherList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }
          if (this.isArrayAndNotNull(res.immigrantFacilitiesList)) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetHouseFitUpList)) {
            res.assetHouseFitUpList = res.assetHouseFitUpList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.landEstimateDtoList)) {
            res.landEstimateDtoList = res.landEstimateDtoList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetAppendantList)) {
            res.assetAppendantList = res.assetAppendantList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantChooseHouseList)) {
            res.immigrantChooseHouseList = res.immigrantChooseHouseList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantCompensationCardList)) {
            res.immigrantCompensationCardList = res.immigrantCompensationCardList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantBuildOneselfList)) {
            res.immigrantBuildOneselfList = res.immigrantBuildOneselfList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantProceduresList)) {
            res.immigrantProceduresList = res.immigrantProceduresList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }

          if (!res.immigrantDocumentation) {
            res.immigrantDocumentation = { ...defaultDocumentObj }
          }
          if (!res.immigrantFilling) {
            res.immigrantFilling = { ...defaultFillingObj }
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          // 选择户型类型
          res.houseAreaType = res.immigrantSettle ? res.immigrantSettle.houseAreaType : null
          // 户主的 settingWay
          res.settingWay =
            (res.demographicList || []).find((demographic) => demographic.relation === '1')
              ?.settingWay || ''

          resolve(this.updateImpFillStatus(res))
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getImpLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 调查对象-修改基础信息
  updateBaseLandlord(data: Partial<LandlordType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        const landlord = await this.getLandlordByUidNoFilter(data.uid)
        if (landlord) {
          const newData = { ...landlord, ...data }
          // 更新了
          newData.isUpdate = '1'
          // 居民户信息填报完成
          if (this.isNotNullPic(newData.householdPic)) {
            newData.immigrantFilling.householdPicStatus = '1'
          } else {
            newData.immigrantFilling.householdPicStatus = '0'
          }
          const values = getLandlordSqlValues(newData)
          const sql = `update ${LandlordTableName} set ${values} where uid = '${newData.uid}'`
          const res = await this.db.execteSql([sql])
          if (res && res.code) {
            reject(false)
            return
          }
          resolve(true)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
        }
      } catch (error) {
        console.log(error, 'updateBaseLandlord-error')
        reject(false)
      }
    })
  }

  // 调查对象修改-逻辑处理使用
  updateLandlord(data: LandlordType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        /**
         * 更新填报状态
         */
        console.log(data, '测试接口数据')
        const realData = this.updateImpFillStatus(data)
        // 拿到更新的sql字符串

        console.log(realData, '测试数据库字段是否正确')
        const values = getLandlordSqlValues(realData)
        // console.log('values', values, 'realData', realData)

        const sql = `update ${LandlordTableName} set ${values} where uid = '${realData.uid}'`
        const res = await this.db.execteSql([sql])
        console.log('成功', res)
        if (res && res.code) {
          reject(false)
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateLandlord-error')
        reject(false)
      }
    })
  }

  // 调查对象-uid查询单个数据-逻辑处理使用(不做数据过滤)
  getLandlordByUidNoFilter(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}

        if (res && res.uid) {
          if (!res.immigrantDocumentation) {
            res.immigrantDocumentation = { ...defaultDocumentObj }
          }
          if (!res.immigrantFilling) {
            res.immigrantFilling = { ...defaultFillingObj }
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          // 选择户型类型
          res.houseAreaType = res.immigrantSettle ? res.immigrantSettle.houseAreaType : null
          // 户主的 settingWay
          res.settingWay =
            (res.demographicList || []).find((demographic) => demographic.relation === '1')
              ?.settingWay || ''
          // console.log(res, '业主详情')
          resolve(res)
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getLandlordByUidNoFilter-error')
        reject(null)
      }
    })
  }

  // 调查对象-根据行政村 和 名称 查询列表
  getLandlordListBySearch(data?: LandlordSearchType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          name,
          areaCode,
          townCode,
          villageCode,
          virutalVillageCode,
          type,
          warnStatus,
          doorNo,
          pageSize = 10,
          page = 1
        } = data || {}
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where isPadDelete = '0'`
        if (type) {
          sql += ` and type = '${type}'`
        }
        if (name) {
          sql += ` and (name like '%${name}%' or doorNo like '%${name.slice(
            name.length - 6 < 0 ? 0 : name.length - 6,
            name.length
          )}%' or content like '%${name}%')`
        }
        if (areaCode) {
          sql += ` and areaCode = '${areaCode}'`
        }
        if (townCode) {
          sql += ` and townCode = '${townCode}'`
        }
        if (villageCode) {
          sql += ` and villageCode = '${villageCode}'`
        }
        if (virutalVillageCode) {
          sql += ` and virutalVillageCode = '${virutalVillageCode}'`
        }
        if (warnStatus) {
          sql += ` and warnStatus = '${warnStatus}'`
        }
        if (doorNo) {
          sql += ` and doorNo = '${doorNo}'`
        }
        sql += ` order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize}`
        // console.log('sql', sql)
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            item.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            item.villageCodeText = districtMap[item.villageCode]
            item.townCodeText = districtMap[item.townCode]
            item.areaCodeText = districtMap[item.areaCode]
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'getLandlordListBySearch-error')
        reject([])
      }
    })
  }
}

export const ImpLandlordController = new ImpLandlord()
