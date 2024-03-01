<template>
  <view class="form-wrapper">
    <Back title="更多查询" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="权属单位："
              :label-width="150"
              label-align="right"
              name="formData.householder"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="户号："
              :label-width="150"
              label-align="right"
              name="formData.typeText"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地块编号："
              :label-width="150"
              label-align="right"
              name="formData.idCard"
            >
              <uni-easyinput v-model="formData.idCard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="使用权人："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-easyinput v-model="formData.doorNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地名："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-easyinput v-model="formData.doorNo" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="土地性质："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地类："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="关联状态："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="评估状态："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在区域："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="淹没范围："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <view class="submit-district">
          <view class="btn blue-btn" @click="toSearch">
            <text class="txt">搜索</text>
          </view>
          <view class="btn" @click="reset">
            <text class="txt">重置</text>
          </view>
        </view>
      </uni-forms>
    </view>
    <!-- 绑定确认弹框 -->
    <uni-popup ref="confirmBindingRef" type="dialog" :is-mask-click="false">
      <uni-popup-dialog
        type="info"
        cancelText="暂时不评"
        confirmText="进行评估"
        title="绑定成功，是否继续进行资产评估？"
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import Back from "@/components/Back/Index.vue";
import { routerBack } from "@/utils";
import { showToast, SUCCESS_MSG } from "@/config/msg";

interface DictType {
  text: string;
  value: string;
}

const formData = ref<any>({
  householder: "",
  typeText: "",
  idCard: "",
  area: "",
  doorNo: "",
  landNo: "",
  remark: "",
  areaCode: "",
  townCode: "",
  villageCode: "",
  virutalVillageCode: "",
  otherCode: "",
});
const naturalVillageRef = ref<any>(null);
const checkSelectedStr = ref<string>("0");
const checkSelected = ref<boolean>(false);
const typeOptionsList = ref<DictType[]>([]);
const confirmBindingRef = ref();

onLoad((option) => {
  if (option) {
  }
});

const dialogConfirm = () => {
  confirmBindingRef.value?.close();
  showToast(SUCCESS_MSG);
  routerBack();
  // const routeName='associationBinding'
  // toTarget(routeName)
};

const dialogClose = () => {
  confirmBindingRef.value?.close();
};

// 查询
const toSearch = () => {};

// 重置
const reset = () => {};
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url("../../../static/images/common_bg.png") no-repeat;
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

      ::v-deep.uni-forms-item__label {
        font-size: 9rpx !important;
        color: rgba(23, 23, 24, 0.6) !important;
      }

      ::v-deep.uni-easyinput__content {
        width: 200rpx !important;

        .uni-easyinput__placeholder-class,
        .uni-input-input {
          font-size: 9rpx !important;
        }
      }

      ::v-deep.uni-data-tree,
      ::v-deep.uni-stat__select {
        flex: 0 auto !important;
        width: 200rpx !important;
      }

      ::v-deep.uni-select__input-text {
        width: 90% !important;
        font-size: 9rpx !important;
      }

      ::v-deep.uni-date,
      ::v-deep.uni-date-editor {
        width: 200rpx !important;
      }

      ::v-deep.uni-input-input,
      ::v-deep.uni-input-placeholder {
        font-size: 9rpx !important;
      }

      .input-txtarea-wrapper {
        display: flex;
        align-items: center;
        width: 570rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txtarea {
          width: 570rpx;
          height: 70px;
          padding-left: 7rpx;
          font-size: 9rpx;
          line-height: 35px;
          color: #171718;
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

  .value {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .common-txt {
    font-size: 9rpx;
    color: #666;
  }

  .land-segment {
    display: flex;
    align-items: center;
    padding: 20rpx;
    margin-left: 40rpx;
    box-sizing: border-box;
  }

  .submit-district {
    display: flex;
    align-items: center;
    padding: 20rpx;
    justify-content: center;

    .btn {
      display: flex;
      height: 23rpx;
      padding: 0 9rpx;
      margin-left: 6rpx;
      background: #3e73ec;
      border-radius: 23rpx;
      align-items: center;
      justify-content: center;
      font-size: 16rpx;

      &.blue-btn {
        background: #3e73ec;
        color: #fff;
      }
    }
  }
}
</style>
