<template>
  <view id="print" class="print">
    <button hover-class="button-hover"> 打印 </button>
    <!-- @click="print.makeClick" -->
  </view>
</template>

<script lang="ts">
const printpdfModule = uni.requireNativePlugin('da-printpdf')

export default {
  methods: {
    printPdfHandle(base64Str: string) {
      const index = base64Str.indexOf(',')
      const base64 = base64Str.slice(index + 1, base64Str.length)
      //Base64可通过Canvas、html2canvas、jspdf等生成的字符串，不包含文件类型前缀
      //1.根据Base64生成文件：第二个参数是文件名称，如果不传入路径，则默认保存在Download文件夹,返回文件的绝对路径
      const filePath = printpdfModule.saveBase64File(base64, `${new Date().getTime()}.pdf`)
      //2.打印pdf
      //可传绝对路径，如果只传文件名则默认在下载目录下查找
      // printpdfModule.printPdf('test.pdf')
      //3.删除文件
      //删除Download文件夹下的文件名称
      // const result = printpdfModule.deleteFile("test.pdf");

      // 预览pdf
      uni.openDocument({
        filePath: filePath,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    }
  }
}
</script>

<script module="print" lang="renderjs">
import { printPdf } from '@/print'
import { companyBaseDefinition } from '@/print/templates'

export default {
  methods: {
    makeClick(ev, ownerInstance) {
      const pdfMakeRes = printPdf.pdfMake
      .createPdf({
        ...printPdf.baseConfig,
        ...companyBaseDefinition
      })
      pdfMakeRes.getBase64((dataUrl) => {
        ownerInstance.callMethod('printPdfHandle', dataUrl)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.print {
  width: 595px;
}
</style>
