<template>
	<view class="pageTopBorder">
		<view class="content">
			<notList v-if="attentionNode.data.length <= 0" />
			<view class="item" v-for="(item,index) in 20" :key="index" v-if="attentionNode.data.length > 0">
				<image src="../../static/images/test.png" mode=""></image>
				<view class="info">
					<view class="con">
						<view>系统通知</view>
						<text>客服消息为您推送两条新的信息</text>
					</view>
					<button type="default">已关注</button>
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
				attentionNode: {
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
			getList(callBack) {
				const that = this
				userAttention.getList({
					openid: that.userInfo.openid	
				}, (res) => {
					console.log(res)
					if (res.code == 4000) {
						this.attentionNode = res
					}
					callBack && callBack();
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
			let shareData = {
				title: '',
				path: `pages/index/index?${this.userInfo.id}`,
				imageUrl: ''
			}
			return index.onShareAppMessage(shareData);
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
