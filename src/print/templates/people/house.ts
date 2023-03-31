export const peopleHouseDefinition = {
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
        widths: ['*'],
        heights: function (row: number) {
          return row === 0 ? 22 : 106
        },
        headerRows: 2,
        body: [
          [{ text: '房屋示意图', bold: true, style: 'td' }],
          [{ text: '3' }],
          [''],
          [''],
          [{ text: '', pageBreak: 'after' }]
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
            text: '权属人签字（盖章）：',
            width: 158,
            margin: [58, 0, 0, 0],
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
          }
        ]
      },
      {
        text: `${currentPage}/${pageSize}`
      }
    ]
  }
}
