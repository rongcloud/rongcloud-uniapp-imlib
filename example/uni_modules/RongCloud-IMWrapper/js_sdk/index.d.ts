/*
 * RCIMLibUni - v5.1.3-release.4
 * CommitId - feed3f0f61dd39b78c4d0a5b5bdb387ad3bb003e
 * Tue Mar 22 2022 15:58:58 GMT+0800 (中国标准时间)
 * ©2020 RongCloud, Inc. All rights reserved.
 */
/**
 * 消息方向
 */
declare enum MessageDirection {
    SEND = 1,
    RECEIVE = 2
}
/**
 * 会话类型
 */
declare enum ConversationType {
    PRIVATE = 1,
    DISCUSSION = 2,
    GROUP = 3,
    CHATROOM = 4,
    CUSTOMER_SERVICE = 5,
    SYSTEM = 6,
    APP_SERVICE = 7,
    PUBLIC_SERVICE = 8,
    PUSH_SERVICE = 9
}
/**
 * 发送状态
 */
declare enum SentStatus {
    SENDING = 10,
    FAILED = 20,
    SENT = 30,
    RECEIVED = 40,
    READ = 50,
    DESTROYED = 60,
    CANCELED = 70
}
/**
 * 用户信息
 */
interface UserInfo {
    userId: string;
    name: string;
    portraitUrl: string;
}
/**
 * 消息提醒类型
 */
declare enum MentionedType {
    /**
     * 提醒所有
     */
    ALL = 1,
    /**
     * 部分提醒
     */
    PART = 2
}
/**
 * 提醒信息
 */
interface MentionedInfo {
    type: MentionedType;
    userIdList: string[];
    mentionedContent: string;
}
/**
 * 消息对象名称
 */
declare enum ObjectName {
    /**
     * 文本消息
     */
    Text = "RC:TxtMsg",
    /**
     * 文件消息
     */
    File = "RC:FileMsg",
    /**
     * 图片消息
     */
    Image = "RC:ImgMsg",
    /**
     * GIF 图片消息
     */
    GIF = "RC:GIFMsg",
    /**
     * 位置信息
     */
    Location = "RC:LBSMsg",
    /**
     * 语音消息
     */
    Voice = "RC:VcMsg",
    /**
     * 高质量语音消息
     */
    HQVoice = "RC:HQVCMsg",
    /**
     * 小视频消息
     */
    Sight = "RC:SightMsg",
    /**
     * 命令消息
     */
    Command = "RC:CmdMsg",
    /**
     * 公众服务单图文消息
     */
    PublicServiceRich = "RC:PSImgTxtMsg",
    /**
     * 公众服务多图文消息
     */
    PublicServiceMultiRich = "RC:PSMultiImgTxtMsg",
    /**
     * 好友通知消息
     */
    ContactNotification = "RC:ContactNtf",
    /**
     * 资料通知消息
     */
    ProfileNotification = "RC:ProfileNtf",
    /**
     * 通用命令通知消息
     */
    CommandNotification = "RC:CmdNtf",
    /**
     * 提示条通知消息
     */
    InformationNotification = "RC:InfoNtf",
    /**
     * 群组通知消息
     */
    GroupNotification = "RC:GrpNtf",
    /**
     * 已读通知消息
     */
    ReadReceipt = "RC:ReadNtf",
    /**
     * 公众服务命令消息
     */
    PublicServiceCommand = "RC:PSCmd",
    /**
     * 对方正在输入状态消息
     */
    TypingStatus = "RC:TypSts",
    /**
     * 群消息已读状态回执
     */
    ReadReceiptResponse = "RC:RRRspMsg"
}
/**
 * 消息内容
 */
interface MessageContent {
    /**
     * 消息对象名称
     */
    objectName?: ObjectName;
    /**
     * 用户信息
     */
    userInfo?: UserInfo;
    /**
     * 提醒信息
     */
    mentionedInfo?: MentionedInfo;
}
interface RCAndroidPushConfig {
    miAppId?: string;
    miAppKey?: string;
    meizuAppId?: string;
    meizuAppKey?: string;
    oppoAppKey?: string;
    oppoAppSecret?: string;
}
interface RCIMEngineSetup {
    naviServer?: string;
    fileServer?: string;
    statisticServer?: string;
    appVersion?: string;
    androidPushConfig?: RCAndroidPushConfig;
}
/**
 * 自定义消息类型
 */
declare enum CustomMessageType {
    /**
     * 命令消息，不存储、不计入未读计数
     */
    COMMAND = 0,
    /**
     * 存储消息，存储、不计入未读计数
     */
    STORAGE = 1,
    /**
     * 普通消息，存储、计入未读计数
     */
    NORMAL = 2,
    /**
     * 状态消息，不存储不计数
     */
    STATUS = 3
}
/**
 * 自定义消息，不支持自定义媒体类型消息.
 * 使用自定义消息，必须设置 type 指明自定义消息类型，另外还必须设置 objectName ，指明消息对象名称
 */
interface CustomMessage extends MessageContent {
    /**
     * 发送自定义消息，需要设置类型
     */
    customType: CustomMessageType;
    /**
     * 自定义消息数据集合
     */
    customFields: {
        [key: string]: string;
    };
}
/**
 * 消息对象名称枚举
 */
declare enum MessageObjectNames {
    text = "RC:TxtMsg",
    image = "RC:ImgMsg",
    file = "RC:FileMsg",
    location = "RC:LocMsg",
    voice = "RC:VcMsg"
}
/**
 * 文本消息
 */
interface TextMessage extends MessageContent {
    objectName: ObjectName.Text;
    content: string;
    extra?: string;
}
/**
 * 图片消息
 */
interface ImageMessage extends MessageContent {
    objectName: ObjectName.Image;
    local: string;
    remote?: string;
    thumbnail?: string;
    isFull?: string;
    extra?: string;
}
/**
 * GIF 图片消息
 */
interface GIFMessage extends MessageContent {
    objectName: ObjectName.GIF;
    local: string;
    remote?: string;
    width: number;
    height: number;
    gifDataSize: number;
    extra?: string;
}
/**
 * 文件消息
 */
interface FileMessage extends MessageContent {
    objectName: ObjectName.File;
    local: string;
    remote?: string;
    name?: string;
    size?: number;
    fileType?: string;
    extra?: string;
}
/**
 * 小视频信息
 */
interface SightMessage extends MessageContent {
    objectName: ObjectName.Sight;
    local: string;
    remote?: string;
    thumbnail?: string;
    name?: string;
    base64?: string;
    size?: number;
    duration: number;
    extra?: string;
}
/**
 * 位置消息
 */
interface LocationMessage extends MessageContent {
    objectName: ObjectName.Location;
    name: string;
    latitude: number;
    longitude: number;
    thumbnail?: string;
    extra?: string;
}
/**
 * 语音消息
 */
interface VoiceMessage extends MessageContent {
    objectName: ObjectName.Voice;
    local: string;
    duration: number;
}
/**
 * 高质量语音消息
 */
interface HQVoiceMessage extends MessageContent {
    objectName: ObjectName.HQVoice;
    local: string;
    remote?: string;
    duration: number;
}
/**
 * 命令消息
 */
interface CommandMessage extends MessageContent {
    objectName: ObjectName.Command;
    name: string;
    data: string;
}
/**
 * 命令通知消息
 */
interface CommandNotificationMessage extends MessageContent {
    objectName: ObjectName.CommandNotification;
    name: string;
    data: string;
}
/**
 * 好友通知消息
 */
interface ContactNotificationMessage extends MessageContent {
    objectName: ObjectName.ContactNotification;
    sourceUserId: string;
    targetUserId: string;
    message: string;
    operation: string;
    extra: string;
}
/**
 * 资料通知消息
 */
interface ProfileNotificationMessage extends MessageContent {
    objectName: ObjectName.ProfileNotification;
    data: string;
    operation: string;
    extra: string;
}
/**
 * 提示条通知消息
 */
interface InfomationNotificationMessage extends MessageContent {
    objectName: ObjectName.InformationNotification;
    message: string;
    extra: string;
}
/**
 * 群组通知消息
 */
interface GroupNotificationMessage extends MessageContent {
    objectName: ObjectName.GroupNotification;
    /**
     * 群组通知的操作名称
     */
    operation: string;
    /**
     * 操作者 ID
     */
    operatorUserId: string;
    /**
     * 操作数据
     */
    data: string;
    /**
     * 消息内容
     */
    message: string;
    /**
     * 额外数据
     */
    extra: string;
}
/**
 * 已读通知消息
 */
interface ReadReceiptMessage extends MessageContent {
    objectName: ObjectName.ReadReceipt;
    type: number;
    messageUId: string;
    lastMessageSendTime: number;
}
/**
 * 已读通知消息
 */
interface PublicServiceCommandMessage extends MessageContent {
    objectName: ObjectName.PublicServiceCommand;
    extra: string;
}
/**
 * 撤回通知消息
 */
interface RecallNotificationMessage extends MessageContent {
    /**
     * 撤回消息的用户 ID
     */
    operatorId: string;
    /**
     * 撤回时间
     */
    recallTime: number;
    /**
     * 原消息对象名称
     */
    originalObjectName: string;
    /**
     * 是否管理员操作
     */
    isAdmin: string;
}
/**
 * 输入状态消息
 */
interface TypingStatusMessage extends MessageContent {
    objectName: ObjectName.TypingStatus;
    data: string;
    typingContentType: string;
}
/**
 * 消息
 */
interface Message {
    /**
     * 会话类型
     */
    conversationType: ConversationType;
    /**
     * 消息对象名称
     */
    objectName: string;
    /**
     * 消息 ID
     */
    messageId: number;
    /**
     * 消息 UID
     */
    messageUId: string;
    /**
     * 消息方向
     */
    messageDirection: MessageDirection;
    /**
     * 发送者 ID
     */
    senderUserId: string;
    /**
     * 发送时间
     */
    sentTime: number;
    /**
     * 目标 ID
     */
    targetId: string;
    /**
     * 消息接收时间
     */
    receivedTime: number;
    /**
     * 消息内容
     */
    content: MessageContent;
    /**
     * 附加信息
     */
    extra?: string;
}
/**
 * 收到的消息
 */
interface ReceiveMessage {
    /**
     * 消息数据
     */
    message: Message;
    /**
     * 剩余未接收的消息数量
     */
    left: number;
}
/**
 * 连接错误代码
 */
declare enum ConnectErrorCode {
    RC_SUCCESS = 0,
    RC_NET_CHANNEL_INVALID = 30001,
    RC_NET_UNAVAILABLE = 30002,
    RC_NAVI_REQUEST_FAIL = 30004,
    RC_NAVI_RESPONSE_ERROR = 30007,
    RC_NODE_NOT_FOUND = 30008,
    RC_SOCKET_NOT_CONNECTED = 30010,
    RC_SOCKET_DISCONNECTED = 30011,
    RC_PING_SEND_FAIL = 30012,
    RC_PONG_RECV_FAIL = 30013,
    RC_MSG_SEND_FAIL = 30014,
    RC_CONN_OVERFREQUENCY = 30015,
    RC_CONN_ACK_TIMEOUT = 31000,
    RC_CONN_PROTO_VERSION_ERROR = 31001,
    RC_CONN_ID_REJECT = 31002,
    RC_CONN_SERVER_UNAVAILABLE = 31003,
    RC_CONN_TOKEN_INCORRECT = 31004,
    RC_CONN_NOT_AUTHRORIZED = 31005,
    RC_CONN_REDIRECTED = 31006,
    RC_CONN_PACKAGE_NAME_INVALID = 31007,
    RC_CONN_APP_BLOCKED_OR_DELETED = 31008,
    RC_CONN_USER_BLOCKED = 31009,
    RC_DISCONN_KICK = 31010,
    RC_CONN_OTHER_DEVICE_LOGIN = 31023,
    RC_CONN_REFUSED = 32061,
    RC_CLIENT_NOT_INIT = 33001,
    RC_INVALID_PARAMETER = 33003,
    RC_CONNECTION_EXIST = 34001,
    RC_BACKGROUND_CONNECT = 34002,
    RC_INVALID_ARGUMENT = -1000
}
/**
 * 错误代码
 */
declare enum ErrorCode {
    PARAMETER_ERROR = -3,
    ERRORCODE_UNKNOWN = -1,
    REJECTED_BY_BLACKLIST = 405,
    ERRORCODE_TIMEOUT = 5004,
    SEND_MSG_FREQUENCY_OVERRUN = 20604,
    NOT_IN_DISCUSSION = 21406,
    NOT_IN_GROUP = 22406,
    FORBIDDEN_IN_GROUP = 22408,
    NOT_IN_CHATROOM = 23406,
    FORBIDDEN_IN_CHATROOM = 23408,
    KICKED_FROM_CHATROOM = 23409,
    CHATROOM_NOT_EXIST = 23410,
    CHATROOM_IS_FULL = 23411,
    PARAMETER_INVALID_CHATROOM = 23412,
    ROAMING_SERVICE_UNAVAILABLE_CHATROOM = 23414,
    CHANNEL_INVALID = 30001,
    NETWORK_UNAVAILABLE = 30002,
    MSG_RESPONSE_TIMEOUT = 30003,
    CLIENT_NOT_INIT = 33001,
    DATABASE_ERROR = 33002,
    INVALID_PARAMETER = 33003,
    MSG_ROAMING_SERVICE_UNAVAILABLE = 33007,
    INVALID_PUBLIC_NUMBER = 29201,
    MSG_SIZE_OUT_OF_LIMIT = 30016,
    RECALLMESSAGE_PARAMETER_INVALID = 25101,
    PUSHSETTING_PARAMETER_INVALID = 26001,
    OPERATION_BLOCKED = 20605,
    OPERATION_NOT_SUPPORT = 20606,
    MSG_BLOCKED_SENSITIVE_WORD = 21501,
    MSG_REPLACED_SENSITIVE_WORD = 21502,
    SIGHT_MSG_DURATION_LIMIT_EXCEED = 34002
}
/**
 * iOS 连接状态
 */
declare enum ConnectionStatusIOS {
    UNKNOWN = -1,
    Connected = 0,
    NETWORK_UNAVAILABLE = 1,
    AIRPLANE_MODE = 2,
    Cellular_2G = 3,
    Cellular_3G_4G = 4,
    WIFI = 5,
    KICKED_OFFLINE_BY_OTHER_CLIENT = 6,
    LOGIN_ON_WEB = 7,
    SERVER_INVALID = 8,
    VALIDATE_INVALID = 9,
    Connecting = 10,
    Unconnected = 11,
    SignUp = 12,
    TOKEN_INCORRECT = 31004,
    DISCONN_EXCEPTION = 31011
}
/**
 * Android 连接状态
 */
declare enum ConnectionStatusAndroid {
    NETWORK_UNAVAILABLE = -1,
    CONNECTED = 0,
    CONNECTING = 1,
    DISCONNECTED = 2,
    KICKED_OFFLINE_BY_OTHER_CLIENT = 3,
    TOKEN_INCORRECT = 4,
    SERVER_INVALID = 5
}
/**
 * 连接状态
 */
declare type ConnectionStatus = ConnectionStatusIOS | ConnectionStatusAndroid;
interface ConnectionListenerResult {
    status: ConnectionStatus;
}
declare enum ResponseType {
    SUCCESS = "success",
    ERROR = "error",
    CANCEL = "cancel",
    PROGRESS = "progress"
}
/**
 * 连接回调
 */
interface ConnectResult {
    code: ConnectErrorCode;
    userId?: number;
}
/**
 * 监听日志回调参数
 */
interface LogInfoResult {
    logInfo: string;
}
/**
 * 监听撤回消息回调参数
 */
interface RecallMessageResult {
    messageId: number;
}
/**
 * uni监听
 */
interface UniListenerResult<T> {
    type: string;
    module: string;
    data: T;
}
/**
 * 要发送的消息
 */
interface SentMessage {
    /**
     * 会话类型
     */
    conversationType: ConversationType;
    /**
     * 目标 ID
     */
    targetId: string;
    /**
     * 消息内容
     */
    content: MessageContent;
    /**
     * 推送内容，用于显示
     */
    pushContent: string;
    /**
     * 推送数据，不显示
     */
    pushData: string;
}
interface SendMessageResult extends BaseResult {
    messageId?: number;
}
interface SendRecallMessageResult extends BaseResult {
    message?: RecallNotificationMessage;
}
interface BaseResult {
    code: number;
}
interface MessageListResult extends BaseResult {
    messages?: Message[];
}
interface MessageResult extends BaseResult {
    message?: Message;
}
interface ConversationResult extends BaseResult {
    conversation?: Conversation;
}
interface ConversationListResult extends BaseResult {
    conversations?: Conversation[];
}
interface statusResult extends BaseResult {
    status?: number;
}
interface DraftResult extends BaseResult {
    draft?: string;
}
interface CountResult extends BaseResult {
    count?: number;
}
interface ChatRoomInfoResult extends BaseResult {
    chatRoomInfo?: ChatRoomInfo;
}
/**
 * 搜索会话结果
 */
interface SearchConversationResult extends BaseResult {
    result?: {
        conversation: Conversation;
        matchCount: number;
    };
}
/**
 * 会话信息
 */
interface Conversation {
    conversationType: ConversationType;
    conversationTitle: string;
    isTop: boolean;
    unreadMessageCount: number;
    draft: string;
    targetId: string;
    objectName: string;
    latestMessageId: number;
    latestMessage: MessageContent;
    receivedStatus: number;
    receivedTime: number;
    sentStatus: SentStatus;
    senderUserId: string;
    hasUnreadMentioned: boolean;
    mentionedCount: number;
}
/**
 * 搜索类型
 */
declare enum SearchType {
    /**
     * 精准
     */
    EXACT = 0,
    /**
     * 模糊
     */
    FUZZY = 1
}
/**
 * 公共服务类型
 */
declare enum PublicServiceType {
    /**
     * 应用公众服务
     */
    APP_PUBLIC_SERVICE = 7,
    /**
     * 公共服务号
     */
    PUBLIC_SERVICE = 8
}
/**
 * 公众服务菜单类型
 */
declare enum PublicServiceMenuItemType {
    /**
     * 作为分组包含子菜单的菜单
     */
    GROUP = 0,
    /**
     * 查看事件菜单
     */
    VIEW = 1,
    /**
     * 点击事件菜单
     */
    CLICK = 2
}
/**
 * 公众服务菜单项
 */
interface PublicServiceMenuItem {
    /**
     * 菜单项 ID
     */
    id: string;
    /**
     * 菜单项名称
     */
    name: string;
    /**
     * 菜单项 URL
     */
    url: string;
    /**
     * 菜单项类型
     */
    type: PublicServiceMenuItemType;
}
/**
 * 公众服务描述
 */
interface PublicServiceProfile {
    id: string;
    /**
     * 服务名称
     */
    name: string;
    /**
     * 服务描述
     */
    introduction: string;
    /**
     * 头像连接
     */
    portraitUrl: string;
    /**
     * 是否设置为所有用户均关注
     */
    isGlobal: boolean;
    /**
     * 用户是否已关注
     */
    followed: boolean;
    /**
     * 类型
     */
    type: PublicServiceType | ConversationType;
    /**
     * 菜单
     */
    menu: PublicServiceMenuItem[];
}
/**
 * 输入状态
 */
interface TypingStatus {
    conversationType: ConversationType;
    targetId: string;
    userId: string;
    typingContentType: string;
}
/**
 * 消息已读回执
 */
interface ReadReceipt {
    conversationType: ConversationType;
    targetId: string;
    messageTime: number;
}
/**
 * 消息回执请求信息
 */
interface ReceiptRequest {
    conversationType: ConversationType;
    targetId: string;
    messageUId: string;
}
/**
 * 消息回执响应信息
 */
interface ReceiptResponse {
    conversationType: ConversationType;
    targetId: string;
    messageUId: string;
    users: {
        [key: string]: number;
    };
}
/**
 * 时间戳排序方式
 */
declare enum TimestampOrder {
    /**
     * 按时间戳倒序排序
     */
    DESC = 0,
    /**
     * 按时间戳顺序排序
     */
    ASC = 1
}
/**
 * 聊天室成员排序，按加入时间
 */
declare enum ChatRoomMemberOrder {
    /**
     * 生序
     */
    ASC = 1,
    /**
     * 降序
     */
    DESC = 2
}
/**
 * 聊天室成员信息
 */
interface MemberInfo {
    userId: string;
    joinTime: number;
}
/**
 * 聊天室信息
 */
interface ChatRoomInfo {
    targetId: string;
    memberOrder: ChatRoomMemberOrder;
    totalMemberCount: number;
    members: MemberInfo[];
}
/**
 * 讨论组
 */
interface Discussion {
    id: string;
    name: string;
    creatorId: string;
    memberIdList: string[];
    isOpen: boolean;
}
/**
 * 实时位置共享状态
 */
declare enum RealTimeLocationStatus {
    /**
     * 初始状态
     */
    IDLE = 0,
    /**
     * 接收状态
     */
    INCOMING = 1,
    /**
     * 发起状态
     */
    OUTGOING = 2,
    /**
     * 已连接，正在共享的状态
     */
    CONNECTED = 3
}
/**
 * 推送语言
 */
declare enum PushLanguage {
    EN_US = "en_US",
    ZH_CN = "zh_CN",
    AR_SA = "ar_SA"
}
/**
 * 推送提醒消息
 */
interface PushNotificationMessage {
    pushType: string;
    pushId: string;
    pushTitle: string;
    pushFlag: string;
    pushContent: string;
    pushData: string;
    objectName: string;
    senderId: string;
    senderName: string;
    senderPortraitUrl: string;
    targetId: string;
    targetUserName: string;
    conversationType: ConversationType;
    extra: string;
}
/**
 * 推送配置
 */
interface PushConfig {
    FCM: boolean;
    HW: boolean;
    VIVO: boolean;
    MI: {
        MI_PUSH_APPID: string;
        MI_PUSH_APPKEY: string;
    };
    MEIZU: {
        MEIZU_PUSH_APPID: string;
        MEIZU_PUSH_APPKEY: string;
    };
    OPPO: {
        OPPO_PUSH_APPID: string;
        OPPO_PUSH_APPKEY: string;
    };
}
/**
 * 发送进度消息回调
 */
interface SentProgressMessageCallback {
    success?: (messageId: number) => void;
    progress?: (progress: number, messageId: number) => void;
    cancel?: (messageId: number) => void;
    error?: (errorCode: ErrorCode, messageId: number) => void;
}
/**
 * 发送进度消息回调参数
*/
interface ProgressMessageResult {
    type: ResponseType;
    eventId: string;
    messageId: number;
    progress: number;
    errorCode: number;
}

/**
 * 初始化 SDK，只需要调用一次
 *
 * @param appKey 从融云开发者平台创建应用后获取到的 App Key
 */
declare function init(appKey: string): void;
/**
 * 初始化 SDK，只需要调用一次
 * @param appKey 从融云开发者平台创建应用后获取到的 App Key
 * @param engineSetup 引擎初始化配置参数
 */
declare function initWithSetup(appKey: string, engineSetup: RCIMEngineSetup): void;
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
declare function connect(token: string, callback: (result: ConnectResult) => void): void;
/**
 * 断开与融云服务器的连接
 *
 * @param isReceivePush 是否还接收推送
 */
declare function disconnect(isReceivePush?: boolean): void;
/**
 * 添加连接状态监听函数
 *
 * @param listener 回调函数
 */
declare function addConnectionStatusListener(listener: (result: UniListenerResult<ConnectionListenerResult>) => void): void;
/**
 * 清除连接状态监听函数
 *
 */
declare function clearConnectionStatusListener(): void;
/**
 * 添加日志信息监听函数
 *
 * @param listener
 */
declare function addLogInfoListener(listener: (result: UniListenerResult<LogInfoResult>) => void): void;
/**
 * 清除日志信息监听函数
 *
 */
declare function clearLogInfoListener(): void;
/**
 * 添加消息撤回监听函数
 *
 * @param listener
 */
declare function addRecallMessageListener(listener: (result: UniListenerResult<RecallMessageResult>) => void): void;
/**
 * 添加消息撤回监听函数
 *
 */
declare function clearRecallMessageListener(): void;
/**
 * 添加消息监听函数
 *
 * @param listener
 */
declare function addReceiveMessageListener(listener: (result: UniListenerResult<ReceiveMessage>) => void): void;
/**
 * 清除消息监听函数
 *
 */
declare function clearReceiveMessageListener(): void;
/**
 * 添加输入状态监听函数
 *
 * @param listener
 */
declare function addTypingStatusListener(listener: (result: UniListenerResult<TypingStatus>) => void): void;
/**
 * 清除输入状态监听函数
 *
 */
declare function clearTypingStatusListener(): void;
/**
 * 添加推送消息到达监听函数
 *
 * @param listener
 */
/**
 * 同步会话阅读状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已读的最后一条消息的发送时间戳，必须是有效的时间戳
 * @param callback 回调函数
 */
declare function syncConversationReadStatus(conversationType: ConversationType, targetId: string, timestamp: number, callback: (result: BaseResult) => void): void;
/**
 * 设置 deviceToken，用于远程推送
 *
 * @param deviceToken 从系统获取到的设备号 deviceToken（需要去掉空格和尖括号）
 *
 *   deviceToken是系统提供的，从苹果服务器获取的，用于APNs远程推送必须使用的设备唯一值。
 *   您需要将 `-application:didRegisterForRemoteNotificationsWithDeviceToken:`
 *   获取到的deviceToken，转为NSString类型，并去掉其中的空格和尖括号，作为参数传入此方法。
 */
/**
 * 设置导航服务器和上传文件服务器信息，要在 [[init]] 前使用
 *
 * @param naviServer 导航服务器地址
 * @param fileServer 文件服务器地址
 */
declare function setServerInfo(naviServer: string, fileServer: string): void;
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
declare function setStatisticServer(server: string): void;
/**
 * 获取当前连接状态
 *
 * @param callback 回调函数
 */
declare function getConnectionStatus(callback: (result: {
    status: ConnectionStatus;
}) => {}): void;
/**
 * 发送消息
 *
 * @param message 消息
 * @param callback 回调函数
 */
declare function sendMessage(message: SentMessage, callback: (result: SendMessageResult) => {}): void;
/**
 * 发送媒体消息
 *
 * @param message 消息
 * @param callback 回调函数
 */
declare function sendMediaMessage(message: SentMessage, callback?: SentProgressMessageCallback): void;
/**
 * 发送定向消息
 *
 * @param message 消息
 * @param userIdList 用户 ID 列表
 * @param callback 回调函数
 */
declare function sendDirectionalMessage(message: SentMessage, userIdList: string[], callback: (result: SendMessageResult) => {}): void;
/**
 * 消息撤回
 *
 * @param messageId 消息 ID
 * @param pushContent 推送内容
 * @param callback 回调函数
 */
declare function recallMessage(messageId: number, pushContent: string | undefined, callback: (message: SendRecallMessageResult) => void): void;
/**
 * 发送输入状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param typingContentType 输入内容类型
 */
declare function sendTypingStatus(conversationType: ConversationType, targetId: string, typingContentType: ObjectName): void;
/**
 * 设置消息发送状态
 *
 * @param messageId 消息 ID
 * @param status 状态
 * @param callback 回调函数
 */
declare function setMessageSentStatus(messageId: number, status: SentStatus, callback: (result: {
    code: number;
}) => {}): any;
/**
 * 设置消息接收状态
 *
 * @param messageId 消息 ID
 * @param status 状态
 * @param callback 回调函数
 */
declare function setMessageReceivedStatus(messageId: number, status: number, callback: (result: {
    code: number;
}) => {}): any;
/**
 * 获取屏蔽消息提醒的会话列表
 *
 * @param conversationTypeList 消息类型列表会话类型
 * @param callback 回调函数
 */
declare function getBlockedConversationList(conversationTypeList: ConversationType[], callback: (result: ConversationListResult) => void): void;
/**
 * 发送阅读回执
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param timestamp 该会话中已阅读点最后一条消息的发送时间戳
 */
declare function sendReadReceiptMessage(conversationType: ConversationType, targetId: string, timestamp: number): void;
/**
 * 发起群组消息回执请求
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
declare function sendReadReceiptRequest(messageId: number, callback: (result: BaseResult) => void): void;
/**
 * 发起群组消息回执响应
 *
 * @param conversationType 会话类型
 * @param targetId 会话 ID
 * @param messages 回执的消息列表
 * @param callback 回调函数
 */
declare function sendReadReceiptResponse(conversationType: ConversationType, targetId: string, messages: Message[], callback: (result: BaseResult) => void): void;
/**
 * 添加私聊阅读回执监听函数
 */
declare function addReadReceiptReceivedListener(listener: (message: UniListenerResult<ReadReceipt>) => void): void;
/**
 * 清除私聊阅读回执监听函数
 */
declare function clearReadReceiptReceivedListener(): void;
/**
 * 添加收到消息已读回执请求监听函数
 *
 * 收到此请求后，如果用户阅读了对应的消息，需要调用
 * sendMessageReadReceiptResponse 接口发送已读响应
 */
declare function addReceiptRequestListener(listener: (data: UniListenerResult<ReceiptRequest>) => void): void;
/**
 * 清除收到消息已读回执请求监听函数
 *
 */
declare function clearReceiptRequestListener(): void;
/**
 * 添加消息回执响应监听函数
 *
 * @param listener
 */
declare function addReceiptResponseListener(listener: (data: UniListenerResult<ReceiptResponse>) => void): void;
/**
 * 添加消息回执响应监听函数
 *
 */
declare function clearReceiptResponseListener(): void;
/**
 * 取消发送中的媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
declare function cancelSendMediaMessage(messageId: number, callback: (result: BaseResult) => void): void;
/**
 * 取消下载中的媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
declare function cancelDownloadMediaMessage(messageId: number, callback: (result: BaseResult) => void): void;
interface MediaMessageCallback {
    progress?: (progress: number) => void;
    success?: (path: string) => void;
    error?: (errorCode: number) => void;
    cancel?: () => void;
}
/**
 * 下载媒体消息
 *
 * @param messageId 消息 ID
 * @param callback 回调
 */
declare function downloadMediaMessage(messageId: number, callback?: MediaMessageCallback): void;
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
declare function setReconnectKickEnable(enabled: boolean): void;
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
declare function getHistoryMessages(conversationType: ConversationType, targetId: string, objectName: string | undefined, baseMessageId: number | undefined, count: number | undefined, isForward: boolean | undefined, callback: (result: MessageListResult) => void): void;
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
declare function getHistoryMessagesByTimestamp(conversationType: ConversationType, targetId: string, objectNames: ObjectName[], timestamp: number | undefined, count: number | undefined, isForward: boolean | undefined, callback: (result: MessageListResult) => void): void;
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
declare function insertOutgoingMessage(conversationType: ConversationType, targetId: string, sentStatus: SentStatus, messageContent: MessageContent, sentTime: number | undefined, callback: (result: MessageResult) => void): any;
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
declare function insertIncomingMessage(conversationType: ConversationType, targetId: string, senderUserId: string, receivedStatus: number, messageContent: MessageContent, sentTime: number | undefined, callback: (result: MessageResult) => void): void;
/**
 * 清空某一会话的所有消息
 *
 * @param conversationType
 * @param targetId
 * @param callback 回调函数
 */
declare function clearMessages(conversationType: ConversationType, targetId: string, callback: (result: BaseResult) => void): void;
/**
 * 根据消息 ID 删除消息
 *
 * @param ids 消息 ID 列表
 * @param callback 回调函数
 */
declare function deleteMessagesByIds(ids: number[], callback: (result: BaseResult) => void): void;
/**
 * 根据会话删除消息
 *
 * @param type 会话类型
 * @param targetId 会话 ID
 * @param callback 回调函数
 */
declare function deleteMessages(type: ConversationType, targetId: string | undefined, callback: (result: BaseResult) => void): void;
/**
 * 根据关键字搜索会话
 *
 * @param keyword 关键字
 * @param conversationTypes 会话类型数组
 * @param objectNames 对象名称数组
 * @param callback 回调函数
 */
declare function searchConversations(keyword: string, conversationTypes: ConversationType[], objectNames: ObjectName[], callback: (result: SearchConversationResult) => void): void;
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
declare function searchMessages(conversationType: ConversationType, targetId: string, keyword: string, count: number, startTime: number | undefined, callback: (result: MessageListResult) => void): void;
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
declare function searchMessagesByUserId(conversationType: ConversationType, targetId: string, userId: string, count: number, startTime: number | undefined, callback: (result: MessageListResult) => void): void;
/**
 * 获取消息
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
declare function getMessage(messageId: number, callback: (result: MessageResult) => void): void;
/**
 * 根据消息 UID 获取消息
 *
 * @param messageUId 消息 UID
 * @param callback 回调函数
 */
declare function getMessageByUId(messageUId: string, callback: (result: MessageResult) => void): void;
/**
 * 设置消息的附加信息
 *
 * @param messageId 消息 ID
 * @param extra 附加信息
 * @param callback 回调函数
 */
declare function setMessageExtra(messageId: number, extra: string, callback: (result: BaseResult) => void): void;
/**
 * 获取消息发送时间
 *
 * @param messageId 消息 ID
 * @param callback 回调函数
 */
declare function getMessageSendTime(messageId: number, callback: (result: number) => void): void;
/**
 * 获取会话中的消息数量
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getMessageCount(conversationType: ConversationType, targetId: string, callback: (result: {
    code: number;
    count?: number;
}) => void): void;
/**
 * 获取会话里第一条未读消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getFirstUnreadMessage(conversationType: ConversationType, targetId: string, callback: (result: MessageResult) => void): void;
/**
 * 获取会话中 @ 提醒自己的消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getUnreadMentionedMessages(conversationType: ConversationType, targetId: string, callback: (messages: MessageListResult) => void): void;
/**
 * 获取服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param sentTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param count 删除数量
 * @param callback 回调函数
 */
declare function getRemoteHistoryMessages(conversationType: ConversationType, targetId: string, sentTime: number, count: number, callback: (result: MessageListResult) => void): void;
/**
 * 清除服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param callback 回调函数
 */
declare function cleanRemoteHistoryMessages(conversationType: ConversationType, targetId: string, recordTime: number, callback: (result: BaseResult) => void): void;
/**
 * 清除历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param recordTime 清除消息截止时间戳，为 0 则清除会话所有服务端历史消息
 * @param clearRemote 是否同时删除服务端消息
 * @param callback 回调函数
 */
declare function cleanHistoryMessages(conversationType: ConversationType, targetId: string, recordTime: number, clearRemote: boolean, callback: (result: BaseResult) => void): void;
/**
 * 清除服务端历史消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param messages 要删除的消息数组，数组大小不能超过 100 条
 */
/**
 * 获取会话
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getConversation(conversationType: ConversationType, targetId: string, callback: (result: ConversationResult) => void): void;
/**
 * 获取会话列表
 *
 * @param conversationTypes 会话类型列表
 * @param count 获取的数量
 * @param timestamp 会话的时间戳（获取这个时间戳之前的会话列表，0 表示从最新开始获取）会话类型
 * @param callback 回调函数
 */
declare function getConversationList(conversationTypes: ConversationType[] | undefined, count: number | undefined, timestamp: number | undefined, callback: (result: ConversationListResult) => void): void;
/**
 * 从会话列表中移除某一会话，但是不删除会话内的消息
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function removeConversation(conversationType: ConversationType, targetId: string, callback: (conversation: BaseResult) => void): void;
/**
 * 设置会话消息提醒状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isBlock 是否屏蔽
 * @param callback 回调函数
 */
declare function setConversationNotificationStatus(conversationType: ConversationType, targetId: string, isBlock: boolean, callback: (result: statusResult) => void): void;
/**
 * 获取会话消息提醒状态
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getConversationNotificationStatus(conversationType: ConversationType, targetId: string, callback: (result: statusResult) => void): void;
/**
 * 设置是否置顶会话
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param isTop 是否置顶
 * @param callback 回调函数
 */
declare function setConversationToTop(conversationType: ConversationType, targetId: string, isTop: boolean, callback: (result: BaseResult) => void): void;
/**
 * 获取置顶会话列表
 *
 * @param conversationTypes 会话类型列表
 * @param callback 回调函数
 */
declare function getTopConversationList(conversationTypes: ConversationType[] | undefined, callback: (result: ConversationListResult) => void): void;
/**
 * 保存某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param content 草稿内容
 * @param callback 回调函数
 */
declare function saveTextMessageDraft(conversationType: ConversationType, targetId: string, content: string, callback: (result: BaseResult) => void): void;
/**
 * 获取某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getTextMessageDraft(conversationType: ConversationType, targetId: string, callback: (result: DraftResult) => void): void;
/**
 * 清除某一会话的文本消息草稿
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function clearTextMessageDraft(conversationType: ConversationType, targetId: string, callback: (result: BaseResult) => void): void;
/**
 * 获取所有未读消息数
 *
 * @param callback 回调函数
 */
declare function getTotalUnreadCount(callback: (result: CountResult) => void): void;
/**
 * 获取指定会话的未读消息数
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param callback 回调函数
 */
declare function getUnreadCount(conversationType: ConversationType | ConversationType[], targetId: string | undefined, callback: (result: CountResult) => void): void;
/**
 * 清除某个会话中的未读消息数
 *
 * @param conversationType 会话类型
 * @param targetId 目标 ID
 * @param time 该会话已阅读的最后一条消息的发送时间戳
 * @param callback 回调函数
 */
declare function clearMessagesUnreadStatus(conversationType: ConversationType, targetId: string, time: number | undefined, callback: (result: BaseResult) => void): void;
/**
 * 把用户加入黑名单
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
declare function addToBlacklist(userId: string, callback: (result: BaseResult) => void): void;
/**
 * 把用户从黑名单中移除
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
declare function removeFromBlacklist(userId: string, callback: (result: BaseResult) => void): void;
/**
 * 获取某用户是否在黑名单中
 *
 * @param userId 用户 ID
 * @param callback 回调函数
 */
declare function getBlacklistStatus(userId: string, callback: (result: statusResult) => void): void;
/**
 * 获取黑名单列表
 *
 * @param 回调函数
 */
declare function getBlacklist(callback: (result: {
    code: number;
    list?: string[];
}) => void): void;
/**
 * 加入聊天室，如果已存在，直接加入，否则创建并加入
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
declare function joinChatRoom(targetId: string, messageCount: number | undefined, callback: (result: BaseResult) => void): void;
/**
 * 加入已存在的聊天室，如果不存在则加入失败
 *
 * @param targetId 聊天室 ID
 * @param messageCount 默认获取的消息数量，最多 50
 * @param callback 回调函数
 */
declare function joinExistChatRoom(targetId: string, messageCount: number | undefined, callback: (result: BaseResult) => void): void;
/**
 * 退出聊天室
 *
 * @param targetId 聊天室 ID
 * @param callback 回调函数
 */
declare function quitChatRoom(targetId: string, callback: (result: BaseResult) => void): void;
/**
 * 从服务器端获取聊天室的历史消息
 *
 * @param targetId 目标 ID
 * @param recordTime 起始的消息发送时间戳，单位毫秒
 * @param count 要获取的消息数量
 * @param order 拉取顺序
 * @param callback 回调函数
 */
declare function getRemoteChatRoomHistoryMessages(targetId: string, recordTime: number, count: number, order: TimestampOrder, callback: (result: {
    messages: Message[];
    syncTime: number;
    code: number;
}) => void): void;
/**
 * 获取聊天室信息
 *
 * @param targetId 聊天室 ID
 * @param memberCount 聊天室成员数量，最多获取 20 个
 * @param order 返回的聊天室成员排序方式
 * @param callback 回调函数
 */
declare function getChatRoomInfo(targetId: string, memberCount: number | undefined, order: ChatRoomMemberOrder | undefined, callback: (result: ChatRoomInfoResult) => void): void;
/**
 * 全局屏蔽某个时间段的消息提醒
 *
 * @param startTime 开始屏蔽消息提醒的时间，格式为HH:MM:SS
 * @param spanMinutes 需要屏蔽消息提醒的分钟数，0 < spanMinutes < 1440
 * @param callback 回调函数
 */
declare function setNotificationQuietHours(startTime: string, spanMinutes: number, callback: (result: BaseResult) => void): void;
/**
 * 查询已设置的全局时间段消息提醒屏蔽
 *
 * @param callback 回调函数
 */
declare function getNotificationQuietHours(callback: (result: {
    startTime: string;
    spanMinutes: number;
    code: number;
}) => void): void;
/**
 * 删除已设置的全局时间段消息提醒屏蔽
 *
 * @param callback 回调函数
 */
declare function removeNotificationQuietHours(callback: (result: BaseResult) => void): void;
/**
 * 获取离线消息在服务端的存储时间（以天为单位）
 */
declare function getOfflineMessageDuration(callback: (result: {
    code: number;
    duration: number;
}) => void): void;
/**
 * 设置离线消息在服务端的存储时间（以天为单位）
 *
 * @param callback 回调函数
 */
declare function setOfflineMessageDuration(duration: number, callback: (result: BaseResult) => void): void;
/**
 * 获取当前用户 ID
 *
 * @param callback 回调函数
 */
declare function getCurrentUserId(callback: (result: {
    userId: string;
}) => void): void;
/**
 * 设置推送语言
 *
 * @param language 推送语言
 * @param callback 回调函数
 */
declare function setPushLanguageCode(language: PushLanguage, callback: (result: BaseResult) => void): void;
/**
 * 设置是否显示内容详情
 *
 * @param isShowPushContent 是否显示内容详情
 * @param callback 回调函数
 */
declare function setPushContentShowStatus(isShowPushContent: boolean, callback: (result: BaseResult) => void): void;
/**
 * 查询是否显示内容详情
 *
 * @param callback 回调函数
 */
declare function getPushContentShowStatus(callback: (result: statusResult) => void): void;
/**
 * 设置推送配置（仅安卓）
 * @param config 推送配置
 */
declare function setPushConfig(config: PushConfig): void;

export { BaseResult, ChatRoomInfo, ChatRoomInfoResult, ChatRoomMemberOrder, CommandMessage, CommandNotificationMessage, ConnectErrorCode, ConnectResult, ConnectionListenerResult, ConnectionStatus, ConnectionStatusAndroid, ConnectionStatusIOS, ContactNotificationMessage, Conversation, ConversationListResult, ConversationResult, ConversationType, CountResult, CustomMessage, CustomMessageType, Discussion, DraftResult, ErrorCode, FileMessage, GIFMessage, GroupNotificationMessage, HQVoiceMessage, ImageMessage, InfomationNotificationMessage, LocationMessage, LogInfoResult, MediaMessageCallback, MemberInfo, MentionedInfo, MentionedType, Message, MessageContent, MessageDirection, MessageListResult, MessageObjectNames, MessageResult, ObjectName, ProfileNotificationMessage, ProgressMessageResult, PublicServiceCommandMessage, PublicServiceMenuItem, PublicServiceMenuItemType, PublicServiceProfile, PublicServiceType, PushConfig, PushLanguage, PushNotificationMessage, RCAndroidPushConfig, RCIMEngineSetup, ReadReceipt, ReadReceiptMessage, RealTimeLocationStatus, RecallMessageResult, RecallNotificationMessage, ReceiptRequest, ReceiptResponse, ReceiveMessage, ResponseType, SearchConversationResult, SearchType, SendMessageResult, SendRecallMessageResult, SentMessage, SentProgressMessageCallback, SentStatus, SightMessage, TextMessage, TimestampOrder, TypingStatus, TypingStatusMessage, UniListenerResult, UserInfo, VoiceMessage, addConnectionStatusListener, addLogInfoListener, addReadReceiptReceivedListener, addRecallMessageListener, addReceiptRequestListener, addReceiptResponseListener, addReceiveMessageListener, addToBlacklist, addTypingStatusListener, cancelDownloadMediaMessage, cancelSendMediaMessage, cleanHistoryMessages, cleanRemoteHistoryMessages, clearConnectionStatusListener, clearLogInfoListener, clearMessages, clearMessagesUnreadStatus, clearReadReceiptReceivedListener, clearRecallMessageListener, clearReceiptRequestListener, clearReceiptResponseListener, clearReceiveMessageListener, clearTextMessageDraft, clearTypingStatusListener, connect, deleteMessages, deleteMessagesByIds, disconnect, downloadMediaMessage, getBlacklist, getBlacklistStatus, getBlockedConversationList, getChatRoomInfo, getConnectionStatus, getConversation, getConversationList, getConversationNotificationStatus, getCurrentUserId, getFirstUnreadMessage, getHistoryMessages, getHistoryMessagesByTimestamp, getMessage, getMessageByUId, getMessageCount, getMessageSendTime, getNotificationQuietHours, getOfflineMessageDuration, getPushContentShowStatus, getRemoteChatRoomHistoryMessages, getRemoteHistoryMessages, getTextMessageDraft, getTopConversationList, getTotalUnreadCount, getUnreadCount, getUnreadMentionedMessages, init, initWithSetup, insertIncomingMessage, insertOutgoingMessage, joinChatRoom, joinExistChatRoom, quitChatRoom, recallMessage, removeConversation, removeFromBlacklist, removeNotificationQuietHours, saveTextMessageDraft, searchConversations, searchMessages, searchMessagesByUserId, sendDirectionalMessage, sendMediaMessage, sendMessage, sendReadReceiptMessage, sendReadReceiptRequest, sendReadReceiptResponse, sendTypingStatus, setConversationNotificationStatus, setConversationToTop, setMessageExtra, setMessageReceivedStatus, setMessageSentStatus, setNotificationQuietHours, setOfflineMessageDuration, setPushConfig, setPushContentShowStatus, setPushLanguageCode, setReconnectKickEnable, setServerInfo, setStatisticServer, statusResult, syncConversationReadStatus };
