import { MainType, ProjectType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { imgHeight, layout } from './config'

/**
 * 公共模块
 */

// 顶部项目名称栏边距
const headMargin = 40

// 顶部两栏信息
export const getHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
    alignment: 'left',
    margin: [0, 8],
    columns: [
      {
        text: `分类目录：${landlord.type === MainType.PeasantHousehold ? '移民' : '企业'}`,
        width: 170
      },
      {
        text: `所属阶段：${
          projectInfo.status && projectInfo.status === 'review' ? '实物复核' : '实物调查'
        }`,
        width: 170
      }
    ]
  }
}

// 底部
export const getBottom = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
    alignment: 'left',
    margin: [0, 10, 0, 0],
    columns: [
      `分类目录：${landlord.type === MainType.PeasantHousehold ? '移民' : '企业'}`,
      `所属阶段：${
        projectInfo.status && projectInfo.status === 'review' ? '实物复核' : '实物调查'
      }`,
      ''
    ]
  }
}

// 获取 企业/个体户 房屋头部区块
export const getCompanyTableHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  const { company } = landlord
  return {
    table: {
      widths: [135, 135, 100, '*'],
      body: [
        [
          {
            rowSpan: 3,
            colSpan: 2,
            border: [true, true, false, false],
            stack: [
              {
                text: `${projectInfo.name} 工程建设 征地移民实物调查表`,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [headMargin, 0, headMargin, 2]
              },
              {
                text: `（${landlord.type === MainType.Company ? '企业' : '个体户'} ${
                  landlord.name
                } ${landlord.doorNo} 号）`,
                alignment: 'center',
                margin: [headMargin, 0, headMargin, 0]
              }
            ]
          },
          '',
          { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
          ''
        ],
        ['', '', { text: '地理位置', style: 'td' }, { text: landlord.address || '', style: 'td' }],
        [
          '',
          '',
          { text: '权属人姓名', style: 'td' },
          { text: company.legalPersonName || '', style: 'td' }
        ],
        [
          {
            text: `所属区域：${landlord.locationTypeText}`,
            border: [true, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          {
            text: `调查时间：${landlord.reportDateText}`,
            border: [false, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          { text: '联系方式', style: 'td' },
          { text: landlord.phone || '', style: 'td' }
        ]
      ]
    },
    layout
  }
}

// 获取 企业/个体户 基本信息头部区块
export const getCompanyBaseTableHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
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
                text: `${projectInfo.name} 工程建设 征地企业实物调查表`,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [headMargin, 27, headMargin, 2]
              }
            ]
          },
          '',
          { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
          ''
        ],
        ['', '', { text: '地理位置', style: 'td' }, { text: landlord.address || '', style: 'td' }],
        ['', '', { text: '企业名称', style: 'td' }, { text: landlord.name || '', style: 'td' }],
        ['', '', { text: '企业编码', style: 'td' }, { text: landlord.doorNo || '', style: 'td' }],
        [
          {
            text: `所属区域：${landlord.locationTypeText}`,
            border: [true, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          {
            text: `调查时间：${landlord.reportDateText}`,
            border: [false, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          { text: '联系方式', style: 'td' },
          { text: landlord.phone || '', style: 'td' }
        ]
      ]
    },
    layout
  }
}

// 获取 居民户 头部区块
export const getPeopleTableHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
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
                text: `${projectInfo.name || ''} 工程建设 征地移民实物调查表`,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [headMargin, 0, headMargin, 2]
              },
              {
                text: `（居民户 ${landlord.name || ''} ${landlord.doorNo || ''} 号）`,
                alignment: 'center',
                margin: [headMargin, 0, headMargin, 0]
              }
            ]
          },
          '',
          { text: '基本信息', colSpan: 2, alignment: 'center', style: 'td' },
          ''
        ],
        ['', '', { text: '地理位置', style: 'td' }, { text: landlord.address || '', style: 'td' }],
        ['', '', { text: '户主姓名', style: 'td' }, { text: landlord.name || '', style: 'td' }],
        ['', '', { text: '联系方式', style: 'td' }, { text: landlord.phone || '', style: 'td' }],
        [
          {
            text: `所属区域：${landlord.locationTypeText || ''}`,
            border: [true, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          {
            text: `调查时间：${landlord.reportDateText}`,
            border: [false, false, false, true],
            alignment: 'left',
            style: 'td'
          },
          { text: '户籍册编号', style: 'td' },
          { text: landlord.householdNumber || '', style: 'td' }
        ]
      ]
    },
    layout
  }
}

// 人口
export const getPopulation = (landlord: LandlordType) => {
  const body: any[] = [
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
    ]
  ]
  const { demographicList } = landlord
  if (demographicList && demographicList.length) {
    demographicList.forEach((item) => {
      body.push([
        { text: item.name || '', style: 'td' },
        { text: item.relationText || '', style: 'td' },
        { text: item.sexText || '', style: 'td' },
        { text: item.nationText || '', style: 'td' },
        { text: item.marital || '', style: 'td' },
        { text: item.censusRegister || '', style: 'td' },
        { text: item.card || '', style: 'td' },
        { text: item.populationTypeText || '', style: 'td' }
      ])
    })
  } else {
    body.push([
      { text: '无', colSpan: 8, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }
  let cene = 0
  let cewai = 0
  let other = 0
  demographicList.forEach((item) => {
    if (String(item.populationType) === '1') {
      cene += 1
    } else if (String(item.populationType) === '2') {
      cewai += 1
    } else if (String(item.populationType) === '3') {
      other += 1
    }
  })
  body.push([
    {
      text: `共${demographicList.length}人，其中册内人口${cene}人，册外人口${cewai}人，其他人口${
        demographicList.length - cene - cewai
      }人`,
      colSpan: 8,
      alignment: 'left',
      style: 'td'
    },
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ])

  return {
    table: {
      widths: [58, 58, 40, 58, 58, 58, 110, '*'],
      headerRows: 2,
      body
    },
    layout
  }
}

// 房屋
export const getHouseInfo = (landlord: LandlordType) => {
  const body: any[] = [
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
    ]
  ]
  const { immigrantHouseList } = landlord
  if (immigrantHouseList && immigrantHouseList.length) {
    immigrantHouseList.forEach((item) => {
      body.push([
        { text: item.houseNo || '', style: 'td' },
        { text: item.houseTypeText || '', style: 'td' },
        { text: item.houseHeight || '', style: 'td' },
        { text: item.storeyNumber || '', style: 'td' },
        { text: item.landArea || '', style: 'td' },
        { text: item.constructionTypeText || '', style: 'td' },
        { text: item.completedTimeText || '', style: 'td' },
        { text: item.propertyNo || '', style: 'td' },
        { text: item.landNo || '', style: 'td' },
        { text: item.remark || '', style: 'td' }
      ])
    })
  } else {
    body.push([
      { text: '无', colSpan: 10, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }
  const allSumlandArea = immigrantHouseList.reduce((pre, cur) => {
    return pre + cur.landArea
  }, 0)
  const zh = immigrantHouseList.filter((item) => String(item.constructionType) === '3')
  const zhSumlandArea = zh.reduce((pre, cur) => {
    return pre + cur.landArea
  }, 0)

  const tm = immigrantHouseList.filter((item) => String(item.constructionType) === '6')
  const tmSumlandArea = tm.reduce((pre, cur) => {
    return pre + cur.landArea
  }, 0)
  body.push([
    {
      // ㎡
      text: `房屋面积共${allSumlandArea}㎡，砖混结构面积${zhSumlandArea}㎡，土木结构面积${tmSumlandArea}㎡`,
      colSpan: 10,
      alignment: 'left',
      style: 'td'
    },
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ])
  return {
    table: {
      widths: [26, 40, 40, 26, 40, 50, 50, 60, 60, '*'],
      headerRows: 2,
      body
    },
    layout
  }
}

// 附属物
export const getFushuwu = (landlord: LandlordType) => {
  const body: any[] = [
    [{ text: '附属物信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
    [
      { text: '序号', style: 'td' },
      { text: '项目', style: 'td' },
      { text: '规格', style: 'td' },
      { text: '单位', style: 'td' },
      { text: '数量', style: 'td' },
      { text: '备注', style: 'td' }
    ]
  ]
  const { immigrantAppendantList } = landlord
  if (immigrantAppendantList && immigrantAppendantList.length) {
    immigrantAppendantList.forEach((item, index) => {
      if (item.number || item.remark) {
        body.push([
          { text: index + 1, style: 'td' },
          { text: item.name || '', style: 'td' },
          { text: item.size || '', style: 'td' },
          { text: item.unit || '', style: 'td' },
          { text: item.number || '', style: 'td' },
          { text: item.remark || '', style: 'td' }
        ])
      }
    })
  } else {
    body.push([
      { text: '无', colSpan: 6, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }

  return {
    table: {
      widths: [26, 156, 60, 60, 60, '*'],
      headerRows: 2,
      body
    },
    layout
  }
}

// 果木
export const getTree = (landlord: LandlordType) => {
  const body: any[] = [
    [{ text: '零星林（果）木信息', colSpan: 6, style: 'td' }, '', '', '', '', ''],
    [
      { text: '序号', style: 'td' },
      { text: '品种', style: 'td' },
      { text: '用途', style: 'td' },
      { text: '规格', style: 'td' },
      { text: '数量', style: 'td' },
      { text: '备注', style: 'td' }
    ]
  ]
  const { immigrantTreeList } = landlord
  if (immigrantTreeList && immigrantTreeList.length) {
    immigrantTreeList.forEach((item, index) => {
      body.push([
        { text: index + 1, style: 'td' },
        { text: item.name || '', style: 'td' },
        { text: item.usageTypeText || '', style: 'td' },
        { text: item.sizeText || '', style: 'td' },
        { text: item.number || '', style: 'td' },
        { text: item.remark || '', style: 'td' }
      ])
    })
  } else {
    body.push([
      { text: '无', colSpan: 6, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }
  return {
    table: {
      widths: [26, 126, 126, 60, 60, '*'],
      headerRows: 2,
      body
    },
    layout
  }
}

// 坟墓
export const getGrave = (landlord: LandlordType) => {
  const body: any[] = [
    [{ text: '坟墓信息', bold: true, colSpan: 6, style: 'td' }, '', '', '', '', ''],
    [
      { text: '序号', style: 'td' },
      { text: '穴位', style: 'td' },
      { text: '材料', style: 'td' },
      { text: '立墓年份', style: 'td' },
      { text: '数量（座）', style: 'td' },
      { text: '备注', style: 'td' }
    ]
  ]
  const { immigrantGraveList } = landlord
  if (immigrantGraveList && immigrantGraveList.length) {
    immigrantGraveList.forEach((item, index) => {
      body.push([
        { text: index + 1, style: 'td' },
        { text: item.graveTypeText || '', style: 'td' },
        { text: item.materialsText || '', style: 'td' },
        { text: item.graveYear || '', style: 'td' },
        { text: item.number || '', style: 'td' },
        { text: item.remark || '', style: 'td' }
      ])
    })
  } else {
    body.push([
      { text: '无', colSpan: 6, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }
  return {
    table: {
      widths: [26, 100, 100, 100, 100, '*'],
      headerRows: 2,
      body
    },
    layout
  }
}

// 房屋示意图
export const getHousePic = (landlord: LandlordType) => {
  const { immigrantHouseList } = landlord
  const imgs: any[] = []
  const body: any[] = [[{ text: '房屋示意图', bold: true, style: 'td' }]]
  if (immigrantHouseList && immigrantHouseList.length) {
    immigrantHouseList.forEach((item) => {
      // 处理过的房屋图片数组
      if (item.housePicArray && item.housePicArray.length) {
        item.housePicArray.forEach((houseItem: any) => {
          imgs.push(houseItem.base64)
        })
      }
    })
    if (imgs.length) {
      imgs.forEach((img) => {
        body.push([
          {
            image: img,
            fit: [550, imgHeight]
          }
        ])
      })
    } else {
      body.push([
        {
          text: '无'
        }
      ])
    }
  } else {
    body.push([
      {
        text: '无'
      }
    ])
  }

  return {
    table: {
      widths: ['*'],
      headerRows: 1,
      body
    },
    layout
  }
}

// 设备信息
export const getEquipment = (landlord: LandlordType) => {
  const body: any[] = [
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
    ]
  ]
  const { immigrantEquipmentList } = landlord
  if (immigrantEquipmentList && immigrantEquipmentList.length) {
    immigrantEquipmentList.forEach((item, index) => {
      body.push([
        { text: index + 1, style: 'td' },
        { text: item.name || '', style: 'td' },
        { text: item.size || '', style: 'td' },
        { text: item.unit || '', style: 'td' },
        { text: item.number || '', style: 'td' },
        { text: item.purpose || '', style: 'td' },
        { text: item.yearText || '', style: 'td' },
        { text: item.amount || '', style: 'td' },
        { text: item.moveTypeText || '', style: 'td' },
        { text: item.remark || '', style: 'td' }
      ])
    })
  } else {
    body.push([
      { text: '无', colSpan: 10, style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' },
      { text: '', style: 'td' }
    ])
  }
  return {
    table: {
      widths: [20, 72, 42, 26, 26, 72, 40, 58, 42, '*'],
      headerRows: 1,
      body
    },
    layout
  }
}
