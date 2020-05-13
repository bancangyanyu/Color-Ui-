<template>
	<view>
		<view class="cu-list menu menuCard skeleton " >
			<view class="cu-item " 
				  :class='[showArrow?"arrow":"",showMargin?"marginT":"" ,forLeft?"forLeft":""]' 
				  v-if="!showImg"
				  @click="toDetail(url)"> 
				<view class="content padding-tb-sm">
					<view class="skeleton-rect left">
						<text class=" margin-right-xs icon" 
							  :class="[icon?'cuIcon-'+icon:defaultIcon , 
							  color?'text-'+color:'text-blue']" 
							  :style="{padding:icon||0,color:color||'blue'}"> 
						</text>
						 
						<!-- <image :src="icon" mode="aspectFit"></image> -->
						<text style="width: 160rpx;"
							
							  :style="{color:Tcolor}">{{title||''}}</text>
						<text class="info">{{info}}</text></view>
					</view> 
					<view class="text-gray text-sm margin-right ">
						<text class="margin-right-xs">
						</text> {{extra}}
					</view>  
				<view class="action ">   
					<view class="light text-sm skeleton-rect" v-if="!showBtn">
					{{content||''}}</view> 
					<button class="cu-btn sm bg-blue" 
							v-if="showBtn" 
							@click.stop="btnClick">{{btnTxt}}</button>
					<switch class="switch-sex" 
							@change="SwitchSex" 
							:class="skin?'checked':''" 
							:checked="skin?true:false"
							v-if="showSwitch"></switch>
				</view> 
			</view>	

			<view class="" v-else>
				<view class="cu-bar bg-white " >
					<view class="action border-title">
						<text class="text-xl text-bold text-blue">图</text>
						<text class="bg-gradual-blue" style="width:3rem"></text>
					</view>
				</view>
				<view class="image-sheet skeleton-rect" v-if="deciceInfo.sheet">
					<image :src="errorImage? sheet:deciceInfo.sheet" 
							mode="aspectFit" 
							@error='errorImg'
							@click="showImage"></image>
				</view>
			</view>
		</view>	
	</view>
</template> 

<script>
	export default { 
		name:'cuItem',
		props:{
			// 左边标题
			title:{
				type:String,
				default:'设备名称'
			},
			Tcolor:{
				type:String,
				default:''
			},
			// 左边图标
			icon:{
				type:String,
				default:''
			},
			// 是否显示按钮
			showMargin:{
				type:Boolean,
				default:false
			},
			info:{
				type:String,
				default:''
			},
			showBtn:{
				type:Boolean,
				default:false
			},
			forLeft:{
				type:Boolean,
				default:true
			},
			showSwitch:{
				type:Boolean,
				default:false
			},
			// 按钮文字
			btnTxt:{
				type:String,
				default:'审核'
			},
			// 中间内容
			extra:{
				type:String,
				default:''
			},
			// 右边内容
			content:{
				type:[String ,Number ],
				default:''
			},
			showImg:{
				type:Boolean,
				default:false
			},
			//显示右边箭头
			showArrow:{
				type:Boolean,
				default:false
			},
			// 图标颜色
			color:{
				type:String,
				default:'blue'
			},
			//跳转路由
			url:{
				type:String,
				default:''
			},
			//跳转传参
			routerId:{
				type:Number,
			}
		},
		data() {
			return {
				 defaultIcon:'cuIcon-titles',
				 clickUrl:this.url
			};
		},
			
		methods:{ 
			toDetail(){
				if(!this.clickUrl){  
					this.$emit('click')
				}else{  
					uni.navigateTo({
						url: `${this.url}?id=${this.routerId}`, 
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			btnClick(){
				this.$emit('btnTap')
			}
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #FFFFFF;
		
		display: flex;
		flex-direction: column;
		padding-left: 0;
	}
	.cu-item{
		border-bottom: 1px solid #eee;
		
		.icon{
			font-size: 24px;
			padding-right: 10rpx;
		}
		.left{
			text-align: left;
			image{
				margin-right: 22rpx;
				width:36rpx;
				height: 36rpx;
			}
			// color: #999;
		}
		.info{
			margin-left: 30rpx;
			color: #000;
			font-size: 30rpx;
		}
	}	
	.marginT{
		margin-top: 20rpx;
	}
	.forLeft{
		display: flex;
		justify-content: flex-start;
	}
</style>
