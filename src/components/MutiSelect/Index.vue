<template>
  <view class="muti-select-wrapper">
    <view class="input-wrapper" @click.stop="showModal">
      <input
        v-show="!modelLabel"
        class="input-txt"
        v-model="modelValue"
        :placeholder="placeholder"
        disabled
      />
      <view v-show="modelLabel" class="input-txt w-175">{{ modelLabel }}</view>
      <uni-icons :type="showSelector ? 'top' : 'bottom'" size="14" color="#999" />
    </view>
    <view class="select-modal" v-if="showSelector">
      <view class="list-wrapper">
        <view
          class="list-item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="select(index)"
        >
          <view class="label">{{ getLabelKeyValue(item) }}</view>
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
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  list: {
    type: Array as any,
    default: () => []
  },
  value: {
    type: String,
    default: ''
  },
  // 指定 list 中 labelKey 的值作为下拉框显示内容
  labelKey: {
    type: String,
    default: 'label'
  },
  // 指定 list 中 valueKey 的值作为下拉框绑定内容
  valueKey: {
    type: String,
    default: 'value'
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
})

const dataList = ref<any>([])
const showSelector = ref<boolean>(false)
const modelValue = ref<string>('')
const modelLabel = ref<string>('')

const emit = defineEmits(['update:modelValue'])

// 获取label
const getLabelKeyValue = (item: any) => {
  return item[props.labelKey]
}

// 获取value
const getValueKeyValue = (item: any) => {
  return item[props.valueKey]
}

// 选择
const select = (index: number) => {
  dataList.value[index].checked = !dataList.value[index].checked
  getSelectedData()
}

// 获取选择的值
const getSelectedData = () => { 
  let labelArr: any = []
  let valueArr: any = []
  let selectedData = dataList.value.filter((item: any) => item.checked)
  selectedData &&
    selectedData.map((item: any) => {
      labelArr.push(getLabelKeyValue(item))
      valueArr.push(getValueKeyValue(item))
    })
  modelLabel.value = labelArr.toString()
  modelValue.value = valueArr.toString()
  emit('update:modelValue', modelValue.value)
}

// 显示选择框
const showModal = () => {
  showSelector.value = !showSelector.value
}

const showType=()=>{
  showSelector.value=false
}
defineExpose({
  showType
	})
watch(
  () => props.list,
  (val: any) => {
    if (val && val.length > 0) {
      console.log(props.list,'测试下拉数据')
      val.map((item: any, index: number) => {
        dataList.value.push({
          ...item,
          checked: false
        })
        console.log( dataList.value,'push数据')
        if (props.value) {
          let arr = props.value.split(',')
          arr.map((val: any) => {
            if (getValueKeyValue(item) === val) {
              dataList.value[index].checked = true
            }
          })
        }
      })
      getSelectedData()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
.muti-select-wrapper {
  position: relative;
  width: 200rpx;

  .input-wrapper {
    display: flex;
    align-items: center;
    width: 200rpx;
    height: 21rpx;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    .input-txt {
      width: 168rpx;
      height: 21rpx;
      padding-left: 7rpx;
      font-size: 9rpx;
      line-height: 21rpx;
      color: #171718;

      &.w-175 {
        width: 175rpx;
      }
    }
  }

  .select-modal {
    position: absolute;
    top: 25rpx;
    left: 0;
    z-index: 2;
    width: 200rpx;
    max-height: 100rpx;
    padding: 7rpx;
    overflow-y: scroll;
    background: #fff;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;

    .list-wrapper {
      .list-item {
        display: flex;
        align-items: center;
        height: 20rpx;
        line-height: 20rpx;

        .label {
          margin-right: 10rpx;
          font-size: 9rpx;
          color: #171718;
        }

        .icon {
          width: 9rpx;
          height: 9rpx;
        }
      }
    }
  }
}
</style>
