<template>
	<view>
		<view class="cu-list menu menuCard skeleton " >
			<block v-for="(item ,index ) in list" :key='index'  >
				<cu-item :url='item.url' 
						 :showArrow='showArrow'
						 :showImg='showImg'
						 :showBtn ='showBtn'
						 :showSwitch='showSwitch'
						 :btnTxt='btnTxt'
						 :icon='item.icon'
						 :color='item.color' 
						 :title='item.title'
						 :extra='item.extra'
						 :content='item.content'
						 :showMargin='item.showMargin'></cu-item>
			</block>
		</view>	
	</view>
</template>

<script>
	import cuItem from './cuItem.vue'
	export default {  
		name:'cuList',
		components:{
			cuItem
		},
		props:{
			showBtn:{
				type:Boolean,
				default:false
			},
			showSwitch:{
				type:Boolean,
				default:false
			},
			btnTxt:{
				type:String,
				default:'审核'
			},

			showImg:{
				type:Boolean, 
				default:false
			},
			list:{
				type:Array,
			},
			showArrow:{
				type:Boolean,
				default:false
			}
		},
		data() { 
			return {
				
			};
		},
			
		methods:{ 

		}
	}
</script>

<style>
	.cu-list{
		background-color: #F1F1F1;
	}
	.content{
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding-left: 0;
	}
</style>
