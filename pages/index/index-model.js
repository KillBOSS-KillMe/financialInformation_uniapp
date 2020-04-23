import Base from '../../static/js/base'
class Index extends Base {
	constructor() {
		super();
	}
	// 登录
	login(data, callBack) {
		var that = this;
		var params = {
			url: 'auth/login',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 获取用户信息
	getUserInfo(data, callBack) {
		var that = this;
		var params = {
			url: 'auth/me',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 轮播图加载
	getBanner(data, callBack) {
		var that = this;
		var params = {
			url: 'index/get_polling',
			method: 'GET',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 客户经理列表
	getManagerList(data, callBack) {
		var that = this;
		var params = {
			url: 'index/get_merchant',
			method: 'GET',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default Index
