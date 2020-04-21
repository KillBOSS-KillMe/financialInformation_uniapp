import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		authorizationButton: true,
		userInfo: {},
		settings: {}
	},
	mutations: {
		// 更新授权按钮显示状态
		updataSettingsInfo(state, data = {}) {
			state.settings = data
		},
		// 更新授权按钮显示状态
		updateAuthorizationButtonData(state, data = true) {
			state.authorizationButton = data
			// return (state.count -= n)
		},
		// 更新用户信息
		updateUserInfo(state, data = {}) {
			state.userInfo = data
		},
		copy(state, cont) {
			//单一的改变某一个变量
			console.log(state)
			console.log(cont)
			state.memberData = cont;
		},
		change(state, contObj) {
			//通过传入的变量去改变对应的全局变量
			let str = contObj.str;
			let cont = contObj.cont;
			state[str] = cont;
		},
	},
	actions: {
		copeFun: function(context, mData) {
			context.commit('copy', mData)
		},
		changeFun: function(context, obj) {
			context.commit('change', obj)
		}
	}
})
export default store
