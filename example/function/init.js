import {init} from "../../dist"
import {addSuccessResult, addErrorResult} from '../util/common.js'
import {appkey} from '../config/config.js'

export default {
	name: "初始化",
	action: function() {
		console.log('调用初始化方法')
		init(appkey)
		addSuccessResult({
			title: '调用初始化接口'
		})
	}
}
