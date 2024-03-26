import { getStorage, StorageKey } from '@/utils'

import iconHouseholdDef from '@/static/images/icon_household_imp_def.png' // 引入居民户信息默认 icon
import iconHouseholdSel from '@/static/images/icon_household_imp_sel.png' // 引入居民户信息选中时 icon

import iconRkhdDef from '@/static/images/icon_rkhd_def.png' // 引入人口核定默认 icon
import iconRkhdSel from '@/static/images/icon_rkhd_sel.png' // 引入人口核定选中时 icon

import iconFwqqDef from '@/static/images/icon_fwqq_def.png' // 引入房屋确权默认 icon
import iconFwqqSel from '@/static/images/icon_fwqq_sel.png' // 引入房屋确权选中时 icon

import iconFwfswDef from '@/static/images/icon_fwfsw_def.png' // 引入房屋/附属物默认 icon
import iconFwfswSel from '@/static/images/icon_fwfsw_sel.png' // 引入房屋/附属物选中时 icon

import iconTdfzwDef from '@/static/images/icon_tdfzw_def.png' // 引入土地/附着物默认 icon
import iconTdfzwSel from '@/static/images/icon_tdfzw_sel.png' // 引入土地/附着物选中时 icon

import iconMnazDef from '@/static/images/icon_mnaz_def.png' // 引入模拟安置默认 icon
import iconMnazSel from '@/static/images/icon_mnaz_sel.png' // 引入模拟安置选中时 icon

import iconScazDef from '@/static/images/icon_mnaz_def.png' // 引入生产安置默认 icon
import iconScazSel from '@/static/images/icon_mnaz_sel.png' // 引入生产安置选中时 icon

import iconBqazDef from '@/static/images/icon_bqaz_def.png' // 引入搬迁安置默认 icon
import iconBqazSel from '@/static/images/icon_bqaz_sel.png' // 引入搬迁安置选中时 icon

import iconFmqrDef from '@/static/images/icon_fmqr_def.png' // 引入坟墓确认默认 icon
import iconFmqrSel from '@/static/images/icon_fmqr_sel.png' // 引入坟墓确认选中时 icon

import iconScydDef from '@/static/images/icon_scyd_def.png' // 引入生产用地默认 icon
import iconScydSel from '@/static/images/icon_scyd_sel.png' // 引入生产用地选中时 icon

import iconXfzzDef from '@/static/images/icon_xfzz_def.png' // 引入选房择址默认 icon
import iconXfzzSel from '@/static/images/icon_xfzz_sel.png' // 引入选房择址选中时 icon

import iconFmzzDef from '@/static/images/icon_fmzz_def.png' // 引入坟墓择址默认 icon
import iconFmzzSel from '@/static/images/icon_fmzz_sel.png' // 引入坟墓择址选中时 icon

import iconYmjkDef from '@/static/images/icon_ymjk_def.png' // 引入移民建卡默认 icon
import iconYmjkSel from '@/static/images/icon_ymjk_sel.png' // 引入移民建卡选中时 icon

import iconFwtkDef from '@/static/images/icon_fwtk_def.png' // 引入房屋腾空默认 icon
import iconFwtkSel from '@/static/images/icon_fwtk_sel.png' // 引入房屋腾空选中时 icon

import iconTdtkDef from '@/static/images/icon_tdtk_def.png' // 引入土地腾让默认 icon
import iconTdtkSel from '@/static/images/icon_tdtk_sel.png' // 引入土地腾让选中时 icon

import iconGdazDef from '@/static/images/icon_gdaz_def.png' // 引入过渡安置默认 icon
import iconGdazSel from '@/static/images/icon_gdaz_sel.png' // 引入过渡安置选中时 icon

import iconDqxyDef from '@/static/images/icon_dqxy_def.png' // 引入动迁协议默认 icon
import iconDqxySel from '@/static/images/icon_dqxy_sel.png' // 引入动迁协议选中时 icon

import iconZjfDef from '@/static/images/icon_zjf_def.png' // 引入自建房默认 icon
import iconZjfSel from '@/static/images/icon_zjf_sel.png' // 引入自建房选中时 icon

import iconGyfDef from '@/static/images/icon_gyf_def.png' // 引入公寓房默认 icon
import iconGyfSel from '@/static/images/icon_gyf_sel.png' // 引入公寓房选中时 icon

import iconJzgyDef from '@/static/images/icon_jzgy_def.png' // 引入集中供养默认 icon
import iconJzgySel from '@/static/images/icon_jzgy_sel.png' // 引入集中供养选中时 icon

import iconZmclDef from '@/static/images/icon_zmcl_def.png' // 引入自谋出路默认 icon
import iconZmclSel from '@/static/images/icon_zmcl_sel.png' // 引入自谋出路选中时 icon

import iconNyazDef from '@/static/images/icon_nyaz_def.png' // 引入农业安置默认 icon
import iconNyazSel from '@/static/images/icon_nyaz_sel.png' // 引入农业安置选中时 icon

import iconYlbxDef from '@/static/images/icon_ylbx_def.png' // 引入养老保险默认 icon
import iconYlbxSel from '@/static/images/icon_ylbx_sel.png' // 引入养老保险选中时 icon

import iconZmzyDef from '@/static/images/icon_zmzy_def.png' // 引入自谋职业默认 icon
import iconZmzySel from '@/static/images/icon_zmzy_sel.png' // 引入自谋职业选中时 icon

import iconXgsxDef from '@/static/images/icon_xgsx_def.png' // 引入相关手续默认 icon
import iconXgsxSel from '@/static/images/icon_xgsx_sel.png' // 引入相关手续选中时 icon

export const compatibleOldSystems = () =>
  (getStorage(StorageKey.PROJECTINFO) || {}).reservoirCode === 'fxsk'

// 居民户移民实施左侧边栏选项列表
export const householdSidebarList = [
  {
    title: '',
    filled: false,
    list: [
      {
        title: '',
        list: [
          {
            label: '居民户信息',
            value: 1,
            filled: false,
            iconDef: iconHouseholdDef,
            iconSel: iconHouseholdSel
          }
        ]
      }
    ]
  },
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '资格认定',
        filled: false,
        list: [
          {
            label: '人口核定',
            value: 2,
            filled: false,
            iconDef: iconRkhdDef,
            iconSel: iconRkhdSel
          },
          {
            label: '房屋产权',
            value: 3,
            filled: false,
            iconDef: iconFwqqDef,
            iconSel: iconFwqqSel
          }
        ]
      },
      {
        title: '资产评估',
        filled: false,
        list: [
          {
            label: '房屋/附属物',
            value: 4,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '土地/附着物',
            value: 5,
            filled: false,
            iconDef: iconTdfzwDef,
            iconSel: iconTdfzwSel
          }
          // {
          //   label: '模拟安置',
          //   value: 6,
          //   filled: false,
          //   iconDef: iconMnazDef,
          //   iconSel: iconMnazSel
          // }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '模拟安置',
            value: 6,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      },
      {
        title: '安置确认',
        filled: false,
        list: [
          {
            label: '搬迁安置',
            value: 7,
            filled: false,
            iconDef: iconScazDef,
            iconSel: iconScazSel
          },
          {
            label: '生产安置',
            value: 8,
            filled: false,
            iconDef: iconBqazDef,
            iconSel: iconBqazSel
          },
          {
            label: '坟墓确认',
            value: 9,
            filled: false,
            iconDef: iconFmqrDef,
            iconSel: iconFmqrSel
          }
        ]
      },
      {
        title: '择址确认',
        filled: false,
        list: [
          {
            label: '生产用地',
            value: 10,
            filled: false,
            iconDef: iconScydDef,
            iconSel: iconScydSel
          },
          {
            label: '选房择址',
            value: 11,
            filled: false,
            iconDef: iconXfzzDef,
            iconSel: iconXfzzSel
          },
          {
            label: '坟墓择址',
            value: 12,
            filled: false,
            iconDef: iconFmzzDef,
            iconSel: iconFmzzSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '移民建卡',
            value: 13,
            filled: false,
            iconDef: iconYmjkDef,
            iconSel: iconYmjkSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '动迁协议',
            value: 17,
            filled: false,
            iconDef: iconDqxyDef,
            iconSel: iconDqxySel
          }
        ]
      },
      {
        title: '腾空过渡',
        filled: false,
        list: [
          {
            label: '房屋腾空',
            value: 14,
            filled: false,
            iconDef: iconFwtkDef,
            iconSel: iconFwtkSel
          },
          {
            label: '土地腾让',
            value: 15,
            filled: false,
            iconDef: iconTdtkDef,
            iconSel: iconTdtkSel
          },
          {
            label: '过渡安置',
            value: 16,
            filled: false,
            iconDef: iconGdazDef,
            iconSel: iconGdazSel
          }
        ]
      }
      // {
      //   title: '',
      //   filled: false,
      //   list: [
      //     {
      //       label: '动迁协议',
      //       value: 17,
      //       filled: false,
      //       iconDef: iconDqxyDef,
      //       iconSel: iconDqxySel
      //     }
      //   ]
      // }
    ]
  },
  {
    title: '安置阶段',
    filled: false,
    list: [
      {
        title: '搬迁安置',
        list: [
          {
            label: '自建房',
            value: 18,
            filled: false,
            iconDef: iconZjfDef,
            iconSel: iconZjfSel
          },
          {
            label: '公寓房',
            value: 19,
            filled: false,
            iconDef: iconGyfDef,
            iconSel: iconGyfSel
          },
          {
            label: '集中供养',
            value: 20,
            filled: false,
            iconDef: iconJzgyDef,
            iconSel: iconJzgySel
          },
          {
            label: '自谋出路',
            value: 21,
            filled: false,
            iconDef: iconZmclDef,
            iconSel: iconZmclSel
          }
        ]
      },
      {
        title: '生产安置',
        filled: false,
        list: [
          {
            label: '农业安置',
            value: 22,
            filled: false,
            iconDef: iconNyazDef,
            iconSel: iconNyazSel
          },
          {
            label: '养老保险',
            value: 23,
            filled: false,
            iconDef: iconYlbxDef,
            iconSel: iconYlbxSel
          },
          {
            label: '自谋职业',
            value: 24,
            filled: false,
            iconDef: iconZmzyDef,
            iconSel: iconZmzySel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '相关手续',
            value: 25,
            filled: false,
            iconDef: iconXgsxDef,
            iconSel: iconXgsxSel
          }
        ]
      }
    ]
  }
]

// 企业移民实施左侧边栏选项列表
export const enterpriseSidebarList = [
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '资产评估',
        filled: false,
        list: [
          {
            label: '房屋/附属物',
            value: 1,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '土地/附着物',
            value: 2,
            filled: false,
            iconDef: iconTdfzwDef,
            iconSel: iconTdfzwSel
          },
          {
            label: '设施设备',
            value: 3,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '企业建卡',
            value: 4,
            filled: false,
            iconDef: iconYmjkDef,
            iconSel: iconYmjkSel
          }
        ]
      },
      {
        title: '腾空',
        filled: false,
        list: [
          {
            label: '房屋腾空',
            value: 5,
            filled: false,
            iconDef: iconFwtkDef,
            iconSel: iconFwtkSel
          },
          {
            label: '土地腾让',
            value: 6,
            filled: false,
            iconDef: iconTdtkDef,
            iconSel: iconTdtkSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '动迁协议',
            value: 7,
            filled: false,
            iconDef: iconDqxyDef,
            iconSel: iconDqxySel
          }
        ]
      }
    ]
  },
  {
    title: '安置阶段',
    filled: false,
    list: [
      {
        title: '',
        filled: false,
        list: [
          {
            label: '相关手续',
            value: 8,
            filled: false,
            iconDef: iconXgsxDef,
            iconSel: iconXgsxSel
          }
        ]
      }
    ]
  }
]

// 个体工商户移民实施左侧边栏选项列表
export const selfPersonSidebarList = [
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '资产评估',
        filled: false,
        list: [
          {
            label: '房屋/附属物',
            value: 1,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '土地/附着物',
            value: 2,
            filled: false,
            iconDef: iconTdfzwDef,
            iconSel: iconTdfzwSel
          },
          {
            label: '设施设备',
            value: 3,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '个体户建卡',
            value: 4,
            filled: false,
            iconDef: iconYmjkDef,
            iconSel: iconYmjkSel
          }
        ]
      },
      {
        title: '腾空',
        filled: false,
        list: [
          {
            label: '房屋腾空',
            value: 5,
            filled: false,
            iconDef: iconFwtkDef,
            iconSel: iconFwtkSel
          },
          {
            label: '土地腾让',
            value: 6,
            filled: false,
            iconDef: iconTdtkDef,
            iconSel: iconTdtkSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '动迁协议',
            value: 7,
            filled: false,
            iconDef: iconDqxyDef,
            iconSel: iconDqxySel
          }
        ]
      }
    ]
  },
  {
    title: '安置阶段',
    filled: false,
    list: [
      {
        title: '',
        filled: false,
        list: [
          {
            label: '相关手续',
            value: 8,
            filled: false,
            iconDef: iconXgsxDef,
            iconSel: iconXgsxSel
          }
        ]
      }
    ]
  }
]

// 村集体移民实施左侧边栏选项列表
export const collectiveSidebarList = [
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '资产评估',
        filled: false,
        list: [
          {
            label: '房屋/附属物',
            value: 1,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '土地/附着物',
            value: 2,
            filled: false,
            iconDef: iconTdfzwDef,
            iconSel: iconTdfzwSel
          },
          {
            label: '小型专项设备',
            value: 3,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      },
      {
        title: '腾空',
        filled: false,
        list: [
          {
            label: '房屋腾空',
            value: 4,
            filled: false,
            iconDef: iconFwtkDef,
            iconSel: iconFwtkSel
          }
        ]
      },
      {
        title: '',
        filled: false,
        list: [
          {
            label: '动迁协议',
            value: 5,
            filled: false,
            iconDef: iconDqxyDef,
            iconSel: iconDqxySel
          }
        ]
      }
    ]
  },
  {
    title: '',
    filled: false,
    list: [
      {
        title: '',
        filled: false,
        list: [
          {
            label: '集体资产处置',
            value: 6,
            filled: false,
            iconDef: iconXgsxDef,
            iconSel: iconXgsxSel
          }
        ]
      }
    ]
  }
]

// 只征地不搬迁左侧边栏选项列表
export const landNoMoveList = [
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '',
        filled: false,
        list: [
          {
            label: '资产评估报告',
            value: 1,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '生产安置确认',
            value: 2,
            filled: false,
            iconDef: iconTdfzwDef,
            iconSel: iconTdfzwSel
          },
          {
            label: '补偿卡',
            value: 3,
            filled: false,
            iconDef: iconScazDef,
            iconSel: iconScazSel
          },
          {
            label: '征地协议',
            value: 4,
            filled: false,
            iconDef: iconBqazDef,
            iconSel: iconBqazSel
          },
          {
            label: '土地腾让',
            value: 5,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      }
    ]
  },
  {
    title: '安置阶段',
    filled: false,
    list: [
      {
        title: '生产安置办理',
        filled: false,
        list: [
          {
            label: '自谋职业',
            value: 6,
            filled: false,
            iconDef: iconFmqrDef,
            iconSel: iconFmqrSel
          },
          {
            label: '养老保险',
            value: 7,
            filled: false,
            iconDef: iconScydDef,
            iconSel: iconScydSel
          }
        ]
      }
    ]
  }
]

export const landNoMoveOtherList = [
  {
    title: '动迁阶段',
    filled: false,
    list: [
      {
        title: '',
        filled: false,
        list: [
          {
            label: '资产评估报告',
            value: 1,
            filled: false,
            iconDef: iconFwfswDef,
            iconSel: iconFwfswSel
          },
          {
            label: '补偿卡',
            value: 3,
            filled: false,
            iconDef: iconScazDef,
            iconSel: iconScazSel
          },
          {
            label: '征地协议',
            value: 4,
            filled: false,
            iconDef: iconBqazDef,
            iconSel: iconBqazSel
          },
          {
            label: '土地腾让',
            value: 5,
            filled: false,
            iconDef: iconMnazDef,
            iconSel: iconMnazSel
          }
        ]
      }
    ]
  }
]
