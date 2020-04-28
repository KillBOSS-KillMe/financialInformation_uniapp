import Base from '../../static/js/base'
class UserVIP extends Base {
	constructor() {
		super();
	}
	// 登录
	getPayInfo(data, callBack) {
		var that = this;
		var params = {
			url: 'wechat/createOrder',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 登录
	login(data, callBack) {
		var that = this;
		var params = {
			url: 'users/login',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default UserVIP
