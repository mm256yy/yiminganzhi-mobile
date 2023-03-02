<template>
  <view class="select-box" @click.stop="open">
    <text class="txt black" v-if="villageTitle && villageTitle.length">
      {{ villageTitle.join('/') }}
    </text>
    <text class="txt" v-else>请选择</text>
    <uni-icons type="bottom" color="#BFBFBF" size="14rpx" />

    <VillageTreeSelect
      v-if="showVillageSelect"
      :tree-data="treeData"
      :value="codes"
      :title="villageTitle"
      @on-close="close"
      @on-confirm="villageConfirm"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import VillageTreeSelect from '@/components/VillageTreeSelect/index.vue'
import { getOtherItemApi } from '@/service'
import { OtherDataType } from '@/database'

interface PropsType {
  modelValue: string
}

const props = defineProps<PropsType>()
const emit = defineEmits(['update:modelValue'])

const treeData = ref<any>([])
const villageTitle = ref<string[]>([])
const showVillageSelect = ref<boolean>(false)
const codes = ref<string[]>([])

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const town = val.slice(0, 9)
      const area = val.slice(0, 6)
      codes.value = [area, town, val]
      getTitle()
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
    villageTitle.value = [areaName, townName, villageName]
  }
}

const getTreeData = async () => {
  const res = await getOtherItemApi(OtherDataType.DistrictTree)
  treeData.value = res || []
  getTitle()
}

const villageConfirm = (code: string[], tit: string[]) => {
  codes.value = code
  villageTitle.value = tit
  console.log(code, tit, '---')
  close()
  emit('update:modelValue', code.length ? code[code.length - 1] : '')
}

const open = () => {
  showVillageSelect.value = true
  console.log('open', showVillageSelect.value)
}

const close = () => {
  nextTick(() => {
    showVillageSelect.value = false
    console.log('close', showVillageSelect.value)
  })
}

onMounted(() => {
  getTreeData()
})
</script>
<style lang="scss" scoped></style>
