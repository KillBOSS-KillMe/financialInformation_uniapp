<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="item" v-for="(item,index) in 20" :key="index">
				<view class="info">
					<image src="../../static/images/test.png" mode=""></image>
					<view class="con">
						<view>系统通知</view>
						<text>客服消息为您推送两条新的信息</text>
					</view>
				</view>
				<icon class="iconfont iconchongzhi"></icon>
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
		padding: 30rpx;
	}
	.item {
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid @borderColor_1;
		.info {
			width: 630rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 64rpx;
				margin-right: 30rpx;
			}
			.con {
				width: 536rpx;
				height: 64rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				view {
					font-size: @fontSize_1;
					color: @fontColor_1;
				}
				text {
					font-size: @fontSize_2;
					color: @fontColor_2;
				}
			}
		}
		.iconfont {
			width: 30rpx;
			height: 30rpx;
			font-size: @fontSize_1;
			color: @fontColor_2;
		}
	}
</style>
