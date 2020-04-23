import Base from '../../static/js/base'
class ManagerDetails extends Base {
	constructor() {
		super();
	}
	// 加载消息列表
	getChatList(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/follow',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default ManagerDetails
