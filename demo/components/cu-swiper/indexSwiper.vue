<template>
	<view class="index-swiper">
		<!-- <view class="index-list "> -->
			<!-- <view class="cuIcon-indexleft left" @click="scrollx(1)"></view> -->
<!-- 			<scroll-view scroll-x="true" class="scrollView" :scroll-left="scrollDistance">
				  <view class="index-item"
						v-for="(item , index) in list"
						:key='index'>
						<image :src="item.url" mode="aspectFill"></image>
						<text class="item-title text-over-1">{{item.title}}</text>
				  </view>
			</scroll-view> -->
			<swiper class="square-dot"
					:indicator-dots="true" 
					:circular="true"
					:autoplay="true" 
					interval="5000" 
					duration="500">
					<swiper-item @click="toDetail"
						class="sw-item">
						<view class="sw-item-view"
						 v-for="item in testList1">
							<image :src="item.url"
								   mode="aspectFill" ></image>
							<text>{{item.title}}</text>
						</view>
					</swiper-item>    
					<swiper-item @click="toDetail"
						class="sw-item">
						<view class="sw-item-view"
						 v-for="item in testList2">
							<image :src="item.url"
								   mode="aspectFill" ></image>
							<text>{{item.title}}</text>
						</view>
					</swiper-item> 
			</swiper> 
			<!-- <view class="cuIcon-indexright right" @click="scrollx(2)"></view> -->
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		name:'indexSwiper',
		props:{
			list:{  
				type:Array,
				default:()=>[
					{url:'/static/img/js.png',title:'江苏银行'},
					{url:'/static/img/ali.png',title:'阿里云'},
					{url:'/static/img/dx.png',title:'江苏电信'},
					{url:'/static/img/cx.png',title:'储蓄银行'},
					{url:'/static/img/nj.png',title:'南京银行'},
					{url:'/static/img/xm.png',title:'小米金融'}, 
					{url:'/static/img/zj.png',title:'紫金租赁'},
					{url:'/static/img/zl.png',title:'江苏租赁'},
				] 
			},
		},
		data() {
			return { 
				scrollDistance:0,
				page:1,
				testList1:[
					{url:'/static/img/js.png',title:'江苏银行'},
					{url:'/static/img/ali.png',title:'阿里云'},
					{url:'/static/img/dx.png',title:'江苏电信'},
					{url:'/static/img/cx.png',title:'储蓄银行'},
				],
				testList2:[
	
					{url:'/static/img/nj.png',title:'南京银行'},
					{url:'/static/img/xm.png',title:'小米金融'}, 
					{url:'/static/img/zj.png',title:'紫金租赁'},
					{url:'/static/img/zl.png',title:'江苏租赁'},
				]
			};
		},
		methods:{
			scrollx(status){
				
				if(status==1){
					if(this.page>1){
						this.page--
					}
					this.scrollDistance -=  this.page * 3 * 95
				}else{
					
					this.scrollDistance +=  this.page * 3 * 95
					this.page++
				}
			}
		}
	}
</script>

<style lang="scss">
	
	.index-swiper{
		width: 692rpx;
		height: 162rpx;
		margin: 0 30rpx;
		background-color: #FFF;
	}	
	swiper{
		height: 100%;
		margin: 0 30rpx;
		.sw-item{
			// padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.sw-item-view{
				display: flex;
				align-items: center;
				width: 22%;
				overflow: hidden;
				flex-direction: column;
				image{
					width: 82rpx;
					height: 82rpx;
				}
			}

		}
	}
	.index-swiper1 {
		height: 100%;
		width: 100vw;
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
		.cuIcon-indexleft:before{
			color: #ddd;
		}
		.cuIcon-indexright::before{
			color: #ddd;
		}
		.index-list{
			width: 95%; 
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.left , .right{
				font-size: 45rpx;
				color: #999;
				padding: 0 5rpx;
				z-index: 9999;
			}
		}
	      .scrollView {
	        white-space: nowrap; // 滚动必须加的属性
	        width: 80%;
	        height: 100%; 
	        // padding: 20rpx;
	        // margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			background-color: #FFF;
			.index-item {
			  width: 135rpx; 
			  height: 135rpx;
			  padding: 20rpx;
			  border-radius: 50%;
			  border: 1rpx solid #f8f8f8;
			  // padding: 20rpx;
			  margin: 0 5rpx;
			  display: inline-block;
			  vertical-align: top;
			  position: relative;
			  image{
				  border-radius: 50%; 
				  width: 100%;
				  height: 100%;
			  }
			  .item-title {
				display: block; // 让字体换行
				color: #000;
				position: absolute;
				left: 20rpx;
				bottom: 20rpx;
				font-size: 30upx;
				line-height: 40upx;
			  }
			}

	      }
	    }
</style>
