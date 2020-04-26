import Base from '../../static/js/base'
class UserQualification extends Base {
	constructor() {
		super();
	}
	// 详情加载
	getDetails(data, callBack) {
		var that = this;
		var params = {
			url: 'users/getManagerInfo',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default UserQualification
