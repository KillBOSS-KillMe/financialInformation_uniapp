<template>
	<view class="pageTopBorder">
		<scroll-view  scroll-y="true" class="content">
			<notList v-if="newsList.length <= 0" />
			<view class="item" @tap="goNewDetails" :data-id="1" :data-type="0" v-for="(item,index) in newsList" :key="index" v-if="newsList.length > 0">
				<view class="info">
					<image :src="newsList.portrait" mode=""></image>
					<view class="con">
						<view>{{newsList.nickname}}</view>
						<text>{{newsList.new_msg}}</text>
					</view>
				</view>
				<icon class="iconfont iconxiangyou" v-if="newsList.new_number == 0"></icon>
				<text class="newNews" v-else>{{newsList.new_number}}</text>
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
				newsList: []
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
				let newNewsNum = that.$store.state.newNewsNum;
				if (newNewsNum == 0) {
					// 加载新的消息列表和原有消息列表,然后二者合并
					that.getNewNewsList(() => {
						that.getNewsList(() => {
							callBack && callBack();
						})
					})
				} else {
					// 只加载原有消息列表
					that.getNewsList(() => {
						callBack && callBack();
					})
				}
			},
			// 加载新消息列表
			getNewNewsList(callBack) {
				const that = this
				news.getNewNewsList({
					openid: that.userInfo.openid	
				}, (res) => {
					// console.log(res)
					if (res.code == 4000) {
						that.newNewsList = res.data
					}
					callBack && callBack();
				})
			},
			// 加载原有消息列表
			getNewsList(callBack) {
				const that = this
				news.getNewsList({
					openid: that.userInfo.openid	
				}, (res) => {
					// console.log(res)
					if (res.code == 4000) {
						let newsList = res.data
						if (that.newNewsList.length > 0) {
							let newNewsList = that.newNewsList
							for (let i = 0; i < newsList.length; i++) {
								for (let y = 0; y < newNewsList.length; y++) {
									if (newNewsList[y].id == newsList[i].id) {
										// newsList[i] = newNewsList[y]
										// 删除原有消息中与新消息重复的项
										newsList.splice(i, 1)
									}
								}
							}
							// 合并新消息与旧消息
							that.newsList = newNewsList.concat(newsList)
						} else {
							that.newsList = newsList
						}
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
					url = `/pages/sysNewsList/sysNewsList?id=${id}`
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
			// let shareData = {
			// 	title: '',
			// 	path: `pages/index/index`,
			// 	imageUrl: ''
			// }
			return news.onShareAppMessage({});
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
		.newNews {
			font-size: @fontSize_1;
			color: #FF5953;
		}
	}
</style>
