<template>
	<view>
		<view class="search">
			<icon class="iconfont iconchongzhi"></icon>
			<input type="text" value="" placeholder="请输入您要搜索的客户经理/资讯" />
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in 5" :key="index">
				<image src="../../static/images/test.png" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="titleModel">
			<view></view>金牌客户经理
		</view>
		<view class="managerList">
			<view class="item">
				<image src="../../static/images/test.png" mode=""></image>
				<view class="info">
					<view class="details">
						<view>李莉 / 交通银行</view>
						<text>西安甜水井街支行客户经理</text>
					</view>
					<button class="active">关注</button>
				</view>
			</view>
			<view class="item">
				<image src="../../static/images/test.png" mode=""></image>
				<view class="info">
					<view class="details">
						<view>李莉 / 交通银行</view>
						<text>西安甜水井街支行客户经理</text>
					</view>
					<button class="noActive">取消关注</button>
				</view>
			</view>
		</view>
		<view class="titleModel">
			<view></view>最新资讯
		</view>
		<view class="articleList">
			<view class="item">
				<icon class="iconfont iconchongzhi"></icon>
				<view class="info">
					<view class="details">
						<view class="title">一个科技爱好者的EDC和桌面</view>
						<view>西安甜水井街支行客户经理西安甜水井街支行客户经理西安甜水井街支行客户经理西安甜水井街支行客户经理西安甜水井街支行客户经理</view>
					</view>
					<view class="features">
						<view>会飞的鱼</view>
						<view>
							<icon class="iconfont iconchongzhi"></icon>
							<text>4小时</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.search {
		width: 690rpx;
		height: 60rpx;
		margin: 10rpx 30rpx;
		background-color: @bgColor;
		border-radius: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: @fontSize_1;
		}
		input {
			width: 600rpx;
			height: 60rpx;
			font-size: @fontSize_1;
		}
	}
	.swiper {
		width: 690rpx;
		height: 300rpx;
		margin: 30rpx;
		border-radius: 10rpx;
		image {
			width: 690rpx;
			height: 300rpx;
			border-radius: 10rpx;
		}
	}
	.managerList, .articleList {
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
	.managerList {
		.item {
			image {
				width: 140rpx;
				height: 100%;
				border-radius: 10rpx;
			}
			.info {
				width: 470rpx;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				.details {
					view {
						font-size: @fontSize_1;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
						margin-bottom: 20rpx;
					}
					text {
						font-size: @fontSize_2;
						color: @fontColor_3;
					}
				}
				button {
					width: 140rpx;
					height: 50rpx;
					border-radius: 10rpx;
					font-size: @fontSize_1;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.active {
					background-color: @themeColor_1;
				}
				.noActive {
					background-color: @themeColor_2;
				}
			}
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
						padding-bottom: 10rpx;
						border-bottom: 1rpx solid @borderColor_1;
						-webkit-line-clamp: 1;
					}
					view {
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
