<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="titleModel" v-if="informationNode.data.length > 0">
				<view class="titleCon">
					<view></view>我的资质
				</view>
				<!-- <view class="more">
					更多
					<icon class="iconfont iconxiangyou"></icon>
				</view> -->
			</view>
			<view class="info">
				<view class="item">
					<view>姓名</view>
					<text>{{info.name}}</text>
				</view>
				<view class="item">
					<view>岗位名称</view>
					<text>{{info.post}}</text>
				</view>
				<view class="item">
					<view>工作经验</view>
					<text>{{info.experience}}</text>
				</view>
				<view class="item">
					<view>身份证号码</view>
					<text v-if="info.validation == 1">已认证</text>
					<text v-else>未认证</text>
				</view>
				<view class="item">
					<view>身份证正面照</view>
					<text v-if="info.validation == 1">已认证</text>
					<text v-else>未认证</text>
				</view>
				<view class="item">
					<view>身份证反面照</view>
					<text v-if="info.validation == 1">已认证</text>
					<text v-else>未认证</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserQualification from "./userQualification-model.js";
	const userQualification = new UserQualification();
	export default {
		data() {
			return {
				userInfo: {},
				info: {}
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
				that.getDetails(() => {
					callBack && callBack();
				})
			},
			// 详情加载
			getDetails(callBack) {
				const that = this
				userQualification.getDetails({
					openid: that.userInfo.openid,
					id: that.userInfo.id
				}, (res) => {
					if (res.code == 4000) {
						that.info = res.data
						userQualification.show_tips(res.explain)
					}
					callBack && callBack();
				})
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			const that = this
			that._onLoad()
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
			return userQualification.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.content {
		width: 690rpx !important;;
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
