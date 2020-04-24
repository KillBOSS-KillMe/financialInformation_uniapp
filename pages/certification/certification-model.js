import Base from '../../static/js/base'
class IdentitySel extends Base {
	constructor() {
		super();
	}
	// 认证提交
	validation(data, callBack) {
		var that = this;
		var params = {
			url: 'Certificates/qualification',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 上传图片
	getCard(data, callBack) {
		var that = this;
		var params = {
			url: 'Certificates/photo',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res);
			}
		};
		that.upload(params);
	};
}

export default IdentitySel
