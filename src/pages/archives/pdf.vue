<template>
  <view class="content" style="display: flex">
    <div class="report-text" id="printReport" style="display: flex">
      <div style="width: 50%; border: 1px solid #000000; display: flex; flex-direction: column">
        <h1 style="font-size: 24px; text-align: center">移民协议补偿登记卡</h1>
        <div
          style="
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 20px 0 20px 0;
          "
        >
          <div style="width: 30%">
            <span style="font-weight: bold; font-size: 12px">户主姓名:</span>
            <span style="margin-left: 5px; font-size: 12px">{{ dataInfo.name }}</span>
          </div>
          <div style="width: 30%">
            <span style="font-weight: bold; font-size: 12px">户号:</span>
            <span style="margin-left: 5px; font-size: 12px">{{ dataInfo.doorNo }}</span>
          </div>
          <div style="width: 30%">
            <span style="font-weight: bold; font-size: 12px">联系方式:</span>
            <span style="margin-left: 5px; font-size: 12px">{{ dataInfo.phone }}</span>
          </div>
        </div>
        <uni-row class="m-b-10">
          <uni-col :span="12">
            <view class="col">
              <view class="label">迁前地址：</view>
              <view class="content">
                {{ formatStr(dataInfo.address) }}
              </view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">安置住址：</view>
              <view class="content">
                {{ getSettleAddressText(dataInfo.immigrantSettle?.settleAddress) }}
              </view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">开户名：</view>
              <view class="content">
                {{ formatStr(dataInfo.accountName) }}
              </view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">开户行：</view>
              <view class="content">
                {{ formatStr(dataInfo.bankName) }}
              </view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">银行账号：</view>
              <view class="content">
                {{ formatStr(dataInfo.bankAccount) }}
              </view>
            </view>
          </uni-col>
          <uni-col :span="12">
            <view class="col">
              <view class="label">家庭总人口：</view>
              <view class="content">
                {{
                  dataInfo.demographicList
                    ? formatStr(
                        dataInfo.demographicList.filter((item) => item.name != '增计人口').length
                      )
                    : '-'
                }}
              </view>
            </view>
          </uni-col>
        </uni-row>
        <view class="row-2">
          <div style="text-align: center; font-size: 14px">家庭基本情况</div>
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">姓名</th>
              <th align="left" class="uTitle">与户主关系</th>
              <th align="left" class="uTitle">身份证号</th>
              <th align="left" class="uTitle">性别</th>
              <th align="left" class="uTitle">户籍册类别</th>
              <th align="left" class="uTitle">人口性质</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <!-- 表格数据行 -->
            <tr v-for="(item, index) in dataList" :key="index">
              <td align="left" class="uTd">{{ formatStr(item.name) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.relation, 307) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.card) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.sex, 292) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.censusType, 249) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.populationNature, 263) }}</td>
              <td align="left" class="uTd">{{ `` }}</td>
            </tr>
          </table>
        </view>
        <div
          style="
            border: 1px solid #000000;
            font-size: 12px;
            display: flex;
            align-items: center;
            flex: 1;
          "
        >
          <div>制发单位（盖章）：</div>
        </div>
      </div>
      <div style="width: 50%; display: flex; flex-direction: column">
        <view class="row-3">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <th align="left" class="uTitle">类型</th>
              <th align="left" class="uTitle">项目</th>
              <th align="left" class="uTitle">单位</th>
              <th align="left" class="uTitle">数量</th>
              <th align="left" class="uTitle">单价</th>
              <th align="left" class="uTitle">金额(元)</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td align="left" class="uTd">{{ getTypeStr(item.type) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.name) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.unit, 268) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.number) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.price) }}</td>
              <td align="left" class="uTd">
                <view v-if="item.isUpdate === '0'">{{ formatStr(item.totalPrice) }}</view>
                <view v-else-if="item.isUpdate === '1'">{{ computedTotalPrice(item) }}</view>
                <view v-else-if="item.isUpdate === '2'">{{ getSummaries(item) }}</view>
              </td>
              <td align="left" class="uTd">{{ formatStr(item.remark) }}</td>
            </tr>
            <tr>
              <th align="left" class="uTitle" colspan="2">合计</th>
              <th align="left" class="uTitle">/</th>
              <th align="left" class="uTitle">/</th>
              <th align="left" class="uTitle">/</th>
              <th align="left" class="uTitle">{{ sumball() }}</th>
              <th align="left" class="uTitle">/</th>
            </tr>
          </table>
        </view>
        <div style="display: flex; align-items: center; flex: 1">
          <div style="font-size: 12px">移民户主：</div>
          <img id="signatureImg" class="signatureImg" :src="path" v-if="path" />
        </div>
      </div>
    </div>
    <div class="reportInstrument">
      <div class="reportInstrumentContent1">
        <button class="reportButton" type="info" @click="render.headelReport">导出PDF</button>
        <button class="reportButton" type="info" @click="handleClick">户主签字</button>
        <button class="reportButton" type="info" @click="handleClickToymjk">返回</button>
      </div>
    </div>
  </view>
</template>

<script>
/**
 * base64字符串转成文件
 * @param {String} base64Str // 允许包含前缀
 * @param {String} fileName // 文件名称：1663061363470.xlsx
 * @param {Object} callback  // 返回本地路径径URL，file:///xxx/doc/1663062980631.pdf
 */
function base64ToFile(base64Str, fileName, callback) {
  // 去除base64前缀

  var index = base64Str.indexOf(',')
  var base64Str = base64Str.slice(index + 1, base64Str.length)
  plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function (fs) {
    fs.root.getFile(
      fileName,
      {
        create: true
      },
      function (entry) {
        // 获得本地路径URL，file:///xxx/doc/1663062980631.pdf
        var fullPath = entry.fullPath

        let platform = uni.getSystemInfoSync().platform
        if (platform == 'android') {
          var Base64 = plus.android.importClass('android.util.Base64')
          var FileOutputStream = plus.android.importClass('java.io.FileOutputStream')
          try {
            console.log('base64Str: ', { base64Str })
            var out = new FileOutputStream(fullPath)
            let base64StrArr = []
            for (let i = 0; i < 40; i++) {
              base64StrArr.push(
                base64Str.slice((base64Str.length / 40) * i, (base64Str.length / 40) * (i + 1))
              )
            }
            let base64StrArrTostring = base64StrArr.reduce((pre, item, index) => {
              let m = Base64.decode(item, Base64.DEFAULT)
              if (m) {
                pre = pre.concat(m)
                console.log(`还有${20 - index}个`)
              } else {
                console.log('页面元素过多，超出生成限制，生成失败')
              }

              return pre
            }, [])
            console.log('base64StrArrTostring: ', { base64StrArrTostring })
            console.log('base64StrArrTostring: ', { base64StrArrTostring })
            if (!base64StrArrTostring) {
              plus.nativeUI.toast('页面元素过多，超出生成限制，生成失败')
              return false
            } else {
              out.write(base64StrArrTostring)
              out.close()
              // 回调
              callback && callback(entry.toLocalURL())
            }
          } catch (e) {
            console.log(e.message)
          }
        } else if (platform == 'ios') {
          var NSData = plus.ios.importClass('NSData')
          var nsData = new NSData()
          nsData = nsData.initWithBase64EncodedStringoptions(base64Str, 0)
          if (nsData) {
            nsData.plusCallMethod({
              writeToFile: fullPath,
              atomically: true
            })
            plus.ios.deleteObject(nsData)
          }
          // 回调
          callback && callback(entry.toLocalURL())
        }
      }
    )
  })
}
function bast64Squpt(base64Str, value = []) {
  var Base64 = plus.android.importClass('android.util.Base64')

  let base64StrArr = [
    base64Str.substr(0, Math.floor(base64Str.length / 2)),
    base64Str.substr(Math.floor(base64Str.length / 2), base64Str.length)
  ]
  // let base64StrArrTostring = base64StrArr.reduce((pre, item) => {
  // 	let m = Base64.decode(item, Base64.DEFAULT)
  // 	if (m) {
  // 		pre = pre.concat(m);
  // 	}else {
  // 		bast64Squpt(item)
  // 	}

  // 	return pre
  // }, [])
  base64StrArr.forEach((item) => {
    let m = Base64.decode(item, Base64.DEFAULT)
    if (m) {
      value = value.concat(m)
    } else {
      value = value.concat(bast64Squpt(item))
    }
  })
  console.log(value)
  return value
}
function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',')
      var type = base64[0].match(/:(.*?);/)[1]
      var str = atob(base64[1])
      var n = str.length
      var array = new Uint8Array(n)
      while (n--) {
        array[n] = str.charCodeAt(n)
      }
      return resolve(
        (window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type }))
      )
    }
    var extName = base64.split(',')[0].match(/data\:\S+\/(\S+);/)
    if (extName) {
      extName = extName[1]
    } else {
      reject(new Error('base64 error'))
    }
    var fileName = Date.now() + '.' + extName
    if (typeof plus === 'object') {
      var basePath = '_doc'
      var dirPath = 'uniapp_temp'
      var filePath = basePath + '/' + dirPath + '/' + fileName
      if (
        !biggerThan(
          plus.os.name === 'Android' ? '1.9.9.80627' : '1.9.9.80472',
          plus.runtime.innerVersion
        )
      ) {
        plus.io.resolveLocalFileSystemURL(
          basePath,
          function (entry) {
            entry.getDirectory(
              dirPath,
              {
                create: true,
                exclusive: false
              },
              function (entry) {
                entry.getFile(
                  fileName,
                  {
                    create: true,
                    exclusive: false
                  },
                  function (entry) {
                    entry.createWriter(function (writer) {
                      writer.onwrite = function () {
                        resolve(filePath)
                      }
                      writer.onerror = reject
                      writer.seek(0)
                      writer.writeAsBinary(dataUrlToBase64(base64))
                    }, reject)
                  },
                  reject
                )
              },
              reject
            )
          },
          reject
        )
        return
      }
      var bitmap = new plus.nativeObj.Bitmap(fileName)
      bitmap.loadBase64Data(
        base64,
        function () {
          bitmap.save(
            filePath,
            {},
            function () {
              bitmap.clear()
              resolve(filePath)
            },
            function (error) {
              bitmap.clear()
              reject(error)
            }
          )
        },
        function (error) {
          bitmap.clear()
          reject(error)
        }
      )
      return
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: dataUrlToBase64(base64),
        encoding: 'base64',
        success: function () {
          resolve(filePath)
        },
        fail: function (error) {
          reject(error)
        }
      })
      return
    }
    reject(new Error('not support'))
  })
}

function biggerThan(v1, v2) {
  var v1Array = v1.split('.')
  var v2Array = v2.split('.')
  var update = false
  for (var index = 0; index < v2Array.length; index++) {
    var diff = v1Array[index] - v2Array[index]
    if (diff !== 0) {
      update = diff > 0
      break
    }
  }
  return update
}
function dataUrlToBase64(str) {
  var array = str.split(',')
  return array[array.length - 1]
}
function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', path, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status === 200) {
            let fileReader = new FileReader()
            fileReader.onload = function (e) {
              resolve(e.target.result)
            }
            fileReader.onerror = reject
            fileReader.readAsDataURL(this.response)
          }
        }
        xhr.onerror = reject
        xhr.send()
        return
      }
      var canvas = document.createElement('canvas')
      var c2x = canvas.getContext('2d')
      var img = new Image()
      img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        c2x.drawImage(img, 0, 0)
        resolve(canvas.toDataURL())
        canvas.height = canvas.width = 0
      }
      img.onerror = reject
      img.src = path
      return
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(
        getLocalFilePath(path),
        function (entry) {
          entry.file(
            function (file) {
              var fileReader = new plus.io.FileReader()
              fileReader.onload = function (data) {
                resolve(data.target.result)
              }
              fileReader.onerror = function (error) {
                reject(error)
              }
              fileReader.readAsDataURL(file)
            },
            function (error) {
              reject(error)
            }
          )
        },
        function (error) {
          reject(error)
        }
      )
      return
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function (res) {
          resolve('data:image/png;base64,' + res.data)
        },
        fail: function (error) {
          reject(error)
        }
      })
      return
    }
    reject(new Error('not support'))
  })
}
function getLocalFilePath(path) {
  if (
    path.indexOf('_www') === 0 ||
    path.indexOf('_doc') === 0 ||
    path.indexOf('_documents') === 0 ||
    path.indexOf('_downloads') === 0
  ) {
    return path
  }
  if (path.indexOf('file://') === 0) {
    return path
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path)
    if (localFilePath !== path) {
      return localFilePath
    } else {
      path = path.substr(1)
    }
  }
  return '_www/' + path
}
import { routerForward, formatStr, formatDict } from '@/utils'
import { onLoad, onShow } from '@dcloudio/uni-app'
import {
  getImpLandlordItemApi,
  getCompensationCardConfigApi,
  getLandlordItemApi,
  getResettleDetail
} from '@/service'
import { apartmentArea, resettleArea } from '@/config'
export default {
  data() {
    return {
      title: 'Hello',
      path: '',
      dataInfo: {},
      dataList: [],
      tableData: [],
      uid: '',
      formatStr,
      formatDict,
      apartmentArea,
      resettleArea,
      dataLists: []
    }
  },
  onLoad(option) {
    console.log(option)
    if (option.dataInfo) {
      this.uid = option.dataInfo
      this.getLandlordDetail(option.dataInfo)
      this.getCompensationCardConfig(option.dataInfo)
    }
  },
  onShow() {
    let that = this
    that.getDataRequest()
    uni.$on('id', function (data) {
      //接受参数到ID,随意取名
      that.uid = data.dataInfo //用此页面的参数来存储
      that.getLandlordDetail(data.dataInfo)
      that.getCompensationCardConfig(data.dataInfo)
      if (data.path) {
        pathToBase64(data.path)
          .then((base64) => {
            console.log('转换成功==>', base64)
            that.path = base64
          })
          .catch((error) => {
            console.error('转换失败==>', error)
          })
      }
    })
  },
  methods: {
    savePDF(base64) {
      uni.showLoading({
        title: '导出中'
      })
      var fileName = new Date().valueOf() + '.pdf'
      // base64ToFile(base64, fileName, function (path) {
      // 	console.log('result', path);
      // 	uni.hideLoading()
      // 	uni.showModal({
      // 		title: '导出成功',
      // 		content: '文件地址:' + path +
      // 			'\n 是否打开？',
      // 		success: function (res) {
      // 			if (res.confirm) {
      // 				plus.runtime.openFile(path); //用第三方程序打开文件
      // 			} else if (res.cancel) {
      // 				console.log('用户点击取消');
      // 			}
      // 		}
      // 	});
      // })
      base64ToPath(base64)
        .then((path) => {
          console.log(path, 'path')
          this.saveImage(path)
        })
        .catch((error) => {
          console.error('临时路径转换出错了：', error)
          uni.hideLoading()
        })
    },
    handleClick() {
      routerForward('pdfqianm', { uid: this.uid })
    },
    saveImage(url) {
      uni.saveFile({
        tempFilePath: url,
        async success(res) {
          uni.openDocument({
            filePath: res.savedFilePath,
            success: function (FileRes) {
              console.log('打开成功')
              uni.hideLoading()
            }
          })
        },
        complete(res) {
          console.log(res, 'res')
          uni.hideLoading()
        }
      })
    },
    getLandlordDetail(uid) {
      getImpLandlordItemApi(uid).then((res) => {
        console.log('bbq:', res)
        this.dataInfo = { ...res }
        this.dataList = this.dataInfo.demographicList
        console.log(this.dataList)
      })
    },
    getSettleAddressText(settleAddress) {
      if (!settleAddress) return '-'
      return (
        this.dataLists.find((item) => item.id === settleAddress)?.name ||
        this.dataLists.find((item) => item.id === settleAddress)?.name
      )
    },
    getTypeStr(type) {
      switch (type) {
        case '1':
          return '补偿费'
          break
        case '2':
          return '补助费'
          break
        case '3':
          return '奖励费'
          break
        case '4':
          return '其他费用'
          break
        default:
          return ''
      }
    },
    computedTotalPrice(row) {
      if (row.totalPrice) {
        return Number(row.totalPrice)
      } else {
        if (row.number && row.price) {
          return Number(row.number) * Number(row.price)
        } else {
          return 0
        }
      }
    },
    getSummaries(row) {
      let sums = 0
      let sumIndex = 0
      this.tableData.forEach((column, index) => {
        if (column.name === row.name) {
          sumIndex = index
        }
      })
      const arr = this.tableData.filter((item, index) => item && index !== sumIndex)
      sums = arr.reduce((totalPrice, currentItem) => {
        return totalPrice + this.computedTotalPrice(currentItem)
      }, 0)
      return sums
    },
    async getCompensationCardConfig(e) {
      let res = await getCompensationCardConfigApi()
      if (res) {
        console.log('获取移民建卡奖励费列表', res)
        // tableData.value = res
        let data = await getLandlordItemApi(e)
        console.log(data, '测试dada数据')
        data.immigrantCompensationCardList.forEach((item) => {
          let index = res.findIndex((e) => e.name == item.name)
          if (index > -1) {
            res[index] = item
          } else {
            res.push(item)
          }
        })

        this.tableData = res.filter((item) => item.phType == 'PeasantHousehold')
        console.log('合并', this.tableData, res, data.immigrantCompensationCardList)
      }
    },
    sumball() {
      return this.tableData.reduce((totalPrice, currentItem) => {
        if (currentItem.isUpdate == '0') {
          totalPrice +=
            this.formatStr(currentItem.totalPrice) == '-'
              ? 0
              : this.formatStr(currentItem.totalPrice)
        } else if (currentItem.isUpdate == '1') {
          totalPrice += this.computedTotalPrice(currentItem)
        } else {
          totalPrice += this.getSummaries(currentItem)
        }
        return totalPrice
      }, 0)
    },
    handleClickToymjk() {
      uni.navigateBack()
    },
    async getDataRequest() {
      try {
        const datas = await getResettleDetail('settleAddressList')
        this.dataLists = datas
        // resettleArea.value=dataLists.value.filter((item) => item.id == props.immigrantSettle.settleAddress)
      } catch (error) {
        console.log('error', error)
      }
    }
  }
}
</script>

<script module="render" lang="renderjs">
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
	data() {
		return {

		}
	},
	mounted() {},
	methods: {
		headelReport(e, ownerVm) {
			html2Canvas(document.querySelector('#printReport'), {
				allowTaint: true, //允许污染
				taintTest: true, //在渲染前测试图片(没整明白有啥用)
				useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
      foreignObjectRendering: true
			}).then(function(canvas) {
				let contentWidth = canvas.width
				let contentHeight = canvas.height
				//一页pdf显示html页面生成的canvas高度;
				let pageHeight = contentWidth / 841.89 * 592.2
				//生成pdf的html页面高度
				let leftHeight = contentHeight
				//页面偏移
				let position = 0
				//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
				let imgWidth = 841.89
				let imgHeight = 841.89 / contentWidth * contentHeight
				// canvas.crossOrigin="anonymous";
				let pageData = canvas.toDataURL('image/png', 1.0);
				let PDF = new JsPDF('l', 'pt', 'a4')
				//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
				//当内容未超过pdf一页显示的范围，无需分页
				if (leftHeight < pageHeight) {
					PDF.addImage(pageData, 'JPEG', -10, 0, imgWidth, imgHeight)
				} else {
					while (leftHeight > 0) {
						PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
						leftHeight -= pageHeight
						position -= 592.2
						if (leftHeight > 0) {
							//避免添加空白页
							PDF.addPage()
						}
					}
				}
				var _this = this
				plus.android.requestPermissions(['android.permission.WRITE_EXTERNAL_STORAGE'], function(e) {
					if (e.deniedAlways.length > 0) { //权限被永久拒绝
						// 弹出提示框解释为何需要读写手机储存权限，引导用户打开设置页面开启
						uni.showModal({
							title: '存储权限',
							content: '您拒绝了存储权限，请去设置-应用开启存储权限。',
							success: function(res) {
								if (res.confirm) {
									// console.log('用户点击确定');
								} else if (res.cancel) {
									// console.log('用户点击取消');
								}
							}
						});
					}
					if (e.deniedPresent.length > 0) { //权限被临时拒绝
						// 弹出提示框解释为何需要读写手机储存权限，可再次调用plus.android.requestPermissions申请权限
						plus.android.requestPermissions(['android.permission.WRITE_EXTERNAL_STORAGE'])
						// console.log('666666666 ' + e.deniedPresent.toString());
					}
					if (e.granted.length > 0) { //权限被允许
						//调用依赖获取读写手机储存权限的代码
						let base64Str = PDF.output('dataurlstring');
						// console.log("base64Str: ", base64Str);
						ownerVm.callMethod('savePDF', base64Str)
					}
				}, function(e) {
					// console.log('R12133313221' + JSON.stringify(e));
				});
			})
		}
	}
};
</script>
<style scoped lang="scss">
.content {
  height: 100%;
}

.report-text {
  box-sizing: border-box;
  width: 300mm;
  height: 100%;
  padding: 20px;
}

.col {
  display: flex;
  flex-direction: row;

  .label {
    font-size: 12px;
    color: rgba(23, 23, 24, 0.6);
  }

  .content {
    font-size: 12px;
    color: #171718;

    &.blue {
      color: #3e73ec;
    }
  }
}

.row-2 {
  font-size: 12px;

  .uTable {
    font-size: 12px;
  }

  .uTitle {
    font-size: 12px;
    font-weight: 400;
    color: #737374;
  }

  .uTd {
    font-size: 12px;
    font-weight: 400;
    color: #171718;
  }
}

.row-3 {
  width: 100%;
  font-size: 12px;

  .uTable {
    font-size: 12px;
  }

  .uTitle {
    font-size: 12px;
    font-weight: 400;
    color: #737374;
  }

  .uTd {
    font-size: 12px;
    font-weight: 400;
    color: #171718;
  }
}

.signatureImg {
  width: 50%;
  height: 50%;
  background-color: #fff;
  object-fit: cover;
}
</style>
