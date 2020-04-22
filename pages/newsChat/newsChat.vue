<template>
	<view scroll-y="true" class="pageTopBorder">
		<scroll-view  class="content">
			<view class="item1" v-for="(item,index) in 20" :key="index">
				<image src="../../static/images/test.png" mode=""></image>
				<view class="info">我想咨询一下银行现在对于个人贷款这块有什么政策？</view>
			</view>
			<view class="item2" v-for="(item,index) in 20" :key="index">
				<view class="info">我想咨询一下银行现在对于个人贷款这块有什么政策？</view>
				<image src="../../static/images/test.png" mode=""></image>
			</view>
		</scroll-view>
		<view class="sendMessage">
			<view class="con">
				<input type="text" value="" placeholder="请填写您的评论信息" />
				<button type="default">发送</button>
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
	scroll-view {
		height: 100vh;
	}
	.content {
		width: 690rpx;
		height: auto;
		padding: 30rpx;
		padding-bottom: 110rpx;
		.item1, .item2 {
			width: 100%;
			height: auto;
			display: flex;
			align-items: flex-start;
			padding: 30rpx 0;
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 64rpx;
			}
			.info {
				width: auto;
				max-width: 442rpx;
				font-size: @fontSize_2;
				padding: 30rpx;
			}
		}
		.item1 {
			justify-content: flex-start;
			image {
				margin-right: 30rpx;
			}
			.info {
				color: @fontColor_1;
				border-radius: 0 20rpx 20rpx 20rpx;
				background-color: @inputBgColot;
			}
		}
		.item2 {
			justify-content: flex-end;
			image {
				margin-left: 30rpx;
			}
			.info {
				color: #fff;
				border-radius: 20rpx 0 20rpx 20rpx;
				background-color: @themeColor_1;
			}
		}
	}
	.sendMessage {
		position: fixed;
		left: 30rpx;
		bottom: 0;
		width: 690rpx;
		height: auto;
		padding: 30rpx 0;
		background-color: #fff;
		.con {
			width: 100%;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			button {
				width: 166rpx;
				height: 60rpx;
				border-radius: 60rpx;
				background-color: @themeColor_1;
				font-size: @fontSize_2;
				color: #fff;
			}
			input {
				width: 434rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: @fontSize_2;
				padding: 0 30rpx;
				border-radius: 60rpx;
				background-color: @inputBgColot;
			}
		}
		
	}
</style>
