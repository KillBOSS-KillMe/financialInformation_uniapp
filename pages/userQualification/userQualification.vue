<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="titleModel">
				<view></view>我的资质
			</view>
			<view class="info">
				<view class="item">
					<view>姓名</view>
					<text>狗腿子</text>
				</view>
				<view class="item">
					<view>岗位名称</view>
					<text>金融客户经理</text>
				</view>
				<view class="item">
					<view>工作经验</view>
					<text>5年</text>
				</view>
				<view class="item">
					<view>身份证号码</view>
					<text>123123123123123123123</text>
				</view>
				<view class="item">
					<view>身份证正面照</view>
					<text>已上传</text>
				</view>
				<view class="item">
					<view>身份证反面照</view>
					<text>已上传</text>
				</view>
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
	.content {
		width: 690rpx;
		height: auto;
		padding: 30rpx;
	}
	.titleModel {
		margin: 30rpx 0;
	}
	.info {
		width: 630rpx;
		height: auto;
		padding: 30rpx;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx 0;
			view {
				font-size: @fontSize_1;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			text {
				font-size: @fontSize_1;
				color: @fontColor_3;
			}
		}
	}
</style>
