import {test} from "../../dist"
import {addSuccessResult, addErrorResult} from '../util/common.js'

export default {
	name: "测试接口",
	action: function() {
		console.log('调用测试接口方法')
		// test().then((res) => {
		// 	if (res.code === 0) {
		// 		addSuccessResult({
		// 			...res,
		// 			title: '调用测试接口'
		// 		})
		// 	} else {
		// 		addErrorResult({
		// 			...res,
		// 			title: '调用测试接口'
		// 		})
		// 	}
		// })
	}
}