<!-- 阴影边框
box-shadow: #f1fefb 1rpx 1rpx 10rpx 5rpx; -->

<!-- 
flexflexflexflexflexflexflexflex
display: flex;
align-items: center;
justify-content: space-between; -->

<!-- 竖向
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: column; -->

<!-- 换行
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
flex-wrap: wrap; -->

<!-- 
换行隐藏
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical; -->

<!-- 
居右
flex-direction:row;
justify-content:flex-end
vertical-align:middle; -->

<!-- 
自动换行
word-break:break-all; -->

<!-- 单行文本溢出
overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap; -->

<!-- 多行文本溢出 -->
<!-- -webkit-line-clamp: 2;
display: -webkit-box;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis; -->

<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="less">
	@import url("/static/css/reset.css");
	@import url("/static/css/icon.css");
	// @import url("/static/css/variable.less");
	page {
	  background-color: #ffffff;
	  width: 100vw;
	  min-height: 100vh;
	  height: auto;
	}
	#getUserInfo {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999;
	}
	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
	  border-radius: 50% !important;
	  color: #ffffff !important;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	  border: none !important;
	  background: #9FD8F5;
		border-color: #9FD8F5;
	}
	
	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked::before {
		width: 20rpx;
		height: 20rpx;
		line-height: 20rpx;
		text-align: center;
		font-size: 18rpx;
		color: #fff;
		background: transparent;
		transform: translate(-70%, -50%) scale(1);
		-webkit-transform: translate(-70%, -50%) scale(1);
	}
	
	/* #endif */
	/* 微信样式 */
	/* #ifdef APP-PLUS ||MP-WEIXIN */
	checkbox .wx-checkbox-input {
	  border-radius: 50% !important;
	  color: #ffffff !important;
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	  color: #fff;
	  background: #9FD8F5;
	}
	
	.wx-checkbox-input.wx-checkbox-input-checked {
	  border: none !important;
	}
	/* #endif */
	
	
	button {
	  position: relative;
	  display: block;
	  padding: 0;
	  margin: 0;
		border:none;
	  line-height: auto;
	  box-sizing: border-box;
	  text-align: center;
	  text-decoration: none;
	  -webkit-tap-highlight-color: transparent;
	  overflow: hidden;
	  color: #000000;
	  background: none;
	}
	button::after {
	  border: none;
	}
	.iconfont {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.titleModel {
		width: 690rpx;
		height: 36rpx;
		margin: 30rpx;
		font-size: 32rpx;
		font-weight: 700;
		color: #343434;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		view {
			width: 10rpx;
			height: 36rpx;
			border-radius: 5rpx;
			background-color: #265ED7;
			margin-right: 10rpx;
		}
	}
</style>
