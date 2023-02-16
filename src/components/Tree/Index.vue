<template>
  <view class="tree-wrap">
    <view class="search-box">
      <view class="ipt-wrap">
        <input
          class="ipt"
          @confirm="iptConfirm"
          type="text"
          placeholder="请输入行政村、自然村、姓名"
        />
        <uni-icons type="search" color="#171718" size="9rpx" />
      </view>
    </view>

    <view class="tree-list">
      <Tree :data="treeList" @tree-item-click="treeItemClick" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Tree from './Tree.vue'

interface PropsType {
  treeData: any[]
}

const props = defineProps<PropsType>()
const emit = defineEmits(['treeItemClick'])

const treeList = ref<any>([])

onMounted(() => {
  if (props.treeData && props.treeData.length) {
    treeList.value = JSON.parse(JSON.stringify(props.treeData))
  }
})

const filterData = (nodes: any[], query: string): any[] => {
  // 条件就是节点的title过滤关键字
  let predicate = function (node: any) {
    if (node.name.indexOf(query) > -1) {
      return true
    } else {
      return false
    }
  }
  if (!(nodes && nodes.length)) {
    return []
  }

  let newChildren = []
  for (let node of nodes) {
    // 以下两个条件任何一个成立，当前节点都应该加入到新子节点集中
    // 1. 子孙节点中存在符合条件的，即 subs 数组中有值
    // 2. 自己本身符合条件

    // let subs = filterData(node.children, query)
    // if (predicate(node)) {
    //   newChildren.push(node)
    // } else if (subs && subs.length) {
    //   node.children = subs
    //   newChildren.push(node)
    // }

    // 以下只需要考虑自身的节点满足条件即可,不用带上父节点
    if (predicate(node)) {
      newChildren.push(node)
      node.children = filterData(node.children, query)
    } else {
      newChildren.push(...filterData(node.children, query))
    }
  }
  return newChildren.length ? newChildren : []
}

const iptConfirm = (e: any) => {
  const val = e.detail.value
  if (val) {
    const newList = filterData(treeList.value, val)
    treeList.value = newList
  } else {
    treeList.value = props.treeData
  }
}

const treeItemClick = (data: any) => {
  emit('treeItemClick', data)
}
</script>

<style lang="scss" scoped>
.tree-wrap {
  width: 200rpx;
  background-color: #ffffff;
  border-radius: 2rpx;
  box-shadow: 0rpx 0rpx 12rpx 0rpx rgba(0, 0, 0, 0.08);
}

.tree-list {
  border-top: 1rpx solid #e1e4ea;
}

.search-box {
  width: 200rpx;
  height: 33rpx;
  padding: 6rpx;
  border-radius: 2rpx;
}

.ipt-wrap {
  display: flex;
  width: 176rpx;
  height: 21rpx;
  padding: 0 5rpx;
  background-color: #ffffff;
  border: 1rpx solid #dcdfe6;
  border-radius: 2rpx;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.ipt {
  flex: 1;
  margin-right: 4rpx;
  font-size: 9rpx;
  color: #171718;
}
</style>
