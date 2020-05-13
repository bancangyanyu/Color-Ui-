<template>
	<!-- 用户详情 -->
	<view class="main">
<!-- 		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>

			<block slot="right">
				<text class="margin-right" @click='updateUser'>{{edit?'取消编辑':'编辑'}}</text>
			</block>
		</cu-custom> -->

		<view class="user-center" :style="{marginTop:CustomBar }">
			<user-list title="姓名" 
					   :content="userInfo.userName||'无'"
					   v-model='userInfo.userName'
					   @edit='updateUser'></user-list>
			<user-list title="工号"  
					   :content="userInfo.empId||'无'"
					   @edit='updateUser'></user-list>					   
			<user-list title="昵称" 
					   :content="userInfo.nickname||'无'"
					   v-model='userInfo.nickname'
					   @edit='updateUser'></user-list>					   

			<user-list title="城市" 
					   :content="`${userInfo.province}-${userInfo.city}`"
					   v-model='userInfo.city'
					   @edit='updateUser'></user-list>						   
		</view>

		<view class="cu-modal" :class="edit?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="" >
				<view class="padding" >
					<view class="" v-if="!isPassword">
						<form-item title="姓名"
								   :maxlength='64'
								   name="userName"  
								   v-model="userInfo.userName"
								   :need="false"
								   row></form-item>
						<form-item title="工号"
								   :maxlength='64'
								   name="empId"  
								   v-model="userInfo.empId"
								   :need="false"
								   row></form-item>

					</view>
				</view>
				<cu-button btnTxt="提交" 
						   @on-click='submitUser' 
						   fromType='submit'></cu-button>
			</view>
		
		</view>
	</view>
</template>
 
<script>
	import formItem from '@/components/cu-form/form-item.vue'
	import cuButton from '@/components/cu-button/cu-button.vue'
	import listItem from '@/components/cu-list/cu-item.vue' 
	import avatar from '@/components/user/cu-avatar.vue'
	import {getRandom} from '@/apis/util.js'
	import cuCustom from '@/components/cu-custom/cu-custom.vue'
	import userList from '@/components/user/user-list.vue'
	import {
		mapState,
		mapMutations 
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		components:{
			cuCustom, 
			cuButton,
			avatar,
			listItem,
			formItem,
			userList
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				isPassword:false,
				edit:false,
				isUser:false,
				userInfo:{
					userName:'',
					description:'',
					phone:'',
					email:'',
					region:'',
					companyId:'',
					address:''
					// password:''
					
				},
				avatarUrl:'',
				password:'',
				isLogin:false,
				
			};
		}, 
			
		methods:{
			updateUser(){
				this.isPassword = false
				this.edit = !this.edit 
			},
			changePa(){
				this.isPassword = true
				this.edit = true
			},
			submitUser(){
				if(this.isPassword){
					this.$api._post(`tUser/changePassword`,{
						userId:uni.getStorageSync('userId'),
						password:this.password,
						userName:this.userInfo.userName
					})
					.then(res=>{
						this.$msg('修改成功')
						const timer = setTimeout(_=>{
							uni.redirectTo({
								url: '/pages/login/login'
							});
						},1000)
						console.log('修改成功');
					})
					.catch(error=>{
						console.log('修改失败');
						this.$msg('修改失败'+ error)
					})
				}else{
					this.userInfo.userId = uni.getStorageSync('userId')
					
					    this.$api._post(`tUser/update`,this.userInfo).then(res=>{
						console.log(res,'修改成功');
						this.$msg('编辑成功')
						this.edit = false
					}).catch(error=>{
						console.log(error);
						this.$msg('编辑失败'+ error)
					})  
				}	

				
			},
			hideModal(){
				this.edit = false
			},
			formSubmit(e){ 
				console.log('提交成功',e.detail.value);
			},
			getUserDetail(id){
				this.$api._get(`tUser/queryById?id=${id}`) 
				.then(res=>{
					console.log(res);
					this.userInfo = res
					this.avatarUrl = this.$api.baseUrl()+res.avatarUrl
				})
				.catch(error=>{
					console.log('获取用户信息错误',error);
				})
			},

			async updataAvatar(){
			  await	uni.chooseImage({
				    count: 1, //默认9 
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
					success: (chooseImageRes)=> {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						const imgId = this.userInfo.userName
						const uploadTask = uni.uploadFile({
							url: this.$api.baseUrl()+`upload/avatar/${imgId}?imgName=${getRandom()}`, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file', 
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						});
					
						uploadTask.onProgressUpdate((res) => {
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					
							// 测试条件，取消上传任务。
							if (res.progress > 50) {
								uploadTask.abort();
							}
						});
					}
				});

			}
		},
		onLoad(option) {
			// console.log('登录状态',this.hasLogin);
			// this.isLogin = this.hasLogin
			// if(!this.isLogin){
			// 	this.$msg('请绑定')
			// 		uni.navigateTo({
			// 			url:'/pages/login/login'
			// 		})
			// } 
			this.edit = option.edit == 1 ? true : false //判断从我的页面点击修改进入弹框
			let user = uni.getStorageSync('userInfo')
			this.userInfo = user||{} 
			console.log(user);
			// this.getUserDetail(id)
			
		},
	}
</script>

<style lang="scss" scoped>
	.main{
		background-color: #FFF;
	}
	.cu-dialog{
		padding: 0;
		background-color: #FFF;
	}
	
	.content{
		background-color: #0081FF;
	}
	// /deep/.cu-list:last-child{ 
	// 	border-bottom: none ;  
	// } 

</style>
