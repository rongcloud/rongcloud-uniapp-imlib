// 会话接口
import {
	ConversationType,
	ObjectName,
	getConversationList,
	syncConversationReadStatus,
	getBlockedConversationList,
	searchConversations,
	getConversation,
	removeConversation,
	setConversationNotificationStatus,
	getConversationNotificationStatus,
	setConversationToTop,
	getTopConversationList,
	saveTextMessageDraft,
	getTextMessageDraft,
	clearTextMessageDraft,
	getTotalUnreadCount,
	getUnreadCount,
	clearMessagesUnreadStatus,
	addToBlacklist,
	removeFromBlacklist,
	getBlacklistStatus,
	getBlacklist,
} from "@rongcloud/imlib-uni"
import {addSuccessResult, addErrorResult, addPrimaryResult} from '../util/common.js'
import config from '../config/config.js'

export const _GetConversationList = {
	name: "获取会话列表",
	params: [
		{ key: 'conversationTypes', value: '1,3', type: 'string', name: '会话类型(多个以英文","隔开)'},
		{ key: 'count', value: 20, type: 'number', name: '数量'},
		{ key: 'timestamp', value: 0, type: 'number'},
	],
	action: function({conversationTypes, count, timestamp}) {
		console.log('调用获取会话列表方法')
		conversationTypes = conversationTypes.split(',').map(i => parseInt(i))
		getConversationList(conversationTypes, count, timestamp, (res) => {
			if (res.code === 0 && res.conversations.length > 0) {
				config.targetIdList = res.conversations.map(i => {
					return {
						label: i.targetId,
						value: i.targetId,
					}
				})
			} 
			addPrimaryResult({
				title: '获取会话列表 ',
				data: res,
				code: res.code
			})
		})
	}
}

export const _SyncConversationReadStatus = {
	name: "同步会话阅读状态",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
		{ key: 'timestamp', value: Date.now(), type: 'number'},
	],
	action: function({conversationType, targetId, timestamp}) {
		console.log('调用同步会话阅读状态方法')
		syncConversationReadStatus(conversationType, targetId, timestamp,(res) => {
			addPrimaryResult({
				title: '同步会话阅读状态',
				data: res,
				code: res.code
			})
		})
	}
}

export const _getBlockedConversationList = {
	name: "获取屏蔽消息提醒的会话列表",
	params: [
		{ key: 'conversationTypes', value: '1,3', type: 'string', name: '会话类型(多个以英文","隔开)'},
		
	],
	action: function({conversationTypes}) {
		console.log('调用getBlockedConversationList方法')
		conversationTypes = conversationTypes.split(',').map(i => parseInt(i))
		console.log(conversationTypes)
		getBlockedConversationList(conversationTypes, (res) => {
			console.log(JSON.stringify(res))
			addPrimaryResult({
				title: '调用getBlockedConversationList',
				data: res,
				code: res.code
			})
		})
	}
}

export const _searchConversations = {
	name: "根据关键字搜索会话",
	params: [
		{ key: 'key', value: 'user', type: 'string', name: '关键字'},
		{ key: 'conversationTypes', value: '1,3', type: 'string', name: '会话类型(多个以英文","隔开)'},
		{ key: 'objectName', value: ObjectName.Text, type: 'string', name: 'objectName(多个以英文","隔开)'},
	],
	action: function({key, conversationTypes, objectName}) {
		console.log('调用searchConversations方法', JSON.stringify(arguments))
		conversationTypes = conversationTypes.split(',').map(i => parseInt(i))
		searchConversations(
			key,
			conversationTypes,
			objectName.split(','),
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用searchConversations',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getConversation = {
	name: "获取会话",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用getConversation方法')
		getConversation(
			conversationType, 
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getConversation',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _removeConversation = {
	name: "删除会话",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用removeConversation方法')
		removeConversation(
			conversationType, 
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用removeConversation',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _setConversationNotificationStatus = {
	name: "设置会话免打扰状态",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
		{ key: 'isBlock', value: true, type: 'boolean', name: '是否屏蔽'},
	],
	action: function({conversationType, targetId, isBlock}) {
		console.log('调用setConversationNotificationStatus方法', JSON.stringify(arguments))
		setConversationNotificationStatus(
			conversationType, 
			targetId,
			isBlock,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用设置会话免打扰状态',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getConversationNotificationStatus = {
	name: "获取会话免打扰状态",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用getConversationNotificationStatus方法')
		getConversationNotificationStatus(
			conversationType, 
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用获取会话免打扰状态',
					data: res,
					code: res.code
				})
			}
		)
	}
}


export const _setConversationToTop = {
	name: "设置会话置顶状态",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
		{ key: 'isTop', value: true, type: 'boolean', name: '是否置顶'},
	],
	action: function({conversationType, targetId, isTop}) {
		console.log('调用setConversationToTop方法')
		setConversationToTop(
			conversationType, 
			targetId,
			isTop,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用setConversationToTop',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getTopConversationList = {
	name: "获取置顶会话列表",
	params: [
		{ key: 'conversationTypes', value: '1,3', type: 'string', name: '会话类型(多个以,分割)'}
	],
	action: function({conversationTypes}) {
		console.log('调用getTopConversationList方法')
		conversationTypes = conversationTypes.split(',').map(i => parseInt(i))
		console.log(conversationTypes)
		getTopConversationList(
			conversationTypes,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getTopConversationList',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _saveTextMessageDraft = {
	name: "保存某一会话的文本消息草稿",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
		{ key: 'content', value: 'content info', type: 'string', name: '内容'},
	],
	action: function({conversationType, targetId, content}) {
		console.log('调用saveTextMessageDraft方法')
		saveTextMessageDraft(
			conversationType,
			targetId,
			content,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用saveTextMessageDraft',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getTextMessageDraft = {
	name: "获取某一会话的文本消息草稿",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用getTextMessageDraft方法')
		getTextMessageDraft(
			conversationType,
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getTextMessageDraft',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _clearTextMessageDraft = {
	name: "清除某一会话的文本消息草稿",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用clearTextMessageDraft方法')
		clearTextMessageDraft(
			conversationType,
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用clearTextMessageDraft ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getTotalUnreadCount = {
	name: "获取所有未读消息数",
	action: function() {
		console.log('调用getTotalUnreadCount方法')
		getTotalUnreadCount(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getTotalUnreadCount ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getUnreadCount = {
	name: "获取指定会话的未读消息数",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
	],
	action: function({conversationType, targetId}) {
		console.log('调用getUnreadCount方法')
		getUnreadCount(
			conversationType,
			targetId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getUnreadCount ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _clearMessagesUnreadStatus = {
	name: "清除某个会话中的未读消息数",
	before: function() {
		this.params[1].list = config.targetIdList
		this.params[1].value = config.targetIdList[0].value
	},
	params: [
		{ key: 'conversationType', value: config.conversationType, type: 'number', name: '会话类型'},
		{ key: 'targetId', value: config.targetIdList[0].value, valueIndex: 0, type: 'picker', name: '会话id', list: config.targetIdList},
		{ key: 'time', value: Date.now(), type: 'number', name: '时间戳'},
	],
	action: function({conversationType, targetId, time}) {
		console.log('调用clearMessagesUnreadStatus方法')
		clearMessagesUnreadStatus(
			conversationType,
			targetId,
			time,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用clearMessagesUnreadStatus ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _addToBlacklist = {
	name: "把用户加入黑名单",
	params: [
		{ key: 'userId', value: config.targetId, type: 'string', name: '用户ID'}
	],
	action: function({userId}) {
		console.log('调用addToBlacklist方法')
		addToBlacklist(
			userId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用addToBlacklist ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _removeFromBlacklist = {
	name: "把用户从黑名单中移除",
	params: [
		{ key: 'userId', value: config.targetId, type: 'string', name: '用户ID'}
	],
	action: function({userId}) {
		console.log('调用removeFromBlacklist方法')
		removeFromBlacklist(
			userId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用removeFromBlacklist ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getBlacklistStatus = {
	name: "获取某用户是否在黑名单中",
	params: [
		{ key: 'userId', value: config.targetId, type: 'string', name: '用户ID'}
	],
	action: function({userId}) {
		console.log('调用getBlacklistStatus方法')
		getBlacklistStatus(
			userId,
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getBlacklistStatus ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

export const _getBlacklist = {
	name: "获取黑名单列表",
	action: function() {
		console.log('调用getBlacklist方法')
		getBlacklist(
			 (res) => {
				console.log(JSON.stringify(res))
				addPrimaryResult({
					title: '调用getBlacklist ',
					data: res,
					code: res.code
				})
			}
		)
	}
}

