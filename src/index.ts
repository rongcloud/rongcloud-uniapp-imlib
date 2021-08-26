
import {
  ConnectionStatus,
  ConversationType,
  ErrorCode,
  Message,
  ObjectName,
  PublicServiceType,
  RecallNotificationMessage,
  ReceiptRequest,
  ReceiveMessage,
  SentMessage,
  TypingStatus,
  ConnectErrorCode,
  Conversation,
  MessageContent,
  PublicServiceProfile,
  ReceiptResponse,
  SearchType,
  SentStatus,
  SearchConversationResult,
  TimestampOrder,
  ChatRoomMemberOrder,
  ChatRoomInfo,
  Discussion,
  RealTimeLocationStatus,
  CSConfig,
  CSMode,
  CSGroupItem,
  CSInfo,
  CSResolveStatus,
  CSLeaveMessageItem,
  PushLanguage,
  PushNotificationMessage,
  MessageObjectNames,
  ConnectResult,
  UniListenerResult,
  LogInfoResult,
  RecallMessageResult,
  ConnectionListenerResult,
  SendMessageResult,
  SendRecallMessageResult,
  BaseResult,
  MessageListResult,
  MessageResult,
  ConversationResult,
  ConversationListResult,
  statusResult,
  DraftResult,
  CountResult,
  ChatRoomInfoResult,
  PushConfig
} from './types'

const RCIMClient = uni.requireNativePlugin('RCUniIM')

export * from './types'

const eventEmitter: any = {}
/**
 * 初始化 SDK，只需要调用一次  //down
 *
 * @param appKey 从融云开发者平台创建应用后获取到的 App Key
 */
export function init (appKey: string) {
  RCIMClient.init(appKey)
}

/**
 * 连接融云服务器，只需要调用一次  //down
 *
 * 在 App 整个生命周期，您只需要调用一次此方法与融云服务器建立连接。
 * 之后无论是网络出现异常或者App有前后台的切换等，SDK都会负责自动重连。
 * 除非您已经手动将连接断开，否则您不需要自己再手动重连。
 *
 * @param token 从服务端获取的用户身份令牌（Token）
 */
 export function connect (
  token: string,
  callback: (result: ConnectResult) => void
) {
  RCIMClient.connect(token, callback)
}

/**
 * 断开与融云服务器的连接 //down
 *
 * @param isReceivePush 是否还接收推送
 */
 export function disconnect (isReceivePush = true) {
  RCIMClient.disconnect(isReceivePush)
}

/**
 * 添加连接状态监听函数  //down
 */
 export function addConnectionStatusListener (listener: (result: UniListenerResult<ConnectionListenerResult>) => void) {
  RCIMClient.addEventListener("rcimlib-connection-status", listener);
}

/**
 * 添加日志信息监听函数 //down
 *
 * @param listener
 */
export function addLogInfoListener (listener: (result: UniListenerResult<LogInfoResult>) => void) {
  RCIMClient.addEventListener('rcimlib-log', listener)
}

/**
 * 添加消息撤回监听函数  //down
 *
 * @param listener
 */
export function addRecallMessageListener (listener: (result: UniListenerResult<RecallMessageResult>) => void) {
  RCIMClient.addEventListener('rcimlib-recall', listener)
}

/**
 * 添加消息监听函数 //down
 */
 export function addReceiveMessageListener (listener: (result: UniListenerResult<ReceiveMessage>) => void) {
  RCIMClient.addEventListener('rcimlib-receive-message', listener)
}

/**
 * 添加输入状态监听函数  //down
 */
 export function addTypingStatusListener (listener: (result: UniListenerResult<TypingStatus>) => void) {
  RCIMClient.addEventListener('rcimlib-typing-status', listener)
}

/**
 * 添加推送消息到达监听函数
 *
 * @param listener
 */
// export function addPushArrivedListener (listener: (result: UniListenerResult<PushNotificationMessage>) => void) {
//   RCIMClient.addEventListener('rcimlib-push-arrived', listener)
// }

/**
 * 同步会话阅读状态 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已读的最后一条消息的发送时间戳，必须是有效的时间戳
 * @param callback 回调函数
 */
export function syncConversationReadStatus (
  conversationType: ConversationType,
  targetId: string,
  timestamp: number,
  callback: (result: BaseResult) => void
) {
  console.log(JSON.stringify(arguments))
  RCIMClient.syncConversationReadStatus(conversationType, targetId, timestamp, callback)
}

/**
 * 设置 deviceToken，用于远程推送
 * 
 * @param deviceToken 从系统获取到的设备号 deviceToken（需要去掉空格和尖括号）
 *
 *   deviceToken是系统提供的，从苹果服务器获取的，用于APNs远程推送必须使用的设备唯一值。
 *   您需要将 `-application:didRegisterForRemoteNotificationsWithDeviceToken:`
 *   获取到的deviceToken，转为NSString类型，并去掉其中的空格和尖括号，作为参数传入此方法。
 */
// export function setDeviceToken (deviceToken: string) {
//   RCIMClient.setDeviceToken(deviceToken)
// }

/**
 * 设置导航服务器和上传文件服务器信息，要在 [[init]] 前使用 //down
 *
 * @param naviServer 导航服务器地址
 * @param fileServer 文件服务器地址
 */
export function setServerInfo (naviServer: string, fileServer: string) {
  RCIMClient.setServerInfo(naviServer, fileServer)
}

/**
 * 设置统计服务地址 //down
 *
 * 配置数据上传地址 (非必须) 通过配置该地址，SDK
 * 会在初始化时把设备相关信息上传到私有云节点。
 * 影响到的功能是开发者后台的广播推送功能，如果私有云客户没有配置该地址，那从后台发推送时，客户端是收不到的。
 * 普通的 IM 推送不受影响。设置数据上传服务器地址。
 * 可以支持设置 http://cn.xxx.com 或者 https://cn.xxx.com 或者 cn.xxx.com
 * 如果设置成 cn.xxx.com，sdk 会组装成并仅支持 http:// 协议格式。
 *
 * @param server 服务地址
 */
export function setStatisticServer (server: string) {
  RCIMClient.setStatisticServer(server)
}

/**
 * 获取当前连接状态  //down
 */
export function getConnectionStatus (callback: (result: {status: ConnectionStatus}) => {}) {
  RCIMClient.getConnectionStatus(callback)
}

/**
 * 发送消息回调
 */
export interface SentMessageCallback {
  success?: (messageId: number) => void;
  progress?: (progress: number, messageId: number) => void;
  cancel?: (messageId: number) => void;
  error?: (errorCode: ErrorCode, messageId: number) => void;
}

function handleSendMessageCallback (callback: SentMessageCallback): string {
  const eventId = Math.random().toString()
  if (callback) {
    const listener = RCIMClient.addEventListener('rcimlib-send-message', (data: any) => {
      console.log('媒体消息回调', data.eventId, eventId)
      if (data.eventId === eventId) {
        const { success, error, cancel, progress } = callback
        if (data.type === 'success') {
          success && success(data.messageId)
          listener.remove()
        } else if (data.type === 'error') {
          error && error(data.errorCode, data.messageId)
          listener.remove()
        } else if (data.type === 'cancel') {
          cancel && cancel(data.messageId)
          listener.remove()
        } else if (data.type === 'progress') {
          progress && progress(data.progress, data.messageId)
        }
      }
    })
  }
  return eventId
}
/**
 * 发送消息   //down
 *
 * @param message 消息
 * @param callback 回调
 */
export function sendMessage (message: SentMessage, callback: (result: SendMessageResult) => {}) {
  message.content = handleMessageContent(message.content)
  RCIMClient.sendMessage(message, callback)
}

/**
 * 发送媒体消息  // down
 *
 * @param message 消息
 * @param callback 回调
 */
export function sendMediaMessage (message: SentMessage, callback: SentMessageCallback = {}) {
  message.content = handleMessageContent(message.content)
  RCIMClient.sendMediaMessage(message, handleSendMessageCallback(callback))
}

/**
 * 发送定向消息  //down
 *
 * @param message 消息
 * @param userIdList 用户 ID 列表
 * @param callback 回调
 */
export function sendDirectionalMessage (
  message: SentMessage,
  userIdList: string[],
  callback: (result: SendMessageResult) => {}
) {
  RCIMClient.sendDirectionalMessage(message, userIdList, callback)
}

/**
 * 消息撤回  //down
 *
 * @param messageId 消息 ID
 * @param pushContent 推送内容
 */
export function recallMessage (
  messageId: number,
  pushContent = '',
  callback: (message: SendRecallMessageResult) => void
) {
  RCIMClient.recallMessage(messageId, pushContent, callback)
}

/**
 * 发送输入状态  //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param typingContentType 输入内容类型
 */
export function sendTypingStatus (
  conversationType: ConversationType,
  targetId: string,
  typingContentType: ObjectName
) {
  RCIMClient.sendTypingStatus(conversationType, targetId, typingContentType)
}

/**
 * 设置消息发送状态  //down
 *
 * @param messageId 消息 ID
 * @param status 状态
 */
export function setMessageSentStatus (messageId: number, status: SentStatus, callback: (result: {code: number}) => {}) {
  return RCIMClient.setMessageSentStatus(messageId, status, callback)
}

/**
 * 设置消息接收状态  //down
 *
 * @param messageId 消息 ID
 * @param status 状态
 */
export function setMessageReceivedStatus (messageId: number, status: number, callback: (result: {code: number}) => {}) {
  return RCIMClient.setMessageReceivedStatus(messageId, status, callback)
}

/**
 * 获取屏蔽消息提醒的会话列表 //down
 *
 * @param conversationTypeList 消息类型列表会话类型
 * @param callback 回调函数
 */
export function getBlockedConversationList (
  conversationTypeList: ConversationType[],
  callback: (result: ConversationListResult) => void
) {
  RCIMClient.getBlockedConversationList(conversationTypeList, callback)
}

/**
 * 发送阅读回执 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已阅读点最后一条消息的发送时间戳
 */
export function sendReadReceiptMessage (
  conversationType: ConversationType,
  targetId: string,
  timestamp: number
) {
  RCIMClient.sendReadReceiptMessage(conversationType, targetId, timestamp)
}

/**
 * 发起群组消息回执请求 //down
 *
 * @param messageId 消息 ID
 */
export function sendReadReceiptRequest (messageId: number, callback: (result: BaseResult) => void) {
  RCIMClient.sendReadReceiptRequest(messageId, callback)
}

/**
 * 发起群组消息回执响应 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param messages 回执的消息列表
 * @param callback 回调函数
 */
export function sendReadReceiptResponse (
  conversationType: ConversationType,
  targetId: string,
  messages: Message[],
  callback: (result: BaseResult) => void
) {
  RCIMClient.sendReadReceiptResponse(conversationType, targetId, messages, callback)
}

/**
 * 添加私聊阅读回执监听函数
 */
export function addReadReceiptReceivedListener (listener: (message: UniListenerResult<{message: Message}>) => void) {
  RCIMClient.addEventListener('rcimlib-read-receipt-received', listener)
}

/**
 * 添加收到消息已读回执请求监听函数 //down
 *
 * 收到此请求后，如果用户阅读了对应的消息，需要调用
 * sendMessageReadReceiptResponse 接口发送已读响应
 */
export function addReceiptRequestListener (listener: (data: UniListenerResult<ReceiptRequest>) => void) {
  RCIMClient.addEventListener('rcimlib-receipt-request', listener)
}

/**
 * 添加消息回执响应监听函数 //down
 *
 * @param listener
 */
export function addReceiptResponseListener (listener: (data: UniListenerResult<ReceiptResponse>) => void) {
  RCIMClient.addEventListener('rcimlib-receipt-response', listener)
}

/**
 * 取消发送中的媒体消息 //down
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
export function cancelSendMediaMessage (messageId: number, callback: (result: BaseResult) => void) {
  RCIMClient.cancelSendMediaMessage(messageId, callback)
}

/**
 * 取消下载中的媒体消息 //down
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
export function cancelDownloadMediaMessage (messageId: number, callback: (result: BaseResult) => void) {
  RCIMClient.cancelDownloadMediaMessage(messageId, callback)
}

export interface MediaMessageCallback {
  progress?: (progress: number) => void;
  success?: (path: string) => void;
  error?: (errorCode: number) => void;
  cancel?: () => void;
}

/**
 * 下载媒体消息 //down
 *
 * @param messageId 消息 ID
 * @param callback 回调
 */
export function downloadMediaMessage (messageId: number, callback: MediaMessageCallback = {}) {
  const eventId = Math.random().toString()
  const listener = eventEmitter.addEventListener('rcimlib-download-media-message', (data: any) => {
    if (callback) {
      if (data.eventId === eventId) {
        const { success, error, progress, cancel } = callback
        if (data.type === 'success') {
          success && success(data.path)
          listener.remove()
        } else if (data.type === 'error') {
          error && error(data.errorCode)
          listener.remove()
        } else if (data.type === 'progress') {
          progress && progress(data.progress)
        } else if (data.type === 'cancel') {
          cancel && cancel()
        }
      }
    }
  })
  RCIMClient.downloadMediaMessage(messageId, eventId)
}


/**
 * 设置断线重连时是否踢出重连设备  //down
 *
 * 用户没有开通多设备登录功能的前提下，同一个账号在一台新设备上登录的时候，会把这个账号在之前登录的设备上踢出。
 * 由于 SDK 有断线重连功能，存在下面情况。 用户在 A 设备登录，A
 * 设备网络不稳定，没有连接成功，SDK 启动重连机制。 用户此时又在 B 设备登录，B
 * 设备连接成功。 A 设备网络稳定之后，用户在 A 设备连接成功，B 设备被踢出。
 * 这个接口就是为这种情况加的。 设置 enable 为 true 时，SDK
 * 重连的时候发现此时已有别的设备连接成功，不再强行踢出已有设备，而是踢出重连设备。
 *
 * @param enabled 是否踢出重连设备
 */
export function setReconnectKickEnable (enabled: boolean) {
  RCIMClient.setReconnectKickEnable(enabled)
}

/**
 * 获取历史消息 //down
 *
 * 此方法会获取该会话中，baseMessageId 之前或之后的、指定数量、消息类型和查询方向的最新消息实体，返回的消息实体按照时间从新到旧排列。
 * 返回的消息中不包含 baseMessageId 对应的那条消息，如果会话中的消息数量小于参数 count 的值，会将该会话中的所有消息返回。
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param objectName 消息对象名称，可以用 MessageObjectNames 获取消息类型对应的对象名称
 * @param baseMessageId 最近一条消息的 ID
 * @param count 数量
 * @param isForward 是否向前获取
 */
export function getHistoryMessages (
  conversationType: ConversationType,
  targetId: string,
  objectName: string = '',
  baseMessageId = -1,
  count = 10,
  isForward = true,
  callback: (result: MessageListResult) => void
) {
  RCIMClient.getHistoryMessages(
    conversationType,
    targetId,
    objectName,
    baseMessageId,
    count,
    isForward,
    callback
  )
}


/**
 * 通过时间戳获取历史消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param objectName 消息对象名称，可以用 MessageObjectNames 获取消息类型对应的对象名称
 * @param timestamp 时间戳
 * @param count 数量
 * @param isForward 是否向前获取
 */
 export function getHistoryMessagesByTimestamp (
  conversationType: ConversationType,
  targetId: string,
  objectNames: ObjectName[],
  timestamp = 0,
  count = 10,
  isForward = true,
  callback: (result: MessageListResult) => void
) {
  RCIMClient.getHistoryMessagesByTimestamp(
    conversationType,
    targetId,
    objectNames,
    timestamp,
    count,
    isForward,
    callback
  )
}

/**
 * 消息内容兼容性处理
 */
function handleMessageContent (content: MessageContent) {
  if (!content.objectName) {
    // @ts-ignore
    content.objectName = MessageObjectNames[content.type]
  }
  return content
}

/**
 * 向本地会话插入一条发送消息 //down
 *
 * @param conversationType
 * @param targetId
 * @param sentStatus
 * @param messageContent
 * @param sentTime
 */
export function insertOutgoingMessage (
  conversationType: ConversationType,
  targetId: string,
  sentStatus: SentStatus,
  messageContent: MessageContent,
  sentTime = 0,
  callback: (result: MessageResult) => void
) {
  return RCIMClient.insertOutgoingMessage(
    conversationType,
    targetId,
    sentStatus,
    messageContent,
    sentTime,
    callback
  )
}

/**
 * 向本地会话插入一条接收消息 //down
 *
 * @param conversationType
 * @param targetId
 * @param senderUserId
 * @param receivedStatus
 * @param messageContent
 * @param sentTime
 * @param callback 回调函数
 */
export function insertIncomingMessage (
  conversationType: ConversationType,
  targetId: string,
  senderUserId: string,
  receivedStatus: number,
  messageContent: MessageContent,
  sentTime = 0,
  callback: (result: MessageResult) => void
){
  console.log(JSON.stringify(arguments))
  RCIMClient.insertIncomingMessage(
    conversationType,
    targetId,
    senderUserId,
    receivedStatus,
    messageContent,
    sentTime,
    callback
  )
}

/**
 * 清空某一会话的所有消息 //down
 *
 * @param conversationType
 * @param targetId
 * @param callback 回调函数
 */
export function clearMessages (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: BaseResult) => void
) {
  RCIMClient.clearMessages(conversationType, targetId, callback)
}

/**
 * 根据消息 ID 删除消息 //down
 *
 * @param ids 消息 ID 列表
 * @param callback 回调函数
 */
export function deleteMessagesByIds (
  ids: number[],
  callback: (result: BaseResult) => void
) {
  RCIMClient.deleteMessagesByIds(ids, callback)
}

/**
 * 根据会话删除消息 //down
 *
 * @param type 会话类型
 * @param targetId 会话 ID
 * @param callback 回调函数
 */
export function deleteMessages (
  type: ConversationType ,
  targetId: string = '',
  callback: (result: BaseResult) => void
) {
  RCIMClient.deleteMessages(type, targetId, callback)
}

/**
 * 根据关键字搜索会话 //down
 *
 * @param keyword 关键字
 * @param conversationTypes 会话类型数组
 * @param objectNames 对象名称数组
 * @param callback 回调函数
 */
export function searchConversations (
  keyword: string,
  conversationTypes: ConversationType[],
  objectNames: ObjectName[],
  callback: (result: SearchConversationResult) => void
) {
  RCIMClient.searchConversations(keyword, conversationTypes, objectNames, callback)
}

/**
 * 搜索消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param keyword 关键字
 * @param count 获取数量
 * @param startTime 开始时间
 * @param callback 回调函数
 */
export function searchMessages (
  conversationType: ConversationType,
  targetId: string,
  keyword: string,
  count: number,
  startTime = 0,
  callback: (result: MessageListResult) => void
){
  RCIMClient.searchMessages(conversationType, targetId, keyword, count, startTime, callback)
}

/**
 * 获取消息 //down
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
export function getMessage (messageId: number, callback: (result: MessageResult) => void){
  RCIMClient.getMessage(messageId, callback)
}

/**
 * 根据消息 UID 获取消息 //down
 *
 * @param messageUId 消息 UID
 * @param callback 回调函数
 */
export function getMessageByUId (messageUId: string, callback: (result: MessageResult) => void){
  RCIMClient.getMessageByUId(messageUId, callback)
}

/**
 * 设置消息的附加信息 //down
 *
 * @param messageId 消息 ID
 * @param extra 附加信息
 * @param callback 回调函数
 */
export function setMessageExtra (messageId: number, extra: string, callback: (result: BaseResult) => void) {
  RCIMClient.setMessageExtra(messageId, extra, callback)
}

/**
 * 获取消息发送时间 //down
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
export function getMessageSendTime (messageId: number, callback: (result: number) => void) {
  RCIMClient.getMessageSendTime(messageId, callback)
}

/**
 * 获取会话中的消息数量 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function getMessageCount (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: {code: number, count?: number}) => void
){
  RCIMClient.getMessageCount(conversationType, targetId, callback)
}

/**
 * 获取会话里第一条未读消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 */
export function getFirstUnreadMessage (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: MessageResult) => void
) {
  RCIMClient.getFirstUnreadMessage(conversationType, targetId, callback)
}

/**
 * 获取会话中 @ 提醒自己的消息  //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 */
export function getUnreadMentionedMessages (
  conversationType: ConversationType,
  targetId: string,
  callback: (messages: MessageListResult) => void
) {
  RCIMClient.getUnreadMentionedMessages(conversationType, targetId, callback)
}

/**
 * 获取服务端历史消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param sentTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param count 删除数量
 */
export function getRemoteHistoryMessages (
  conversationType: ConversationType,
  targetId: string,
  sentTime: number,
  count: number,
  callback: (result: MessageListResult) => void
) {
  RCIMClient.getRemoteHistoryMessages(conversationType, targetId, sentTime, count, callback)
}

/**
 * 清除服务端历史消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 */
export function cleanRemoteHistoryMessages (
  conversationType: ConversationType,
  targetId: string,
  recordTime: number,
  callback: (result: BaseResult) => void
){
  RCIMClient.cleanRemoteHistoryMessages(conversationType, targetId, recordTime, callback)
}

/**
 * 清除服务端历史消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param clearRemote 是否同时删除服务端消息
 */
export function cleanHistoryMessages (
  conversationType: ConversationType,
  targetId: string,
  recordTime: number,
  clearRemote: boolean,
  callback: (result: BaseResult) => void
){
  RCIMClient.cleanHistoryMessages(conversationType, targetId, recordTime, clearRemote, callback)
}

/**
 * 清除服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param messages 要删除的消息数组，数组大小不能超过 100 条
 */
// export function deleteRemoteMessages (
//   conversationType: ConversationType,
//   targetId: string,
//   messages: Message[],
//   callback: (result: boolean) => void
// ){
//   RCIMClient.deleteRemoteMessages(conversationType, targetId, messages, callback)
// }

/**
 * 获取会话 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function getConversation (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: ConversationResult) => void
) {
  RCIMClient.getConversation(conversationType, targetId, callback)
}

/**
 * 获取会话列表 //down
 *
 * @param conversationTypes 会话类型列表
 * @param count 获取的数量
 * @param timestamp 会话的时间戳（获取这个时间戳之前的会话列表，0
 *     表示从最新开始获取）会话类型
 * @param callback 回调函数
 */
export function getConversationList (
  conversationTypes: ConversationType[] = [],
  count = 0,
  timestamp = 0,
  callback: (result: ConversationListResult) => void
) {
  console.log(JSON.stringify(arguments))
  RCIMClient.getConversationList(conversationTypes, count, timestamp, callback)
}

/**
 * 从会话列表中移除某一会话，但是不删除会话内的消息 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function removeConversation (
  conversationType: ConversationType,
  targetId: string,
  callback: (conversation: BaseResult) => void
) {
  RCIMClient.removeConversation(conversationType, targetId, callback)
}

/**
 * 设置会话消息提醒状态 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isBlock 是否屏蔽
 * @param callback 回调函数
 */
export function setConversationNotificationStatus (
  conversationType: ConversationType,
  targetId: string,
  isBlock: boolean,
  callback: (result: statusResult) => void
) {
  RCIMClient.setConversationNotificationStatus(conversationType, targetId, isBlock, callback)
}

/**
 * 获取会话消息提醒状态 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function getConversationNotificationStatus (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: statusResult) => void
){
  RCIMClient.getConversationNotificationStatus(conversationType, targetId, callback)
}

/**
 * 设置是否置顶会话 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isTop 是否置顶
 * @param callback 回调函数
 */
export function setConversationToTop (
  conversationType: ConversationType,
  targetId: string,
  isTop: boolean,
  callback: (result: BaseResult) => void
) {
  RCIMClient.setConversationToTop(conversationType, targetId, isTop, callback)
}

/**
 * 获取置顶会话列表 //down
 *
 * @param conversationTypes 会话类型列表
 * @param callback 回调函数
 */
export function getTopConversationList (
  conversationTypes: ConversationType[] = [],
  callback: (result: ConversationListResult) => void
) {
   RCIMClient.getTopConversationList(conversationTypes, callback)
}

/**
 * 保存某一会话的文本消息草稿 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param content 草稿内容
 * @param callback 回调函数
 */
export function saveTextMessageDraft (
  conversationType: ConversationType,
  targetId: string,
  content: string,
  callback: (result: BaseResult) => void
) {
   RCIMClient.saveTextMessageDraft(conversationType, targetId, content, callback)
}

/**
 * 获取某一会话的文本消息草稿 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function getTextMessageDraft (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: DraftResult) => void
) {
   RCIMClient.getTextMessageDraft(conversationType, targetId, callback)
}

/**
 * 清除某一会话的文本消息草稿 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function clearTextMessageDraft (
  conversationType: ConversationType,
  targetId: string,
  callback: (result: BaseResult) => void
) {
   RCIMClient.clearTextMessageDraft(conversationType, targetId, callback)
}

/**
 * 获取所有未读消息数 //down
 * 
 * @param callback 回调函数
 */
export function getTotalUnreadCount (callback: (result: CountResult) => void) {
   RCIMClient.getTotalUnreadCount(callback)
}

/**
 * 获取指定会话的未读消息数 //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
export function getUnreadCount (
  conversationType: ConversationType | ConversationType[],
  targetId = '',
  callback: (result: CountResult) => void
) {
  if (Array.isArray(conversationType)) {
     RCIMClient.getUnreadCount(0, '', conversationType, callback)
  }
   RCIMClient.getUnreadCount(conversationType, targetId, [], callback)
}

/**
 * 清除某个会话中的未读消息数  //down
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param time 该会话已阅读的最后一条消息的发送时间戳
 * @param callback 回调函数
 */
export function clearMessagesUnreadStatus (
  conversationType: ConversationType,
  targetId: string,
  time = 0,
  callback: (result: BaseResult) => void
) {
   RCIMClient.clearMessagesUnreadStatus(conversationType, targetId, time, callback)
}

/**
 * 把用户加入黑名单 //down
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
export function addToBlacklist (userId: string, callback: (result: BaseResult) => void) {
   RCIMClient.addToBlacklist(userId, callback)
}

/**
 * 把用户从黑名单中移除 //down
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
export function removeFromBlacklist (userId: string, callback: (result: BaseResult) => void) {
   RCIMClient.removeFromBlacklist(userId, callback)
}

/**
 * 获取某用户是否在黑名单中  //down
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
export function getBlacklistStatus (userId: string, callback: (result: statusResult) => void){
   RCIMClient.getBlacklistStatus(userId, callback)
}

/**
 * 获取黑名单列表 //down
 *
 * @param 回调函数
 */
export function getBlacklist (callback: (result: {code: number, list?: string[]}) => void) {
   RCIMClient.getBlacklist(callback)
}

/**
 * 加入聊天室，如果已存在，直接加入，否则创建并加入 //down
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
export function joinChatRoom (targetId: string, messageCount: number = 10, callback: (result: BaseResult) => void) {
  RCIMClient.joinChatRoom(targetId, messageCount, callback)
}

/**
 * 加入已存在的聊天室，如果不存在则加入失败 //down
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
export function joinExistChatRoom (targetId: string, messageCount = 10, callback: (result: BaseResult) => void) {
  RCIMClient.joinExistChatRoom(targetId, messageCount, callback)
}

/**
 * 退出聊天室 //down
 *
 * @param targetId 聊天室 ID
 * @param callback 回调函数
 */
export function quitChatRoom (targetId: string, callback: (result: BaseResult) => void) {
  RCIMClient.quitChatRoom(targetId, callback)
}

/**
 * 从服务器端获取聊天室的历史消息 //down
 *
 * @param targetId 目标 ID
 * @param recordTime 起始的消息发送时间戳，单位毫秒
 * @param count 要获取的消息数量
 * @param order 拉取顺序
 * @param callback 回调函数
 */
export function getRemoteChatRoomHistoryMessages (
  targetId: string,
  recordTime: number,
  count: number,
  order: TimestampOrder,
  callback: (result: { messages: Message[]; syncTime: number, code: number }) => void
) {
  RCIMClient.getRemoteChatRoomHistoryMessages(targetId, recordTime, count, order, callback)
}

/**
 * 获取聊天室信息  //down
 *
 * @param targetId 聊天室 ID
 * @param memberCount 聊天室成员数量，最多获取 20 个
 * @param order 返回的聊天室成员排序方式
 * @param callback 回调函数
 */
export function getChatRoomInfo (
  targetId: string,
  memberCount: number = 20,
  order: ChatRoomMemberOrder = ChatRoomMemberOrder.ASC,
  callback: (result: ChatRoomInfoResult) => void
) {
  RCIMClient.getChatRoomInfo(targetId, memberCount, order, callback)
}

/**
 * 全局屏蔽某个时间段的消息提醒 //down
 *
 * @param startTime 开始屏蔽消息提醒的时间，格式为HH:MM:SS
 * @param spanMinutes 需要屏蔽消息提醒的分钟数，0 < spanMinutes < 1440
 * @param callback 回调函数
 */
export function setNotificationQuietHours (startTime: string, spanMinutes: number, callback: (result: BaseResult) => void) {
  RCIMClient.setNotificationQuietHours(startTime, spanMinutes, callback)
}

/**
 * 查询已设置的全局时间段消息提醒屏蔽 //down
 * 
 * @param callback 回调函数
 */
export function getNotificationQuietHours (callback: (result: { startTime: string, spanMinutes: number, code: number }) => void) {
  RCIMClient.getNotificationQuietHours(callback)
}

/**
 * 删除已设置的全局时间段消息提醒屏蔽 //down
 * 
 * @param callback 回调函数
 */
export function removeNotificationQuietHours (callback: (result: BaseResult) => void) {
  RCIMClient.removeNotificationQuietHours(callback)
}

/**
 * 获取离线消息在服务端的存储时间（以天为单位）//down
 */
export function getOfflineMessageDuration (callback: (result: {code: number, duration: number}) => void) {
  RCIMClient.getOfflineMessageDuration(callback)
}

/**
 * 设置离线消息在服务端的存储时间（以天为单位）  //down
 */
export async function setOfflineMessageDuration (duration: number, callback: (result: BaseResult) => void) {
  parseInt(await RCIMClient.setOfflineMessageDuration(duration, callback))
}

/**
 * 获取当前用户 ID  //down
 * 
 * @param callback 回调函数
 */
export function getCurrentUserId (callback: (result: {userId: string}) => void) {
  RCIMClient.getCurrentUserId(callback)
}

/**
 * 设置推送语言  //down
 *
 * @param language 推送语言
 */
export function setPushLanguageCode (language: PushLanguage, callback: (result: BaseResult) => void) {
  RCIMClient.setPushLanguageCode(language, callback)
}

/**
 * 设置是否显示内容详情 //down
 *
 * @param isShowPushContent 是否显示内容详情
 * 
 * @param callback 回调函数
 */
export function setPushContentShowStatus (isShowPushContent: boolean, callback: (result: BaseResult) => void){
  RCIMClient.setPushContentShowStatus(isShowPushContent, callback)
}

/**
 * 查询是否显示内容详情 //down
 * 
 * @param callback 回调函数
 */
export function getPushContentShowStatus (callback: (result: statusResult) => void){
  RCIMClient.getPushContentShowStatus(callback)
}

/**
 * 设置推送配置（仅安卓）
 * @param config 推送配置
 */
export function setPushConfig (config: PushConfig) {
  RCIMClient.setPushConfig(config)
}

