<template>
  <view>
    <view class="search-segment">
      <view class="search">
        <view class="search-input">
          <input
            type="text"
            placeholder="请输入使用权人、地块编号"
            v-model.trim="searchName"
          />
        </view>
        <view class="search-btn" @click="onSearch">
          <image
            class="search-icon"
            src="@/static/images/icon_search_white.png"
            mode="aspectFit"
          />
          <text class="search-txt">查询</text>
        </view>
      </view>
      <view class="search-btn-radius" @click="onSearchMore">
        <text class="search-txt">更多条件</text>
      </view>
    </view>
    <!-- 具体内容 -->
    <view class="main-enter">
      <view class="operate-segment">
        <text class="land-text">{{
          `土地列表（共 ${list?.length || 0} 条土地数据）`
        }}</text>
        <view class="right-side">
          <view class="btn blue-btn" @click="associatedBind">
            <text class="txt">关联绑定</text>
          </view>
          <view class="btn blue-btn" @click="syncData">
            <text class="txt">数据同步</text>
          </view>
        </view>
      </view>
      <view class="main-list">
        <scroll-view
          v-if="list && list.length"
          class="scroll-view"
          scroll-y
          :enable-flex="true"
          @scrolltolower="loadMore"
        >
          <view class="scroll">
            <LandListItem
              v-for="(item, index) in list"
              :data="item"
              :key="index"
              :index="index"
              @itemChecked="handleItemClick"
            />
          </view>
          <view class="load-more">
            <uni-load-more iconType="auto" :status="status" />
          </view>
        </scroll-view>
        <NoData v-else />
      </view>
    </view>
    <!-- 关联绑定确认弹框 -->
    <uni-popup ref="associationBindingRef" type="dialog" :is-mask-click="false">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="继续关联"
        :title="bindStrTitle"
        style="padding: 10rpx 10rpx 0 10rpx"
        @confirm="dialogConfirm"
        @close="associationDialogClose"
      />
    </uni-popup>
    <!-- 同步数据确认弹窗-->
    <uni-popup ref="confirmDialogRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        :title="lastConfirmTime"
        content="是否确认同步数据？"
        @confirm="confirmSync"
        @close="closeConfirmDialog"
      />
    </uni-popup>

    <SyncCompont ref="syncCmt" from="sync" />
  </view>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  computed,
  onBeforeMount,
  onBeforeUnmount,
} from "vue";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { getStorage, StorageKey, routerForward, debounce } from "@/utils";
import { getOtherItemApi, getLandEstimateDtoListApi } from "@/service";
import NoData from "@/components/NoData/index.vue";
import LandListItem from "@/pages/land/components/landListItem/index.vue";
import SyncCompont from "@/components/Sync/Index.vue";
import dayjs from "dayjs";
import { OtherDataType } from "@/database";
import { showToast, SUCCESS_MSG } from "@/config/msg";

const confirmDialogRef = ref<any>(null);
const pullTime = ref<string>("");
const syncing = ref<boolean>(false);
const syncCmt = ref();
const lastConfirmTime = ref("");
const bindStrTitle = ref<string>("");
const list = ref<any[]>([]);
const searchName = ref<string>("");
const isLoading = ref<boolean>(false); //是否正在加载
const isEnd = ref<boolean>(false); // 是否加载到底
const page = ref<number>(1);
const pageSize = ref<number>(10);
const associationBindingRef = ref();
const checkList = ref<any[]>([]);
const searchParams = reactive({
  name: "",
}); // 查询参数

const onSearch = () => {
  if (searchName.value) {
    searchParams.name = searchName.value;
    getList();
  }
};

const toTarget = (name: any) => {
  const params = {};

  routerForward(name, {
    ...params,
  });
};

const getList = () => {
  nextTick(async () => {
    isLoading.value = true;
    const params: any = {
      page: page.value,
      pageSize: pageSize.value,
      ...searchParams,
    };

    const tempList: any[] = await getLandEstimateDtoListApi(params);
    let res = tempList.map((item) => {
      return {
        ...item,
        isChecked: false,
      };
    });

    isLoading.value = false;
     if (res && res.length) {
      if (page.value === 1) {
         list.value = res || [];
       } else {
         list.value = list.value?.concat(res);
       }
       if (res.length < pageSize.value) {
         isEnd.value = true;
       } else {
         page.value = page.value + 1;
       }
     } else {
       if (page.value === 1) {
         list.value = [];
       }
       isEnd.value = true;
     }
  });
};

const init = () => {
  page.value = 1;
  isEnd.value = false;
  isLoading.value = false;
  getList();
};

const dialogConfirm = () => {
  const routeName = "associationBinding";
  routerForward(routeName, {
    params: JSON.stringify(checkList.value),
  });
  associationBindingRef.value?.close();
};

const associationDialogClose = () => {
  associationBindingRef.value?.close();
};

const closeConfirmDialog = () => {
  confirmDialogRef.value?.close();
};

// 处理数据同步
const onSyncHandle = debounce(() => {
  if (syncing.value) {
    return;
  }
  syncing.value = true;
  syncCmt.value?.onSync();
});

// 同步结束
const onSyncEnd = () => {
  syncing.value = false;
};

// 确认同步
const confirmSync = () => {
  closeConfirmDialog();
  onSyncHandle();
};

const getPullTime = async () => {
  const time: string = await getOtherItemApi(OtherDataType.PullTime);
  pullTime.value = time ? dayjs(Number(time)).format("YYYY-MM-DD HH:mm:ss") : "";
  lastConfirmTime.value = `上次：${pullTime.value}`;
};

const status = computed(() => {
  return isEnd.value ? "noMore" : isLoading.value ? "loading" : "more";
});

// 更多查询
const onSearchMore = () => {
  const routeName = "searchMore";
  toTarget(routeName);
};

// 关联绑定
const associatedBind = () => {
  const tickList = list.value.filter((item) => item.isChecked);
  if (tickList?.length <= 0) {
    showToast("请至少选择一项数据");
    return;
  }

  checkList.value = list.value.filter(
    (item) => item.relationFlag === "1" && item.isChecked
  );

  if (checkList.value?.length>0) {
    const landStr = checkList.value.map((item) => item.landNumber);
    bindStrTitle.value = `土地编号：${landStr}已关联，是否继续关联，如选择继续关联，则以最新一次关联为准`;
    associationBindingRef.value?.open();
  } else {
  const routeName = "associationBinding";
  routerForward(routeName, {
    params: JSON.stringify(tickList),
  });
  associationBindingRef.value?.close();
  }
};

// 数据同步
const syncData = () => {
  confirmDialogRef.value?.open();
};

const loadMore = () => {
  if (isEnd.value || isLoading.value) {
    return;
  }
  console.log("load more");
  getList();
};

const handleItemClick = (item: any) => {
  const { isChecked, index } = item;
  if (!list.value) {
    return;
  }
  list.value[index].isChecked = isChecked;
};

onShow(() => {
  // 注册事件监听器
  uni.$on("customRefresh", () => {
    getList();
  });
});

onLoad((option) => {
  if (option) {
    console.log("子组件OnLoad");
  }
});

onBeforeMount(() => {
  // 不同角色展示不同的首页视图
  const role = getStorage(StorageKey.USERROLE);
  console.log(role, "目前是什么角色");
  // homeViewType.value = role;
});

onBeforeUnmount(() => {
  uni.$off("SyncEnd", onSyncEnd);
});

onMounted(() => {
  init();
  getPullTime();
  uni.$on("SyncEnd", onSyncEnd);
});
</script>

<style lang="scss" scoped>
.search-btn-radius {
  display: flex;
  width: 60rpx;
  height: 28rpx;
  overflow: hidden;
  background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
  border-radius: 5rpx;
  justify-content: center;
  align-items: center;
  margin-left: 10rpx;

  .search-txt {
    margin-left: 5rpx;
    font-size: 9rpx;
    font-weight: 400;
    color: #f7f8fa;
  }
}

.search-segment {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  display: flex;
  width: 375rpx;
  height: 28rpx;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 5rpx;
  justify-content: center;

  .search-input {
    width: 315rpx;
    height: 28rpx;
    padding-left: 12rpx;
    line-height: 28rpx;
    text-align: left;
    border-radius: 5rpx 0 0 5rpx;

    input {
      height: 28rpx;
      font-size: 10rpx;
      line-height: 28rpx;
      color: rgba(19, 19, 19, 0.4);
    }
  }

  .search-btn {
    display: flex;
    width: 60rpx;
    height: 28rpx;
    overflow: hidden;
    background: linear-gradient(270deg, #ffb11a 0%, #ff9432 100%);
    border-radius: 0 5rpx 5rpx 0;
    justify-content: center;
    align-items: center;

    .search-icon {
      width: 14rpx;
      height: 14rpx;
    }

    .search-txt {
      margin-left: 5rpx;
      font-size: 9rpx;
      font-weight: 400;
      color: #f7f8fa;
    }
  }
}

.main-enter {
  display: flex;
  flex-direction: column;
  padding: 20rpx 20rpx 0 20rpx;

  .operate-segment {
    display: flex;
    align-items: center;
    margin-bottom: 5rpx;
    justify-content: space-between;

    .land-text {
      font-size: 10rpx;
      font-weight: 400;
      color: #fff;
    }

    .right-side {
      display: flex;
      align-items: center;
    }
  }

  .main-list {
    flex: 1;
    width: 100%;
    margin-top: 7rpx;
  }
}

.btn {
  display: flex;
  height: 23rpx;
  padding: 0 9rpx;
  margin-left: 6rpx;
  background: #3e73ec;
  border-radius: 23rpx;
  align-items: center;
  justify-content: center;

  &.green-btn {
    background-color: #30a952;
  }

  &.blue-btn {
    background: #3e73ec;
  }

  &.red {
    background-color: #e43030;
  }

  &.yellow {
    background-color: #fec44c;
  }
  .txt {
    font-size: 9rpx;
    line-height: 11rpx;
    color: #ffffff;
  }
}

.scroll-view {
  width: 100%;
  height: calc(100vh - var(--status-bar-height) - 33rpx - 18rpx - 6rpx - 10rpx - 42rpx);
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
</style>
