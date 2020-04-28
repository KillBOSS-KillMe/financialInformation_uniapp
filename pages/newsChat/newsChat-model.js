import Base from '../../static/js/base'
class NewsChat extends Base {
	constructor() {
		super();
	}
	// 消息加载及更新
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
		that.requestTimes(params);
	};
	// 发送消息
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
		that.requestTimes(params);
	};
}

export default NewsChat
