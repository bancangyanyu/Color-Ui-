<template>
	<!-- <view class="user-list"> -->
		<view class="user-item">
			<view class="top">
				<view class="user-title">
					{{title}}
				</view>
			</view>
			<view class="bottom">
				<input type="text" 
					   @input="handleInput"
					   :value="content" 
					   class="user-content" />
				<!-- <text @click="Edit" v-if="showEdit">编辑</text> -->
			</view>
		</view>
	<!-- </view> -->
</template>

<script>
	export default {
		name:'user-list',
		behaviors: ['uni://form-field'],
		props:{
			title:{
				type:String,
				default:''
			},
			content:{
				type:String,
				default:''
			},
			showEdit:{
				type:[Boolean,String],
				default:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			Edit(){
				this.$emit('edit')
			},
			handleInput(e){
				this.$emit('input',e.target.value||'')
				// if(!e.target.value&&this.need){
				// 	console.log('内容没有填写');
				// }
			}
		}
	}
</script>

<style lang="scss">
	// .user-list{
	// 	background-color: #FFF;
		.user-item{
			background-color: #FFF;
			margin: 0 30rpx;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #E3E3EC;
			.top{
				
				.user-title{
					margin-top: 23rpx;
					font-family: PingFangSC-Medium;
					font-size: 28rpx;
					color: #000000;
				}

			}
			.bottom{
				display: flex;
				margin-top: 16rpx;
				justify-content: space-between;
				.user-content{
					margin-bottom: 14rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #6D7278;
				}
				text{
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: #2968FF;
				}
			}
		}
</style>
