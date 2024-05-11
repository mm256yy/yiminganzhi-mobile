# cus-selects-fan

## 属性说明

|属性名|类型|默认值|说明|
| -- | -- | --|--|
| value | String | '' | 选择的内容 |
| data | Array | [] | 下拉选择的数据 |
| valueType | Object |  {label:'label',value:'value'}  | 下拉选择数据的别名 |
| clearable | Boolean | false| 是否可以清空选项 |
| filterable | Boolean | false | 是否可搜索 |
| searchType | Number | 1 | 搜索类型，1:模糊搜素2:精确搜索 |
| placeholder | String | '请选择' | 占位符 |
| showTitle | Boolean | true | 是否显示标题占位图 |
| noDataText | String | ‘暂无数据’ | 选项为空时显示的文字 |
| arrLeft | Number|  20 | 选项区域的箭头巨左的间距 |
| size | Number | 240 | 选择框的宽 |
| closeSelect | Boolean | false | 关闭下拉框 |

|事件|
| @change 选中的值 |

## 使用示例

```html
	//基础用法
	<cus-selects :closeSelect.sync='close'  v-model="value"></cus-selects>
	
	//可清空
	<cus-selects :closeSelect.sync='close' v-model="value" :clearable='true'></cus-selects>
	// 模糊搜索
	<cus-selects :closeSelect.sync='close' v-model="value" :clearable='true' :filterable='true' :searchType='1'></cus-selects>
	// 精确搜索
	<cus-selects :closeSelect.sync='close' v-model="value" @change='change' :clearable='true' :filterable='true' :searchType='2'></cus-selects>
	
	//传入的数据以及别名
	<cus-selects :closeSelect.sync='close' :data="selectList" v-model="value" @change='change' :clearable='true' :valueType="alias"></cus-selects>
	
```

```javascript
import cusSelects from '@/components/cus-selects-fan/cus-selects-fan.vue'
export default {
  components: {
    cusSelects
  },
  data() {
    return {
      value:'',
	  selectList:[ //根据自己需求获得的下拉数据，如果数据不是{label:'',value:''}结构的就需要起一个别名来代指一下，就需要valueType
	  	{
	  		id:1,
	  		title:'hahah',
	  	},
	  	{
	  		id:2,
	  		title:'hahah1',
	  	},
	  	{
	  		id:3,
	  		title:'hahah3',
	  	}
	  ],
	  alias:{ //别名来代指一下
	  	label:'title',
	  	value:'id'
	  },
		close:false
    }
  },
  methods: {
    change(e) {
      console.log(e) //这里返回的是value值
    },
  },
}
```