<template>
	<view class="user-avatar">
		<view class="top">
			<view class="cu-bar">
				
				<view class="cu-avatar lg round text-bold" 
					  @click="toUser" 
					  data-url="userDetail" 
					  :style="{backgroundImage:`url(${headImgUrl})`}">  
				</view> 
				<view class="action sub-title userName">
					<view class="text-white text-Abc text-bold text-xl" 
							  @tap="bindLogin" >{{token? userInfo.userName:'请绑定账号'}}</view>
<!-- 					<view class="userExtra text-white">
						{{hasLogin?userInfo.nickname:''}}
					</view> -->
				</view>  
			</view>  

		</view>

	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		name:'avatar',
		
		props:{

			url:{
				type:String,
				default:''
				
			},
			userInfo:{ 
				type:Object
			},
			hasLogin:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			...mapState(['token']),

		},
		data() { 
			return {
				baseUrl:this.$api.baseUrl(),
				headImgUrl:''
			};
		},
		watch:{
			userInfo:{
				handler(newdata,olddata){
					// #ifdef MP-WEIXIN
					this.headImgUrl = newdata.avatarUrl
					// #endif
					// #ifdef H5
					this.headImgUrl = newdata.headImgUrl
					// #endif
					
					console.log('watch信息',newdata);
				},
				immediate: true, 
				deep:true  
			}
		},
		created() {   
			// this.headImgUrl = this.user.user.headImgUrl||''
		},
		methods:{
			toUser(url){
				uni.navigateTo({
					url: this.url,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">
.user-avatar{
	display: flex;
	flex-direction: column;
}
.top{
	
	padding-bottom: 74rpx;
	padding-left: 32rpx;
	padding-right: 74rpx;
	height:333rpx;
	line-height: 333rpx;
	margin-bottom: 20rpx;
	// border-bottom: 30rpx #F1F1F1 solid;
	position: relative; 
	background-image: linear-gradient(to top, #81a2f1 0%, #21a2f1  100%);
	display: flex; 
	background-size:cover;
	flex-direction: column;
}
.cu-bar .cu-avatar:first-child{
	margin-left: 0;
}
.cu-bar{
	padding-top: 100rpx;
	.cu-avatar{
		// padding: 0 40rpx;
		// font-size: 32rpx;
		height: 100rpx;
		width: 100rpx;
	}
}
.top {
	.cu-bar{  
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
}
.top::before{
    content: "";
    position: absolute;
    filter:blur(55px);
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-size: cover;
    overflow:hidden;
}
.cu-bar .content{
	background-color: #FFFFFF;
}
.userName{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	padding-left: 45rpx;
	height: 100%;
	margin-top: 20rpx;
	.userExtra{
		font-size: 25rpx;
		padding-top: 5rpx;
	}
}
.cu-bar .avatar-text{
	font-size: 37rpx
}
.bottom{
	color: #FFF;
	display: flex;
	.info{
		margin-top: 28rpx;
		margin-left: 150rpx;
		display: flex;
		.price{
			margin-left: 82rpx;
		}
		.points{
			font-family: PingFangSC-Medium;
			font-size: 32rpx;
		}
		.title{
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
		}
	}
	
}
</style>
