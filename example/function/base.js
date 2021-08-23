// 基础接口
import {
	connect,
	init, 
	addConnectionStatusListener, 
	disconnect
} from "../../dist"
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
import config from '../config/config.js'
import initListener from './listener.js'
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
export const rcInit = {
	name: "初始化",
	action: function() {
		console.log('调用初始化方法')
		console.log(config.appkey)
		init(config.appkey)
		
		addSuccessResult({
			title: '调用初始化接口'
		})
		
		initListener()
	}
}

export const rcConnect = {
	name: "连接",
	action: function() {
		console.log('调用连接方法')
		connect(config.token, (result) => {
			console.log(result)
			if (result.error === 0) {
				addSuccessResult({
					title: '连接成功',
					data: result
				})				
			} else {
				addErrorResult({
					title: '连接失败',
					data: result,
					code: result.error
				})
			}
		})
	}
}

export const rcDisconnect = {
	name: "断开连接",
	action: function() {
		console.log('调用断开连接方法')
		disconnect()
		addPrimaryResult({
			title: '断开连接'
		})
	}
}
