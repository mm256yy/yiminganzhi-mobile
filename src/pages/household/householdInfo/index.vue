<template>
  <view class="household-info-wrapper">
    <!-- 个人信息 -->
    <view class="list">
      <view class="list-item">
        <view class="list-1">
          <view style="display: flex; align-items: center">
            <view class="icon">户主</view>
            <view class="name">
              {{ formatStr(props.dataInfo.name) }}
            </view>
          </view>
          <view style="display: flex; align-items: center">
            <view class="name">
              关联个体户：<text @click="editLandlords" style="color: blue">{{
                formatStr(props.dataInfo.relateIndividualHouseholdName)
              }}</text>
            </view>
            <view class="btn-wrapper report" v-if="!props.dataInfo.relateIndividualHouseholdName">
              <text class="txt" @click="addLandlords">添加</text>
            </view>
          </view>
          <view style="display: flex; align-items: center">
            <view class="name">
              关联企业：<text @click="editLandlord" style="color: blue">{{
                formatStr(props.dataInfo.relateCompanyName)
              }}</text>
            </view>
            <view class="btn-wrapper report" v-if="!props.dataInfo.relateCompanyName">
              <text class="txt" @click="addLandlord">添加</text>
            </view>
          </view>
        </view>
        <view class="list-2" @click="toLink('edit')">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">
                  {{ props.dataInfo.showDoorNo }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">自然村/村民小组：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.virutalVillageCodeText) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">是否财产户：</view>
                <view class="content">
                  {{ dictOption(yesAndNoEnums, props.dataInfo.hasPropertyAccount) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.phone) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍所在地：</view>
                <view class="content">
                  {{ formatStr(props.dataInfo.address) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">所在位置：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.locationType, 326) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">淹没范围：</view>
                <view class="content">
                  {{ formatDict(props.dataInfo.inundationRange, 346) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">经纬度：</view>
                <view class="content">
                  {{ props.dataInfo.longitude }} {{ props.dataInfo.latitude }}
                </view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <image
      class="btn edit"
      src="@/static/images/icon_edit.png"
      mode="scaleToFill"
      @click="toLink('edit')"
    />
  </view>
</template>

<script lang="ts" setup>
import {
  formatStr,
  formatDict,
  dictOption,
  splitStr,
  routerForward,
  filterViewDoorNo,
  getStorage,
  StorageKey
} from '@/utils'
import { locationTypes, yesAndNoEnums } from '@/config/common'
import { compatibleOldSystems } from '@/pages/common/config'
import { MainType, RoleCodeType } from '@/types/common'
import { ref, unref, nextTick, onMounted } from 'vue'
import { getLandlordListBySearchApi } from '@/service'
const tabType = ref<MainType>(MainType.Company)
const tabTypes = ref<MainType>(MainType.IndividualHousehold)
const companyUid = ref<any>()
const individualHouseholdUid = ref<any>()
const props = defineProps({
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})
const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))

/**
 * 获取页面跳转的路由 name
 * @params {Object} roleType 角色类型
 */
/**
 * 获取页面跳转的路由 name
 * @params {Object} roleType 角色类型
 */
const getRouterNameCompany = (roleType: string) => {
  if (roleType === RoleCodeType.investigator) {
    return 'enterprise'
  } else if (roleType === RoleCodeType.assessor || roleType === RoleCodeType.assessorland) {
    return 'enterpriseEva'
  } else if (roleType === RoleCodeType.implementation) {
    return 'enterpriseImp'
  } else {
    return 'enterprise'
  }
}
/**
 * 获取页面跳转的路由 name
 * @params {Object} roleType 角色类型
 */
const getRouterName = (roleType: string) => {
  if (roleType === RoleCodeType.investigator) {
    return 'selfPerson'
  } else if (roleType === RoleCodeType.assessor || roleType === RoleCodeType.assessorland) {
    return 'selfPersonEva'
  } else if (roleType === RoleCodeType.implementation) {
    return 'selfPersonImp'
  } else {
    return 'selfPerson'
  }
}
//企业
const getList = () => {
  const params: any = {
    type: unref(tabType),
    page: 1,
    pageSize: 10
  }
  nextTick(async () => {
    const res = await getLandlordListBySearchApi(params).catch(() => {})
    console.log(res, '企业res是什么')
    companyUid.value = res.find((item: any) => item.name == props.dataInfo.relateCompanyName)
    console.log(companyUid.value.uid, '企业uid是什么')
  })
}

//个体工商户
const getLists = () => {
  const params: any = {
    type: unref(tabTypes),
    page: 1,
    pageSize: 10
  }
  nextTick(async () => {
    const res = await getLandlordListBySearchApi(params).catch(() => {})
    console.log(res, '个体工商户res是什么')
    individualHouseholdUid.value = res.find(
      (item: any) => item.name == props.dataInfo.relateIndividualHouseholdName
    )
    console.log(individualHouseholdUid.value.uid, '个体工商户uid是什么')
  })
}
// 填报
const routerMap: any = {
  // [MainType.Village]: getRouterName(roleType.value)
  // [MainType.PeasantHousehold]: 'household',
  [MainType.IndividualHousehold]: getRouterName(roleType.value),
  [MainType.Company]: getRouterNameCompany(roleType.value)
}
// 新增 路由 map
const addRouterMap: any = {
  [MainType.Village]: 'collectiveBaseInfoEdit',
  [MainType.PeasantHousehold]: 'householdInfoEdit',
  [MainType.IndividualHousehold]: 'selfBaseInfoEdit',
  [MainType.Company]: 'baseInfoEdit'
}

//企业跳转
const editLandlord = () => {
  const name = routerMap[tabType.value]
  routerForward(name, {
    type: 'edit',
    uid: companyUid.value.uid
  })
}

//个体户跳转
const editLandlords = () => {
  const name = routerMap[tabTypes.value]
  routerForward(name, {
    type: 'edit',
    uid: individualHouseholdUid.value.uid
  })
}

const addLandlord = () => {
  const name = addRouterMap[tabType.value]
  routerForward(name, {
    type: 'add',
    householderDoorNo: props.dataInfo.doorNo,
    householderName: props.dataInfo.name
  })
}
const addLandlords = () => {
  const name = addRouterMap[tabTypes.value]
  routerForward(name, {
    type: 'add',
    householderDoorNo: props.dataInfo.doorNo,
    householderName: props.dataInfo.name
  })
}
const toLink = (type: string) => {
  const params = {
    id: props.dataInfo.id,
    uid: props.dataInfo.uid,
    name: props.dataInfo.name, // 姓名
    areaCode: props.dataInfo.areaCode, // 区/县
    townCode: props.dataInfo.townCode, // 镇/街道
    villageCode: props.dataInfo.villageCode, // 行政村
    virutalVillageCode: props.dataInfo.virutalVillageCode, // 自然村/村民小组
    otherCode: props.dataInfo.otherCode ? props.dataInfo.otherCode : '', // 兼容老系统，由1位乡/镇编号 + 2位行政村编号组成
    phone: props.dataInfo.phone, // 联系方式
    locationType: props.dataInfo.locationType ? props.dataInfo.locationType : null, // 所在位置
    householdNumber: props.dataInfo.householdNumber, // 户籍册编号
    suffixNo: compatibleOldSystems()
      ? splitStr(props.dataInfo.doorNo, 3, 7)
      : splitStr(props.dataInfo.doorNo, 12, 16), // 户号后四位
    doorNo: props.dataInfo.doorNo, // 户号
    hasPropertyAccount: String(props.dataInfo.hasPropertyAccount), // 是否财产户
    address: props.dataInfo.address, // 户籍所在地
    inundationRange: props.dataInfo.inundationRange, // 淹没范围
    // altitude: props.dataInfo.altitude, // 高程
    longitude: props.dataInfo.longitude, // 经度
    latitude: props.dataInfo.latitude // 纬度
  }

  routerForward('householdInfoEdit', {
    params: JSON.stringify(params),
    type
  })
}
onMounted(() => {
  getList()
  getLists()
})
</script>

<style lang="scss" scoped>
.household-info-wrapper {
  width: 100%;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .icon {
          display: flex;
          width: 32rpx;
          height: 16rpx;
          font-size: 9rpx;
          color: #fff;
          background: #faad14;
          border-top-right-radius: 5rpx;
          border-bottom-right-radius: 5rpx;
          align-items: center;
          justify-content: center;
        }

        .name {
          margin-left: 5rpx;
          font-size: 9rpx;
          color: #171718;
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 80rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
          }
        }
      }
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.edit {
      bottom: 16rpx;
    }
  }
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
      background-color: #f5f5f6;
    }

    .icon {
      width: 7rpx;
      height: 7rpx;
      margin-right: 3rpx;
    }

    .txt {
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
