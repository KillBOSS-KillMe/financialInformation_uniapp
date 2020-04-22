<template>
	<view>
		<view class="userInfo">
			<image src="../../static/images/test.png" mode=""></image>
			<text>会飞的鱼</text>
		</view>
		<view class="pageTopBorder">
			<!-- 我的-用户 -->
			<view class="content">
				<view class="item">
					<view>
						<icon class="iconfont iconchongzhi"></icon>
						<text>我的关注</text>
					</view>
					<icon class="iconfont iconchongzhi"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconchongzhi"></icon>
						<text>帮助与反馈</text>
					</view>
					<icon class="iconfont iconchongzhi"></icon>
				</view>
			</view>
			<!-- 我的-客户经理 -->
			<view class="content">
				<view class="item">
					<view>
						<icon class="iconfont iconchongzhi"></icon>
						<text>我的会员</text>
					</view>
					<icon class="iconfont iconchongzhi"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconchongzhi"></icon>
						<text>我的资源</text>
					</view>
					<icon class="iconfont iconchongzhi"></icon>
				</view>
				<view class="item">
					<view>
						<icon class="iconfont iconchongzhi"></icon>
						<text>帮助与反馈</text>
					</view>
					<icon class="iconfont iconchongzhi"></icon>
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
	.userInfo {
		width: 750rpx;
		height: 285rpx;
		background-color: @themeColor_1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		flex-direction: column;
		image {
			width: 89rpx;
			height: 89rpx;
			border-radius: 89rpx;
		}
		text {
			font-size: @fontSize_1;
			font-weight: @mainFontWeight;
			color: #fff;
			padding: 20rpx 0;
		}
	}
	.content {
		width: 690rpx;
		height: auto;
		padding: 30rpx;
		.item {
			width: 100%;
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: @fontSize_1;
				color: @fontColor_1;
				.iconfont {
					margin-right: 20rpx;
					font-size: @fontSize_1;
					color: @themeColor_1;
				}
			}
			.iconfont {
				font-size: @fontSize_1;
				color: @fontSize_2;
			}
		}
	}
</style>
