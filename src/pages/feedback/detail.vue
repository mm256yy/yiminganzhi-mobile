<template>
  <view class="form-wrapper">
    <Back title="信息反馈详情" needConfirm />
    <view class="main">
      <view class="list-header">
        <view class="list-header-rt">
          <view class="list-header-right">
            <view class="btn blue-btn" @click="fillComments">
              <image class="icon" src="@/static/images/icon_dqxy_sel.png" mode="scaleToFill" />
              <text class="txt">填写意见</text>
            </view>
          </view>
        </view>
      </view>
      <view class="fill-block">
        <!--问题详情-->
        <view class="common-head">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <text>问题详情</text>
        </view>
        <uni-row :gutter="5" class="row-block">
          <uni-col :span="8" :push="1">
            <view class="item-field">
              <span class="item-label">户主：</span>
              <span class="item-value">{{ query?.householder }}</span>
            </view>
          </uni-col>
          <uni-col :span="8" :push="1">
            <view class="item-field">
              <span class="item-label">工作阶段：</span>
              <span class="item-value">{{ query?.typeText? query?.typeText : householdTypes.find((item:any) => item.value == query?.type)?.text }}</span>
            </view>
          </uni-col>
          <uni-col :span="8" :push="1">
            <view class="item-field">
              <span class="item-label">提交时间：</span>
              <span>{{ query?.createdDate ? dayjs(query?.createdDate).format('YYYY-MM-DD') : '--' }}</span>
            </view>
          </uni-col>
        </uni-row>
        <uni-row :gutter="5" class="row-block">
          <uni-col :span="24" :push="1">
            <view class="item-field">
              <span class="item-label">问题描述：</span>
              <span class="item-value">{{ query?.remark }}</span>
            </view>
          </uni-col>
        </uni-row>
        <uni-row :gutter="5" class="row-block">
          <uni-col :span="24" :push="1">
            <view class="item-field">
              <span class="item-label">处理结果：</span>
              <span class="item-value">{{ query?.statusText }}</span>
            </view>
          </uni-col>
        </uni-row>
        <!--已读-->
        <view class="common-head">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <text>已读</text>
        </view>

        <uni-row :gutter="5" class="row-block">
          <uni-col :span="24" :push="1">
            <view class="item-field">
              <span class="item-value">{{ formatData(query?.reader) }}</span>
            </view>
          </uni-col>
        </uni-row>
        <!--领导意见-->
        <view class="common-head">
          <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
          <text>领导意见</text>
        </view>
        <view class="comment-segment">
          <uni-steps :options="formatListData(list)" active-color="#007AFF" :active="active" direction="column" />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import { routerForward } from '@/utils'
import type { CommentType } from '@/types/common'
import dayjs from 'dayjs'
import { householdTypes } from './config'
interface DictType {
  text: string,
  value: string
}


// 获取数据字典
const active = ref<number>(0)
const query = ref<CommentType>()
const list = ref<any[]>([])
const typeOptionsList = ref<DictType[]>([])
onLoad((option) => {
  if (option) {
    query.value = option as CommentType
    console.log('qery', query.value)
    list.value = JSON.parse(query.value.list)
    typeOptionsList.value = householdTypes
    console.log( typeOptionsList.value,'测试数据',dayjs('2024-04-08T06:25:10.348Z').format('YYYY-MM-DD'))
  }
})

// 格式化数据
const formatData = (params: any) => {
  if (!params) {
    return ''
  }
  if (params === 'null') {
    return ''
  }
  return params
}


// 格式化列表数据
const formatListData = (params: any) => {
  if (!params) {
    return []
  }

  if (!Array.isArray(params)) {
    return []
  }

  const stepList = params.map(item => {
    return {
      title: query.value?.creater,
      desc: item.remark
    }
  })
  return stepList
}

const fillComments = () => {
  routerForward('fillComments', query.value)
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .main {
    height: calc(100vh - 33rpx);
    padding: 6rpx;
    background-color: #e7edfd;
    border-radius: 2rpx;
    box-sizing: border-box;

    .list-header {
      display: flex;
      height: 33rpx;
      padding: 0 6rpx 0 9rpx;
      box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, 0.08);
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      background-color: #fff;
      justify-content: flex-end;

      .list-header-rt {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        height: 33rpx;

        .list-header-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
        }
      }
    }
  }

  .value {
    display: flex;
    height: 100%;
    align-items: center;
  }
}

.btn {
  display: flex;
  height: 23rpx;
  padding: 0 9rpx;
  margin-left: 6rpx;
  background: #3e73ec;
  border-radius: 23rpx;
  align-items: center;
  justify-content: center;

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

.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  margin-left: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0rpx 0rpx;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }
}

.item-field {
  display: flex;
  align-items: center;
  font-size: 10rpx;


}

.fill-block {
  background-color: #fff;
}

.item-label {
  color: #333;
  font-size: 10rpx;
}

.item-value {
  color: #666;
  font-size: 10rpx;
}

.comment-segment {
  padding: 10rpx;
  overflow: auto;

  .leader-name {
    font-size: 10rpx;
    color: #333;
    padding: 5rpx 22rpx;
  }

  .leader-comment {
    background-color: #F8F9FC;
    border-radius: 10rpx;
    padding-bottom: 5rpx;

    .comment-txt {
      color: #757A90;
      font-size: 9rpx;
    }
  }
}

.row-block {
  height: 22rpx;
  line-height: 22rpx;
}
</style>
