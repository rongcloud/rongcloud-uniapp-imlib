// 消息接口
import {
	MentionedType,
	sendMessage,
	sendMediaMessage,
	sendDirectionalMessage,
	recallMessage,
	sendTypingStatus,
	setMessageSentStatus,
	setMessageReceivedStatus,
	sendReadReceiptMessage,
	sendReadReceiptRequest,
	addReadReceiptReceivedListener,
	addReceiptRequestListener,
	addReceiptResponseListener,
	cancelSendMediaMessage,
	cancelDownloadMediaMessage,
	getHistoryMessages,
	getHistoryMessagesByTimestamp,
	insertOutgoingMessage,
	insertIncomingMessage,
	clearMessages,
	deleteMessages,
	deleteMessagesByIds,
	searchMessages,
	getMessage,
	getMessageByUId,
	setMessageExtra,
	getMessageSendTime,
	getMessageCount,
	getFirstUnreadMessage,
	getUnreadMentionedMessages,
	getRemoteHistoryMessages,
	cleanRemoteHistoryMessages,
	cleanHistoryMessages
} from "../../dist"
import {addSuccessResult, addErrorResult, addPrimaryResult} from '../util/common.js'
import config from '../config/config.js'
import _global from '../config/global.js'


export const _sendMessage = {
	name: "发送消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
		{ key: 'content', value: 'content info', type: 'string', name: '消息内容'},
		{ key: 'extra', value: 'extra info', type: 'string'},
		{ key: 'pushContent', value: '推送内容', type: 'string'},
		{ key: 'pushData', value: 'pushData', type: 'string'},
		{ key: 'mentionedType', value: 0, type: 'number', name: '提醒（@）类型，1：所有，2：部分，0：不提醒'},
		{ key: 'userIdList', value: 'user002', type: 'string', name: '提醒用户，多个以,隔开'},
		{ key: 'mentionedContent', value: 'mentionedContent info', type: 'string', name: '提醒内容'},
	],
	action: function({
		conversationType,
		targetId,
		objectName,
		content,
		extra,
		pushContent,
		pushData,
		mentionedType,
		userIdList,
		mentionedContent
	}) {
		userIdList = userIdList.split(',')
		const msg = {
			conversationType: conversationType,
			targetId: targetId,
			content: {
				objectName: objectName,
				userInfo: {
					userId: 'testUserId',
					name: 'name',
					portraitUrl: '',
				},
				content: content,
				extra: extra
			},
			pushContent: pushContent,
			pushData: pushData,
			
		}
		if (mentionedType !== 0) {
			msg.content.mentionedInfo = {
				type: mentionedType,
				userIdList: userIdList,
				mentionedContent: mentionedContent,
			}
		}
		console.log('调用sendMessage方法', JSON.stringify(msg))
		sendMessage(
			msg,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'sendMessage',
					code: res.code,
					data: res
				})
			}
		)
	}
}

export const _sendMediaMessage = {
	name: "发送媒体消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
	],
	action: function({conversationType, targetId}) {
		console.log('调用sendMediaMessage方法')
		// uni.chooseImage({
		// 	count: 1,
		// 	success: (list) => {
		// 		consolt.log(list)
		// 	}
		// })
		sendMediaMessage(
			{
				conversationType: config.conversationType,
				targetId: config.targetId,
				content: {
					objectName: 'RC:ImgMsg',
					local: 'local url',
				}
			},
			{
				success: (messageId) => {
					addSuccessResult({
						title: 'sendMediaMessage success',
						code: messageId,
						data: messageId
					})
				},
				  progress: (progress, messageId) => {
					  addPrimaryResult({
					  	title: 'sendMediaMessage progress ',
					  	code: progress,
					  	data: {messageId, progress}
					  })
				  },
				  cancel: (messageId) => {
					  addPrimaryResult({
					  	title: 'sendMediaMessage cancel',
					  	data: messageId
					  })
				  },
				  error: (errorCode, messageId) => {
					  addErrorResult({
					  	title: 'sendMediaMessage error',
					  	data: {messageId, errorCode}
					  })
				  }
			}
		)
	}
}

export const _sendDirectionalMessage = {
	name: "发送定向消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
		{ key: 'content', value: 'content info', type: 'string', name: '消息内容'},
		{ key: 'userIdList', value: 'user002', type: 'string', name: 'userIds'},
	],
	action: function({conversationType, targetId, objectName, content, userIdList}) {
		const msg = {
			conversationType: conversationType,
			targetId: targetId,
			content: {
				objectName: objectName,
				content: content,
			}
		};
		console.log('调用sendDirectionalMessage方法', JSON.stringify(msg), userIdList)
		sendDirectionalMessage(
			msg,
			userIdList.split(','),
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'sendDirectionalMessage',
					code: res.code,
					data: res
				})
			}
		)
	}
}

export const _recallMessage = {
	name: "消息撤回",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息ID'},
		{ key: 'pushContent', value: 'recall a message', type: 'string', name: '推送内容'},
	],
	action: function({messageId, pushContent}) {
		console.log('调用recallMessage方法')
		recallMessage(
			messageId,
			pushContent,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'recallMessage',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _sendTypingStatus = {
	name: "发送输入状态",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
	],
	action: function({conversationType, targetId, objectName}) {
		console.log('调用sendTypingStatus方法')
		sendTypingStatus(
			conversationType,
			targetId,
			objectName
		)
		addPrimaryResult({
			title: 'sendTypingStatus',
			code: res,
			data: res
		})
	}
}

export const _setMessageSentStatus = {
	name: "设置消息发送状态",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
		{ key: 'status', value: 10, type: 'number', name: '消息状态'},
	],
	action: function({messageId, status}) {
		console.log('调用setMessageSentStatus方法')
		setMessageSentStatus(
			messageId,
			status,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'setMessageSentStatus',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _setMessageReceivedStatus = {
	name: "设置消息接收状态",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
		{ key: 'status', value: 10, type: 'number', name: '消息状态'},
	],
	action: function({messageId, status}) {
		console.log('调用setMessageReceivedStatus方法')
		setMessageReceivedStatus(
			messageId,
			status,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'setMessageReceivedStatus',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _sendReadReceiptMessage = {
	name: "发送阅读回执",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'timestamp', value: Date.now(), type: 'number'},
	],
	action: function({conversationType, targetId, timestamp}) {
		console.log('调用sendReadReceiptMessage方法')
		const res = sendReadReceiptMessage(
			conversationType,
			targetId,
			timestamp
		)
		console.log(JSON.stringify(res))
		addPrimaryResult({
			title: 'sendReadReceiptMessage',
			code: res,
			data: res
		})
	}
}

export const _sendReadReceiptRequest = {
	name: "发起群组消息回执请求",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
	],
	action: function({messageId}) {
		console.log('调用sendReadReceiptRequest方法')
		const res = sendReadReceiptRequest(
			messageId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'sendReadReceiptRequest',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _sendReadReceiptResponse = {
	name: "发起群组消息回执响应",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'messages', value: _global.lastReceivedMsg, type: 'string', name: '消息，多个以,隔开'},
	],
	action: function({conversationType, targetId, messages}) {
		console.log('调用sendReadReceiptResponse方法')
		sendReadReceiptResponse(
			conversationType,
			targetId,
			messages.split(','),
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'sendReadReceiptResponse',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _addReadReceiptReceivedListener = {
	name: "添加私聊阅读回执监听函数",
	action: function() {
		console.log('调用addReadReceiptReceivedListener方法')
		addReadReceiptReceivedListener(
			(res) => {
				console.log('received ReadReceiptReceivedListener')
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'addReadReceiptReceivedListener',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _addReceiptRequestListener = {
	name: "添加收到消息已读回执请求监听函数",
	action: function() {
		console.log('调用addReceiptRequestListener方法')
		addReceiptRequestListener(
			(res) => {
				console.log('received addReceiptRequestListener')
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'addReceiptRequestListener',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _addReceiptResponseListener = {
	name: "添加消息回执响应监听函数",
	action: function() {
		console.log('调用addReceiptResponseListener方法')
		addReceiptResponseListener(
			(res) => {
				console.log('received addReceiptResponseListener')
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'addReceiptResponseListener',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _cancelSendMediaMessage = {
	name: "取消发送中的媒体消息",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
	],
	action: function({messageId}) {
		console.log('调用cancelSendMediaMessage方法')
		cancelSendMediaMessage(
			messageId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'cancelSendMediaMessage',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _cancelDownloadMediaMessage = {
	name: "取消下载中的媒体消息",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
	],
	action: function({messageId}) {
		console.log('调用cancelDownloadMediaMessage方法')
		cancelDownloadMediaMessage(
			messageId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'cancelDownloadMediaMessage',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _downloadMediaMessage = {
	name: "下载媒体消息",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息id'},
	],
	action: function({messageId}) {
		console.log('调用downloadMediaMessage方法')
		downloadMediaMessage(
			messageId,
			{
				success: (messageId) => {
					addSuccessResult({
						title: 'sendMediaMessage success',
						code: messageId,
						data: messageId
					})
				},
				  progress: (progress, messageId) => {
					  addPrimaryResult({
					  	title: 'sendMediaMessage progress ',
					  	code: progress,
					  	data: {messageId, progress}
					  })
				  },
				  cancel: (messageId) => {
					  addPrimaryResult({
					  	title: 'sendMediaMessage cancel',
					  	data: messageId
					  })
				  },
				  error: (errorCode, messageId) => {
					  addErrorResult({
					  	title: 'sendMediaMessage error',
					  	data: {messageId, errorCode}
					  })
				  }
			}
		)
		
	}
}

export const _getHistoryMessages = {
	name: "获取历史消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
		{ key: 'baseMessageId', value: _global.lastReceivedMsg, type: 'number', name: '最近一条消息的 ID'},
		{ key: 'count', value: 10, type: 'number', name: '数量'},
		{ key: 'isForward', value: true, type: 'boolean', name: '是否向前获取'},
	],
	action: function({conversationType, targetId, objectName, baseMessageId, count, isForward}) {
		console.log('调用getHistoryMessages方法')
		getHistoryMessages(
			conversationType, targetId, objectName, baseMessageId, count, isForward,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getHistoryMessages',
					code: res,
					data: res
				})
			}
		)
		
	}
}

export const _getHistoryMessagesByTimestamp = {
	name: "通过时间戳获取历史消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string', name: '消息类型，多个以,隔开'},
		{ key: 'timestamp', value: Date.now(), type: 'number', name: '时间戳'},
		{ key: 'count', value: 10, type: 'number', name: '数量'},
		{ key: 'isForward', value: true, type: 'boolean', name: '是否向前获取'},
	],
	action: function({conversationType, targetId, objectName, baseMessageId, count, isForward}) {
		console.log('调用getHistoryMessagesByTimestamp方法')
		objectName = objectName.split(',')
		getHistoryMessagesByTimestamp(
			conversationType, targetId, objectName, baseMessageId, count, isForward,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getHistoryMessagesByTimestamp',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _insertOutgoingMessage = {
	name: "向本地会话插入一条发送消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'sentStatus', value: 10, type: 'number'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
		{ key: 'content', value: 'text content', type: 'string', name: '消息内容'},
		{ key: 'extra', value: 'extra info', type: 'string', name: 'extra'},
		{ key: 'sentTime', value: Date.now(), type: 'number', name: '发送时间'},
	],
	action: function({conversationType, targetId, sentStatus, objectName, content, extra, sentTime}) {
		console.log('调用insertOutgoingMessage方法', JSON.stringify(arguments))
		insertOutgoingMessage(
			conversationType,
			targetId,
			sentStatus,
			{
				objectName: objectName,
				content: content,
				extra: extra
			},
			sentTime,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'insertOutgoingMessage',
					code: res.code,
					data: res
				})
			}
		)
	}
}

export const _insertIncomingMessage = {
	name: "向本地会话插入一条接收消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'status', value: 50, type: 'number'},
		{ key: 'objectName', value: 'RC:TxtMsg', type: 'string'},
		{ key: 'content', value: 'text content', type: 'string', name: '消息内容'},
		{ key: 'extra', value: 'extra info', type: 'string', name: 'extra'},
		{ key: 'sentTime', value: Date.now(), type: 'number', name: '发送时间'},
	],
	action: function({conversationType, targetId, status, objectName, content, extra, sentTime}) {
		console.log(111)
		console.log('调用insertIncomingMessage方法', JSON.stringify(arguments))
		insertIncomingMessage(
			conversationType,
			targetId,
			status,
			{
				objectName: objectName,
				content: content,
				extra: extra
			},
			sentTime,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'insertIncomingMessage',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _clearMessages = {
	name: "清空某一会话的所有消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
	],
	action: function({conversationType, targetId}) {
		console.log('调用clearMessages方法')
		clearMessages(
			conversationType,
			targetId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'clearMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _deleteMessages = {
	name: "根据会话删除消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
	],
	action: function({conversationType, targetId}) {
		console.log('调用deleteMessages方法')
		deleteMessages(
			conversationType,
			targetId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'deleteMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _deleteMessagesByIds = {
	name: "根据消息 ID 删除消息",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息Id，多个以,隔开'},
	],
	action: function({messageId}) {
		console.log('调用deleteMessagesByIds方法')
		deleteMessagesByIds(
			messageId.split(','),
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'deleteMessagesByIds',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _searchMessages = {
	name: "搜索消息",
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetId, type: 'string', name: '会话id'},
		{ key: 'keyword', value: 'con', type: 'string', name: '关键词'},
		{ key: 'count', value:10, type: 'number', name: '数量'},
		{ key: 'startTime', value: 0, type: 'number'},
	],
	action: function({conversationType, targetId, keyword,count, startTime}) {
		console.log('调用searchMessages方法')
		searchMessages(
			conversationType,
			targetId,
			keyword,
			count,
			startTime,
			_global.lastSendMsg,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'searchMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getMessage = {
	name: "获取消息",
	params: [
		{ key: 'messageId', value: _global.lastSendMsg, type: 'number', name: '消息Id'},
	],
	action: function({messageId}) {
		console.log('调用getMessage方法')
		getMessage(
			messageId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getMessage',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getMessageByUId = {
	name: "根据消息 UID 获取消息",
	params: [
		{ key: 'messageUId', value: _global.lastSendMsgUId, type: 'string', name: '消息UId'},
	],
	action: function({messageUId}) {
		console.log('调用getMessageByUId方法')
		getMessageByUId(
			messageUId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getMessageByUId',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _setMessageExtra = {
	name: "设置消息的附加信息",
	action: function() {
		console.log('调用setMessageExtra方法')
		setMessageExtra(
			_global.lastSendMsg,
			'extra info',
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'setMessageExtra',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getMessageSendTime = {
	name: "获取消息发送时间",
	action: function() {
		console.log('调用getMessageSendTime方法')
		getMessageSendTime(
			_global.lastSendMsg,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getMessageSendTime',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getMessageCount = {
	name: "获取会话中的消息数量",
	action: function() {
		console.log('调用getMessageCount方法')
		getMessageCount(
			config.conversationType,
			config.targetId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getMessageCount',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getFirstUnreadMessage = {
	name: "获取会话里第一条未读消息",
	action: function() {
		console.log('调用getFirstUnreadMessage方法')
		getFirstUnreadMessage(
			config.conversationType,
			config.targetId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getFirstUnreadMessage',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getUnreadMentionedMessages = {
	name: "获取会话中 @ 提醒自己的消息",
	action: function() {
		console.log('调用getUnreadMentionedMessages方法')
		getUnreadMentionedMessages(
			config.conversationType,
			config.targetId,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getUnreadMentionedMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _getRemoteHistoryMessages = {
	name: "获取服务端历史消息",
	action: function() {
		console.log('调用getRemoteHistoryMessages方法')
		getRemoteHistoryMessages(
			config.conversationType,
			config.targetId,
			0,
			10,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'getRemoteHistoryMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _cleanRemoteHistoryMessages = {
	name: "清除服务端历史消息",
	action: function() {
		console.log('调用cleanRemoteHistoryMessages方法')
		cleanRemoteHistoryMessages(
			config.conversationType,
			config.targetId,
			0,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'cleanRemoteHistoryMessages',
					code: res,
					data: res
				})
			}
		)
	}
}

export const _cleanHistoryMessages = {
	name: "清除历史消息",
	action: function() {
		console.log('调用cleanHistoryMessages方法')
		cleanHistoryMessages(
			config.conversationType,
			config.targetId,
			0,
			true,
			(res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: 'cleanHistoryMessages',
					code: res,
					data: res
				})
			}
		)
	}
}


