import { ewm } from '../../config'

export const peopleInfoDefinition = {
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
        alignment: 'center',
        body: [
          [
            {
              rowSpan: 4,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '3 工程建设 征地移民实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 9, 66, 2]
                },
                {
                  text: '（个体户 3 3 号）',
                  alignment: 'center',
                  margin: [66, 0, 66, 0]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
            ''
          ],
          ['', '', { text: '地理位置', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '户主姓名', style: 'td' }, { text: '3', style: 'td' }],
          ['', '', { text: '联系方式', style: 'td' }, { text: '3', style: 'td' }],
          [
            {
              text: '所属区域：3',
              border: [true, false, false, true],
              alignment: 'left',
              style: 'td'
            },
            {
              text: '调查时间：3',
              border: [false, false, false, true],
              alignment: 'left',
              style: 'td'
            },
            { text: '户籍册编号', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },
    {
      table: {
        widths: [58, 58, 40, 58, 58, 58, 110, '*'],
        heights: 22,
        headerRows: 2,
        body: [
          [{ text: '人口信息', bold: true, colSpan: 8, style: 'td' }, '', '', '', '', '', '', ''],
          [
            { text: '姓名', style: 'td' },
            { text: '与户主关系', style: 'td' },
            { text: '性别', style: 'td' },
            { text: '民族', style: 'td' },
            { text: '婚姻状况', style: 'td' },
            { text: '户籍所在地', style: 'td' },
            { text: '身份证号码', style: 'td' },
            { text: '人口类型', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          [{ text: 'fdsafds', colSpan: 8, style: 'td' }, '', '', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        widths: [26, 46, 46, 26, 46, 50, 50, 66, 66, '*'],
        heights: 22,
        headerRows: 2,
        body: [
          [
            { text: '房屋信息', bold: true, colSpan: 10, style: 'td' },
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          ],
          [
            { text: '幢号', style: 'td' },
            { text: '类别', style: 'td' },
            { text: '房屋高程', style: 'td' },
            { text: '层数', style: 'td' },
            { text: '建筑面积', style: 'td' },
            { text: '结构类型', style: 'td' },
            { text: '竣工年月', style: 'td' },
            { text: '房屋所有权证', style: 'td' },
            { text: '土地所有权证', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],

          [{ text: 'fdsafds', colSpan: 10, style: 'td' }, '', '', '', '', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [26, 156, 66, 66, 66, '*'],
        body: [
          [{ text: '附属物信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '项目', style: 'td' },
            { text: '规格', style: 'td' },
            { text: '单位', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '']
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [26, 126, 126, 66, 66, '*'],
        body: [
          [{ text: '零星林（果）木信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '品种', style: 'td' },
            { text: '用途', style: 'td' },
            { text: '规格', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        widths: [26, 100, 100, 100, 100, '*'],
        heights: 22,
        headerRows: 2,
        body: [
          [{ text: '坟墓信息22222', bold: true, colSpan: 6, style: 'td' }, '', '', '', '', ''],
          [
            { text: '幢号', style: 'td' },
            { text: '类别', style: 'td' },
            { text: '房屋高程', style: 'td' },
            { text: '层数', style: 'td' },
            { text: '建筑面积', style: 'td' },
            { text: '备注', style: 'td' }
          ],
          [
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' },
            { text: '3', style: 'td' }
          ],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    }
  ],
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
  },
  footer: function (currentPage: number, pageSize: number) {
    return [
      {
        fontSize: 10,
        margin: [20, 0, 20, 50],
        columns: [
          {
            text: '权属人签字（盖章）：',
            width: 100,
            alignment: 'left',
            decoration: 'underline',
            decorationStyle: 'dashed'
          },
          {
            text: '请签字xxxxxx',
            width: 80,
            color: '#ffffff',
            alignment: 'left',
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
