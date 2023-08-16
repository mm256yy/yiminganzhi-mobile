<template>
  <Container title="坟墓安置">
    <view class="common-wrap">
      <view class="common-head">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>基本信息</text>
      </view>

      <view class="form-wrap">
        <uni-forms class="form" ref="form" :modelValue="formData">
          <uni-forms-item
            label="坟墓与登记人关系："
            :label-width="90"
            label-align="right"
            name="formData.relation"
          >
            <view v-if="query.actionType === 'edit'">
              {{ formatDict(formData.relation, 307) }}
            </view>
            <uni-data-select v-else v-model="formData.relation" :localdata="dict[307]" />
          </uni-forms-item>

          <uni-forms-item
            label="材料："
            :label-width="90"
            label-align="right"
            name="formData.materials"
          >
            <view v-if="query.actionType === 'edit'">
              {{ formatDict(formData.materials, 295) }}
            </view>
            <uni-data-select v-else v-model="formData.materials" :localdata="dict[295]" />
          </uni-forms-item>

          <uni-forms-item
            label="穴位："
            :label-width="90"
            label-align="right"
            name="formData.graveType"
          >
            <view v-if="query.actionType === 'edit'">
              {{ formatDict(formData.graveType, 345) }}
            </view>
            <uni-data-select v-else v-model="formData.graveType" :localdata="dict[345]" />
          </uni-forms-item>

          <uni-forms-item
            label="数量："
            :label-width="90"
            label-align="right"
            name="formData.number"
          >
            <view v-if="query.actionType === 'edit'">
              {{ formData.number }}
            </view>
            <uni-easyinput
              v-else
              placeholder="请输入"
              :style="{ width: '166rpx' }"
              type="number"
              v-model="formData.number"
            />
          </uni-forms-item>

          <uni-forms-item
            label="处理方式："
            :label-width="90"
            label-align="right"
            name="formData.handleWay"
          >
            <uni-data-select v-model="formData.handleWay" :localdata="dict[238]" />
          </uni-forms-item>

          <uni-forms-item
            v-if="formData.handleWay === '2'"
            label="安置公墓："
            :label-width="90"
            label-align="right"
            name="formData.settingGrave"
          >
            <uni-data-select v-model="formData.settingGrave" :localdata="dict[345]" />
          </uni-forms-item>

          <uni-forms-item
            v-else-if="formData.handleWay === '1'"
            label="择址地址："
            :label-width="90"
            label-align="right"
            name="formData.settingAddress"
          >
            <uni-easyinput placeholder="请输入" type="text" v-model="formData.settingAddress" />
          </uni-forms-item>

          <uni-forms-item
            label="备注："
            :label-width="90"
            label-align="right"
            name="formData.settingRemark"
          >
            <uni-easyinput v-model="formData.settingRemark" type="textarea" placeholder="请输入" />
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </Container>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Container from '@/components/Container/index.vue'
import { formatDict, getStorage, StorageKey, routerBack } from '@/utils'
import {
  updateImpLandlordGraveApi,
  getImpLandlordGraveItemApi,
  addImpLandlordGraveApi
} from '@/service'

interface QueryType {
  uid: string // 坟墓 uid
  actionType: 'add' | 'edit'
}

const query = ref<any>({})
const formData = ref<any>({})
const form = ref<any>(null)
// 获取数据字典
const dict = getStorage(StorageKey.DICT)

onLoad((option) => {
  if (option) {
    query.value = option as QueryType
    getDetail()
  }
})

// 获取调查对象详情的档案数据
const getDetail = async () => {
  if (query.value.uid) {
    const res = await getImpLandlordGraveItemApi(query.value.uid)
    if (res) {
      formData.value = res
    }
  }
}

const submit = async () => {
  if (query.value.actionType === 'edit') {
    const res = await updateImpLandlordGraveApi({
      uid: query.value.uid,
      ...formData.value
    })
    if (res) {
      uni.showToast({
        title: '保存成功！',
        icon: 'success'
      })
      routerBack()
    }
  } else {
    const res = await addImpLandlordGraveApi({
      ...formData.value
    })
    if (res) {
      uni.showToast({
        title: '保存成功！',
        icon: 'success'
      })
      routerBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.common-wrap {
  height: 100%;
  padding: 6rpx;
  overflow-y: scroll;
  background-color: #fff;
}

.form-wrap {
  padding: 5rpx 12rpx;
  margin-top: 9rpx;
  background-color: #fff;

  .form {
    ::v-deep.uni-forms-item {
      margin-bottom: 6rpx !important;
    }

    ::v-deep.uni-forms-item__label {
      height: 23rpx !important;
      font-size: 9rpx !important;
      color: rgba(23, 23, 24, 0.6) !important;
    }

    ::v-deep.uni-easyinput__content {
      min-height: 23rpx !important;

      .uni-easyinput__placeholder-class,
      .uni-input-input {
        font-size: 9rpx !important;
      }
    }

    ::v-deep.uni-data-tree,
    ::v-deep.uni-stat__select {
      flex: 0 auto !important;
      width: 166rpx !important;
    }

    ::v-deep.uni-select__input-text {
      width: 90% !important;
      font-size: 9rpx !important;
    }

    ::v-deep.uni-date,
    ::v-deep.uni-date-editor {
      width: 166rpx !important;
    }

    ::v-deep.uni-input-input,
    ::v-deep.uni-input-placeholder {
      font-size: 9rpx !important;
    }

    .input-txt {
      display: flex;
      height: 23rpx;
      padding-left: 12rpx;
      border: 1rpx solid #ebebeb;
      border-radius: 4rpx;
      align-items: center;

      &.num {
        width: 166rpx;
      }
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    height: 23rpx;
    margin-bottom: 6rpx;
  }

  .form-label {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 90px;
    height: 23rpx;
    font-size: 9rpx;

    .is-required {
      font-weight: bold;
      color: #dd524d;
    }

    .label-txt {
      color: #171718;
    }
  }

  .form-value {
    flex: 1;
    display: flex;
    align-items: center;
    height: 23rpx;
    margin-left: 12rpx;

    .border {
      border: 1rpx solid #ebebeb;
    }

    .ipt {
      font-size: 9rpx;
      color: rgba(19, 19, 19, 0.4);
    }
  }
}

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

.submit-btn {
  position: fixed;
  right: 25rpx;
  bottom: 20rpx;
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
}
</style>
