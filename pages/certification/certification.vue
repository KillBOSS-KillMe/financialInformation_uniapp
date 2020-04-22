<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="item">
				<view>姓名</view>
				<input type="text" value="" placeholder="请输入姓名" />
			</view>
			<view class="item">
				<view>所在银行</view>
				<input type="text" value="" placeholder="请输入您所在银行" />
			</view>
			<view class="item">
				<view>岗位名称</view>
				<input type="text" value="" placeholder="请输入您的岗位名称" />
			</view>
			<view class="item">
				<view>身份证号</view>
				<input type="text" value="" placeholder="请输入您的身份证号码" />
			</view>
		</view>
		<view class="upIDCard">
			<image src="../../static/images/IDcard_1.png" mode=""></image>
			<image src="../../static/images/IDcard_2.png" mode=""></image>
		</view>
		<view class="sub">
			<view>提交</view>
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
	page {
		width: 100vw;
		height: 100vh;
	}
	.content {
		width: 690rpx;
		padding: 30rpx;
		.item {
			width: 100%;
			height: auto;
			padding: 20rpx 0;
			view {
				font-size: @fontSize_1;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			input {
				width: 630rpx;
				height: auto;
				padding: 15rpx 30rpx;
				margin-top: 20rpx;
				border: 1rpx solid @borderColor_1;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
	}
	.upIDCard {
		width: 630rpx;
		height: auto;
		padding: 0 60rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image {
			width: 300rpx;
			height: 200rpx;
		}
	}
	.sub {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 750rpx;
		height: auto;
		view {
			width: 700rpx;
			height: 80rpx;
			margin: 30rpx 25rpx;
			font-size: @fontSize_1;
			font-weight: @mainFontWeight;
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: @themeColor_1;
		}
	}
</style>
