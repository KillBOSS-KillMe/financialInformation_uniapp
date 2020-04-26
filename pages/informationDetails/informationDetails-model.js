import Base from '../../static/js/base'
class InformationDetails extends Base {
	constructor() {
		super();
	}
	// 加载详情
	getNewsContent(data, callBack) {
		var that = this;
		var params = {
			url: 'News/getNewsContent',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 评论
	sendComment(data, callBack) {
		var that = this;
		var params = {
			url: 'Comment/sendComment',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
	// 点赞
	like(data, callBack) {
		var that = this;
		var params = {
			url: 'vote/vote',
			method: 'POST',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default InformationDetails
