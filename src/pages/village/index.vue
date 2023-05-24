<template>
  <Container title="自然村清单">
    <view class="village-box">
      <view class="search-box">
        <uni-icons class="icon" type="search" color="#272636" size="9rpx" />
        <input
          type="text"
          class="ipt"
          placeholder="搜索名称"
          :value="keyWords"
          @confirm="iptChange"
        />
        <uni-icons v-if="keyWords" @click="clear" type="clear" color="#999999" size="14rpx" />
      </view>
      <view class="village-list">
        <scroll-view
          v-if="list && list.length"
          class="scroll-view"
          scroll-y
          :enable-flex="true"
          :refresher-triggered="true"
          @scrolltolower="loadMore"
        >
          <!-- @scrolltoupper="init" -->
          <view class="scroll">
            <VillageItem
              v-for="item in list"
              :key="item.id"
              :data="item"
              @click.stop="editVillage(item)"
              @delete="deleteVillage(item)"
            />
            <view class="load-more">
              <uni-load-more iconType="auto" :status="status" />
            </view>
          </view>
        </scroll-view>
        <NoData v-else />
      </view>
    </view>

    <view class="add-box" @click="addVillage">
      <uni-icons type="plusempty" color="#ffffff" size="10rpx" />
    </view>

    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        content=""
        @confirm="dialogConfirm"
        @close="dialogClose"
      />
    </uni-popup>
  </Container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import VillageItem from './villageItem.vue'
import Container from '@/components/Container/index.vue'
import NoData from '@/components/NoData/index.vue'
import { VillageType } from '@/types/common'
import { getVillageListWithPageApi, deleteVillageApi } from '@/service'
import { routerForward } from '@/utils'

const list = ref<VillageType[]>([])
const keyWords = ref<string>('')
const page = ref<number>(1)
const pageSize = ref<number>(10)
const isLoading = ref<boolean>(false)
const isEnd = ref<boolean>(false)
const currentItem = ref<VillageType | null>(null)
const alertDialog = ref<any>(null)

const status = computed(() => {
  // more/loading/noMore
  return isEnd.value ? 'noMore' : isLoading.value ? 'loading' : 'more'
})

const getList = async () => {
  const res = await getVillageListWithPageApi({
    page: page.value,
    pageSize: pageSize.value,
    name: keyWords.value
  }).catch(() => {
    isLoading.value = false
  })

  isLoading.value = false
  console.log(res, '自然村清单')
  if (res && res.length) {
    if (page.value === 1) {
      list.value = res || []
    } else {
      list.value = list.value.concat(res)
    }
    if (res.length < pageSize.value) {
      isEnd.value = true
    } else {
      page.value = page.value + 1
    }
  } else {
    if (page.value === 1) {
      list.value = []
    }
    isEnd.value = true
  }
}

const init = () => {
  page.value = 1
  isEnd.value = false
  isLoading.value = false
  getList()
}

const clear = () => {
  keyWords.value = ''
  init()
}

const iptChange = (e: any) => {
  keyWords.value = e.detail.value
  init()
}
const loadMore = () => {
  if (isEnd.value || isLoading.value) {
    return
  }
  console.log('load more')
  getList()
}

const addVillage = () => {
  routerForward('villageEdit', {
    type: 'add'
  })
}

const editVillage = (item: VillageType) => {
  routerForward('villageEdit', {
    type: 'edit',
    uid: item.uid
  })
}

const deleteVillage = (item: VillageType) => {
  currentItem.value = item
  alertDialog.value?.open()
}

const dialogConfirm = () => {
  if (currentItem.value?.uid) {
    deleteVillageApi(currentItem.value.uid).then((res) => {
      if (res) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        init()
      }
    })
  }
}

const dialogClose = () => {
  alertDialog.value.close()
}

onShow(() => {
  init()
})
</script>

<style lang="scss" scoped>
.icon-box {
  display: flex;
  align-items: center;
}

.home-icon {
  width: 23rpx;
  height: 23rpx;
  margin-top: 4rpx;
}

.village-box {
  height: 100%;
  padding: 0 25rpx 10rpx;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 23rpx;
  padding: 0 18rpx;
  background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
  border-radius: 16rpx;

  .icon {
    flex: none;
  }

  .ipt {
    height: 14rpx;
    margin-left: 7rpx;
    font-size: 9rpx;
    color: #171718;
    flex: 1;
  }
}

.village-list {
  width: 100%;
  height: 100%;
  padding-top: 7rpx;
}

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 23rpx - 10rpx);
}

.scroll {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.load-more {
  flex: none;
  width: 100%;
}

.add-box {
  position: absolute;
  right: 25rpx;
  bottom: 25rpx;
  display: flex;
  width: 33rpx;
  height: 33rpx;
  background-color: #3e73ec;
  border-radius: 16rpx;
  box-shadow: 0rpx 5rpx 16rpx 5rpx rgba(0, 0, 0, 0.05), 0rpx 4rpx 9rpx 0rpx rgba(0, 0, 0, 0.08),
    0rpx 2rpx 4rpx -2rpx rgba(0, 0, 0, 0.12);
  align-items: center;
  justify-content: center;
}
</style>
