<template>
  <view class="willingness-info-wrapper">
    <view class="sub-title">家庭信息</view>
    <view class="row-1">
      <view class="col">
        <view class="label">家庭总人数：</view>
        <view :class="['input-wrapper', focusIndex === 1 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            disabled
            v-model="formData.familyNum"
            @focus="inputFocus(1)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
      <view class="col">
        <view class="label m-r-5">其中：农村移民人数</view>
        <view :class="['input-wrapper', focusIndex === 2 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            v-model="formData.countryNum"
            @focus="inputFocus(2)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
      <view class="col">
        <view class="label m-r-5">其中：非农村移民人数</view>
        <view :class="['input-wrapper', focusIndex === 3 ? 'focus' : '']">
          <input
            class="input-txt"
            placeholder="请输入"
            type="number"
            v-model="formData.unCountryNum"
            @focus="inputFocus(3)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
    </view>
    <view :class="['sub-title', productModeData.length === 0 ? 'm-b-10' : '']"> 生产安置 </view>
    <view class="row-4">
      <view class="col" v-for="(item, index) in productModeData" :key="item.productionType">
        <view class="label">{{ item.productionType }}：</view>
        <view :class="['input-wrapper', focusIndex === (index + 1) * 10 ? 'focus' : '']">
          <input
            class="input-txt w-200"
            placeholder="请输入"
            type="number"
            v-model="item.number"
            @focus="inputFocus((index + 1) * 10)"
            @blur="inputBlur"
          />
          <view class="unit">人</view>
        </view>
      </view>
    </view>
    <view class="sub-title">搬迁安置方式</view>
    <view class="row-3 b-b-1">
      <radio-group v-if="configLength > 0" @change="homesteadChange">
        <!-- <view class="label m-t-5">宅基地安置：</view> -->
        <label v-for="item in homesteadData" :key="item.value">
          <radio :value="item.value" :checked="item.value === formData.removalType">
            {{ item.name }}
          </radio>
        </label>
        <!-- <view class="line" />
        <view class="label m-t-5">公寓房安置：</view>
        <label v-for="item in apartmentData" :key="item.value">
          <radio :value="item.value" :checked="item.value === formData.removalType">
            {{ item.name }}
          </radio>
        </label> -->
      </radio-group>
      <radio-group v-else @change="homesteadChange">
        <view class="label m-t-5">默认：</view>
        <label v-for="item in defaultData" :key="item.value">
          <radio :value="item.value" :checked="item.value === formData.removalType">
            {{ item.name }}
          </radio>
        </label>
      </radio-group>
    </view>
    <view class="sub-title">备注</view>
    <view class="col-4">
      <textarea
        class="remark"
        placeholder="请输入"
        type="texarea"
        v-model="formData.opinion"
      ></textarea>
    </view>

    <image
      v-if="stage === MainStage.review"
      class="btn record"
      src="@/static/images/icon_record.png"
      mode="scaleToFill"
      @click="showModifyRecord"
    />

    <image
      class="btn submit"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />

    <!-- 复核修改记录 -->
    <modify-records v-if="showRecord" :dataList="updateLogList" @close="closeModifyRecords" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getWillListApi } from '@/service'
import { onShow } from '@dcloudio/uni-app'
import { showToast } from '@/config'
import { MainStage } from '@/types/common'
import { getStorage, StorageKey } from '@/utils'
import modifyRecords from '../../common/modifyRecords/index.vue' // 引入修改记录组件

const props = defineProps({
  willData: {
    type: Object as any,
    default: () => {}
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  },
  updateLogList: {
    type: Object as any,
    default: () => {}
  }
})

const projectInfo = getStorage(StorageKey.PROJECTINFO)
// 阶段，如 survey 调查填报阶段， review 复核阶段
const stage = projectInfo?.status ? projectInfo.status : MainStage.survey
const showRecord = ref<boolean>(false)

const commonParams = {
  doorNo: props.dataInfo.doorNo
}

const formData = ref<any>({})

// 生产安置方式数据选项
const productModeData = ref<any>([])

// 搬迁安置方式 —— 宅基地安置数据选项
const homesteadData = ref<any>([])

// 搬迁安置方式 —— 公寓房安置数据选项
const apartmentData = ref<any>([])

const configLength = ref<number>(0)

// 当搬迁安置方式后台未配置时，显示默认的数据
let defaultData = [
  { name: '市内县外', value: '市内县外', type: '搬迁安置' },
  { name: '县内安置（有土）', value: '县内安置（有土）', type: '搬迁安置' },
  { name: '县内安置（无土）', value: '县内安置（无土）', type: '搬迁安置' },
  { name: '自谋出路', value: '自谋出路', type: '搬迁安置' }
]

// 获得焦点的输入框下标
const focusIndex = ref<number>(-1)

const emit = defineEmits(['submit'])

// 展示修改记录
const showModifyRecord = () => {
  showRecord.value = true
}

// 关闭修改记录弹窗
const closeModifyRecords = () => {
  showRecord.value = false
}

// 输入框获得焦点事件
const inputFocus = (index: number) => {
  focusIndex.value = index
}

// 输入框失去焦点事件
const inputBlur = () => {
  focusIndex.value = -1
}

// 获取生产安置、搬迁安置方式数据
const getWillList = async () => {
  const result = await getWillListApi()
  configLength.value = result.length
  if (result && result.length) {
    genArr(result)
  }
}

// 组合生产安置、搬迁安置方式配置信息
const genArr = (arr: any[]) => {
  arr.forEach((item: any) => {
    if (item.type === '生产安置') {
      productModeData.value.push({
        productionType: item.way,
        value: item.way,
        number: '',
        ...item,
        ...commonParams
      })
    } else if (item.type === '搬迁安置') {
      if (item.way === '') {
        homesteadData.value.push({
          name: item.area,
          value: item.area,
          ...item,
          ...commonParams
        })
      } else if (item.way === '') {
        apartmentData.value.push({
          name: item.area,
          value: item.area,
          ...item,
          ...commonParams
        })
      }
    }
  })
}

// 页面数据初始化
const initData = () => {
  if (props.willData && props.willData.uid) {
    console.log(props.dataInfo.demographicList,'人口信息1')
    // 已经有配置了
    formData.value = {
      ...props.willData,
      familyNum: props.dataInfo.demographicList.length,
      countryNum: props.dataInfo.demographicList.filter((item:any)=> item.censusType == '1').length,
      unCountryNum:props.dataInfo.demographicList.filter((item:any) => item.censusType != '1').length
    }
    // 生产安置方式 有配置数据时 重新赋值
    productModeData.value = props.willData.immigrantWillProductionList
  } else {
     console.log(props.dataInfo.demographicList,'人口信息2')
    // 没有任何配置
    formData.value = {
      familyNum: props.dataInfo.demographicList.length, // 家庭总人数
      countryNum: props.dataInfo.demographicList.filter((item:any)=> item.censusType == '1').length, //农村移民
      unCountryNum:props.dataInfo.demographicList.filter((item:any) => item.censusType != '1').length,  //非农村移民
      immigrantWillProductionList: [], // 生产安置
      removalType: '', // 搬迁安置方式
      opinion: '' // 备注
    }
  }
}

// 搬迁安置方式选择
const homesteadChange = (e: any) => {
  formData.value.removalType = e.detail.value
}

// 表单提交
const submit = () => {
  const params = {
    ...formData.value,
    immigrantWillProductionList: [...productModeData.value]
  }
  if (+params.familyNum !== +params.countryNum + +params.unCountryNum) {
    return showToast('家庭人数数据有误')
  }
  if (!params.removalType) {
    showToast('请选择搬迁安置方式')
    return
  }
  emit('submit', params)
}

onShow(async () => {
  await getWillList()
  initData()
})
</script>

<style lang="scss" scoped>
.willingness-info-wrapper {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;

  .sub-title {
    width: 100%;
    height: 28rpx;
    padding-left: 9rpx;
    font-size: 9rpx;
    line-height: 28rpx;
    color: #171718;
    background: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    &:first-child {
      border-top: none;
    }
  }

  .row-1 {
    display: flex;
    width: 100%;
    height: 46rpx;
    justify-content: space-around;

    .col {
      display: flex;
      align-items: center;

      .label {
        font-size: 9rpx;
        color: #171718;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 64rpx;
        height: 23rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txt {
          width: 40rpx;
          height: 23rpx;
          padding-left: 9rpx;
          font-size: 9rpx;
          line-height: 23rpx;
          color: #171718;

          &.w-200 {
            width: 200rpx;
          }
        }

        .unit {
          width: 23rpx;
          height: 22rpx;
          font-size: 9rpx;
          line-height: 22rpx;
          color: #171718;
          text-align: center;
          background-color: #f5f7fa;
          border-left: 1px solid #d9d9d9;
          border-top-right-radius: 3rpx;
          border-bottom-right-radius: 3rpx;
        }
      }
    }
  }

  .row-2 {
    padding-left: 18rpx;

    ::v-deep.uni-label-pointer {
      margin-right: 24rpx;

      .uni-radio-wrapper {
        font-size: 9rpx !important;
        color: #171718;

        .uni-radio-input {
          width: 8rpx !important;
          height: 8rpx !important;
        }
      }
    }
  }

  .row-3 {
    display: flex;
    align-items: center;
    padding: 0 18rpx;
    box-sizing: border-box;

    .label {
      font-size: 9rpx;
      color: #171718;
    }

    ::v-deep.uni-label-pointer {
      margin-right: 19rpx;

      &:last-child {
        margin-right: 0;
      }

      .uni-radio-wrapper {
        font-size: 9rpx !important;
        color: #171718;

        .uni-radio-input {
          width: 8rpx !important;
          height: 8rpx !important;
        }
      }
    }
  }

  .row-4 {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    .col {
      display: flex;
      align-items: center;
      margin: 5rpx 0 5rpx 10rpx;

      .label {
        width: 50rpx;
        font-size: 9rpx;
        color: #171718;
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        width: 150rpx;
        height: 23rpx;
        border: 1px solid #d9d9d9;
        border-radius: 4px;

        &.focus {
          border-color: rgb(41, 121, 255);
        }

        .input-txt {
          width: 40rpx;
          height: 23rpx;
          padding-left: 9rpx;
          font-size: 9rpx;
          line-height: 23rpx;
          color: #171718;

          &.w-200 {
            width: 200rpx;
          }
        }

        .unit {
          width: 23rpx;
          height: 22rpx;
          font-size: 9rpx;
          line-height: 22rpx;
          color: #171718;
          text-align: center;
          background-color: #f5f7fa;
          border-left: 1px solid #d9d9d9;
          border-top-right-radius: 3rpx;
          border-bottom-right-radius: 3rpx;
        }
      }
    }
  }

  .line {
    width: calc(100% - 36rpx);
    height: 1px;
    margin: 0 auto;
    border: 1px dotted #e1e4ea;
  }

  .col-4 {
    padding: 5rpx 18rpx;
    box-sizing: border-box;

    .remark {
      width: 100%;
      font-size: 9rpx;
      color: #171718;
    }
  }

  .btn {
    position: fixed;
    right: 25rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;

    &.submit {
      bottom: 16rpx;
    }

    &.record {
      bottom: 54rpx;
    }
  }
}
</style>
