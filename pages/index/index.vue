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
					<view class="Details">
						<view>李莉 / 交通银行</view>
						<text>西安甜水井街支行客户经理</text>
					</view>
					<button class="active">关注</button>
				</view>
			</view>
			<view class="item">
				<image src="../../static/images/test.png" mode=""></image>
				<view class="info">
					<view class="Details">
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
			最新资讯LIst
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
	}
	.managerList {
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
				.Details {
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
</style>
