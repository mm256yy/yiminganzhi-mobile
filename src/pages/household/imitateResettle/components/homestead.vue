<template>
  <view class="house-wrap">
    <view class="house-box">
      <view class="item">
        <view class="label" v-if="familyNum">宅基地安置人数：</view>
        <view class="value-box">
          <text class="red">{{ familyNum }}</text
          ><text>人，</text>
          <text v-if="ruralMigrantNum"
            >其中该户农村移民：<text class="red">{{ ruralMigrantNum }}</text
            ><text>人，</text></text
          >
          <text v-if="unruralMigrantNum"
            >非农村移民<text class="red">{{ unruralMigrantNum }}</text
            ><text>人，</text></text
          >
          <text v-if="farmingMigrantNum"
            >农业随迁<text class="red">{{ farmingMigrantNum }}</text
            ><text>人，</text></text
          >
          <text v-if="unfarmingMigrantNum"
            >非农业随迁<text class="red">{{ unfarmingMigrantNum }}</text
            ><text>人，</text></text
          >
          <text v-if="addPopulationNum"
            >增计人口<text class="red">{{ addPopulationNum }}</text
            ><text>人，</text></text
          >
          <text v-if="propertyNum"
            >财产户<text class="red">{{ propertyNum }}</text
            ><text>人，</text></text
          >
          <text v-if="otherNum"
            >其他人口<text class="red">{{ otherNum }}</text
            ><text>人</text></text
          >
        </view>
      </view>

      <view class="item">
        <view class="label flex-start">选择地块：</view>
        <view class="value-box">
          <view class="flex-row" style="flex-wrap: wrap">
            <view
              class="area-item"
              :class="{ active: settleAddress == item.id }"
              @click="homesteadPlaceChange(item.id)"
              v-for="item in areaList"
              :key="item.id"
            >
              <uni-icons
                class="icon"
                type="map"
                :color="settleAddress === item.id ? '#3E73EC' : '#131313'"
                size="16"
              />
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="label flex-start">宅基地面积：</view>
        <view class="value-box">
          <view class="flex-row box-wrap">
            <view
              class="check-item"
              :class="{ active: areaType == item.id }"
              @click="homesteadAreaChange(item.id)"
              v-for="item in areaSizeArray"
              :key="item.id"
            >
              {{ item.name }}{{ item.unit }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="btn-wrap">
      <view class="btn" @click="submitResettle">
        {{ fromResettleConfirm ? '确定' : '确定，进入下一步' }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { HouseAreaType } from '@/types/common'
import { homesteadAreaSize } from '@/config'
import { LandlordType } from '@/types/sync'
interface PropsType {
  baseInfo: LandlordType
  doorNo: string
  immigrantSettle: any
  fromResettleConfirm?: boolean
  dataList: any
  data: any
  flag: any
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()

const settleAddress = ref('1')
const areaType: any = ref('1')

const areaList = ref<any>()

// 总人口
const familyNum = computed(() => {
  return props.baseInfo.demographicList.filter((item: any) => item.isDelete !== '1').length
})

// 农村移民
const ruralMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '1' && item.isDelete !== '1'
  ).length
})

// 非农移民
const unruralMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '2' && item.isDelete !== '1'
  ).length
})

// 农业随迁
const farmingMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '3' && item.isDelete !== '1'
  ).length
})

// 非农业随迁
const unfarmingMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '4' && item.isDelete !== '1'
  ).length
})

// 增计人口
const addPopulationNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '5' && item.isDelete !== '1'
  ).length
})
// 财产户
const propertyNum = computed(() => {
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '6' && item.isDelete !== '1'
  ).length
})
// 其他人口
const otherNum = computed(() => {
  // return familyNum.value - ruralMigrantNum.value - unruralMigrantNum.value
  return props.baseInfo.demographicList.filter(
    (item) => item.populationNature === '7' && item.isDelete !== '1'
  ).length
})

// const resettleArea = computed(() => {
//   const { dataList, data } = props
//   console.log(data, '测试数据data')
//   console.log(dataList,'测试数据dataList')
//   if(!data){
//       const areaList = dataList.filter((item:any) => item.type === '1')
//       return areaList
//   }else{
//     const datas=data.filter((item:any)=> item.relation === '1')
//   if(datas[0].settingWay=='1'){
//   const areaList = dataList.filter((item:any)=> item.type === '1'&&item.isProductionLand==='1')
//   return areaList
//   }else{
//   const areaList = dataList.filter((item:any) => item.type === '1'&&item.isProductionLand==='2')
//   return areaList
//   }
// }
// })
// const resettleArea = computed(() => {
//   const { dataList } = props
//   const areaList = dataList.filter((item:any) => item.type === '1')
//   return areaList
// })
watch(
  () => props.immigrantSettle,
  (val) => {
    if (val) {
      // const { areaType: areaType, settleAddress: settleAddress } = val
      areaType.value = val.areaType
      settleAddress.value = val.settleAddress
      console.log(areaType.value, 'areaType是什么')
      console.log(settleAddress.value, 'settleArea是什么')
    }
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => props.dataList,
  () => {
    if (props.data && !props.flag) {
      console.log(props.data, '测试数据')
      const datas = props.data.filter((item: any) => item.relation == '1')
      console.log(datas, '测试数据datas')
      if (datas[0].settingWay == '1') {
        console.log(props.dataList, '数据')
        areaList.value = props.dataList.filter(
          (item: any) => item.type == '1' && item.isProductionLand == '1'
        )
        console.log(areaList.value, 'areaList')
      } else if (datas[0].settingWay == '2') {
        console.log(props.dataList, '数据')
        areaList.value = props.dataList.filter(
          (item: any) => item.type == '1' && item.isProductionLand == '2'
        )
        console.log(areaList.value, 'areaList')
      } else {
        areaList.value = props.dataList.filter((item: any) => item.type == '1')
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const areaSizeArray = computed(() => {
  const len = familyNum.value
  const sizeArray = homesteadAreaSize.map((item) => {
    if (len >= item.needPeopleNumber) {
      item.disabled = false
    } else {
      item.disabled = true
    }
    return item
  })
  console.log(sizeArray, 'sizeArray')
  return sizeArray
})

const submitResettle = async () => {
  const params: any = {
    houseAreaType: HouseAreaType.homestead,
    doorNo: props.doorNo,
    settleAddress: settleAddress.value,
    areaType: areaType.value
  }
  if (props.immigrantSettle && props.immigrantSettle.uid) {
    params.uid = props.immigrantSettle.uid
  }
  emit('submit', params)
}

// 宅基地面积选择
const homesteadAreaChange = (id: any) => {
  areaType.value = id
}

// 住宅地块
const homesteadPlaceChange = (id: string) => {
  settleAddress.value = id
}
</script>

<style lang="scss" scoped>
.house-wrap {
  margin-top: 9rpx;
}

.house-box {
  display: flex;
  padding: 9rpx 12rpx;
  background: linear-gradient(
    180deg,
    rgba(242, 246, 255, 0.62) 0%,
    rgba(242, 246, 255, 0.62) 16%,
    rgba(242, 246, 255, 0) 100%
  );
  border: 1rpx solid #ebebeb;
  border-radius: 5rpx;
  flex-direction: column;

  .item {
    display: flex;
    height: auto;
    min-height: 23rpx;
    margin-bottom: 12rpx;
    align-items: center;

    .label {
      width: 84rpx;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
      text-align: right;

      &.flex-start {
        align-self: flex-start;
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.value-box {
  flex: 1;
  font-size: 9rpx;
  color: #171718;

  .red {
    color: #e43030;
  }

  .red-bold {
    font-size: 12rpx;
    font-weight: bold;
    color: #e43030;
  }

  .flex-row {
    display: flex;
    align-items: center;
  }

  .ipt-wrap {
    display: flex;
    align-items: center;
    width: 60rpx;
    height: 23rpx;
    margin-right: 6rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;

    .ipt {
      flex: 1;
      height: 23rpx;
      padding: 0 4rpx;
    }

    .unit {
      display: flex;
      height: 100%;
      padding: 0 6rpx;
      font-size: 9rpx;
      color: #171718;
      background: #f5f7fa;
      border-left: 1rpx solid #ebebeb;
      align-items: center;
      justify-content: center;
    }

    &.middle {
      width: 150rpx;
    }
  }

  .area-item {
    display: flex;
    width: 107rpx;
    height: 33rpx;
    margin: 0 14rpx 12rpx 0;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #fff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    .icon {
      margin-right: 6rpx;
    }

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1px solid #3e73ec;
    }
  }

  .check-item {
    display: inline-flex;
    height: 23rpx;
    padding: 0 14rpx;
    margin: 0 14rpx 12rpx 0;
    font-size: 9rpx;
    color: #171718;
    background: #ffffff;
    border: 1rpx solid #ebebeb;
    border-radius: 5rpx;
    align-items: center;
    justify-content: center;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #3e73ec;
      background: #f2f6ff;
      border: 1rpx solid #3e73ec;
    }
  }

  .full-ipt {
    height: 23rpx;
    padding: 0 4rpx;
    border: 1rpx solid #ebebeb;
    border-radius: 2rpx;
  }

  .desc {
    font-size: 8rpx;
    color: #171718;
  }

  .check-item-box {
    display: flex;
    flex-direction: column;

    .area-check-item {
      display: flex;
      height: 33rpx;
      padding: 0 9rpx;
      margin-bottom: 7rpx;
      border: 1rpx solid #ebebeb;
      border-radius: 2rpx;
      align-items: center;
      justify-content: space-between;

      .item-lt {
        display: flex;
        align-items: center;

        .area-num {
          width: 30rpx;
        }

        .ipt {
          width: 48rpx;
          height: 20rpx;
          padding: 0 4rpx;
          margin: 0 5rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
        }
      }

      .item-rt {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 40rpx;
        height: 100%;

        .check-box {
          display: flex;
          width: 12rpx;
          height: 12rpx;
          background: #ffffff;
          border: 1rpx solid #ebebeb;
          border-radius: 2rpx;
          align-items: center;
          justify-content: center;
        }
      }

      &.active {
        .check-box {
          background: #3e73ec;
          border: 1rpx solid #2f6eff;
        }
      }
    }
  }

  .box-wrap {
    flex-wrap: wrap;
    width: 210rpx;
  }
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15rpx 0 65rpx;

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26rpx;
    min-width: 70rpx;
    padding: 0 11px;
    font-size: 11px;
    font-weight: 500;
    color: #ffffff;
    background: #3e73ec;
    border-radius: 2rpx;
  }
}
</style>
