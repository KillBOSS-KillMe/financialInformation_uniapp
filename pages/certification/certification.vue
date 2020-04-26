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
				<view>工作经验</view>
				<input type="digit" value="" @input="getformData" data-name="experience" placeholder="请输入您的工作经验(年)" />
			</view>
			<view class="item">
				<view>身份证号</view>
				<input type="idcard" value="" @input="getformData" data-name="IDNumber" placeholder="请输入您的身份证号码" />
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
					experience: '',
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
			},
			getformData(e) {
				const that = this
				let val = certification.get_input_val(e);
				let key = certification.get_data_set(e, 'name');
				that.formData[key] = val
			},
			// 提交数据
			validation() {
				const that = this
				const formData = that.formData
				// 数据非空校验
				for (let key in formData) {
					if (formData[key] == ''){
						certification.show_tips('请完善认证信息')
						return false
					}
				}
				certification.validation({
					openid: that.userInfo.openid,
					name: formData.name,
					company: formData.bank,
					post: formData.post,
					experience: formData.experience,
					identity: formData.IDNumber,
					identity_just: formData.IDCard_1,
					identity_back: formData.IDCard_2
				}, (res) => {
					if (res.code == 4000) {
						certification.show_tips('提交成功，已提交审核')
						setTimeout(() => {
							certification.navigate_back()
						}, 2000)
					} else {
						certification.show_tips(res.explain)
					}
					callBack && callBack();
				})
			},
			// 图片上传
			upImage(e) {
				const that = this
				let type = certification.get_data_set(e, 'type')
				certification.getCard({
					count: 1,
					data: {
						openid: that.userInfo.openid,
						photo_type: type
					}
				}, (res) => {
					res = res[0]
					if (res.data.photo_type == '1') {
						that.formData.IDCard_1 = res.data.url
					} else {
						that.formData.IDCard_2 = res.data.url
					}
					certification.show_tips(res.data.explain)
				})
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
				height: 80rpx;
				padding: 0 30rpx;
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
