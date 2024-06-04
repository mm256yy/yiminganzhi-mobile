<template>
  <view class="population-wrapper">
    <!-- 居民户实施 —— 人口核定 -->
    <view
      class="btn-wrapper"
      v-if="
        props.dataList &&
        props.dataList.length > 0 &&
        props.dataInfo.immigrantFilling.populationStatus == '0'
      "
    >
      <view class="btns green" @click="onFilled">
        <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
        <text class="txt">填报完成</text>
      </view>
    </view>

    <view class="list" v-if="props.dataList && props.dataList.length > 0">
      <view
        class="list-item"
        v-for="item in props.dataList"
        :key="item.id"
        :style="{ background: item.isDelete == '1' ? '#dedede' : 'none' }"
      >
        <view class="list-1">
          <view class="left">
            <view class="icon">{{ formatDict(item.relation, 307) }}</view>
            <view class="name">{{ formatStr(item.name) }}</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="deletePopulation(item)"
            />
          </view>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">性别：</view>
                <view class="content">
                  {{ formatDict(item.sex, 292) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">身份证号：</view>
                <view class="content">
                  {{ formatStr(item.card) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">户籍类别：</view>
                <view class="content">{{ formatDict(item.censusType, 249) }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">婚姻状况：</view>
                <view class="content">
                  {{ formatDict(item.marital, 260) }}
                </view>
              </view>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">人口性质：</view>
                <view class="content">
                  {{
                    formatStr(item.name) == '增计人口'
                      ? '增计人口'
                      : formatDict(item.populationNature, 263)
                  }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">新增原因：</view>
                <view class="content">
                  {{ formatDict(item.addReason, 370) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="12" v-if="item.deleteReason">
              <view class="col">
                <view class="label">删除原因：</view>
                <view class="content"> {{ formatDict(item.deleteReason, 367) }}</view>
              </view>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="24" v-if="item.incrementAddReason">
              <view class="col">
                <view class="label" style="width: 100rpx">增计人口添加原因：</view>
                <view class="content"> {{ formatDict(item.incrementAddReason, 436) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加人口核定信息</view>
    </view>

    <!-- 新增 -->
    <image
      class="btn add"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add')"
    />

    <!-- 删除确认弹框 -->
    <!-- <uni-popup ref="alertDialog" type="dialog">
       <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        :value="reason"
        placeholder="请输入删除原因"
        @confirm="dialogConfirm"
        @close="dialogClose"
      /> 
    </uni-popup> -->
    <uni-popup :show="true" type="center" ref="alertDialog">
      <!-- 提示框主体 -->
      <view class="popup-container">
        <text
          style="
            font-size: 12rpx;
            line-height: 11rpx;
            color: rgba(23, 23, 24, 1);
            text-align: center;
            font-weight: border;
          "
          >确认删除？</text
        >
        <!-- 下拉框 -->
        <uni-data-select v-model="reason" :localdata="dict[367]" />
        <view class="btn-group">
          <button @click="dialogConfirm" style="color: #fff">确认</button>
          <button @click="dialogClose" style="color: #fff">取消</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { updateImpLandlordImmigrantFillingApi } from '@/service'
import { formatDict, formatStr, routerForward } from '@/utils'
import { showToast, SUCCESS_MSG, ERROR_MSG } from '@/config'
import { getStorage, StorageKey } from '@/utils'
interface PropsType {
  dataList: any[]
  dataInfo: any
}
const dict = getStorage(StorageKey.DICT)
const props = defineProps<PropsType>()
const emit = defineEmits(['deletePopulation', 'updateData'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
const reason = ref<string>('') // 删除原因
// 填报完成
const onFilled = () => {
  const dataList = props.dataList.filter((item) => item.isDelete != '1')
  const res = dataList.every((item) => item.populationNature != null)
  console.log(dataList, '测试dataList')
  console.log(res, '测试res')
  console.log(props.dataInfo, '测试dataInfo')
  if (!res) {
    showToast('请检查带*号必填项')
    return
  }
  const { uid } = props.dataInfo

  let params = {
    populationStatus: '1'
  }
  updateImpLandlordImmigrantFillingApi(uid, params)
    .then((res) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      showToast(ERROR_MSG)
    })
}

const toLink = (type: string, data?: any) => {
  const { uid, doorNo, phone } = props.dataInfo
  // 增计人口不允许编辑
  if (type === 'edit' && data.addReason !== '3') {
    let params = { type, uid, doorNo, itemUid: data.uid, phone }
    console.log(params, '传递的参数是什么？')
    routerForward('populationVerficationEdit', {
      params: JSON.stringify(params)
    })
  } else if (type === 'add') {
    let params = { type, uid, doorNo, phone }
    routerForward('populationVerficationEdit', {
      params: JSON.stringify(params)
    })
  }
}

/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
const deletePopulation = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  if (!reason.value) {
    showToast('请输入删除原因')
    return
  }
  let params = {
    ...currentItem.value,
    deleteReason: reason.value
  }
  console.log(params, '测试params')
  emit('deletePopulation', params)
  alertDialog.value.close()
}

const dialogClose = () => {
  alertDialog.value.close()
}
</script>

<style lang="scss" scoped>
.population-wrapper {
  width: 100%;
  overflow-y: scroll;

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 6rpx 0;

    .btns {
      display: flex;
      height: 23rpx;
      padding: 0 9rpx;
      margin-left: 6rpx;
      background: #3e73ec;
      border-radius: 23rpx;
      align-items: center;
      justify-content: center;

      &.green {
        background-color: #30a952;
      }

      &.blue {
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

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.08);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: auto;
            height: 16rpx;
            padding: 0 5rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            box-sizing: border-box;
            align-items: center;
            justify-content: center;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 56rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
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
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

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

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.add {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
  .popup-container {
    padding: 10px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 2%;
    width: 150%;
  }
  .btn-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .btn-group button {
    margin-left: 10px;
    background-color: #3e73ec;
    font-size: 9rpx;
  }
}
</style>
