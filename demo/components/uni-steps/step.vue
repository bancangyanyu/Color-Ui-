<template>
	<view class="step">
		<view class="bg-white ">
			<view class="cu-steps" >
				<view class="cu-item" 
					  :class="index>step?'':'text-blue'" 
					  v-for="(item,index) in stepList" 
					  :key="index"
					  @click="chooseStep(index)">  
					<text :class="item.cuIcon=='err'?'err':`cuIcon-${item.cuIcon}`" 
					      class="num"   
						  :data-index="index + 1"></text> 
					{{item.name}}
				</view> 
			</view>
		</view>
	</view> 
</template>

<script>
	export default {
		props:{
			step:{
				type:Number,
				default:0
			},
			stepList:{
				type:Array,
				default:()=>{[]}
			},
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			chooseStep(index){
				this.$emit('choose',index)
			}
		}
	}
</script>

<style lang="scss">
	.step{
		.bg-white{
			padding: 40rpx;
		}
		.cu-steps{
			padding: 0 25rpx; 
		}
	}
</style>
