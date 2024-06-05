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
        <view class="label">是否生产安置：</view>
        <view class="value">
          <uni-data-select
           v-if="props.isEdit"
            class="select-wrap"
            v-model="item.isProduction"
            :localdata="isProductionList"
             @change="isProductionType"
          />
          <text v-else>{{item.isProduction==1?'是':item.isProduction==0?'否':'-'}}</text>
        </view>
      </view>
      <view class="item">
        <view class="label">安置方式：</view>
        <view class="value">
          <uni-data-select
            v-if="props.isEdit"
            class="select-wrap"
            v-model="item.settingWay"
            :localdata="filterWay(item)"
            :disabled="item.isProduction == '0' || !item.isProduction ? true : false"
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
import { ref, watch, onMounted } from 'vue'
import { formatDict,calculateAgeFromIdCard, getStorage, StorageKey } from '@/utils'
import { PopulationType } from '@/types/datafill'
import { showToast } from '@/config'
import { SimulateDemographicType } from '@/types/impDataFill'
import { getResettleDetail } from '@/service'
import { OtherDataType } from '@/database'
import type { LocationType } from '@/types/datafill'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const isProductionList = ref<any[]>([
   {
    text: '是',
    value: '1'
  },
  {
    text: '否',
    value: '0'
  }
])
const dataLists = ref<LocationType[]>([])
// const getDataRequest = (e: any) => {
//   try {
//     console.log(props.type, 'type是什么')
//     if (
//       props.type ||
//       props.immigrantSettle.houseAreaType == 'oneself' ||
//       props.immigrantSettle.houseAreaType == 'concentrate'
//     ) {
//       const data = dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
//     } else {
//       const data = dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
//       console.log(data, '选择的东西')
//       if (data[0].isProductionLand == 2) {
//         landNoList.value = dict[375].filter((item: any) => item.value != 1)
//         console.log(landNoList.value, '字典数据222')
//       } else {
//         landNoList.value = dict[375]
//       }
//     }
//   } catch (error) {
//     console.log('error', error)
//   }
// }
const filterWay = (data: any) => {
  console.log(data, '‘数据')
  console.log(dict[375])
  let arr = JSON.parse(JSON.stringify(dict[375])).map((item: any) => {
    // 农村移民的 其他性质
    item.disable = false
    const notFarmer = data.populationNature !== '1'
    const datass: any = dataLists.value.filter(
      (item) => item.id == props.immigrantSettle.settleAddress
    )[0]
    console.log(datass, '数据', props.immigrantSettle.houseAreaType)

    if (notFarmer && item.value === '1') {
      item.disable = true
    }
    if (item.value === '1' && datass?.isProductionLand != '1') {
      item.disable = true
    }
    data.age = data.card ? calculateAgeFromIdCard(data.card): 0
    if (data.age < 14 && item.value !== '3' && item.value != '1') {
      item.disable = true
    }
    if (
      item.value == '1' &&
      (props.immigrantSettle.houseAreaType == 'concentrate' ||
        props.immigrantSettle.houseAreaType == 'oneself')
    ) {
      item.disable = true
    }
    if(!data.populationNature){
      item.disable = true
    }
    return item
  })
  console.log(arr, '数据2')
  arr = arr.filter((item: any) => !item.disable)
  return arr
}
let getResettleDetailS = async () => {
  const datas = await getResettleDetail(OtherDataType.settleAddressList)
  dataLists.value = datas
}
interface PropsType {
  isEdit: boolean
  demographicList?: PopulationType[] | SimulateDemographicType[]
  simulateDemographic?: any[]
  immigrantSettle?: any
  dataList?: any
  demographicLists?: any
  flag?: any
  type?: any
}

const emit = defineEmits(['submit'])
const props = defineProps<PropsType>()
// 获取数据字典
const dict = getStorage(StorageKey.DICT)
const landNoList = ref<any[]>([])
landNoList.value = dict[375]
const tableData = ref<any[]>([])
const datas = ref<any>([])
const data = ref<any>([])
const flags = ref<boolean>(false)
const isProductionType = (e:any) => {
  console.log(e, '选择的值是什么')
  e == 0 ? (flags.value = true) : (flags.value = false)
  console.log(flags.value, '开关')
  // if (event == 0) {
  //   rowData.settingWay = ''
  // }
  tableData.value.forEach((item: any) => {
  if (item.isProduction==0) {
    item.settingWay=''
  }
  })
}
// 监听安置确认数据问题
watch(
  () => props.demographicList,
  (val) => {
    if (val) {
      if (!props.flag) {
        datas.value = props.demographicList
        tableData.value = val.filter((item: any) => item.isDelete != '1' && item.name != '增计人口')
        console.log(tableData.value, '测试数据模拟安置')
        console.log(props.demographicList, '测试传递数据')
      }
    }
  },
  { immediate: true, deep: true }
)
watch(
  () => props.immigrantSettle,
  (val) => {
    if (val) {
      console.log(val, '测试选择前面的数据')
      // getDataRequest()
      getResettleDetailS()
    }
  },
  { immediate: true, deep: true }
)

// 监听模拟安置的数据问题
watch(
  () => props.simulateDemographic,
  (val) => {
    if (val) {
      console.log(val, '再次测试人口数据')
      if (props.flag) {
        if (props.simulateDemographic?.length == props.demographicLists?.length) {
          console.log('长度相等,用更改表')
          props.demographicLists.forEach((item: any, index: any) => {
            val[index].demographicId = item.id
          })
          datas.value = props.simulateDemographic
          let keysToCopy = ['name', 'relation','sex','card','censusType','populationNature','isDelete','bi']; 
          props.demographicLists.forEach((item:any, index:any) => {  
            keysToCopy.forEach(key => {  
              if (item.hasOwnProperty(key)) {  
                val[index][key] = item[key];  
              }  
            });  
          });
          tableData.value = val.filter(
            (item: any) => item.isDelete != '1' && item.name != '增计人口'
          )
        } else {
          console.log('长度不相等,用人口表')
          datas.value = props.demographicLists
          tableData.value = props.demographicLists.filter(
            (item: any) => item.isDelete != '1' && item.name != '增计人口'
          )
        }
      }
    }
  },
  { immediate: true, deep: true }
)
const stepNext = async () => {
  // 校验数据
  const notFillArray = tableData.value.filter((item) => !item.settingWay)
  const isNotProduction = tableData.value.filter((item) => !item.isProduction)
  if (flags.value==false&&notFillArray && notFillArray.length) {
    showToast('请选择安置方式')
    return
  }
  if (isNotProduction&&isNotProduction.length) {
    showToast('请选择是否生产安置')
    return
  }
  console.log(datas.value, '传递的测试数据111')
  console.log(tableData.value, '测试数据222')
  const data = datas.value
  emit('submit', data)
}
onMounted(() => {
  // getDataRequest()
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
  height: 124rpx;
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
      width: 65rpx;
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
