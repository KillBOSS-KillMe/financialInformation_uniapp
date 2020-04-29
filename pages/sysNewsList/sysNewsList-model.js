import Base from '../../static/js/base'
class SysNewsList extends Base {
	constructor() {
		super();
	}
	// 登录
	getNewNewsList(data, callBack) {
		var that = this;
		var params = {
			url: 'News/news_system',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default SysNewsList
