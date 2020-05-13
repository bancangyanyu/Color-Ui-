import store from '@/store/index.js'
import {
	PRO
} from '@/apis/common.js'

const development = false //是否为开发环境 
let baseUrl = () => { 
	return development ? PRO.dev : PRO.pro
}

const http = ({  
	url = '',
	param = {}, 
	...other
} = {}) => {
	console.log('request', baseUrl());
	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		console.log(getHeader(), "head");
		uni.request({
			url: getUrl(url),
			data: param, 
			withCredentials: true,
			header: getHeader(),
			...other,
			complete: (res) => {
				uni.hideLoading();
				console.log(`耗时${Date.now() - timeStart}`);
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data)
					if(res.data.code==401){
						
					}
				} else {
					reject(res)
				}
			} 
		})
	})
}

const login = (param)=> {
  return new Promise((resolve, reject) => {
    uni.login({
      success: res => {
        console.log("code", res.code)
        uni.getUserInfo({
          fail: (e) => {
            reject(e)
          },
          success: (user) => {
            param.wxCode = res.code || ''
            console.log("授权登录填写信息", param)
            http({ 
              url: 'mjservice/user/login',
              param: param,
              method: 'post'
            }).then(result => {
                resolve(Object.assign(user,result))
                console.log(result)

            }).catch(error => {
                reject(error)
                console.log(error)
              }
            )
          }
        })
      }
    })
  })
}

const getHeader = () => {
	try {
		const user = uni.getStorageSync('userInfo')
		if (user.token) { 
			return {
				'content-type': 'application/json',
				'token': user.token,
			} 
		} else {
			return {
				'content-type': 'application/json',
			}
		} 

	} catch (e) {
		return {}
	}
}

const getUrl = (url) => {
	if (url.indexOf('://') == -1) {
		url = baseUrl() + url;
	}
	return url
}

const _login = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'post'
	})
}
// get方法
const _get = (url, param = {}) => {
	return http({
		url,
		param
	})
}

const _post = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'post'
	})
}

const _put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}

const _delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'delete'
	})
}
 
 const _showLogin = ()=>{
 	uni.showModal({
 		title: '提示',
 		content: '授权之后可以更好体验小程序，请点击绑定按钮授权绑定登录',
 		showCancel: true,
 		success: res => {
 			if(res.confirm){
 				uni.navigateTo({
 					url: `/pages/login/login`,
 				});
 			}
 		},
 	});
 }
module.exports = {
	baseUrl,
	_get,
	_post,
	_put, 
	_delete,
	_login,
	login,
	_showLogin
}
