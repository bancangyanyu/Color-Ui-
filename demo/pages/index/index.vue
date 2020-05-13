<template>
	<!-- 首页 -->
	<view class="main ">
		<view class="index-top ">
			<index-top-swiper :list="[]"></index-top-swiper>
			<view class="index-list">
			</view>
		</view>
		<view class="index-center">
			<cubar title="最新通知"
				   Ticon='notice'  
				   @click='more' 
				   icon='1'   
				   extra='更多'></cubar>
			<cu-item  title='通知1' 
					  icon="1" 
					  color="#4786FF"  
					  showArrow
					  content="2020-03-12"
					  @click='toNotice'></cu-item>
			<cu-item  title='通知2' 
					  icon="1" 
					  color="#4786FF"  
					  showArrow
					  content="2020-03-12"
					  @click='toNotice'></cu-item>					  
		</view>
		<view class="index-bottom" :class="showBottom?'':'margin-index'">
<!-- 			<cubar title="审核列表"
				   Ticon='1' 
				   @click='more'></cubar>
			<cu-item  title='122' 
					  icon="1" 
					  color="#4786FF"  
					  showArrow
					  content="2020-03-12"
					  url="/pages/approve/approveDetail"></cu-item>				   
			<cu-item  title='122' 
					  icon="1" 
					  color="#4786FF"  
					  showArrow   
					  content="2020-03-12"
					  url="/pages/approve/approveDetail"></cu-item>		 -->			  
		</view> 

		<!-- <tabbar :navIndex='0'></tabbar> -->
	</view>
</template> 
  
<script>
	import cuItem from '@/components/cu-list/cu-item.vue'
	import indexTopSwiper from '@/components/cu-swiper/index-top-swiper.vue'
	import cubar from '@/components/cu-bar/cu-bar.vue'
	// import tabbar from '@/components/tabBar.vue'
	import empty from '@/components/cu-empty/empty.vue'
	import {indexGrid} from '@/apis/common.js'
	import formItem from '@/components/cu-form/form-item.vue'
	import {
		mapState,
		mapMutations 
	} from 'vuex' 
	export default {
		name:'index',
		components:{
			cuItem,
			cubar,
			// tabbar,
			empty, 
			formItem,
			indexTopSwiper,
		},  
		computed: {
			...mapState(['access'])
		}, 
		data() {
			return {
				loanAccount:'',
				loanEriod:'',
				showSkeleton: true,
				role:this.access,//根据权限展示grid数据
				content:'欢迎使用智造链平台，为了更好的使用，我们上线了智造链平台，欢迎大家多多分享，共同关注',
				devList:[],
				list:indexGrid,
				showBottom:false,
			}
		},

		onLoad() {
			
		},
		onReachBottom() {
			const timer = setTimeout(_=>{
				if(!this.showBottom){
					// uni.showLoading({ 
					// 	title:'正在加载'
					// })
					this.$msg('正在加载')
					this.showBottom = true
				}
				
				clearTimeout(timer)
			},500)
		},
		methods: {
			// 分享
			toNotice(){
				this.$msg('敬请期待')
			},
			share(){
				uni.navigateTo({
					url: '../share/share',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			more(){
				uni.navigateTo({
					url: '../device/list', 
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			selectTime(e){
				this.loanEriod = e.select
				console.log('选择',e.select);
			},
			inputLoan(e){
				this.loanAccount = e.input
				console.log(e.input); 
			}
		}
	}
</script>

<style lang="scss">
	.main{
		background-color: #EEE;
		display: flex;
		flex-direction: column;
	}
	swiper{ 
		height: 280rpx; 
	}
	.index-top{
		// position: relative;
		// uni-swiper/deep/ .uni-swiper-dots-horizontal{
		// 	left: 90%;
		// }
		swiper{
			position: relative;
			// .share{
			// 	position: absolute;
			// 	top: 20rpx;
			// 	right: 20rpx;
			// 	border-radius: 50%;
			// 	width: 60rpx;
			// 	height: 60rpx;
			// 	z-index: 99999; 
			// 	background-color:rgba(185 , 185 , 185 , .6);
			// 	// background-color: #808080;
			// 	font-size: 22rpx; 
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// 	color: #FFFFFF;
			// }
		}

	}
	.index-center{
		background-color: #FFF;

	}
	.margin-index{
		margin-bottom: 150rpx;
	}
	.index-img{
		margin-top: 20rpx;
		image{
			height: 150rpx;
		}
	}
	.index-bottom{
		height: 100%;
		// margin-top: 20rpx;
		background-color: #FFF; 

	}
	// .cu-bar /deep/ .title{
	// 	font-weight: bold;
	// 	color: #000;
	// 	font-size: 42rpx;
 
	// }
	.cu-dialog{
		width: 468rpx;
		border-radius: 8rpx;
		background-color:transparent; 
		.modal-content{
			display: flex;
			justify-content: space-between;
			.left ,.right{
				display: flex;
				flex-direction: column;
				justify-content: center;
				
			}
		}
		.close{
			// background-color:transparent; 
			color: #FFF;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999;
			text{
				font-size: 70rpx;
				margin-top: 52rpx;
			}
		}
		.cu-content{
			padding: 20rpx 3rpx ;
		}
	}

</style>
