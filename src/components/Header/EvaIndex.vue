<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ dataInfo.name }}</view>
        <view class="account-no">{{ dataInfo.showDoorNo }}</view>
        <view class="fill-number">
          表单填报&nbsp;
          <text class="green">{{ fillNumber }}</text>
          /{{ totalFillNumber }}
        </view>
      </view>
     <view class="title">
            <view v-if="dataInfo.relateIndividualHouseholdName != ''">
        关联个体户:<text style="color: blue" @click="editLandlords">{{
          dataInfo.relateIndividualHouseholdName
        }}</text>
      </view>
      <view v-if="dataInfo.relateCompanyName != ''">
        关联企业:<text style="color: blue" @click="editLandlord">{{
          dataInfo.relateCompanyName
        }}</text>
      </view>
     </view>
      <view class="list-header-right" v-if="tabVal !== 0">
        <view class="btn-wrapper green" @click="onDocumentation">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">档案上传</text>
        </view>
        <view class="btn-wrapper blue" @click="onFilled">
          <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
          <text class="txt">填报完成</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, unref } from 'vue'
// import { filterViewDoorNo, routerForward, getStorage, StorageKey } from '@/utils'
// import { MainType } from '@/types/common'
import { getLandlordListBySearchApi } from '@/service'
// import { RoleCodeType } from '@/types/common'
import { LandlordType } from '@/types/sync'
interface PropsType {
  dataInfo: LandlordType
}
const props = defineProps<PropsType>()
const tabType = ref<MainType>(MainType.Company)
const tabTypes = ref<MainType>(MainType.IndividualHousehold)
const companyUid = ref<any>()
const individualHouseholdUid = ref<any>()

// 填报
const routerMap: any = {
  [MainType.Company]: 'enterpriseEva',
  // [MainType.PeasantHousehold]: 'peasantHousehold',
  [MainType.IndividualHousehold]: 'selfPersonEva'
  // [MainType.Village]: 'collective'
}

const dataList = ref<any>()
//企业跳转
const editLandlord = () => {
  console.log('测试企业跳转')
  const name = routerMap[tabType.value]
  console.log(name, 'name是什么')
  console.log(companyUid.value.uid, '企业uid是什么')
  routerForward(name, {
    type: 'edit',
    uid: companyUid.value.uid
  })
}

//个体户跳转
const editLandlords = () => {
  console.log('个体户跳转')
  const name = routerMap[tabTypes.value]
  console.log(individualHouseholdUid.value.uid, '个体工商户uid是什么')
  routerForward(name, {
    type: 'edit',
    uid: individualHouseholdUid.value.uid
  })
}
//企业
const getList = async () => {
  const params: any = {
    type: unref(tabType),
    page: 1,
    pageSize: 10
  }
  const res = await getLandlordListBySearchApi(params).catch(() => {})
  companyUid.value = res.find((item: any) => item.name == dataList.value.relateCompanyName)
}

//个体工商户
const getLists = async () => {
  const params: any = {
    type: unref(tabTypes),
    page: 1,
    pageSize: 10
  }
  const res = await getLandlordListBySearchApi(params).catch(() => {})
  individualHouseholdUid.value = res.find(
    (item: any) => item.name == dataList.value.relateIndividualHouseholdName
  )
}
watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      console.log(val, '再次监听')
      dataList.value = val
    }
  },
  { deep: true, immediate: true }
)
onMounted(() => {
  getList()
  getLists()
})
</script>
<script lang="ts">
import { filterViewDoorNo, routerForward, getStorage, StorageKey } from '@/utils'
import { MainType } from '@/types/common'
import { updateImpLandlordImmigrantFillingApi } from '@/service'
import { showToast, SUCCESS_MSG, ERROR_MSG } from '@/config'
import { RoleCodeType } from '@/types/common'

export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    tabVal: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalFillNumber: function () {
      const role: RoleCodeType = getStorage(StorageKey.USERROLE)
      switch (this.type) {
        case MainType.PeasantHousehold:
          return role === RoleCodeType.assessor ? 5 : 3
          break
        case MainType.Company:
          return role === RoleCodeType.assessor ? 8 : 3
          break
        case MainType.IndividualHousehold:
          return role === RoleCodeType.assessor ? 8 : 3
          break
        case MainType.Village:
          return role === RoleCodeType.assessor ? 7 : 3
          break
        case MainType.LandNoMove:
          return 3
          break
        default:
          return 8
          break
      }
    },
    fillNumber: function () {
      const { immigrantFilling, type } = this.dataInfo

      const role: RoleCodeType = getStorage(StorageKey.USERROLE)
      let fillCount = 1

      if (role === RoleCodeType.assessor) {
        const {
          houseMainStatus,
          houseRenovationStatus,
          appendageStatus,
          treeStatus,
          deviceStatus,
          specialStatus,
          infrastructureStatus, // 基础设施评估
          otherStatus // 其他评估
        } = immigrantFilling

        // 资产评估-房屋角色
        if (houseMainStatus === '1') {
          fillCount++
        }
        if (houseRenovationStatus === '1') {
          fillCount++
        }
        if (appendageStatus === '1') {
          fillCount++
        }
        if (treeStatus === '1') {
          fillCount++
        }

        if (type === MainType.IndividualHousehold || type === MainType.Company) {
          // 个体户 企业
          if (deviceStatus === '1') {
            fillCount++
          }

          if (infrastructureStatus === '1') {
            fillCount++
          }

          if (otherStatus === '1') {
            fillCount++
          }
        }

        if (type === MainType.Village) {
          // 村集体
          if (specialStatus === '1') {
            fillCount++
          }

          if (infrastructureStatus === '1') {
            fillCount++
          }
        }
      } else {
        const { landStatus, landSeedlingStatus } = immigrantFilling
        // 资产评估-土地角色
        if (landStatus === '1') {
          fillCount++
        }
        if (landSeedlingStatus === '1') {
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
    },
    // 档案上传
    onDocumentation() {
      routerForward('archives', {
        type: 12,
        uid: this.dataInfo.uid,
        mainTypes: this.type
      })
    },
    // 填报完成
    onFilled() {
      const { uid } = this.dataInfo
      let params = {}

      if (this.tabVal === 1) {
        params = {
          houseMainStatus: '1' // 房屋主体评估
        }
      } else if (this.tabVal === 2) {
        params = {
          houseRenovationStatus: '1' // 房屋装修评估
        }
      } else if (this.tabVal === 3) {
        params = {
          appendageStatus: '1' // 房屋附属设施评估
        }
      } else if (this.tabVal === 4) {
        params = {
          treeStatus: '1' // 零星(林)果木评估
        }
      } else if (this.tabVal === 8) {
        params = {
          landStatus: '1' // 土地基本情况评估
        }
      } else if (this.tabVal === 9) {
        params = {
          landSeedlingStatus: '1' // 土地青苗及附着物评估
        }
      } else if (
        this.tabVal === 5 &&
        (this.type === MainType.Company || this.type === MainType.IndividualHousehold)
      ) {
        params = {
          deviceStatus: '1' // 设施设备评估
        }
      } else if (this.tabVal === 6) {
        params = {
          infrastructureStatus: '1' // 基础设施评估
        }
      } else if (this.tabVal === 7) {
        params = {
          otherStatus: '1' // 其他评估
        }
      } else if (this.tabVal === 5 && this.type === MainType.Village) {
        params = {
          specialStatus: '1' // 农村小型专项及农副业设施评估
        }
      }

      updateImpLandlordImmigrantFillingApi(uid, params)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            this.$emit('updateData')
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
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
  .title {
    display: flex;
    height: 28rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    justify-content: space-between;
    line-height:28rpx;
  }
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  border-bottom: 1rpx solid #e1e4ea;
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
        margin: 0 6rpx 0 10rpx;
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
        margin-left: 5rpx;
        border-radius: 11rpx;

        &:active {
          opacity: 0.7;
        }

        &.green {
          background-color: #30a952;
        }

        &.blue {
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
