<template>
	<view class="pageTopBorder">
		<view class="content">
			<notList v-if="attentionNode.data.length <= 0" />
			<!-- <view class="item" v-for="(item,index) in attentionNode.data" :key="index" v-if="attentionNode.data.length > 0" @tap="goManagerDetails" :data-managerindex="index" :data-id="item.id"> -->
			<view class="item" v-for="(item,index) in attentionNode.data" :key="index" v-if="attentionNode.data.length > 0">
				<image :src="item.portrait" mode=""></image>
				<view class="info">
					<view class="con">
						<view>{{item.name}}/{{item.company}}</view>
						<text>{{item.post}}</text>
					</view>
					<button type="default" @tap="notAttention" :data-id="item.id" :data-index="index">已关注</button>
					<!-- <button type="default" class="active">关注</button> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import notList from "@/components/notList.vue";
	import UserAttention from "./userAttention-model.js";
	const userAttention = new UserAttention();
	export default {
		components: {
			notList
		},
		data() {
			return {
				userInfo: {},
				attentionNode: {
					page: 1,
					data: []
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
				that.getList(() => {
					callBack && callBack();
				})
			},
			// 加载列表
			getList(callBack) {
				const that = this
				userAttention.getList({
					page: that.attentionNode.page || 1,
					openid: that.userInfo.openid
				}, (res) => {
					// console.log(res)
					if (res.code == 4000) {
						res.data = that.attentionNode.data.concat(res.data);
						that.attentionNode = res
					}
					callBack && callBack();
				})
			},
			// // 进入--客户经理--详情页
			// goManagerDetails(e) {
			// 	const that = this;
			// 	const managerindex = userAttention.get_data_set(e, "managerindex");
			// 	let data = JSON.stringify(that.attentionNode.data[managerindex]);
			// 	userAttention.navigate_to(`/pages/managerDetails/managerDetails?data=${data}`);
			// },
			// 取消关注
			notAttention(e) {
				const that = this
				uni.showModal({
					title: '系统提示',
					content: '确定取消关注？',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定');
							let id = userAttention.get_data_set(e, "id")
							let index = userAttention.get_data_set(e, "index")
							userAttention.runNotAttention({
								openid: that.userInfo.openid,
								id: id
							}, (res) => {
								if (res.code == 4000) {
									userAttention.show_tips(res.explain)
									that.attentionNode.data = userAttention.delete_arr_index(that.attentionNode.data, index)
								} else {
									userAttention.show_tips(res.explain)
								}
								// callBack && callBack();
							})
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				});
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.attentionNode = {
				page: 1,
				data: []
			}
			that._onLoad(() => {
				uni.stopPullDownRefresh();
			});
		},
		//上拉加载更多
		onReachBottom() {
		  var that = this;
		  if (that.attentionNode.page == that.attentionNode.page_number) {
				userAttention.show_tips('没有更多数据了')
		    return;
		  }
		  that.attentionNode.page += 1;
		  // 客户经理列表加载
		  this.getList()
		},
		// 分享
		onShareAppMessage() {
			// let shareData = {
			// 	title: '',
			// 	path: `pages/index/index`,
			// 	imageUrl: ''
			// }
			return userAttention.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	.content {
		width: 690rpx !important;
		;
		height: auto;
		padding: 30rpx;
	}

	.item {
		wwidth: 630rpx;
		padding: 30rpx;
		margin: 30rpx 0;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

		image {
			width: 140rpx;
			height: 170rpx;
			border-radius: 10rpx;
		}

		.info {
			width: 460rpx;
			height: 170rpx;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;

			.con {
				width: 536rpx;
				height: 64rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;

				view {
					font-size: @fontSize_1;
					font-weight: @mainFontWeight;
					color: @fontColor_1;
				}

				text {
					font-size: @fontSize_2;
					color: @fontColor_2;
				}
			}

			button {
				width: 140rpx;
				height: 50rpx;
				border-radius: 10rpx;
				color: #fff;
				font-size: @fontSize_2;
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
