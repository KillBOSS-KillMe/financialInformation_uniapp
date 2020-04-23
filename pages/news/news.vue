<template>
	<view class="pageTopBorder">
		<scroll-view  scroll-y="true" class="content">
			<notList v-if="newsList.length <= 0" />
			<view class="item" @tap="goNewDetails" :data-id="1" :data-type="0" v-for="(item,index) in 20" :key="index" v-if="newsList.length > 0">
				<view class="info">
					<image src="../../static/images/test.png" mode=""></image>
					<view class="con">
						<view>系统通知</view>
						<text>客服消息为您推送两条新的信息</text>
					</view>
				</view>
				<icon class="iconfont iconxiangyou"></icon>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import notList from "@/components/notList.vue";
	import News from "./news-model.js";
	const news = new News();
	export default {
		components: {
		  notList
		},
		data() {
			return {
				userInfo: {},
				newsList: [1,2,4]
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		onShow() {
			// 获取已授权类别
			const that = this
			
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				console.log(that.userInfo)
				that.getNewsList(() => {
					callBack && callBack();
				})
			},
			getNewsList(callBack) {
				const that = this
				news.getChatList({
					openid: that.userInfo.openid	
				}, (res) => {
					console.log(res)
					if (res.code == 4000) {
						
					}
					callBack && callBack();
				})
			},
			// 进入--消息--详情页
			goNewDetails(e) {
				const that = this;
				const id = news.get_data_set(e, "id");
				const type = news.get_data_set(e, "type");
				let url = ''
				if (type == 0) {
					// 进入用户消息
					url = `/pages/newsChat/newsChat?id=${id}`
				} else {
					// 进入系统消息
					url = `/pages/sysNews/sysNews?id=${id}`
				}
				news.navigate_to(url);
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
		width: 100%;
		padding: 30rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid @borderColor_1;
		.info {
			width: 630rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 64rpx;
				margin-right: 30rpx;
			}
			.con {
				width: 536rpx;
				height: 64rpx;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				view {
					font-size: @fontSize_1;
					color: @fontColor_1;
				}
				text {
					font-size: @fontSize_2;
					color: @fontColor_2;
				}
			}
		}
		.iconfont {
			width: 30rpx;
			height: 30rpx;
			font-size: @fontSize_1;
			color: @fontColor_2;
		}
	}
</style>
