import {getConversationList} from "../../dist"
import {addSuccessResult, addErrorResult} from '../util/common.js'

export default {
	name: "获取会话列表",
	action: function() {
		console.log('调用获取会话列表方法')
		getConversationList([], 0, 0).then((res) => {
			addSuccessResult({
				title: '获取会话列表成功',
				data: res
			})
		})
	}
}
