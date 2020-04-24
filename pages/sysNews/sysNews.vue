<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="articleTitle">旧电脑平板别丢了！将你的屏幕都利用起来</view>
			<view class="articleInfo">
				<text>会飞的鱼</text>
				<text>4小时前</text>
			</view>
			<view class="articleContent">
				12313123123123123
			</view>
			<view class="articleCommentList">
				<view class="item" v-for="(item,index) in 20" :key="index">
					<image src="../../static/images/test.png" mode=""></image>
					<view class="comment">
						<view class="name">会飞的鱼</view>
						<view class="commentCon">只要有行驶证就可以按揭，全款，抵押，报税只要有行驶证就可以按揭，全款，抵押，报税走流程。</view>
						<view class="features">
							<text>2020-03-13</text>
							<view>
								<icon class="iconfont iconchongzhi"></icon>
								33
							</view>
						</view>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/test.png" mode=""></image>
					<view class="comment">
						<view class="name">会飞的鱼</view>
						<view class="commentCon">只要有行驶证就可以按揭，全款，抵押，报税只要有行驶证就可以按揭，全款，抵押，报税走流程。</view>
						<view class="features">
							<text>2020-03-13</text>
							<view>
								<icon class="iconfont iconchongzhi active"></icon>
								33
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="articleComment">
				<view class="con">
					<input type="text" value="" placeholder="请填写您的评论信息" />
					<button type="default">发送</button>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import SysNews from "./sysNews-model.js";
	const sysNews = new SysNews();
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				that.wx_login(() => {
					that.getUserInfo(() => {
						callBack && callBack();
					})
				})
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
			return sysNews.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.content {
		width: 690rpx !important;
		padding: 30rpx;
	}
	.articleTitle, .articleTitle, .articleTitle, .articleTitle, .articleTitle {
		width: 100%;
	}
	.articleTitle {
		font-size: @titleSize;
		font-weight: @mainFontWeight;
		color: @fontColor_1;
	}
	.articleInfo {
		font-size: @fontSize_2;
		color: @fontColor_3;
		padding: 30rpx 0;
		text {
			margin-right: 20rpx;
		}
	}
	.articleContent {
		font-size: @fontSize_1;
		color: @fontColor_2;
		border-bottom: 20rpx solid #F8F8F8;
	}
	.articleCommentList {
		margin-bottom: 110rpx;
		.item {
			width: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1rpx solid @borderColor_1;
			image {
				width: 66rpx;
				height: 66rpx;
				border-radius: 66rpx;
			}
			.comment {
				width: 594rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				.name, .commentCon, .features {
					width: 100%;
				}
				.name {
					font-size: @fontSize_2;
					color: @fontColor_3;
				}
				.commentCon {
					font-size: @fontSize_2;
					color: @fontColor_2;
					padding: 30rpx 0;
				}
				.features {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: @fontSize_2;
					color: @fontColor_3;
					view {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.iconfont {
							font-size: @fontSize_2;
							color: @themeColor_2;
							margin-right: 10rpx;
						}
						.active {
							color: @themeColor_1 !important;
						}
					}
				}
			}
		}
	}
	.articleComment {
		position: fixed;
		left: 30rpx;
		bottom: 0;
		width: 690rpx;
		height: auto;
		padding: 30rpx 0;
		background-color: #fff;
		.con {
			width: 100%;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			button {
				width: 166rpx;
				height: 60rpx;
				border-radius: 60rpx;
				background-color: @themeColor_1;
				font-size: @fontSize_2;
				color: #fff;
			}
			input {
				width: 434rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: @fontSize_2;
				padding: 0 30rpx;
				border-radius: 60rpx;
				background-color: @inputBgColot;
			}
		}
		
	}
</style>
