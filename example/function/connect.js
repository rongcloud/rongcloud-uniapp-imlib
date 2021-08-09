import {connect} from "../../dist"
import {addSuccessResult, addErrorResult, addWarnResult} from '../util/common.js'
import {token} from '../config/config.js'

export default {
	name: "连接",
	action: function() {
		console.log('调用连接方法')
		connect({
			token,
			success: (userId) => {
				addSuccessResult({
					title: '连接成功',
					data: `userid: ${userId}`
				})
			},
			error: (errCode) => {
				addSuccessResult({
					title: '连接失败',
					data: errCode
				})
			},
			tokenIncorrect: (errCode) => {
				addWarnResult({
					title: 'tokenIncorrect'
				})
			},
		})
	}
}
