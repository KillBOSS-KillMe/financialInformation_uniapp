import Base from '../../static/js/base'
class News extends Base {
	constructor() {
		super();
	}
	// 加载新消息列表
	getNewNewsList(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/unreadContent',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.requestTimes(params);
	};
	// 加载原有消息列表
	getNewsList(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/getChatList',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.requestTimes(params);
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
		that.requestTimes(params);
	};
}

export default News
