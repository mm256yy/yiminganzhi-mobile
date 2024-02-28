<template>
  <view class="house-wrap">
    <view class="house-box">
      <view class="item">
        <view class="label">宅基地安置人数：</view>
        <view class="value-box">
          <text class="red">{{ familyNum }}</text> 人，其中该户农村移民 ：
          <text class="red">{{ ruralMigrantNum }}</text>
          人，非农移民 ：{{ unruralMigrantNum }} 人，随迁人口：
          <text class="red">{{ otherNum }}</text> 人
        </view>
      </view>

      <view class="item">
        <view class="label">选择地块：</view>
        <view class="value-box">
          <view class="flex-row" style="flex-wrap: wrap;">
            <view
              class="area-item"
              :class="{ active: settleAddress === item.id }"
              @click="apartmentPlaceChange(item.id)"
              v-for="item in apartmentArea"
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

      <view class="item" v-if="!fromResettleConfirm && tableData && tableData.length">
        <view class="label flex-start"> 推荐方案： </view>
        <view class="value-box">
          <view class="plan-table-wrap">
            <table>
              <!-- 第一行 -->
              <tr class="head-tr">
                <td colspan="2" class="column-w1 bold">搬迁安置</td>

                <td class="column-w3" v-for="(item, index) in tableData" :key="item.id">
                  <view class="plan-tit" :class="{ active: item.isSelected }">
                    方案{{ index + 1 }}
                  </view>
                </td>
              </tr>

              <tr>
                <td rowspan="4" class="column-w1 bold">套数</td>
                <td class="column-w2">70</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.typeOneNum }}
                </td>
              </tr>

              <tr>
                <td class="column-w2">90</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.typeTwoNum }}
                </td>
              </tr>

              <tr>
                <td class="column-w2">110</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.typeThreeNum }}
                </td>
              </tr>

              <tr>
                <td class="column-w2">130</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.typeFourNum }}
                </td>
              </tr>

              <tr>
                <td class="column-w1 bold" colspan="2">购房总面积</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.areaTotal }}
                </td>
              </tr>

              <tr>
                <td class="column-w1" rowspan="3">金额</td>
                <td class="column-w2">购房金额估算</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  <view class="flex-center-center pointer" @click="viewBuyHouseClick(item.id)">
                    {{ item.preorderAmount }}
                    <uni-icons type="help-filled" size="24" color="#DCDFE6" />
                  </view>
                </td>
              </tr>

              <tr>
                <td class="column-w2">补偿补助估算</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  <view class="flex-center-center pointer" @click="viewSubsidyClick(item.id)">
                    {{ item.compensationAmount }}
                    <uni-icons type="help-filled" size="24" color="#DCDFE6" />
                  </view>
                </td>
              </tr>

              <tr>
                <td class="column-w2">差额</td>
                <td class="column-w3" v-for="item in tableData" :key="item.id">
                  {{ item.differenceAmount }}
                </td>
              </tr>

              <tr>
                <td class="column-w1 bold" colspan="2">确定方案</td>
                <td class="column-w3" v-for="item in tableData" :key="item.type">
                  <view
                    class="select-btn"
                    :class="{ active: item.isSelected }"
                    @click="selectPlan(item.type)"
                  >
                    <view class="icon" v-if="!item.isSelected" />
                    <uni-icons v-else type="checkbox-filled" size="24" color="#3E73EC" />
                    <view class="txt">选择该方案</view>
                  </view>
                </td>
              </tr>
            </table>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="label flex-start">可选公寓面积：</view>
        <view class="value-box">
          <view class="check-item-box">
            <view
              class="area-check-item"
              :class="{ active: item.isSelected }"
              v-for="item in areaSize"
              :key="item.id"
            >
              <view class="item-lt">
                <view class="area-num">{{ item.name }}{{ item.unit }}</view>
                <text> x 数量</text>
                <input class="ipt" type="number" v-model.number="item.num" />
                <text>套</text>
              </view>
              <view class="item-rt" />
            </view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="label flex-start">选定户型及数量：</view>
        <view class="value-box">
          <view class="info-item">
            根据您输入的安置人数：
            <text class="red">{{ familyNum }}</text> 人，选购总面积为：
            <text class="red">{{ totalArea }}</text> m²
          </view>

          <view class="info-item">
            选择选定户型为：
            <template v-for="item in areaSize" :key="item.id">
              <template v-if="item.num > 0">
                <text class="red">{{ item.name }}</text> {{ item.unit }}
                <text class="red">{{ item.num }}</text> 套
                <text>，</text>
              </template>
            </template>
          </view>

          <view class="info-item">
            剩余面积： <text class="red">{{ residueArea }}</text> ㎡ 超出面积：
            <text class="red">{{ exceedArea }}</text> m²
          </view>

          <view class="info-item">
            购房金额估算： <text class="red">{{ exceedArea * 1500 }}</text> 元
          </view>

          <view class="info-item"> 购房总金额=选购总面积“成本价+超出面积"市场优惠价 </view>
        </view>
      </view>
    </view>

    <view class="btn-wrap">
      <view class="btn" @click="submitResettle"
        >{{ fromResettleConfirm ? '确定' : '确定，进入下一步' }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { showToast, apartmentAreaSize } from '@/config'
import { HouseAreaType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { routerForward } from '@/utils'

interface PropsType {
  doorNo: string
  baseInfo: LandlordType
  immigrantSettle: any
  fromResettleConfirm?: boolean
  dataList:any
  data:any
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()
const settleAddress = ref<string>('1')
const areaSize = ref<any[]>(apartmentAreaSize)

// 方案数据
const tableData = ref<any>([])

// 总人口
const familyNum = computed(() => {
  return props.baseInfo.demographicList.length || 1
})

// 农村移民
const ruralMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter((item) => item.populationNature === '1').length || 0
})

// 非农移民
const unruralMigrantNum = computed(() => {
  return props.baseInfo.demographicList.filter((item) => item.populationNature === '2').length || 0
})

// 其他人口
const otherNum = computed(() => {
  return familyNum.value - ruralMigrantNum.value - unruralMigrantNum.value
})

const apartmentPlaceChange = (id: string) => {
  settleAddress.value = id
}


const apartmentArea = computed(() => {
  const { dataList,data } = props
  if(!data){
  const apartment = dataList.filter((item) => item.type === '2')
  return apartment
  }else{
      const datas=data.filter((item) => item.relation === '1')
  if(datas[0].settingWay=='1'){
  const apartment = dataList.filter((item) => item.type === '2'&&item.isProductionLand==='1')
  return apartment
  }else{
  const apartment = dataList.filter((item) => item.type === '2'&&item.isProductionLand==='2')
  return apartment
  }
  }
})
// const apartmentArea=computed(() => {
//   const { dataList } = props
//   const apartment = dataList.filter((item:any) => item.type === '2')
//   return apartment
// })
// 获取方案
const getPlans = async () => {
  const res = []
  const num = Math.round((familyNum.value * 40) / 70) + 1
  const item = {
    type: 2, // 1 最大面积 2最多套数 3省钱[...]
    typeOneNum: num, // 75数量（公寓）[...]
    typeTwoNum: 0, // 95数量（公寓）[...]
    typeThreeNum: 0, // 115数量（公寓）[...]
    typeFourNum: 0, // 135数量（公寓）[...]
    preorderAmount: Math.round(num * Math.random() * 2000), // 预购金[...]
    compensationAmount: 0, // 补偿金[...]
    differenceAmount: 0, // 差额[...]
    areaTotal: num * 70, // 总面积[...]
    numberTotal: num, //
    isSelected: false
  }
  res.push(item)

  const bigNum = Math.round((familyNum.value * 40) / 130) + 1
  const item2 = {
    type: 1, // 1 最大面积 2最多套数 3省钱[...]
    typeOneNum: 0, // 75数量（公寓）[...]
    typeTwoNum: 0, // 95数量（公寓）[...]
    typeThreeNum: 0, // 115数量（公寓）[...]
    typeFourNum: bigNum, // 135数量（公寓）[...]
    preorderAmount: Math.round(bigNum * Math.random() * 2000), // 预购金[...]
    compensationAmount: 0, // 补偿金[...]
    differenceAmount: 0, // 差额[...]
    areaTotal: bigNum * 130, // 总面积[...]
    numberTotal: bigNum, //
    isSelected: false
  }
  res.push(item2)

  const sengQianNum = Math.round((familyNum.value * 40) / 70) - 1
  const item3 = {
    type: 3, // 1 最大面积 2最多套数 3省钱[...]
    typeOneNum: sengQianNum, // 75数量（公寓）[...]
    typeTwoNum: 0, // 95数量（公寓）[...]
    typeThreeNum: 0, // 115数量（公寓）[...]
    typeFourNum: 0, // 135数量（公寓）[...]
    preorderAmount: 0, // 预购金[...]
    compensationAmount: sengQianNum * 1000, // 补偿金[...]
    differenceAmount: 0, // 差额[...]
    areaTotal: sengQianNum * 70, // 总面积[...]
    numberTotal: sengQianNum,
    isSelected: false
  }
  res.push(item3)

  tableData.value = res
}

const toLink = (name: string, params: any) => {
  routerForward(name, params)
}

onMounted(() => {
  if (!props.fromResettleConfirm) {
    getPlans()
  }
})

watch(
  () => props.immigrantSettle,
  (val) => {
    if (val) {
      console.log(val, 'val')
      const { settleAddress: settleArea, typeOneNum, typeTwoNum, typeThreeNum, typeFourNum } = val

      settleAddress.value = settleArea
      areaSize.value = areaSize.value.map((item, index) => {
        if (index === 0) {
          item.num = typeOneNum
        } else if (index === 1) {
          item.num = typeTwoNum
        } else if (index === 2) {
          item.num = typeThreeNum
        } else if (index === 3) {
          item.num = typeFourNum
        }
        return item
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 总面积
const totalArea = computed(() => {
  let sum = 0
  areaSize.value.forEach((item) => {
    if (item.num > 0) {
      sum += item.name * item.num
    }
  })
  return sum
})

// 剩余面积
const residueArea = computed(() => {
  const residue = familyNum.value * 40 - totalArea.value
  return residue < 0 ? 0 : residue
})

// 超出面积
const exceedArea = computed(() => {
  const exceed = totalArea.value - familyNum.value * 40
  return exceed < 0 ? 0 : exceed
})

// 选择该方案
const selectPlan = (type: string) => {
  const real = tableData.value.map((item: any) => {
    if (item.type === type) {
      item.isSelected = !item.isSelected
    } else {
      item.isSelected = false
    }
    return item
  })
  console.log(real)
  tableData.value = [...real]
}

// 补偿补助明细
const viewSubsidyClick = (id: string) => {
  console.log(id, 'id')
  toLink('amountEstimation', { type: 1 })
}

// 购房金额明细
const viewBuyHouseClick = (id: string) => {
  console.log(id, 'id')
  toLink('amountEstimation', { type: 2 })
}

// 提交
const submitResettle = async () => {
  let typeOneNum = 0
  let typeTwoNum = 0
  let typeThreeNum = 0
  let typeFourNum = 0

  const selectedPlanItem = tableData.value.find((item: any) => item.isSelected)
  if (selectedPlanItem) {
    typeOneNum = selectedPlanItem.typeOneNum
    typeTwoNum = selectedPlanItem.typeTwoNum
    typeThreeNum = selectedPlanItem.typeThreeNum
    typeFourNum = selectedPlanItem.typeFourNum
  } else {
    const areaItem = areaSize.value.find((item) => item.num > 0)
    if (!areaItem) {
      showToast('请选择公寓面积')
      return
    }
    areaSize.value.forEach((item, index) => {
      if (index === 0) {
        typeOneNum = item.num
      }
      if (index === 1) {
        typeTwoNum = item.num
      }
      if (index === 2) {
        typeThreeNum = item.num
      }
      if (index === 3) {
        typeFourNum = item.num
      }
    })
  }

  const params: any = {
    houseAreaType: HouseAreaType.flat,
    doorNo: props.doorNo,
    settleAddress: settleAddress.value,
    typeOneNum,
    typeTwoNum,
    typeThreeNum,
    typeFourNum
  }
  if (props.immigrantSettle && props.immigrantSettle.uid) {
    params.uid = props.immigrantSettle.uid
  }
  emit('submit', params)
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
      margin-right: 6rpx;
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
      border: 1rpx solid #3e73ec;
    }
  }

  .check-item {
    display: inline-flex;
    height: 23rpx;
    padding: 0 14rpx;
    margin-right: 14rpx;
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
}

.plan-table-wrap {
  table {
    /* 用于表格属性, 表示表格的两边框合并为一条 */
    border-collapse: collapse;
    border-right: 1rpx solid #ebebeb;
    border-bottom: 1rpx solid #ebebeb;
    /* 设置边缘间距0 */
    border-spacing: 0;
  }

  tr td {
    height: 28rpx;
    font-size: 8rpx;
    color: #171718;
    text-align: center;
    border-top: 1rpx solid #ebebeb;
    border-right: 1rpx solid #ebebeb;
    border-left: 1rpx solid #ebebeb;
  }

  .column-w1 {
    width: 59rpx;
    background: #f6f6f6;
  }

  .column-w2 {
    width: 69rpx;
  }

  .column-w3 {
    width: 88rpx;
  }

  .bold {
    font-weight: 500;
  }

  .blue {
    color: #3e73ec;
  }

  .plan-tit {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #3e73ec;
    background: #f2f6ff;

    &.active {
      color: #fff;
      background: #3e73ec;
    }
  }

  .select-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      width: 9rpx;
      height: 9rpx;
      background: #ffffff;
      border: 1rpx solid #dcdde6;
      border-radius: 50%;
    }

    .txt {
      margin-left: 6rpx;
      font-size: 8rpx;
      color: #171718;
    }
  }
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
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

::v-deep.uni-input-input,
::v-deep.uni-input-placeholder {
  font-size: 9rpx !important;
}
</style>
