<template>
	<view>
		<view class="title">
			<view>请选择您的身份</view>
			<text>我们会为您制定转专业化服务</text>
		</view>
		<view class="identityList">
			<view class="item">
				<image src="../../static/images/IdentitySel_1.png" mode=""></image>
				<view>我是客户</view>
			</view>
			<view class="item">
				<image src="../../static/images/IdentitySel_2.png" mode=""></image>
				<view class="active">我是客户经理</view>
			</view>
		</view>
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
	.title {
		margin-top: 200rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		view {
			padding-bottom: 30rpx;
			font-size: @titleSize;
			font-weight: @mainFontWeight;
			color: @fontColor_1;
		}
		text {
			font-size: @fontSize_2;
			color: @fontColor_3;
		}
	}
	.identityList {
		width: 750rpx;
		height: auto;
		margin-top: 200rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
			image {
				width: 135rpx;
				height: 155rpx;
				margin-bottom: 40rpx;
			}
			view {
				width: 200rpx;
				height: 52rpx;
				font-size: @fontSize_2;
				color: #fff;
				border-radius: 5rpx;
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
</style>
