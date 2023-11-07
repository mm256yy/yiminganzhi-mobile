<template>
  <text v-if="isObject" class="json-preview">
    <text v-if="!!parentKey"
      ><text class="json-preview-key">"{{ parentKey }}"</text> :
    </text>
    <text class="symbol" @click="checks(parentKey)">{</text>
    <view class="json-preview-object-block" v-if="check.indexOf(parentKey) > -1">
      <view v-for="(item, index) in jsonValue" :key="index">
        <text v-if="typeof item.value === 'string'">
          <text class="json-preview-key" @click="checks(index)">"{{ item.key }}"</text> :
          <text class="json-preview-string-value" v-if="check.indexOf(index) > -1"
            >"{{ item.value }}"</text
          >
        </text>
        <text v-if="typeof item.value === 'number'">
          <text class="json-preview-key" @click="checks(index)">"{{ item.key }}"</text> :
          <text class="json-preview-number-value" v-if="check.indexOf(index) > -1">{{
            item.value
          }}</text
          ><text v-if="index != jsonValue.length - 1" />
        </text>
        <text v-if="typeof item.value === 'boolean'">
          <text class="json-preview-key" @click="checks(index)">"{{ item.key }}"</text> :
          <text class="json-preview-bol-value" v-if="check.indexOf(index) > -1">{{
            item.value
          }}</text>
        </text>
        <text v-if="typeof item.value === 'object'">
          <json-preview :parent-key="item.key" :model-value="item.value" />
        </text>
        <text v-if="index != jsonValue.length - 1">,</text>
      </view>
    </view>
    <text class="symbol">}</text>
  </text>
  <text v-else>
    <text v-if="!!parentKey"
      ><text class="json-preview-key">"{{ parentKey }}"</text> :
    </text>
    <text class="symbol" @click="checks(parentKey)">[</text>
    <view class="json-preview-object-block" v-if="check.indexOf(parentKey) > -1">
      <view v-for="(item, index) in jsonValue" :key="index">
        <text v-if="typeof item === 'string'">
          <text class="json-preview-string-value">"{{ item }}"</text>
        </text>
        <text v-if="typeof item === 'number'">
          <text class="json-preview-number-value">{{ item }}</text>
        </text>
        <text v-if="typeof item === 'boolean'">
          <text class="json-preview-bol-value">{{ item }}</text>
        </text>
        <text v-if="typeof item === 'object'">
          <json-preview :model-value="item" />
        </text>
        <text class="symbol" v-if="index != jsonValue.length - 1">,</text>
      </view>
    </view>
    <text class="symbol">]</text>
  </text>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref } from 'vue'

export default defineComponent({
  name: 'JsonPreview',
  props: {
    modelValue: {
      type: [String, Array, Object],
      default: ''
    },
    parentKey: {
      type: String,
      default: ''
    },
    paddingLeft: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const jsonValue: any = computed(() => {
      if (!!!props.modelValue) {
        return {}
      }
      if (typeof props.modelValue === 'string') {
        let value = JSON.parse(props.modelValue)
        let jsonValue = []
        for (let key in value) {
          jsonValue.push({
            key: key,
            value: value[key]
          })
        }
        return jsonValue
      }
      if (typeof props.modelValue === 'object' && !(props.modelValue instanceof Array)) {
        let jsonValue = []
        for (let key in props.modelValue) {
          jsonValue.push({
            key: key,
            value: props.modelValue[key]
          })
        }
        return jsonValue
      }
      return props.modelValue
    })
    const state = reactive({
      jsonValue,
      isObject: computed(() => {
        return !(props.modelValue instanceof Array)
      })
    })
    let check: any = ref([])
    let checks = (e: any) => {
      if (check.value.indexOf(e) > -1) {
        check.value.splice(check.value.indexOf(e), 1)
      } else {
        check.value.push(e)
      }
    }
    return {
      ...toRefs(state),
      check,
      checks
    }
  }
})
</script>

<style lang="scss">
.json-preview {
  font-size: 20rpx;
  font-weight: 400;
}

.json-preview-object-block {
  padding-left: 30rpx;
  margin: 5rpx 0 5rpx 2rpx;
  border-left: dotted 1rpx;
}

.json-preview-key {
  font-size: 12rpx;
  color: purple;
}

.json-preview-number-value {
  font-size: 12rpx;
  color: #29b8db;
}

.json-preview-string-value {
  font-size: 12rpx;
  color: #0dbc79;
}

.json-preview-bol-value {
  font-size: 12rpx;
  color: #c678dd;
}

.symbol {
  font-size: 12rpx;
  color: #2c3e50;
}
</style>
