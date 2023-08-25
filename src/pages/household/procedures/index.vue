<template>
  <view class="procedures-wrap">
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>相关手续</text>
    </view>
    <view class="table-wrap">
      <uni-table class="table" ref="table" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="38rpx" align="center">序号</uni-th>
          <uni-th width="121rpx" align="center">办理项目</uni-th>
          <uni-th width="121rpx">办理状态</uni-th>
          <uni-th width="120rpx">办理时间</uni-th>
          <uni-th width="120rpx" align="center">操作</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in immigrantProceduresList" :key="index">
          <uni-td>{{ index + 1 }}</uni-td>
          <uni-td>{{ item.name }}</uni-td>
          <uni-td>
            {{
              item.needHandle === '0' ? '无须办理' : item.isComplete === '1' ? '已办理' : '未办理'
            }}
          </uni-td>
          <uni-td>
            {{ item.completeDate ? dayjs(item.completeDate).format('YYYY-MM-DD') : '' }}
          </uni-td>

          <uni-td>
            <view class="table-btn">
              <view class="btn primary-btn" @click="handle(item.uid as string)">办理</view>
              <view class="btn red-btn" @click="notHandle(item.uid as string)">无需办理</view>
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
import { routerForward } from '@/utils'
import { updateImpLandlordProceduresApi } from '@/service'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const emit = defineEmits(['updateData'])

// 相关手续表
const immigrantProceduresList = computed(() => {
  return props.dataInfo.immigrantProceduresList || []
})

const handle = (uid: string) => {
  routerForward('attendto', {
    uid: props.dataInfo.uid,
    type: 1,
    data: uid
  })
}
const notHandle = (uid: string) => {
  // 直接更新数据
  updateImpLandlordProceduresApi(props.dataInfo.uid, uid, {
    needHandle: '0', // 是否需要办理01
    isComplete: '1'
  }).then(() => {
    uni.showToast({
      title: '保存成功！',
      icon: 'success'
    })
    emit('updateData')
  })
}
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
</style>
