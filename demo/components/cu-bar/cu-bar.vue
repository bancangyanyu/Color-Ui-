<template>
		<view class="cu-bar bg-white ">
			<view class="action">
				<text class=" text-orange"
					  :class="['text-'+ color,'cuIcon-'+ Ticon]"></text>
				<text class="title text-bold" :style="{color:Tcolor }">{{title}}</text>
				<text class="text-orange Eicon"
					  :class="['text-'+ color,'cuIcon-'+ Eicon]"></text>
			</view>
			<view class="action" @click="more"> 
				<text class="extra" @click="more">{{extra}}</text> 
				<text class="text-sm" :class="'cuIcon-'+ icon"></text>
				<slot name="filter"></slot>
			</view> 
		</view>
</template>

<script>
	export default {
		name:'bar',
		props:{
			title:{
				type:String,
				default:''
			},
			Tcolor:{
				type:String,
				default:'#000'
			},
			color:{
				type:String,
				default:'blue'
			},
			extra:{
				type:String,
				default:''
			},
			Ticon:{
				type:String,
				default:'titles'
			},
			Eicon:{
				type:String,
				default:'1'
			},
			icon:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			more(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.cu-bar{
		.action{
			display: flex;
			align-items: center;
			justify-content: center; 
			margin:0 30rpx; 

		}
		.title{
			height: auto;
			line-height: 50rpx;
			font-size: 35rpx;  
		} 
		/deep/.Eicon{ 
			margin-left: 18rpx !important;
		}
	}
	.cuIcon-titles{
		&:before{ 
			font-size: 40rpx;
		}
	}
	.cuIcon-right{ 
		&:before{ 
			font-size: 36rpx;  
			color: #666666; 
		}
	}

</style>
