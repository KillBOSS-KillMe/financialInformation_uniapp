import Base from '../../static/js/base'
class ArticleList extends Base {
	constructor() {
		super();
	}
	// 登录
	getArticleList(data, callBack) {
		var that = this;
		var params = {
			url: 'News/getNewsList',
			method: 'GET',
			data: data,
			sCallBack: function(res) {
				callBack && callBack(res.data);
			}
		};
		that.request(params);
	};
}

export default ArticleList
