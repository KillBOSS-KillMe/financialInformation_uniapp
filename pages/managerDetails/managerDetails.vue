<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="managerDetails">
				<view class="info">
					<view class="managerUserInfo">
						<view>李莉 / 交通银行</view>
						<text>西安甜水井街支行客户经理</text>
					</view>
					<view class="address">
						<icon class="iconfont iconchongzhi"></icon>
						<text>陕西省-西安市</text>
					</view>
					<view class="data">
						<view class="item">
							<view>2222</view>
							<text>关注</text>
						</view>
						<view class="item">
							<view>2222</view>
							<text>粉丝</text>
						</view>
					</view>
				</view>
				<view class="image">
					<image src="../../static/images/test.png" mode=""></image>
					<view class="active">关注</view>
					<!-- <view>已关注</view> -->
				</view>
			</view>
			<view class="titleModel">
				<view></view>他的信息
			</view>
			<view class="managerInfo">
				<view class="item">
					<view>工作单位</view>
					<text>交通银行唐延路支行</text>
				</view>
				<view class="item">
					<view>岗位名称</view>
					<text>金融客户经理</text>
				</view>
				<view class="item">
					<view>实名认证</view>
					<text>已认证</text>
				</view>
				<view class="item">
					<view>CCBP认证</view>
					<text>已认证</text>
				</view>
				<view class="item">
					<view>工作经验</view>
					<text>5年</text>
				</view>
			</view>
		</view>
		<button type="default" class="information">立即咨询</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.managerDetails, .managerInfo {
		width: 630rpx;
		height: auto;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.managerDetails {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 285rpx;
		.info, .image {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
		}
		.info {
			// width: 490rpx;
			width: 350rpx;
			height: 100%;
			.managerUserInfo {
				width: 100%;
				view {
					font-size: @fontSize_1;
					font-weight: @mainFontWeight;
					color: @fontColor_1;
					padding-bottom: 20rpx;
				}
				text {
					font-size: @fontSize_2;
					color: @fontColor_3;
				}
			}
			.address {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: @fontSize_2;
				color: @fontColor_3;
				.iconfont {
					font-size: @fontSize_2;
					color: @fontColor_3;
					margin-right: 10rpx;
				}
			}
			.data {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// .item:nth-child(1) {
				// 	margin-right: 50rpx;
				// }
				.item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					view {
						font-size: @titleSize;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
					}
					text {
						font-size: @fontSize_2;
						color: @fontColor_3;
					}
				}
			}
		}
		.image {
			width: 140rpx;
			height: 100%;
			image {
				width: 100%;
				height: 170rpx;
				border-radius: @borderRadius_5;
			}
			view {
				width: 100%;
				height: 50rpx;
				font-size: @fontSize_2;
				color: #fff;
				border-radius: @borderRadius_5;
				background-color: @themeColor_2;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.active {
				background-color: @themeColor_1;
			}
		}
	}
	.managerInfo {
		.item {
			width: 100%;
			height: auto;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				font-size: @fontSize_2;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			text {
				font-size: @fontSize_2;
				color: @fontColor_3;
			}
		}
	}
	.information {
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 690rpx;
		height: 80rpx;
		background-color: @themeColor_1;
		font-size: @fontSize_2;
		color: #fff;
		border-radius: @borderRadius_10;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
