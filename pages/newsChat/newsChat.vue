<template>
	<view class="pageTopBorder">
		<scroll-view scroll-y="true" class="content">
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
				newsNode: {},
				newList: []
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
		onUnload(){  
			this.runClearInterval()
		},
		onHide() {
			this.runClearInterval()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
				that.getNewsList(() => {
					callBack && callBack();
				})
				that.updataTimes = setInterval(() => {
					that.updataNewsList()
				}, 3000);
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
							for (let i = 0; i < newsNode.length; i++) {
								newMessageList.push({
									content: newsNode[i].content,
									direction: 2,
									portrait: newsNode[i].portrait,
									nickname: newsNode[i].nickname
								})
							}
							that.newList = that.newList.concat(newMessageList)
						}
					}
				});
			},
			// 初始化消息
			getNewsList(callBack) {
				const that = this
				newsChat.getNewsList({
					openid: that.userInfo.openid,
					id: that.options.id
				}, (res) => {
					console.log(res)
					if (res.code == 4000) {
						let newNode = res
						that.newList = newNode.data.reverse()
						that.newsNode = res
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
					} else {
						newsChat.show_tips(res.explain)
					}
					// callBack && callBack();
				})
			},
			runClearInterval() {
				if(this.updataTimes) {
				    clearInterval(this.updataTimes);  
				    this.updataTimes = null;  
				}
			},
			getMessage(e) {
				const that = this
				this.message = newsChat.get_input_val(e)
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
		width: 690rpx !important;;
		height: auto;
		padding: 30rpx;
		padding-bottom: 110rpx;
		.item1, .item2 {
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
