import Config from './config'
class Base {
	constructor() {
		this.base_qequest_url = Config.requset_url;
		this.base_image_url = Config.img_url;
		this.base_wx_login_url = Config.wx_login_url;
		this.base_wx_order_pay_url = Config.wx_order_pay_url;
		this.apikey = Config.apikey;
	}
	//提示
	show_loading(message) {
		if (uni.showLoading) {
			// 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
			uni.showLoading({
				title: message,
				mask: true
			});
		} else {
			// 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
			uni.showToast({
				title: message,
				icon: 'loading',
				mask: true,
				duration: 20000
			});
		}
	}
	//隐藏
	hide_loading() {
		if (uni.hideLoading) {
			// 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
			uni.hideLoading();
		} else {
			uni.hideToast();
		}
	}
	//网络请求
	request(params) {
		var that = this;
		that.show_loading('加载中...');
		var url = that.base_qequest_url + params.url;
		var token = '';
		var token_type = '';
		that.get_storage('token', (res) => {
			token = res;
			that.get_storage('token_type', (res) => {
				token_type = res;
				uni.request({
					url: url,
					data: params.data || {},
					header: {
						'content-type': 'application/json',
						'apikey': that.apikey,
						'Authorization': token_type + ' ' + token
					},
					method: params.method || 'GET',
					success: function (ret) {
						var code = ret.statusCode.toString().charAt(0);
						if (code == '2' || code == '4' || code == '5') {
							that.hide_loading();
							// token实效,更新token
							if (ret.data.status_code == 500) {
								that.refresh_token(params); return;
							}
							// 返回请求到的数据
							params.sCallBack && params.sCallBack(ret); return;
						}
					},
					fail: function (err) {
						that.remove_storage('token');
						that.remove_storage('token_type');
						that.hide_loading();
					}
				})
			})
		})
	}
	//图片上传
	upload(count, callBack) {
		var that = this;
		var url = that.base_qequest_url + 'cash_withdrawal/qrcodeUpload';
		var token = '';
		var token_type = '';
		that.get_storage('token', (res) => {
			token = res;
			that.get_storage('token_type', (res) => {
				token_type = res;
				uni.chooseImage({
					count: count,
					success: function (res) {
						console.log(res.tempFilePaths)
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							that.show_loading('上传中...');
							uni.uploadFile({
								url: url,
								filePath: res.tempFilePaths[i],
								name: 'qrcode',
								header: {
									'apikey': that.apikey,
									'Authorization': token_type + ' ' + token
								},
								success: function (uploadFileRes) {
									var data = JSON.parse(uploadFileRes.data);
									// var data = uploadFileRes;
									that.hide_loading();
									// token实效,更新token
									if (data.status_code == 500) {
										that.refresh_token(count); return;
									}
									console.log(data)
									data.data = that.base_image_url + data.data
									// 返回请求到的数据
									count.sCallBack && count.sCallBack(data); return;
								}
							});
						}
					}
				});
			})
		})
	}
	//刷新token
	refresh_token(params) {
		var that = this;
		that.request({
			url: 'auth/refresh',
			method: 'POST',
			sCallBack: function (res) {
				// console.log('+++++++++++++++++++++11111111111111+++++++++++++++++++')
				// console.log(res)
				if (res.status_code == 'ok') {
					// that.set_storage('token', res.data.data.token);
					// that.set_storage('token_type', res.data.data.token_type);
					that.set_storage('token',res.access_token);
					that.set_storage('token_type',res.token_type);
				} else {
					that.remove_storage('token');
					that.remove_storage('token_type');
				}
				that.request(params);
			}
		});
	}
	//跳转tab
	switch_tab(url) {
		uni.switchTab({
			url: url
		})
	}
	//跳转页面
	navigate_to(url) {
		uni.navigateTo({
			url: url
		})
	}
	//页面返回
	navigate_back(delta) {
		uni.navigateBack({
			delta: delta || 1,
		});
	}
	//设置缓存
	set_storage(key, value) {
		uni.setStorage({
			key: key,
			data: value
		});
	}
	//获取缓存
	get_storage(key, callBack) {
		uni.getStorage({
			key: key,
			success: function (res) {
				console.log('|+|+|+|+|+|||||||||||||||||||||||||||||||||||||')
				console.log(res)
				callBack(res.data);
			},
			fail: function (e) {
				console.log('|||||||||||||||||||||||||||||||||||||+|+|+|+|+|')
				callBack('');
			}
		});
	}
	//删除缓存
	remove_storage(key) {
		uni.removeStorage({
			key: key
		});
	}

	//弹出框
	show_modal(params, callBack) {
		uni.showModal({
			title: params.title || '提示',
			content: params.content || '网络错误...',
			showCancel: params.showCancel === false ? false : true,
			cancelText: params.cancelText || '取消',
			success: function (res) {
				callBack(res);
			}
		});
	}
	//获取标签中的参数
	get_data_set(event, key) {
		return event.currentTarget.dataset[key];
	};
	//获取input的值
	get_input_val(event) {
		return event.target.value;
	};
	//数组去重
	unique_arr(arr) {
		var hash = [];
		for (var i = 0; i < arr.length; i++) {
			if (hash.indexOf(arr[i]) == -1) {
				hash.push(arr[i]);
			}
		}
		return hash;
	}
	//判断是否为手机号
	is_phone_number(tel) {
		var reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
		return reg.test(tel);
	}
	//判断验证码是否正确
	is_code_number(code) {
		var reg = /^[0-9]{6}$/;
		return reg.test(code);
	}

	//提示框
	show_tips(options) {
		uni.showToast({
			title: options || '加载中...',
			icon: 'none',
			duration: 2000
		});
	}
	//根据下标删除数组元素
	delete_arr_index(arr, index) {
		arr.splice(index, 1);
		return arr;
	}
	//图片预览
	previewImage(urls) {
		uni.previewImage({
			urls: urls
		})
	}
	//打电话
	make_phone_call(phoneNumber) {
		uni.makePhoneCall({
			phoneNumber: phoneNumber.toString()
		});
	}
	//分享
	onShareAppMessage(data) {
		console.log(data)
		return {
			title: data.title || '益步步',
			path: data.path || 'pages/index/index',
			imageUrl: data.img || '../../static/images/stepBg.png'
		};
	}
}
export default Base