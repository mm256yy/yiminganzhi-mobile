<template>
  <view class="tree-wrap">
    <view class="search-box">
      <view class="search-wrap">
        <image class="icon" src="@/static/images/icon_search.png" mode="scaleToFill" />
        <input
          class="txt"
          placeholder="搜索"
          confirm-type="search"
          @confirm="iptConfirm"
          :value="keyWords"
        />
        <uni-icons v-if="keyWords" @click="clear" type="clear" color="#999999" size="14rpx" />
      </view>
      <label class="add-wrap" @click="addClick">
        <image class="add-icon" :src="iconSrc" mode="scaleToFill" />
      </label>
    </view>

    <view class="tree-box">
      <view class="tree-list">
        <TreeItem
          v-for="item in treeList"
          :key="item.id"
          :data="item"
          :uid="props.uid"
          :expendCodes="props.expendCodes || []"
          @tree-item-click="treeItemClick"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import TreeItem from './TreeItem.vue'

interface PropsType {
  treeData: any[]
  uid?: string
  expendCodes?: string[] // 展开的行
  iconSrc: string
}

const props = defineProps<PropsType>()
const emit = defineEmits(['treeItemClick', 'addClick'])
const keyWords = ref<string>('')

const treeList = ref<any>([])

watch(
  () => props.treeData,
  (val) => {
    treeList.value = JSON.parse(JSON.stringify(val))
  },
  {
    immediate: true,
    deep: true
  }
)

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

    let subs = filterData(node.children, query)
    if (predicate(node)) {
      newChildren.push(node)
    } else if (subs && subs.length) {
      node.children = subs
      newChildren.push(node)
    }

    // 以下只需要考虑自身的节点满足条件即可,不用带上父节点
    // if (predicate(node)) {
    //   newChildren.push(node)
    //   node.children = filterData(node.children, query)
    // } else {
    //   newChildren.push(...filterData(node.children, query))
    // }
  }
  return newChildren.length ? newChildren : []
}

const iptConfirm = (e: any) => {
  const val = e.detail.value
  keyWords.value = val
  if (val) {
    const newList = filterData(treeList.value, val)
    treeList.value = newList
  } else {
    treeList.value = JSON.parse(JSON.stringify(props.treeData))
  }
}

const clear = () => {
  keyWords.value = ''
  treeList.value = JSON.parse(JSON.stringify(props.treeData))
}

const treeItemClick = (data: any) => {
  emit('treeItemClick', data)
}

const addClick = () => {
  emit('addClick')
}
</script>

<style lang="scss" scoped>
.tree-wrap {
  display: flex;
  flex-direction: column;
  width: 200rpx;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5rpx;

  .search-box {
    flex: none;
    display: flex;
    width: 100%;
    height: 33rpx;
    padding: 6rpx;
    border-radius: 7rpx 7rpx 0 0;
    box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);
    box-sizing: border-box;
    align-items: center;

    .search-wrap {
      display: flex;
      width: 158rpx;
      height: 23rpx;
      padding: 0 7rpx;
      background: #f6f7f9;
      border: 1px solid #e8e8e8;
      border-radius: 12rpx;
      box-sizing: border-box;
      align-items: center;

      .icon {
        width: 9rpx;
        height: 9rpx;
        margin-right: 7rpx;
      }

      .txt {
        flex: 1;
        margin-right: 4rpx;
        font-size: 9rpx;
        color: #171718;
      }
    }

    .add-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42rpx;
      height: 23rpx;

      .add-icon {
        width: 14rpx;
        height: 14rpx;
      }
    }
  }

  .tree-box {
    width: 100%;
    padding: 6rpx;
    overflow-y: scroll;
    border-radius: 5rpx;
    box-sizing: border-box;
    flex: 1;
  }
}
</style>
