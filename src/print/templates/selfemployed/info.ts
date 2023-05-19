import { LandlordType } from '@/types/sync'
import { getHead, getCompanyBaseTableHead, getHouseInfo, getFushuwu, getTree } from '../../common'
import { layout } from '../../config'
import { ProjectType } from '@/types/common'

// 企业/个体户 基本信息配置模版
export const selfemployedInfoDefinition = {
  content: [
    {
      alignment: 'left',
      margin: [0, 8],
      columns: [
        {
          text: '分类目录：个体工商户',
          width: 170
        },
        {
          text: '所属阶段：',
          width: 170
        }
      ]
    },
    {
      layout,
      table: {
        widths: [135, 135, 100, '*'],
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
                  margin: [60, 27, 60, 2]
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
            { text: '联系方式', style: 'td' },
            { text: '3', style: 'td' }
          ]
        ]
      }
    },

    {
      layout,
      table: {
        widths: [26, 82, 42, 26, 26, 82, 58, 58, 42, '*'],
        body: [
          [{ text: '房屋信息', colSpan: 10, style: 'td' }, '', '', '', '', '', '', '', '', ''],
          [
            { text: '序号', style: 'td' },
            { text: '名称', style: 'td' },
            { text: '规格型号', style: 'td' },
            { text: '单位', style: 'td' },
            { text: '数量', style: 'td' },
            { text: '用途', style: 'td' },
            { text: '建造/购置年份', style: 'td' },
            { text: '原价（万元）', style: 'td' },
            { text: '搬迁方式', style: 'td' },
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
          ['', '', '', '', '', '', '', '', '', '']
        ]
      }
    },

    {
      layout,
      table: {
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
      layout,
      table: {
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
    }
  ],
  footer: function () {
    return [
      {
        fontSize: 10,
        margin: [20, 10, 20, 0],
        alignment: 'justify',
        columns: [
          {
            text: '法人代表签字（公章）：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查员签字：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            alignment: 'right',
            text: '',
            width: 55
          }
        ]
      }
    ]
  }
}

const getFooter = () => {
  return [
    {
      fontSize: 10,
      margin: [20, 0, 20, 15],
      alignment: 'justify',
      columns: [
        {
          text: '法人代表签字（公章）：',
          alignment: 'left'
        },
        {
          text: '调查员签字：',
          alignment: 'left'
        },
        {
          alignment: 'right',
          text: '',
          width: 55
        }
      ]
    }
  ]
}

// 获取 企业/个体户 基本信息配置
export const getSelfemployedInfoDefinition = (landlord: LandlordType, projectInfo: ProjectType) => {
  if (!landlord) {
    return selfemployedInfoDefinition
  }
  return {
    content: [
      getHead(landlord, projectInfo),
      getCompanyBaseTableHead(landlord, projectInfo),
      getHouseInfo(landlord),
      getFushuwu(landlord),
      getTree(landlord)
    ],
    footer: getFooter
  }
}
