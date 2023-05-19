import { MainType, ProjectType } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { imgHeight, layout } from './config'

/**
 * 公共模块
 */

// 顶部项目名称栏边距
const headMargin = 20

// 顶部两栏信息
export const getHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
    alignment: 'left',
    margin: [0, 8],
    columns: [
      {
        text: `分类目录：${
          landlord.type === MainType.PeasantHousehold
            ? '移民'
            : landlord.type === MainType.Company
            ? '企业'
            : landlord.type === MainType.IndividualHousehold
            ? '个体工商户'
            : ''
        }`,
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
      `分类目录：${
        landlord.type === MainType.PeasantHousehold
          ? '移民'
          : landlord.type === MainType.Company
          ? '企业'
          : landlord.type === MainType.IndividualHousehold
          ? '个体工商户'
          : ''
      }`,
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
      widths: [128, 128, 90, 172],
      body: [
        [
          {
            rowSpan: 3,
            colSpan: 2,
            border: [true, true, false, false],
            stack: [
              {
                text: `${projectInfo.name} 工程建设 征地${
                  landlord.type === MainType.PeasantHousehold
                    ? '移民'
                    : landlord.type === MainType.Company
                    ? '企业'
                    : landlord.type === MainType.IndividualHousehold
                    ? '个体工商户'
                    : ''
                }实物调查表`,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [headMargin, 0, headMargin, 2]
              },
              {
                text: `（${
                  landlord.type === MainType.PeasantHousehold
                    ? '移民'
                    : landlord.type === MainType.Company
                    ? '企业'
                    : landlord.type === MainType.IndividualHousehold
                    ? '个体工商户'
                    : ''
                } ${landlord.name} ${landlord.doorNo} 号）`,
                alignment: 'center',
                margin: [headMargin, 0, headMargin, 0]
              }
            ]
          },
          '',
          {
            text: '基本信息',
            bold: true,
            fontSize: 12,
            colSpan: 2,
            alignment: 'center',
            style: 'td'
          },
          ''
        ],
        [
          '',
          '',
          { text: '地理位置', style: 'td' },
          { text: company.companyAddress || landlord.address || '', style: 'td' }
        ],
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
  const { company } = landlord
  return {
    table: {
      widths: [128, 128, 90, 172],
      body: [
        [
          {
            rowSpan: 4,
            colSpan: 2,
            border: [true, true, false, false],
            stack: [
              {
                text: `${projectInfo.name} 工程建设 征地${
                  landlord.type === MainType.PeasantHousehold
                    ? '移民'
                    : landlord.type === MainType.Company
                    ? '企业'
                    : landlord.type === MainType.IndividualHousehold
                    ? '个体工商户'
                    : ''
                }实物调查表`,
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [headMargin, 27, headMargin, 2]
              }
            ]
          },
          '',
          {
            text: '基本信息',
            bold: true,
            fontSize: 12,
            colSpan: 2,
            alignment: 'center',
            style: 'td'
          },
          ''
        ],
        [
          '',
          '',
          { text: '地理位置', style: 'td' },
          { text: company.companyAddress || landlord.address || '', style: 'td' }
        ],
        [
          '',
          '',
          {
            text: `${
              landlord.type === MainType.PeasantHousehold
                ? '移民'
                : landlord.type === MainType.Company
                ? '企业'
                : landlord.type === MainType.IndividualHousehold
                ? '个体工商户'
                : ''
            }名称`,
            style: 'td'
          },
          { text: landlord.name || '', style: 'td' }
        ],
        [
          '',
          '',
          {
            text: `${
              landlord.type === MainType.PeasantHousehold
                ? '移民'
                : landlord.type === MainType.Company
                ? '企业'
                : landlord.type === MainType.IndividualHousehold
                ? '个体工商户'
                : ''
            }编码`,
            style: 'td'
          },
          { text: landlord.doorNo || '', style: 'td' }
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

// 获取 居民户 头部区块
export const getPeopleTableHead = (landlord: LandlordType, projectInfo: ProjectType) => {
  return {
    table: {
      widths: [128, 128, 90, 172],
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
          {
            text: '基本信息',
            bold: true,
            fontSize: 12,
            colSpan: 2,
            alignment: 'center',
            style: 'td'
          },
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
    [
      { text: '人口信息', bold: true, colSpan: 8, fontSize: 12, style: 'td' },
      '',
      '',
      '',
      '',
      '',
      '',
      ''
    ],
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
  const map: any = {}
  const { demographicList } = landlord
  if (demographicList && demographicList.length) {
    demographicList.forEach((item) => {
      body.push([
        { text: item.name || '', style: 'td' },
        { text: item.relationText || '', style: 'td' },
        { text: item.sexText || '', style: 'td' },
        { text: item.nationText || '', style: 'td' },
        { text: item.maritalText || '', style: 'td' },
        { text: item.censusRegister || '', style: 'td' },
        { text: item.card || '', style: 'td' },
        { text: item.populationTypeText || '', style: 'td' }
      ])
      try {
        if (!map[item.populationTypeText]) {
          map[item.populationTypeText] = 1
        } else {
          map[item.populationTypeText] += 1
        }
      } catch (err) {
        console.log(err, '人口类型数据格式有误')
      }
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

  let str = `共${demographicList.length}人`
  for (const key in map) {
    str += `，${key}${map[key]}人`
  }

  body.push([
    {
      text: str,
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
      widths: [54, 54, 54, 54, 54, 54, 104, 54],
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
      { text: '房屋信息', bold: true, fontSize: 12, colSpan: 10, style: 'td' },
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
  const map: any = {}
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
      try {
        if (item.constructionType) {
          if (!map[item.constructionTypeText]) {
            map[item.constructionTypeText] = parseFloat(item.landArea as string) || 0
          } else {
            map[item.constructionTypeText] =
              map[item.constructionTypeText] + parseFloat(item.landArea as string) || 0
          }
        }
      } catch (err) {
        console.log(err, '房屋面积数据格式有误')
      }
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

  let allSumlandArea = 0
  try {
    allSumlandArea = immigrantHouseList.reduce((pre, cur) => {
      return pre + (parseFloat(cur.landArea as string) || 0)
    }, 0)
  } catch (error) {}

  let str = `房屋面积共${allSumlandArea}㎡`
  for (const key in map) {
    str += `，${key}结构面积${map[key]}㎡`
  }

  body.push([
    {
      // ㎡
      text: str,
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
      widths: [20, 40, 40, 20, 40, 61, 61, 60, 60, 62],
      headerRows: 2,
      body
    },
    layout
  }
}

// 附属物
export const getFushuwu = (landlord: LandlordType) => {
  const body: any[] = [
    [{ text: '附属物信息', bold: true, fontSize: 12, colSpan: 6, style: 'td' }, '', '', '', '', ''],
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
      widths: [20, 150, 60, 60, 60, 150],
      headerRows: 2,
      body
    },
    layout
  }
}

// 果木
export const getTree = (landlord: LandlordType) => {
  const body: any[] = [
    [
      { text: '零星林（果）木信息', bold: true, fontSize: 12, colSpan: 6, style: 'td' },
      '',
      '',
      '',
      '',
      ''
    ],
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
      widths: [20, 120, 120, 60, 60, 120],
      headerRows: 2,
      body
    },
    layout
  }
}

// 坟墓
export const getGrave = (landlord: LandlordType) => {
  const body: any[] = [
    [{ text: '坟墓信息', bold: true, colSpan: 6, fontSize: 12, style: 'td' }, '', '', '', '', ''],
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
      widths: [20, 96, 96, 96, 96, 96],
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
  const body: any[] = [[{ text: '房屋示意图', bold: true, fontSize: 12, style: 'td' }]]
  if (immigrantHouseList && immigrantHouseList.length) {
    immigrantHouseList.forEach((item) => {
      // 处理过的房屋图片数组
      if (item.housePicArray && item.housePicArray.length) {
        item.housePicArray.forEach((houseItem: any) => {
          houseItem.base64 && imgs.push(houseItem.base64)
        })
      }
    })
    if (imgs.length) {
      imgs.forEach((img) => {
        body.push([
          {
            image: img,
            fit: [540, imgHeight]
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
      widths: [545],
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
      widths: [20, 76, 36, 20, 20, 76, 52, 52, 36, 76],
      headerRows: 1,
      body
    },
    layout
  }
}
