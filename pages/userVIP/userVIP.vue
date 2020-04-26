<template>
	<view class="pageTopBorder">
		<view class="content">
			<scroll-view scroll-x="true" class="vipCard">
				<view class="item">
					<image src="../../static/images/vipBg_1.png" mode=""></image>
					<view class="info">
						<view class="con">
							<view>年度会员</view>
							<text>年度会员享受更多权益</text>
						</view>
						<button type="default" class="color1">立即开通</button>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/vipBg_2.png" mode=""></image>
					<view class="info">
						<view class="con">
							<view>季度卡会员</view>
							<text>季度卡会员享受更多权益</text>
						</view>
						<button type="default" class="color2">立即开通</button>
					</view>
				</view>
				<view class="item">
					<image src="../../static/images/vipBg_3.png" mode=""></image>
					<view class="info">
						<view class="con">
							<view>月卡会员</view>
							<text>到期日期：2020-12-12</text>
						</view>
						<button type="default" class="color3">立即开通</button>
					</view>
				</view>
			</scroll-view>
			<view class="titleModel" v-if="informationNode.data.length > 0">
				<view class="titleCon">
					<view></view>会员权益
				</view>
				<!-- <view class="more">
					更多
					<icon class="iconfont iconxiangyou"></icon>
				</view> -->
			</view>
			<view class="info">
				<text>1.会员权益会员权益会员权益会员权益</text>
				<text>1.会员权益会员权益会员权益会员权益</text>
				<text>1.会员权益会员权益会员权益会员权益</text>
				<text>1.会员权益会员权益会员权益会员权益</text>
			</view>
		</view>
	</view>
</template>

<script>
	import UserVIP from "./userVIP-model.js";
	const userVIP = new UserVIP();
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			const that = this
			// that._onLoad()
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
			return userVIP.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.content {
		width: 690rpx !important;;
		height: auto;
		padding: 30rpx;
	}
	.vipCard {
		width: 100%;
		height: 233rpx;
		padding: 30rpx 0;
		padding-top: 0;
		border-bottom: 20rpx solid #F8F8F8;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
		.item:nth-last-child(1) {
			margin-right: 0;
		}
		.item {
			width: 490rpx;
			height: 233rpx;
			position: relative;
			display: inline-block;
			margin-right: 20rpx;
			order-radius: @borderRadius_10;
			image, .info {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				border-radius: @borderRadius_10;
			}
			image {
				z-index: 1;
				width: 100%;
				height: 100%;
			}
			.info {
				z-index: 2;
				width: 430rpx;
				height: 173rpx;
				padding: 30rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				view {
					font-size: @titleSize;
					font-weight: @mainFontWeight;
					color: #fff;
				}
				text {
					font-size: @fontSize_2;
					color: #fff;
				}
				button {
					width: 180rpx;
					height: 51rpx;
					border-radius: 51rpx;
					font-size: @fontSize_2;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background: linear-gradient(to right, #FF5953, #FE9223);;
				}
				.color1 {
					background: #FFC23D;
				}
				.color3 {
					background: linear-gradient(to right, #FE9223, #FFC23D);;
				}
			}
		}
	}
	.titleModel {
		margin: 0;
		margin-top: 30rpx;
	}
	.info {
		width: 690rpx;
		height: auto;
		padding: 30rpx 0;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		text {
			font-size: @fontSize_1;
			color: @fontColor_3;
			padding: 20rpx 0;
		}
	}
</style>
