<template>
	<view class="select_wrap" :style="{'width': size +'px'}">
		<view :class="['select_input',isClick?'select_input_select':'']" ref="select-input">
			<view class="input_info" @click.stop="openSelect" v-if="!readonly">
				<input placeholder-style="font-size: 14px;color: #a0a9b0;" :focus="isClick" @input="selectData" :value="selLabel" type="text" :readonly="readonly" :disabled="readonly" autocomplete="off" :placeholder="placeholder" class="text_tips">
			</view>
			<view class="input_info" @click.stop="openSelect" v-else>
				<view :placeholder="placeholder" class="text_tips">{{selLabel}} <text v-if="!selLabel">{{placeholder}}</text> </view>
			</view>
			<view class="icon_arrow" @click="clearItem">
				<view v-if="(!value&&!clearable) || (value&&!clearable) || (!value&&clearable) && !filterable" :class="['arrow',show?'arrow_down':'arrow_up']" ></view>
				<view class="arrow-clear" v-if="value&&clearable">x</view>
			</view>
		</view>
		<view class="select_modal_con" v-if="show"
			@touchmove.stop.prevent="() => {}">
			<scroll-view scroll-y="true" class="select_modal select_modal_scroll">
				<view class="select_content" ref="select_content">
					<view v-for="(item, index) in showData" :key="index" class="select_content_li" :class="{'selected': value == item[valueType.value]}" @click="change(item)">{{item[valueType.label]}}</view>
					<view class="select_content_li" v-if="!showData.length">{{noDataText}}</view>
					
				</view>
			</scroll-view>
			<!-- #ifndef H5 -->
			<!-- <scroll-view scroll-y="true" class="select_modal select_modal_scroll">
				<view class="select_content" ref="select_content">
					<view v-for="(item, index) in showData" :key="index" class="select_content_li" :class="{'selected': value == item[valueType.value]}" @click="change(item)">{{item[valueType.label]}}</view>
					<view class="select_content_li" v-if="!showData.length">{{noDataText}}</view>
					
				</view>
			</scroll-view> -->
			<!--  #endif -->
			<!-- #ifdef H5  -->
				<!-- <view class="select_modal">
					<view class="select_content" ref="select_content">
						<view v-for="(item, index) in showData" :key="index" class="select_content_li" :class="{'selected': value == item[valueType.value]}" @click="change(item)">{{item[valueType.label]}}</view>
						<view class="select_content_li" v-if="!showData.length">{{noDataText}}</view>
					</view>
				</view> -->
			<!--  #endif -->
			<view class="cons_arrow" :style="{'left': arrLeft +'px'}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => [{
						label: '2022-02',
						value: '02'
					},
					{
						label: '2022-01',
						value: '01'
					},
					{
						label: '2021-12',
						value: '12'
					},
					{
						label: '2021-11',
						value: '11'
					},
					{
						label: '2021-10',
						value: '10'
					},
					{
						label: '2021-09',
						value: '09'
					}
				]
			},
			valueType: {
				type: Object,
				default:()=>{
					return {
						label:'label',
						value:'value'
					}
				} 
			},
			value: {
				type: [String,Number],
				default: ''
			},
			clearable:{
				type: Boolean,
				default: false
			},
			filterable:{
				type: Boolean,
				default: false
			},
			searchType:{
				type: Number,
				default: 1
			},
			placeholder:{
				type: String,
				default: '请选择'
			},
			noDataText:{
				type: String,
				default: '暂无数据'
			},
			arrLeft:{
				type: Number,
				default: 20
			},
			size:{
				type: Number,
				default: 240
			},
			closeSelect:{
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				show: false,
				readonly:true,
				isClick:false,
				totalArr:[],
				showData:[],
				selLabel:''
			}
		},
		watch:{
			'filterable':{
				immediate:true,
				deep:true,
				handler(news){
					this.readonly = !news
				}
			},
			'data':{
				immediate:true,
				deep:true,
				handler(news){
					this.showData = news
					this.totalArr = news
				}
			},
			'value':{
				immediate:true,
				deep:true,
				handler(news){
					console.log(news,'value',this.data,this.valueType.value)
					if(news){
						let index = this.data.findIndex(ite=>ite[this.valueType.value]==news)
						if(index==-1){
							uni.showToast({
								title:'传入的value不存在',
								icon:'none',
								duration:1500
							})
						}else{
							this.selLabel = this.data[index][this.valueType.label]
						}
					}
				}
			},
			closeSelect:{
				immediate:true,
				deep:true,
				handler(news){
					this.show = news
				}
			}
		},
		created() {},
		methods: {
			openSelect(){
				console.log('openSelect[[[]]]')
				// if(!this.filterable){
				// 	this.show=!this.show
				// }
				this.show=!this.show
				this.$emit("update:closeSelect", this.show)
				this.isClick = !this.isClick
			},
			change(item) {
				if (this.value != item[this.valueType]) {
					this.$emit('input', item[this.valueType.value])
					this.$emit('change', item[this.valueType.value])
				}
				this.selLabel = item[this.valueType.label]
				this.show = false
				this.$emit("update:closeSelect", this.show)
				this.isClick = false
				this.showData = this.data
			},
			clearItem(){
				if(this.clearable){
					this.$emit('input', '')
					this.$emit('change', '')
				}
				this.selLabel = ''
				
			},
			selectData(e){
				let sel = e.detail.value
				if(sel){
					let arrCons = []
					let selVal = []
					this.data.forEach(item=>{
						arrCons.push(item)
					})
					arrCons.forEach((item)=>{
						if(this.searchType==1){
							if(item[this.valueType.label].indexOf(sel)!=-1){
								selVal.push(item)
							}
						}else{
							if(item[this.valueType.label]==sel){
								selVal.push(item)
							}
						}
						
					})
					this.show = true
					this.$emit("update:closeSelect", this.show)
					
					this.showData = selVal
				}else{
					this.showData = this.data
				}
			}
		},
		beforeDestroy() {}
	}
</script>

<style lang="less" scoped>
	.select_wrap {
		width: 240px;
		display: inline-block;
		position: relative;

		.select_input {
			-webkit-appearance: none;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid #dcdfe6;
			box-sizing: border-box;
			color: #606266;
			display: inline-block;
			font-size: inherit;
			height: 40px;
			line-height: 40px;
			outline: none;
			padding: 0 15px;
			box-sizing: border-box;
			transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
			width: 100%;
			padding-right: 30px;

			.input_info {
				font-size: 18px;
				width: 100%;
				height: 100%;
				.text_tips{
					height: 100%;
					text{
						font-size: 14px;
						color: #a0a9b0;
					}
				}
			}

			.icon_arrow {
				position: absolute;
				width: 30px;
				height: 40px;
				right: 0;
				top: 0;
				text-align: center;
				color: #c0c4cc;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 999;
				.arrow {
					width: 10px;
					height: 10px;
					background-color: transparent;
					/* 模块背景为透明 */
					border-color: #c0c4cc;
					border-style: solid;
					border-width: 1px 1px 0 0;
					box-sizing: border-box;
					transition: all .3s;
					box-sizing: border-box;
					/*箭头方向可以自由切换角度*/
				}
				.arrow_down{
					transform: rotate(-45deg);
					margin-top: 5px;
				}
				.arrow_up{
					transform: rotate(135deg);
					margin-top: -5px;
				}
				.arrow-clear{
					width: 14px;
					height: 14px;
					border: 1px solid #e4e7ed;
					color: #e4e7ed;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 12px;
				}
			}
		}
		.select_input_select{
			border-color: #409eff;
		}
	}

	.select_modal_con {
		width: 100%;
		transform-origin: center top;
		z-index: 2062;
		position: absolute;
		top: 40px;
		left: 0;
		border: 1px solid #e4e7ed;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		box-sizing: border-box;
		margin-top: 12px;

		.cons_arrow {
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			top: -6px;
			left: 10%;
			margin-right: 3px;
			border-top-width: 0;
			border-bottom-color: #ebeef5;

		}

		.cons_arrow:after {
			content: " ";
			border-width: 6px;
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			top: 1px;
			margin-left: -6px;
			border-top-width: 0;
			border-bottom-color: #fff;
		}
	}

	.select_modal {
		overflow: scroll;
		height: 160px;
		.select_content{
			list-style: none;
			padding: 6px 0;
			margin: 0;
			box-sizing: border-box;
			.select_content_li {
				font-size: 14px;
				padding: 0 20px;
				position: relative;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #606266;
				height: 34px;
				line-height: 34px;
				box-sizing: border-box;
				cursor: pointer;
				&.selected {
					color: #409eff;
					font-weight: 700;
					background-color: #f5f7fa;
				}
			}
			
			.select_content_li:hover {
				background-color: #f5f7fa;
			}
		}
		

		
	}
	.select_modal_scroll{
		overflow: hidden;
		height: 160px;
	}

	// .select_content {
	// 	background-color: #fff;

	// 	.select_content_li {
	// 		padding: 12rpx;


	// 	}
	// }
</style>
