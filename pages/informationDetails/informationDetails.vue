<template>
	<view class="pageTopBorder">
		<view class="content">
			<view class="articleTitle">{{informationNode.newsinfo.title}}</view>
			<view class="articleInfo">
				<text>{{informationNode.newsinfo.seenumber}}阅读</text>
				<text>{{informationNode.newsinfo.createtime}}</text>
			</view>
			<!-- <view class="articleContent">
				{{informationNode.newsinfo.content}}
			</view> -->
			<rich-text :nodes="informationNode.newsinfo.content" class="articleContent"></rich-text>
			<view class="articleCommentList">
				<view class="item" v-for="(item,index) in informationNode.CommentList" :key="index">
					<image :src="item.portrait" mode=""></image>
					<view class="comment">
						<view class="name">{{item.nickname}}</view>
						<view class="commentCon">{{item.ccontent}}</view>
						<view class="features">
							<text>{{item.createtime}}</text>
							<view @tap="like" :data-id="item.id" :data-index="index">
								<icon :class="item.vote_type == 1 ? 'iconfont icondianzan active' : 'iconfont icondianzan'"></icon>
								{{item.support}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="articleComment">
				<view class="con">
					<input type="text" :value="commentCon" @input="getCommentCon" placeholder="请填写您的评论信息" />
					<button type="default" @tap="sendComment">发送</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import InformationDetails from "./informationDetails-model.js";
	const informationDetails = new InformationDetails();
	export default {
		data() {
			return {
				options: {},
				userInfo: {},
				informationNode: {},
				imageUrl: '',
				commentCon: ''
			};
		},
		onLoad(options) {
			const that = this
			that.options = options
			that._onLoad()
		},
		methods: {
			_onLoad(callBack) {
				const that = this
				that.imageUrl = informationDetails.base_image_url
				that.userInfo = that.$store.state.userInfo;
				that.getNewsContent(() => {
					callBack && callBack();
				})
			},
			// 获取详情
			getNewsContent(callBack) {
				const that = this
				informationDetails.getNewsContent({
					openid: that.userInfo.openid,
					id: that.options.id
				}, (res) => {
					if (res.code == '4000') {
						let newsinfo = res.newsinfo
						let CommentList = res.CommentList
            let imageUrl = '<img style="width:100%" src="' + that.imageUrl
            let content = newsinfo.content;
            content = content.split('<img src="');
            let newContent = ''
            for (let i = 0; i < content.length; i++) {
              newContent += content[i] + imageUrl
            }
            newContent = newContent.substr(0, newContent.length - imageUrl.length);
            newsinfo.content = newContent
						newsinfo.createtime = informationDetails.transformTime(newsinfo.createtime * 1000)
						for (let i = 0; i < CommentList.length; i++) {
							// CommentList[i].portrait = that.imageUrl + CommentList[i].portrait
							CommentList[i].createtime = informationDetails.transformTime(CommentList[i].createtime * 1000)
						}
						res.newsinfo = newsinfo
						res.CommentList = CommentList
						that.informationNode = res
					}
					callBack && callBack();
				})
			},
			// 获取评论内容
			getCommentCon(e) {
				const that = this
				that.commentCon = informationDetails.get_input_val(e)
			},
			// 提交评论
			sendComment(callBack) {
				const that = this
				if (that.commentCon == '') {
					informationDetails.show_tips('请输入与评论内容')
					return false
				}
				informationDetails.sendComment({
					openid: that.userInfo.openid,
					id: that.options.id,
					content: that.commentCon
				}, (res) => {
					if (res.code == '4000') {
						informationDetails.show_tips(res.explain)
						that.commentCon = ""
					}
				})
			},
			// 点赞
			like(e) {
				const that = this
				let id = informationDetails.get_data_set(e, "id")
				let index = informationDetails.get_data_set(e, "index")
				informationDetails.like({
					openid: that.userInfo.openid,
					id: id,
					vote_type: 1
				}, (res) => {
					if (res.code == '4000') {
						informationDetails.show_tips(res.explain)
						that.informationNode.CommentList[index].support += 1
						that.informationNode.CommentList[index].vote_type = 1
					} else {
						informationDetails.show_tips(res.explain)
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
			return informationDetails.onShareAppMessage({});
		}
	}
</script>

<style lang="less">
	@import url("../../static/css/variable.less");
	.content {
		width: 690rpx !important;
		padding: 30rpx;
	}
	.articleTitle, .articleTitle, .articleTitle, .articleTitle, .articleTitle {
		width: 100%;
	}
	.articleTitle {
		font-size: @titleSize;
		font-weight: @mainFontWeight;
		color: @fontColor_1;
	}
	.articleInfo {
		font-size: @fontSize_2;
		color: @fontColor_3;
		padding: 30rpx 0;
		text {
			margin-right: 20rpx;
		}
	}
	.articleContent {
    width: 690rpx;
		font-size: @fontSize_1;
		color: @fontColor_2;
		border-bottom: 20rpx solid #F8F8F8;
    img {
      width: 100% !important;
    }
	}
	.articleCommentList {
		margin-bottom: 110rpx;
		.item {
			width: 100%;
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			padding: 30rpx 0;
			border-bottom: 1rpx solid @borderColor_1;
			image {
				width: 66rpx;
				height: 66rpx;
				border-radius: 66rpx;
			}
			.comment {
				width: 594rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				.name, .commentCon, .features {
					width: 100%;
				}
				.name {
					font-size: @fontSize_2;
					color: @fontColor_3;
				}
				.commentCon {
					font-size: @fontSize_2;
					color: @fontColor_2;
					padding: 30rpx 0;
				}
				.features {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: @fontSize_2;
					color: @fontColor_3;
					view {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.iconfont {
							font-size: @fontSize_2;
							color: @themeColor_2;
							margin-right: 10rpx;
						}
						.active {
							color: @themeColor_1 !important;
						}
					}
				}
			}
		}
	}
	.articleComment {
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
