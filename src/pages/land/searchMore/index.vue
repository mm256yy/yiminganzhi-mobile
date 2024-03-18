<template>
  <view class="form-wrapper">
    <Back title="更多查询" />
    <view class="main">
      <uni-forms class="form" ref="form" :modelValue="formData">
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="权属单位："
              :label-width="150"
              label-align="right"
              name="formData.virutalVillageCode"
            >
              <natural-village-select-form-item
                ref="naturalVillage"
                v-model:areaCode="formData.areaCode"
                v-model:townCode="formData.townCode"
                v-model:villageCode="formData.villageCode"
                v-model:virutalVillageCode="formData.virutalVillageCode"
                type="land"
                showOther
                @open="initNaturalVillageData"
                @confirm="confirmSelectNaturalVillage"
              />
            </uni-forms-item>
          </uni-col>
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
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地块编号："
              :label-width="150"
              label-align="right"
              name="formData.landNumber"
            >
              <uni-easyinput v-model="formData.landNumber" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="使用权人："
              :label-width="150"
              label-align="right"
              name="formData.rightHolder"
            >
              <uni-easyinput v-model="formData.rightHolder" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地名："
              :label-width="150"
              label-align="right"
              name="formData.landName"
            >
              <uni-easyinput v-model="formData.landName" placeholder="请输入" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="土地性质："
              :label-width="150"
              label-align="right"
              name="formData.landNature"
            >
              <uni-data-select v-model="formData.landNature" :localdata="dict[222]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="地类："
              :label-width="150"
              label-align="right"
              name="formData.landLevel"
            >
              <uni-data-picker
                v-model="formData.landLevel"
                placeholder="请选择"
                :localdata="levelItems"
                popup-title="请选择所在地区"
                @change="onchange"
            /></uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="关联状态："
              :label-width="150"
              label-align="right"
              name="formData.relationFlag"
            >
              <uni-data-select
                v-model="formData.relationFlag"
                :localdata="associationStatusList()"
              />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="评估状态："
              :label-width="150"
              label-align="right"
              name="formData.estimateFlag"
            >
              <uni-data-select v-model="formData.estimateFlag" :localdata="estimateStatusList()" />
            </uni-forms-item>
          </uni-col>
          <uni-col :span="12">
            <uni-forms-item
              label="所在区域："
              :label-width="150"
              label-align="right"
              name="formData.area"
            >
              <uni-data-select v-model="formData.area" :localdata="dict[326]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <uni-row>
          <uni-col :span="12">
            <uni-forms-item
              label="淹没范围："
              :label-width="150"
              label-align="right"
              name="formData.inundationRange"
            >
              <uni-data-select v-model="formData.inundationRange" :localdata="dict[346]" />
            </uni-forms-item>
          </uni-col>
        </uni-row>
        <view class="submit-district">
          <button type="primary" size="small" @click="toSearch">搜索</button>
          <button type="default" @click="reset">重置</button>
        </view>
      </uni-forms>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import Back from '@/components/Back/Index.vue'
import { routerForward, getStorage, StorageKey } from '@/utils'
import { getDictObjsApi } from '@/service'
import NaturalVillageSelectFormItem from '@/components/NaturalVillageSelectFormItem/index.vue'

const formData = ref<any>({
  areaCode: '', // 区/县
  townCode: '', // 镇/街道
  villageCode: '', // 行政村
  virutalVillageCode: '', // 自然村/村民小组
  doorNo: '',
  landNumber: '',
  rightHolder: '',
  landName: '', // 地名
  landNature: '', // 土地性质
  landLevel: '', // 地类
  relationFlag: '', // 关联状态
  estimateFlag: '', // 评估状态
  area: '', // 所在区域
  inundationRange: '' // 淹没范围
})

const levelItems = ref<any[]>()
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const naturalVillage = ref<any>(null)

onLoad((option) => {
  if (option) {
  }
})

// 初始化自然村/村民小组组件数据
const initNaturalVillageData = () => {
  naturalVillage.value?.getTreeData()
}

/**
 * 自然村/村民小组选择确认
 * @param{Object} otherCode 用于兼容老系统，该code值由 1位乡/镇code + 2位行政村code组成
 */
const confirmSelectNaturalVillage = (otherCode: string) => {
  formData.value.otherCode = otherCode || ''
}

// 查询
const toSearch = () => {
  routerForward('home', {
    params: JSON.stringify(formData.value),
    replace: true
  })
  reset()
}

// 重置
const reset = () => {
  formData.value = {
    areaCode: '', // 区/县
    townCode: '', // 镇/街道
    villageCode: '', // 行政村
    virutalVillageCode: '', // 自然村/村民小组
    doorNo: '',
    landNumber: '',
    rightHolder: '',
    landName: '', // 地名
    landNature: '', // 土地性质
    landLevel: '', // 地类
    relationFlag: '', // 关联状态
    estimateFlag: '', // 评估状态
    area: '', // 所在区域
    inundationRange: '' // 淹没范围
  }
}

// 关联状态
const associationStatusList = () => {
  return [
    { value: '0', text: '未关联' },
    { value: '1', text: '已关联' }
  ]
}

// 评估状态
const estimateStatusList = () => {
  return [
    { value: '0', text: '未评估' },
    { value: '1', text: '已评估' }
  ]
}

const onchange = (e: any) => {
  console.log('e', e.detail.value)
  const list = e.detail.value
  const start = list[0]?.value
  const end = list[1]?.value
  formData.value.landLevel = `${start}-${end}`
}

const getDictData = async () => {
  try {
    const result = await getDictObjsApi([397, 398, 399, 400, 401, 402, 403, 404, 405, 408])
    levelItems.value = result as any
  } catch {
    levelItems.value = []
  }
}

onMounted(() => {
  getDictData()
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('../../../static/images/common_bg.png') no-repeat;
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
    width: 160rpx;
    padding: 20rpx;
    justify-content: center;
    margin: 0 auto;

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
