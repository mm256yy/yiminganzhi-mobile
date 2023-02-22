<template>
  <view class="tree-list-item" v-for="item in props.data" :key="item.id">
    <SubTree
      v-if="item.children && item.children.length"
      :data="item"
      :expendIds="expendIds"
      @sub-item-click="expendChange"
    >
      <Tree :data="item.children" @tree-item-click="treeItemClick" />
    </SubTree>
    <TreeItem v-else :data="item" @tree-item-click="treeItemClick" />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SubTree from './SubTree.vue'
import TreeItem from './TreeItem.vue'

interface PropsType {
  data: any
}

const props = defineProps<PropsType>()
const emit = defineEmits(['treeItemClick'])

const defaultExpendIds = ref([])

// todo 根据默认需要展开的key 拿到真实展开的key

const expendIds = ref<string[] | number[]>(defaultExpendIds.value)

const expendChange = (data: any) => {
  if (expendIds.value.includes(data.id as never)) {
    // @ts-ignore
    expendIds.value = expendIds.value.filter((value: any) => value !== data.id)
  } else {
    expendIds.value.push(data.id as never)
  }
  emit('treeItemClick', data)
}

const treeItemClick = (data: any) => {
  console.log(data, 'data')
  emit('treeItemClick', data)
}
</script>

<style lang="scss" scoped>
.tree-list-item {
  border-radius: 5rpx;
  box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);
}
</style>
