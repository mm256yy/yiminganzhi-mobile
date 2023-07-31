<template>
  <view>
    <view class="table-wrap">
      <table>
        <!-- 第一行 -->
        <tr class="head-tr">
          <!-- rowspan行高： 2  colspan列高： 2 -->
          <td rowspan="2" class="column-w1">类别</td>
          <td rowspan="2" class="column-w2">项目</td>

          <td class="column-w3" v-for="(item, index) in contrastPlans" :key="item.id">
            <view class="flex-center">
              <text class="txt">方案{{ index + 1 }}</text>
            </view>
          </td>
        </tr>

        <!-- 第二行 -->
        <tr class="head-tr">
          <td class="column-w3 bold" v-for="item in contrastPlans" :key="item.id">数量</td>
        </tr>

        <tr>
          <td :colspan="5 - planCount" class="text-left bold">相关安置费用</td>
        </tr>

        <tr>
          <td rowspan="4" class="column-w1 bold">公寓房</td>
          <td class="column-w2">65</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 1 </td>
        </tr>

        <tr>
          <td class="column-w2">85</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 2 </td>
        </tr>

        <tr>
          <td class="column-w2">110</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 3 </td>
        </tr>

        <tr>
          <td class="column-w2">140</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 4 </td>
        </tr>

        <tr>
          <td rowspan="3" class="column-w1 bold">宅基地</td>
          <td class="column-w2">65</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 1 </td>
        </tr>

        <tr>
          <td class="column-w2">105</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 2 </td>
        </tr>

        <tr>
          <td class="column-w2">125</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id"> 1 </td>
        </tr>

        <tr>
          <td class="column-w1 bold">购房款</td>
          <td class="column-w2">宅基地房屋建安费(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.homesteadBuildPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w1 bold">购房总金额(元）</td>
          <td class="column-w2">公寓房购房总金额(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.apartmentBuyPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w2 collection-tr" colspan="2">购房款合计(元)</td>
          <td class="column-w3 red bold" v-for="item in contrastPlans" :key="item.id">
            {{ item.homesteadBuildPrice + item.apartmentBuyPrice }}
          </td>
        </tr>

        <tr>
          <td :colspan="5 - planCount" class="text-left bold">相关补偿费用</td>
        </tr>

        <tr>
          <td class="column-w1 bold" rowspan="3">公寓房</td>
          <td class="column-w2">房屋补偿补助款(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.subsidyCompensatePrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">地面青苗附着物补偿款(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.cropsCompensatePrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">宅基地偿款 (超面积)(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.homesteadCompensatePrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w1 bold" rowspan="3">补助费</td>
          <td class="column-w2">建房补助费(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.buildHouseSubsidyPrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">搬迁补助费(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.relocateSubsidyPrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">过渡期生产生活补助款(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.lifeSubsidyPrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w1 bold" rowspan="5">奖励费</td>
          <td class="column-w2">签订动迁安置协议奖励(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ item.signAgreementRewardPrice }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">房屋腾空奖励(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.houseEmptyRewardPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w2">启动建房奖励(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.startBuildHouseRewardPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w2">完成建房奖励(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.endBuildHouseRewardPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w2">搬迁入驻奖励(元)</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">{{
            item.moveInHouseRewardPrice
          }}</td>
        </tr>

        <tr>
          <td class="column-w2 collection-tr bold" colspan="2">补偿（补助) 费用合计(元）</td>
          <td class="column-w3 red bold" v-for="item in contrastPlans" :key="item.id"> 666 </td>
        </tr>
      </table>
    </view>

    <view class="btn-wrap">
      <view class="add-btn"> 确定 </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { selfResettleData, HouseType } from '../config'

interface PropsType {
  data?: any
  doorNo?: string
  viewType: 'pup' | 'default'
  immigrantSettle?: any
  fromResettleConfirm?: boolean
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()
const tableData = ref(selfResettleData)

// 方案数据
const contrastPlans = ref<any>([])

const planCount = computed(() => {
  return contrastPlans.value.length
})

const submitResettle = async () => {
  const params: any = {
    houseAreaType: HouseType.oneself,
    doorNo: props.doorNo
  }
  if (props.immigrantSettle && props.immigrantSettle.id) {
    params.id = props.immigrantSettle.id
  }
  emit('submit', params)
}
</script>

<style lang="scss" scoped>
.table-wrap table {
  /* 用于表格属性, 表示表格的两边框合并为一条 */
  margin: 9rpx auto;
  border-collapse: collapse;
  border-right: 1rpx solid #ebebeb;
  border-bottom: 1rpx solid #ebebeb;
  /* 设置边缘间距0 */
  border-spacing: 0;
}

.table-wrap table tr td {
  height: 28rpx;
  font-size: 9rpx;
  color: #171718;
  text-align: center;
  border-top: 1rpx solid #ebebeb;
  border-right: 1rpx solid #ebebeb;
  border-left: 1rpx solid #ebebeb;

  &.column-w1 {
    width: 95rpx;
    font-weight: 500;
  }

  &.column-w2 {
    width: 140rpx;
  }

  &.column-w3 {
    width: 84rpx;
  }
}

.select-btn {
  display: flex;
  width: 70rpx;
  height: 20rpx;
  margin: 0 auto;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  border: 1rpx solid #ebebeb;
  border-radius: 2rpx;
  align-items: center;
  justify-content: center;

  &.active {
    color: #3e73ec;
    border: 1rpx solid #3e73ec;
  }
}

.text-left {
  padding: 0 25rpx;
  text-align: left !important;
}

.head-tr {
  background-color: #f2f6ff;
}

.collection-tr {
  background-color: #f8f8f8;
}

.flex-center {
  display: flex;
  width: 84rpx;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.bold {
  font-weight: 500;
}

.red {
  color: #e43030 !important;
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9rpx 0;

  .add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 94rpx;
    height: 26rpx;
    font-size: 11rpx;
    font-weight: 500;
    color: #fff;
    background: #3e73ec;
    border-radius: 2rpx;
  }
}
</style>
