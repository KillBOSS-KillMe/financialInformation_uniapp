import Base from '../../static/js/base'
class ManagerList extends Base {
	constructor() {
		super();
	}
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
	// 获取用户信息
	// getUserInfo(data, callBack) {
	// 	var that = this;
	// 	var params = {
	// 		url: 'auth/me',
	// 		method: 'POST',
	// 		data: data,
	// 		sCallBack: function(res) {
	// 			callBack && callBack(res.data);
	// 		}
	// 	};
	// 	that.request(params);
	// };
}

export default ManagerList
