<template>
	<view>
		<view class="search">
			<icon class="iconfont iconsousuo"></icon>
			<input type="text" :value="searchKey" placeholder="请输入您要搜索的客户经理/资讯" @input="getSearchCon" />
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in bannerData" :key="index">
				<image :src="item.img" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="titleModel" v-if="managerNode.data.length > 0">
			<view class="titleCon">
				<view></view>金牌客户经理
			</view>
			<view class="more" @tap="goManagerList">
				更多
				<icon class="iconfont iconxiangyou"></icon>
			</view>
		</view>
		<view class="managerList">
			<view class="item" @tap="goManagerDetails" :data-managerindex="index" :data-id="item.id" v-for="(item,index) in managerNode.data" :key="index" v-if="managerNode.data.length > 0">
				<image :src="item.portrait" mode=""></image>
				<view class="info">
					<view class="details">
						<view>{{item.name}} / {{item.company}}</view>
						<text>{{item.post}}</text>
					</view>
					<button class="active" v-if="item.fans_type == 0">关注</button>
					<button class="noActive" v-else>取消关注</button>
				</view>
			</view>
		</view>
		<view class="titleModel" v-if="informationNode.data.length > 0">
			<view class="titleCon">
				<view></view>最新资讯
			</view>
			<view class="more" @tap="goArticleList">
				更多
				<icon class="iconfont iconxiangyou"></icon>
			</view>
		</view>
		<view class="articleList">
			<view class="item" @tap="goInformationDetails" :data-id="item.id" v-for="(item,index) in informationNode.data" :key="index" v-if="informationNode.data.length > 0">
				<icon class="iconfont icondian"></icon>
				<view class="info">
					<view class="details">
						<view class="title">{{item.title}}</view>
            <text class="content">{{item.descs}}</text>
						<!-- <rich-text :nodes="item.content" class="content"></rich-text> -->
					</view>
					<view class="features">
						<view>{{item.seenumber}}阅读</view>
						<view>
							<icon class="iconfont iconshijian"></icon>
							<text>{{item.createtime}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button open-type="getUserInfo" v-if="authorizationButton" id='getUserInfo' lang="zh_CN" @getuserinfo="_onLoad"></button>
	</view>
</template>

<script>
	import Index from "./index-model.js";
	const index = new Index();
	export default {
		data() {
			return {
				options: {},
				searchKey: '',
				imageUrl: '',
				authorizationButton: true,
				userInfo: {},
				userInfoAll: {},
				// 轮播图相关
				bannerData: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 客户经理数据对象
				managerNode: {
					data: []
				},
				// 最新资讯
				informationNode: {
					data: []
				}
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
			// that._onLoad()
		},
		onShow() {
			const that = this
			that._onLoad()
			// const that = this
			
			// let token = index.get_storage('token_type', callBack);
			// if(token) {
			// 	that.getUserInfo(() => {
			// 		that.getRunData(() => {
			// 			callBack && callBack();
			// 		})
			// 	})
			// }
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.imageUrl = index.base_image_url
				that.userInfo = that.$store.state.userInfo;
				// 轮播图加载
				this.getBanner(() => {
					callBack && callBack();
				})
				
				// 最新资讯列表加载
				this.getInformationList(() => {
					callBack && callBack();
				})
				// 获取已授权类别
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) {
							// 隐藏授权按钮
							that.authorizationButton = false;
							that.$store.commit('updateAuthorizationButtonData', false);
							that.wx_login(() => {
								// 客户经理列表加载
								that.getManagerList(() => {
									callBack && callBack();
								})
							})
						} else {
							// 隐藏底部导航
							uni.hideTabBar({
								boolean: true
							})
						}
					},
					fail() {
						console.log("获取授权信息授权失败")
					}
				})
			},
			// 进入客户经理列表
			goManagerList() {
				index.navigate_to(`/pages/managerList/managerList`);
			},
			// 进入资讯列表
			goArticleList() {
				index.navigate_to(`/pages/articleList/articleList`);
			},
			// 进入--客户经理--详情页
			goManagerDetails(e) {
				const that = this;
				// const id = index.get_data_set(e, "id");
				const managerindex = index.get_data_set(e, "managerindex");
				let data = JSON.stringify(that.managerNode.data[managerindex]);
				index.navigate_to(`/pages/managerDetails/managerDetails?data=${data}`);
			},
			// 进入--资讯--详情页
			goInformationDetails(e) {
				const that = this;
				const id = index.get_data_set(e, "id");
				index.navigate_to(`/pages/informationDetails/informationDetails?id=${id}`);
			},
			wx_login(callBack) {
				const that = this;
				// 显示底部导航
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						var code = loginRes.code;
            // console.log(code)
            // return false
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								// 底部导航显示
								uni.showTabBar({
									boolean: true
								})
								that.userInfoAll = infoRes
								// 隐藏授权按钮
								that.authorizationButton = false;
								that.$store.commit('updateUserInfo', that.userInfo);
								that.$store.commit('updateAuthorizationButtonData', false);
								index.login({
									code: code,
									role: '', // 角色
									portrait: infoRes.userInfo.avatarUrl,
									nickname: infoRes.userInfo.nickName
								}, (res) => {
									// console.log(res)
									if (res.code == 4000) {
										that.userInfo = res.data
										that.$store.commit('updateUserInfo', that.userInfo);
										if (!that.userInfo.role) {
											// console.log(that.userInfo.role, '-=--------');
											// index.show_tips('用户未选择权限类型，即将进入选择页');
											index.show_modal({
												title: '系统提示',
												content: '检测到用户未选择权限类型，即将进入选择页'
											});
											setTimeout(() => {
												index.navigate_to(`/pages/identitySel/identitySel`);
											}, 3000)
										}
									}
									callBack && callBack();
								})
							}
						})
					}
				});
			},
			getSearchCon(e) {
				const that = this
				that.searchKey = index.get_input_val(e)
				// searchKey不为空的时候执行搜索,为空的时候加载原有列表
				if (that.searchKey != '') {
					// 执行搜索
					this.getSearchList()
				} else {
					// 客户经理列表加载
					this.getManagerList()
					// 客户经理列表加载
					this.getInformationList()
				}
			},
			// 执行搜索
			getSearchList(callBack) {
				const that = this
				index.getSearchList({
					openid: that.userInfo.openid,
					content: that.searchKey
				}, (res) => {
					if (res.code == '4000') {
						that.managerNode.data = res.ManagerList
						that.informationNode.data = res.NewsList
					}
					callBack && callBack();
				})
			},
			// 加载轮播图
			getBanner(callBack) {
				const that = this
				index.getBanner({}, (res) => {
					if (res.code == '4000') {
            let list = res.data
            for (let i = 0; i < list.length; i++) {
              list[i].img = that.imageUrl + list[i].img
            }
						that.bannerData = list
					}
					callBack && callBack();
				})
			},
			// 客户经理列表
			getManagerList(callBack) {
				const that = this
				index.getManagerList({
					openid: that.userInfo.openid
				}, (res) => {
					if (res.code == '4000') {
						that.managerNode = res
					}
					// callBack && callBack();
				})
			},
			// 最新资讯
			getInformationList(callBack) {
				const that = this
				index.getInformationList({}, (res) => {
					if (res.code == '4000') {
						let list = res.data
						for (let i = 0; i < list.length; i++) {
							list[i].createtime = index.transformTime(list[i].createtime * 1000)
						}
						res.data = list
						that.informationNode = res
					}
					callBack && callBack();
				})
			},
			// 提示开通会员
			// promptOpenVip(callBack) {
			// 	uni.showModal({
			// 		title: '系统提示',
			// 		content: '系统检测到用户未开通会员，是否开通会员',
			// 		success: res => {
			// 			if (res.confirm) {
			// 				index.navigate_to(`/pages/vip/vip`);
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 			}
			// 		}
			// 	});
			// }
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
			return index.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.search {
		width: 690rpx;
		height: 60rpx;
		margin: 10rpx 30rpx;
		background-color: @bgColor;
		border-radius: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.iconfont {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: @fontSize_1;
		}
		input {
			width: 600rpx;
			height: 60rpx;
			font-size: @fontSize_1;
		}
	}
	.swiper {
		width: 690rpx;
		height: 300rpx;
		margin: 30rpx;
		border-radius: 10rpx;
		image {
			width: 690rpx;
			height: 300rpx;
			border-radius: 10rpx;
		}
	}
	.managerList, .articleList {
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
	.articleList {
		.item {
			align-items: flex-start !important;
			.iconfont {
				width: 30rpx;
				height: 30rpx;
				font-size: @fontSize_2;
				color: @themeColor_1;
			}
			.info {
				width: 590rpx;
				height: 100%;
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				flex-direction: column;
				.details {
					width: 100%;
					.title {
						width: 100%;
						font-size: @fontSize_1;
						font-weight: @mainFontWeight;
						color: @fontColor_1;
						margin-bottom: 10rpx;
						padding-bottom: 20rpx;
						border-bottom: 1rpx solid @borderColor_1;
						-webkit-line-clamp: 1;
						overflow:hidden;
						text-overflow:ellipsis;
						white-space:nowrap;
					}
					.content {
						line-height: @fontSize_1;
						font-size: @fontSize_2;
						color: @fontColor_3;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
				}
				.features {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					view {
						margin-left: 30rpx;
						font-size: @fontSize_2;
						color: @fontColor_2;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.iconfont {
						font-size: @fontSize_2;
						color: @fontColor_2;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
