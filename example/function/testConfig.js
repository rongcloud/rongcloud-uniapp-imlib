// 测试基础信息配置
import config from '../config/config.js'
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
import {
	initNativePlugin
} from "@/uni_modules/RongCloud-IMWrapper/js_sdk"

const userList = config.userList.map(i => {
	return {
		label: i.appkey + '_' + i.userId,
		value: {
			...i
		}
	}
})
export const setTestConfig = {
	name: '配置测试基础信息',
	params: [
		{ key: 'account', value: userList[0].value, valueIndex: 0, type: 'picker', list: userList, name: '选择账号'},
		// { key: 'appkey', value: config.appkey, type: 'string'},
		// { key: 'token', value: config.token, type: 'textarea'},
		// { key: 'targetId', value: config.targetId, type: 'string'},
		// { key: 'conversationType', value: config.conversationType, type: 'number'},
		// { key: 'test', value: config.test || false, type: 'boolean'},
	],
	action: ({account}) => {
		console.log(account)
		config.appkey = account.appkey
		config.token = account.token
		config.userId = account.userId
		config.navi = account.navi
		// config.targetId = targetId
		// config.conversationType = conversationType
		console.log(config)
		// uni.setStorageSync('testBaseConfig', config)
		addSuccessResult({
			title: '配置成功',
			data: config
		})
	}
}


// export const clearTestConfig = {
// 	name: '清空配置缓存',
// 	action: () => {
// 		uni.removeStorageSync('testBaseConfig')
// 		addSuccessResult({
// 			title: '重置配置成功，重启后生效'
// 		})
// 	}
// }