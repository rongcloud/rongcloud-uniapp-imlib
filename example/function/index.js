
import { _Init,
  _Connect, 
  _Disconnect, 
  _SetDeviceToken, 
  _SetServerInfo,
  _setStatisticServer,
  _getConnectionStatus
 } from "./base.js"
import { 
  _GetConversationList,
  _SyncConversationReadStatus,
  _getBlockedConversationList,
  _searchConversations,
  _getConversation,
  _removeConversation,
  _setConversationNotificationStatus,
  _getConversationNotificationStatus,
  _setConversationToTop,
  _getTopConversationList,
  _saveTextMessageDraft,
  _getTextMessageDraft,
  _clearTextMessageDraft,
  _getTotalUnreadCount,
  _getUnreadCount,
  _clearMessagesUnreadStatus,
  _addToBlacklist,
  _removeFromBlacklist,
  _getBlacklistStatus,
  _getBlacklist,
 } from './conversation.js'
import {
	_sendMessage,
	_sendMediaMessage,
	_sendDirectionalMessage,
	_recallMessage,
	_sendTypingStatus,
	_setMessageSentStatus,
	_setMessageReceivedStatus,
	_sendReadReceiptMessage,
	_sendReadReceiptRequest,
	_addReadReceiptReceivedListener,
	_addReceiptRequestListener,
	_addReceiptResponseListener,
	_cancelSendMediaMessage,
	_cancelDownloadMediaMessage,
	_getHistoryMessages,
	_getHistoryMessagesByTimestamp,
	_insertOutgoingMessage,
	_insertIncomingMessage,
	_clearMessages,
	_deleteMessages,
	_deleteMessagesByIds,
	_getMessage,
	_getMessageByUId,
	_setMessageExtra,
	_getMessageSendTime,
	_getMessageCount,
	_getFirstUnreadMessage,
	_getUnreadMentionedMessages,
	_getRemoteHistoryMessages,
	_cleanRemoteHistoryMessages,
	_cleanHistoryMessages
} from './message.js'
import {
	_joinChatRoom,
	_joinExistChatRoom,
	_quitChatRoom,
	_getRemoteChatRoomHistoryMessages,
	_getChatRoomInfo
} from './chatroom.js'
import {
	_setNotificationQuietHours,
	_getNotificationQuietHours,
	_removeNotificationQuietHours,
	_getOfflineMessageDuration,
	_setOfflineMessageDuration,
	_getCurrentUserId,
	_setPushLanguage,
	_setPushContentShowStatus,
	_getPushContentShowStatus,
	_setReconnectKickEnable,
	_setPushConfig
} from './other.js'

import { setTestConfig, clearTestConfig } from './testConfig.js'

export default [
	{
		title: '配置',
		list: [
			setTestConfig,
			clearTestConfig
		]
	},
	{
		title: '基础接口',
		list: [
			_Init,
			_Connect,
			_Disconnect,
			// _SetDeviceToken,
			_SetServerInfo,
			_getConnectionStatus
		]
	},
	{
		title: '会话接口',
		list: [
			_GetConversationList,
			_SyncConversationReadStatus,
			_getBlockedConversationList,
			_searchConversations,
			_getConversation,
			_removeConversation,
			_setConversationNotificationStatus,
			_getConversationNotificationStatus,
			_setConversationToTop,
			_getTopConversationList,
			_saveTextMessageDraft,
			_getTextMessageDraft,
			_clearTextMessageDraft,
			_getTotalUnreadCount,
			_getUnreadCount,
			_clearMessagesUnreadStatus,
			_addToBlacklist,
			_removeFromBlacklist,
			_getBlacklistStatus,
			_getBlacklist,
		]
	},
	{
		title: '消息接口',
		list: [
			_sendMessage,
			_sendMediaMessage,
			_sendDirectionalMessage,
			_recallMessage,
			_sendTypingStatus,
			_setMessageSentStatus,
			_setMessageReceivedStatus,
			_sendReadReceiptMessage,
			_sendReadReceiptRequest,
			_addReadReceiptReceivedListener,
			_addReceiptRequestListener,
			_addReceiptResponseListener,
			_cancelSendMediaMessage,
			_cancelDownloadMediaMessage,
			_getHistoryMessages,
			_getHistoryMessagesByTimestamp,
			_insertOutgoingMessage,
			_insertIncomingMessage,
			_clearMessages,
			_deleteMessages,
			_deleteMessagesByIds,
			_getMessage,
			_getMessageByUId,
			_setMessageExtra,
			_getMessageSendTime,
			_getMessageCount,
			_getFirstUnreadMessage,
			_getUnreadMentionedMessages,
			_getRemoteHistoryMessages,
			_cleanRemoteHistoryMessages,
			_cleanHistoryMessages
		]
	},
	{
		title: '聊天室',
		list: [
			_joinChatRoom,
			_joinExistChatRoom,
			_quitChatRoom,
			_getRemoteChatRoomHistoryMessages,
			_getChatRoomInfo
		]
	},
	{
		title: '其他',
		list: [
			_setNotificationQuietHours,
			_getNotificationQuietHours,
			_removeNotificationQuietHours,
			_getOfflineMessageDuration,
			_setOfflineMessageDuration,
			_getCurrentUserId,
			_setPushLanguage,
			_setPushContentShowStatus,
			_getPushContentShowStatus,
			_setReconnectKickEnable,
			_setPushConfig
		]
	}
]