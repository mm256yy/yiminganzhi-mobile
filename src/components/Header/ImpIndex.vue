<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ dataInfo.name }}</view>
        <view class="account-no">{{ filterViewDoorNoMd(dataInfo) }}</view>
        <view class="fill-number">
          填报进度&nbsp;
          <text class="green">9</text>
          /{{ totalFillNumber }}
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
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    totalFillNumber: function () {
      switch (this.type) {
        case MainType.PeasantHousehold:
          return 17
          break
        case MainType.Company:
          return 17
          break
        case MainType.IndividualHousehold:
          return 17
          break
        case MainType.Village:
          return 17
          break
        default:
          return 17
          break
      }
    },
    fillNumber: function () {
      const {
        demographicList,
        immigrantHouseList,
        immigrantEquipmentList,
        immigrantFacilitiesList,
        type
      } = this.dataInfo

      let fillCount = 0

      // 上报开始校验数据
      if (type === MainType.PeasantHousehold) {
        // 居民户
        if (this.isNotNullArray(demographicList)) {
          fillCount++
        }
        if (this.isNotNullArray(immigrantHouseList)) {
          fillCount++
        }
      } else if (type === MainType.IndividualHousehold) {
        // 个体户
        if (this.isNotNullArray(immigrantEquipmentList)) {
          fillCount++
        }
      } else if (type === MainType.Company) {
        // 企业
        if (this.isNotNullArray(immigrantEquipmentList)) {
          fillCount++
        }
      } else if (type === MainType.Village) {
        // 村集体
        if (this.isNotNullArray(immigrantFacilitiesList)) {
          fillCount++
        }
      }
      return fillCount
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
