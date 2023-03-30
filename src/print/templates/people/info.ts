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
        body: [
          [
            {
              rowSpan: 4,
              colSpan: 2,
              border: [true, true, false, false],
              stack: [
                {
                  text: '柏行水库 工程建设 征地移民实物调查表',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  margin: [66, 9, 66, 2]
                },
                {
                  text: '（个体户 XXX 232356228881 号）',
                  alignment: 'center',
                  margin: [66, 0, 66, 0]
                }
              ]
            },
            '',
            { text: '基本信息', colSpan: 2, alignment: 'center' },
            ''
          ],
          ['', '', '地理位置', ''],
          ['', '', '户主姓名', ''],
          ['', '', '联系方式', ''],
          [
            { text: '所属区域：', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：', border: [false, false, false, true], alignment: 'left' },
            '户籍册编号',
            ''
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
          [{ text: '人口信息', bold: true, colSpan: 8 }, '', '', '', '', '', '', ''],
          [
            '姓名',
            '与户主关系',
            '性别',
            '民族',
            '婚姻状况',
            '户籍所在地',
            '身份证号码',
            '人口类型'
          ],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          [{ text: 'fdsafds', colSpan: 8 }, '', '', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        widths: [26, 46, 46, 26, 46, 50, 50, 66, 66, '*'],
        heights: 22,
        headerRows: 2,
        body: [
          [{ text: '房屋信息', bold: true, colSpan: 10 }, '', '', '', '', '', '', '', '', ''],
          [
            '幢号',
            '类别',
            '房屋高程',
            '层数',
            '建筑面积',
            '结构类型',
            '竣工年月',
            '房屋所有权证',
            '土地所有权证',
            '备注'
          ],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', '', '', ''],
          [{ text: 'fdsafds', colSpan: 10 }, '', '', '', '', '', '', '', '', '']
        ]
      }
    },

    {
      table: {
        heights: 22,
        widths: [26, 156, 66, 66, 66, '*'],
        body: [
          [{ text: '附属物信息', colSpan: 6 }, '', '', '', '', ''],
          ['序号', '项目', '规格', '单位', '数量', '备注'],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    },
    {
      table: {
        heights: 22,
        widths: [26, 126, 126, 66, 66, '*'],
        body: [
          [{ text: '零星林（果）木信息', colSpan: 6 }, '', '', '', '', ''],
          ['序号', '品种', '用途', '规格', '数量', '备注'],
          ['', '', '', '', '', ''],
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
          [{ text: '坟墓信息22222', bold: true, colSpan: 6 }, '', '', '', '', ''],
          ['幢号', '类别', '房屋高程', '层数', '建筑面积', '备注'],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
        ]
      }
    }
  ],
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
