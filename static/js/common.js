export default {
	authorizationButton: true,
	memberObj: {
		location: {
			id: 0,
			name: '您的小区名称',
			address: '您的小区名称'
		}
	},
	setMemberObj(data) {
		this.memberObj = Object.assign({}, this.memberObj, data)
	}
}
