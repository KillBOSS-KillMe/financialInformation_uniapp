<template>
	<view>
		<view class="title">
			<view>请选择您的身份</view>
			<text>我们会为您制定转专业化服务</text>
		</view>
		<view class="identityList">
			<button open-type="getUserInfo" lang="zh_CN" class="item" @tap="goHome" data-type="1">
				<image src="../../static/images/IdentitySel_1.png" mode=""></image>
				<view class="active">我是客户</view>
			</button>
			<button open-type="getUserInfo" lang="zh_CN" class="item" @tap="goHome" data-type="2">
				<image src="../../static/images/IdentitySel_2.png" mode=""></image>
				<view class="active">我是客户经理</view>
			</button>
		</view>
	</view>
</template>

<script>
	import IdentitySel from "./identitySel-model.js";
	const identitySel = new IdentitySel();
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			const that = this
			// that._onLoad()
		},
		methods: {
			// _onLoad(callBack) {
			// 	const that = this
			// 	that.userInfo = that.$store.state.userInfo;
			// 	that.wx_login(() => {
			// 		that.getUserInfo(() => {
			// 			callBack && callBack();
			// 		})
			// 	})
			// },
			goHome(e) {
				const that = this;
				const role = identitySel.get_data_set(e, "type");
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						var code = loginRes.code;
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								that.userInfoAll = infoRes
								that.$store.commit('updateUserInfo', that.userInfo);
								that.$store.commit('updateAuthorizationButtonData', false);
								identitySel.login({
									code: code,
									role: role, // 角色
									portrait: infoRes.userInfo.avatarUrl,
									nickname: infoRes.userInfo.nickName
								}, (res) => {
									// console.log(res)
									if (res.code == 4000) {
										that.$store.commit('updateUserInfo', res.data);
										if (role == '1') {
											identitySel.switch_tab(`/pages/index/index`);
										} else {
											// validation => 0  未认证
											// validation => 1  认证
											// validation => 2  审核中
											if (res.data.validation == 0) {
												// 客户经理资质 已认证
												identitySel.switch_tab(`/pages/index/index`);
											} else if (res.data.validation == 1) {
												// 客户经理资质 未认证
												identitySel.navigate_to(`/pages/certification/certification`);
											} else if (res.data.validation == 2) {
												// 客户经理资质 审核中
												identitySel.show_tips('资质审核中')
												return false
											}
										}
									}
									
									// if (res.status_code == 'ok') {
									// 	index.set_storage('token', res.access_token);
									// 	index.set_storage('token_type', res.token_type);
									// }
									// callBack && callBack();
								})
							}
						})
					}
				});
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.page = 1;
			// that._onLoad(() => {
			// 	uni.stopPullDownRefresh();
			// });
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
			return identitySel.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	page {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
	}
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
