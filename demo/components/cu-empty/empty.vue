<template>
	<view class='empty'>
	  <text :class="'cuIcon-'+imgUrl" :style="'font-size:'+size+'rpx'"></text>
	  <view>{{tip}}</view>
	</view>
</template>

<script>
	export default {
		name:'empty',
		props:{
			imgUrl: {
			  type: String,
			  default: 'copy',
			},
			size: { 
			  type: Number,
			  default: 150
			},
			tip: {
			  type: String, 
			  default: '暂无数据...',
			},
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
.empty {
  font-size: 30rpx;
  color: #999;
  min-height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty text {
  margin-bottom: 10rpx;
}
</style>
