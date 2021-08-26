// 聊天室
import {
	joinChatRoom,
	joinExistChatRoom,
	quitChatRoom,
	getRemoteChatRoomHistoryMessages,
	getChatRoomInfo
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


export const _joinChatRoom = {
	name: "加入聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'number', name: '用户ID'},
		{ key: 'messageCount', value: 10, type: 'number', name: '获取的消息数量'},
	],
	action: function({targetId, messageCount}) {
		console.log('调用joinChatRoom方法')
		joinChatRoom(
			targetId,
			messageCount,
			 (res) => {
				console.log(JSON.stringify(res))
				addSuccessResult({
					title: '调用joinChatRoom成功',
					data: res
				})
			}
		)
	}
}

export const _joinExistChatRoom = {
	name: "加入聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'number', name: '用户ID'},
		{ key: 'messageCount', value: 10, type: 'number', name: '获取的消息数量'},
	],
	action: function({targetId, messageCount}) {
		console.log('调用joinExistChatRoom方法')
		joinExistChatRoom(
			targetId,
			messageCount,
			 (res) => {
				console.log(JSON.stringify(res))
				addSuccessResult({
					title: '调用joinExistChatRoom成功',
					data: res
				})
			}
		)
	}
}

export const _quitChatRoom = {
	name: "加入聊天室",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'number', name: '用户ID'}
	],
	action: function({targetId}) {
		console.log('调用quitChatRoom方法')
		quitChatRoom(
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addSuccessResult({
					title: '调用quitChatRoom成功',
					data: res
				})
			}
		)
	}
}

export const _getRemoteChatRoomHistoryMessages = {
	name: "从服务器端获取聊天室的历史消息",
	params: [
		{ key: 'targetId', value: config.targetId, type: 'string', name: '用户ID'},
		{ key: 'recordTime', value: 0, type: 'number', name: '起始的消息发送时间戳'},
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
				addSuccessResult({
					title: '调用getRemoteChatRoomHistoryMessages成功',
					data: res
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
				addSuccessResult({
					title: '调用getChatRoomInfo成功',
					data: res
				})
			}
		)
	}
}
