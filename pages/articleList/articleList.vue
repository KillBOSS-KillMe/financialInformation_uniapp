<template>
	<notList v-if="articleList.data.length == 0" />
	<view class="articleList" v-else>
		<view class="item" @tap="goInformationDetails" :data-id="item.id" v-for="(item,index) in articleList.data" :key="index">
			<icon class="iconfont icondian"></icon>
			<view class="info">
				<view class="details">
					<view class="title">{{item.title}}</view>
					<rich-text :nodes="item.content" class="content"></rich-text>
				</view>
				<view class="features">
					<view>{{item.seenumber}}阅读</view>
					<view>
						<icon class="iconfont iconshijian"></icon>
						<text>{{item.createtime}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import notList from "@/components/notList.vue";
	import ArticleList from "./articleList-model.js";
	const articleList = new ArticleList();
	export default {
		components: {
		  notList
		},
		data() {
			return {
				userInfo: {},
				articleList: {
					data: []
				}
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				this.getArticleList(() => {
					callBack && callBack();
				})
			},
			// 加载资讯列表
			getArticleList(callBack) {
				const that = this
				articleList.getArticleList({
					// openid: that.userInfo.openid
				}, (res) => {
					if (res.code == 4000) {
						let list = res.data
						for (let i = 0; i < list.length; i++) {
							list[i].createtime = articleList.transformTime(list[i].createtime * 1000)
						}
						res.data = list
						that.articleList = res
					}
					callBack && callBack();
				})
			},
			// 进入--资讯--详情页
			goInformationDetails(e) {
				const that = this;
				const id = articleList.get_data_set(e, "id");
				articleList.navigate_to(`/pages/informationDetails/informationDetails?id=${id}`);
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.page = 1;
			that._onLoad(() => {
				uni.stopPullDownRefresh();
			});
		},
		//上拉加载更多
		// onReachBottom() {
		//   var that = this;
		//   if (that.last_page == that.page) {
		//     return;
		//   }
		//   that.page += 1;
		//   that.get_product_list();
		// },
		// 分享
		onShareAppMessage() {
			// let shareData = {
			// 	title: '',
			// 	path: `pages/index/index`,
			// 	imageUrl: ''
			// }
			return articleList.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.articleList {
			width: 750rpx;
			height: auto;
			.item {
				width: 630rpx;
				height: 170rpx;
				margin: 30rpx;
				padding: 30rpx;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #ffffff;
				box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			}
		}
.articleList {
		.item {
			align-items: flex-start !important;
			.iconfont {
				width: 30rpx;
				height: 30rpx;
				font-size: @fontSize_2;
				color: @themeColor_1;
			}
			.info {
				width: 590rpx;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				.details {
					width: 100%;
					.title {
						width: 100%;
						font-size: @fontSize_1;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
						margin-bottom: 10rpx;
						padding-bottom: 20rpx;
						border-bottom: 1rpx solid @borderColor_1;
						-webkit-line-clamp: 1;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
					.content {
						line-height: @fontSize_1;
						font-size: @fontSize_2;
						color: @fontColor_3;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
				.features {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					view {
						margin-left: 30rpx;
						font-size: @fontSize_2;
						color: @fontColor_2;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.iconfont {
						font-size: @fontSize_2;
						color: @fontColor_2;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
