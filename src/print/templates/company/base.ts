import { ewm } from '../../config'

export const companyBaseDefinition = {
  content: [
    {
      alignment: 'left',
      margin: [0, 8],
      columns: [
        {
          text: '分类目录：',
          width: 170
        },
        {
          text: '所属阶段：',
          width: 170
        }
      ]
    },
    {
      table: {
        widths: [135, 135, 100, '*'],
        heights: 22,
        body: [
          [
            {
              rowSpan: 4,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '清溪水库 工程建设 征地企业实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 27, 66, 2]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center', margin: [0, 7, 0, 0] },
            ''
          ],
          ['', '', '地理位置', ''],
          ['', '', '企业名称', ''],
          ['', '', '企业编码', ''],
          [
            { text: '所属区域：', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：', border: [false, false, false, true], alignment: 'left' },
            '联系方式',
            ''
          ]
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [86, 91, 86, 91, 86, '*'],
        body: [
          [{ text: '工商、税务登记信息', colSpan: 6 }, '', '', '', '', ''],
          ['营业执照编号', '', '注册资金', '', '成立日期', ''],
          ['税务登记编号', '', '登记注册类型', '', '住所', ''],
          [{ text: '营业范围', rowSpan: 5 }, { text: '', colSpan: 5, rowSpan: 5 }, '', '', '', ''],

          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [86, 91, 86, 91, 86, '*'],
        body: [
          [{ text: ' 财务、经营状况及初步处理意向', colSpan: 6 }, '', '', '', '', ''],
          ['固定资产原值', '', '年工资总额', '', '正式工', ''],
          ['临时工', '', '近3年平均产值', '', '近3年平均利润', ''],
          ['近3年平均缴税额', '', '涉及情况', '', '初步处理方案', '']
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [40, 42, 90, 40, 42, 90, 40, 42, '*'],
        body: [
          [{ text: '土地使用情况', colSpan: 9 }, '', '', '', '', '', '', '', ''],
          [
            { text: '序号', rowSpan: 2 },
            '权属面积',
            '',
            { text: '划拨', rowSpan: 2 },
            '权属面积',
            '',
            { text: '租用', rowSpan: 2 },
            '权属面积',
            ''
          ],
          ['', '占用面积', '', '', '占用面积', '', '', '占用面积', '']
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [545],
        body: [[{ text: '备注' }], [{ text: '', rowSpan: 3 }], [''], ['']]
      }
    }
  ],
  footer: function (currentPage: number, pageSize: any) {
    return [
      {
        margin: [20, 0, 20, 50],
        alignment: 'left',
        columns: [
          { text: '法人代表签字（公章）：', decoration: 'underline', decorationStyle: 'dashed' },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            text: '调查员签字：',
            margin: [58, 0, 0, 0],
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          },

          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            decoration: 'underline',
            decorationColor: '#000000'
          },
          {
            image: ewm,
            width: 55
          }
        ]
      },

      {
        text: `${currentPage}/${pageSize}`
      }
    ]
  }
}
