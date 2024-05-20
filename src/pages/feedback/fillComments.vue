<template>
  <view class="form-wrapper">
    <Back title="填写意见" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="22">
            <uni-forms-item
              label="意见描述："
              :label-width="150"
              label-align="right"
              name="formData.remark"
            >
              <uni-easyinput v-model="formData.remark" type="textarea" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>

        <uni-row v-if="isSelfVal">
          <uni-col :span="24">
            <uni-forms-item
              label="是否解决："
              :label-width="150"
              label-align="right"
              name="feedbackPic"
            >
              <radio-group @change="radioChange" class="group-segment">
                <label class="group-segment">
                  <view>
                    <radio value="0" :checked="radioChecked" class="radio-dot" />
                  </view>
                  <view class="radio-txt">未解决</view>
                </label>
                <label class="group-segment divider">
                  <view>
                    <radio value="1" :checked="radioChecked" class="radio-dot" />
                  </view>
                  <view class="radio-txt">已解决</view>
                </label>
              </radio-group>
            </uni-forms-item>
          </uni-col>
        </uni-row>
      </uni-forms>

      <image
        class="submit-btn"
        src="@/static/images/icon_submit.png"
        mode="scaleToFill"
        @click="submit"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import Back from '@/components/Back/Index.vue'
import { routerBack } from '@/utils'
import { showToast, SUCCESS_MSG } from '@/config/msg'

import { updateOtherItemApi } from '@/service'

const formData = ref<any>({
  remark: '',
  status: '0'
})

const radioChecked = ref<boolean>(false)
const isSelfVal = ref<boolean>(false) // 是否是本人
const uidVal = ref<string>('')

onLoad((option) => {
  if (option) {
    const { isSelf, uid } = option
    isSelfVal.value = isSelf === '1'
    uidVal.value = uid
  }
})

const radioChange = (e: any) => {
  const { detail } = e
  formData.value.status = detail.value
}

const submit = async () => {
  if (!formData.value.remark) {
    showToast('意见描述不能为空')
    return
  }

  let params = {
    ...formData.value,
    uids: uidVal.value
  }
  console.log(params, 'params')
  try {
    const res = await updateOtherItemApi(params)

    showToast(SUCCESS_MSG)
    routerBack()
    // 触发自定义事件
    uni.$emit('customRefresh')
  } catch {}
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

    .form {
      height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
      padding: 9rpx 0;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .group-segment {
        display: flex;
        align-items: center;
        margin-top: 2rpx;

        &.divider {
          margin-left: 10rpx;
        }

        .radio-dot {
          transform: scale(0.7);
        }

        .radio-txt {
          color: #333;
          font-size: 9rpx;
        }
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
  }
}
</style>
