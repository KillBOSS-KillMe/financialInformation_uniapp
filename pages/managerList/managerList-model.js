import Base from '../../static/js/base'
class ManagerList extends Base {
	constructor() {
		super();
	}
	// 客户经理列表
	getManagerList(data, callBack) {
		var that = this;
		var params = {
			url: 'index/get_merchant',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default ManagerList
