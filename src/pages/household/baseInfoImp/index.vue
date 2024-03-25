<template>
  <!-- 居民户信息（实施） -->
  <view class="base-info-wrapper">
    <view class="title" style="display: flex; justify-content: space-between">
      <view>
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        家庭情况
      </view>
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

    <view class="row">
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">是否财产户：</view>
            <view class="content">
              {{ dictOption(yesAndNoEnums, dataInfo.hasPropertyAccount) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content">
              <!-- {{ formatStr(dataInfo.phone) }} -->
              <!-- <uni-easyinput v-model="dataList.phone" type="text" size="small" placeholder="请输入" /> -->
              <input
                type="text"
                placeholder="请输入电话号码"
                style="border: 1px solid #dfe2e5; font-size: 9rpx; border-radius: 2rpx"
                v-model="options.phone"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户籍所在地：</view>
            <view class="content">{{ formatStr(dataInfo.address) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">所属网格员：</view>
            <view class="content">{{ formatStr(dataInfo.gridmanName) }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">行政村：</view>
            <view class="content">{{ formatStr(dataInfo.villageCodeText) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">自然村/村民小组：</view>
            <view class="content">{{ formatStr(dataInfo.virutalVillageCodeText) }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">所在位置：</view>
            <view class="content">
              {{ dictOption(locationTypes, dataInfo.locationType) }}
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">淹没范围：</view>
            <view class="content">{{ formatDict(dataInfo.formatDict, 346) }}</view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row>
        <uni-col :span="24">
          <view class="col">
            <view class="label">地理位置:</view>
            <view class="lg-txt-wrapper">
              <!-- <uni-data-checkbox v-model="check" :localdata="lgTagList" /> -->
              <view class="position" @click="gotoMap">
                <uni-icons type="map" color="#5D8CF7" size="14rpx" />
                <text class="content">{{
                  options.longitude && options.latitude
                    ? `${options.longitude},${options.latitude}`
                    : '获取定位'
                }}</text>
              </view>
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label"><text class="star">*</text>户主照片：</view>
            <view class="content">
              <upload-file
                v-model="householdPicStr"
                :file-list="householdPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">全家福照片：</view>
            <view class="content">
              <upload-file
                v-model="familyPicStr"
                :file-list="familyPicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
      <uni-row class="m-t-10">
        <uni-col :span="12">
          <view class="col">
            <view class="label">库区房屋照片：</view>
            <view class="content">
              <upload-file
                v-model="housePicStr"
                :file-list="housePicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">安置房照片：</view>
            <view class="content">
              <upload-file
                v-model="resettlePicStr"
                :file-list="resettlePicStr"
                :limit="20"
                show-type="grid"
                :accepts="['.jpg', '.png']"
              />
            </view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <view class="title">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      居民户支付情况
    </view>
    <view class="row">
      <uni-row v-for="(item, index) in grantList" :key="index">
        <uni-col :span="12">
          <view class="col">
            <view class="label">拨付资金：</view>
            <view class="content">{{ item.name }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">发放状态：</view>
            <view class="content blue">{{ item.grantStatus == 1 ? '已发放' : '未发放' }}</view>
          </view>
        </uni-col>
      </uni-row>
    </view>

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, unref, nextTick } from 'vue'
import { formatStr, dictOption, formatDict, routerForward, getStorage, StorageKey } from '@/utils'
import { RoleCodeType } from '@/types/common'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { locationTypes, yesAndNoEnums } from '@/config/common'
import { LandlordType } from '@/types/sync'
import { saveImpLandlordItemApi } from '@/service'
import UploadFile from '@/components/UploadFile/index.vue'
import { getLandlordListBySearchApi } from '@/service'
import { MainType } from '@/types/common'
const tabType = ref<MainType>(MainType.Company)
const tabTypes = ref<MainType>(MainType.IndividualHousehold)
interface PropsType {
  dataInfo: LandlordType
}
const roleType = ref<RoleCodeType>(getStorage(StorageKey.USERROLE))
console.log(roleType.value, '测试类型')
const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

const householdPicStr = ref<string>('[]') // 户主照片
const familyPicStr = ref<string>('[]') // 全家福照片
const housePicStr = ref<string>('[]') // 库区房屋照片
const resettlePicStr = ref<string>('[]') // 安置房照片
const companyUid = ref<any>()
const individualHouseholdUid = ref<any>()
// 填报
const routerMap: any = {
  [MainType.Company]: 'enterpriseImp',
  // [MainType.PeasantHousehold]: 'peasantHousehold',
  [MainType.IndividualHousehold]: 'selfPersonImp'
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

// /**
//  * 获取页面跳转的路由 name
//  * @params {Object} roleType 角色类型
//  */
// const getRouterName = (roleType: string) => {
//   if (roleType === RoleCodeType.investigator) {
//     return 'collective'
//   } else if (roleType === RoleCodeType.assessor || roleType === RoleCodeType.assessorland) {
//     return 'collectiveEva'
//   } else if (roleType === RoleCodeType.implementation) {
//     return 'collectiveImp'
//   } else {
//     return 'collective'
//   }
// }
let ismap=ref(false)
watch(
  () => props.dataInfo,
  (val) => {
    if (val && !ismap.value) {
      console.log(val,'再次监听');
      
      dataList.value = val
      getList()
      getLists()
      const { householdPic, familyPic, housePic, resettlePic, longitude, latitude, phone } = val
      if (householdPic) {
        householdPicStr.value = householdPic
      }
      if (familyPic) {
        familyPicStr.value = familyPic
      }
      if (housePic) {
        housePicStr.value = housePic
      }
      if (resettlePic) {
        resettlePicStr.value = resettlePic
      }
      if (longitude) {
        options.value.longitude = longitude
      }
      if (latitude) {
        options.value.latitude = latitude
      }
      if (phone) {
         options.value.phone = phone
      }
    }
  },
  { deep: true }
)
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

const submit = () => {
  if (householdPicStr.value === '[]') {
    showToast('户主照片必传')
    return
  }
  const params: any = {
    ...props.dataInfo,
    householdPic: householdPicStr.value,
    familyPic: familyPicStr.value,
    housePic: housePicStr.value,
    resettlePic: resettlePicStr.value,
    ...options.value
  }
  saveImpLandlordItemApi(params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

const grantList: any = computed(() => {
  if (
    !props.dataInfo ||
    !props.dataInfo.immigrantCompensationCardList ||
    !props.dataInfo.immigrantCompensationCardList.length
  ) {
    return []
  }
  return props.dataInfo.immigrantCompensationCardList.filter((item) => item.grantStatus == '0')
})
const gotoMap = () => {
  ismap.value=true
  routerForward('map', {
    longitude: props.dataInfo.longitude,
    latitude: props.dataInfo.latitude
  })
}
watch(
  () => householdPicStr.value,
  (val) => {
    console.log(val, 'va')
  },
  { immediate: true, deep: true }
)

// onMounted(() => {
//   getList()
//   getLists()
// })
let options: any = ref({
  longitude: null,
  latitude: null,
  phone: null
})
const mapChooseCallBack = (data: any) => {
  console.log(data,'地理位置');
  
  if (data && data.longitude && data.latitude) {
    options.value.longitude = data.longitude.toFixed(6)
    options.value.latitude = data.latitude.toFixed(6)
  }
}

onMounted(() => {
   ismap.value=false
  uni.$on('chooseMap', mapChooseCallBack)
})

onBeforeUnmount(() => {
  uni.$off('chooseMap', mapChooseCallBack)
})
</script>

<style lang="scss" scoped>
.base-info-wrapper {
  width: 100%;

  .title {
    display: flex;
    height: 28rpx;
    margin-bottom: 9rpx;
    font-size: 9rpx;
    color: #171718;
    align-items: center;
    flex: 1;
    border-bottom: 1rpx solid #f0f0f0;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-left: 6rpx;
    }
  }

  .row {
    padding: 5rpx 12rpx 12rpx 0;
    box-sizing: border-box;

    .col {
      display: flex;
      flex-direction: row;

      .label {
        width: 90rpx;
        height: 16rpx;
        margin-left: 9rpx;
        font-size: 9rpx;
        line-height: 16rpx;
        color: rgba(23, 23, 24, 0.6);

        .star {
          color: red;
        }
      }

      .content {
        font-size: 9rpx;
        line-height: 16rpx;
        color: #171718;

        &.blue {
          color: #3e73ec;
        }
      }
    }

    .line {
      width: 100%;
      height: 1rpx;
      margin: 9rpx 0;
      background: #ebebeb;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }
  }
}
.lg-txt-wrapper {
  display: flex;
  flex-direction: column;

  .position {
    display: flex;
    width: 200rpx;
    height: 18rpx;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;

    .txt {
      margin-left: 6rpx;
      font-size: 9rpx;
      color: #171718;
    }
  }
}
</style>
