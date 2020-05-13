import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
		userInfo:{},
		token:'' 
    },
    mutations: {
        login(state, userInfo) {
            state.userInfo = userInfo 
            state.hasLogin = true; 
			state.token = userInfo.token
			uni.setStorageSync('userInfo',userInfo)
        },
        loginOut(state) {
            state.userInfo = {}; 
			state.token =''
            state.hasLogin = false; 
			uni.removeStorageSync('userInfo')
        },

    }
})

export default store
