<template>
	<view class="list">
		<view class="item" v-for="(item,index) in 6" :key="index">
			<view class="newsTitle">
				<view>
					<image src="../../static/images/test.png" mode=""></image>
					标题标题
				</view>
				<text>3分钟前</text>
			</view>
			<image src="../../static/images/test.png" class="coverImg" mode=""></image>
			<view class="info">
				<view>标题标题标题标题标题标题标题标题</view>
				<text>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</text>
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
	.item {
		width: 690rpx;
		height: auto;
		// padding: 0 30rpx;
		margin: 30rpx;
		border-radius: 10rpx;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.newsTitle {
			width: 630rpx;
			height: auto;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: @fontSize_1;
			color: @fontColor_1;
			view {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-weight: @mainFontWeight;
			}
			image {
				width: 35rpx;
				height: 35rpx;
				border-radius: 35rpx;
				margin-right: 20rpx;
			}
			text {
				font-size: @fontSize_2;
				color: @fontColor_3;
			}
		}
		.coverImg {
			width: 100%;
			height: 300rpx;
		}
		.info {
			width: 630rpx;
			height: auto;
			padding: 30rpx;
			view {
				font-size: @fontSize_1;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			text {
				line-height: 35rpx;
				margin-top: 30rpx;
				font-size: @fontSize_2;
				color: @fontColor_3;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
