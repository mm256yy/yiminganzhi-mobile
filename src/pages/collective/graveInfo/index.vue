<template>
  <view class="grave-info-wrapper">
    <!-- 坟墓信息 -->
    <view class="list" v-if="dataList && dataList.length > 0">
      <view style="display: flex">
        <input class="input-txt" placeholder="请输入登记人" v-model="sercher" />
        <view class="btn-wrapper" @click="search"> <text class="txt">搜索</text></view>
        <view class="btn-wrapper" @click="searchs"> <text class="txt">重置</text></view>
      </view>
      <view class="list-item" v-for="item in sercherlist" :key="item.id">
        <view class="list-1">
          <view class="left">
            <view class="icon">登记人</view>
            <view class="name">{{ formatStr(item.registrantName) }}</view>
          </view>
          <label class="right" @click="deleteGraveInfo(item)">
            <image class="icon" src="@/static/images/icon_delete_mini.png" />
          </label>
        </view>
        <view class="list-2" @click="toLink('edit', item)">
          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">与登记人关系：</view>
                <view class="content">{{ formatDict(item.relation, 307) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">户号：</view>
                <view class="content">{{ formatStr(item.registrantShowDoorNo) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">穴位：</view>
                <view class="content">{{ formatDict(item.graveType, 345) }}</view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">数量：</view>
                <view class="content">{{ formatStr(item.number, '（座）') }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">材料：</view>
                <view class="content">{{ formatDict(item.materials, 295) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">立墓年份：</view>
                <view class="content">
                  {{ formatStr(item.graveYear) }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="8">
              <view class="col">
                <view class="label">所处位置：</view>
                <view class="content">{{ formatDict(item.gravePosition, 326) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">身份证号：</view>
                <view class="content">{{ formatStr(item.card) }}</view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">联系方式：</view>
                <view class="content">
                  {{ formatStr(item.phone) }}
                </view>
              </view>
            </uni-col>
            <uni-col :span="8">
              <view class="col">
                <view class="label">坟墓编号：</view>
                <view class="content">
                  <!-- {{ formatDict(item.gravePosition, 288) }} -->
                  <!-- 暂时改成326 有问题再改回288 -->
                  {{ item.graveAutoNo }}
                </view>
              </view>
            </uni-col>
          </uni-row>

          <uni-row>
            <uni-col :span="24">
              <view class="col">
                <view class="label">备注：</view>
                <view class="content">{{ formatStr(item.remark) }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      </view>
    </view>

    <view class="null-wrapper" v-else>
      <image class="icon" src="@/static/images/icon_null_data.png" mode="scaleToFill" />
      <view class="tips">请先添加坟墓信息</view>
    </view>

    <image
      class="add-btn"
      src="@/static/images/icon_add.png"
      mode="scaleToFill"
      @click="toLink('add', {})"
    />

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
  </view>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { formatStr, formatDict, routerForward } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'

const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => []
  },
  dataInfo: {
    type: Object as any,
    default: () => {}
  }
})

const emit = defineEmits(['deleteGraveInfo', 'updateData'])
const alertDialog = ref<any>(null)
const currentItem = ref<any>({})
let sercher = ref()
let sercherlist: any = ref([])
/**
 * 删除当前行信息
 * @param {Object} data 当前行数据
 */
const deleteGraveInfo = (data: any) => {
  alertDialog.value?.open()
  currentItem.value = { ...data }
}

const dialogConfirm = () => {
  emit('deleteGraveInfo', currentItem.value)
}

const dialogClose = () => {
  alertDialog.value.close()
}

/**
 * 页面跳转
 * @param type 类型，edit 编辑，add 新增
 * @param data type 为 edit 时，当前行数据
 */
const toLink = (type: string, data?: any) => {
  const { uid, id, villageCode, doorNo } = props.dataInfo
  let commonParams = { type, uid, villageCode }
  if (props.dataInfo.immigrantHouseList) {
    let m: any = []
    props.dataInfo.immigrantHouseList.forEach((item: any) => {
      if (item.id) {
        m.push(item.id)
      }
    })
    m.sort()
    console.log(m, props.dataInfo.immigrantHouseList)
    if (!data.gravePosition) {
      data.gravePosition = props.dataInfo.immigrantHouseList.filter(
        (bbq: any) => bbq.id == m[0]
      )[0]?.locationType
    }
  }
  if (type === 'edit') {
    routerForward('collectiveGraveInfoEdit', {
      params: JSON.stringify(data),
      commonParams: JSON.stringify(commonParams)
    })
  } else {
    const params = {
      villageDoorNo: doorNo, // 村集体户号
      villageId: id || '', // 村集体id
      registrantId: '', // 登记人id
      registrantDoorNo: '', // 登记人户号
      graveType: '',
      number: null,
      materials: '',
      graveYear: '',
      gravePosition: data.gravePosition,
      remark: ''
    }
    routerForward('collectiveGraveInfoEdit', {
      params: JSON.stringify(params),
      commonParams: JSON.stringify(commonParams)
    })
  }
}
let search = () => {
  console.log(1)
  console.log(props.dataList)

  sercherlist.value = props.dataList.filter((item: any) => {
    return item.registrantName?.includes(sercher.value)
  })
}
let searchs = () => {
  console.log(1)
  sercher.value = null
  sercherlist.value = props.dataList
}
onLoad(() => {
  emit('updateData')
  sercherlist.value = props.dataList
})
watch(
  () => props.dataList,
  (val) => {
    sercherlist.value = val
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.grave-info-wrapper {
  width: 100%;
  overflow-y: scroll;

  .list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.18);

      .list-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28rpx;
        border-bottom: 1rpx dotted #d0cbcb;

        .left {
          display: flex;
          align-items: center;

          .icon {
            display: flex;
            width: 42rpx;
            height: 16rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            align-items: center;
            justify-content: center;
          }

          .name {
            margin-left: 5rpx;
            font-size: 9rpx;
            color: #171718;
          }
        }

        .right {
          display: flex;
          align-items: center;

          .icon {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .list-2 {
        padding: 4rpx 6rpx 6rpx 0;
        box-sizing: border-box;

        .col {
          display: flex;
          flex-direction: row;

          .label {
            width: 65rpx;
            height: 16rpx;
            margin-left: 9rpx;
            font-size: 9rpx;
            line-height: 16rpx;
            color: rgba(23, 23, 24, 0.6);
          }

          .content {
            font-size: 9rpx;
            line-height: 16rpx;
            color: #171718;
            text-align: justify;
            word-break: break-all;
          }
        }
      }
    }
  }

  .null-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 33rpx - 12rpx - 33rpx - 24rpx - 60rpx - var(--status-bar-height));
    background-color: #fff;

    .icon {
      width: 152rpx;
      height: 92rpx;
    }

    .tips {
      margin-top: 17rpx;
      font-size: 9rpx;
      line-height: 1;
      color: #171718;
    }
  }

  .add-btn {
    position: fixed;
    right: 25rpx;
    bottom: 16rpx;
    width: 28rpx;
    height: 28rpx;
    border-radius: 50%;
  }
}
.input-txt {
  width: 84rpx;
  height: 35px;
  padding-left: 11rpx;
  font-size: 9rpx;
  line-height: 35px;
  color: #171718;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  margin-bottom: 10rpx;

  &.disabled {
    width: 200rpx;
    background-color: #f5f7fa;
  }
}
.btn-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 68rpx;
  height: 23rpx;
  border-radius: 11rpx;

  &:active {
    opacity: 0.7;
  }

  &.print {
    background-color: #30a952;
  }

  &.report {
    margin-left: 7rpx;
    background-color: #3e73ec;
  }

  .icon {
    width: 7rpx;
    height: 7rpx;
    margin-right: 3rpx;
  }

  .txt {
    font-size: 9rpx;
    color: #171718;
  }
}
</style>
