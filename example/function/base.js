// 基础接口
import {
	connect,
	init, 
	initWithSetup,
	addConnectionStatusListener, 
	disconnect,
	setDeviceToken,
	setServerInfo,
	getConnectionStatus
} from "@rongcloud/imlib-uni"
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
import config from '../config/config.js'
import initListener from './listener.js'

export const _InitListener = {
	name: "添加事件监听",
	action: function() {
		initListener()
		
		addSuccessResult({
			title: '添加事件监听',
		})
	}
}

export const _Init = {
	name: "初始化",
	action: function() {
		
		console.log('调用初始化方法')
		console.log(config.appkey)
		init(config.appkey)
		
		if (config.navi) {
			console.log('调用setServerInfo方法')
			setServerInfo(config.navi)			
		}
		
		addSuccessResult({
			title: '调用初始化接口',
			data: config.appkey
		})
	}
}

export const _InitEngineWithSetup = {
	name: "使用配置参数初始化",
	action: function() {
		
		const engineSetup = {
			naviServer: config.navi,
			fileServer: config.fileServer,
			statisticServer: config.statisticServer,
			appVersion: '1.0.1', // 用户 app version
			androidPushConfig: {
				miAppId: '',
				miAppKey: '',
				meizuAppId: '',
				meizuAppKey: '',
				oppoAppKey: '',
				oppoAppSecret: '',
			}
		}

		console.log('调用 initWithSetup: ', config.appkey, engineSetup);
		initWithSetup(config.appkey, engineSetup);
		
		addSuccessResult({
			title: 'initWithSetup',
			data: config.appkey
		})
	}
}

export const _Connect = {
	name: "连接",
	action: function() {
		console.log('调用连接方法', config.token, config.userId)
		connect(config.token, (result) => {
			console.log(result)
			if (result.code === 0) {
				addSuccessResult({
					title: '连接成功',
					data: result
				})				
			} else {
				addErrorResult({
					title: '连接失败',
					data: result,
					code: result.code
				})
			}
		})
	}
}

export const _Disconnect = {
	name: "断开连接",
	action: function() {
		console.log('调用断开连接方法')
		disconnect()
		addPrimaryResult({
			title: '断开连接'
		})
	}
}

// export const _SetDeviceToken = {
// 	name: "设置 deviceToken",
// 	params: [
// 		{ key: 'deviceToken', value: '', type: 'string'},
// 	],
// 	action: function({deviceToken}) {
// 		console.log('调用setDeviceToken方法')
// 		setDeviceToken(deviceToken, (res) => {
// 			addSuccessResult({
// 				title: 'setDeviceToken成功',
// 				data: res
// 			})
// 		})
// 	}
// }

export const _SetServerInfo = {
	name: "设置ServerInfo",
	params: [
		{ key: 'naviServer', value: '', type: 'string'},
		{ key: 'fileServer', value: '', type: 'string'},
	],
	action: function({naviServer, fileServer}) {
		console.log('调用setServerInfo方法')
		setServerInfo(naviServer, fileServer)
		addPrimaryResult({
			title: 'setServerInfo',
			data: '设置成功'
		})
	}
}

export const _setStatisticServer = {
	name: "setStatisticServer",
	params: [
		{ key: 'server', value: '', type: 'string'},
	],
	action: function({server, fileServer}) {
		console.log('调用setStatisticServer方法')
		setStatisticServer(server, fileServer)
		addPrimaryResult({
			title: 'setStatisticServer',
			data: res
		})
	}
}

export const _getConnectionStatus = {
	name: "获取当前连接状态",
	action: function() {
		console.log('调用getConnectionStatus方法')
		getConnectionStatus((res) => {
			addPrimaryResult({
				title: 'getConnectionStatus',
				code: res.status,
				data: res
			})
		})
	}
}

