const header = {}

const content = [
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
      heights: 24,
      body: [
        [
          {
            rowSpan: 3,
            colSpan: 2,
            border: [true, true, false, false],
            stack: [
              {
                text: '柏行水库 工程建设 征地移民实物调查表',
                fontSize: 16,
                bold: true,
                margin: [66, 9, 66, 2]
              },
              {
                text: '（个体户 XXX 232356228881 号）',
                margin: [66, 0, 66, 0]
              }
            ]
          },
          '',
          { text: '联系方式', colSpan: 2 },
          ''
        ],
        ['', '', '地理位置', ''],
        ['', '', '权属人姓名', ''],
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
      widths: ['*'],
      body: [
        [
          {
            image:
              'https://zdwp.oss-cn-hangzhou.aliyuncs.com/migrate/files/image/7ee48f64-49f7-4805-8bd7-227dfe11ce0a.jpg',
            width: 400,
            height: 200,
            pageBreak: 'after'
          }
        ],
        ['4444'],
        ['6666']
      ]
    }
  }
]

const footer = [{}]

const styles = {
  subtit: {
    fontSize: 8,
    bold: true
  },

  tabletit: {
    bold: true
  }
}

const defaultStyle = {
  alignment: 'center',
  lineHeight: 1,
  fontSize: 8,
  color: 'black'
}

export const houseConfig = {
  defaultStyle,
  header,
  footer,
  content,
  styles
}
