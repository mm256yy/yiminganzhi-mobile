<template>
  <view class="form-wrapper">
    <uni-forms class="form" ref="form" :modelValue="formData">
      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>家庭情况</text>
      </view>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户主姓名：</view>
            <view class="content">{{ formatStr(dataInfo?.name) }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">户内人口：</view>
            <!-- <view class="content"> {{ formatStr(dataInfo?.demographicList?.length) }} </view> -->
            <view class="content">
              {{
                // props.dataInfo.demographicList.filter(
                //   (item: any) => item.name != '增计人口' && item.isDelete !== '1'
                // ).length || 1
                demographicNum
              }}</view
            >
          </view>
        </uni-col>
      </uni-row>

      <uni-row>
        <uni-col :span="12">
          <view class="col">
            <view class="label">迁出地址：</view>
            <view class="content">{{
              (dataInfo.areaCodeText || '') +
              (dataInfo.townCodeText || '') +
              (dataInfo.villageCodeText || '')
            }}</view>
          </view>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">联系方式：</view>
            <view class="content"> {{ formatStr(dataInfo?.phone) }} </view>
          </view>
        </uni-col>
      </uni-row>

      <view class="title-wrapper">
        <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
        <text>过渡去向情况</text>
      </view>

      <uni-row>
        <uni-col :span="12">
          <uni-forms-item
            required
            label="过渡安置地详址："
            :label-width="150"
            label-align="right"
            name="formData.excessAddress"
          >
            <uni-easyinput
              v-model="formData.excessAddress"
              type="textarea"
              :maxlength="50"
              placeholder="请输入(50字以内)"
            />
          </uni-forms-item>
        </uni-col>
        <uni-col :span="12">
          <view class="col">
            <view class="label">过渡安置人数（人）：</view>
            <view class="content">{{ demographicNum}}</view>
          </view>
        </uni-col>
      </uni-row>
            <uni-row>
        <uni-col :span="10">
          <view class="col">
            <view class="label">补偿单价（元/人·月）</view>
            <view class="content">{{ compensationPrice}}</view>
          </view>
        </uni-col>
        <uni-col :span="14">
          <view class="col">
            <view class="label">过渡安置补偿金额（元）：</view>
            <!-- <view class="content">{{ amountPrices }}</view> -->
             <view class="content">{{ formData.totalCompensationAmount ? formData.totalCompensationAmount : '-'  }}</view>
          </view>
        </uni-col>
      </uni-row>
      <!-- <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            required
            label="过渡开始日期："
            :label-width="150"
            label-align="right"
            name="formData.excessStartDate"
          >
            <view class="picker-wrapper">
              <picker
                mode="date"
                :value="currentStartDate"
                :fields="'date'"
                @change="bindStartDateChange"
              >
                <view :class="['uni-input', formData.excessStartDate ? '' : 'select']">
                  {{ formData.excessStartDate ? formData.excessStartDate : '请选择' }}
                </view>
              </picker>
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row> -->

      <!-- <uni-row>
        <uni-col :span="24">
          <uni-forms-item
            label="过渡结束日期："
            :label-width="150"
            label-align="right"
            name="formData.excessEndDate"
          >
            <view class="picker-wrapper">
              <picker
                mode="date"
                :value="currentEndDate"
                :fields="'date'"
                @change="bindEndDateChange"
              >
                <view :class="['uni-input', formData.excessEndDate ? '' : 'select']">
                  {{ formData.excessEndDate ? formData.excessEndDate : '请选择' }}
                </view>
              </picker>
            </view>
          </uni-forms-item>
        </uni-col>
      </uni-row> -->
      <view style="display:flex;">
          <view class="title-wrapper" style="width: 90%;">
            <image class="icon" src="@/static/images/icon_title.png" mode="scaleToFill" />
            <text>过渡安置费</text>
            <!-- <button @click="add">新增</button> -->
          </view>
          <view class="btn blue-btn" @click="add">
              <text class="txt">新增</text>
          </view>
          <!-- <button @click="add">新增</button> -->
      </view>
      <view class="list" v-for="(item, index) in arrList" :key="index"> 
        <view class="list-item">
        <view class="list-1">
          <view class="left">
            <view class="name">第{{ item.index + 1 || item.orderNum }}批过渡安置费</view>
          </view>
          <view class="right">
            <image
              class="icon m-r-10"
              src="@/static/images/icon_delete_mini.png"
              mode="scaleToFill"
              @click="del(item.index,item.id)"
            />
          </view>
        </view>
        <view class="list-2">
          <uni-row>
            <uni-col :span="12">
              <uni-forms-item
                required
                label="过渡开始日期："
                :label-width="150"
                label-align="right"
                name="item.excessStartDate"
              >
                <view class="picker-wrapper">
                  <picker
                    mode="date"
                    :value="item.excessStartDate"
                    :fields="'date'"
                    @change="handleStartChange(item.index,$event)"
                  >
                    <view :class="['uni-input', item.excessStartDate ? '' : 'select']">
                      {{ item.excessStartDate ? item.excessStartDate : '请选择' }}
                    </view>
                  </picker>
                </view>
              </uni-forms-item>
            </uni-col>
            <uni-col :span="12">
              <uni-forms-item
                label="过渡结束日期："
                :label-width="150"
                label-align="right"
                name="item.excessEndDate"
              >
                <view class="picker-wrapper">
                  <picker
                    mode="date"
                    :value="item.excessEndDate"
                    :fields="'date'"
                    @change="handleEndChange(item.index,$event)"
                  >
                    <view :class="['uni-input', item.excessEndDate ? '' : 'select']">
                      {{ item.excessEndDate ? item.excessEndDate : '请选择' }}
                    </view>
                  </picker>
                </view>
              </uni-forms-item>
            </uni-col>
          </uni-row>
          <uni-row>
            <uni-col :span="12">
              <view class="col">
                <view class="label">补偿月数（个月）:</view>
                <view class="content">{{
                  item.monthNum
                }}</view>
              </view>
            </uni-col>
            <uni-col :span="12">
              <view class="col">
                <view class="label">补偿金额（元）：</view>
                <view class="content">{{ item.compensationAmount }}</view>
              </view>
            </uni-col>
          </uni-row>
        </view>
      <!-- <uni-popup ref="alertDialog" type="dialog">
       <uni-popup-dialog
        type="warn"
        mode="input"
        cancelText="取消"
        confirmText="确认"
        title="确认删除？"
        @confirm="del(item.id)"
        @close="dialogClose"
       />
      </uni-popup> -->
      </view>
    </view>              
    </uni-forms>

    <image
      class="submit-btn"
      src="@/static/images/icon_submit.png"
      mode="scaleToFill"
      @click="submit"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted,computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { formatStr } from '@/utils'
import { SUCCESS_MSG, showToast } from '@/config/msg'
import { updateImpLandlordExcessApi } from '@/service'
import { ImmigrantExcessType } from '@/types/impDataFill'
import { LandlordType } from '@/types/sync'
import { getLandlordItemApi } from '@/service'
import { guid } from '@/utils'

interface PropsType {
  uid: string
  dataInfo: LandlordType
  immigrantExcess: any
}
const props = defineProps<PropsType>()
const formData = ref<any>({
  doorNo: props.dataInfo?.doorNo,
  // isExcess: '',
  // excessStartDate: '',
  // excessEndDate: '',
  // excessAddress: ''
  demographicNum: '',
  compensationPrice: '',
  totalCompensationAmount: '',
  excessDateEndFlag: '',
  isExcess: '',
  isComplete: '',
  immigrantExcessPayList: []
})

const currentStartDate = ref<any>('')
const currentEndDate = ref<any>('')
const emit = defineEmits(['submit','deletePopulation'])
const arrList = ref<any>([])
const startMonth = ref<any>()
const endMonth = ref<any>()
const amountPrices = ref<any>()
const alertDialog = ref<any>(null)
const demographicNum = ref<any>()
const compensationPrice = ref<any>()
const time=ref<any>()
const getCompensationCardConfig = async() => {
  const { uid } = props
  console.log(uid,'Uid是什么')
  console.log(props.dataInfo, '主体数据')
  let data: any =  await getLandlordItemApi(uid)
  console.log(data, '测试dada数据')
  time.value = data.immigrantHouseEmpty?.houseEmptyDate?dayjs(data.immigrantHouseEmpty.houseEmptyDate).format('YYYY-MM-DD'):''
  console.log(time.value, '时间')
  demographicNum.value = data.demographicList.filter((item: any) => item.name != '增计人口' && item.isDelete !== '1').length || 1
  compensationPrice.value = data.immigrantCompensationCardList.find((item: any) => item.name == '过渡期生产生活补助款').price
  let immigrantExcess = data.immigrantExcess
      formData.value = {
        ...data.immigrantExcess,
      }
  if (immigrantExcess.immigrantExcessPayList) {
      immigrantExcess.immigrantExcessPayList.forEach((item:any) => {
        item.excessStartDate = item.excessStartDate ? dayjs(item.excessStartDate).format('YYYY-MM-DD') : ''
        item.excessEndDate = item.excessEndDate ? dayjs(item.excessEndDate).format('YYYY-MM-DD') : ''
      })
      console.log(immigrantExcess.immigrantExcessPayList,'数组数据')
      
      arrList.value = immigrantExcess.immigrantExcessPayList ? immigrantExcess.immigrantExcessPayList : []
  }
}

onShow(() => {
  getCompensationCardConfig()
  // getDataRequest()
})

// const demographicNum=computed(() => {
//    return props.dataInfo.demographicList.filter(
//                    (item: any) => item.name != '增计人口' && item.isDelete !== '1'
//                  ).length || 1
// })
// watch(
//   () => props.immigrantExcess,
//   (val) => {
//     if (val) {
//       // 基本信息
//       const { immigrantExcessPayList } = val
//       formData.value = {
//         ...val,
//         // excessStartDate: excessStartDate ? dayjs(excessStartDate).format('YYYY-MM-DD') : '',
//         // excessEndDate: excessEndDate ? dayjs(excessEndDate).format('YYYY-MM-DD') : ''
//       }
//       if (immigrantExcessPayList) {
//           immigrantExcessPayList.forEach((item:any) => {
//             item.excessStartDate = item.excessStartDate ? dayjs(item.excessStartDate).format('YYYY-MM-DD') : ''
//             item.excessEndDate = item.excessEndDate ? dayjs(item.excessEndDate).format('YYYY-MM-DD') : ''
//           })
//           console.log(immigrantExcessPayList,'数组数据')
          
//           arrList.value = immigrantExcessPayList ? immigrantExcessPayList : []
//       }
//       // if (excessStartDate) {
//       //   currentStartDate.value = dayjs(excessStartDate).format('YYYY-MM-DD')
//       // }
//       // if (excessEndDate) {
//       //   currentEndDate.value = dayjs(excessEndDate).format('YYYY-MM-DD')
//       // }
//     }
//   },
//   { immediate: true, deep: true }
// )

/**
 *日期选择
 */
const bindStartDateChange = (e: any) => {
  formData.value.excessStartDate = e.detail.value
}

/**
 *日期选择
 */
const bindEndDateChange = (e: any) => {
  formData.value.excessEndDate = e.detail.value
}
const dialogClose = () => {
  alertDialog.value.close()
}
const submit = async () => {
  if (!formData.value.excessAddress) {
    showToast('请填写过渡安置地详细地址')
    return
  }
  // if (!formData.value.excessStartDate) {
  //   showToast('请选择开始日期')
  //   return
  // }
  // if (
  //   formData.value.excessStartDate &&
  //   formData.value.excessEndDate &&
  //   dayjs(formData.value.excessStartDate).valueOf() > dayjs(formData.value.excessEndDate).valueOf()
  // ) {
  //   showToast('开始日期不得大于结束日期')
  //   return
  // }
  formData.value.immigrantExcessPayList = arrList.value
  formData.value.immigrantExcessPayList .forEach((item:any) => {
    item.excessStartDate = item.excessStartDate ? dayjs(item.excessStartDate) : ''
    item.excessEndDate = item.excessEndDate ? dayjs(item.excessEndDate) : ''
  })
  formData.value.demographicNum = demographicNum.value
  formData.value.compensationPrice=compensationPrice.value
  const falg = formData.value.immigrantExcessPayList.every((item: any) => item.excessStartDate && item.excessEndDate)
  console.log(falg,'过渡开关')
  if (!falg) {
    showToast('请选择过渡开始日期和过渡结束日期')
    return
  }
  const params: Partial<ImmigrantExcessType> = {
    ...formData.value,
    // excessStartDate: formData.value.excessStartDate ? dayjs(formData.value.excessStartDate) : '',
    // excessEndDate: formData.value.excessEndDate ? dayjs(formData.value.excessEndDate) : '',
    isExcess: '1',
    isComplete:'0'
  }
  console.log(params,'提交的数据是什么？')
  const res = await updateImpLandlordExcessApi(props.uid, params)
  if (res) {
    showToast(SUCCESS_MSG)
    emit('submit')
  }
}
const addMonthsToDate = (dateString:any, monthsToAdd:any) => {
  // 将字符串转换为Date对象
  let date = new Date(dateString)

  // 设置新的月份，注意月份是从0开始的
  let newMonth = (date.getMonth() + monthsToAdd) % 12
  let newYear = date.getFullYear() + Math.floor((date.getMonth() + monthsToAdd) / 12)

  // 如果newMonth为负数，表示需要回退一年并增加月份
  if (newMonth < 0) {
    newMonth += 12
    newYear--
  }

  // 设置新的年份和月份
  date.setFullYear(newYear, newMonth, date.getDate())

  // 如果月份变更后日期不存在（例如2月30日），则会自动调整为该月的最后一天

  // 将修改后的日期转换回ISO 8601格式的字符串
  let dataString= date.toISOString().split('.')[0] + 'Z'
  return dayjs(dataString).format('YYYY-MM-DD')// 去除毫秒部分
}
const add = () => {
  let i = 0
  arrList.value.push({
    index: arrList.value.length,
    excessStartDate:
      arrList.value.length == 0
        ? time.value
        : addMonthsToDate(arrList.value[arrList.value.length - 1].excessEndDate, 1), //开始日期
    excessEndDate: '', //结束日期
    monthNum: '', //补偿月数
    compensationAmount: '', //补偿金额
    orderNum: '',//批次
    isDelete: '0',
    uid:guid()
  })
}
const handleStartChange = (index:any,e: any) => {
  console.log(index, '索引')
  console.log(e.detail.value, '开始的日期')
  let date = new Date(e.detail.value)
  startMonth.value = date.getMonth() + 1 // getMonth() 返回的月份是从0开始的，所以需要+1
  console.log(startMonth.value, '选中的月份')
  arrList.value[index].excessStartDate = e.detail.value
  // if (!endMonth.value) {
  let date1 = new Date(arrList.value[index].excessEndDate)
  endMonth.value = date1.getMonth() + 1
  // }
  if (startMonth.value && endMonth.value) {
    arrList.value[index].monthNum = endMonth.value - startMonth.value + 1
    arrList.value[index].compensationAmount = demographicNum.value * compensationPrice.value * arrList.value[index].monthNum
    formData.value.totalCompensationAmount = arrList.value.reduce((accumulator:any, currentValue:any) => {
      return accumulator + currentValue.compensationAmount
    }, 0)

    arrList.value[index].orderNum = index + 1
  } else {
    arrList.value[index].monthNum = ''
  }
}
const handleEndChange = (index:any,e: any) => {
  console.log(index, '索引')
  console.log(e.detail.value, '结束的日期')
  let date = new Date(e.detail.value)
  endMonth.value = date.getMonth() + 1 // getMonth() 返回的月份是从0开始的，所以需要+1
  console.log(endMonth.value, '选中的月份')
  arrList.value[index].excessEndDate=e.detail.value
  // if (!startMonth.value) {
  let date1 = new Date(arrList.value[index].excessStartDate)
  console.log(date1, '日期')
  startMonth.value = date1.getMonth() + 1
  // }
  if (startMonth.value && endMonth.value) {
    arrList.value[index].monthNum = endMonth.value - startMonth.value + 1
    arrList.value[index].compensationAmount = demographicNum.value * compensationPrice.value * arrList.value[index].monthNum
    console.log(arrList.value,'数组arr')
    formData.value.totalCompensationAmount = arrList.value.reduce((accumulator:any, currentValue:any) => {
      return accumulator + currentValue.compensationAmount
    }, 0)
    console.log(formData.value.totalCompensationAmount,'补偿金额')
    arrList.value[index].orderNum = index + 1
  } else {
    arrList.value[index].monthNum = ''
  }
}
const del = (index:any,id:any) => {
  // arrList.value = arrList.value.filter((item: any) => item.id !== id)
  // alertDialog.value?.open()
  console.log(index, '索引')
  if (index>=0) {
    // arrList.value = arrList.value.filter((item:any) => item.index !== index)
    arrList.value.splice(index,1)
  } else if (id) {
    arrList.value = arrList.value.filter((item:any) => item.id !== id)
  }
  formData.value.totalCompensationAmount = arrList.value.reduce((accumulator:any, currentValue:any) => {
    return accumulator + currentValue.compensationAmount
  }, 0)
}
/**
 * 删除当前行数据
 * @param {Object} data 当前行数据
 */
// const deletePopulation = (data: any) => {
//   alertDialog.value?.open()
//   currentItem.value = { ...data }
// }
// onShow(() => {
//   console.log(1)
//   getCompensationCardConfig()
// })
// onMounted(() => {
//   console.log(2)
//    getCompensationCardConfig()
// })
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  height: calc(100vh - 33rpx - 12rpx - var(--status-bar-height));
  padding: 6rpx;
  background-color: #fff;
  border-radius: 2rpx;
  box-sizing: border-box;

  .form {
    height: calc(100vh - 33rpx - 12rpx - 9rpx - var(--status-bar-height));
    padding: 0 0 9rpx 0;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;

    ::v-deep.uni-forms-item__label {
      font-size: 9rpx !important;
      color: rgba(23, 23, 24, 0.6) !important;
    }

    ::v-deep.uni-easyinput__content {
      width: 200rpx !important;

      .uni-easyinput__placeholder-class,
      .uni-input-input {
        font-size: 9rpx !important;
      }
    }

    ::v-deep.uni-data-tree,
    ::v-deep.uni-stat__select {
      flex: 0 auto !important;
      width: 200rpx !important;
    }

    ::v-deep.uni-select__input-text {
      width: 90% !important;
      font-size: 9rpx !important;
    }

    ::v-deep.uni-date,
    ::v-deep.uni-date-editor {
      width: 200rpx !important;
    }

    ::v-deep.uni-input-input,
    ::v-deep.uni-input-placeholder {
      font-size: 9rpx !important;
    }

    .title-wrapper {
      display: flex;
      width: 100%;
      height: 28rpx;
      margin-bottom: 9rpx;
      font-size: 9rpx;
      color: #171718;
      background: #fff;
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

    .col {
      display: flex;
      align-items: center;
      flex-direction: row;
      height: 23rpx;

      .label {
        width: 120rpx;
        height: 23rpx;
        margin-right: 9rpx;
        font-size: 9rpx;
        color: rgba(23, 23, 24, 0.6);
        text-align: right;
      }

      .content {
        height: 23rpx;
        font-size: 9rpx;
        color: #171718;
      }
    }

    .picker-wrapper {
      display: flex;
      width: 200rpx;
      height: 23rpx;
      padding-left: 7rpx;
      overflow: hidden;
      font-size: 9rpx;
      line-height: 23rpx;
      color: #171718;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      .uni-input {
        width: 180rpx;

        &.select {
          color: #999;
        }
      }
    }
  }

  .submit-btn {
    position: fixed;
    right: 25rpx;
    bottom: 20rpx;
    width: 36rpx;
    height: 36rpx;
    border-radius: 50%;
  }
}
.btn {
      display: flex;
      height: 23rpx;
      padding: 0 14rpx;
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
.list {
    width: 100%;

    .list-item {
      margin-bottom: 7rpx;
      border-radius: 5rpx;
      box-shadow: 0 1rpx 9rpx -2rpx rgba(0, 0, 0, 0.08);

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
            width: auto;
            height: 16rpx;
            padding: 0 5rpx;
            font-size: 9rpx;
            color: #fff;
            background: #faad14;
            border-top-right-radius: 5rpx;
            border-bottom-right-radius: 5rpx;
            box-sizing: border-box;
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
          justify-content: right;
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
            width: 80rpx;
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
          }
        }
      }
    }
  }
</style>
