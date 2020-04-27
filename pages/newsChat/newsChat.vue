<template>
	<view class="pageTopBorder">
		<!-- {{scrollviewHight}} -->
		<scroll-view scroll-y="true" :style="{height:scrollviewHight + 'px'}" class="content" @scrolltoupper="runscroll" :upper-threshold="10">
			<view :class="item.direction == 2 ? 'item1' : 'item2'" v-for="(item,index) in newList" :key="index">
				<image :src="item.portrait" mode="" v-if="item.direction == 2 "></image>
				<view class="info">{{item.content}}</view>
				<image :src="item.portrait" mode="" v-if="item.direction == 1 "></image>
			</view>
			<!-- <view class="item2" v-for="(item,index) in 20" :key="index">
				<view class="info">我想咨询一下银行现在对于个人贷款这块有什么政策？</view>
				<image src="../../static/images/test.png" mode=""></image>
			</view> -->
		</scroll-view>
		<view class="sendMessage">
			<view class="con">
				<input type="text" :value="message" @input="getMessage" placeholder="请填写您的评论信息" />
				<button type="default" @tap="sendMessage">发送</button>
			</view>
		</view>
	</view>
</template>

<script>
	import NewsChat from "./newsChat-model.js";
	const newsChat = new NewsChat();
	export default {
		data() {
			return {
				options: {},
				updataTimes: null,
				userInfo: {},
				message: '',
				newsNode: {
					page_number: 1,
					page: 1,
					data: []
				},
				newList: [],
				scrollviewHight: 0,
				historyTime: 0
			};
		},
		onLoad(options) {
			// console.log(options)
			const that = this
			that.options = options
			that._onLoad()
		},
		onShow() {

		},
		onUnload() {
			this.runClearInterval()
		},
		onHide() {
			this.runClearInterval()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				// 计算消息区域高度
				// uni.getSystemInfo({
				// 	success(res) {
				// 		let windowHeight = res.windowHeight
				// 		// 计算组件的高度
				// 		let view = uni.createSelectorQuery().select(".sendMessage")
				// 		view.boundingClientRect(data => {
				// 			let navHeight = data.height
				// 			let scrollviewHigh = windowHeight - navHeight
				// 		}).exec()
				// 	}
				// })
				let heightAll = uni.getSystemInfo().windowHeight
				console.log(heightAll)
				// 加载消息
				that.getNewsList(() => {
					callBack && callBack();
				})
				that.updataTimes = setInterval(() => {
					that.updataNewsList()
				}, 3000);
			},
			// 滚动触顶执行,加载历史消息
			runscroll(e) {
				const that = this
				if (that.newsNode.page != that.newsNode.page_number) {
					that.gethistoryList()
				}
			},
			// 刷新消息
			updataNewsList() {
				const that = this
				uni.request({
					url: `${newsChat.base_qequest_url}chat/getNewMessage`,
					data: {
						openid: that.userInfo.openid,
						id: that.options.id
					},
					method: 'POST',
					success: (res) => {
						if (res.data.code == 4000) {
							let newsNode = res.data.data
							let newMessageList = []
							if (newsNode.length > 0) {
								for (let i = 0; i < newsNode.length; i++) {
									newMessageList.push({
										content: newsNode[i].content,
										direction: 2,
										portrait: newsNode[i].portrait,
										nickname: newsNode[i].nickname
									})
								}
								that.newList = that.newList.concat(newMessageList)
								// 滚动到聊天底部
								that.getScrollviewHigh()
							}

						}
					}
				});
			},
			// 加载历史消息
			gethistoryList(callBack) {
				const that = this
				let page = parseInt(that.newsNode.page) + 1
				newsChat.getNewsList({
					openid: that.userInfo.openid,
					id: that.options.id,
					page: page,
					time: that.historyTime
				}, (res) => {
					// console.log(res)
					if (res.code == 4000) {
						let newNode = res
						that.newList = newNode.data.reverse().concat(that.newList);
						that.newsNode = res
					}
					callBack && callBack();
				})
			},
			// 初始化消息
			getNewsList(callBack) {
				const that = this
				newsChat.getNewsList({
					openid: that.userInfo.openid,
					id: that.options.id,
					page: that.newsNode.page
				}, (res) => {
					console.log(res)
					if (res.code == 4000) {
						let newNode = res
						that.historyTime = newNode.time
						that.newList = newNode.data.reverse()
						that.newsNode = res
						setTimeout(() => {
							// 滚动到聊天底部
							that.getScrollviewHigh()
						}, 100)
					}
					callBack && callBack();
				})
			},

			// 发送消息
			sendMessage(callBack) {
				const that = this
				newsChat.sendMessage({
					openid: that.userInfo.openid,
					id: that.options.id,
					content: this.message
				}, (res) => {
					if (res.code == 4000) {
						// 给消息列表中加入自己发送的消息
						let myNewMessage = {
							content: that.message,
							direction: 1,
							portrait: that.userInfo.portrait
						}
						that.newsNode.data.push(myNewMessage)
						// 清空输入的消息
						that.message = ''
						// 滚动到聊天底部
						that.getScrollviewHigh()
					} else {
						newsChat.show_tips(res.explain)
					}
					// callBack && callBack();
				})
			},
			// 清理定时器
			runClearInterval() {
				if (this.updataTimes) {
					clearInterval(this.updataTimes);
					this.updataTimes = null;
				}
			},
			// 获取输入框中的内容
			getMessage(e) {
				const that = this
				this.message = newsChat.get_input_val(e)
			},
			// 聊天区域滚动到底部
			getScrollviewHigh() {
				let that = this
				uni.getSystemInfo({
					success(res) {
						let windowHeight = res.windowHeight
						// 计算组件的高度
						let view = uni.createSelectorQuery().select(".pageTopBorder")
						view.boundingClientRect(data => {
							let navHeight = data.height
							that.scrollviewHight = windowHeight - navHeight - 20
							// 滚动到底部
							uni.pageScrollTo({
								scrollTop: navHeight,
								duration: 0
							});
						}).exec()
					}
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
			return newsChat.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");

	scroll-view {
		height: 100vh;
	}

	.content {
		width: 690rpx !important;
		height: 100vh;
		height: auto;
		// height: calc(100vh - 120rem);
		padding: 30rpx;
		padding-bottom: 110rpx;
		background-color: #333;
		.item1,
		.item2 {
			width: 100%;
			height: auto;
			display: flex;
			align-items: flex-start;
			padding: 30rpx 0;

			image {
				width: 64rpx;
				height: 64rpx;
				border-radius: 64rpx;
			}

			.info {
				width: auto;
				line-height: 35rpx;
				max-width: 442rpx;
				font-size: @fontSize_2;
				padding: 30rpx;
			}
		}

		.item1 {
			justify-content: flex-start;

			image {
				margin-right: 30rpx;
			}

			.info {
				color: @fontColor_1;
				border-radius: 0 20rpx 20rpx 20rpx;
				background-color: @inputBgColot;
			}
		}

		.item2 {
			justify-content: flex-end;

			image {
				margin-left: 30rpx;
			}

			.info {
				color: #fff;
				border-radius: 20rpx 0 20rpx 20rpx;
				background-color: @themeColor_1;
			}
		}
	}

	.sendMessage {
		position: fixed;
		left: 30rpx;
		bottom: 0;
		width: 690rpx;
		height: auto;
		padding: 30rpx 0;
		background-color: #fff;

		.con {
			width: 100%;
			height: auto;
			display: flex;
			align-items: center;
			justify-content: space-between;

			button {
				width: 166rpx;
				height: 60rpx;
				border-radius: 60rpx;
				background-color: @themeColor_1;
				font-size: @fontSize_2;
				color: #fff;
			}

			input {
				width: 434rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: @fontSize_2;
				padding: 0 30rpx;
				border-radius: 60rpx;
				background-color: @inputBgColot;
			}
		}

	}
</style>
