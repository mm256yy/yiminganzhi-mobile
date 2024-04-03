<template>
  <view class="content" style="display: flex">
    <div class="report-text" id="printReport" style="display: flex">
      <div
        v-if="id == 1"
        style="
          width: 100%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">生产安置确认单</h1>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 16px">
            {{
              `${baseInfo.areaCodeText || ''} ${baseInfo.townCodeText || ''} ${
                baseInfo.villageCodeText || ''
              } ${baseInfo.name || ''} 户号
                        ${baseInfo.showDoorNo || ''} `
            }}</div
          >
          <div style="font-size: 16px">{{ dayjs(new Date()).format('YYYY年MM月DD日') }}</div>
        </div>
        <view class="row-2">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">姓名</th>
              <th align="left" class="uTitle">与户主关系</th>
              <th align="left" class="uTitle">身份证号</th>
              <th align="left" class="uTitle" v-if="baseInfo.type != 'LandNoMove'">人口性质</th>
              <th align="left" class="uTitle" v-else>联系方式</th>
              <th align="left" class="uTitle">安置类型</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <!-- 表格数据行 -->
            <tr
              v-for="(item, index) in dataList.filter(
                (item) => item.name != '增计人口' && item.isDelete != '1'
              )"
              :key="index"
            >
              <td align="left" class="uTd">{{ formatStr(item.name) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.relation, 307) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.card) }}</td>
              <td align="left" class="uTd" v-if="baseInfo.type != 'LandNoMove'">{{
                formatDict(item.populationNature, 263)
              }}</td>
              <td align="left" class="uTd" v-else>{{ formatStr(item.phone) }}</td>
              <td align="left" class="uTd">{{ formatDict(item.settingWay, 375) }}</td>
              <td align="left" class="uTd">{{ `` }}</td>
            </tr>
            <tr style="height: 100px">
              <td colspan="3"
                >户主代表或收委托人(签名)：<img
                  id="signatureImg"
                  class="signatureImg"
                  :src="path"
                  v-if="path"
              /></td>

              <td colspan="3">联系移民干部(签名)：</td>
            </tr>
          </table>
        </view>
      </div>
      <div
        v-if="id == 2"
        style="
          width: 100%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">选房确认单</h1>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 16px">
            {{
              `${baseInfo.areaCodeText} ${baseInfo.townCodeText} ${baseInfo.villageCodeText} ${baseInfo.name} 户号
                        ${baseInfo.showDoorNo} `
            }}</div
          >
          <div style="font-size: 16px">{{ dayjs(new Date()).format('YYYY年MM月DD日') }}</div>
        </div>
        <view class="row-2">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">序号</th>
              <th align="left" class="uTitle">区块</th>
              <th align="left" class="uTitle">房型</th>
              <th align="left" class="uTitle">幢号-室号</th>
              <th align="left" class="uTitle">储藏室编号</th>
              <th align="left" class="uTitle">车库编号</th>
            </tr>
            <!-- 表格数据行 -->
            <tr v-for="(item, index) in dataList" :key="index">
              <td align="left" class="uTd">{{ index + 1 }}</td>
              <td align="left" class="uTd">{{ getSettleAddress(item) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.area) }} </td>
              <td align="left" class="uTd">{{ item.roomNo }}</td>
              <td align="left" class="uTd"> {{ dictOption(storeroomNoList, item.storeroomNo) }}</td>
              <td align="left" class="uTd">{{ dictOption(carNoList, item.carNo) }}</td>
            </tr>
            <tr style="height: 100px">
              <td colspan="3">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <div>户主代表或收委托人(签名)：</div>
                  <img id="signatureImg" class="signatureImg" :src="path" v-if="path" />
                </div>
              </td>
              <td colspan="3">联系移民干部(签名)：</td>
            </tr>
          </table>
        </view>
      </div>
      <div
        v-if="id == 3"
        style="
          width: 100%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">选址确认单</h1>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 16px">
            {{
              `${baseInfo.areaCodeText || ''} ${baseInfo.townCodeText || ''} ${
                baseInfo.villageCodeText || ''
              } ${baseInfo.name || ''} 户号
                        ${baseInfo.showDoorNo} `
            }}</div
          >
          <div style="font-size: 16px">{{ dayjs(new Date()).format('YYYY年MM月DD日') }}</div>
        </div>
        <div v-if="show" style="font-size: 16px; margin-top: 20px"
          >已完成宅基地基础建设，特此告知。</div
        >
        <view class="row-2">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">序号</th>
              <th align="left" class="uTitle">区块</th>
              <th align="left" class="uTitle">类型</th>
              <th align="left" class="uTitle">地块编号</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <!-- 表格数据行 -->
            <tr v-for="(item, index) in dataList" :key="index">
              <td align="left" class="uTd">{{ index + 1 }}</td>
              <td align="left" class="uTd">{{ getSettleAddress(item) }}</td>
              <td align="left" class="uTd">{{ formatStr(item.area) }} </td>
              <!-- <td align="left" class="uTd">{{ dictOption(landNoList, item.landNo) }}</td> -->
              <td align="left" class="uTd">{{ formatStr(item.landNo) }}</td>
              <td align="left" class="uTd"></td>
            </tr>
            <tr style="height: 100px">
              <td colspan="3">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <div>户主代表或收委托人(签名)：</div>
                  <img id="signatureImg" class="signatureImg" :src="path" v-if="path" />
                </div>
              </td>
              <td colspan="2">联系移民干部(签名)：</td>
            </tr>
          </table>
        </view>
      </div>
      <div
        v-if="id == 4"
        style="
          width: 100%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">搬迁安置确认单</h1>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 16px">
            {{
              `${baseInfo.areaCodeText || ''} ${baseInfo.townCodeText || ''} ${
                baseInfo.villageCodeText || ''
              } ${baseInfo.name || ''} 户号
                        ${baseInfo.showDoorNo} `
            }}</div
          >
          <div style="font-size: 16px">{{ dayjs(new Date()).format('YYYY年MM月DD日') }}</div>
        </div>
        <view class="row-2">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">序号</th>
              <th align="left" class="uTitle">区块</th>
              <th align="left" class="uTitle">类型</th>
              <th align="left" class="uTitle">户型/套型</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <!-- 表格数据行 -->
            <div v-if="baseInfo.houseAreaType == 'homestead' || baseInfo.houseAreaType == 'flat'">
              <tr v-for="(item, index) in dataList" :key="index">
                <td align="left" class="uTd">{{ index + 1 }}</td>
                <td align="left" class="uTd">{{ item.settleAddressText }}</td>
                <td align="left" class="uTd">{{ item.houseTypeText }} </td>
                <td align="left" class="uTd">{{ item.area }}</td>
                <td align="left" class="uTd"></td>
              </tr>
            </div>
            <div
              style="
                height: 100px;
                width: 100%;
                display: flex;
                justify-content: end;
                align-items: center;
                font-size: 16px;
              "
              v-else
            >
              <span>{{
                baseInfo.houseAreaType == 'oneself'
                  ? '该户选择自谋职业'
                  : `该户选择集中供养（选择养老院:${formatDict(
                      baseInfo.simulateImmigrantSettle?.nursingHome,
                      416
                    )}）`
              }}</span>
            </div>

            <tr style="height: 100px">
              <td colspan="3">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <div>户主代表或收委托人(签名)：</div>
                  <img id="signatureImg" class="signatureImg" :src="path" v-if="path" />
                </div>
              </td>
              <td colspan="2">联系移民干部(签名)：</td>
            </tr>
          </table>
        </view>
      </div>
      <div
        v-if="id == 5 || id == 6"
        style="
          width: 100%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">{{
          id == 6 ? '坟墓择址坟确认单' : '坟墓确认单'
        }}</h1>
        <div style="display: flex; justify-content: space-between">
          <div style="font-size: 16px">
            {{
              `${baseInfo.areaCodeText} ${baseInfo.townCodeText} ${baseInfo.villageCodeText} ${baseInfo.name} 户号
                        ${baseInfo.showDoorNo} `
            }}</div
          >
          <div style="font-size: 16px">{{ dayjs(new Date()).format('YYYY年MM月DD日') }}</div>
        </div>
        <view class="row-2">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <!-- 表头行 -->
            <tr>
              <th align="left" class="uTitle">坟墓与登记人关系</th>
              <th align="left" class="uTitle">数量</th>
              <th align="left" class="uTitle">处理方式</th>
              <th align="left" class="uTitle">安置公墓/择址地址</th>
              <th align="left" class="uTitle">编号</th>
              <th align="left" class="uTitle">备注</th>
            </tr>
            <!-- 表格数据行 -->
            <tr v-for="(item, index) in dataList" :key="index">
              <td align="left" class="uTd">{{ formatDict(item.relation, 307) }}</td>
              <td align="left" class="uTd">{{ item.number }}</td>
              <td align="left" class="uTd">{{ formatDict(item.handleWay, 238) }} </td>
              <td align="left" class="uTd">{{
                item.handleWay === '1' ? item.settingAddress : formatDict(item.settingGrave, 377)
              }}</td>
              <td align="left" class="uTd">{{ formatStr(item.graveNo) }}</td>
              <td align="left" class="uTd"></td>
            </tr>
            <tr style="height: 100px">
              <td colspan="3">
                <div style="display: flex; justify-content: space-between; align-items: center">
                  <div>户主代表或收委托人(签名)：</div>
                  <img id="signatureImg" class="signatureImg" :src="path" v-if="path" />
                </div>
              </td>
              <td colspan="2">联系移民干部(签名)：</td>
            </tr>
          </table>
        </view>
      </div>
      <div
        v-if="id > 6"
        id="printReports"
        style="
          width: 50%;
          border: 1px solid #000000;
          display: flex;
          flex-direction: column;
          padding: 10px;
        "
      >
        <h1 style="font-size: 24px; text-align: center">{{
          id == 7 ? '房屋腾空确认单' : id == 8 ? '土地腾让确认单' : '过渡安置确认单'
        }}</h1>
        <view class="row-4">
          <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" class="uTd">{{
                baseInfo.type == 'Company'
                  ? '企业名称'
                  : baseInfo.type == 'IndividualHousehold'
                  ? '个体户名称'
                  : baseInfo.type == 'PeasantHousehold'
                  ? '户主姓名'
                  : baseInfo.type == 'Village'
                  ? '村集体名称'
                  : '户主名称'
              }}</td>
              <td align="center" class="uTd">{{ baseInfo.name }}</td>
              <td align="center" class="uTd">{{
                baseInfo.type == 'Company'
                  ? '企业编码'
                  : baseInfo.type == 'IndividualHousehold'
                  ? '个体户编码'
                  : baseInfo.type == 'PeasantHousehold'
                  ? '户号'
                  : baseInfo.type == 'Village'
                  ? '村集体编码'
                  : '户号'
              }}</td>
              <td align="center" class="uTd">{{ baseInfo.showDoorNo || baseInfo.doorNo }}</td>
            </tr>
            <tr v-if="baseInfo.type == 'PeasantHousehold'">
              <td align="center" class="uTd">户内人口</td>
              <td align="center" class="uTd"> {{ baseInfo.demographicList?.filter((item) => item.name != '增计人口' && item.isDelete !== '1').length || 1}}</td>
              
              <td align="center" class="uTd">联系方式</td>
              <td align="center" class="uTd">{{ baseInfo.phone }}</td>
            </tr>
            <tr>
              <td align="center" class="uTd">迁出地</td>
              <td align="center" class="uTd" colspan="3"> {{ baseInfo.address }}</td>
            </tr>
            <tr>
              <td align="center" class="uTd" colspan="4"
                >{{ id == 7 ? '房屋腾让情况' : id == 8 ? '土地腾让情况' : '过渡去向情况' }}
              </td>
            </tr>
            <tr v-if="id == 9">
              <td align="center" class="uTd">过渡安置地详址</td>
              <td align="center" class="uTd" colspan="3">
                {{ baseInfo.immigrantExcess?.excessAddress }}</td
              >
            </tr>
            <tr>
              <td align="center" class="uTd" rowspan="2">{{
                baseInfo.type == 'Company'
                  ? '企业意见'
                  : baseInfo.type == 'IndividualHousehold'
                  ? '个体户意见'
                  : baseInfo.type == 'PeasantHousehold'
                  ? '移民户主意见'
                  : baseInfo.type == 'Village'
                  ? '村集体意见'
                  : '户主意见'
              }}</td>
              <td align="center" class="uTd" colspan="3" v-if="id == 7">{{
                baseInfo.immigrantHouseEmpty ? baseInfo.immigrantHouseEmpty.houseEmptyOpinion : ''
              }}</td>
              <td align="center" class="uTd" colspan="3" v-if="id == 8">{{
                baseInfo.immigrantLandEmpty ? baseInfo.immigrantLandEmpty.landEmptyOpinion : ''
              }}</td>
              <td align="center" class="uTd" colspan="3" v-if="id == 9">{{
                baseInfo.immigrantExcess ? baseInfo.immigrantExcess.landEmptyOpinion : ''
              }}</td>
            </tr>
            <tr>
              <td align="left" class="uTd" colspan="3"
                >{{
                  baseInfo.type == 'Company'
                    ? '企业盖章'
                    : baseInfo.type == 'IndividualHousehold'
                    ? '个体户盖章'
                    : baseInfo.type == 'PeasantHousehold'
                    ? '移民户主'
                    : baseInfo.type == 'Village'
                    ? '村集体盖章'
                    : '移民户主'
                }}:<img id="signatureImg" class="signatureImgs" :src="path" v-if="path"
              /></td>
            </tr>
            <tr>
              <td align="center" class="uTd" rowspan="2">移民工作组验收意见</td>
              <td align="center" class="uTd" colspan="3"></td>
            </tr>
            <tr>
              <td align="left" class="uTd" colspan="2">验收人：</td>
              <td align="left" class="uTd" colspan="1">验收时间:</td>
            </tr>
            <tr>
              <td align="center" class="uTd" rowspan="2">乡镇街道审核意见</td>
              <td align="center" class="uTd" colspan="3"></td>
            </tr>
            <tr>
              <td align="left" class="uTd" colspan="2">审核人：</td>
              <td align="left" class="uTd" colspan="1">验收时间:</td>
            </tr>
          </table>
        </view>
      </div>
    </div>
    <div class="reportInstrument">
      <div class="reportInstrumentContent1">
        <button class="reportButton" type="info" @click="render.headelReport" v-if="id < 7"
          >导出PDF</button
        >
        <button class="reportButton" type="info" @click="render.headelReporst" v-else
          >导出PDF</button
        >
        <button class="reportButton" type="info" @click="handleClick">户主签名</button>
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
import { routerForward, formatStr, formatDict, dictOption } from '@/utils'
import { onLoad, onShow } from '@dcloudio/uni-app'
import {
  getImpLandlordItemApi,
  getCompensationCardConfigApi,
  getLandlordItemApi,
  getChooseConfigApi,
  getResettleDetail
} from '@/service'
import { apartmentArea, resettleArea } from '@/config'
import { OtherDataType } from '@/database'
import dayjs from 'dayjs'
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
      baseInfo: {},
      dayjs,
      id: 0,
      landNoList: [],
      storeroomNoList: [],
      carNoList: [],
      dictOption,
      show: false,
      OtherDataType,
      dataLists: []
    }
  },
  onLoad(option) {
    this.id = option.id
    console.log(JSON.parse(option.dataInfo))
    this.dataList = option.data ? JSON.parse(option.data) : []
    this.baseInfo = option.dataInfo ? JSON.parse(option.dataInfo) : []
    this.getDataRequest()
    if (
      this.dataList[0]?.houseAreaType == 'flat' ||
      this.dataList[0]?.houseAreaType == 'homestead'
    ) {
      this.getChooseConfig()
      if (this.dataList[0].houseAreaType == 'homestead') {
        this.id = 3
      }
    }
    if (option.show) {
      this.show = true
    }
  },
  onShow() {
    let that = this
    uni.$on('id', function (data) {
      //接受参数到ID,随意取名
      that.uid = data.dataInfo //用此页面的参数来存储
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
    handleClickToymjk() {
      uni.navigateBack()
    },
    getSettleAddress(data) {
      console.log(data, '选房数据123')
      if (data.settleAddress) {
        // 选择了公寓房的安置方式
        if (data.houseAreaType === 'flat') {
          let str = ''
          this.dataLists.map((item) => {
            if (item.id == data.settleAddress) {
              str = item.name
            }
          })
          return str
        } else if (data.houseAreaType === 'homestead') {
          let str = ''
          this.dataLists.map((item) => {
            if (item.id == data.settleAddress) {
              str = item.name
            }
          })
          return str
        }
      } else {
        return ''
      }
    },
    getChooseConfig() {
      getChooseConfigApi().then((res) => {
        let arr1 = []
        let arr2 = []
        let arr3 = []
        if (res && res.length) {
          res.map((item) => {
            if (item.type === '2') {
              arr1.push({
                text: item.name,
                value: item.id,
                disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
              })
            } else if (item.type === '3') {
              arr2.push({
                text: item.name,
                value: item.id,
                disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
              })
            } else if (item.type === '4') {
              arr2.push({
                text: item.name,
                value: item.id,
                disable: item.isOccupy === '0' ? false : true // '0' 可选，'1' 已选
              })
            }
          })
          this.landNoList = [...arr1]
          this.storeroomNoList = [...arr2]
          this.carNoList = [...arr3]
        }
      })
    },
    async getDataRequest() {
      try {
        const datas = await getResettleDetail(OtherDataType.settleAddressList)
        this.dataLists = datas
        console.log(this.dataLists, '选房数据')
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
				let PDF = new JsPDF('landscape', 'pt', 'a4')
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
		},
   headelReporst(e, ownerVm) {
			html2Canvas(document.querySelector('#printReport'), {
				allowTaint: true, //允许污染
				taintTest: true, //在渲染前测试图片(没整明白有啥用)
				useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
      foreignObjectRendering: true
			}).then(function(canvas) {
		 const contentWidth = canvas.width/2
   const contentHeight = canvas.height
   const pageHeight =(contentWidth / 595.28) * 841.89
   let leftHeight = contentHeight
   let position = 0
   const imgWidth =  1100
   const imgHeight =(595.28 / contentWidth) * contentHeight

   const pageData = canvas.toDataURL('image/jpeg', 1.0)
   const landscape = 'portrait'
   const pdf = new JsPDF(landscape, 'pt', 'a4')
   if (leftHeight < pageHeight) {
     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
   } else {
     while (leftHeight > 0) {
       pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
       leftHeight -= pageHeight
       position -= 841.89
       //避免添加空白页
       if (leftHeight > 0) {
         pdf.addPage()
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
						let base64Str = pdf.output('dataurlstring');
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
  margin-top: 20px;

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

.signatureImgs {
  width: 50px;
  height: 100%;
  background-color: #fff;
  object-fit: contain;
}

.signatureImg {
  width: 100px;
  height: 100px;
  background-color: #fff;
  object-fit: contain;
}

.row-4 {
  width: 100%;
  font-size: 12px;

  table {
    width: 700px;
    // 下面设置表格整体的边框，左上
    border-top: 1px solid #e8eaec;
    border-left: 1px solid #e8eaec;

    tr {
      width: 100%;
      height: 50px; //每一行高度

      td {
        width: 25%; // 因为我的一行分了五个，所以是20%
        // 下面设置每个格子边框，右下
      }
    }
  }
}
</style>
