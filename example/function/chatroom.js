// 聊天室
import {
	joinChatRoom,
	joinExistChatRoom,
	quitChatRoom,
	getRemoteChatRoomHistoryMessages,
	getChatRoomInfo
} from "@/uni_modules/RongCloud-IMWrapper/js_sdk"
import {addSuccessResult, addErrorResult, addPrimaryResult} from '../util/common.js'
import config from '../config/config.js'
let baseConfig = uni.getStorageSync('testBaseConfig')


export const _joinChatRoom = {
	name: "加入聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'},
		{ key: 'messageCount', value: 10, type: 'number', name: '获取的消息数量'},
	],
	action: function({targetId, messageCount}) {
		console.log('调用joinChatRoom方法')
		joinChatRoom(
			targetId,
			messageCount,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用joinChatRoom',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _joinExistChatRoom = {
	name: "加入已存在聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'},
		{ key: 'messageCount', value: 10, type: 'number', name: '获取的消息数量'},
	],
	action: function({targetId, messageCount}) {
		console.log('调用joinExistChatRoom方法')
		joinExistChatRoom(
			targetId,
			messageCount,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用joinExistChatRoom',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _quitChatRoom = {
	name: "退出聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'}
	],
	action: function({targetId}) {
		console.log('调用quitChatRoom方法')
		quitChatRoom(
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用quitChatRoom成功',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getRemoteChatRoomHistoryMessages = {
	name: "从服务器端获取聊天室的历史消息",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'},
		{ key: 'recordTime', value: Date.now(), type: 'number', name: '起始的消息发送时间戳'},
		{ key: 'count', value: 10, type: 'number', name: '要获取的消息数量'},
		{ key: 'order', value: 0, type: 'number', name: '拉取顺序'},
	],
	action: function({targetId, recordTime, count, order}) {
		console.log('调用getRemoteChatRoomHistoryMessages方法')
		getRemoteChatRoomHistoryMessages(
			targetId,
			recordTime,
			count,
			order,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getRemoteChatRoomHistoryMessages',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getChatRoomInfo = {
	name: "获取聊天室信息",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'},
		{ key: 'memberCount', value: 20, type: 'number', name: '起始的消息发送时间戳'},
		{ key: 'order', value: 0, type: 'number', name: '拉取顺序'},
	],
	action: function({targetId, memberCount, order}) {
		console.log('调用getChatRoomInfo方法')
		getChatRoomInfo(
			targetId,
			memberCount,
			order,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getChatRoomInfo成功',
					data: res,
					code: res.code
				})
			}
		)
	}
}
