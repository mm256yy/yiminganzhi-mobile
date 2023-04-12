import { LandlordType } from '@/types/sync'
import { getEquipment, getBottom } from '../../common'
import { layout } from '../../config'
import { MainType, ProjectType } from '@/types/common'

// 个体户/企业 设施设备模版
export const selfemployedEquipmentDefinition = {
  content: [
    {
      text: '设施设备调查表',
      fontSize: 16,
      bold: true,
      margin: [0, 0, 0, 29]
    },
    {
      alignment: 'left',
      fontSize: 9,
      margin: [0, 0, 0, 8],
      columns: [[{ text: '个体工商户名称：' }], [{ text: '所在位置：' }], [{ text: '联系方式：' }]]
    },

    {
      layout,
      table: {
        widths: [26, 82, 42, 26, 26, 82, 58, 58, 42, '*'],
        body: [
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
      alignment: 'left',
      margin: [0, 10, 0, 0],
      columns: ['分类目录：企业', '所属阶段：', '']
    }
  ],
  footer: function () {
    return [
      {
        margin: [20, 10, 20, 0],
        alignment: 'justify',
        columns: [
          {
            text: '法人代表签字(公章)：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查员签字：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          },
          {
            text: '调查时间：',
            alignment: 'left',
            margin: [0, 35, 0, 0]
          }
        ]
      }
    ]
  }
}

// 头部信息 order 1
const getTitle = () => {
  return {
    text: '设施设备调查表',
    fontSize: 16,
    bold: true,
    margin: [0, 0, 0, 29]
  }
}

// 基本信息 order 2
const getInfo = (landlord: LandlordType) => {
  return {
    alignment: 'left',
    fontSize: 9,
    margin: [0, 0, 0, 8],
    columns: [
      [
        {
          text: `${landlord.type === MainType.Company ? '企业' : '个体工商户'}名称：${
            landlord.name
          }`
        }
      ],
      [{ text: `所在位置：${landlord.locationTypeText}` }],
      [{ text: `联系方式：${landlord.phone}` }]
    ]
  }
}

const getFooter = () => {
  return [
    {
      margin: [20, 10, 20, 0],
      alignment: 'justify',
      columns: [
        {
          text: '法人代表签字(公章)：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          text: '调查员签字：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        },
        {
          text: '调查时间：',
          alignment: 'left',
          margin: [0, 35, 0, 0]
        }
      ]
    }
  ]
}

// 获取 个体户设施设备配置
export const getSelfemployedEquipmentDefinition = (
  landlord: LandlordType,
  projectInfo: ProjectType
) => {
  if (!landlord) {
    return selfemployedEquipmentDefinition
  }
  return {
    content: [
      getTitle(),
      getInfo(landlord),
      getEquipment(landlord),
      getBottom(landlord, projectInfo)
    ],
    footer: getFooter
  }
}
