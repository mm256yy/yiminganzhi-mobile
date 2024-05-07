<template>
  <view class="list-header">
    <view class="list-header-rt">
      <view class="list-header-left">
        <view class="name">{{ dataInfo.name }}</view>
        <view class="account-no"
          >{{ dataInfo.doorNo.includes('jl') ? dataInfo.doorNo.slice(2) : dataInfo.doorNo }}
        </view>
        <view class="fill-number">
          表单填报&nbsp;
          <text class="green">{{ fillNumber }}</text>
          /{{ totalFillNumber }}
        </view>
      </view>

      <view class="list-header-right">
        <view class="btn-wrapper print" v-if="showPrint" @click="printFile">
          <image class="icon" src="@/static/images/icon_print.png" mode="scaleToFill" />
          <text class="txt">打印</text>
        </view>
        <view
          v-if="
            !dataInfo.signStatus ||
            dataInfo.signStatus === 'UnSign' ||
            !dataInfo.reportStatus ||
            dataInfo.reportStatus === 'UnReport'
          "
          class="btn-wrapper report"
          @click="handelopen"
        >
          <image class="icon" src="@/static/images/qianzi_icon.png" mode="scaleToFill" />
          <text class="txt">进度上报</text>
        </view>
        <view v-else class="btn-wrapper report">
          <image class="icon" src="@/static/images/qianzi_icon.png" mode="scaleToFill" />
          <text class="txt">上报完成</text>
        </view>
      </view>
    </view>

    <!-- 进度上报 -->
    <!-- <uni-popup ref="listDataPopup" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">进度上报</view>
        <view
          v-if="!dataInfo.signStatus || dataInfo.signStatus === 'UnSign'"
          class="btn-wrapper report"
          @click="tableSign"
        >
          <image class="icon" src="@/static/images/qianzi_icon.png" mode="scaleToFill" />
          <text class="txt">报表签字</text>
        </view>
        <view
          v-if="!dataInfo.reportStatus || dataInfo.reportStatus === 'UnReport'"
          class="btn-wrapper report"
          @click="reportDataCheck"
        >
          <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
          <text class="txt">填报完成</text>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="handelclose">取消</view>
        </view>
      </view>
    </uni-popup> -->
    <uni-popup ref="listDataPopup" :is-mask-click="false">
      <view class="tips-wrappers">
        <view class="tips-title">进度上报</view>
        <view class="tips-content">
          <view class="file-list" :prop="options" :change:prop="print.getPdf">
            <view
              class="file-items"
              v-if="!dataInfo.signStatus || dataInfo.signStatus === 'UnSign'"
              @click="tableSign"
            >
              <image class="icon" src="@/static/images/qianzi_icon.png" mode="scaleToFill" />
              <view class="name">报表签字</view>
            </view>
            <view
              class="file-items"
              v-if="!dataInfo.reportStatus || dataInfo.reportStatus === 'UnReport'"
              @click="reportDataCheck"
            >
              <image class="icon" src="@/static/images/icon_report.png" mode="scaleToFill" />
              <view class="name">填报完成</view>
            </view>
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="handelclose">取消</view>
        </view>
      </view>
    </uni-popup>
    <!-- 填报完成 -->
    <uni-popup ref="reportDataPopup" :is-mask-click="false">
      <view class="tips-wrappers">
        <view class="tips-title">填报完成</view>
        <view :class="['tips-content', tipsList.length === 0 ? 'completed-report' : '']">
          <view class="tips-list" v-if="tipsList && tipsList.length">
            <view class="tips-item" v-for="(item, index) in tipsList" :key="index">
              {{ item }}
            </view>
          </view>
          <view class="tips" v-if="tipsList && tipsList.length">
            <uni-icons type="info-filled" color="#FF4242" />
            以上信息还未填写，是否继续上报数据？
          </view>
          <view class="tips" v-else>
            <uni-icons type="info-filled" color="#333" />
            所有数据均已填写，是否继续上报数据？
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="close('report')">取消</view>
          <view class="btn confirm" @click="confirm('report')">确认</view>
        </view>
      </view>
    </uni-popup>

    <!-- 打印 -->
    <uni-popup ref="printPopup" :is-mask-click="false">
      <view class="tips-wrapper">
        <view class="tips-title">打印</view>
        <view class="tips-content">
          <view class="file-list" :prop="options" :change:prop="print.getPdf">
            <view v-for="(item, index) in fileList" :key="item.uid" class="file-item">
              <view class="name">{{ item.name }}</view>
              <view class="btns">
                <image
                  class="icon"
                  src="@/static/images/icon_view_file.png"
                  mode="scaleToFill"
                  @click.stop="prviewImage(item)"
                />
                <image
                  class="icon"
                  src="@/static/images/print.png"
                  mode="scaleToFill"
                  @click.stop="printImage(item)"
                />
              </view>
            </view>
          </view>
        </view>
        <view class="btn-wrapper">
          <view class="btn cancel" @click="close('print')">取消</view>
        </view>
      </view>
    </uni-popup>

    <!--报表签字二次确认-->
    <uni-popup ref="signConfirmRef" type="dialog">
      <uni-popup-dialog
        type="warn"
        cancelText="取消"
        confirmText="确认"
        title="提示"
        content="是否确认报表签字？"
        @confirm="signConfirm"
        @close="closeSignConfirm"
      />
    </uni-popup>
  </view>
</template>

<script lang="ts">
import { StorageKey, getCurrentTimeStamp, getStorage } from '@/utils'
import { reportDataApi, getPrintTemplatesApi, getPrintLandlordApi, signDataApi } from '@/service'
import { ERROR_MSG, SUCCESS_MSG, showToast } from '@/config/msg'
import { MainType, PrintType } from '@/types/common'
import { base64ToPath } from 'image-tools'
const YanYuprintPdf = uni.requireNativePlugin('YanYu-PrintPDF')

interface PrintListType {
  name: string
  url: string
  uid: number
}

interface DataType {
  selectedTemplateIds: string[]
  tipsList: string[]
  fileList: PrintListType[]
  options: any
  pdfFileCache: any
  actionType: 'preview' | 'print'
  currentPdfItem: PrintListType | null
  [key: string]: any
}
export default {
  data() {
    return {
      selectedTemplateIds: [],
      tipsList: [],
      fileList: [],
      options: {}, // 打印配置
      pdfFileCache: {}, // 生成的pdf缓存
      actionType: 'preview', // 操作类型 预览/打印
      currentPdfItem: null
    } as DataType
  },
  props: {
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
  },
  computed: {
    totalFillNumber: function () {
      switch (this.type) {
        case MainType.PeasantHousehold:
          return 9
          break
        case MainType.Company:
          return 7
          break
        case MainType.IndividualHousehold:
          return 6
          break
        case MainType.Village:
          return 7
          break
        default:
          return 9
          break
      }
    },
    fillNumber: function () {
      const {
        demographicList,
        immigrantAppendantList,
        immigrantGraveList,
        immigrantHouseList,
        immigrantIncomeList,
        immigrantTreeList,
        immigrantWill,
        immigrantManagementList,
        immigrantEquipmentList,
        immigrantFacilitiesList,
        type,
        immigrantFile
      } = this.dataInfo

      let fillCount = 1
      if (this.isNotNullArray(immigrantHouseList)) {
        fillCount++
      }
      if (this.isNotNullArray(immigrantTreeList)) {
        fillCount++
      }
      if (this.isNotNullArray(immigrantAppendantList)) {
        fillCount++
      }
      // 上报开始校验数据
      if (type === MainType.PeasantHousehold) {
        // 居民户
        if (this.isNotNullArray(demographicList)) {
          fillCount++
        }
        if (this.isNotNullArray(immigrantIncomeList)) {
          fillCount++
        }

        if (immigrantWill && (immigrantWill.productionType || immigrantWill.removalType)) {
          fillCount++
        }
        if (this.isNotNullArray(immigrantGraveList)) {
          fillCount++
        }
        if (immigrantFile && immigrantFile.otherPic && immigrantFile.otherPic !== '[]') {
          fillCount++
        }
      } else if (type === MainType.IndividualHousehold) {
        // 个体户
        if (this.isNotNullArray(immigrantEquipmentList)) {
          fillCount++
        }
        if (immigrantFile && immigrantFile.otherPic && immigrantFile.otherPic !== '[]') {
          fillCount++
        }
      } else if (type === MainType.Company) {
        // 企业
        if (immigrantFile && immigrantFile.otherPic && immigrantFile.otherPic !== '[]') {
          fillCount++
        }
        if (this.isNotNullArray(immigrantManagementList)) {
          fillCount++
        }
        if (this.isNotNullArray(immigrantEquipmentList)) {
          fillCount++
        }
      } else if (type === MainType.Village) {
        // 村集体
        if (this.isNotNullArray(immigrantGraveList)) {
          fillCount++
        }
        if (this.isNotNullArray(immigrantFacilitiesList)) {
          fillCount++
        }
        if (immigrantFile && immigrantFile.otherPic && immigrantFile.otherPic !== '[]') {
          fillCount++
        }
      }
      return fillCount
    }
  },
  watch: {
    dataInfo: function (val, old) {
      // 切换业主时 清理缓存
      if (JSON.stringify(val) === JSON.stringify(old)) {
        return
      }
      this.pdfFileCache = {}
      this.options = {}
      this.currentPdfItem = null
    }
  },
  methods: {
    // filterViewDoorNoMd(data: any) {
    //   return filterViewDoorNo(data)
    // },
    // 是否为空数组
    isNotNullArray(arr: any) {
      return arr && Array.isArray(arr) && arr.length
    },
    openSignConfirm() {
      const ref = this.$refs.signConfirmRef as any
      ref.open()
    },
    signConfirm() {
      console.log(getStorage(StorageKey.PROJECTINFO) || {})

      signDataApi(this.dataInfo.uid)
        .then((res) => {
          if (res) {
            showToast(SUCCESS_MSG)
            this.closeSignConfirm()
            this.$emit('updateData')
          }
        })
        .catch(() => {
          showToast(ERROR_MSG)
        })
    },
    closeSignConfirm() {
      const ref = this.$refs.signConfirmRef as any
      ref.close()
    },
    // 报表签字
    tableSign() {
      this.openSignConfirm()
    },
    // 数据上报校验
    reportDataCheck() {
      let query = {
        uid: this.dataInfo.uid,
        isCheck: true,
        type: this.type as MainType
      }
      reportDataApi(query)
        .then((res: any) => {
          if (res) {
            this.tipsList = res
            ;(this.$refs.reportDataPopup as any)?.open()
          }
        })
        .catch((e) => {
          showToast(ERROR_MSG)
        })
    },
    // 数据上报
    reportData() {
      let query = {
        uid: this.dataInfo.uid,
        isCheck: false,
        type: this.type as MainType
      }
      reportDataApi(query)
        .then((res: any) => {
          if (res) {
            showToast(SUCCESS_MSG)
            this.$emit('updateData')
          }
          this.close('report')
        })
        .catch((e) => {
          // console.log('上报报错：', e)
          showToast(ERROR_MSG)
          this.close('report')
        })
    },

    /**
     * 获取打印模板列表
     * @params{Object} templateType 打印的模板类别
     */
    async getPrintList(templateType: PrintType) {
      const res = await getPrintTemplatesApi(templateType)
      if (res && res.length) {
        const arr: PrintListType[] = []
        res.map((item: any) => {
          if (item.templateModule === '实物采集') {
            arr.push({
              name: item.templateName,
              url: '',
              uid: item.uid
            })
          }
        })
        this.fileList = arr
        console.log(res)
      }
    },

    // 打印文件/图片
    printFile() {
      this.getPrintList(this.templateType as PrintType)
      ;(this.$refs.printPopup as any)?.open()
    },

    // 确认 数据上报/打印
    confirm(type: string) {
      if (type === 'report') {
        this.reportData()
      }
    },

    prviewImage(item: any) {
      // 预览
      this.actionType = 'preview'
      this.currentPdfItem = item
      const filePath = this.pdfFileCache[item.uid]
      if (filePath) {
        this.actionPdf(filePath)
        return
      }
      uni.hideLoading()
      uni.showLoading({
        title: '生成中...',
        mask: true
      })
      this.getData([this.dataInfo.uid], [item.uid])
    },

    printImage(item: any) {
      // 打印
      this.actionType = 'print'
      this.currentPdfItem = item
      const filePath = this.pdfFileCache[item.uid]
      if (filePath) {
        this.actionPdf(filePath)
        return
      }
      uni.hideLoading()
      uni.showLoading({
        title: '生成中...',
        mask: true
      })
      this.getData([this.dataInfo.uid], [item.uid])
    },

    /**
     * 打印pdf
     */
    async getData(peasantHouseholdIds: string[], templateIds: number[]) {
      const landlordArray = await getPrintLandlordApi(peasantHouseholdIds, templateIds).catch(
        (err) => {
          console.log(err, 'getDat-err')
          uni.hideLoading()
          uni.showToast({
            title: '生成失败',
            icon: 'none'
          })
          return
        }
      )
      if (!landlordArray || !landlordArray.length) {
        uni.hideLoading()
        uni.showToast({
          title: '生成失败',
          icon: 'none'
        })
        return
      }
      // console.log(landlordArray, 'landlordArray')

      const projectInfo = getStorage(StorageKey.PROJECTINFO) || {}
      this.options = {
        landlords: landlordArray,
        projectInfo,
        templateIds,
        type: this.templateType,
        timeStamp: getCurrentTimeStamp()
      }
    },

    actionPdf(filePath: string) {
      if (this.actionType === 'preview') {
        // 预览
        uni.openDocument({
          filePath: filePath,
          showMenu: true,
          success: function (res) {
            console.log('打开文档成功')
          },
          fail: (err) => {
            console.log(err, '出错了')
            this.getPrintErrorResult()
          }
        })
      } else {
        // 打印pdf 将临时路径转化成绝对路径
        const path = plus.io.convertLocalFileSystemURL(filePath)
        YanYuprintPdf.managerPrint(path)
      }
    },
    getPrintErrorResult(err?: any) {
      uni.hideLoading()
      uni.showToast({
        title: '生成pdf失败',
        icon: 'error'
      })
    },
    getPrintResult(result: any[]) {
      console.log('result:', result)
      // 拿到打印结果
      const base64Str = result[0][0]
      console.log(base64Str, '测试base')
      if (!base64Str) {
        uni.hideLoading()
        showToast('生成pdf失败')
        return
      }
      // const index = base64Str.indexOf(',')
      // const base64 = base64Str.slice(index + 1, base64Str.length)
      //Base64可通过Canvas、html2canvas、jspdf等生成的字符串，不包含文件类型前缀
      //1.根据Base64生成文件：第二个参数是文件名称，如果不传入路径，则默认保存在Download文件夹,返回文件的绝对路径
      // const fileName = `${
      //   this.templateType === PrintType.print
      //     ? '居民户'
      //     : this.templateType === PrintType.printCompany
      //     ? '企业'
      //     : '个体户'
      // }_${this.dataInfo.name}_${new Date().getTime()}`

      // const filePath = printpdfModule.saveBase64File(base64, `${fileName}.pdf`)

      base64ToPath(base64Str)
        .then((filePath: string) => {
          console.log(filePath, 'base64ToPath-path')

          if (this.currentPdfItem) {
            this.pdfFileCache[this.currentPdfItem.uid] = filePath
          }
          //2.打印pdf
          //可传绝对路径，如果只传文件名则默认在下载目录下查找
          console.log(filePath, 'filePath')
          // printpdfModule.deleteFile("test.pdf");
          uni.hideLoading()
          let that = this
          plus.android.requestPermissions(
            ['android.permission.WRITE_EXTERNAL_STORAGE'],
            function (e) {
              if (e.deniedAlways.length > 0) {
                //权限被永久拒绝
                // 弹出提示框解释为何需要读写手机储存权限，引导用户打开设置页面开启
                uni.showModal({
                  title: '存储权限',
                  content: '您拒绝了存储权限，请去设置-应用开启存储权限。',
                  success: function (res) {
                    if (res.confirm) {
                      // console.log('用户点击确定');
                    } else if (res.cancel) {
                      // console.log('用户点击取消');
                    }
                  }
                })
              }
              if (e.deniedPresent.length > 0) {
                //权限被临时拒绝
                // 弹出提示框解释为何需要读写手机储存权限，可再次调用plus.android.requestPermissions申请权限
                plus.android.requestPermissions(['android.permission.WRITE_EXTERNAL_STORAGE'])
                // console.log('666666666 ' + e.deniedPresent.toString());
              }
              console.log(e, 'e是啥?')
              if (e.granted.length > 0) {
                //权限被允许
                //调用依赖获取读写手机储存权限的代码
                if (that.actionType === 'preview') {
                  // 预览
                  uni.openDocument({
                    filePath: filePath,
                    showMenu: true,
                    success: function (res) {
                      console.log('打开文档成功')
                    },
                    fail: (err) => {
                      console.log(err, '出错了')
                      that.getPrintErrorResult()
                    }
                  })
                } else {
                  // 打印pdf 将临时路径转化成绝对路径
                  const path = plus.io.convertLocalFileSystemURL(filePath)
                  YanYuprintPdf.managerPrint(path)
                }
              }
            },
            function (e) {
              // console.log('R12133313221' + JSON.stringify(e));
            }
          )
        })
        .catch((err: any) => {
          this.getPrintErrorResult()
          console.log(err, 'base64ToPath-err')
        })
    },

    // 关闭弹窗
    close(type: string) {
      if (type === 'report') {
        ;(this.$refs.reportDataPopup as any)?.close()
      } else if (type === 'print') {
        // 关闭打印弹窗 清理掉缓存的业主信息
        this.options.landlords = []
        ;(this.$refs.printPopup as any)?.close()
      }
    },
    handelopen() {
      ;(this.$refs.listDataPopup as any)?.open()
    },
    handelclose() {
      ;(this.$refs.listDataPopup as any)?.close()
    }
  }
}
</script>

<script module="print" lang="renderjs">
import { printPdf } from '@/print'

export default {
  methods: {
    getPdf(newValue, oldValue, ownerInstance, instance) {
      console.log('触发了属性变更')
      try {
        // 拿到业主详情
        // 根据模版id生成对应的pdf 拿到base64
        const {
          landlords,
          projectInfo,
          templateIds,
          type
        } = newValue
        console.log(projectInfo,'数据信息')
        if (!landlords || !landlords.length) {
          console.log('landlords数据为空')
          return
        }
        if (!templateIds || !templateIds.length) {
          console.log('templateIds数据为空')
          return
        }

        const promiseArray = []
        if(landlords){
              landlords.forEach((landlord) => {
          if (type === 'print') {
            promiseArray.push(printPdf.createPeople(templateIds, landlord, projectInfo))
          } else if (type === 'printIndividualHousehold') {
            promiseArray.push(printPdf.createSelfemployed(templateIds, landlord, projectInfo))
          } else if (type === 'printCompany') {
            promiseArray.push(printPdf.createCompany(templateIds, landlord, projectInfo))
          } else if (type === 'printCollective') {
						promiseArray.push(printPdf.createCollective(templateIds, landlord, projectInfo))
					}
        })
        }
        console.log(promiseArray);
        // 并行生成
        Promise.all(promiseArray)
          .then((result) => {
            // [['',''], ['', '']] 两个业主返回的数据结构
            // [['']] 单个业主 单个模版的数据结构
            ownerInstance.callMethod('getPrintResult', result)
          })
          .catch((err) => {
            console.error(err, '-errr')
            ownerInstance.callMethod('getPrintErrorResult', err)
          })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
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

      .fill-number {
        display: flex;
        height: 24rpx;
        padding: 0 18rpx;
        margin-left: 14rpx;
        font-size: 11rpx;
        font-weight: 500;
        color: #171718;
        background-color: #e1f0ff;
        border-radius: 28rpx;
        align-items: center;
        justify-content: center;

        .green {
          color: #30a952;
        }
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
          color: #fff;
        }
      }
    }
  }
}

.tips-wrapper {
  width: 344rpx;
  height: 321rpx;
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
    height: 256rpx;
    padding: 14rpx 40rpx;
    background: #f6f7f9;
    box-sizing: border-box;

    &.completed-report {
      height: 68rpx;
      padding: 30rpx 59rpx;
    }

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
      height: 235rpx;
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

        .btns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 44rpx;

          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 8rpx;
          }
        }
      }
      .file-items {
        display: flex;
        width: 264rpx;
        height: 40rpx;
        padding: 0 14rpx;
        margin-bottom: 7rpx;
        background-color: #3e73ec;
        border-radius: 3rpx;
        box-sizing: border-box;
        align-items: center;

        &.active {
          border: 1rpx solid #3e73ec;
        }

        .name {
          font-size: 9rpx;
          color: #f6f7f9;
        }

        .icon {
          width: 14rpx;
          height: 14rpx;
          margin-left: 8rpx;
        }
      }
    }
  }
}
.tips-wrappers {
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

    &.completed-report {
      height: 68rpx;
      padding: 30rpx 59rpx;
    }

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

        .btns {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 44rpx;

          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 8rpx;
          }
        }
      }
      .file-items {
        display: flex;
        width: 264rpx;
        height: 40rpx;
        padding: 0 14rpx;
        margin-bottom: 7rpx;
        background-color: #3e73ec;
        border-radius: 3rpx;
        box-sizing: border-box;
        align-items: center;

        &.active {
          border: 1rpx solid #3e73ec;
        }

        .name {
          font-size: 9rpx;
          color: #f6f7f9;
        }

        .icon {
          width: 14rpx;
          height: 14rpx;
          margin-left: 8rpx;
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
