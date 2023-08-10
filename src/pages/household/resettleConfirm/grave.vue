<template>
  <view class="grave-wrap">
    <view class="btn-box">
      <view class="btn green-btn">
        <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
        <text class="txt">打印报表</text>
      </view>
      <view class="btn blue-btn">
        <image class="icon" src="@/static/images/icon_plus.png" mode="scaleToFill" />
        <text class="txt">添加</text>
      </view>
      <view class="btn blue-btn">
        <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
        <text class="txt">档案上传</text>
      </view>

      <view class="btn blue-btn">
        <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
        <text class="txt">问题反馈</text>
      </view>
    </view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>坟墓信息</text>
    </view>

    <view class="table-wrap">
      <uni-table
        class="table"
        ref="table"
        :loading="loading"
        border
        stripe
        emptyText="暂无更多数据"
      >
        <uni-tr>
          <uni-th width="90rpx">坟墓与登记人关系</uni-th>
          <uni-th width="59rpx">材料</uni-th>
          <uni-th width="38rpx">穴位</uni-th>
          <uni-th width="40rpx">数量</uni-th>
          <uni-th width="52rpx">处理方式</uni-th>
          <uni-th width="80rpx">备注</uni-th>
          <uni-th width="98rpx">安置公墓/择址地址</uni-th>
          <uni-th width="62rpx" align="center">操作</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ item.relation }}</uni-td>
          <uni-td>{{ item.materials }}</uni-td>
          <uni-td>{{ item.graveTypeText }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ item.handleWayText }}</uni-td>
          <uni-td>{{ item.settleRemark }}</uni-td>
          <uni-td>{{ item.settingGrave }}</uni-td>
          <uni-td>
            <view class="table-btn">
              <view class="btn primary-btn">确认</view>
              <view class="btn red-btn">删除</view>
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>

    <EditForm :actionType="actionType" />
    <Archives />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EditForm from './editForm.vue'
import Archives from './archives.vue'

const loading = ref<boolean>(false)
const tableData = ref<any[]>([
  {
    relation: '2',
    materials: '2',
    graveTypeText: '2',
    number: 2,
    handleWayText: 2,
    settleRemark: 2,
    settingGrave: 3
  }
])

const actionType = ref<'add' | 'edit'>('add')
</script>

<style lang="scss" scoped>
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

.btn-box {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 9rpx 0;

  .btn {
    display: flex;
    height: 23rpx;
    padding: 0 9rpx;
    margin-left: 6rpx;
    background: #3e73ec;
    border-radius: 23rpx;
    align-items: center;
    justify-content: center;

    &.green-btn {
      background-color: #30a952;
    }

    &.blue-btn {
      background: #3e73ec;
    }

    .icon {
      width: 9rpx;
      height: 9rpx;
      margin-right: 3rpx;
    }

    .txt {
      font-size: 9rpx;
      line-height: 11rpx;
      color: #ffffff;
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
