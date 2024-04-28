<template>
  <view class="search-wrapper">
    <view class="nav-wrapper">
      <view class="status-bar" />
      <view class="content">
        <image class="icon-back" src="@/static/images/back.png" mode="scaleToFill" @click="close" />
        <view class="title">选择列表</view>
        <label class="right" @click="confirmSelect">确定</label>
      </view>
    </view>
    <!-- <view class="search-input">
      <input
        class="input-txt"
        v-model="name"
        type="text"
        :confirm-type="'search'"
        placeholder="请输入"
        @confirm="confirm"
      />
      <div>1</div>
    </view> -->
    <view class="search">
      <view class="search-input">
        <!-- <input type="text" placeholder="请输入户号、名称、联系方式" v-model.trim="seachName" /> -->
        <input
          v-model="name"
          type="text"
          :confirm-type="'search'"
          placeholder="请输入户主姓名/户号"
          @confirm="confirm"
        />
      </view>
      <view class="search-btn" @click="confirm">
        <image class="search-icon" src="@/static/images/icon_search_white.png" mode="aspectFit" />
        <text class="search-txt">查询</text>
      </view>
    </view>
    <view class="search-list" v-if="dataList && dataList.length > 0">
      <view class="search-item" v-for="(item, index) in dataList" :key="index">
        <view class="content" @click="select(index)">
          <view class="left">
            <view class="label">{{ item.label }}</view>
            <view class="value">{{ item.value.substring(2) }}</view>
            <view class="value">{{ item.areaCodeText }}</view>
            <view class="value">{{ item.townCodeText }}</view>
            <view class="value">{{ item.villageCodeText }}</view>
          </view>
          <view class="right">
            <image
              v-if="item.checked"
              class="icon"
              src="@/static/images/icon_selected.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">暂无数据，请先输入搜索内容</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { getLandlordListBySearchApi, getImpLandlordListBySearchApi } from '@/service'
import { MainType } from '@/types/common'

interface PropsType {
  mainType: MainType
  type: 'single' | 'multiple'
  stage: 'survey' | 'implementation'
  status?: any
  villageCode?: any
}

const props = defineProps<PropsType>()
const dataList = ref<any>([])
const name = ref<string>('')
const emit = defineEmits(['confirmSelect', 'close'])

/**
 * 搜索居民户
 * @param{object} name 居民姓名
 * @param{Object} type 居民户类型
 */
const getLandlordListBySearch = (name: string, type: any) => {
  let params = {
    name,
    type: props.mainType,
    page: 1,
    pageSize: 50,
    villageCode: props.villageCode
  }
  if (props.stage === 'survey') {
    getLandlordListBySearchApi(params).then((res) => {
      console.log(res, '测试数据111')
      if (res && res.length > 0) {
        let arr: any = []
        res.map((item: any) => {
          arr.push({
            id: item.id,
            label: item.name,
            value: item.doorNo,
            checked: item.checked,
            areaCodeText: item.areaCodeText,
            townCodeText: item.townCodeText,
            villageCodeText: item.villageCodeText
          })
        })
        dataList.value = [...arr]
      }
    })
  } else if (props.stage === 'implementation') {
    getImpLandlordListBySearchApi(params).then((res) => {
      console.log(res, '测试数据222')
      if (res && res.length > 0) {
        let arr: any = []
        res.map((item: any) => {
          arr.push({
            id: item.id,
            label: item.name,
            value: item.doorNo,
            checked: item.checked,
            areaCodeText: item.areaCodeText,
            townCodeText: item.townCodeText,
            villageCodeText: item.villageCodeText
          })
        })
        dataList.value = [...arr]
      }
    })
  }
}

/**
 * 确认搜索
 * @param{Object} e
 */
const confirm = (e: any) => {
  // name.value = e.detail.value
  // console.log(e.detail.value, 'ipt')
  dataList.value = []
  getLandlordListBySearch(name.value, props.type)
}

// 选择
const select = (index: any) => {
  if (props.type === 'single' || props.status == '1') {
    dataList.value.map((item: any, idx: any) => {
      if (index === idx) {
        item.checked = !item.checked
      } else {
        item.checked = false
      }
    })
  } else if (props.type === 'multiple') {
    dataList.value.map((item: any, idx: any) => {
      if (index === idx) {
        item.checked = !item.checked
      }
    })
  }
}

// 回退，关闭当前组件
const close = () => {
  emit('close')
}

// 确认选择
const confirmSelect = () => {
  if (props.type === 'single') {
    const selectedData = dataList.value.find((item: any) => item.checked)
    if (!selectedData) {
      uni.showToast({
        title: '请选择',
        icon: 'none'
      })
      return
    }
    emit('confirmSelect', selectedData)
  } else if (props.type === 'multiple') {
    const selelctedDataList = dataList.value.filter((item: any) => item.checked)
    if (!selelctedDataList || !selelctedDataList.length) {
      uni.showToast({
        title: '请选择',
        icon: 'none'
      })
      return
    }
    emit('confirmSelect', selelctedDataList)
  }
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: url('../../static/images/common_bg.png') no-repeat;
  background-size: 100% 100%;

  .nav-wrapper {
    background: transparent;

    .status-bar {
      height: var(--status-bar-height);
    }

    .content {
      display: flex;
      height: 33rpx;
      padding: 0 9rpx;

      /* #ifdef H5 */
      cursor: pointer;
      box-sizing: border-box;
      flex-direction: row;
      align-items: center;
      /* #endif */

      .icon-back {
        width: 14rpx;
        height: 14rpx;
      }

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15rpx;
        color: #fff;
        flex: 1 auto;
      }

      .right {
        font-size: 10rpx;
        color: #fff;
      }
    }
  }

  // .search-input {
  //   width: calc(100% - 100rpx);
  //   height: 30rpx;
  //   padding: 0 7rpx;
  //   margin: 0 auto;
  //   background-color: #fff;
  //   border-radius: 5rpx;
  //   box-sizing: border-box;
  //   display:flex;
  //   ::v-deep.uni-input-input,
  //   ::v-deep.uni-input-placeholder {
  //     font-size: 9rpx !important;
  //   }

  //   .input-txt {
  //     height: 30rpx;
  //     font-size: 9rpx;
  //     line-height: 30rpx;
  //     color: #171718;
  //   }
  // }
  .search {
    display: flex;
    width: 675rpx;
    height: 28rpx;
    margin: 0 auto;
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 5rpx;
    justify-content: center;

    .search-input {
      width: 675rpx;
      height: 28rpx;
      padding-left: 12rpx;
      line-height: 28rpx;
      text-align: left;
      border-radius: 5rpx 0 0 5rpx;

      input {
        width: 600rpx;
        height: 28rpx;
        font-size: 10rpx;
        line-height: 28rpx;
        color: rgba(19, 19, 19, 0.4);
      }
    }

    .search-btn {
      display: flex;
      width: 60rpx;
      height: 28rpx;
      overflow: hidden;
      // background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
      background: #0c64eb;
      border-radius: 0 5rpx 5rpx 0;
      justify-content: center;
      align-items: center;

      .search-icon {
        width: 14rpx;
        height: 14rpx;
      }

      .search-txt {
        margin-left: 5rpx;
        font-size: 9rpx;
        font-weight: 400;
        color: #f7f8fa;
      }
    }
  }

  .search-list {
    width: 100%;
    height: calc(100vh - 30rpx - 10rpx - 5rpx - var(--status-bar-height));
    padding: 0 15rpx 50rpx 15rpx;
    margin-top: 5rpx;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    .search-item {
      width: 100%;
      height: 40rpx;
      border-bottom: 1rpx solid #e7edfd;

      .content {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        width: 100%;
        height: 40rpx;

        .left {
          display: flex;
          align-items: center;
          // width: calc(100% - 40rpx);
          height: 40rpx;

          .label,
          .value {
            font-size: 10rpx;
            color: #171718;
          }

          .value {
            margin-left: 10rpx;
          }
        }

        .right {
          width: 40rpx;
          height: 40rpx;
          text-align: right;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 30rpx - 10rpx - var(--status-bar-height));

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
    }
  }

  .submit-btn {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 80rpx;
    height: 80rpx;
  }
}
</style>
