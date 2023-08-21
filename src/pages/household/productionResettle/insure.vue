<template>
  <view class="insure-wrap">
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>养老保险</text>
    </view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="40rpx">姓名</uni-th>
          <uni-th width="60rpx">与户主关系</uni-th>
          <uni-th width="32rpx">性别</uni-th>
          <uni-th width="100rpx">身份证号</uni-th>
          <uni-th width="60rpx">户籍册类别</uni-th>
          <uni-th width="60rpx">人口性质</uni-th>
          <uni-th width="60rpx">安置方式</uni-th>
          <uni-th width="60rpx">办理状态</uni-th>
          <uni-th width="60rpx">办理时间</uni-th>
          <uni-th width="50rpx" align="center">操作</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in demographicList" :key="index">
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>{{ formatDict(item.relation, 307) }}</uni-td>
          <uni-td>{{ formatDict(item.sex, 292) }}</uni-td>
          <uni-td>{{ item.card }}</uni-td>
          <uni-td>{{ formatDict(item.censusType, 249) }}</uni-td>
          <uni-td>{{ formatDict(item.populationNature, 363) }}</uni-td>
          <uni-td>{{ formatDict(item.settingWay, 375) }}</uni-td>
          <uni-td>
            {{ item.productionStatus === '1' ? '已办理' : '未办理' }}
          </uni-td>
          <uni-td>
            {{
              item.productionCompleteTime
                ? dayjs(item.productionCompleteTime).format('YYYY-MM-DD')
                : ''
            }}
          </uni-td>

          <uni-td>
            <view class="table-btn">
              <view class="btn primary-btn" @click="handle(item.uid as string)">办理</view>
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { LandlordType } from '@/types/sync'
import { routerForward, formatDict } from '@/utils'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()

// 获取人口列表
const demographicList = computed(() => {
  return props.dataInfo && props.dataInfo.demographicList
    ? props.dataInfo.demographicList.filter((item) => item.settingWay === '2')
    : []
})

const handle = (uid: string) => {
  routerForward('attendto', {
    uid: props.dataInfo.uid,
    type: 2,
    data: uid
  })
}
</script>

<style lang="scss" scoped>
.insure-wrap {
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
</style>
