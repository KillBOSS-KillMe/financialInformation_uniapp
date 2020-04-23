import Base from '../../static/js/base'
class ManagerDetails extends Base {
	constructor() {
		super();
	}
	// 详情加载
	getDetails(data, callBack) {
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
	// 关注
	runAttention(data, callBack) {
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

export default ManagerDetails
