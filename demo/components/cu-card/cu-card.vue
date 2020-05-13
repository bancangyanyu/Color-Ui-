<template>
	<view class="finish flex justify-center align-center flex-direction">
		<view class="finish-top">
			<text class=" text-white"
				  :class="status?'cuIcon-roundcheck':'cuIcon-roundclose'"></text>
		</view>  
		<view class="finish-bottom text-white margin-top text-lg">
			{{status?'申请完成，请等待审核':'申请失败，请检查'}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			status:{
				type:[Boolean,String],
				default:false
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.finish{
		
		width: 100vw;
		height: 200rpx;
		background-color: #ff9502;
		.finish-top {
			text{
				font-size: 22px;
			}
		}	
	}

</style>
