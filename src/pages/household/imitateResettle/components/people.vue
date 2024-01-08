<template>
  <view class="population-list">
    <view class="population-item" v-for="item in tableData" :key="item.uid">
      <view class="item">
        <view class="label">姓名：</view>
        <view class="value">{{ item.name }}</view>
      </view>
      <view class="item">
        <view class="label">与户主关系：</view>
        <view class="value">{{ formatDict(item.relation, 307) }}</view>
      </view>

      <view class="item">
        <view class="label">性别：</view>
        <view class="value">{{ formatDict(item.sex, 292) }}</view>
      </view>

      <view class="item">
        <view class="label">身份证号：</view>
        <view class="value">{{ item.card }}</view>
      </view>
      <view class="item">
        <view class="label">户籍类型：</view>
        <view class="value">{{ formatDict(item.censusType, 249) }}</view>
      </view>
      <view class="item">
        <view class="label">人口性质：</view>
        <view class="value">{{ formatDict(item.populationNature, 263) }}</view>
      </view>

      <view class="item">
        <view class="label">安置方式：</view>
        <view class="value">
          <uni-data-select
            v-if="props.isEdit"
            class="select-wrap"
            v-model="item.settingWay"
            :localdata="landNoList"
          />
          <text v-else>{{ formatDict(item.settingWay, 375) }}</text>
        </view>
      </view>
      <view class="item two-col">
        <view class="label">备注：</view>
        <view class="value ipt-box">
          <input v-if="props.isEdit" type="text" class="ipt" v-model="item.settingRemark" />
          <text v-else>{{ item.settingRemark }}</text>
        </view>
      </view>
    </view>

    <view class="btn-wrap" v-if="props.isEdit">
      <view class="btn" @click="stepNext"> 确定 </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, watch,onMounted } from 'vue'
import { formatDict, getStorage, StorageKey } from '@/utils'
import { PopulationType } from '@/types/datafill'
import { showToast } from '@/config'
import { SimulateDemographicType } from '@/types/impDataFill'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database';
import type { LocationType } from '@/types/datafill'

const dataLists = ref<LocationType[]>([])
const getDataRequest = async () => {
  try {
    const data = await getResettleDetail(OtherDataType.settleAddressList)
    dataLists.value=data
  } catch (error) {
    console.log('error', error);
  }
}
interface PropsType {
  isEdit: boolean
  demographicList: PopulationType[] | SimulateDemographicType[]
  immigrantSettle: any
  dataList:any
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const landNoList = ref<any[]>([])
landNoList.value=dict[375]
const tableData = ref<any[]>([])
const data = ref<any[]>([])

watch(
  () => props.demographicList,
  (val) => {
    if (val) {
      tableData.value = val
      // val.forEach((item,index) => {
      //   if(item.name=='人口增计'){
      //      val.splice(index,1)
      //      tableData.value = val
      //   }
      // })
    }
  },
  { immediate: true, deep: true }
)
watch(
  () => props.immigrantSettle,
  (val) => {
    if (val) {
      getDataRequest()
      console.log(props.immigrantSettle,'测试选择的东西')
      console.log(dataLists.value,'数据字典')
      const data=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
      console.log(data,'选择的东西')
      if(data[0].isProductionLand==2){
        landNoList.value=dict[375].filter((item) => item.value!= 1)
        console.log( landNoList.value,'字典数据222')
      }
    }
  },
  { immediate: true, deep: true }
)

const stepNext = async () => {
  // 校验数据
  const notFillArray = tableData.value.filter((item) => !item.settingWay)
  if (notFillArray && notFillArray.length) {
    showToast('请选择安置方式')
    return
  }
  const data = tableData.value.map((item) => {
    return {
      ...item,
      demographicId: item.demographicId,
      settingWay: item.settingWay,
      settingRemark: item.settingRemark
    }
  })
  emit('submit', data)
}
onMounted(() => {
  getDataRequest()
  console.log(333333)
})
</script>

<style lang="scss" scoped>
.population-list {
  width: 100%;
  height: 100%;
  padding: 0 9rpx;
}

.population-item {
  display: flex;
  height: 94rpx;
  padding: 9rpx 12rpx;
  margin-top: 9rpx;
  background: #f2f6ff;
  border-radius: 5rpx;
  flex-direction: row;
  flex-wrap: wrap;

  .item {
    display: flex;
    height: 21rpx;
    flex: 33%;
    flex-direction: row;
    align-items: center;

    .label {
      flex: none;
      width: 56rpx;
      font-size: 9rpx;
      color: #171718;
      text-align: right;
    }

    .value {
      flex: 1;
      font-size: 9rpx;
      color: #131313;
      word-break: keep-all;
      white-space: nowrap;
    }

    .select-wrap {
      width: 94rpx;
      height: 23rpx;
      font-size: 9rpx;
      background: #ffffff;
      border-radius: 2rpx;
    }

    .ipt {
      width: 100%;
      height: 21rpx;
      padding: 0 4rpx;
      background: #fff;
      border: 1rpx solid #ebebeb !important;
      border-radius: 2rpx;
    }

    &.two-col {
      flex: 66%;
    }
  }
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9rpx 15rpx 65rpx;

  .btn {
    display: flex;
    height: 26rpx;
    min-width: 70rpx;
    padding: 0 11px;
    font-size: 11px;
    font-weight: 500;
    color: #ffffff;
    background: #3e73ec;
    border-radius: 2rpx;
    align-items: center;
    justify-content: center;
  }
}

::v-deep.uni-select__input-text {
  font-size: 9rpx !important;
}

::v-deep.uni-input-input,
::v-deep.uni-input-placeholder {
  font-size: 9rpx !important;
}

</style>
