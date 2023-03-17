<template>
  <view class="list-header">
    <view class="list-header-lt" @click="expandToggle">
      <image class="expand-img" src="@/static/images/expand.png" mode="scaleToFill" />
    </view>

    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ props.dataInfo.name }}</view>
        <view class="account-no">{{ props.dataInfo.doorNo }}</view>
      </view>

      <view class="list-header-right">
        <view class="btn-wrapper print" v-if="props.showPrint && netWork" @click="printFile">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印表格</text>
        </view>

        <view
          v-if="!dataInfo.reportStatus || dataInfo.reportStatus === ReportStatusEnum.UnReport"
          class="btn-wrapper report"
          @click="reportDataCheck"
        >
          <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
          <text class="txt">数据上报</text>
        </view>
      </view>
    </view>

    <!-- 数据上报 -->
    <uni-popup ref="reportDataPopup" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">数据上报</view>
        <view class="tips-content">
          <view class="tips-list">
            <view class="tips-item" v-for="(item, index) in tipsList" :key="index">
              {{ item }}
            </view>
          </view>
          <view class="tips">
            <uni-icons type="info-filled" color="#FF4242" />
            以上信息还未填写，是否继续上报数据？
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="close('report')">取消</view>
          <view class="btn confirm" @click="confirm('report')">确认</view>
        </view>
      </view>
    </uni-popup>

    <!-- 打印表格 -->
    <uni-popup ref="printPopup" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">打印表格</view>
        <view class="tips-content">
          <view class="file-list">
            <view
              v-for="(item, index) in fileList"
              :key="index"
              :class="['file-item', item.selected ? 'active' : '']"
              @click="selectFile(item, index)"
            >
              <view class="name">{{ item.name }}</view>
              <image
                class="icon"
                src="@/static/images/icon_view_file.png"
                mode="scaleToFill"
                @click.stop="prviewImage(item)"
              />
            </view>
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="close('print')">取消</view>
          <view class="btn confirm" @click="confirm('print')">确认</view>
        </view>
      </view>
    </uni-popup>

    <!-- 打印表格 -->
    <uni-popup ref="webViewPopup" :is-mask-click="true">
      <web-view :src="pdfUrl" />
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reportDataApi } from '@/service'
import { networkCheck, routerForward } from '@/utils'
import { getPrintTemplateListApi, printLandlordApi } from '@/api'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { showLoading, hideLoading } from '@/config'
import { MainType, ReportStatusEnum } from '@/types/common'

const props = defineProps({
  dataInfo: {
    type: Object,
    default: () => {}
  },
  showPrint: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: ''
  },
  templateType: {
    // 打印模板的类别
    type: String,
    default: ''
  }
})

interface PrintListType {
  name: string
  selected: boolean
  url: string
  uid: number
}

const emit = defineEmits(['expandToggle', 'updateTree', 'updateData'])
const reportDataPopup = ref<any>(null)
const printPopup = ref<any>(null)
const selectedTemplateIds = ref<any>([])
const tipsList = ref<any>([])
const fileList = ref<PrintListType[]>([])
const netWork = ref<boolean>(true)
const webViewPopup = ref<any>(null)
const pdfUrl = ref<string>('')
const YanYuprintPdf = uni.requireNativePlugin('YanYu-PrintPDF')

const expandToggle = () => {
  emit('expandToggle')
}

// 数据上报校验
const reportDataCheck = () => {
  let query = {
    uid: props.dataInfo.uid,
    isCheck: true,
    type: props.type as MainType
  }
  reportDataApi(query)
    .then((res: any) => {
      if (res) {
        tipsList.value = [...res]
        reportDataPopup.value?.open()
      }
    })
    .catch((e) => {
      showToast(ERROR_MSG)
    })
}

// 数据上报
const reportData = () => {
  let query = {
    uid: props.dataInfo.uid,
    isCheck: false,
    type: props.type as MainType
  }
  showLoading()
  reportDataApi(query)
    .then((res: any) => {
      if (res) {
        showToast(SUCCESS_MSG)
        emit('updateTree')
        emit('updateData')
      }
      hideLoading()
      close('report')
    })
    .catch((e) => {
      hideLoading()
      showToast(ERROR_MSG)
      close('report')
    })
}

/**
 * 获取打印模板列表
 * @params{Object} templateType 打印的模板类别
 */
const getPrintList = async (templateType: string) => {
  const res = await getPrintTemplateListApi({ templateType: templateType })
  if (res && res.content) {
    const arr: PrintListType[] = []
    res.content.map((item: any) => {
      if (item.templateModule === '实物采集') {
        arr.push({
          name: item.templateName,
          url: item.previewUrl,
          selected: false,
          uid: item.id
        })
      }
    })
    fileList.value = [...arr]
  }
}

// 打印文件/图片
const printFile = () => {
  getPrintList(props.templateType)
  printPopup.value?.open()
}

/**
 * 选择打印的文件
 * @param(Object) item 当前行文件相关信息
 * @param(Object) index 文件下标
 */
const selectFile = (item: any, index: number) => {
  fileList.value[index].selected = !item.selected
  if (fileList.value[index].selected) {
    selectedTemplateIds.value.push(fileList.value[index].uid)
  } else {
    selectedTemplateIds.value.splice(index, 1)
  }
}

// 获取已选择的模板 ID 数组集合
const getSelectedTemplateIds = () => {
  let arr: any = []
  fileList.value.map((item) => {
    if (item.selected) {
      arr.push(item.uid)
    }
  })
  return [...arr]
}

// 确认 数据上报/打印
const confirm = (type: string) => {
  if (type === 'report') {
    reportData()
  } else if (type === 'print') {
    if (selectedTemplateIds.value.length > 0) {
      printPdf(getSelectedTemplateIds(), [props.dataInfo.id])
      // 关闭弹框
      printPopup.value?.close()
    } else {
      showToast('请选择要打印的文件')
    }
  }
}

// 打印 PDF 文件
const printPdf = (templateIds: any[], peasantHouseholdIds: any[]) => {
  showLoading()
  printLandlordApi(templateIds, peasantHouseholdIds).then((res) => {
    if (res) {
      uni.downloadFile({
        url: res,
        success(res) {
          const path = plus.io.convertLocalFileSystemURL(res.tempFilePath)
          YanYuprintPdf.managerPrint(path)
          hideLoading()
        },
        fail(err) {
          hideLoading()
          console.log('save err:', err)
        }
      })
    } else {
      hideLoading()
    }
  })
}

/**
 * 预览PDF
 * @param{Object} item
 * @param{Object} index
 */
const prviewImage = (item: any) => {
  printLandlordApi([item.uid], [props.dataInfo.id]).then((res: any) => {
    if (res) {
      showLoading()
      uni.downloadFile({
        url: res,
        success: function (res) {
          var filePath = res.tempFilePath
          uni.openDocument({
            filePath: filePath,
            showMenu: true,
            success: function (res) {
              hideLoading()
              console.log('打开文档成功')
            }
          })
        },
        fail(err) {
          console.log('err:', err)
          hideLoading()
        }
      })
    } else {
      hideLoading()
    }
  })
}

// 关闭弹窗
const close = (type: string) => {
  if (type === 'report') {
    reportDataPopup.value?.close()
  } else if (type === 'print') {
    printPopup.value?.close()
  }
}

onMounted(() => {
  networkCheck().then((res) => {
    netWork.value = res
  })
})
</script>

<style lang="scss" scoped>
.list-header {
  display: flex;
  height: 33rpx;
  padding: 0 6rpx 0 9rpx;
  border-bottom: 1rpx solid #e1e4ea;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;

  .list-header-lt {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 12rpx;
    height: 33rpx;

    .expand-img {
      width: 12rpx;
      height: 12rpx;
      margin-right: 4rpx;
    }
  }

  .list-header-rt {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    height: 33rpx;

    .list-header-left {
      display: flex;
      flex-direction: row;
      align-items: center;

      .name {
        margin: 0 6rpx 0 10rpx;
        font-size: 13rpx;
        color: #171718;
      }

      .account-no {
        font-size: 13rpx;
        color: #1c5df1;
      }
    }

    .list-header-right {
      display: flex;
      flex-direction: row;
      align-items: center;

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
          margin-right: 7rpx;
          background-color: #30a952;
        }

        &.report {
          background-color: #3e73ec;
        }

        .icon {
          width: 7rpx;
          height: 7rpx;
          margin-right: 3rpx;
        }

        .txt {
          font-size: 9rpx;
          color: #fff;
        }
      }
    }
  }
}

.tips-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .tips-title {
    width: 344rpx;
    height: 33rpx;
    font-size: 11rpx;
    font-weight: 600;
    line-height: 33rpx;
    color: #000;
    text-align: center;
    background: #ffffff;
    border-radius: 5rpx 5rpx 0 0;
  }

  .tips-content {
    width: 344rpx;
    height: 156rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    .tips-list {
      width: 264rpx;
      height: 88rpx;
      padding: 16rpx 19rpx;
      overflow-y: scroll;
      background-color: #fff;
      box-sizing: border-box;

      .tips-item {
        display: flex;
        font-size: 9rpx;
        line-height: 1.5;
        color: #131313;
        align-items: center;
        flex-direction: column;
      }
    }

    .tips {
      margin-top: 14rpx;
      font-size: 9rpx;
      color: #131313;
    }

    .file-list {
      width: 264rpx;
      height: 135rpx;
      overflow-y: scroll;

      .file-item {
        display: flex;
        width: 264rpx;
        height: 40rpx;
        padding: 0 14rpx;
        margin-bottom: 7rpx;
        background-color: #fff;
        border-radius: 3rpx;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-between;

        &.active {
          border: 1rpx solid #3e73ec;
        }

        .name {
          font-size: 9rpx;
          color: #131313;
        }

        .icon {
          width: 10rpx;
          height: 10rpx;
        }
      }
    }
  }
}

.device-wrapper {
  width: 344rpx;
  height: 221rpx;
  margin: 0 auto;
  vertical-align: middle;
  background-color: #f6f7f9;
  border-radius: 5rpx;

  .device-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 264rpx;
    height: 88rpx;
    padding: 16rpx 19rpx;
    overflow-y: scroll;
    background-color: #fff;
    box-sizing: border-box;
  }
}

.btn-wrapper {
  display: flex;
  width: 344rpx;
  height: 33rpx;
  padding: 0 9rpx;
  background: #fff;
  border-radius: 0 0 5rpx 5rpx;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-end;

  .btn {
    width: 52rpx;
    height: 21rpx;
    font-size: 9rpx;
    line-height: 21rpx;
    text-align: center;
    border-radius: 3rpx;

    &.cancel {
      color: rgba(0, 0, 0, 0.85);
      background: #fff;
      border: 1rpx solid #d9d9d9;
    }

    &.confirm {
      margin-left: 6rpx;
      color: #fff;
      background: #3e73ec;
    }
  }
}
</style>
