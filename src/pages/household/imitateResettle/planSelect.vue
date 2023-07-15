<template>
  <view class="plan-wrap">
    <view class="desc-header">
      <view class="title">方案比选</view>
      <image
        class="close"
        @click="close"
        src="@/static/images/resettle_close.png"
        mode="scaleToFill"
      />
    </view>

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
              <uni-icons
                v-if="!viewPlan"
                type="clear"
                color="#3E73EC"
                size="24"
                @click="deletePlan(index)"
              />
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
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterArea(item, 1) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">85</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterArea(item, 2) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">110</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterArea(item, 3) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">140</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterArea(item, 4) }}
          </td>
        </tr>

        <tr>
          <td rowspan="3" class="column-w1 bold">宅基地</td>
          <td class="column-w2">65</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterAreaWithHouse(item, 1) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">105</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterAreaWithHouse(item, 2) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2">125</td>
          <td class="column-w3" v-for="item in contrastPlans" :key="item.id">
            {{ filterAreaWithHouse(item, 3) }}
          </td>
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
          <td class="column-w3 red bold" v-for="item in contrastPlans" :key="item.id">
            {{ countPrice(item) }}
          </td>
        </tr>

        <tr>
          <td class="column-w2 bold" colspan="2">确定方案</td>
          <td
            class="column-w3"
            v-for="item in contrastPlans"
            :key="item.id"
            @click="selectPlan(item.id)"
          >
            <view class="select-btn" :class="{ active: item.isSelected }">选择方案</view>
          </td>
        </tr>
      </table>
    </view>

    <view class="btn-wrap">
      <view @click="confirmPlan" class="add-btn"> 确定 </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref, computed } from 'vue'
import { StorageKey, setStorage, getStorage } from '@/utils/storage'

interface PropsType {
  plans?: any[]
}

const props = defineProps<PropsType>()

const emit = defineEmits(['close', 'updatePlan'])
// 方案数据
const contrastPlans = ref<any>([])

onShow(() => {
  if (props.plans && props.plans.length) {
    contrastPlans.value = props.plans
    return
  }
  const contrast = getStorage(StorageKey.CONTRASTPLANS) || []
  contrastPlans.value = contrast
})

const viewPlan = computed(() => {
  return props.plans && props.plans.length
})

const planCount = computed(() => {
  return contrastPlans.value.length
})

const close = () => {
  emit('close')
}

const filterArea = (item: any, id: number) => {
  const current = item.apartmentResettleArea.find((x: any) => x.id === id)
  return current ? current.num || 0 : 0
}

const filterAreaWithHouse = (item: any, id: number) => {
  const flag = item.homesteadResettleArea === id
  return flag ? 1 : 0
}

// 计算补助金
const countPrice = (item: any) => {
  const {
    subsidyCompensatePrice,
    cropsCompensatePrice,
    homesteadCompensatePrice,

    buildHouseSubsidyPrice,
    relocateSubsidyPrice,
    lifeSubsidyPrice,

    signAgreementRewardPrice,
    houseEmptyRewardPrice,
    startBuildHouseRewardPrice,
    endBuildHouseRewardPrice,
    moveInHouseRewardPrice
  } = item

  const sum =
    subsidyCompensatePrice +
    cropsCompensatePrice +
    homesteadCompensatePrice +
    buildHouseSubsidyPrice +
    relocateSubsidyPrice +
    lifeSubsidyPrice +
    signAgreementRewardPrice +
    houseEmptyRewardPrice +
    startBuildHouseRewardPrice +
    endBuildHouseRewardPrice +
    moveInHouseRewardPrice
  return sum
}

// 删除方案
const deletePlan = (index: number) => {
  if (viewPlan.value) {
    return
  }
  contrastPlans.value.splice(index, 1)
  setStorage(StorageKey.CONTRASTPLANS, contrastPlans.value)
  emit('updatePlan')
}

// 选择该方案
const selectPlan = (id: string) => {
  contrastPlans.value = contrastPlans.value.map((item: any) => {
    if (item.id === id) {
      item.isSelected = true
    } else {
      item.isSelected = false
    }
    return item
  })
}

// 确定方案
const confirmPlan = () => {
  if (viewPlan.value) {
    emit('close')
    return
  }
  const selectArray = contrastPlans.value.filter((item: any) => (item.isSelected = true))
  if (selectArray && selectArray.length) {
    setStorage(StorageKey.CONTRASTPLANS, contrastPlans.value)
    emit('updatePlan')
    emit('close')
  } else {
    uni.showToast({
      title: '未选择任何方案',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.plan-wrap {
  width: 527rpx;
  padding-bottom: 10rpx;
  background-color: #fff;
  border-radius: 7rpx;

  .desc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32rpx;
    padding: 0 12rpx;
    border-bottom: 1rpx solid #f0f0f0;

    .title {
      font-size: 12rpx;
      font-weight: bold;
      color: #171718;
    }

    .close {
      width: 14rpx;
      height: 14rpx;
    }
  }

  .table-wrap {
    width: 100%;
    height: 320rpx;
    overflow-y: scroll;
    text-align: center;
    background-color: white;
  }
}
</style>

<style scoped lang="scss">
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
