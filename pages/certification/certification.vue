<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="item">
				<view>姓名</view>
				<input type="text" value="" @input="getformData" data-name="name" placeholder="请输入姓名" />
			</view>
			<view class="item">
				<view>所在银行</view>
				<input type="text" value="" @input="getformData" data-name="bank" placeholder="请输入您所在银行" />
			</view>
			<view class="item">
				<view>岗位名称</view>
				<input type="text" value="" @input="getformData" data-name="post" placeholder="请输入您的岗位名称" />
			</view>
			<view class="item">
				<view>身份证号</view>
				<input type="text" value="" @input="getformData" data-name="name" placeholder="请输入您的身份证号码" />
			</view>
		</view>
		<view class="upIDCard">
			<image src="../../static/images/IDcard_1.png" mode="" v-if="formData.IDCard_1 == ''" @tap="upImage" data-type="1"></image>
			<image :src="formData.IDCard_1" mode="" v-if="formData.IDCard_1 != ''" @tap="upImage" data-type="1"></image>
			<image src="../../static/images/IDcard_2.png" mode="" v-if="formData.IDCard_2 == ''" @tap="upImage" data-type="2"></image>
			<image :src="formData.IDCard_2" mode="" v-if="formData.IDCard_2 != ''" @tap="upImage" data-type="2"></image>
		</view>
		<view class="sub">
			<view @tap="validation">提交</view>
		</view>
	</view>
</template>

<script>
	import Certification from "./certification-model.js";
	const certification = new Certification();
	export default {
		data() {
			return {
				formData: {
					name: '',
					bank: '',
					post: '',
					IDNumber: '',
					IDCard_1: '',
					IDCard_2: ''
				}
			};
		},
		onLoad() {
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				// that.wx_login(() => {
				// 	that.getUserInfo(() => {
				// 		callBack && callBack();
				// 	})
				// })
			},
			validation() {
				certification.switch_tab(`/pages/index/index`);
			},
			upImage() {
				
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.page = 1;
			that._onLoad(() => {
				uni.stopPullDownRefresh();
			});
		},
		//上拉加载更多
		// onReachBottom() {
		//   var that = this;
		//   if (that.last_page == that.page) {
		//     return;
		//   }
		//   that.page += 1;
		//   that.get_product_list();
		// },
		// 分享
		onShareAppMessage() {
			// let shareData = {
			// 	title: '',
			// 	path: `pages/index/index`,
			// 	imageUrl: ''
			// }
			return certification.onShareAppMessage({});
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
		width: 690rpx !important;
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
