import Base from '../../static/js/base'
class News extends Base {
	constructor() {
		super();
	}
	// 加载消息列表
	getChatList(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/getChatList',
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
}

export default News
