<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ dataInfo.name }}</view>
        <view class="account-no">{{ dataInfo.showDoorNo  }}</view>
        <!-- {{ props.data.showDoorNo }} -->
        <view class="fill-number">
          填报进度&nbsp;
          <text class="green">{{ getProgressText.count }}</text>
          /{{ getProgressText.total }}
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { filterViewDoorNo } from '@/utils'
import { MainType } from '@/types/common'

export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    totalFillNumber: function () {
      const { type } = this.dataInfo
      switch (type) {
        case MainType.PeasantHousehold:
          return 19
          break
        case MainType.Company:
          return 8
          break
        case MainType.IndividualHousehold:
          return 8
          break
        case MainType.Village:
          return 6
          break
        default:
          return 19
          break
      }
    },
    fillNumber: function () {
      const { type, immigrantFilling } = this.dataInfo
      if (!immigrantFilling) {
        return 0
      }
      const {
        householdPicStatus,
        appendageStatus,
        landStatus,
        populationStatus,
        propertyStatus,
        productionArrangementStatus,
        relocateArrangementStatus,
        graveArrangementStatus,
        landUseStatus,
        chooseHouseStatus,
        chooseGraveStatus,
        cardStatus,
        houseSoarStatus,
        landSoarStatus,
        excessStatus,
        buildOneselfStatus,
        flatsStatus,
        centralizedSupportStatus,
        selfSeekingStatus,
        agricultureArrangementStatus,
        retirementStatus,
        selfEmploymentStatus,
        proceduresStatus,
        agreementStatus,
        deviceStatus,
        specialStatus,
        disposalMeasuresStatus
      } = immigrantFilling || {}

      let fillCount = 0

      // 居民户
      if (type === MainType.PeasantHousehold) {
        // 居民户信息完成状态
        if (householdPicStatus === '1') {
          fillCount++
        }

        // 人口核定状态
        if (populationStatus === '1') {
          fillCount++
        }

        // 房屋产权状态
        if (propertyStatus === '1') {
          fillCount++
        }

        // 房屋/附属物评估状态
        if (appendageStatus === '1') {
          fillCount++
        }

        // 土地/附着物评估状态
        if (landStatus === '1') {
          fillCount++
        }

        // 生产安置状态
        if (productionArrangementStatus === '1') {
          fillCount++
        }

        // 搬迁安置状态
        if (relocateArrangementStatus === '1') {
          fillCount++
        }

        // 坟墓确认状态
        if (graveArrangementStatus === '1') {
          fillCount++
        }

        // 生产用地状态
        if (landUseStatus === '1') {
          fillCount++
        }

        // 选房择址状态
        if (chooseHouseStatus === '1') {
          fillCount++
        }

        // 坟墓择址状态
        if (chooseGraveStatus === '1') {
          fillCount++
        }

        // 移民建卡状态
        if (cardStatus === '1') {
          fillCount++
        }

        // 房屋腾空状态
        if (houseSoarStatus === '1') {
          fillCount++
        }

        // 土地腾让状态
        if (landSoarStatus === '1') {
          fillCount++
        }

        // 过渡安置状态
        if (excessStatus === '1') {
          fillCount++
        }

        // 动迁协议状态
        if (agreementStatus === '1') {
          fillCount++
        }

        // 自建房状态
        if (buildOneselfStatus === '1') {
          fillCount++
        }

        // 公寓房状态
        if (flatsStatus === '1') {
          fillCount++
        }

        // 集中供养状态
        if (centralizedSupportStatus === '1') {
          fillCount++
        }

        // 自谋出路状态
        if (selfSeekingStatus === '1') {
          fillCount++
        }

        // 农业安置状态
        if (agricultureArrangementStatus === '1') {
          fillCount++
        }

        // 养老保险状态
        if (retirementStatus === '1') {
          fillCount++
        }

        // 自谋职业状态
        if (selfEmploymentStatus === '1') {
          fillCount++
        }

        // 相关手续状态
        if (proceduresStatus === '1') {
          fillCount++
        }
      } else if (type === MainType.Company) {
        // 房屋/附属物评估状态
        if (appendageStatus === '1') {
          fillCount++
        }

        // 土地/附着物评估状态
        if (landStatus === '1') {
          fillCount++
        }

        // 设施设备评估状态
        if (deviceStatus === '1') {
          fillCount++
        }

        // 企业建卡状态
        if (cardStatus === '1') {
          fillCount++
        }

        // 房屋腾空状态
        if (houseSoarStatus === '1') {
          fillCount++
        }

        // 土地腾让状态
        if (landSoarStatus === '1') {
          fillCount++
        }

        // 动迁协议状态
        if (agreementStatus === '1') {
          fillCount++
        }

        // 相关手续状态
        if (proceduresStatus === '1') {
          fillCount++
        }
      } else if (type === MainType.IndividualHousehold) {
        // 房屋/附属物评估状态
        if (appendageStatus === '1') {
          fillCount++
        }

        // 土地/附着物评估状态
        if (landStatus === '1') {
          fillCount++
        }

        // 设施设备评估状态
        if (deviceStatus === '1') {
          fillCount++
        }

        // 个体户建卡状态
        if (cardStatus === '1') {
          fillCount++
        }

        // 房屋腾空状态
        if (houseSoarStatus === '1') {
          fillCount++
        }

        // 土地腾让状态
        if (landSoarStatus === '1') {
          fillCount++
        }

        // 动迁协议状态
        if (agreementStatus === '1') {
          fillCount++
        }

        // 相关手续状态
        if (proceduresStatus === '1') {
          fillCount++
        }
      } else if (type === MainType.Village) {
        // 房屋/附属物评估状态
        if (appendageStatus === '1') {
          fillCount++
        }

        // 土地/附着物评估状态
        if (landStatus === '1') {
          fillCount++
        }

        // 小型专项及农副业设施评估状态
        if (specialStatus === '1') {
          fillCount++
        }

        // 房屋腾空状态
        if (houseSoarStatus === '1') {
          fillCount++
        }

        // 动迁协议状态
        if (agreementStatus === '1') {
          fillCount++
        }

        // 集体资产处置方法状态
        if (disposalMeasuresStatus === '1') {
          fillCount++
        }
      }
      return fillCount
    },
    getProgressText: function () {
      let count = 0
      let total = 0
      if (!this.dataInfo) {
        return {
          count,
          total
        }
      }
      const { type, immigrantFilling = {} } = this.dataInfo
      if (type === MainType.PeasantHousehold) {
        // 居民户信息
        if (immigrantFilling.householdPicStatus === '1') {
          count++
        }
        // 资格认定
        if (immigrantFilling.qualificationStatus === '1') {
          count++
        }
        // 资产评估
        if (immigrantFilling.estimateeStatus === '1') {
          count++
        }
        // 安置确认
        if (immigrantFilling.arrangementStatus === '1') {
          count++
        }
        // 择址确认
        if (immigrantFilling.chooseStatus === '1') {
          count++
        }
        // 协议
        if (immigrantFilling.agreementStatus === '1') {
          count++
        }
        // 移民剪卡
        if (immigrantFilling.cardStatus === '1') {
          count++
        }
        // 腾空
        if (immigrantFilling.excessSoarStatus === '1') {
          count++
        }
        // 搬迁安置
        if (immigrantFilling.relocateArrangementAllStatus === '1') {
          count++
        }
        // 生产安置
        if (immigrantFilling.productionArrangementAllStatus === '1') {
          count++
        }
        // 相关手续
        if (immigrantFilling.proceduresStatus === '1') {
          count++
        }
        total = 11
      } else if (type === MainType.Company) {
        // 资产评估
        if (immigrantFilling.estimateeStatus === '1') {
          count++
        }
        // 协议
        if (immigrantFilling.agreementStatus === '1') {
          count++
        }
        // 移民剪卡
        if (immigrantFilling.cardStatus === '1') {
          count++
        }
        // 腾空
        if (immigrantFilling.excessSoarStatus === '1') {
          count++
        }
        // 相关手续
        if (immigrantFilling.proceduresStatus === '1') {
          count++
        }
        total = 5
      } else if (type === MainType.IndividualHousehold) {
        // 资产评估
        if (immigrantFilling.estimateeStatus === '1') {
          count++
        }
        // 协议
        if (immigrantFilling.agreementStatus === '1') {
          count++
        }
        // 移民剪卡
        if (immigrantFilling.cardStatus === '1') {
          count++
        }
        // 腾空
        if (immigrantFilling.excessSoarStatus === '1') {
          count++
        }
        // 相关手续
        if (immigrantFilling.proceduresStatus === '1') {
          count++
        }
        total = 5
      } else if (type === MainType.Village) {
        // 资产评估
        if (immigrantFilling.estimateeStatus === '1') {
          count++
        }
        // 协议
        if (immigrantFilling.agreementStatus === '1') {
          count++
        }
        // 移民剪卡
        if (immigrantFilling.cardStatus === '1') {
          count++
        }
        // 集体资产
        if (immigrantFilling.disposalMeasuresStatus === '1') {
          count++
        }
        total = 4
      }
      return {
        count,
        total
      }
    }
  },
  watch: {
    dataInfo: function (val, old) {
      // 切换业主时 清理缓存
      if (JSON.stringify(val) === JSON.stringify(old)) {
        return
      }
    }
  },
  methods: {
    filterViewDoorNoMd(data: any) {
      return filterViewDoorNo(data)
    },
    // 是否为空数组
    isNotNullArray(arr: any) {
      return arr && Array.isArray(arr) && arr.length
    }
  }
}
</script>

<script module="print" lang="renderjs">
import { printPdf } from '@/print'

export default {
  methods: {
    getPdf(newValue, oldValue, ownerInstance, instance) {
      console.log('触发了属性变更')
      try {
        // 拿到业主详情
        // 根据模版id生成对应的pdf 拿到base64
        const {
          landlords,
          projectInfo,
          templateIds,
          type
        } = newValue
        if (!landlords || !landlords.length) {
          console.log('landlords数据为空')
          return
        }
        if (!templateIds || !templateIds.length) {
          console.log('templateIds数据为空')
          return
        }

        const promiseArray = []
        landlords.forEach((landlord) => {
          if (type === 'print') {
            promiseArray.push(printPdf.createPeople(templateIds, landlord, projectInfo))
          } else if (type === 'printIndividualHousehold') {
            promiseArray.push(printPdf.createSelfemployed(templateIds, landlord, projectInfo))
          } else if (type === 'printCompany') {
            promiseArray.push(printPdf.createCompany(templateIds, landlord, projectInfo))
          } else if (type === 'printCollective') {
						promiseArray.push(printPdf.createCollective(templateIds, landlord, projectInfo))
					}
        })
        // 并行生成
        Promise.all(promiseArray)
          .then((result) => {
            // [['',''], ['', '']] 两个业主返回的数据结构
            // [['']] 单个业主 单个模版的数据结构
            ownerInstance.callMethod('getPrintResult', result)
          })
          .catch((err) => {
            console.error(err, '-errr')
            ownerInstance.callMethod('getPrintErrorResult', err)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 0;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }

      .fill-number {
        display: flex;
        height: 24rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        font-size: 11rpx;
        font-weight: 500;
        color: #171718;
        background-color: #e1f0ff;
        border-radius: 28rpx;
        align-items: center;
        justify-content: center;

        .green {
          color: #30a952;
        }
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 68rpx;
        height: 23rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.print {
          background-color: #30a952;
        }

        &.report {
          margin-left: 7rpx;
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}

.tips-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .tips-title {
    width: 344rpx;
    height: 33rpx;
    font-size: 11rpx;
    font-weight: 600;
    line-height: 33rpx;
    color: #000;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0 0;
  }

  .tips-content {
    width: 344rpx;
    height: 156rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    &.completed-report {
      height: 68rpx;
      padding: 30rpx 59rpx;
    }

    .tips-list {
      width: 264rpx;
      height: 88rpx;
      padding: 16rpx 19rpx;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .tips-item {
        display: flex;
        font-size: 9rpx;
        line-height: 1.5;
        color: #131313;
        align-items: center;
        flex-direction: column;
      }
    }

    .tips {
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #131313;
    }

    .file-list {
      width: 264rpx;
      height: 135rpx;
      overflow-y: scroll;

      .file-item {
        display: flex;
        width: 264rpx;
        height: 40rpx;
        padding: 0 14rpx;
        margin-bottom: 7rpx;
        background-color: #fff;
        border-radius: 3rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;

        &.active {
          border: 1rpx solid #3e73ec;
        }

        .name {
          font-size: 9rpx;
          color: #131313;
        }

        .btns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 44rpx;

          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
  }
}

.device-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .device-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 264rpx;
    height: 88rpx;
    padding: 16rpx 19rpx;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;
  }
}

.btn-wrapper {
  display: flex;
  width: 344rpx;
  height: 33rpx;
  padding: 0 9rpx;
  background: #fff;
  border-radius: 0 0 5rpx 5rpx;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-end;

  .btn {
    width: 52rpx;
    height: 21rpx;
    font-size: 9rpx;
    line-height: 21rpx;
    text-align: center;
    border-radius: 3rpx;

    &.cancel {
      color: rgba(0, 0, 0, 0.85);
      background: #fff;
      border: 1rpx solid #d9d9d9;
    }

    &.confirm {
      margin-left: 6rpx;
      color: #fff;
      background: #3e73ec;
    }
  }
}
</style>
