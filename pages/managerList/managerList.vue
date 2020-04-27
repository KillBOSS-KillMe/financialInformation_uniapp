<template>
	<notList v-if="managerNode.data.length == 0" />
	<view class="managerList" v-else>
		<view class="item" @tap="goManagerDetails" :data-managerindex="index" :data-id="item.id" v-for="(item,index) in managerNode.data"
		 :key="index" v-if="managerNode.data.length > 0">
			<image :src="item.portrait" mode=""></image>
			<view class="info">
				<view class="details">
					<view>{{item.name}} / {{item.company}}</view>
					<text>{{item.post}}</text>
				</view>
				<button class="active">关注</button>
				<!-- <button class="noActive">取消关注</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import notList from "@/components/notList.vue";
	import ManagerList from "./managerList-model.js";
	const managerList = new ManagerList();
	export default {
		components: {
		  notList
		},
		data() {
			return {
				userInfo: {},
				managerNode: {
					page: 1,
					data: []
				}
			}
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
				// 客户经理列表加载
				this.getManagerList(() => {
					callBack && callBack();
				})
			},
			// 客户经理列表
			getManagerList(callBack) {
				const that = this
				managerList.getManagerList({
					openid: that.userInfo.openid,
					page: that.managerNode.page || 1
				}, (res) => {
					if (res.code == '4000') {
						res.data = that.managerNode.data.concat(res.data); 
						that.managerNode = res
					}
					callBack && callBack();
				})
			},
			// 进入--客户经理--详情页
			goManagerDetails(e) {
				const that = this;
				const managerindex = managerList.get_data_set(e, "managerindex");
				let data = JSON.stringify(that.managerNode.data[managerindex]);
				managerList.navigate_to(`/pages/managerDetails/managerDetails?data=${data}`);
			},
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
		onReachBottom() {
		  var that = this;
		  if (that.managerNode.page == that.managerNode.page_number) {
		    return;
		  }
		  that.managerNode.page += 1;
		  // 客户经理列表加载
		  this.getManagerList()
		},
		// 分享
		onShareAppMessage() {
			// let shareData = {
			// 	title: '',
			// 	path: `pages/index/index`,
			// 	imageUrl: ''
			// }
			return sysNewsList.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	.managerList {
		width: 750rpx;
		height: auto;

		.item {
			width: 630rpx;
			height: 170rpx;
			margin: 30rpx;
			padding: 30rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #ffffff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}
	}

	.managerList {
		.item {
			image {
				width: 140rpx;
				height: 100%;
				border-radius: 10rpx;
			}

			.info {
				width: 470rpx;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;

				.details {
					view {
						font-size: @fontSize_1;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
						margin-bottom: 20rpx;
					}

					text {
						font-size: @fontSize_2;
						color: @fontColor_3;
					}
				}

				button {
					width: 140rpx;
					height: 50rpx;
					border-radius: 10rpx;
					font-size: @fontSize_1;
					color: #ffffff;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.active {
					background-color: @themeColor_1;
				}

				.noActive {
					background-color: @themeColor_2;
				}
			}
		}
	}
</style>
