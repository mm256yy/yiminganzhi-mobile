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
                  text: '3 工程建设 征地企业实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 27, 66, 2]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
            ''
          ],
          ['', '', { text: '地理位置', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '企业名称', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '企业编码', style: 'td' }, { text: '3', style: 'td' }],
          [
            { text: '所属区域：3', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：3', border: [false, false, false, true], alignment: 'left' },
            { text: '联系方式', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [86, 91, 86, 91, 86, '*'],
        body: [
          [{ text: '工商、税务登记信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '营业执照编号', style: 'td' },
            { text: '3', style: 'td' },
            { text: '注册资金', style: 'td' },
            { text: '3', style: 'td' },
            { text: '成立日期', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '税务登记编号', style: 'td' },
            { text: '3', style: 'td' },
            { text: '登记注册类型', style: 'td' },
            { text: '3', style: 'td' },
            { text: '住所', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '营业范围', rowSpan: 5, margin: [0, 46, 0, 0] },
            { text: '3', colSpan: 5, rowSpan: 5, style: 'td' },
            '',
            '',
            '',
            ''
          ],

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
          [{ text: ' 财务、经营状况及初步处理意向', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '固定资产原值', style: 'td' },
            { text: '3', style: 'td' },
            { text: '年工资总额', style: 'td' },
            { text: '3', style: 'td' },
            { text: '正式工', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '临时工', style: 'td' },
            { text: '3', style: 'td' },
            { text: '近3年平均产值', style: 'td' },
            { text: '3', style: 'td' },
            { text: '近3年平均利润', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            { text: '近3年平均缴税额', style: 'td' },
            { text: '3', style: 'td' },
            { text: '涉及情况', style: 'td' },
            { text: '3', style: 'td' },
            { text: '初步处理方案', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      pageBreak: 'before',
      table: {
        heights: 22,
        widths: [40, 42, 90, 40, 42, 90, 40, 42, '*'],
        body: [
          [{ text: '土地使用情况', colSpan: 9, style: 'td' }, '', '', '', '', '', '', '', ''],
          [
            { text: '序号', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' },
            { text: '划拨', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' },
            { text: '租用', rowSpan: 2, style: 'td_2' },
            { text: '权属面积', style: 'td' },
            { text: '3', style: 'td' }
          ],
          [
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' },
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' },
            '',
            { text: '占用面积', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [545],
        body: [
          [{ text: '备注', style: 'td' }],
          [{ text: '3', rowSpan: 3, style: 'td' }],
          [''],
          ['']
        ]
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
  },
  styles: {
    // td垂直居中
    td: {
      margin: [0, 7, 0, 0]
    },
    td_2: {
      margin: [0, 21, 0, 0]
    },
    td_3: {
      margin: [0, 28, 0, 0]
    },

    // table样式
    table: {
      heights: 22
    }
  }
}
