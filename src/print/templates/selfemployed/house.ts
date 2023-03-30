export const selfemployedHouseDefinition = {
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
              rowSpan: 3,
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
            { text: '联系方式', colSpan: 2, alignment: 'center' },
            ''
          ],
          ['', '', '地理位置', '地理位置'],
          ['', '', '权属人姓名', '权属人姓名'],
          [
            { text: '所属区域：', border: [true, false, false, true], alignment: 'left' },
            { text: '调查时间：', border: [false, false, false, true], alignment: 'left' },
            '联系方式',
            '联系方式'
          ]
        ]
      }
    },
    {
      table: {
        widths: ['*'],
        heights: function (row: any) {
          return row === 0 ? 22 : 106
        },
        headerRows: 1,
        body: [
          [{ text: '房屋示意图', bold: true }],
          [''],
          [''],
          [''],
          [{ text: '', pageBreak: 'after' }],
          [''],
          [''],
          [''],
          [''],
          [''],
          ['']
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
