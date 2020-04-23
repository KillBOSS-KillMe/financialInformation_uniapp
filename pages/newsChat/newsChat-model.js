import Base from '../../static/js/base'
class NewsChat extends Base {
	constructor() {
		super();
	}
	// 登录
	getNewsList(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/getChatContent',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 获取用户信息
	sendMessage(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/sendMessage',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default NewsChat
