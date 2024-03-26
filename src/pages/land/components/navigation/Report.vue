<!--资产评估报告-->
<template>
  <view class="procedures-wrap">
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>资产评估报告</text>
    </view>
    <view class="row-label-title">
      使用权人
      {{ props.dataInfo.name }}，属坝址周边村只征地不搬迁农户及单位，青苗评估共有{{
        num
      }}个地块，面积{{ numss?.toFixed(2) }}m²，株数{{ nums }}株，金额{{ numsss }}元。
      <div class="row-hint-title">详见地块明细如下:</div>
    </view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="28rpx" align="center">序号</uni-th>
          <uni-th width="50rpx" align="center">使用权人</uni-th>
          <uni-th width="40rpx">图幅号</uni-th>
          <uni-th width="40rpx">编号</uni-th>
          <uni-th width="40rpx">地名</uni-th>
          <uni-th width="50rpx">青苗户主</uni-th>
          <uni-th width="40rpx">品种</uni-th>
          <uni-th width="40rpx">面积</uni-th>
          <uni-th width="40rpx">株数</uni-th>
          <uni-th width="40rpx">金额</uni-th>
          <uni-th width="40rpx">备注</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in assetAppendantList" :key="index">
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.rightHolder }}</uni-td>
          <uni-td>{{ item.sheetNumber }}</uni-td>
          <uni-td>{{ item.landNumber }}</uni-td>
          <uni-td>{{ item.landName }}</uni-td>
          <uni-td>{{ item.householder }}</uni-td>
          <uni-td>{{ item.breed }}</uni-td>
          <uni-td>{{ item.area }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.compensationAmount }}</uni-td>
          <uni-td>{{ item.remark }}</uni-td>
          <!-- <uni-td>
            {{
              item.needHandle === '0' ? '无须办理' : item.isComplete === '1' ? '已办理' : '未办理'
            }}
          </uni-td>
          <uni-td>
            {{ item.completeDate ? dayjs(item.completeDate).format('YYYY-MM-DD') : '' }}
          </uni-td> -->
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import dayjs from 'dayjs'
import { LandlordType } from '@/types/sync'
// import { routerForward } from '@/utils'
// import { updateImpLandlordProceduresApi } from '@/service'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

// 相关手续表
const assetAppendantList = computed(() => {
  return props.dataInfo.assetAppendantList || []
})
let num = ref(0)
let nums = ref(0)
let numss = ref(0)
let numsss = ref(0)
watch(
  () => props.dataInfo,
  (val) => {
    if (val) {
      let map = new Map()
      val.assetAppendantList.forEach((item) => {
        map.set(item.landNumber, item)
      })
      let newData = [...map.values()]
        console.log(newData,'测试数据newData')
        num.value =newData.length
        nums.value = val.assetAppendantList.reduce((pre: any, cur: any) => {
          pre += Number(cur.number)
          return pre
        }, 0)
        let arr = val.assetAppendantList?.filter((obj, index, self) => {
          return self.findIndex((o) => o.landNumber == obj.landNumber) == index
        })
        numss.value = arr?.reduce((pre: any, cur: any) => {
          pre += Number(cur.shapeArea)
          return pre
        }, 0)
        numsss.value =val.assetAppendantList.reduce((pre: any, cur: any) => {
          pre += Number(cur.compensationAmount)
          return pre
        }, 0)
          }
        },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.procedures-wrap {
  background-color: #fff;

  .common-head {
    display: flex;
    width: 100%;
    height: 28rpx;
    margin-top: 9rpx;
    font-size: 9rpx;
    font-weight: 500;
    color: #171718;
    background: #ffffff;
    border-bottom: 1rpx solid #f0f0f0;
    border-radius: 5rpx 5rpx 0px 0px;
    flex-direction: row;
    align-items: center;

    .icon {
      width: 10rpx;
      height: 10rpx;
      margin-right: 6rpx;
    }
  }
}

.uni-table-th {
  height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  font-weight: normal;
  line-height: 28rpx;
  color: #737374;
  background-color: #f8f8f8;
}

.uni-table-td {
  min-height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  line-height: 28rpx;
  color: #171718;

  &.blue {
    color: #3e73ec;
  }
}

.uni-table-text {
  font-size: 9rpx;
}

.table-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    margin-right: 6rpx;
    font-size: 9rpx;
    word-break: keep-all;

    &.primary-btn {
      color: #3e73ec;
    }

    &.red-btn {
      color: #e43030;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

.row-label-title {
  color: #333;
  font-size: 8rpx;
  line-height: 25rpx;
}

.row-hint-title {
  color: #666;
  font-size: 8rpx;
  line-height: 22rpx;
  height: 22rpx;
}
</style>
