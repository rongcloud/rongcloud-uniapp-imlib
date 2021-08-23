// 会话接口
import {getConversationList} from "../../dist"
import {addSuccessResult, addErrorResult} from '../util/common.js'
import config from '../config/config.js'
let baseConfig = uni.getStorageSync('testBaseConfig')
try{
	if (baseConfig) {
		config.appkey = baseConfig.appkey
		config.token = baseConfig.token
		config.targetId = baseConfig.targetId
		config.conversationType = baseConfig.conversationType
	}
}catch(e){
	//TODO handle the exception
}
export const rcGetConversationList = {
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
