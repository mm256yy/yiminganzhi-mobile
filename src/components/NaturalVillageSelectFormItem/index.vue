<template>
  <view class="select-box" @click.stop="open">
    <text class="txt black" v-if="villageTitle && villageTitle.length">
      {{ villageTitle.join('/') }}
    </text>
    <text class="txt" v-else>请选择</text>
    <uni-icons type="bottom" color="#BFBFBF" size="14rpx" />

    <NaturalVillageTreeSelect
      v-if="showVillageSelect"
      :tree-data="treeData"
      :value="codes"
      :title="villageTitle"
      :type="type"
      @on-close="close"
      @on-confirm="villageConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import NaturalVillageTreeSelect from '@/components/NaturalVillageTreeSelect/index.vue'
import {
  getVirutalVillageTreeApi,
  getVillageTreeWithoutNullApi,
  getVillageTreeApi
} from '@/service'

interface PropsType {
  areaCode: string
  townCode: string
  villageCode: string
  virutalVillageCode: string
  type?: string
}

// areaCode
// townCode
// villageCode
// virutalVillageCode

const props = defineProps<PropsType>()
const emit = defineEmits([
  'update:areaCode',
  'update:townCode',
  'update:villageCode',
  'update:virutalVillageCode',
  'open',
  'confirm'
])

const treeData = ref<any>([])
const villageTitle = ref<string[]>([])
const showVillageSelect = ref<boolean>(false)
const codes = ref<string[]>([])

watch(
  [
    () => props.areaCode,
    () => props.townCode,
    () => props.villageCode,
    () => props.virutalVillageCode
  ],
  ([val1, val2, val3, val4]) => {
    if (val1 && val2 && val3 && val4) {
      codes.value = [val1, val2, val3, val4]
      nextTick(() => {
        getTitle && getTitle()
      })
    }
  },
  {
    immediate: true
  }
)

const getTitle = () => {
  if (treeData.value && treeData.value.length && codes.value && codes.value.length) {
    const areaItem = treeData.value.find((item: any) => item.code === codes.value[0])
    const areaName = areaItem.name
    const townItem = areaItem.children.find((item: any) => item.code === codes.value[1])
    const townName = townItem.name
    const villageItem = townItem.children.find((item: any) => item.code === codes.value[2])
    const villageName = villageItem.name
    const naturalVillageItem = villageItem.children.find(
      (item: any) => item.code === codes.value[3]
    )
    const naturalVillageName = naturalVillageItem.name
    villageTitle.value = [areaName, townName, villageName, naturalVillageName]
  }
}

const getTreeData = async () => {
  let res: any = null
  if (props.type === 'land') {
    res = await getVillageTreeApi()
  } else {
    res = await getVirutalVillageTreeApi()
  }
  treeData.value = res || []
  console.log('resTree:', res)
  getTitle()
}

const villageConfirm = (code: string[], tit: string[], otherCode: string) => {
  codes.value = code
  villageTitle.value = tit
  close()
  emit('update:areaCode', code[0] || '')
  emit('update:townCode', code[1] || '')
  emit('update:villageCode', code[2] || '')
  emit('update:virutalVillageCode', code[3] || '')
  emit('confirm', otherCode || '')
}

const open = () => {
  showVillageSelect.value = true
  emit('open')
}

const close = () => {
  nextTick(() => {
    showVillageSelect.value = false
  })
}

defineExpose({
  getTreeData
})

onMounted(() => {
  getTreeData()
})
</script>
<style lang="scss" scoped>
.select-box {
  display: flex;
  width: 200rpx;
  height: 23rpx;
  padding: 0 4rpx;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;

  .txt {
    font-size: 9rpx;
    color: #d9d9d9;

    &.black {
      color: #171718;
    }
  }
}
</style>
