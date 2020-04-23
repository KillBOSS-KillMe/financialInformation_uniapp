<template>
	<view>
		<view class="userInfo">
			<image src="../../static/images/test.png" mode=""></image>
			<text>会飞的鱼</text>
		</view>
		<view class="pageTopBorder">
			<!-- 我的-用户 -->
			<view class="content">
				<view class="item">
					<view>
						<icon class="iconfont iconxingxing"></icon>
						<text>我的关注</text>
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconbangzhu"></icon>
						<text>帮助与反馈</text>
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</view>
			</view>
			<!-- 我的-客户经理 -->
			<view class="content">
				<view class="item">
					<view>
						<icon class="iconfont iconhuiyuan"></icon>
						<text>我的会员</text>
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconzizhi"></icon>
						<text>我的资源</text>
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconbangzhu"></icon>
						<text>帮助与反馈</text>
					</view>
					<icon class="iconfont iconxiangyou"></icon>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import User from "./user-model.js";
	const user = new User();
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
			let shareData = {
				title: '',
				path: `pages/index/index?${this.userInfo.id}`,
				imageUrl: ''
			}
			return index.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.userInfo {
		width: 750rpx;
		height: 285rpx;
		background-color: @themeColor_1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		image {
			width: 89rpx;
			height: 89rpx;
			border-radius: 89rpx;
		}
		text {
			font-size: @fontSize_1;
			font-weight: @mainFontWeight;
			color: #fff;
			padding: 20rpx 0;
		}
	}
	.content {
		width: 690rpx !important;;
		height: auto;
		padding: 30rpx;
		.item {
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: @fontSize_1;
				color: @fontColor_1;
				.iconfont {
					margin-right: 20rpx;
					font-size: @fontSize_1;
					color: @themeColor_1;
				}
			}
			.iconfont {
				font-size: @fontSize_1;
				color: @fontSize_2;
			}
		}
	}
</style>
