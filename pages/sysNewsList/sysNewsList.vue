<template>
	<view class="list">
		<notList v-if="true" />
		<view class="item" v-for="(item,index) in 6" :key="index">
			<view class="newsTitle">
				<view>
					<image src="../../static/images/test.png" mode=""></image>
					标题标题
				</view>
				<text>3分钟前</text>
			</view>
			<image src="../../static/images/test.png" class="coverImg" mode=""></image>
			<view class="info">
				<view>标题标题标题标题标题标题标题标题</view>
				<text>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</text>
			</view>
		</view>
	</view>
</template>

<script>
	import notList from "@/components/notList.vue";
	import SysNewsList from "./sysNewsList-model.js";
	const sysNewsList = new SysNewsList();
	export default {
		components: {
		  notList
		},
		data() {
			return {
				userInfo: {},
				sysNewsList: []
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
		},
		onShow() {
			// 获取已授权类别
			const that = this
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
			},
			// 加载新消息列表
			getNewNewsList(callBack) {
				const that = this
				sysNewsList.getNewNewsList({
					openid: that.userInfo.openid	
				}, (res) => {
					// console.log(res)
					if (res.code == 4000) {
						that.newNewsList = res.data
					}
					callBack && callBack();
				})
			},
			// 进入--消息--详情页
			goNewDetails(e) {
				const that = this;
				const id = sysNewsList.get_data_set(e, "id");
				sysNewsList.navigate_to(`/pages/sysNews/sysNews?id=${id}`);
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
			return sysNewsList.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.item {
		width: 690rpx;
		height: auto;
		// padding: 0 30rpx;
		margin: 30rpx;
		border-radius: 10rpx;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		.newsTitle {
			width: 630rpx;
			height: auto;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: @fontSize_1;
			color: @fontColor_1;
			view {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				font-weight: @mainFontWeight;
			}
			image {
				width: 35rpx;
				height: 35rpx;
				border-radius: 35rpx;
				margin-right: 20rpx;
			}
			text {
				font-size: @fontSize_2;
				color: @fontColor_3;
			}
		}
		.coverImg {
			width: 100%;
			height: 300rpx;
		}
		.info {
			width: 630rpx;
			height: auto;
			padding: 30rpx;
			view {
				font-size: @fontSize_1;
				font-weight: @mainFontWeight;
				color: @fontColor_1;
			}
			text {
				line-height: 35rpx;
				margin-top: 30rpx;
				font-size: @fontSize_2;
				color: @fontColor_3;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
</style>
