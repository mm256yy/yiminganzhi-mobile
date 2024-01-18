<template>
  <view class="grave-wrap">
    <view class="btn-box">
      <view>
        <view class="btn blue" @click="addGrave">
          <image class="icon" src="@/static/images/icon_plus.png" mode="scaleToFill" />
          <text class="txt">添加</text>
        </view>
      </view>
      <view style="display:flex">
        <view class="btn green" @click="onFilled">
          <image class="icon" src="@/static/images/icon_sign_white.png" mode="scaleToFill" />
          <text class="txt">填报完成</text>
        </view>
        <view class="btn green" @click="handleClick">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印报表</text>
        </view>
        <view class="btn blue" @click="archivesUpload">
          <image class="icon" src="@/static/images/icon_dangan_upload.png" mode="scaleToFill" />
          <text class="txt">档案上传</text>
        </view>
      </view>
      <!-- <view class="btn blue">
        <image class="icon" src="@/static/images/icon_feedback.png" mode="scaleToFill" />
        <text class="txt">问题反馈</text>
      </view> -->
    </view>
    <view class="common-head">
      <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
      <text>坟墓信息</text>
    </view>

    <view class="table-wrap">
      <uni-table class="table" ref="table" :loading="loading" border stripe emptyText="暂无更多数据">
        <uni-tr>
          <uni-th width="90rpx">坟墓与登记人关系</uni-th>
          <uni-th width="59rpx">材料</uni-th>
          <uni-th width="38rpx">穴位</uni-th>
          <uni-th width="40rpx">数量</uni-th>
          <uni-th width="52rpx">处理方式</uni-th>
          <uni-th width="98rpx">安置公墓/择址地址</uni-th>
          <uni-th width="80rpx">备注</uni-th>
          <uni-th width="62rpx" align="center">操作</uni-th>
        </uni-tr>

        <uni-tr v-for="(item, index) in tableData" :key="index">
          <uni-td>{{ formatDict(item.relation, 307) }}</uni-td>
          <uni-td>{{ formatDict(item.materials, 295) }}</uni-td>
          <uni-td>{{ formatDict(item.graveType, 345) }}</uni-td>
          <uni-td>{{ item.number }}</uni-td>
          <uni-td>{{ formatDict(item.handleWay, 238) }}</uni-td>
          <uni-td>
            {{ item.handleWay === '1' ? item.settingAddress : formatDict(item.settingGrave, 377) }}
          </uni-td>
          <uni-td>{{ item.remark }}</uni-td>
          <uni-td>
            <view class="table-btn">
              <view class="btn primary-btn" @click="updateGrave(item.uid as string)">确认</view>
              <view class="btn red-btn" @click="deleteGrave(item.uid as string)">删除</view>
            </view>
          </uni-td>
        </uni-tr>
      </uni-table>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { routerForward, formatDict } from '@/utils'
import { deleteImpLandlordGraveApi, updateImpLandlordImmigrantFillingApi } from '@/service'
import { LandlordType } from '@/types/sync'
import { showToast, SUCCESS_MSG, ERROR_MSG } from '@/config'

interface PropsType {
  dataInfo: LandlordType
}

const props = defineProps<PropsType>()
const loading = ref<boolean>(false)
const emit = defineEmits(['updateData'])

const tableData = computed(() => {
  return props.dataInfo.immigrantGraveList || []
})

// 填报完成
const onFilled = () => {
  const { uid } = props.dataInfo
  let params = {
    graveArrangementStatus: '1'
  }
  updateImpLandlordImmigrantFillingApi(uid, params)
    .then((res) => {
      console.log(res, 'bbq')

      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateData')
      }
    })
    .catch(() => {
      console.log('报错')
      showToast(ERROR_MSG)
    })
}

const addGrave = () => {
  routerForward('graveConfirmEdit', {
    actionType: 'add',
    uid: '',
    doorNo: props.dataInfo.doorNo
  })
}

const updateGrave = (uid: string) => {
  routerForward('graveConfirmEdit', {
    actionType: 'edit',
    uid
  })
}

const deleteGrave = async (uid: string) => {
  const res = await deleteImpLandlordGraveApi(uid)
  if (res) {
    showToast(SUCCESS_MSG)
    emit('updateData')
  }
}

const archivesUpload = () => {
  routerForward('archives', {
    type: 3,
    uid: props.dataInfo.uid
  })
}
const handleClick = () => {
  routerForward('pdfSerch', {
    data: JSON.stringify(tableData.value),
    dataInfo: JSON.stringify(props.dataInfo),
    id: 5
  })
}
</script>

<style lang="scss" scoped>
.common-head {
  display: flex;
  width: 100%;
  height: 28rpx;
  margin-top: 9rpx;
  font-size: 9rpx;
  font-weight: 500;
  color: #171718;
  background: #ffffff;
  border-bottom: 1rpx solid #f0f0f0;
  border-radius: 5rpx 5rpx 0px 0px;
  flex-direction: row;
  align-items: center;

  .icon {
    width: 10rpx;
    height: 10rpx;
    margin-right: 6rpx;
  }
}

.btn-box {
  display: flex;
  align-items: center;
  // justify-content: flex-end;
  justify-content: space-between;
  padding: 9rpx 0;

  .btn {
    display: flex;
    height: 23rpx;
    padding: 0 9rpx;
    margin-left: 6rpx;
    background: #3e73ec;
    border-radius: 23rpx;
    align-items: center;
    justify-content: center;

    &.green {
      background-color: #30a952;
    }

    &.blue {
      background: #3e73ec;
    }

    .icon {
      width: 9rpx;
      height: 9rpx;
      margin-right: 3rpx;
    }

    .txt {
      font-size: 9rpx;
      line-height: 11rpx;
      color: #ffffff;
    }
  }
}

.uni-table-th {
  height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  font-weight: normal;
  line-height: 28rpx;
  color: #737374;
  background-color: #f8f8f8;
}

.uni-table-td {
  min-height: 28rpx;
  padding: 0 0 0 9rpx;
  font-size: 9rpx;
  line-height: 28rpx;
  color: #171718;

  &.blue {
    color: #3e73ec;
  }
}

.uni-table-text {
  font-size: 9rpx;
}

.table-btn {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn {
    margin-right: 6rpx;
    font-size: 9rpx;
    word-break: keep-all;

    &.primary-btn {
      color: #3e73ec;
    }

    &.red-btn {
      color: #e43030;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
