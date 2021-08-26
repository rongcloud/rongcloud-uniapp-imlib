// 其他接口
import {
	setNotificationQuietHours,
	getNotificationQuietHours,
	removeNotificationQuietHours,
	getOfflineMessageDuration,
	setOfflineMessageDuration,
	getCurrentUserId,
	setPushLanguageCode,
	setPushContentShowStatus,
	getPushContentShowStatus,
	setReconnectKickEnable,
	setPushConfig
} from "../../dist"
import {addSuccessResult, addErrorResult, addPrimaryResult} from '../util/common.js'
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

export const _setNotificationQuietHours = {
	name: "全局屏蔽某个时间段的消息提醒",
	params: [
		{ key: 'startTime', value: '12:23:00', type: 'string', name: '开始时间'},
		{ key: 'spanMinutes', value: 20, type: 'number', name: '屏蔽分钟数'},
	],
	action: function({startTime, spanMinutes}) {
		console.log('调用setNotificationQuietHours方法')
		setNotificationQuietHours(
			startTime,
			spanMinutes,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用setNotificationQuietHours',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getNotificationQuietHours = {
	name: "查询已设置的全局时间段消息提醒屏蔽",
	action: function() {
		console.log('调用getNotificationQuietHours方法')
		getNotificationQuietHours(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getNotificationQuietHours',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _removeNotificationQuietHours = {
	name: "删除已设置的全局时间段消息提醒屏蔽",
	action: function() {
		console.log('调用removeNotificationQuietHours方法')
		removeNotificationQuietHours(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用removeNotificationQuietHours',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getOfflineMessageDuration = {
	name: "获取离线消息在服务端的存储时间（以天为单位）",
	action: function() {
		console.log('调用getOfflineMessageDuration方法')
		getOfflineMessageDuration(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getOfflineMessageDuration',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _setOfflineMessageDuration = {
	name: "设置离线消息在服务端的存储时间",
	params: [	
		{ key: 'duration', value: 7, type: 'number', name: '存储时间'},
	],
	action: function({duration}) {
		console.log('调用setOfflineMessageDuration方法')
		setOfflineMessageDuration(
			duration,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用setOfflineMessageDuration',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getCurrentUserId = {
	name: "获取当前用户 ID",
	action: function() {
		console.log('调用getCurrentUserId方法')
		getCurrentUserId(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getCurrentUserId',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _setPushLanguageCode = {
	name: "设置推送语言",
	params: [
		{ key: 'language', value: 'en_US', type: 'string', name: '推送语言'},
	],
	action: function({language}) {
		console.log('调用setPushLanguageCode方法')
		setPushLanguageCode(
			language,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用setPushLanguageCode',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _setPushContentShowStatus = {
	name: "设置是否显示内容详情",
	params: [
		{ key: 'isShowPushContent', value: true, type: 'boolean', name: '是否显示内容详情'},
	],
	action: function({isShowPushContent}) {
		console.log('调用setPushContentShowStatus方法')
		setPushContentShowStatus(
			isShowPushContent,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用setPushContentShowStatus',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getPushContentShowStatus = {
	name: "查询是否显示内容详情",
	action: function() {
		console.log('调用getPushContentShowStatus方法')
		getPushContentShowStatus(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getPushContentShowStatus',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _setReconnectKickEnable = {
	name: "设置断线重连时是否踢出重连设备",
	params: [
		{ key: 'enabled', value: true, type: 'boolean'},
	],
	action: function({enabled}) {
		console.log('调用setReconnectKickEnable方法')
		setReconnectKickEnable(
			enabled
		)
		addPrimaryResult({
			title: 'setReconnectKickEnable成功'
		})
	}
}

export const _setPushConfig = {
	name: "设置推送配置(仅安卓)",
	params: [
		{ key: 'FCM', value: true, type: 'boolean'},
		{ key: 'HW', value: true, type: 'boolean'},
		{ key: 'VIVO', value: true, type: 'boolean'},
		{ key: 'MI_PUSH_APPID', value: 'MI_PUSH_APPID  content', type: 'string'},
		{ key: 'MI_PUSH_APPKEY', value: 'MI_PUSH_APPKEY  content', type: 'string'},
		{ key: 'MEIZU_PUSH_APPID', value: 'MEIZU_PUSH_APPID  content', type: 'string'},
		{ key: 'MEIZU_PUSH_APPKEY', value: 'MEIZU_PUSH_APPKEY  content', type: 'string'},
		{ key: 'OPPO_PUSH_APPID', value: 'OPPO_PUSH_APPID  content', type: 'string'},
		{ key: 'OPPO_PUSH_APPKEY', value: 'OPPO_PUSH_APPKEY  content', type: 'string'},
	],
	action: function({FCM, HW, VIVO, MI_PUSH_APPID, MI_PUSH_APPKEY, MEIZU_PUSH_APPID, MEIZU_PUSH_APPKEY, OPPO_PUSH_APPID, OPPO_PUSH_APPKEY}) {
		console.log('调用setPushConfig方法')
		const con = {
			FCM,
			HW,
			VIVO,
			MI: {
				MI_PUSH_APPID,
				MI_PUSH_APPKEY,
			},
			MEIZU: {
				MEIZU_PUSH_APPID,
				MEIZU_PUSH_APPKEY,
			},
			OPPO: {
				OPPO_PUSH_APPID,
				OPPO_PUSH_APPKEY
			}
		}
		setPushConfig(
			con
		)
		console.log(JSON.stringify(con))
		addPrimaryResult({
			title: 'setPushConfig'
		})
	}
}

