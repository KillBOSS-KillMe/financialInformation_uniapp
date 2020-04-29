<template>
	<view class="list">
		<notList v-if="sysNewsNode.data.length == 0" />
		<view class="item" v-for="(item,index) in sysNewsNode.data" :key="index" @tap="goNewDetails" :data-id="item.id">
			<view class="newsTitle">
				<view>
					<image src="../../static/images/vipBg_1.png" mode=""></image>
					系统消息
				</view>
				<text>{{item.createtime}}</text>
			</view>
			<image :src="item.img" class="coverImg" mode="" v-if="item.img != ''"></image>
			<view class="info">
				<view>{{item.title}}</view>
				<rich-text :nodes="item.content" class="content"></rich-text>
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
				sysNewsNode: {
					page: 1,
					data: []
				},
        imgUrl: ''
			}
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		onShow() {
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.userInfo = that.$store.state.userInfo;
        that.imgUrl = sysNewsList.base_image_url
				that.getNewNewsList()
			},
			// 加载新消息列表
			getNewNewsList(callBack) {
				const that = this
				sysNewsList.getNewNewsList({
					openid: that.userInfo.openid,
					page: that.sysNewsNode.page
				}, (res) => {
					if (res.code == 4000) {
						let list = res.data
						for (let i = 0; i < list.length; i++) {
							list[i].createtime = sysNewsList.transformTime(list[i].createtime * 1000)
              if (list[i].img) {
                list[i].img = that.imgUrl + list[i].img
              }
						}
						res.data = that.sysNewsNode.data.concat(list);
						that.sysNewsNode = res
					}
					callBack && callBack();
				})
			},
			// 进入--消息--详情页
			goNewDetails(e) {
				const that = this;
				const id = sysNewsList.get_data_set(e, "id");
        // let data = that.sysNewsNode.data[index]
        // 消息内容中包含'&'字符,无法通过路径传参
        // 所以此处使用全局变量
        
        // console.log(url)
        // console.log(data)
        // data = JSON.stringify(data)
        // console.log(data)
				sysNewsList.navigate_to(`/pages/sysNews/sysNews?id=${id}`);
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			var that = this;
			that.sysNewsNode = {
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
		  if (that.sysNewsNode.page == that.sysNewsNode.page_number) {
				articleList.show_tips('没有更多数据了')
		    return;
		  }
		  that.sysNewsNode.page += 1;
		  // 客户经理列表加载
		  this.getNewNewsList()
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
				-webkit-line-clamp: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.content {
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
