<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="managerDetails">
				<view class="info">
					<view class="managerUserInfo">
						<view>{{info.name}} / {{info.post}}</view>
						<text>{{info.company}}</text>
					</view>
					<view class="address">
						<icon class="iconfont icondizhi"></icon>
						<text>陕西省-西安市</text>
					</view>
					<view class="data">
						<view class="item">
							<view>{{info.follow_number}}</view>
							<text>关注</text>
						</view>
						<view class="item">
							<view>{{info.fans_number}}</view>
							<text>粉丝</text>
						</view>
					</view>
				</view>
				<view class="image">
					<image :src="info.portrait" mode=""></image>
					<view class="active" @tap="attention" v-if="info.fans_state == '0'">关注</view>
					<view @tap="notAttention" v-if="info.fans_state == '1'">取消关注</view>
				</view>
			</view>
			<view class="titleModel">
				<view class="titleCon">
					<view></view>他的信息
				</view>
			<!-- 	<view class="more">
					更多
					<icon class="iconfont iconxiangyou"></icon>
				</view> -->
			</view>
			<view class="managerInfo">
				<view class="item">
					<view>工作单位</view>
					<text>{{info.company}}</text>
				</view>
				<view class="item">
					<view>岗位名称</view>
					<text>{{info.post}}</text>
				</view>
				<view class="item">
					<view>实名认证</view>
					<text v-if="info.validation == 0">未认证</text>
					<text v-else-if="info.validation == 1">已认证</text>
					<text v-else-if="info.validation == 2">待审核</text>
				</view>
		<!-- 		<view class="item">
					<view>CCBP认证</view>
					<text>{{info.company}}</text>
				</view> -->
				<view class="item">
					<view>工作经验</view>
					<text>{{info.experience}}</text>
				</view>
			</view>
		</view>
		<view class="information" @tap="advisory">立即咨询</view>
	</view>
</template>

<script>
	import ManagerDetails from "./managerDetails-model.js";
	const managerDetails = new ManagerDetails();
	export default {
		data() {
			return {
				options: {},
				info: {}
			};
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				that.info = JSON.parse(that.options.data);
				that.getDetails(() => {
					callBack && callBack();
				})
			},
			// 详情加载
			getDetails(callBack) {
				const that = this
				managerDetails.getDetails({
					openid: that.userInfo.openid,
					id: that.info.id
				}, (res) => {
					if (res.code == 4000) {
						let newInfo = Object.assign(that.info, res.data);
						newInfo = managerDetails.num2str(newInfo)
						that.info = newInfo
					} else {
						managerDetails.show_tips(res.explain)
					}
					callBack && callBack();
				})
			},
			// 关注
			attention(callBack) {
				const that = this
				managerDetails.runAttention({
					openid: that.userInfo.openid,
					id: that.info.id
				}, (res) => {
					if (res.code == 4000) {
						managerDetails.show_tips(res.explain)
						that.info.fans_state = 1
					} else {
						managerDetails.show_tips(res.explain)
					}
					// callBack && callBack();
				})
			},
			// 取消关注
			notAttention(callBack) {
				const that = this
				managerDetails.runNotAttention({
					openid: that.userInfo.openid,
					id: that.info.id
				}, (res) => {
					if (res.code == 4000) {
						managerDetails.show_tips(res.explain)
						that.info.fans_state = 0
					} else {
						managerDetails.show_tips(res.explain)
					}
					// callBack && callBack();
				})
			},
			// 咨询
			advisory() {
				const that = this
				let id = that.info.id
				managerDetails.navigate_to(`/pages/newsChat/newsChat?id=${id}`);
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
			// 	path: `pages/index/index?${this.userInfo.id}`,
			// 	imageUrl: ''
			// }
			// return managerDetails.onShareAppMessage(shareData);
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.managerDetails, .managerInfo {
		width: 630rpx;
		height: auto;
		margin: 30rpx;
		padding: 30rpx;
		border-radius: 10rpx;
		background-color: #ffffff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	}
	.managerDetails {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 285rpx;
		.info, .image {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: column;
		}
		.info {
			// width: 490rpx;
			width: 350rpx;
			height: 100%;
			.managerUserInfo {
				width: 100%;
				view {
					font-size: @fontSize_1;
					font-weight: @mainFontWeight;
					color: @fontColor_1;
					padding-bottom: 20rpx;
				}
				text {
					font-size: @fontSize_2;
					color: @fontColor_3;
				}
			}
			.address {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-size: @fontSize_2;
				color: @fontColor_3;
				.iconfont {
					font-size: @fontSize_2;
					color: @fontColor_3;
					margin-right: 10rpx;
				}
			}
			.data {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// .item:nth-child(1) {
				// 	margin-right: 50rpx;
				// }
				.item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-direction: column;
					view {
						font-size: @titleSize;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
						padding-bottom: 20rpx;
					}
					text {
						font-size: @fontSize_2;
						color: @fontColor_3;
					}
				}
			}
		}
		.image {
			width: 140rpx;
			height: 100%;
			image {
				width: 100%;
				height: 170rpx;
				border-radius: @borderRadius_5;
			}
			view {
				width: 100%;
				height: 50rpx;
				font-size: @fontSize_2;
				color: #fff;
				border-radius: @borderRadius_5;
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
	.managerInfo {
		.item {
			width: 100%;
			height: auto;
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view {
				font-size: @fontSize_2;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			text {
				font-size: @fontSize_2;
				color: @fontColor_3;
			}
		}
	}
	.information {
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 690rpx;
		height: 80rpx;
		background: @themeColor_1;
		font-size: @fontSize_2;
		color: #fff;
		border-radius: @borderRadius_10;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
