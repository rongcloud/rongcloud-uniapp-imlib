// 测试基础信息配置
import config from '../config/config.js'
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
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
export const setTestConfig = {
	name: '配置测试基础信息',
	params: [
		{ key: 'appkey', value: config.appkey, type: 'string'},
		{ key: 'token', value: config.token, type: 'textarea'},
		{ key: 'targetId', value: config.targetId, type: 'string'},
		{ key: 'conversationType', value: config.conversationType, type: 'number'},
		{ key: 'test', value: config.test || false, type: 'boolean'},
	],
	action: ({appkey, token, targetId, conversationType, test}) => {
		console.log(appkey, token, targetId, conversationType, test)
		config.appkey = appkey
		config.token = token
		config.targetId = targetId
		config.conversationType = conversationType
		config.test = test
		uni.setStorageSync('testBaseConfig', config)
		addSuccessResult({
			title: '配置成功'
		})
	}
}

export const clearTestConfig = {
	name: '清空配置缓存',
	action: () => {
		uni.removeStorageSync('testBaseConfig')
		addSuccessResult({
			title: '重置配置成功，重启后生效'
		})
	}
}