<script>
	import Vue from 'vue'
	 import {  
	        mapMutations  
	    } from 'vuex';  
	import { setupAppUpdateListener } from '@/apis/util.js'
	export default {
		onLaunch: function() {
			setupAppUpdateListener()
			uni.getStorage({//获得保存在本地的用户信息  
				key: 'userInfo',  
				success:(res) => {  
					this.login(res.data);  
				}   
			}); 
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
				}
			})
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {  
			...mapMutations(['login'])  
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* 开发阶段用 */
/* 	view,icon,text,rich-text,progress,image,button,textarea,open-data,navigator,canvas,checkbox,form,input,label,picker,radio,slider,switch {
	    outline: 1px dashed lightblue;
	} */
	page { 
		min-height: 100%; 
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block; 
	}

	swan-template {
		width: 100%;
		min-height: 100%; 
		display: flex; 
	} 

	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%; 
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* #ifdef MP-ALIPAY */
	page { 
		min-height: 100vh;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	.main{
		min-height: 100vh;
	}
	
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20rpx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40rpx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1rpx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1rpx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50rpx;
		min-height: 50rpx;
		padding: 15rpx 0;
		padding-left: 30rpx;
		line-height: 50rpx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15rpx;
		height: 1rpx;
		content: ''; 
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50rpx;
		padding: 20rpx;
	}

	button.primary {
		background-color: #0faeff;
	}
	uni-page-head
	{
	    display: none;
	}
</style>
