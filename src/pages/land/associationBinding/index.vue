<template>
  <view class="form-wrapper">
    <Back title="关联绑定" needConfirm />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <view class="land-segment">
          <label><text class="common-txt">土地编号： NO12345678 </text></label>
        </view>
        <uni-row>
          <uni-col :span="24">
            <uni-forms-item :label-width="78">
              	<checkbox-group    @change="handleRadioChange">
                <checkbox
                  :value="checkSelectedStr"
                  :checked="checkSelected"
                />
                <span class="common-txt"
                  >没有查询到户名，使用以下信息新增户名，只征地不搬迁才可以新增户名</span
                >
             </checkbox-group>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              label="户主："
              :label-width="150"
              label-align="right"
              name="formData.householder"
            >
              <uni-easyinput v-model="formData.householder" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="类别："
              :label-width="150"
              label-align="right"
              name="formData.typeText"
            >
              <uni-data-select v-model="formData.typeText" :localdata="typeOptionsList" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              label="身份证号："
              :label-width="150"
              label-align="right"
              name="formData.idCard"
            >
              <uni-easyinput v-model="formData.idCard" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              required
              label="所属区域："
              :label-width="150"
              label-align="right"
              name="formData.virutalVillageCode"
            >
              <view class="village-select-wrapper">
                <natural-village-select-form-item
                  ref="naturalVillageRef"
                  v-model:areaCode="formData.areaCode"
                  v-model:townCode="formData.townCode"
                  v-model:villageCode="formData.villageCode"
                  v-model:virutalVillageCode="formData.virutalVillageCode"
                  @open="initNaturalVillageData"
                  @confirm="confirmSelectNaturalVillage"
                />
              </view>
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row v-show="checkSelected">
          <uni-col :span="12">
            <uni-forms-item
              label="户号："
              :label-width="150"
              label-align="right"
              name="formData.doorNo"
            >
              <uni-easyinput v-model="formData.doorNo" placeholder="请输入" />
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
import NaturalVillageSelectFormItem from "@/components/NaturalVillageSelectFormItem/index.vue";


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
  areaCode: '',
  townCode:'',
  villageCode: '',
  virutalVillageCode: '',
  otherCode:''
});
const naturalVillageRef = ref<any>(null)
const checkSelectedStr = ref<string>("0");
const checkSelected = ref<boolean>(false);
const typeOptionsList = ref<DictType[]>([]);
const confirmBindingRef = ref();

onLoad((option) => {
  if (option) {
  }
});

const submit = () => {
  confirmBindingRef.value?.open();
  // if (!formData.value.householder) {
  //   showToast('户主不能为空')
  //   return
  // }
  // if (!formData.value.typeText) {
  //   showToast('反馈阶段不能为空')
  //   return
  // }
  // if (!formData.value.remark) {
  //   showToast('问题描述不能为空')
  //   return
  // }

  // let params = {
  //   ...formData.value,
  //   feedbackPic: fmtPicUrl(flatOtherPicStr.value)
  // }

  // try {
  //   const res = await addOtherItemApi(params)
  //   if (res) {
  //     showToast(SUCCESS_MSG)
  //     routerBack()
  //     // 触发自定义事件
  //     uni.$emit('customRefresh');
  //   }
  // } catch {
  // }
};

// 初始化自然村/村民小组组件数据
const initNaturalVillageData = () => {
  naturalVillageRef.value?.getTreeData()
}

/**
 * 自然村/村民小组选择确认
 * @param{Object} otherCode 用于兼容老系统，该code值由 1位乡/镇code + 2位行政村code组成
 */
const confirmSelectNaturalVillage = (otherCode: string) => {
  formData.value.otherCode = otherCode || ''
}

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

const handleRadioChange = (e: any) => {
  console.log('event',e.detail.value);
  checkSelected.value = !checkSelected.value;
};


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

  .village-select-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>
