<template>
	<!-- 我的 -->
	<view class="main">
		<view class="user-top">
			<avatar :userInfo="userInfo" 
					:hasLogin ='isLogin' 
					url="/pages/user/userDetail"></avatar>
		</view>  
		<view class="user-center">
			<view class="">
				<cu-item  title='基本资料'
						  icon="people" 
						  color="#00557f"  
						  showArrow
						  url="/pages/user/userDetail"></cu-item>
				<cu-item  title='物资审核'
						  icon="form"
						  showArrow
						  color="#44D7B6" 
						  url="/pages/approve/approve"></cu-item>							  
				<cu-item  title='意见反馈'  
							icon="comment" 
							color="#7C7DFF"
							showArrow
							@click='toFeedBack'></cu-item>	
				<cu-item  title='关于我们'
							icon="group" 
							color="#FF8738"
							showArrow
							url="/pages/index/h5"></cu-item>	
				<!-- #ifdef MP-WEIXIN -->
				<cu-item  	title='系统设置'
							icon="settings" 
							color="#ff0000" 
							showArrow
							@click='openSetting'></cu-item>
				<!-- #endif -->
				<!-- <view class="text-center text-userInfo text-gray" @click="toEdit">修改基本资料</view>			 -->
			</view>
		</view> 
		<view class="user-bootom">
<!-- 			<cu-button btnTxt="微信授权"
					   @click='toLogin' 	
						v-if="!token"  
					   color="blue"></cu-button> -->
				   
			<cu-button :btnTxt="token?'解除绑定':'绑定账号'"
						@click='bindLogin'
						color="blue"></cu-button>
		</view> 
		<view class="cu-modal bottom-modal" :class="feedStatus?'show':''">
			<view class="cu-dialog bg-white">
				<view class="padding-xl bg-white feed">
					<view class="close" @click="hideModal">
						<text class="cuIcon-close"></text>
					</view>
					<view class="title text-center">
						<text class="text-blod">意见反馈</text>
					</view>
					<view class="cu-content">
						<view class="bottom">
							<view class="margin-top">
								<text class="text-bold">请提出您的宝贵意见</text>
							</view>
							<view class="cu-form-input ">
								<textarea maxlength="-1" 
										class="textarea"
										@input="feedBackInput" 
										focus></textarea>
							</view>
						</view>  
						
					</view>
				</view>
				<view class="button"> 
					<button class="feed-btn" open-type="feedback">微信反馈</button>
					<button class="feed-btn" @click="submitFeed">确定</button>
					
				</view>
			</view>
		</view>
		<!-- <tabbar :navIndex='2'></tabbar> -->
	</view>
</template>

<script>
	import cuButton from '@/components/cu-button/cu-button.vue'
	import {APPID} from '@/apis/common.js'
	import cuCustom from '@/components/cu-custom/cu-custom.vue'
	import cuItem from '@/components/cu-list/cu-item.vue'
	import avatar from '@/components/user/cu-avatar.vue'
	import {getUrlParam} from '@/apis/util.js'
	// import tabbar from '@/components/tabBar.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['token', 'forcedLogin' ,'userInfo']),
			empId(){
				return this.userInfo.empId||''
			}
		},
		components: {
			avatar,
			cuItem,
			// tabbar, 
			cuCustom,
			cuButton
		},
		data() {
			return { 
				openId:'',
				code:'',
				APPID:APPID,
				isWechat:null,
				feedBackTxt:'',
				feedStatus:false,  
				isLogin:false,
				rateScore:4,
				CustomBar: this.CustomBar,
				user:{},
				isLoginOut:false,

			}
		},  
 
		 created() { 
			// 检测是浏览器端还是微信端
			// #ifndef H5 
			let ua = navigator.userAgent.toLowerCase();
			if (String(ua.match(/MicroMessenger/i)) === "micromessenger") {
			  this.isWechat = true;
			} else { 
			  this.isWechat = false;
			}
			if (this.isWechat) { 
			  //如果为微信端就进行code
			  this.toLogin()
			} 
			// #endif
		  },
		onLoad() {
			console.log('this.userInfo',this.userInfo);
			this.isLogin = this.hasLogin  
			this.code = uni.getStorageSync('code')||''		
		},  
		onShow() {
			this.checkSessing()
		},
		methods: {
			...mapMutations(['login','loginOut']),
			// #ifdef MP-WEIXIN
			openSetting(){
				wx.openSetting({
				  success (res) {}
				})
			},
			// #endif

			// #ifdef H5

			getOpenId(){  
				this.$api._get(`wx/redirect/${this.APPID}/greet?code=${this.code}&state=1`)
				.then(res=>{  
					console.log('wx用户信息',res)
					const user = uni.getStorageSync('userInfo')
					const { token } = user
					if(res.code==200){
						const { data } = res 
						let wxUserInfo = data.user
						wxUserInfo.token = data.token
						// debugger
						this.user = wxUserInfo
						 if(!data.token){ 
							 this.loginOut()
							 this.login(wxUserInfo)
						 }
					}
				})
				.catch(error=>{
					this.$msg('服务器访问错误')
					console.log(error);
				})
			},
			wxOauthLogin(){ 
				const Appid = this.APPID; 
				const local = window.location.href;
				window.location.href =
				  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${Appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
			},
			async toLogin(){ 
				const user = uni.getStorageSync('userInfo')
				const code = await this.getCode()  
				console.log('code',code); 
				if ( code == null || code == "") { 
					this.loginOut() 
					this.wxOauthLogin()
				} else { 
					this.getOpenId()
				}
			},
			//获取code 
			async getCode() {  
			  const code = await getUrlParam("code"); //是否存在code
			  this.code = code
			  return code
			},
			// #endif
			// #ifdef MP-WEIXIN
			
			// #endif
			checkSessing(){

			  wx.checkSession({
			    success:(res)=> {
			      console.log("检查登录态", res)
				  if(res.errMsg == "checkSession:ok"){

				  }
			    },
			    fail:(error)=> {
					console.log(error);
			    }
			  });
			},			
			//判断code信息是否存在
			// getUrlParam(name) {
			//   const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			//   const r = window.location.search.substr(1).match(reg);
			//   if (r != null) {
			// 	return unescape(r[2]);
			//   }
			//   return null;
			// },		
			bindLogin() {
				// #ifdef H5
				const user = uni.getStorageSync('userInfo')
				if(!user){
					this.$msg('暂未授权')
					this.toLogin()
					return
				}
				// #endif
				// #ifdef MP-WEIXIN
					
				if(!this.token){
					this.$api._showLogin()
					return
				}
				
				// #endif
				uni.navigateTo({
					url: '/pages/login/login',
				});
			},
			toUrl(url){
				uni.navigateTo({
					url:url
				})
			},
			hideModal(){ 
				this.feedStatus = false

			},
			toEdit(){
				uni.navigateTo({
					url:`./userDetail?edit=1`
				})
			},
			toShare(){
				this.$msg('请点击浏览器右上角分享按钮和朋友分享我们的产品')
			},
			bindLogout() {
				uni.showModal({
					title: '提示',
					content: '确认退出登录吗？',
					showCancel: true,
					success: res => {
						if(res.confirm){
							this.logout();
							this.isLogin = false
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			feedBackInput(e){
				this.feedBackTxt = e.detail.value
			},
			rateChange(e){
				console.log(e);
				this.rateScore = e.value
			},
			submitFeed(){
				this.hideModal()
				const timer =setTimeout(_=>{
					this.$msg('反馈成功')
				},500)
			},
			toFeedBack(){ 
				this.feedStatus = true

			}
		}
	}
</script>

<style lang="scss">
	.cu-dialog{
		.title{
			font-weight: bold;
			color: #000;
			font-size: 32rpx;
		}
		.feed{
			position: relative;
			.close{
				color: #000000;
				font-size:40rpx ;
				position: absolute;
				top: 22rpx;
				right: 22rpx;
			}
		}
		.feed-btn{
			border-radius: 0;
			color: #FFFFFF;
			background: #427AFF;
		}
	}
	.cu-content{
		text-align: left;
		display: flex;
		flex-direction: column;
		text{ 
			font-weight: normal;
			color: #000000;
		}
		.cu-form-input{
			margin: 20rpx 0;
		}
		.textarea{
			width: 100%;
			padding: 10rpx; 
			border: 2rpx solid #D1D1D1;
			border-radius: 4px;
		}
	}
	.main{
		min-height: 100%;
		background-color: #F1F1F1; 
	}
	.user-center{
		.text-userInfo{ 
			margin-top: 20rpx; 
			margin-bottom: 20rpx;
		}
	}
	.cuIcon-comment:before{
		font-size: 40rpx;
	}
	.user-bootom{
		margin-bottom: 200rpx;
	}
</style>
