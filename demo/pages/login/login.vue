<template>

	<view class='main'>
		<view class='top cu-card'>
			<navigator url="../index/h5">
				<view class='logo' >
					<image src='../../static/img/logo.png' mode="aspectFit"></image>
				</view> 
				<view class="title text-center">
					<!-- <text class="text-right">链 接 世 界 | 创 造 未 来</text> -->
				</view>
			</navigator>
			<view class="lg-login bg-white ">
				<form-item  title="输入您的姓名" 
							:maxlength='128'     
							name='userName' 
							v-model="formData.userName"></form-item> 				
				<form-item  title="输入您的工号" 
							:maxlength='128'     
							name='empId' 
							v-model="formData.empId"></form-item> 
				<!-- #ifdef H5 -->
				<cu-button btnTxt="绑定"
						   @click='bindLogin' 
						   color="blue"
						   v-if="!token"></cu-button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="flex flex-direction margin-top margin-right margin-left margin-bottom">
					<button class="cu-btn bg-blue lg" 
							open-type="getUserInfo"
							@getuserinfo="wxGetUserInfo"
							withCredentials="true"
							v-if="!token">绑定授权</button>		
				</view>	
				<!-- #endif -->

				<cu-button btnTxt="解除绑定"
						   @click='bindLoginOut' 
						   color="blue"
						   v-if="token"></cu-button>						   
				<view class="flex justify-center login-bottom"> 
					<text class="forget" @click="loginError">绑定遇到问题?</text>  
					<text class="forget">|</text>
					<text @click="forget"  
						  class="forget">忘记工号</text>
				</view> 

			</view>
		</view>

	</view>
</template> 

<script>
	import formItem from '@/components/cu-form/form-item.vue'
	import service from '../../service.js';
	import cuCustom from '@/components/cu-custom/cu-custom.vue'
	import cuButton from '@/components/cu-button/cu-button.vue' 
	import { URL } from '@/apis/common.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			cuButton,
			cuCustom,
			formItem
		},
		data() {
			return {
				 
				formData:{
					userName:'',
					empId:'', 
					// #ifdef H5
					openId:'',
					// #endif
					
					// #ifdef MP-WEIXIN
					wxCode:'' 
					// #endif
				},
				user:this.userInfo,
				radio:'A',
				passwordType:true
			}
		},
		computed:{ 
			...mapState(['token', 'forcedLogin' ,'userInfo']),
		},
		methods: {
			...mapMutations(['login','loginOut','bind']),
			wxGetUserInfo(){
				//获取微信用户信息
				this.$api.login(this.formData)
				.then(res=>{
					console.log('微信登录',res);
					if(res.code==200){
						this.$msg('授权绑定成功') 
						const user = Object.assign(res.userInfo,res.data)
						this.login(user)
						const timer = setTimeout(res=>{
							uni.switchTab({
								url:'/pages/user/user'
							})
						},500)
					}else{
						this.$msg('授权失败')
					}


				})
				.catch(error=>{
					this.$msg('授权失败')
				})
			},

			forget() { 
				this.$msg('请联系管理员修改账户密码') 
			},
			register(){
				uni.reLaunch({
					url: '../rent/application',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			bindLoginOut(){
				
				if(!this.formData.userName){
					this.$msg('请输入姓名')
					return 
				}
				if(!this.formData.empId){
					this.$msg('请输入工号')
					return
				} 
				const { userName , empId} = this.formData
				const user = { 
					userName:userName,
					empId:empId
				}
				// #ifdef MP-WEIXIN
				const url = 'mjservice/user/unBind'
				// #endif
				// #ifdef H5
				const url = 'mjservice/user/unBindOpenId'
				// #endif
				uni.showModal({
					title:'提示',
					content:'确认解除绑定？',
					success: (res) => {
						if(res.confirm){
							this.$api._post(url, user)
							.then(res => {
								console.log('解除绑定',res);
								if(res.code==200){
									this.$msg('解除绑定成功，请重新进入')
									this.loginOut()
									const timer = setTimeout(_=>{
										uni.switchTab({
											url:'/pages/user/user'
										})
									},500)
									
								}else{
									this.$msg(`解除绑定失败${res.msg||''}`)
								}
							
							}).catch(error => {
								console.log(error);
							 
							})
						}
					}
				})

			},
			bindLogin() {
				let userInfo = uni.getStorageSync('userInfo') 
				this.formData.openId = userInfo.openId||''
				if(!this.formData.userName){
					this.$msg('请输入姓名')
					return
				}
				if(!this.formData.empId){
					this.$msg('请输入工号')
					return
				}
				if(!this.formData.openId){ 
					this.$msg('请重新授权')
					return
				}
				console.log('输入的绑定数据',this.formData);
				uni.showModal({
					title:'提示',
					content:'确认绑定',
					success: (res) => {
						if(res.confirm){
							this.$api._post("mjservice/user/bindOpenId", this.formData)
							.then(res => {
								console.log('绑定',res);
 
								// uni.setStorageSync('token',res.data.token)
								if(res.code==200){
									this.$msg('绑定成功')
									const timer = setTimeout(_=>{
										uni.switchTab({
											url:'../user/user'
										})
										clearTimeout(timer)
									},500)

									let userInfo = uni.getStorageSync('userInfo')
									 
									let user = Object.assign(userInfo,res.data.user)
									user.token = res.data.token
									this.login(user)
								}else{
									this.userName = 1
									this.$msg(`绑定失败，${res.msg}`)
								}
							
							}).catch(error => {
								this.$msg('服务器访问错误')
								console.log(error);
							 
							})
						}
						
					}
				})

			},

			toMain(userName) {
				this.login(userName);
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '/pages/index/index',
					});
				} else {
					uni.navigateBack();
				}

			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			look(){
				if (!this.password) {
					this.$msg('请输入您的密码')	
					return;
				}
				this.passwordType = !this.passwordType
			},
			loginError(){
				this.$msg('请联系管理员')
			}
		},
		onReady() {
			
		}
	}
</script>

<style lang="scss">
	.cu-form-group{
		// input{
			// background-color: #1E90FF;
		// }
		// border-bottom: 1px solid #eee;
		.title{
			font-size: 35rpx;
		}
		.placeClass{
			font-size: 25rpx;
			color: #d1d1d1;
		}
	}
	.cu-form-group ~.cu-form-group{ 
		border-bottom: 1rpx solid #eee;
	}
	.lg-login{
		margin-top: 80rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		border-radius: 15rpx;
		.cuIcon-people:before{
			font-size: 60rpx;
			color: #d1d1d1;
		}
		.cuIcon-attention:before{
			font-size: 40rpx;
			color: #d1d1d1;
		}
		.cuIcon-attentionforbid:before{
			font-size: 40rpx;
			color: #d1d1d1;
		}
		.cuIcon-unlock:before{
			font-size: 60rpx;
			color: #d1d1d1;
		}
	}
	.action-row {
		display: flex;
		flex-direction: row; 
		justify-content: center;
		color: #FFFFFF;
	}

	.action-row navigator {
		color: #FFFFFF;
		padding: 0 20rpx;
	}

	.main {
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	.top{
		margin-top: 50px;
		.title{
			text{
				color: #999;
				font-size: 24rpx;
			}
		} 
	}
	.logo { 
		padding-top: 30rpx;
		padding-bottom: 0rpx;
		text-align: center;
	}
	.logo image { 
		// width: 240rpx;
		height: 257rpx
	}

	.login {
		width: 100%;
		margin-top: 20rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 4rpx;
		background: #5cadff
	}

	.footer {
		height: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		font-size: 25rpx;
		color: #FFF;
	}

	.forget{
		color: #d1d1d1;
		font-size: 25rpx; 
		
	}
	.forget+.forget{
		padding-left: 50rpx;
	}
	.login-bottom{
		padding: 0 5rpx;
	}
	.lg-bottom{
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-top: 50rpx;
		.top{
			display: flex;
			justify-content: center;
			height: 50rpx; 
			
			text{
				color: #d1d1d1;
				margin-top: 28rpx;
			}
			.left{
				width: 30%;
				margin-right: 50rpx;
			}
			.right{
				width: 30%;
				height: auto;
				margin-left: 50rpx;
			}
			.lg-border{
				border-bottom: 1rpx solid #d1d1d1;
			}
		}
		.lg-img{
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			image{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 1rpx solid #d1d1d1;
				padding: 10rpx;
			}
		}
	}
</style>
