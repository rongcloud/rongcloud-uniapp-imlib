
/**
 * 消息方向
 */
export enum MessageDirection {
  SEND = 1,
  RECEIVE
}

/**
 * 会话类型
 */
export enum ConversationType {
  PRIVATE = 1,
  DISCUSSION,
  GROUP,
  CHATROOM,
  CUSTOMER_SERVICE,
  SYSTEM,
  APP_SERVICE,
  PUBLIC_SERVICE,
  PUSH_SERVICE
}

/**
 * 发送状态
 */
export enum SentStatus {
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
export interface UserInfo {
  userId: string;
  name: string;
  portraitUrl: string;
}

/**
 * 消息提醒类型
 */
export enum MentionedType {
  /**
   * 提醒所有
   */
  ALL = 1,

  /**
   * 部分提醒
   */
  PART
}

/**
 * 提醒信息
 */
export interface MentionedInfo {
  type: MentionedType;
  userIdList: string[];
  mentionedContent: string;
}

/**
 * 消息对象名称
 */
export enum ObjectName {
  /**
   * 文本消息
   */
  Text = 'RC:TxtMsg',

  /**
   * 文件消息
   */
  File = 'RC:FileMsg',

  /**
   * 图片消息
   */
  Image = 'RC:ImgMsg',

  /**
   * GIF 图片消息
   */
  GIF = 'RC:GIFMsg',

  /**
   * 位置信息
   */
  Location = 'RC:LBSMsg',

  /**
   * 语音消息
   */
  Voice = 'RC:VcMsg',

  /**
   * 高质量语音消息
   */
  HQVoice = 'RC:HQVCMsg',

  /**
   * 小视频消息
   */
  Sight = 'RC:SightMsg',

  /**
   * 命令消息
   */
  Command = 'RC:CmdMsg',

  /**
   * 公众服务单图文消息
   */
  PublicServiceRich = 'RC:PSImgTxtMsg',

  /**
   * 公众服务多图文消息
   */
  PublicServiceMultiRich = 'RC:PSMultiImgTxtMsg',

  /**
   * 好友通知消息
   */
  ContactNotification = 'RC:ContactNtf',

  /**
   * 资料通知消息
   */
  ProfileNotification = 'RC:ProfileNtf',

  /**
   * 通用命令通知消息
   */
  CommandNotification = 'RC:CmdNtf',

  /**
   * 提示条通知消息
   */
  InformationNotification = 'RC:InfoNtf',

  /**
   * 群组通知消息
   */
  GroupNotification = 'RC:GrpNtf',

  /**
   * 已读通知消息
   */
  ReadReceipt = 'RC:ReadNtf',

  /**
   * 公众服务命令消息
   */
  PublicServiceCommand = 'RC:PSCmd',

  /**
   * 对方正在输入状态消息
   */
  TypingStatus = 'RC:TypSts',

  /**
   * 群消息已读状态回执
   */
  ReadReceiptResponse = 'RC:RRRspMsg'
}

/**
 * 消息内容
 */
export interface MessageContent {
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

export interface RCAndroidPushConfig {
  miAppId?: string,
  miAppKey?: string,

  meizuAppId?: string,
  meizuAppKey?: string,

  oppoAppKey?: string,
  oppoAppSecret?: string,
}

export interface RCIMEngineSetup {
  naviServer?: string,
  fileServer?: string,
  statisticServer?: string,
  appVersion?: string,

  androidPushConfig?: RCAndroidPushConfig,
}

/**
 * 自定义消息类型
 */
export enum CustomMessageType {
  /**
   * 命令消息，不存储、不计入未读计数
   */
  COMMAND,
  /**
   * 存储消息，存储、不计入未读计数
   */
  STORAGE,
  /**
   * 普通消息，存储、计入未读计数
   */
  NORMAL,
  /**
   * 状态消息，不存储不计数
   */
  STATUS
}

/**
 * 自定义消息，不支持自定义媒体类型消息.
 * 使用自定义消息，必须设置 type 指明自定义消息类型，另外还必须设置 objectName ，指明消息对象名称
 */
export interface CustomMessage extends MessageContent {
  /**
   * 发送自定义消息，需要设置类型
   */
  customType: CustomMessageType,
  /**
   * 自定义消息数据集合
   */
  customFields: { [key: string]: string };
}

/**
 * 消息对象名称枚举
 */
export enum MessageObjectNames {
  text = 'RC:TxtMsg',
  image = 'RC:ImgMsg',
  file = 'RC:FileMsg',
  location = 'RC:LocMsg',
  voice = 'RC:VcMsg'
}

/**
 * 文本消息
 */
export interface TextMessage extends MessageContent {
  objectName: ObjectName.Text;
  content: string;
  extra?: string;
}

/**
 * 图片消息
 */
export interface ImageMessage extends MessageContent {
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
export interface GIFMessage extends MessageContent {
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
export interface FileMessage extends MessageContent {
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
export interface SightMessage extends MessageContent {
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
export interface LocationMessage extends MessageContent {
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
export interface VoiceMessage extends MessageContent {
  objectName: ObjectName.Voice;
  local: string;
  duration: number;
}

/**
 * 高质量语音消息
 */
export interface HQVoiceMessage extends MessageContent {
  objectName: ObjectName.HQVoice;
  local: string;
  remote?: string;
  duration: number;
}

/**
 * 命令消息
 */
export interface CommandMessage extends MessageContent {
  objectName: ObjectName.Command;
  name: string;
  data: string;
}

/**
 * 命令通知消息
 */
export interface CommandNotificationMessage extends MessageContent {
  objectName: ObjectName.CommandNotification;
  name: string;
  data: string;
}

/**
 * 好友通知消息
 */
export interface ContactNotificationMessage extends MessageContent {
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
export interface ProfileNotificationMessage extends MessageContent {
  objectName: ObjectName.ProfileNotification;
  data: string;
  operation: string;
  extra: string;
}

/**
 * 提示条通知消息
 */
export interface InfomationNotificationMessage extends MessageContent {
  objectName: ObjectName.InformationNotification;
  message: string;
  extra: string;
}

/**
 * 群组通知消息
 */
export interface GroupNotificationMessage extends MessageContent {
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
export interface ReadReceiptMessage extends MessageContent {
  objectName: ObjectName.ReadReceipt;
  type: number; // TODO: 需要定义枚举类型 ReadReceiptType
  messageUId: string;
  lastMessageSendTime: number;
}

/**
 * 已读通知消息
 */
export interface PublicServiceCommandMessage extends MessageContent {
  objectName: ObjectName.PublicServiceCommand;
  extra: string;
}

/**
 * 撤回通知消息
 */
export interface RecallNotificationMessage extends MessageContent {
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
export interface TypingStatusMessage extends MessageContent {
  objectName: ObjectName.TypingStatus;
  data: string;
  typingContentType: string;
}

/**
 * 消息
 */
export interface Message {
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
export interface ReceiveMessage {
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
export enum ConnectErrorCode {
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
export enum ErrorCode {
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
export enum ConnectionStatusIOS {
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
export enum ConnectionStatusAndroid {
  NETWORK_UNAVAILABLE = -1,
  CONNECTED,
  CONNECTING,
  DISCONNECTED,
  KICKED_OFFLINE_BY_OTHER_CLIENT,
  TOKEN_INCORRECT,
  SERVER_INVALID
}

/**
 * 连接状态
 */
export type ConnectionStatus = ConnectionStatusIOS | ConnectionStatusAndroid;

export interface ConnectionListenerResult {
  status: ConnectionStatus
}

export enum ResponseType {
  SUCCESS = 'success',
  ERROR = 'error',
  CANCEL = 'cancel',
  PROGRESS = 'progress',
}
/**
 * 连接回调 
 */
export interface ConnectResult {
  code: ConnectErrorCode,
  userId?: number
}

/**
 * 监听日志回调参数
 */
export interface LogInfoResult {
  logInfo: string
}
/**
 * 监听撤回消息回调参数
 */
export interface RecallMessageResult {
  messageId: number
}


/**
 * uni监听
 */
export interface UniListenerResult<T> {
  type: string,
  module: string,
  data: T
}

/**
 * 要发送的消息
 */
export interface SentMessage {
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

export interface SendMessageResult extends BaseResult {
  messageId?: number
}

export interface SendRecallMessageResult extends BaseResult {
  message?: RecallNotificationMessage
}

export interface BaseResult {
  code: number
}

export interface MessageListResult extends BaseResult {
  messages?: Message[]
}

export interface MessageResult extends BaseResult {
  message?: Message
}

export interface ConversationResult extends BaseResult {
  conversation?: Conversation
}

export interface ConversationListResult extends BaseResult {
  conversations?: Conversation[]
}

export interface statusResult extends BaseResult {
  status?: number
}

export interface DraftResult extends BaseResult {
  draft?: string
}
export interface CountResult extends BaseResult {
  count?: number
}
export interface ChatRoomInfoResult extends BaseResult {
  chatRoomInfo?: ChatRoomInfo
}

/**
 * 搜索会话结果
 */
export interface SearchConversationResult extends BaseResult {
  result?: {
    conversation: Conversation;
    matchCount: number;
  }
}

/**
 * 会话信息
 */
export interface Conversation {
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
export enum SearchType {
  /**
   * 精准
   */
  EXACT,

  /**
   * 模糊
   */
  FUZZY
}

/**
 * 公共服务类型
 */
export enum PublicServiceType {
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
export enum PublicServiceMenuItemType {
  /**
   * 作为分组包含子菜单的菜单
   */
  GROUP,

  /**
   * 查看事件菜单
   */
  VIEW,

  /**
   * 点击事件菜单
   */
  CLICK
}

/**
 * 公众服务菜单项
 */
export interface PublicServiceMenuItem {
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
export interface PublicServiceProfile {
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
export interface TypingStatus {
  conversationType: ConversationType;
  targetId: string;
  userId: string;
  typingContentType: string;
}

/**
 * 消息已读回执
 */
export interface ReadReceipt {
  conversationType: ConversationType;
  targetId: string;
  messageTime: number;
}

/**
 * 消息回执请求信息
 */
export interface ReceiptRequest {
  conversationType: ConversationType;
  targetId: string;
  messageUId: string;
}

/**
 * 消息回执响应信息
 */
export interface ReceiptResponse {
  conversationType: ConversationType;
  targetId: string;
  messageUId: string;
  users: { [key: string]: number };
}

/**
 * 时间戳排序方式
 */
export enum TimestampOrder {
  /**
   * 按时间戳倒序排序
   */
  DESC,

  /**
   * 按时间戳顺序排序
   */
  ASC
}

/**
 * 聊天室成员排序，按加入时间
 */
export enum ChatRoomMemberOrder {
  /**
   * 生序
   */
  ASC = 1,

  /**
   * 降序
   */
  DESC
}

/**
 * 聊天室成员信息
 */
export interface MemberInfo {
  userId: string;
  joinTime: number;
}

/**
 * 聊天室信息
 */
export interface ChatRoomInfo {
  targetId: string;
  memberOrder: ChatRoomMemberOrder;
  totalMemberCount: number;
  members: MemberInfo[];
}

/**
 * 讨论组
 */
export interface Discussion {
  id: string;
  name: string;
  creatorId: string;
  memberIdList: string[];
  isOpen: boolean;
}

/**
 * 实时位置共享状态
 */
export enum RealTimeLocationStatus {
  /**
   * 初始状态
   */
  IDLE,

  /**
   * 接收状态
   */
  INCOMING,

  /**
   * 发起状态
   */
  OUTGOING,

  /**
   * 已连接，正在共享的状态
   */
  CONNECTED
}

/**
 * 推送语言
 */
export enum PushLanguage {
  EN_US = 'en_US',
  ZH_CN = 'zh_CN',
  AR_SA = 'ar_SA'
}

/**
 * 推送提醒消息
 */
export interface PushNotificationMessage {
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
export interface PushConfig {
  FCM: boolean,
  HW: boolean,
  VIVO: boolean,
  MI: {
    MI_PUSH_APPID: string,
    MI_PUSH_APPKEY: string
  },
  MEIZU: {
    MEIZU_PUSH_APPID: string,
    MEIZU_PUSH_APPKEY: string
  },
  OPPO: {
    OPPO_PUSH_APPID: string,
    OPPO_PUSH_APPKEY: string
  }
}

/**
 * 发送进度消息回调
 */
export interface SentProgressMessageCallback {
  success?: (messageId: number) => void;
  progress?: (progress: number, messageId: number) => void;
  cancel?: (messageId: number) => void;
  error?: (errorCode: ErrorCode, messageId: number) => void;
}

/**
 * 发送进度消息回调参数
*/
export interface ProgressMessageResult {
  type: ResponseType,
  eventId: string,
  messageId: number,
  progress: number,
  errorCode: number
}
