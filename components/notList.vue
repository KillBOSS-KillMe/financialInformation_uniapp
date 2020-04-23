<template>
	<view class="notList">
		<icon class="iconfont iconwushuju"></icon>
		<text>暂无数据</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
		}
	}
</script>

<style lang="less">
	.notList {
		width: 100%;
		height: auto;
		padding: 100rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.iconfont {
			font-size: 200rpx;
			color: #cdcdcd;
			margin-bottom: 50rpx;
		}
		text {
			font-size: 30rpx;
			color: #cdcdcd;
		}
	}
</style>
