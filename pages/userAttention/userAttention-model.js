import Base from '../../static/js/base'
class UserAttention extends Base {
	constructor() {
		super();
	}
	// 加载消息列表
	getList(data, callBack) {
		var that = this;
		var params = {
			url: 'users/getFollowList',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 取消关注
	runNotAttention(data, callBack) {
		var that = this;
		var params = {
			url: 'chat/cancelFollow',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default UserAttention
