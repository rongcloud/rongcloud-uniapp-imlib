/*
 * RCIMLibUni - v5.1.3-release.4
 * CommitId - feed3f0f61dd39b78c4d0a5b5bdb387ad3bb003e
 * Tue Mar 22 2022 15:58:58 GMT+0800 (中国标准时间)
 * ©2020 RongCloud, Inc. All rights reserved.
 */
/**
 * 消息方向
 */
var MessageDirection;
(function (MessageDirection) {
    MessageDirection[MessageDirection["SEND"] = 1] = "SEND";
    MessageDirection[MessageDirection["RECEIVE"] = 2] = "RECEIVE";
})(MessageDirection || (MessageDirection = {}));
/**
 * 会话类型
 */
var ConversationType;
(function (ConversationType) {
    ConversationType[ConversationType["PRIVATE"] = 1] = "PRIVATE";
    ConversationType[ConversationType["DISCUSSION"] = 2] = "DISCUSSION";
    ConversationType[ConversationType["GROUP"] = 3] = "GROUP";
    ConversationType[ConversationType["CHATROOM"] = 4] = "CHATROOM";
    ConversationType[ConversationType["CUSTOMER_SERVICE"] = 5] = "CUSTOMER_SERVICE";
    ConversationType[ConversationType["SYSTEM"] = 6] = "SYSTEM";
    ConversationType[ConversationType["APP_SERVICE"] = 7] = "APP_SERVICE";
    ConversationType[ConversationType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
    ConversationType[ConversationType["PUSH_SERVICE"] = 9] = "PUSH_SERVICE";
})(ConversationType || (ConversationType = {}));
/**
 * 发送状态
 */
var SentStatus;
(function (SentStatus) {
    SentStatus[SentStatus["SENDING"] = 10] = "SENDING";
    SentStatus[SentStatus["FAILED"] = 20] = "FAILED";
    SentStatus[SentStatus["SENT"] = 30] = "SENT";
    SentStatus[SentStatus["RECEIVED"] = 40] = "RECEIVED";
    SentStatus[SentStatus["READ"] = 50] = "READ";
    SentStatus[SentStatus["DESTROYED"] = 60] = "DESTROYED";
    SentStatus[SentStatus["CANCELED"] = 70] = "CANCELED";
})(SentStatus || (SentStatus = {}));
/**
 * 消息提醒类型
 */
var MentionedType;
(function (MentionedType) {
    /**
     * 提醒所有
     */
    MentionedType[MentionedType["ALL"] = 1] = "ALL";
    /**
     * 部分提醒
     */
    MentionedType[MentionedType["PART"] = 2] = "PART";
})(MentionedType || (MentionedType = {}));
/**
 * 消息对象名称
 */
var ObjectName;
(function (ObjectName) {
    /**
     * 文本消息
     */
    ObjectName["Text"] = "RC:TxtMsg";
    /**
     * 文件消息
     */
    ObjectName["File"] = "RC:FileMsg";
    /**
     * 图片消息
     */
    ObjectName["Image"] = "RC:ImgMsg";
    /**
     * GIF 图片消息
     */
    ObjectName["GIF"] = "RC:GIFMsg";
    /**
     * 位置信息
     */
    ObjectName["Location"] = "RC:LBSMsg";
    /**
     * 语音消息
     */
    ObjectName["Voice"] = "RC:VcMsg";
    /**
     * 高质量语音消息
     */
    ObjectName["HQVoice"] = "RC:HQVCMsg";
    /**
     * 小视频消息
     */
    ObjectName["Sight"] = "RC:SightMsg";
    /**
     * 命令消息
     */
    ObjectName["Command"] = "RC:CmdMsg";
    /**
     * 公众服务单图文消息
     */
    ObjectName["PublicServiceRich"] = "RC:PSImgTxtMsg";
    /**
     * 公众服务多图文消息
     */
    ObjectName["PublicServiceMultiRich"] = "RC:PSMultiImgTxtMsg";
    /**
     * 好友通知消息
     */
    ObjectName["ContactNotification"] = "RC:ContactNtf";
    /**
     * 资料通知消息
     */
    ObjectName["ProfileNotification"] = "RC:ProfileNtf";
    /**
     * 通用命令通知消息
     */
    ObjectName["CommandNotification"] = "RC:CmdNtf";
    /**
     * 提示条通知消息
     */
    ObjectName["InformationNotification"] = "RC:InfoNtf";
    /**
     * 群组通知消息
     */
    ObjectName["GroupNotification"] = "RC:GrpNtf";
    /**
     * 已读通知消息
     */
    ObjectName["ReadReceipt"] = "RC:ReadNtf";
    /**
     * 公众服务命令消息
     */
    ObjectName["PublicServiceCommand"] = "RC:PSCmd";
    /**
     * 对方正在输入状态消息
     */
    ObjectName["TypingStatus"] = "RC:TypSts";
    /**
     * 群消息已读状态回执
     */
    ObjectName["ReadReceiptResponse"] = "RC:RRRspMsg";
})(ObjectName || (ObjectName = {}));
/**
 * 自定义消息类型
 */
var CustomMessageType;
(function (CustomMessageType) {
    /**
     * 命令消息，不存储、不计入未读计数
     */
    CustomMessageType[CustomMessageType["COMMAND"] = 0] = "COMMAND";
    /**
     * 存储消息，存储、不计入未读计数
     */
    CustomMessageType[CustomMessageType["STORAGE"] = 1] = "STORAGE";
    /**
     * 普通消息，存储、计入未读计数
     */
    CustomMessageType[CustomMessageType["NORMAL"] = 2] = "NORMAL";
    /**
     * 状态消息，不存储不计数
     */
    CustomMessageType[CustomMessageType["STATUS"] = 3] = "STATUS";
})(CustomMessageType || (CustomMessageType = {}));
/**
 * 消息对象名称枚举
 */
var MessageObjectNames;
(function (MessageObjectNames) {
    MessageObjectNames["text"] = "RC:TxtMsg";
    MessageObjectNames["image"] = "RC:ImgMsg";
    MessageObjectNames["file"] = "RC:FileMsg";
    MessageObjectNames["location"] = "RC:LocMsg";
    MessageObjectNames["voice"] = "RC:VcMsg";
})(MessageObjectNames || (MessageObjectNames = {}));
/**
 * 连接错误代码
 */
var ConnectErrorCode;
(function (ConnectErrorCode) {
    ConnectErrorCode[ConnectErrorCode["RC_SUCCESS"] = 0] = "RC_SUCCESS";
    ConnectErrorCode[ConnectErrorCode["RC_NET_CHANNEL_INVALID"] = 30001] = "RC_NET_CHANNEL_INVALID";
    ConnectErrorCode[ConnectErrorCode["RC_NET_UNAVAILABLE"] = 30002] = "RC_NET_UNAVAILABLE";
    ConnectErrorCode[ConnectErrorCode["RC_NAVI_REQUEST_FAIL"] = 30004] = "RC_NAVI_REQUEST_FAIL";
    ConnectErrorCode[ConnectErrorCode["RC_NAVI_RESPONSE_ERROR"] = 30007] = "RC_NAVI_RESPONSE_ERROR";
    ConnectErrorCode[ConnectErrorCode["RC_NODE_NOT_FOUND"] = 30008] = "RC_NODE_NOT_FOUND";
    ConnectErrorCode[ConnectErrorCode["RC_SOCKET_NOT_CONNECTED"] = 30010] = "RC_SOCKET_NOT_CONNECTED";
    ConnectErrorCode[ConnectErrorCode["RC_SOCKET_DISCONNECTED"] = 30011] = "RC_SOCKET_DISCONNECTED";
    ConnectErrorCode[ConnectErrorCode["RC_PING_SEND_FAIL"] = 30012] = "RC_PING_SEND_FAIL";
    ConnectErrorCode[ConnectErrorCode["RC_PONG_RECV_FAIL"] = 30013] = "RC_PONG_RECV_FAIL";
    ConnectErrorCode[ConnectErrorCode["RC_MSG_SEND_FAIL"] = 30014] = "RC_MSG_SEND_FAIL";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_OVERFREQUENCY"] = 30015] = "RC_CONN_OVERFREQUENCY";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_ACK_TIMEOUT"] = 31000] = "RC_CONN_ACK_TIMEOUT";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_PROTO_VERSION_ERROR"] = 31001] = "RC_CONN_PROTO_VERSION_ERROR";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_ID_REJECT"] = 31002] = "RC_CONN_ID_REJECT";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_SERVER_UNAVAILABLE"] = 31003] = "RC_CONN_SERVER_UNAVAILABLE";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_TOKEN_INCORRECT"] = 31004] = "RC_CONN_TOKEN_INCORRECT";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_NOT_AUTHRORIZED"] = 31005] = "RC_CONN_NOT_AUTHRORIZED";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_REDIRECTED"] = 31006] = "RC_CONN_REDIRECTED";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_PACKAGE_NAME_INVALID"] = 31007] = "RC_CONN_PACKAGE_NAME_INVALID";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"] = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_USER_BLOCKED"] = 31009] = "RC_CONN_USER_BLOCKED";
    ConnectErrorCode[ConnectErrorCode["RC_DISCONN_KICK"] = 31010] = "RC_DISCONN_KICK";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_OTHER_DEVICE_LOGIN"] = 31023] = "RC_CONN_OTHER_DEVICE_LOGIN";
    ConnectErrorCode[ConnectErrorCode["RC_CONN_REFUSED"] = 32061] = "RC_CONN_REFUSED";
    ConnectErrorCode[ConnectErrorCode["RC_CLIENT_NOT_INIT"] = 33001] = "RC_CLIENT_NOT_INIT";
    ConnectErrorCode[ConnectErrorCode["RC_INVALID_PARAMETER"] = 33003] = "RC_INVALID_PARAMETER";
    ConnectErrorCode[ConnectErrorCode["RC_CONNECTION_EXIST"] = 34001] = "RC_CONNECTION_EXIST";
    ConnectErrorCode[ConnectErrorCode["RC_BACKGROUND_CONNECT"] = 34002] = "RC_BACKGROUND_CONNECT";
    ConnectErrorCode[ConnectErrorCode["RC_INVALID_ARGUMENT"] = -1000] = "RC_INVALID_ARGUMENT";
})(ConnectErrorCode || (ConnectErrorCode = {}));
/**
 * 错误代码
 */
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["PARAMETER_ERROR"] = -3] = "PARAMETER_ERROR";
    ErrorCode[ErrorCode["ERRORCODE_UNKNOWN"] = -1] = "ERRORCODE_UNKNOWN";
    ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"] = 405] = "REJECTED_BY_BLACKLIST";
    ErrorCode[ErrorCode["ERRORCODE_TIMEOUT"] = 5004] = "ERRORCODE_TIMEOUT";
    ErrorCode[ErrorCode["SEND_MSG_FREQUENCY_OVERRUN"] = 20604] = "SEND_MSG_FREQUENCY_OVERRUN";
    ErrorCode[ErrorCode["NOT_IN_DISCUSSION"] = 21406] = "NOT_IN_DISCUSSION";
    ErrorCode[ErrorCode["NOT_IN_GROUP"] = 22406] = "NOT_IN_GROUP";
    ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"] = 22408] = "FORBIDDEN_IN_GROUP";
    ErrorCode[ErrorCode["NOT_IN_CHATROOM"] = 23406] = "NOT_IN_CHATROOM";
    ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"] = 23408] = "FORBIDDEN_IN_CHATROOM";
    ErrorCode[ErrorCode["KICKED_FROM_CHATROOM"] = 23409] = "KICKED_FROM_CHATROOM";
    ErrorCode[ErrorCode["CHATROOM_NOT_EXIST"] = 23410] = "CHATROOM_NOT_EXIST";
    ErrorCode[ErrorCode["CHATROOM_IS_FULL"] = 23411] = "CHATROOM_IS_FULL";
    ErrorCode[ErrorCode["PARAMETER_INVALID_CHATROOM"] = 23412] = "PARAMETER_INVALID_CHATROOM";
    ErrorCode[ErrorCode["ROAMING_SERVICE_UNAVAILABLE_CHATROOM"] = 23414] = "ROAMING_SERVICE_UNAVAILABLE_CHATROOM";
    ErrorCode[ErrorCode["CHANNEL_INVALID"] = 30001] = "CHANNEL_INVALID";
    ErrorCode[ErrorCode["NETWORK_UNAVAILABLE"] = 30002] = "NETWORK_UNAVAILABLE";
    ErrorCode[ErrorCode["MSG_RESPONSE_TIMEOUT"] = 30003] = "MSG_RESPONSE_TIMEOUT";
    ErrorCode[ErrorCode["CLIENT_NOT_INIT"] = 33001] = "CLIENT_NOT_INIT";
    ErrorCode[ErrorCode["DATABASE_ERROR"] = 33002] = "DATABASE_ERROR";
    ErrorCode[ErrorCode["INVALID_PARAMETER"] = 33003] = "INVALID_PARAMETER";
    ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"] = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE";
    ErrorCode[ErrorCode["INVALID_PUBLIC_NUMBER"] = 29201] = "INVALID_PUBLIC_NUMBER";
    ErrorCode[ErrorCode["MSG_SIZE_OUT_OF_LIMIT"] = 30016] = "MSG_SIZE_OUT_OF_LIMIT";
    ErrorCode[ErrorCode["RECALLMESSAGE_PARAMETER_INVALID"] = 25101] = "RECALLMESSAGE_PARAMETER_INVALID";
    ErrorCode[ErrorCode["PUSHSETTING_PARAMETER_INVALID"] = 26001] = "PUSHSETTING_PARAMETER_INVALID";
    ErrorCode[ErrorCode["OPERATION_BLOCKED"] = 20605] = "OPERATION_BLOCKED";
    ErrorCode[ErrorCode["OPERATION_NOT_SUPPORT"] = 20606] = "OPERATION_NOT_SUPPORT";
    ErrorCode[ErrorCode["MSG_BLOCKED_SENSITIVE_WORD"] = 21501] = "MSG_BLOCKED_SENSITIVE_WORD";
    ErrorCode[ErrorCode["MSG_REPLACED_SENSITIVE_WORD"] = 21502] = "MSG_REPLACED_SENSITIVE_WORD";
    ErrorCode[ErrorCode["SIGHT_MSG_DURATION_LIMIT_EXCEED"] = 34002] = "SIGHT_MSG_DURATION_LIMIT_EXCEED";
})(ErrorCode || (ErrorCode = {}));
/**
 * iOS 连接状态
 */
var ConnectionStatusIOS;
(function (ConnectionStatusIOS) {
    ConnectionStatusIOS[ConnectionStatusIOS["UNKNOWN"] = -1] = "UNKNOWN";
    ConnectionStatusIOS[ConnectionStatusIOS["Connected"] = 0] = "Connected";
    ConnectionStatusIOS[ConnectionStatusIOS["NETWORK_UNAVAILABLE"] = 1] = "NETWORK_UNAVAILABLE";
    ConnectionStatusIOS[ConnectionStatusIOS["AIRPLANE_MODE"] = 2] = "AIRPLANE_MODE";
    ConnectionStatusIOS[ConnectionStatusIOS["Cellular_2G"] = 3] = "Cellular_2G";
    ConnectionStatusIOS[ConnectionStatusIOS["Cellular_3G_4G"] = 4] = "Cellular_3G_4G";
    ConnectionStatusIOS[ConnectionStatusIOS["WIFI"] = 5] = "WIFI";
    ConnectionStatusIOS[ConnectionStatusIOS["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
    ConnectionStatusIOS[ConnectionStatusIOS["LOGIN_ON_WEB"] = 7] = "LOGIN_ON_WEB";
    ConnectionStatusIOS[ConnectionStatusIOS["SERVER_INVALID"] = 8] = "SERVER_INVALID";
    ConnectionStatusIOS[ConnectionStatusIOS["VALIDATE_INVALID"] = 9] = "VALIDATE_INVALID";
    ConnectionStatusIOS[ConnectionStatusIOS["Connecting"] = 10] = "Connecting";
    ConnectionStatusIOS[ConnectionStatusIOS["Unconnected"] = 11] = "Unconnected";
    ConnectionStatusIOS[ConnectionStatusIOS["SignUp"] = 12] = "SignUp";
    ConnectionStatusIOS[ConnectionStatusIOS["TOKEN_INCORRECT"] = 31004] = "TOKEN_INCORRECT";
    ConnectionStatusIOS[ConnectionStatusIOS["DISCONN_EXCEPTION"] = 31011] = "DISCONN_EXCEPTION";
})(ConnectionStatusIOS || (ConnectionStatusIOS = {}));
/**
 * Android 连接状态
 */
var ConnectionStatusAndroid;
(function (ConnectionStatusAndroid) {
    ConnectionStatusAndroid[ConnectionStatusAndroid["NETWORK_UNAVAILABLE"] = -1] = "NETWORK_UNAVAILABLE";
    ConnectionStatusAndroid[ConnectionStatusAndroid["CONNECTED"] = 0] = "CONNECTED";
    ConnectionStatusAndroid[ConnectionStatusAndroid["CONNECTING"] = 1] = "CONNECTING";
    ConnectionStatusAndroid[ConnectionStatusAndroid["DISCONNECTED"] = 2] = "DISCONNECTED";
    ConnectionStatusAndroid[ConnectionStatusAndroid["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 3] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
    ConnectionStatusAndroid[ConnectionStatusAndroid["TOKEN_INCORRECT"] = 4] = "TOKEN_INCORRECT";
    ConnectionStatusAndroid[ConnectionStatusAndroid["SERVER_INVALID"] = 5] = "SERVER_INVALID";
})(ConnectionStatusAndroid || (ConnectionStatusAndroid = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["SUCCESS"] = "success";
    ResponseType["ERROR"] = "error";
    ResponseType["CANCEL"] = "cancel";
    ResponseType["PROGRESS"] = "progress";
})(ResponseType || (ResponseType = {}));
/**
 * 搜索类型
 */
var SearchType;
(function (SearchType) {
    /**
     * 精准
     */
    SearchType[SearchType["EXACT"] = 0] = "EXACT";
    /**
     * 模糊
     */
    SearchType[SearchType["FUZZY"] = 1] = "FUZZY";
})(SearchType || (SearchType = {}));
/**
 * 公共服务类型
 */
var PublicServiceType;
(function (PublicServiceType) {
    /**
     * 应用公众服务
     */
    PublicServiceType[PublicServiceType["APP_PUBLIC_SERVICE"] = 7] = "APP_PUBLIC_SERVICE";
    /**
     * 公共服务号
     */
    PublicServiceType[PublicServiceType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
})(PublicServiceType || (PublicServiceType = {}));
/**
 * 公众服务菜单类型
 */
var PublicServiceMenuItemType;
(function (PublicServiceMenuItemType) {
    /**
     * 作为分组包含子菜单的菜单
     */
    PublicServiceMenuItemType[PublicServiceMenuItemType["GROUP"] = 0] = "GROUP";
    /**
     * 查看事件菜单
     */
    PublicServiceMenuItemType[PublicServiceMenuItemType["VIEW"] = 1] = "VIEW";
    /**
     * 点击事件菜单
     */
    PublicServiceMenuItemType[PublicServiceMenuItemType["CLICK"] = 2] = "CLICK";
})(PublicServiceMenuItemType || (PublicServiceMenuItemType = {}));
/**
 * 时间戳排序方式
 */
var TimestampOrder;
(function (TimestampOrder) {
    /**
     * 按时间戳倒序排序
     */
    TimestampOrder[TimestampOrder["DESC"] = 0] = "DESC";
    /**
     * 按时间戳顺序排序
     */
    TimestampOrder[TimestampOrder["ASC"] = 1] = "ASC";
})(TimestampOrder || (TimestampOrder = {}));
/**
 * 聊天室成员排序，按加入时间
 */
var ChatRoomMemberOrder;
(function (ChatRoomMemberOrder) {
    /**
     * 生序
     */
    ChatRoomMemberOrder[ChatRoomMemberOrder["ASC"] = 1] = "ASC";
    /**
     * 降序
     */
    ChatRoomMemberOrder[ChatRoomMemberOrder["DESC"] = 2] = "DESC";
})(ChatRoomMemberOrder || (ChatRoomMemberOrder = {}));
/**
 * 实时位置共享状态
 */
var RealTimeLocationStatus;
(function (RealTimeLocationStatus) {
    /**
     * 初始状态
     */
    RealTimeLocationStatus[RealTimeLocationStatus["IDLE"] = 0] = "IDLE";
    /**
     * 接收状态
     */
    RealTimeLocationStatus[RealTimeLocationStatus["INCOMING"] = 1] = "INCOMING";
    /**
     * 发起状态
     */
    RealTimeLocationStatus[RealTimeLocationStatus["OUTGOING"] = 2] = "OUTGOING";
    /**
     * 已连接，正在共享的状态
     */
    RealTimeLocationStatus[RealTimeLocationStatus["CONNECTED"] = 3] = "CONNECTED";
})(RealTimeLocationStatus || (RealTimeLocationStatus = {}));
/**
 * 推送语言
 */
var PushLanguage;
(function (PushLanguage) {
    PushLanguage["EN_US"] = "en_US";
    PushLanguage["ZH_CN"] = "zh_CN";
    PushLanguage["AR_SA"] = "ar_SA";
})(PushLanguage || (PushLanguage = {}));

let RCIMClient = uni.requireNativePlugin('RongCloud-IM-RCUniIM');
/**
 * 初始化 SDK，只需要调用一次
 *
 * @param appKey 从融云开发者平台创建应用后获取到的 App Key
 */
function init(appKey) {
    RCIMClient.init(appKey);
}
/**
 * 初始化 SDK，只需要调用一次
 * @param appKey 从融云开发者平台创建应用后获取到的 App Key
 * @param engineSetup 引擎初始化配置参数
 */
function initWithSetup(appKey, engineSetup) {
    RCIMClient.initWithSetup(appKey, engineSetup);
}
/**
 * 连接融云服务器，只需要调用一次
 *
 * 在 App 整个生命周期，您只需要调用一次此方法与融云服务器建立连接。
 * 之后无论是网络出现异常或者App有前后台的切换等，SDK都会负责自动重连。
 * 除非您已经手动将连接断开，否则您不需要自己再手动重连。
 *
 * @param token 从服务端获取的用户身份令牌（Token）
 * @param callback 回调函数
 */
function connect(token, callback) {
    RCIMClient.connect(token, callback);
}
/**
 * 断开与融云服务器的连接
 *
 * @param isReceivePush 是否还接收推送
 */
function disconnect(isReceivePush = true) {
    RCIMClient.disconnect(isReceivePush);
}
/**
 * 添加连接状态监听函数
 *
 * @param listener 回调函数
 */
function addConnectionStatusListener(listener) {
    RCIMClient.addEventListener("rcimlib-connection-status", listener);
}
/**
 * 清除连接状态监听函数
 *
 */
function clearConnectionStatusListener() {
    RCIMClient.removeAllEventListeners("rcimlib-connection-status");
}
/**
 * 添加日志信息监听函数
 *
 * @param listener
 */
function addLogInfoListener(listener) {
    RCIMClient.addEventListener('rcimlib-log', listener);
}
/**
 * 清除日志信息监听函数
 *
 */
function clearLogInfoListener() {
    RCIMClient.removeAllEventListeners('rcimlib-log');
}
/**
 * 添加消息撤回监听函数
 *
 * @param listener
 */
function addRecallMessageListener(listener) {
    RCIMClient.addEventListener('rcimlib-recall', listener);
}
/**
 * 添加消息撤回监听函数
 *
 */
function clearRecallMessageListener() {
    RCIMClient.removeAllEventListeners('rcimlib-recall');
}
/**
 * 添加消息监听函数
 *
 * @param listener
 */
function addReceiveMessageListener(listener) {
    RCIMClient.addEventListener('rcimlib-receive-message', listener);
}
/**
 * 清除消息监听函数
 *
 */
function clearReceiveMessageListener() {
    RCIMClient.removeAllEventListeners('rcimlib-receive-message');
}
/**
 * 添加输入状态监听函数
 *
 * @param listener
 */
function addTypingStatusListener(listener) {
    RCIMClient.addEventListener('rcimlib-typing-status', listener);
}
/**
 * 清除输入状态监听函数
 *
 */
function clearTypingStatusListener() {
    RCIMClient.removeAllEventListeners('rcimlib-typing-status');
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
 * 同步会话阅读状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已读的最后一条消息的发送时间戳，必须是有效的时间戳
 * @param callback 回调函数
 */
function syncConversationReadStatus(conversationType, targetId, timestamp, callback) {
    RCIMClient.syncConversationReadStatus(conversationType, targetId, timestamp, callback);
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
 * 设置导航服务器和上传文件服务器信息，要在 [[init]] 前使用
 *
 * @param naviServer 导航服务器地址
 * @param fileServer 文件服务器地址
 */
function setServerInfo(naviServer, fileServer) {
    RCIMClient.setServerInfo(naviServer, fileServer);
}
/**
 * 设置统计服务地址
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
function setStatisticServer(server) {
    RCIMClient.setStatisticServer(server);
}
/**
 * 获取当前连接状态
 *
 * @param callback 回调函数
 */
function getConnectionStatus(callback) {
    RCIMClient.getConnectionStatus(callback);
}
const RCSendMessageEventMap = {};
let isInitSendMediaMessage = false;
const initSendMediaMessage = function () {
    RCIMClient.addEventListener('rcimlib-send-message', (res) => {
        const data = res.data;
        const callback = RCSendMessageEventMap[data.eventId];
        if (callback) {
            const { success, error, cancel, progress } = callback;
            if (data.type === ResponseType.SUCCESS) {
                success && success(data.messageId);
                delete RCSendMessageEventMap[data.eventId];
            }
            else if (data.type === ResponseType.ERROR) {
                error && error(data.errorCode, data.messageId);
                delete RCSendMessageEventMap[data.eventId];
            }
            else if (data.type === ResponseType.CANCEL) {
                cancel && cancel(data.messageId);
                delete RCSendMessageEventMap[data.eventId];
            }
            else if (data.type === ResponseType.PROGRESS) {
                progress && progress(data.progress, data.messageId);
            }
        }
    });
};
function handleSendMessageCallback(callback) {
    const eventId = Date.now() + Math.floor((Math.random() * 100000)).toString();
    if (callback) {
        RCSendMessageEventMap[eventId] = callback;
    }
    return eventId;
}
/**
 * 发送消息
 *
 * @param message 消息
 * @param callback 回调函数
 */
function sendMessage(message, callback) {
    RCIMClient.sendMessage(message, callback);
}
/**
 * 发送媒体消息
 *
 * @param message 消息
 * @param callback 回调函数
 */
function sendMediaMessage(message, callback = {}) {
    if (!isInitSendMediaMessage) {
        initSendMediaMessage();
        isInitSendMediaMessage = true;
    }
    RCIMClient.sendMediaMessage(message, handleSendMessageCallback(callback));
}
/**
 * 发送定向消息
 *
 * @param message 消息
 * @param userIdList 用户 ID 列表
 * @param callback 回调函数
 */
function sendDirectionalMessage(message, userIdList, callback) {
    RCIMClient.sendDirectionalMessage(message, userIdList, callback);
}
/**
 * 消息撤回
 *
 * @param messageId 消息 ID
 * @param pushContent 推送内容
 * @param callback 回调函数
 */
function recallMessage(messageId, pushContent = '', callback) {
    RCIMClient.recallMessage(messageId, pushContent, callback);
}
/**
 * 发送输入状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param typingContentType 输入内容类型
 */
function sendTypingStatus(conversationType, targetId, typingContentType) {
    RCIMClient.sendTypingStatus(conversationType, targetId, typingContentType);
}
/**
 * 设置消息发送状态
 *
 * @param messageId 消息 ID
 * @param status 状态
 * @param callback 回调函数
 */
function setMessageSentStatus(messageId, status, callback) {
    return RCIMClient.setMessageSentStatus(messageId, status, callback);
}
/**
 * 设置消息接收状态
 *
 * @param messageId 消息 ID
 * @param status 状态
 * @param callback 回调函数
 */
function setMessageReceivedStatus(messageId, status, callback) {
    return RCIMClient.setMessageReceivedStatus(messageId, status, callback);
}
/**
 * 获取屏蔽消息提醒的会话列表
 *
 * @param conversationTypeList 消息类型列表会话类型
 * @param callback 回调函数
 */
function getBlockedConversationList(conversationTypeList, callback) {
    RCIMClient.getBlockedConversationList(conversationTypeList, callback);
}
/**
 * 发送阅读回执
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已阅读点最后一条消息的发送时间戳
 */
function sendReadReceiptMessage(conversationType, targetId, timestamp) {
    RCIMClient.sendReadReceiptMessage(conversationType, targetId, timestamp);
}
/**
 * 发起群组消息回执请求
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
function sendReadReceiptRequest(messageId, callback) {
    RCIMClient.sendReadReceiptRequest(messageId, callback);
}
/**
 * 发起群组消息回执响应
 *
 * @param conversationType 会话类型
 * @param targetId 会话 ID
 * @param messages 回执的消息列表
 * @param callback 回调函数
 */
function sendReadReceiptResponse(conversationType, targetId, messages, callback) {
    RCIMClient.sendReadReceiptResponse(conversationType, targetId, messages, callback);
}
/**
 * 添加私聊阅读回执监听函数
 */
function addReadReceiptReceivedListener(listener) {
    RCIMClient.addEventListener('rcimlib-read-receipt-received', listener);
}
/**
 * 清除私聊阅读回执监听函数
 */
function clearReadReceiptReceivedListener() {
    RCIMClient.removeAllEventListeners('rcimlib-read-receipt-received');
}
/**
 * 添加收到消息已读回执请求监听函数
 *
 * 收到此请求后，如果用户阅读了对应的消息，需要调用
 * sendMessageReadReceiptResponse 接口发送已读响应
 */
function addReceiptRequestListener(listener) {
    RCIMClient.addEventListener('rcimlib-receipt-request', listener);
}
/**
 * 清除收到消息已读回执请求监听函数
 *
 */
function clearReceiptRequestListener() {
    RCIMClient.removeAllEventListeners('rcimlib-receipt-request');
}
/**
 * 添加消息回执响应监听函数
 *
 * @param listener
 */
function addReceiptResponseListener(listener) {
    RCIMClient.addEventListener('rcimlib-receipt-response', listener);
}
/**
 * 添加消息回执响应监听函数
 *
 */
function clearReceiptResponseListener() {
    RCIMClient.removeAllEventListeners('rcimlib-receipt-response');
}
/**
 * 取消发送中的媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
function cancelSendMediaMessage(messageId, callback) {
    RCIMClient.cancelSendMediaMessage(messageId, callback);
}
/**
 * 取消下载中的媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
function cancelDownloadMediaMessage(messageId, callback) {
    RCIMClient.cancelDownloadMediaMessage(messageId, callback);
}
const RCDownMessageEventMap = {};
let isInitDownMediaListener = false;
const initDownMediaListener = function () {
    RCIMClient.addEventListener('rcimlib-download-media-message', (res) => {
        console.log('下载媒体消息回调', res.data.eventId);
        const data = res.data;
        const callback = RCDownMessageEventMap[data.eventId];
        if (callback) {
            const { success, error, cancel, progress } = callback;
            if (data.type === 'success') {
                success && success(data.path);
                delete RCDownMessageEventMap[data.eventId];
            }
            else if (data.type === 'error') {
                error && error(data.errorCode);
                delete RCDownMessageEventMap[data.eventId];
            }
            else if (data.type === 'progress') {
                progress && progress(data.progress);
            }
            else if (data.type === 'cancel') {
                cancel && cancel();
            }
        }
    });
};
function handleDownMessageCallback(callback) {
    const eventId = Date.now() + Math.floor((Math.random() * 100000)).toString();
    if (callback) {
        RCDownMessageEventMap[eventId] = callback;
    }
    return eventId;
}
/**
 * 下载媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调
 */
function downloadMediaMessage(messageId, callback = {}) {
    if (!isInitDownMediaListener) {
        initDownMediaListener();
        isInitDownMediaListener = true;
    }
    RCIMClient.downloadMediaMessage(messageId, handleDownMessageCallback(callback));
}
/**
 * 设置断线重连时是否踢出重连设备
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
function setReconnectKickEnable(enabled) {
    RCIMClient.setReconnectKickEnable(enabled);
}
/**
 * 获取历史消息
 *
 * 此方法会获取该会话中，baseMessageId 之前或之后的、指定数量、消息类型和查询方向的最新消息实体，返回的消息实体按照时间从新到旧排列。
 * 返回的消息中不包含 baseMessageId 对应的那条消息，如果会话中的消息数量小于参数 count 的值，会将该会话中的所有消息返回。
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param objectName 消息对象名称，可以用 MessageObjectNames 获取消息类型对应的对象名称, 传空字符串获取所有类型
 * @param baseMessageId 最近一条消息的 ID
 * @param count 数量
 * @param isForward 是否向前获取
 * @param callback 回调函数
 */
function getHistoryMessages(conversationType, targetId, objectName = '', baseMessageId = -1, count = 10, isForward = true, callback) {
    RCIMClient.getHistoryMessages(conversationType, targetId, objectName, baseMessageId, count, isForward, callback);
}
/**
 * 通过时间戳获取历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param objectName 消息对象名称，可以用 MessageObjectNames 获取消息类型对应的对象名称
 * @param timestamp 时间戳
 * @param count 数量
 * @param isForward 是否向前获取
 * @param callback 回调函数
 */
function getHistoryMessagesByTimestamp(conversationType, targetId, objectNames, timestamp = 0, count = 10, isForward = true, callback) {
    RCIMClient.getHistoryMessagesByTimestamp(conversationType, targetId, objectNames, timestamp, count, isForward, callback);
}
/**
 * 向本地会话插入一条发送消息
 *
 * @param conversationType
 * @param targetId
 * @param sentStatus
 * @param messageContent
 * @param sentTime
 * @param callback 回调函数
 */
function insertOutgoingMessage(conversationType, targetId, sentStatus, messageContent, sentTime = 0, callback) {
    return RCIMClient.insertOutgoingMessage(conversationType, targetId, sentStatus, messageContent, sentTime, callback);
}
/**
 * 向本地会话插入一条接收消息
 *
 * @param conversationType
 * @param targetId
 * @param senderUserId
 * @param receivedStatus
 * @param messageContent
 * @param sentTime
 * @param callback 回调函数
 */
function insertIncomingMessage(conversationType, targetId, senderUserId, receivedStatus, messageContent, sentTime = 0, callback) {
    RCIMClient.insertIncomingMessage(conversationType, targetId, senderUserId, receivedStatus, messageContent, sentTime, callback);
}
/**
 * 清空某一会话的所有消息
 *
 * @param conversationType
 * @param targetId
 * @param callback 回调函数
 */
function clearMessages(conversationType, targetId, callback) {
    RCIMClient.clearMessages(conversationType, targetId, callback);
}
/**
 * 根据消息 ID 删除消息
 *
 * @param ids 消息 ID 列表
 * @param callback 回调函数
 */
function deleteMessagesByIds(ids, callback) {
    RCIMClient.deleteMessagesByIds(ids, callback);
}
/**
 * 根据会话删除消息
 *
 * @param type 会话类型
 * @param targetId 会话 ID
 * @param callback 回调函数
 */
function deleteMessages(type, targetId = '', callback) {
    RCIMClient.deleteMessages(type, targetId, callback);
}
/**
 * 根据关键字搜索会话
 *
 * @param keyword 关键字
 * @param conversationTypes 会话类型数组
 * @param objectNames 对象名称数组
 * @param callback 回调函数
 */
function searchConversations(keyword, conversationTypes, objectNames, callback) {
    RCIMClient.searchConversations(keyword, conversationTypes, objectNames, callback);
}
/**
 * 搜索消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param keyword 关键字
 * @param count 获取数量
 * @param startTime 开始时间
 * @param callback 回调函数
 */
function searchMessages(conversationType, targetId, keyword, count, startTime = 0, callback) {
    RCIMClient.searchMessages(conversationType, targetId, keyword, count, startTime, callback);
}
/**
 * 搜索消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param userId 用户 ID
 * @param count 获取数量
 * @param startTime 开始时间
 * @param callback 回调函数
 */
function searchMessagesByUserId(conversationType, targetId, userId, count, startTime = 0, callback) {
    RCIMClient.searchMessagesByUserId(conversationType, targetId, userId, count, startTime, callback);
}
/**
 * 获取消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
function getMessage(messageId, callback) {
    RCIMClient.getMessage(messageId, callback);
}
/**
 * 根据消息 UID 获取消息
 *
 * @param messageUId 消息 UID
 * @param callback 回调函数
 */
function getMessageByUId(messageUId, callback) {
    RCIMClient.getMessageByUId(messageUId, callback);
}
/**
 * 设置消息的附加信息
 *
 * @param messageId 消息 ID
 * @param extra 附加信息
 * @param callback 回调函数
 */
function setMessageExtra(messageId, extra, callback) {
    RCIMClient.setMessageExtra(messageId, extra, callback);
}
/**
 * 获取消息发送时间
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
function getMessageSendTime(messageId, callback) {
    RCIMClient.getMessageSendTime(messageId, callback);
}
/**
 * 获取会话中的消息数量
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getMessageCount(conversationType, targetId, callback) {
    RCIMClient.getMessageCount(conversationType, targetId, callback);
}
/**
 * 获取会话里第一条未读消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getFirstUnreadMessage(conversationType, targetId, callback) {
    RCIMClient.getFirstUnreadMessage(conversationType, targetId, callback);
}
/**
 * 获取会话中 @ 提醒自己的消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getUnreadMentionedMessages(conversationType, targetId, callback) {
    RCIMClient.getUnreadMentionedMessages(conversationType, targetId, callback);
}
/**
 * 获取服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param sentTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param count 删除数量
 * @param callback 回调函数
 */
function getRemoteHistoryMessages(conversationType, targetId, sentTime, count, callback) {
    RCIMClient.getRemoteHistoryMessages(conversationType, targetId, sentTime, count, callback);
}
/**
 * 清除服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param callback 回调函数
 */
function cleanRemoteHistoryMessages(conversationType, targetId, recordTime, callback) {
    RCIMClient.cleanRemoteHistoryMessages(conversationType, targetId, recordTime, callback);
}
/**
 * 清除历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param clearRemote 是否同时删除服务端消息
 * @param callback 回调函数
 */
function cleanHistoryMessages(conversationType, targetId, recordTime, clearRemote, callback) {
    RCIMClient.cleanHistoryMessages(conversationType, targetId, recordTime, clearRemote, callback);
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
 * 获取会话
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getConversation(conversationType, targetId, callback) {
    RCIMClient.getConversation(conversationType, targetId, callback);
}
/**
 * 获取会话列表
 *
 * @param conversationTypes 会话类型列表
 * @param count 获取的数量
 * @param timestamp 会话的时间戳（获取这个时间戳之前的会话列表，0 表示从最新开始获取）会话类型
 * @param callback 回调函数
 */
function getConversationList(conversationTypes = [], count = 0, timestamp = 0, callback) {
    console.log(JSON.stringify(arguments));
    RCIMClient.getConversationList(conversationTypes, count, timestamp, callback);
}
/**
 * 从会话列表中移除某一会话，但是不删除会话内的消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function removeConversation(conversationType, targetId, callback) {
    RCIMClient.removeConversation(conversationType, targetId, callback);
}
/**
 * 设置会话消息提醒状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isBlock 是否屏蔽
 * @param callback 回调函数
 */
function setConversationNotificationStatus(conversationType, targetId, isBlock, callback) {
    RCIMClient.setConversationNotificationStatus(conversationType, targetId, isBlock, callback);
}
/**
 * 获取会话消息提醒状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getConversationNotificationStatus(conversationType, targetId, callback) {
    RCIMClient.getConversationNotificationStatus(conversationType, targetId, callback);
}
/**
 * 设置是否置顶会话
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isTop 是否置顶
 * @param callback 回调函数
 */
function setConversationToTop(conversationType, targetId, isTop, callback) {
    RCIMClient.setConversationToTop(conversationType, targetId, isTop, callback);
}
/**
 * 获取置顶会话列表
 *
 * @param conversationTypes 会话类型列表
 * @param callback 回调函数
 */
function getTopConversationList(conversationTypes = [], callback) {
    RCIMClient.getTopConversationList(conversationTypes, callback);
}
/**
 * 保存某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param content 草稿内容
 * @param callback 回调函数
 */
function saveTextMessageDraft(conversationType, targetId, content, callback) {
    RCIMClient.saveTextMessageDraft(conversationType, targetId, content, callback);
}
/**
 * 获取某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getTextMessageDraft(conversationType, targetId, callback) {
    RCIMClient.getTextMessageDraft(conversationType, targetId, callback);
}
/**
 * 清除某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function clearTextMessageDraft(conversationType, targetId, callback) {
    RCIMClient.clearTextMessageDraft(conversationType, targetId, callback);
}
/**
 * 获取所有未读消息数
 *
 * @param callback 回调函数
 */
function getTotalUnreadCount(callback) {
    RCIMClient.getTotalUnreadCount(callback);
}
/**
 * 获取指定会话的未读消息数
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
function getUnreadCount(conversationType, targetId = '', callback) {
    if (Array.isArray(conversationType)) {
        RCIMClient.getUnreadCount(0, '', conversationType, callback);
    }
    RCIMClient.getUnreadCount(conversationType, targetId, [], callback);
}
/**
 * 清除某个会话中的未读消息数
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param time 该会话已阅读的最后一条消息的发送时间戳
 * @param callback 回调函数
 */
function clearMessagesUnreadStatus(conversationType, targetId, time = 0, callback) {
    RCIMClient.clearMessagesUnreadStatus(conversationType, targetId, time, callback);
}
/**
 * 把用户加入黑名单
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
function addToBlacklist(userId, callback) {
    RCIMClient.addToBlacklist(userId, callback);
}
/**
 * 把用户从黑名单中移除
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
function removeFromBlacklist(userId, callback) {
    RCIMClient.removeFromBlacklist(userId, callback);
}
/**
 * 获取某用户是否在黑名单中
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
function getBlacklistStatus(userId, callback) {
    RCIMClient.getBlacklistStatus(userId, callback);
}
/**
 * 获取黑名单列表
 *
 * @param 回调函数
 */
function getBlacklist(callback) {
    RCIMClient.getBlacklist(callback);
}
/**
 * 加入聊天室，如果已存在，直接加入，否则创建并加入
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
function joinChatRoom(targetId, messageCount = 10, callback) {
    RCIMClient.joinChatRoom(targetId, messageCount, callback);
}
/**
 * 加入已存在的聊天室，如果不存在则加入失败
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
function joinExistChatRoom(targetId, messageCount = 10, callback) {
    RCIMClient.joinExistChatRoom(targetId, messageCount, callback);
}
/**
 * 退出聊天室
 *
 * @param targetId 聊天室 ID
 * @param callback 回调函数
 */
function quitChatRoom(targetId, callback) {
    RCIMClient.quitChatRoom(targetId, callback);
}
/**
 * 从服务器端获取聊天室的历史消息
 *
 * @param targetId 目标 ID
 * @param recordTime 起始的消息发送时间戳，单位毫秒
 * @param count 要获取的消息数量
 * @param order 拉取顺序
 * @param callback 回调函数
 */
function getRemoteChatRoomHistoryMessages(targetId, recordTime, count, order, callback) {
    RCIMClient.getRemoteChatRoomHistoryMessages(targetId, recordTime, count, order, callback);
}
/**
 * 获取聊天室信息
 *
 * @param targetId 聊天室 ID
 * @param memberCount 聊天室成员数量，最多获取 20 个
 * @param order 返回的聊天室成员排序方式
 * @param callback 回调函数
 */
function getChatRoomInfo(targetId, memberCount = 20, order = ChatRoomMemberOrder.ASC, callback) {
    RCIMClient.getChatRoomInfo(targetId, memberCount, order, callback);
}
/**
 * 全局屏蔽某个时间段的消息提醒
 *
 * @param startTime 开始屏蔽消息提醒的时间，格式为HH:MM:SS
 * @param spanMinutes 需要屏蔽消息提醒的分钟数，0 < spanMinutes < 1440
 * @param callback 回调函数
 */
function setNotificationQuietHours(startTime, spanMinutes, callback) {
    RCIMClient.setNotificationQuietHours(startTime, spanMinutes, callback);
}
/**
 * 查询已设置的全局时间段消息提醒屏蔽
 *
 * @param callback 回调函数
 */
function getNotificationQuietHours(callback) {
    RCIMClient.getNotificationQuietHours(callback);
}
/**
 * 删除已设置的全局时间段消息提醒屏蔽
 *
 * @param callback 回调函数
 */
function removeNotificationQuietHours(callback) {
    RCIMClient.removeNotificationQuietHours(callback);
}
/**
 * 获取离线消息在服务端的存储时间（以天为单位）
 */
function getOfflineMessageDuration(callback) {
    RCIMClient.getOfflineMessageDuration(callback);
}
/**
 * 设置离线消息在服务端的存储时间（以天为单位）
 *
 * @param callback 回调函数
 */
function setOfflineMessageDuration(duration, callback) {
    RCIMClient.setOfflineMessageDuration(duration, callback);
}
/**
 * 获取当前用户 ID
 *
 * @param callback 回调函数
 */
function getCurrentUserId(callback) {
    RCIMClient.getCurrentUserId(callback);
}
/**
 * 设置推送语言
 *
 * @param language 推送语言
 * @param callback 回调函数
 */
function setPushLanguageCode(language, callback) {
    RCIMClient.setPushLanguageCode(language, callback);
}
/**
 * 设置是否显示内容详情
 *
 * @param isShowPushContent 是否显示内容详情
 * @param callback 回调函数
 */
function setPushContentShowStatus(isShowPushContent, callback) {
    RCIMClient.setPushContentShowStatus(isShowPushContent, callback);
}
/**
 * 查询是否显示内容详情
 *
 * @param callback 回调函数
 */
function getPushContentShowStatus(callback) {
    RCIMClient.getPushContentShowStatus(callback);
}
/**
 * 设置推送配置（仅安卓）
 * @param config 推送配置
 */
function setPushConfig(config) {
    RCIMClient.setPushConfig(config);
}

export { ChatRoomMemberOrder, ConnectErrorCode, ConnectionStatusAndroid, ConnectionStatusIOS, ConversationType, CustomMessageType, ErrorCode, MentionedType, MessageDirection, MessageObjectNames, ObjectName, PublicServiceMenuItemType, PublicServiceType, PushLanguage, RealTimeLocationStatus, ResponseType, SearchType, SentStatus, TimestampOrder, addConnectionStatusListener, addLogInfoListener, addReadReceiptReceivedListener, addRecallMessageListener, addReceiptRequestListener, addReceiptResponseListener, addReceiveMessageListener, addToBlacklist, addTypingStatusListener, cancelDownloadMediaMessage, cancelSendMediaMessage, cleanHistoryMessages, cleanRemoteHistoryMessages, clearConnectionStatusListener, clearLogInfoListener, clearMessages, clearMessagesUnreadStatus, clearReadReceiptReceivedListener, clearRecallMessageListener, clearReceiptRequestListener, clearReceiptResponseListener, clearReceiveMessageListener, clearTextMessageDraft, clearTypingStatusListener, connect, deleteMessages, deleteMessagesByIds, disconnect, downloadMediaMessage, getBlacklist, getBlacklistStatus, getBlockedConversationList, getChatRoomInfo, getConnectionStatus, getConversation, getConversationList, getConversationNotificationStatus, getCurrentUserId, getFirstUnreadMessage, getHistoryMessages, getHistoryMessagesByTimestamp, getMessage, getMessageByUId, getMessageCount, getMessageSendTime, getNotificationQuietHours, getOfflineMessageDuration, getPushContentShowStatus, getRemoteChatRoomHistoryMessages, getRemoteHistoryMessages, getTextMessageDraft, getTopConversationList, getTotalUnreadCount, getUnreadCount, getUnreadMentionedMessages, init, initWithSetup, insertIncomingMessage, insertOutgoingMessage, joinChatRoom, joinExistChatRoom, quitChatRoom, recallMessage, removeConversation, removeFromBlacklist, removeNotificationQuietHours, saveTextMessageDraft, searchConversations, searchMessages, searchMessagesByUserId, sendDirectionalMessage, sendMediaMessage, sendMessage, sendReadReceiptMessage, sendReadReceiptRequest, sendReadReceiptResponse, sendTypingStatus, setConversationNotificationStatus, setConversationToTop, setMessageExtra, setMessageReceivedStatus, setMessageSentStatus, setNotificationQuietHours, setOfflineMessageDuration, setPushConfig, setPushContentShowStatus, setPushLanguageCode, setReconnectKickEnable, setServerInfo, setStatisticServer, syncConversationReadStatus };
