import {connect} from "../../dist"
import {addSuccessResult, addErrorResult, addWarnResult} from '../util/common.js'
import {token} from '../config/config.js'

export default {
	name: "连接",
	action: function() {
		console.log('调用连接方法')
		connect('xx', (result) => {
			console.log(result)
			addSuccessResult({
				title: '连接成功',
				data: result
			})
		})
	}
}
