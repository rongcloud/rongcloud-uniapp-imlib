//
//  RCIMIWEngine.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/15.
//

#import <Foundation/Foundation.h>
#import <RongIMWrapper/RCIMIWDefine.h>

@class RCIMIWEngineSetup;

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWEngine : NSObject

/*!
 初始化 SDK

 @param key  从融云开发者平台创建应用后获取到的 App Key
 @discussion 初始化后，SDK 会监听 app 生命周期， 用于判断应用处于前台、后台，根据前后台状态调整链接心跳
 您在使用融云 SDK 所有功能（ 包括显示 SDK 中或者继承于 SDK 的 View ）之前，您必须先调用此方法初始化 SDK。
 在 App 整个生命周期中，您只需要执行一次初始化。
 */
+ (instancetype)initWithAppKey:(NSString *)key;

/*!
 初始化 SDK

 @param key  从融云开发者平台创建应用后获取到的 App Key
 @param config SDK 配置
 @discussion 初始化后，SDK 会监听 app 生命周期， 用于判断应用处于前台、后台，根据前后台状态调整链接心跳
 您在使用融云 SDK 所有功能（ 包括显示 SDK 中或者继承于 SDK 的 View ）之前，您必须先调用此方法初始化 SDK。
 在 App 整个生命周期中，您只需要执行一次初始化。
 */
+ (instancetype)initWithAppKey:(NSString *)key config:(RCIMIWEngineSetup *)config;

/*!
 获取 RongIMWrapper 的核心单例类

 @return RongIMWrapper 的核心单例类
 */
+ (instancetype)getInstance;

/*!
 设置 deviceToken，用于远程推送

 @param deviceToken  从系统获取到的设备号 deviceToken

 @discussion
 deviceToken 是系统提供的，从苹果服务器获取的，用于 APNs 远程推送必须使用的设备唯一值。
 您需要将 -application:didRegisterForRemoteNotificationsWithDeviceToken: 获取到的
 deviceToken，转换成十六进制字符串，作为参数传入此方法。
 */
- (void)setDeviceTokenForApplePush:(NSString *)deviceToken;

/*!
 设置是否显示远程推送的内容

 @param showContent 是否显示推送的具体内容（ YES 显示 NO 不显示）
 @param callback   结果回调
 */
- (void)setPushContentShowStatus:(BOOL)showContent callback:(RCIMIWOperationCallback)callback;

/*!
 获取是否显示远程推送的内容

 @param callback   结果回调
 */
- (void)getPushContentShowStatus:(RCIMIWOperationCallbackWithBool)callback;

/*!
 设置推送内容的自然语言

 @param lang 通过 SDK 设置的语言环境，语言缩写内容格式为 (ISO-639 Language Code)_(ISO-3166 Country Codes)，如：zh_CN。目前融云支持的内置推送语言为 zh_CN、en_US、ar_SA
 @param callback   结果回调
 */
- (void)setPushLanguage:(RCPushLauguage)lang callback:(RCIMIWOperationCallback)callback;

/*!
 获取远程推送的语言

 @param callback   结果回调
 */
- (void)getPushLanguage:(RCIMIWOperationCallbackWithPushLanguage)callback;

/*!
 设置其他端在线时，手机端是否接收推送

 @param receive  是否接收推送（ YES 接收 NO 不接收）
 @param callback   结果回调
 */
- (void)setPushReceiveStatus:(BOOL)receive callback:(RCIMIWOperationCallback)callback;

/*!
 获取其他端在线时，手机是否接收远程推送(多个手机端登录，最后一个会接收)

 @param callback   结果回调
 */
- (void)getPushReceiveStatus:(RCIMIWOperationCallbackWithBool)callback;

/*!
 消息通知到达
 
 @param pushType 推送渠道类型
 @param notificationMessage 对象消息对象
 */
- (void)notifyOnNotificationMessageArrived:(RCIMIWPushType)pushType
                       notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

/*!
 消息通知被点击
 
 @param pushType 推送渠道类型
 @param notificationMessage 对象消息对象
 */
- (void)notifyOnNotificationMessageClicked:(RCIMIWPushType)pushType
                       notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

/*!
 设置消息通知监听

 @param listener 消息通知监听对象
 */
- (void)setOnNotificationMessageListener:(id<RCIMIWNotificationMessageListener>)listener;

/*!
 设置离线消息在服务端的存储时间（以天为单位）

 @param duration   存储时间，范围【1~7天】
 @param callback   结果回调
 */
- (void)setOfflineMessageDuration:(int)duration callback:(RCIMIWOperationCallback)callback;

/*!
 获取离线消息时间 （以天为单位）

 @param callback   结果回调
 */
- (void)getOfflineMessageDuration:(RCIMIWOperationCallbackWithInt)callback;

/*!
 设置断线重连时是否踢出当前正在重连的设备

 @discussion
 用户没有开通多设备登录功能的前提下，同一个账号在一台新设备上登录的时候，会把这个账号在之前登录的设备上踢出。
 由于 SDK 有断线重连功能，存在下面情况。
 用户在 A 设备登录，A 设备网络不稳定，没有连接成功，SDK 启动重连机制。
 用户此时又在 B 设备登录，B 设备连接成功。
 A 设备网络稳定之后，用户在 A 设备连接成功，B 设备被踢出。
 这个接口就是为这种情况加的。
 设置 kick 为 YES 时，SDK 重连的时候发现此时已有别的设备连接成功，不再强行踢出已有设备，而是踢出重连设备。
 */
- (void)setKickReconnectedDevice:(BOOL)kick;

/*!
 获取当前手机与服务器的时间差

 @return 时间差
 @discussion 消息发送成功后，SDK 会与服务器同步时间，消息所在数据库中存储的时间就是服务器时间。
 */
- (long long)getDeltaTime;


/*!
 获取用户 ID

 @return 用户 ID
 */
- (NSString *)getCurrentUserID;

/*!
 获取当前 SDK 的连接状态

 @return 当前 SDK 的连接状态
 */
- (RCIMIWConnectionStatus)getConnectionStatus;

/*!
 与融云服务器建立连接

 @param token                   从您服务器端获取的 token (用户身份令牌)
 @param callback   结果回调

 @discussion 调用该接口，SDK 会在连接失败之后尝试重连，直到连接成功或者出现 SDK 无法处理的错误（如 token 非法）。
 连接成功后，SDK 将接管所有的重连处理。当因为网络原因断线的情况下，SDK 会不停重连直到连接成功为止，不需要您做额外的连接操作。

 对于错误需要特定关心 tokenIncorrect 的情况：
 一是 token 错误，请您检查客户端初始化使用的 AppKey 和您服务器获取 token 使用的 AppKey 是否一致；
 二是 token 过期，是因为您在开发者后台设置了 token 过期时间，您需要请求您的服务器重新获取 token 并再次用新的 token 建立连接。
 在此种情况下，您需要请求您的服务器重新获取 token 并建立连接，但是注意避免无限循环，以免影响 App 用户体验。

 此方法的回调并非为原调用线程，您如果需要进行 UI 操作，请注意切换到主线程。
 */
- (void)connect:(NSString *)token callback:(RCIMIWOperationCallbackWithString)callback;

/*!
 断开与融云服务器的连接，但仍然接收远程推送

 @discussion
 因为 SDK 在前后台切换或者网络出现异常都会自动重连，会保证连接的可靠性。
 所以除非您的 App 逻辑需要登出，否则一般不需要调用此方法进行手动断开。
 */
- (void)disconnect;

/*!
 断开与融云服务器的连接，并不再接收远程推送

 @discussion
 因为 SDK 在前后台切换或者网络出现异常都会自动重连，会保证连接的可靠性。
 所以除非您的 App 逻辑需要登出，否则一般不需要调用此方法进行手动断开。
 */
- (void)logout;

/*!
 获取单个会话数据

 @param identifier  会话类型
 @param callback    结果回调
 */
- (void)getConversation:(RCConversationIdentifier *)identifier
               callback:(RCIMIWOperationCallbackWithConversation)callback;

/*!
 从本地存储中删除会话

 @param identifier   会话类型
 @param callback    结果回调
 
 @discussion
 此方法会从本地存储中删除该会话，但是不会删除会话中的消息。如果此会话中有新的消息，该会话将重新在会话列表中显示，并显示最近的历史消息。
 */
- (void)removeConversation:(RCConversationIdentifier *)identifier
                  callback:(RCIMIWOperationCallback)callback;

/*!
 获取会话列表

 @param conversationTypes  会话类型的数组(需要将 RCConversationType 转为 NSNumber 构建 NSArray)
 @param callback           结果回调

 @discussion 此方法会从本地数据库中，读取会话列表。
 返回的会话列表按照时间从前往后排列，如果有置顶的会话，则置顶的会话会排列在前面。
 @discussion 当您的会话较多且没有清理机制的时候，强烈建议您使用 getConversationListByPage:count:startTime:callback:
 分页拉取会话列表,否则有可能造成内存过大。
 */
- (void)getConversationList:(NSArray<NSNumber *> *)conversationTypes
                   callback:(RCIMIWOperationCallbackWithConversationList)callback;

/*!
 分页获取会话列表

 @param conversationTypes 会话类型的数组(需要将 RCConversationType 转为 NSNumber 构建 NSArray)
 @param count             获取的数量（当实际取回的会话数量小于 count 值时，表明已取完数据）
 @param startTime         会话的时间戳（获取这个时间戳之前的会话列表，0表示从最新开始获取）
 @param callback          结果回调

 @discussion 此方法会从本地数据库中，读取会话列表。
 返回的会话列表按照时间从前往后排列，如果有置顶的会话，则置顶的会话会排列在前面。
 */
- (void)getConversationListByPage:(NSArray<NSNumber *> *)conversationTypes
                            count:(int)count
                        startTime:(long long)startTime
                         callback:(RCIMIWOperationCallbackWithConversationList)callback;

/*!
 根据关键字搜索会话

 @param keyword              关键字
 @param conversationTypes    需要搜索的会话类型列表
 @param objectNames          需要搜索的消息类型名列表(即每个消息类方法 getObjectName 的返回值)
 @param callback             结果回调

 @discussion 目前，SDK 内置的文本消息、文件消息、图文消息支持搜索。
 自定义的消息必须要实现 RCMessageContent 的 getSearchableWords 接口才能进行搜索。
 */
- (void)searchConversation:(NSString *)keyword
      conversationTypeList:(NSArray<NSNumber *> *)conversationTypes
            objectNameList:(NSArray<NSString *> *)objectNames
                  callback:(RCIMIWOperationCallbackWithSearchConversationResultList)callback;

/*!
 删除指定类型的会话

 @param conversationTypes 会话类型的数组(需要将 RCConversationType 转为 NSNumber 构建 NSArray)
 @param callback          结果回调
 
 @discussion 此方法会从本地存储中删除该会话，同时删除会话中的消息。
 */
- (void)clearConversations:(NSArray<NSNumber *> *)conversationTypes
                  callback:(RCIMIWOperationCallback)callback;

/*!
 获取会话中的草稿信息（用户输入但未发送的暂存消息）

 @param identifier    会话标识
 @param callback      结果回调
 */
- (void)getTextMessageDraft:(RCConversationIdentifier *)identifier
                   callback:(RCIMIWOperationCallbackWithString)callback;

/*!
 保存草稿信息（用户输入但未发送的暂存消息）

 @param identifier    会话标识
 @param textDraft     草稿信息
 @param callback      结果回调
 */
- (void)saveTextMessageDraft:(RCConversationIdentifier *)identifier
                   textDraft:(NSString *)textDraft
                    callback:(RCIMIWOperationCallback)callback;

/*!
 删除会话中的草稿信息（用户输入但未发送的暂存消息）

 @param identifier    会话标识
 @param callback      结果回调
 */
- (void)clearTextMessageDraft:(RCConversationIdentifier *)identifier
                     callback:(RCIMIWOperationCallback)callback;

/*!
 获取某个会话内的未读消息数（聊天室会话除外）

 @param identifier    会话标识
 @param callback      结果回调
 */
- (void)getUnreadCount:(RCConversationIdentifier *)identifier
              callback:(RCIMIWOperationCallbackWithInt)callback;

/*!
 获取标签中会话消息未读数
 
 @param tagId            标签 ID
 @param containBlocked   是否包含免打扰会话
 @param callback         结果回调
 */
- (void)getUnreadCountByTag:(NSString *)tagId
             containBlocked:(BOOL)containBlocked
                   callback:(RCIMIWOperationCallbackWithInt)callback;

/**
 获取某些类型的会话中所有的未读消息数 （聊天室会话除外）

 @param conversationTypes   会话类型的数组
 @param containsDND         是否包含免打扰消息的未读数
 @param callback            结果回调
 */
- (void)getUnreadCountByConversationTypes:(NSArray<NSNumber *> *)conversationTypes
                              containsDND:(BOOL)containsDND
                                 callback:(RCIMIWOperationCallbackWithInt)callback;

/*!
 获取所有的未读消息数（聊天室会话除外）

 @param callback    结果回调
 */
- (void)getTotalUnreadCount:(RCIMIWOperationCallbackWithInt)callback;

/*!
 清除某个会话中的未读消息数

 @param identifier  会话标识
 @param callback    结果回调
 */
- (void)clearMessagesUnreadStatus:(RCConversationIdentifier *)identifier
                         callback:(RCIMIWOperationCallback)callback;

/*!
 获取会话里第一条未读消息。
 
 @param identifier  会话标识
 @param callback    结果回调
 */
- (void)getFirstUnreadMessage:(RCConversationIdentifier *)identifier
                     callback:(RCIMIWOperationCallbackWithMessage)callback;

/*!
 获取会话中@提醒自己的消息

 @param identifier  会话标识
 @param callback    结果回调

 @discussion
 此方法从本地获取被@提醒的消息(最多返回 10 条信息)
 */
- (void)getUnreadMentionedMessages:(RCConversationIdentifier *)identifier
                          callback:(RCIMIWOperationCallbackWithMessageList)callback;


/*!
 设置会话的消息提醒状态

 @param identifier  会话标识
 @param isBlocked   是否屏蔽消息提醒
 @param callback    结果回调
 */
- (void)setConversationNotificationStatus:(RCConversationIdentifier *)identifier
                                isBlocked:(BOOL)isBlocked
                                 callback:(RCIMIWOperationCallbackWithConversationNotificationStatus)callback;

/*!
 查询会话的消息提醒状态

 @param identifier  会话标识
 @param callback    结果回调
 */
- (void)getConversationNotificationStatus:(RCConversationIdentifier *)identifier
                                 callback:(RCIMIWOperationCallbackWithConversationNotificationStatus)callback;

/*!
 获取消息免打扰会话列表

 @param conversationTypes 会话类型的数组(需要将 RCConversationType 转为 NSNumber 构建 NSArray)
 @param callback    结果回调

 @discussion 此方法会从本地数据库中，读取消息免打扰会话列表。
 */
- (void)getBlockedConversationList:(NSArray<NSNumber *> *)conversationTypes
                          callback:(RCIMIWOperationCallbackWithConversationList)callback;

/*!
设置会话状态（包含置顶，消息免打扰）同步的监听器

@param listener 会话状态同步的监听器

@discussion 可以设置并实现此 listener 来进行会话状态同步。SDK 会在回调的 conversationStatusChange:方法中通知您会话状态的改变。
*/
- (void)setConversationStatusListener:(id<RCConversationStatusChangeDelegate>)listener;

/*!
 设置会话的置顶状态

 @param identifier  会话标识
 @param isTop       是否置顶
 @param callback    结果回调

 @discussion 会话不存在时设置置顶，会在会话列表生成会话。
 */
- (void)setConversationToTop:(RCConversationIdentifier *)identifier
                       isTop:(BOOL)isTop
                    callback:(RCIMIWOperationCallback)callback;

/*!
 获取置顶的会话列表

 @param conversationTypes 会话类型的数组(需要将 RCConversationType 转为 NSNumber 构建 NSArray)
 @param callback          结果回调

 @discussion 此方法会从本地数据库中，读取置顶的会话列表。
 */
- (void)getToppedConversationList:(NSArray<NSNumber *> *)conversationTypes
                         callback:(RCIMIWOperationCallbackWithConversationList)callback;

/*!
 设置输入状态的监听器

 @param listener 输入状态的的监听器
 
 @warning 目前仅支持单聊。
 */
- (void)setTypingStatusChangedListener:(id<RCIMIWTypingStatusChangedLitener>)listener;

/**
 设置 typing 状态更新的时间
 
 @param typingUpdateSeconds 状态更新的时间，默认是 6s
 */
- (void)setTypingUpdateSeconds:(NSInteger)typingUpdateSeconds;

/*!
 向会话中发送正在输入的状态

 @param identifier       会话标识
 @param typingContent    正在输入的消息的类型名

 @discussion typingContent 为用户当前正在编辑的消息类型名，即 RCMessageContent 中 getObjectName 的返回值。
 如文本消息，应该传类型名"RC:TxtMsg"。

 @warning 目前仅支持单聊。
 */
- (void)sendTypingStatus:(RCConversationIdentifier *)identifier typingContent:(NSString *)typingContent;

/*!
 设置消息接收监听器

 @param listener    消息接收监听器
 */
- (void)setOnMessageReceivedListener:(id<RCIMIWMessageReceivedListener>)listener;

/*!
 通过 messageId 获取消息实体

 @param messageId   消息 ID（数据库索引唯一值）
 @param callback    结果回调
 */
- (void)getMessage:(long)messageId callback:(RCIMIWOperationCallbackWithMessage)callback;

/*!
 通过全局唯一 ID 获取消息实体

 @param messageUId   全局唯一 ID（服务器消息唯一 ID）
 @param callback     结果回调
 
 @discussion 通过全局唯一ID获取到的消息实体，当获取失败的时候，会返回 nil。
 */
- (void)getMessageByUid:(NSString *)messageUId callback:(RCIMIWOperationCallbackWithMessage)callback;

/*!
 设置消息的接收状态

 @param messageId   消息 ID
 @param status      消息的接收状态
 @param callback    结果回调

 @discussion 用于 UI 展示消息为已读，已下载等状态。
 */
- (void)setMessageReceivedStatus:(long)messageId
                          status:(RCReceivedStatus)status
                        callback:(RCIMIWOperationCallback)callback;

/*!
 设置消息的发送状态

 @param messageId   消息 ID
 @param status      消息的发送状态
 @param callback    结果回调

 @discussion 用于 UI 展示消息为正在发送，对方已接收等状态。
 */
- (void)setMessageSentStatus:(long)messageId
                      status:(RCSentStatus)status
                    callback:(RCIMIWOperationCallback)callback;

/*!
 设置消息的附加信息

 @param messageId   消息 ID
 @param extra       附加信息，最大 1024 字节
 @param callback    结果回调

 @discussion 用于扩展消息的使用场景。只能用于本地使用，无法同步到远端。
 */
- (void)setMessageExtra:(long)messageId
                  extra:(NSString *)extra
               callback:(RCIMIWOperationCallback)callback;

/*!
 获取历史消息

 @param identifier  会话标识
 @param option      可配置的参数
 @param callback    获取结果的回调 [code : 获取是否成功，0表示成功，非 0 表示失败，此时 messages 数组可能存在断档；messages：获取到的历史消息数组]

 @discussion 必须开通历史消息云存储功能。
 @discussion count 传入 1~20 之间的数值。
 @discussion 此方法先从本地获取历史消息，本地有缺失的情况下会从服务端同步缺失的部分。
 @discussion 从服务端同步失败的时候会返回非 0 的 errorCode，同时把本地能取到的消息回调上去。
 */
- (void)getMessages:(RCConversationIdentifier *)identifier
             option:(RCHistoryMessageOption *)option
           callback:(RCIMIWOperationCallbackWithMessageList)callback;

/*!
 获取会话中，从指定消息之前、指定数量的最新消息实体

 @param identifier      会话标识
 @param lastMessageId   截止的消息 ID
 @param count           需要获取的消息数量
 @param callback        结果回调

 @discussion
 此方法会获取该会话中，lastMessageId 之前的、指定数量的最新消息实体，返回的消息实体按照时间从新到旧排列。
 返回的消息中不包含 lastMessageId 对应那条消息，如果会话中的消息数量小于参数 count 的值，会将该会话中的所有消息返回。
 如：
 lastMessageId 为 10，count 为 2，会返回 messageId 为 9 和 8 的 RCMessage 对象列表。
 */
- (void)getHistoryMessages:(RCConversationIdentifier *)identifier
             lastMessageId:(long)lastMessageId
                     count:(int)count
                  callback:(RCIMIWOperationCallbackWithMessageList)callback;

/*!
 在会话中搜索指定消息的前 beforeCount 数量和后 afterCount
 数量的消息。返回的消息列表中会包含指定的消息。消息列表时间顺序从新到旧。

 @param identifier    会话标识
 @param sentTime      消息的发送时间
 @param beforeCount   指定消息的前部分消息数量
 @param afterCount    指定消息的后部分消息数量
 @param callback      结果回调

 @discussion
 获取该会话的这条消息及这条消息前 beforeCount 条和后 afterCount 条消息,如前后消息不够则返回实际数量的消息。
 */
- (void)getHistoryMessages:(RCConversationIdentifier *)identifier
                  sentTime:(long)sentTime
               beforeCount:(int)beforeCount
                afterCount:(int)afterCount
                  callback:(RCIMIWOperationCallbackWithMessageList)callback;

/*!
 从服务器端获取之前的历史消息

 @param identifier    会话标识
 @param option        可配置的参数
 @param callback      结果回调

 @discussion
 此方法从服务器端获取之前的历史消息，但是必须先开通历史消息云存储功能。
 例如，本地会话中有 10 条消息，您想拉取更多保存在服务器的消息的话，recordTime 应传入最早的消息的发送时间戳，count 传入
 1~20 之间的数值。
 */
- (void)getRemoteHistoryMessages:(RCConversationIdentifier *)identifier
          remoteHistoryMsgOption:(RCRemoteHistoryMsgOption *)option
                        callback:(RCIMIWOperationCallbackWithMessageList)callback;

/*!
 根据关键字搜索指定会话中的消息

 @param identifier    会话标识
 @param keyword       关键字
 @param count         最大的查询数量
 @param beginTime     查询 beginTime 之前的消息（传 0 表示不限时间）
 @param callback      结果回调
 
 */
- (void)searchMessages:(RCConversationIdentifier *)identifier
               keyword:(NSString *)keyword
                 count:(int)count
             beginTime:(long)beginTime
              callback:(RCIMIWOperationCallbackWithMessageList)callback;

/*!
 发送消息
 
 @param identifier     会话标识
 @param content        消息内容
 @param pushContent    接收方离线时需要显示的远程推送内容
 @param pushData       接收方离线时需要在远程推送中携带的非显示数据
 @param successBlock   消息发送成功的回调 [successMessage: 消息实体]
 @param errorBlock     消息发送失败的回调 [nErrorCode: 发送失败的错误码, errorMessage:消息实体]
 @return               发送的消息实体
 
 @discussion 当接收方离线并允许远程推送时，会收到远程推送。
 远程推送中包含两部分内容，一是 pushContent ，用于显示；二是 pushData ，用于携带不显示的数据。
 
 SDK 内置的消息类型，如果您将 pushContent 和 pushData 置为 nil ，会使用默认的推送格式进行远程推送。
 自定义类型的消息，需要您自己设置 pushContent 和 pushData 来定义推送内容，否则将不会进行远程推送。
 
 如果您使用此方法发送图片消息，需要您自己实现图片的上传，构建一个 RCImageMessage 对象，
 并将 RCImageMessage 中的 imageUrl 字段设置为上传成功的 URL 地址，然后使用此方法发送。
 
 如果您使用此方法发送文件消息，需要您自己实现文件的上传，构建一个 RCFileMessage 对象，
 并将 RCFileMessage 中的 fileUrl 字段设置为上传成功的 URL 地址，然后使用此方法发送。
 */
- (RCMessage *)sendMessage:(RCConversationIdentifier *)identifier
            messageContent:(RCMessageContent *)content
               pushContent:(NSString *)pushContent
                  pushData:(NSString *)pushData
             messageConfig:(RCMessageConfig *)messageConfig
              successBlock:(void (^)(RCMessage *successMessage))successBlock
                errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

/*!
 发送消息

 @param message             将要发送的消息实体（需要保证 message 中的 conversationType，targetId，messageContent 是有效值)
 @param pushContent         接收方离线时需要显示的远程推送内容
 @param pushData            接收方离线时需要在远程推送中携带的非显示数据
 @param sendOption          消息的相关配置
 @param successBlock        消息发送成功的回调 [successMessage: 消息实体]
 @param errorBlock          消息发送失败的回调 [nErrorCode: 发送失败的错误码, errorMessage:消息实体]
 @return                    发送的消息实体

 @discussion 当接收方离线并允许远程推送时，会收到远程推送。
 远程推送中包含两部分内容，一是 pushContent，用于显示；二是 pushData，用于携带不显示的数据。

 SDK 内置的消息类型，如果您将 pushContent 和 pushData 置为 nil，会使用默认的推送格式进行远程推送。
 自定义类型的消息，需要您自己设置 pushContent 和 pushData 来定义推送内容，否则将不会进行远程推送。

 如果您使用此方法发送图片消息，需要您自己实现图片的上传，构建一个 RCImageMessage 对象，
 并将 RCImageMessage 中的 imageUrl 字段设置为上传成功的 URL 地址，然后使用此方法发送。

 如果您使用此方法发送文件消息，需要您自己实现文件的上传，构建一个 RCFileMessage 对象，
 并将 RCFileMessage 中的 fileUrl 字段设置为上传成功的 URL 地址，然后使用此方法发送。
 */
- (RCMessage *)sendMessage:(RCMessage *)message
               pushContent:(NSString *)pushContent
                  pushData:(NSString *)pushData
                sendOption:(RCSendMessageOption *)sendOption
              successBlock:(void (^)(RCMessage *successMessage))successBlock
                errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

/*!
 发送媒体消息（图片消息或文件消息）
 
 @param message             将要发送的消息实体（需要保证 message 中的 conversationType，targetId，messageContent 是有效值)
 @param pushContent         接收方离线时需要显示的远程推送内容
 @param pushData            接收方离线时需要在远程推送中携带的非显示数据
 @param progressBlock       消息发送进度更新的回调 [progress:当前的发送进度, 0 <= progress <= 100, progressMessage:消息实体]
 @param successBlock        消息发送成功的回调 [successMessage:消息实体]
 @param errorBlock          消息发送失败的回调 [nErrorCode:发送失败的错误码, errorMessage:消息实体]
 @param cancelBlock         用户取消了消息发送的回调 [cancelMessage:消息实体]
 @return                    发送的消息实体
 
 @discussion 当接收方离线并允许远程推送时，会收到远程推送。
 远程推送中包含两部分内容，一是 pushContent，用于显示；二是 pushData，用于携带不显示的数据。
 
 SDK 内置的消息类型，如果您将 pushContent 和 pushData 置为 nil，会使用默认的推送格式进行远程推送。
 自定义类型的消息，需要您自己设置 pushContent 和 pushData 来定义推送内容，否则将不会进行远程推送。
 
 如果您需要上传图片到自己的服务器，需要构建一个 RCImageMessage 对象，
 并将 RCImageMessage 中的 imageUrl 字段设置为上传成功的 URL 地址，然后使用 RCIMIWEngine 的
 sendMessage:messageContent:pushContent:pushData:messageConfig:successBlock:errorBlock:方法
 或 sendMessage:pushContent:pushData:sendOption:successBlock:errorBlock:方法进行发送，不要使用此方法。
 
 如果您需要上传文件到自己的服务器，构建一个 RCFileMessage 对象，
 并将 RCFileMessage 中的 fileUrl 字段设置为上传成功的 URL 地址，然后使用 RCIMIWEngine 的
 sendMessage:messageContent:pushContent:pushData:messageConfig:successBlock:errorBlock:方法
 或 sendMessage:pushContent:pushData:sendOption:successBlock:errorBlock:方法进行发送，不要使用此方法。
 */
- (RCMessage *)sendMediaMessage:(RCMessage *)message
                    pushContent:(NSString *)pushContent
                       pushData:(NSString *)pushData
                  progressBlock:(void (^)(int progress, RCMessage *progressMessage))progressBlock
                   successBlock:(void (^)(RCMessage *successMessage))successBlock
                     errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock
                         cancel:(void (^)(RCMessage *cancelMessage))cancelBlock;

/*!
 发送定向消息

 @param identifier     会话标识
 @param userIdList       接收消息的用户 ID 列表
 @param messageContent          消息的内容
 @param pushContent      接收方离线时需要显示的远程推送内容
 @param pushData         接收方离线时需要在远程推送中携带的非显示数据
 @param successBlock     消息发送成功的回调 [successMessage:消息实体]
 @param errorBlock       消息发送失败的回调 [nErrorCode:发送失败的错误码, errorMessage:消息实体]
 @return 发送的消息实体

 @discussion 此方法用于在群组和讨论组中发送消息给其中的部分用户，其它用户不会收到这条消息。

 @warning 此方法目前仅支持群组和讨论组。
 */
- (RCMessage *)sendDirectionalMessage:(RCConversationIdentifier *)identifier
                           userIdList:(NSArray<NSString *> *)userIdList
                       messageContent:(RCMessageContent *)messageContent
                          pushContent:(NSString *)pushContent
                             pushData:(NSString *)pushData
                         successBlock:(void (^)(RCMessage *successMessage))successBlock
                           errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

/*!
 下载消息内容中的媒体信息

 @param message           媒体消息
 @param progressBlock     消息下载进度更新的回调 [progress:当前的下载进度, 0 <= progress <= 100]
 @param successBlock      下载成功的回调[mediaPath:下载成功后本地存放的文件路径]
 @param errorBlock        下载失败的回调[errorCode:下载失败的错误码]
 @param cancelBlock       用户取消了下载的回调

 @discussion 用来获取媒体原文件时调用。如果本地缓存中包含此文件，则从本地缓存中直接获取，否则将从服务器端下载。
 */
- (void)downloadMediaMessage:(RCMessage *)message
                    progress:(void (^)(int progress))progressBlock
                     success:(void (^)(NSString *mediaPath))successBlock
                       error:(void (^)(RCErrorCode errorCode))errorBlock
                      cancel:(void (^)(void))cancelBlock;

/*!
 取消下载中的媒体信息

 @param message   媒体消息
 */
- (void)cancelDownloadMediaMessage:(RCMessage *)message;

/*!
 批量插入接收的消息（该消息只插入本地数据库，实际不会发送给服务器和对方）
 RCMessage 下列属性会被入库，其余属性会被抛弃
 conversationType    会话类型
 targetId            会话 ID
 messageDirection    消息方向
 senderUserId        发送者 ID
 receivedStatus      接收状态；消息方向为接收方，并且 receivedStatus 为 ReceivedStatus_UNREAD 时，该条消息未读
 sentStatus          发送状态
 content             消息的内容
 sentTime            消息发送的 Unix 时间戳，单位为毫秒 ，会影响消息排序
 extra            RCMessage 的额外字段
 
 @discussion 此方法不支持聊天室的会话类型。每批最多处理  500 条消息，超过 500 条返回 NO
 @discussion 消息的未读会累加到回话的未读数上
 */
- (void)insertMessages:(NSArray<RCMessage *> *)messageList
              callback:(RCIMIWOperationCallback)callback;

/*!
 插入接收的消息（此方法如果 sentTime
 有问题会影响消息排序，慎用！！）（该消息只插入本地数据库，实际不会发送给服务器和对方）

 @param identifier       会话标识
 @param senderId         发送者 ID
 @param receivedStatus   接收状态
 @param content          消息的内容
 @param sentTime         消息发送的 Unix 时间戳，单位为毫秒 （传 0 会按照本地时间插入）
 @param callback         结果回调
 */
- (void)insertIncomingMessage:(RCConversationIdentifier *)identifier
                     senderId:(NSString *)senderId
               receivedStatus:(RCReceivedStatus)receivedStatus
                      content:(RCMessageContent *)content
                     sentTime:(long long)sentTime
                     callback:(RCIMIWOperationCallbackWithMessage)callback;

/*!
 插入向外发送的、指定时间的消息（此方法如果 sentTime 有问题会影响消息排序，慎用！！）
（该消息只插入本地数据库，实际不会发送给服务器和对方）

 @param identifier    会话标识
 @param sentStatus    发送状态
 @param content       消息的内容
 @param sentTime      消息发送的 Unix 时间戳，单位为毫秒（传 0 会按照本地时间插入）
 @param callback      结果回调

 @discussion 此方法不支持聊天室的会话类型。如果 sentTime<=0，则被忽略，会以插入时的时间为准。
 */
- (void)insertOutgoingMessage:(RCConversationIdentifier *)identifier
                     senderId:(NSString *)senderId
                   sentStatus:(RCSentStatus)sentStatus
                      content:(RCMessageContent *)content
                     sentTime:(long long)sentTime
                     callback:(RCIMIWOperationCallbackWithMessage)callback;

/*!
 撤回消息

 @param message      需要撤回的消息
 @param pushContent  当下发 push 消息时，在通知栏里会显示这个字段，不设置将使用融云默认推送内容
 @param callback     结果回调

 @warning 仅支持单聊、群组和讨论组。
 */
- (void)recallMessage:(RCMessage *)message
          pushContent:(NSString *)pushContent
             callback:(RCIMIWOperationCallbackWithRecallNotificationMessage)callback;

/*!
 删除消息

 @param messageIdList  消息 ID 的列表，元素需要为 NSNumber 类型
 @param callback       结果回调
 */
- (void)deleteMessages:(NSArray<NSNumber *> *)messageIdList
              callback:(RCIMIWOperationCallback)callback;

/*!
 批量删除某个会话中的指定远端消息（同时删除对应的本地消息）

 @param identifier   会话标识
 @param messageList  将被删除的消息列表
 @param callback     结果回调

 @discussion 此方法会同时删除远端和本地消息。
 一次批量操作仅支持删除属于同一个会话的消息，请确保消息列表中的所有消息来自同一会话
 一次最多删除 100 条消息。
 */
- (void)deleteRemoteMessages:(RCConversationIdentifier *)identifier
                 messageList:(NSArray<RCMessage *> *)messageList
                    callback:(RCIMIWOperationCallback)callback;

/*!
 删除某个会话中的所有消息

 @param identifier   会话标识
 @param callback     结果回调
 */
- (void)clearMessages:(RCConversationIdentifier *)identifier
             callback:(RCIMIWOperationCallback)callback;

/*!
 从服务器端清除历史消息

 @param identifier    会话标识
 @param recordTime    清除消息时间戳，【0 <= recordTime <= 当前会话最后一条消息的 sentTime,0
 清除所有消息，其他值清除小于等于 recordTime 的消息】
 @param callback      结果回调

 @discussion
 此方法从服务器端清除历史消息，但是必须先开通历史消息云存储功能。
 例如，您不想从服务器上获取更多的历史消息，通过指定 recordTime 清除成功后只能获取该时间戳之后的历史消息。
 */
- (void)clearRemoteMessages:(RCConversationIdentifier *)identifier
                 recordTime:(long long)recordTime
                   callback:(RCIMIWOperationCallback)callback;

/*!
 设置消息已读回执监听

 @param listener   消息已读回执监听
 */
- (void)setReadReceiptListener:(id<RCIMIWReadReceiptListener>)listener;

/*!
 发送某个会话中消息阅读的回执

 @param identifier     会话标识
 @param timestamp      该会话中已阅读的最后一条消息的发送时间戳
 @param callback       结果回调

 @warning 目前仅支持单聊。
 */
- (void)sendReadReceiptMessage:(RCConversationIdentifier *)identifier
                     timestamp:(long long)timestamp
                      callback:(RCIMIWOperationCallback)callback;

/*!
 请求消息阅读回执

 @param message        要求阅读回执的消息
 @param callback       结果回调

 @discussion 通过此接口，可以要求阅读了这条消息的用户发送阅读回执。
 */
- (void)sendReadReceiptRequest:(RCMessage *)message
                      callback:(RCIMIWOperationCallback)callback;

/*!
 发送阅读回执

 @param identifier      会话标识
 @param messageList     已经阅读了的消息列表
 @param callback        结果回调

 @discussion 当用户阅读了需要阅读回执的消息，可以通过此接口发送阅读回执，消息的发送方即可直接知道那些人已经阅读。
 */
- (void)sendReadReceiptResponse:(RCConversationIdentifier *)identifier
                    messageList:(NSArray<RCMessage *> *)messageList
                       callback:(RCIMIWOperationCallback)callback;

/*!
 同步会话阅读状态（把指定会话里所有发送时间早于 timestamp 的消息置为已读）

 @param identifier       会话标识
 @param timestamp        已经阅读的最后一条消息的 Unix 时间戳(毫秒)
 @param callback         结果回调
 */
- (void)syncConversationReadStatus:(RCConversationIdentifier *)identifier
                         timestamp:(long long)timestamp
                          callback:(RCIMIWOperationCallbackWithConversationIdentifier)callback;

/*!
 更新消息扩展信息

 @param messageUId       消息 messageUId
 @param expansionDic     要更新的消息扩展信息键值对
 @param callback         结果回调
 
 @discussion 消息扩展信息是以字典形式存在。设置的时候从 expansionDic 中读取 key，如果原有的扩展信息中 key 不存在则添加新的 KV 对，如果 key 存在则替换成新的 value。
 @discussion 扩展信息只支持单聊和群组，其它会话类型不能设置扩展信息
 @discussion 扩展信息字典中的 Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，最大长度 32；Value 最长长度，单次设置扩展数量最大为 20，消息的扩展总数不能超过 300
*/
- (void)updateMessageExpansion:(NSString *)messageUId
                  expansionDic:(NSDictionary<NSString *,NSString *> *)expansionDic
                      callback:(RCIMIWOperationCallback)callback;

/*!
 删除消息扩展信息中特定的键值对

 @param messageUId       消息 messageUId
 @param keyList          消息扩展信息中待删除的 key 的列表
 @param callback         结果回调

 @discussion 扩展信息只支持单聊和群组，其它会话类型不能设置扩展信息
*/
- (void)removeMessageExpansionForKey:(NSString *)messageUId
                             keyList:(NSArray<NSString *> *)keyList
                            callback:(RCIMIWOperationCallback)callback;

/*!
 标签变化监听器
 
 @discussion 标签添加移除更新会触发此监听器，用于多端同步
 @discussion 本端添加删除更新标签，不会触发此监听器，在相关调用方法的 block 块直接回调
 */
- (void)setTagChangedListener:(id<RCTagDelegate>)listener;

/*!
 会话标签变化监听器
 
 @discussion 会话标签添加移除更新会触发此监听器，用于多端同步
 @discussion 本端操作会话标签，不会触发此监听器，在相关调用方法的 block 块直接回调
 */
- (void)setConversationTagChangedListener:(id<RCConversationTagDelegate>)listener;

/*!
 添加标签
 
 @param tagInfo    标签信息。只需要设置标签信息的 tagId 和 tagName。
 @param callback   结果回调
 
 @discussion 最多支持添加 20 个标签
 */
- (void)createTag:(RCTagInfo *)tagInfo callback:(RCIMIWOperationCallback)callback;

/*!
 更新标签信息
 
 @param tagInfo    标签信息。只支持修改标签信息的 tagName
 @param callback   结果回调
 */
- (void)updateTag:(RCTagInfo *)tagInfo callback:(RCIMIWOperationCallback)callback;

/*!
 移除标签
 
 @param tagId      标签 ID
 @param callback   结果回调
 */
- (void)deleteTag:(NSString *)tagId callback:(RCIMIWOperationCallback)callback;

/*!
 获取标签列表
 
 @param callback   结果回调
 */
- (void)getTags:(RCIMIWOperationCallbackWithTagInfoList)callback;

/*!
 添加会话到指定标签
 
 @param tagId       标签 ID
 @param identifiers 会话标识列表
 @param callback    结果回调
 
 @discussion 每次添加会话个数最大为 1000。最多支持添加 1000 个会话，如果标签添加的会话总数已超过 1000，会自动覆盖早期添加的会话
 */
- (void)addConversationsToTag:(NSString *)tagId
                  identifiers:(NSArray<RCConversationIdentifier *> *)identifiers
                     callback:(RCIMIWOperationCallback)callback;

/*!
 分页获取标签中会话列表
 
 @param tagId            标签 ID
 @param timestamp        会话的时间戳（获取这个时间戳之前的会话列表，0表示从最新开始获取）
 @param count            获取的数量（当实际取回的会话数量小于 count 值时，表明已取完数据）
 @param callback         结果回调
 */
- (void)getConversationsFromTagByPage:(NSString *)tagId
                            timestamp:(long long)timestamp
                                count:(int)count
                             callback:(RCIMIWOperationCallbackWithConversationList)callback;

/*!
 获取标签中的会话置顶状态
 
 @param identifier    会话标识
 @param tagId         标签 ID
 @param callback      结果回调
 */
- (void)getConversationTopStatusInTag:(RCConversationIdentifier *)identifier
                                tagId:(NSString *)tagId
                             callback:(RCIMIWOperationCallbackWithBool)callback;

/*!
 获取会话的所有标签
 
 @param identifier    会话标识
 @param callback      结果回调
 */
- (void)getTagsFromConversation:(RCConversationIdentifier *)identifier
                       callback:(RCIMIWOperationCallbackWithConversationTagInfoList)callback;

/*!
 从指定标签移除会话
 
 @param tagId         标签 ID
 @param identifiers   会话标识列表
 @param callback      结果回调
 
 @discussion 每次移除会话个数最大为 1000
 */
- (void)removeConversationsFromTag:(NSString *)tagId
        conversationIdentifierList:(NSArray<RCConversationIdentifier *> *)identifiers
                          callback:(RCIMIWOperationCallback)callback;

/*!
 设置标签中的会话置顶
 
 @param tagId         标签 ID
 @param identifier    会话标识
 @param isTop         是否置顶
 @param callback      结果回调
 */
- (void)setConversationToTopInTag:(NSString *)tagId
           conversationIdentifier:(RCConversationIdentifier *)identifier
                            isTop:(BOOL)isTop
                         callback:(RCIMIWOperationCallback)callback;

/*!
 设置聊天室状态监听器

 @param listener 聊天室状态监听器
 */
- (void)setChatRoomActionListener:(id<RCChatRoomStatusDelegate>)listener;

/*!
设置聊天室 KV 状态变化监听器

@param listener 聊天室 KV 状态变化的监听器

@discussion 可以设置并实现此 delegate 来进行聊天室状态变化的监听 。SDK 会在回调中通知您聊天室状态的改变。
*/
- (void)setChatRoomEntryStatusListener:(id<RCChatRoomKVStatusChangeDelegate>)listener;

/*!
 加入聊天室（如果聊天室不存在则会创建）

 @param targetId        聊天室 ID
 @param messageCount    进入聊天室时获取历史消息的数量，-1 <= messageCount <= 50
 @param callback        结果回调

 @discussion
 可以通过传入的 messageCount 设置加入聊天室成功之后需要获取的历史消息数量。
 -1 表示不获取任何历史消息，0 表示不特殊设置而使用SDK默认的设置（默认为获取 10 条），0 < messageCount <= 50
 为具体获取的消息数量,最大值为 50。注：如果是 7.x 系统获取历史消息数量不要大于 30

 @warning 没有加入过的聊天室(或杀死 app 重新打开)，调用该接口会把该聊天室本地的消息与 KV 清除
 */
- (void)joinChatRoom:(NSString *)targetId
        messageCount:(int)messageCount
            callback:(RCIMIWOperationCallback)callback;

/*!
 加入已经存在的聊天室（如果聊天室不存在返回错误 23410，人数超限返回错误 23411）

 @param targetId        聊天室 ID
 @param messageCount    进入聊天室时获取历史消息的数量，-1 <= messageCount <= 50
 @param callback        结果回调

 @discussion
 可以通过传入的 messageCount 设置加入聊天室成功之后，需要获取的历史消息数量。
 -1 表示不获取任何历史消息，0 表示不特殊设置而使用SDK默认的设置（默认为获取 10 条），0 < messageCount <= 50
 为具体获取的消息数量，最大值为 50。

 @warning 没有加入过的聊天室(或杀死 app 重新打开)，调用该接口会把该聊天室本地的消息与 KV 清除
 */
- (void)joinExistChatRoom:(NSString *)targetId
             messageCount:(int)messageCount
                 callback:(RCIMIWOperationCallback)callback;

/*!
 退出聊天室

 @param targetId        聊天室 ID
 @param callback        结果回调
 */
- (void)quitChatRoom:(NSString *)targetId
            callback:(RCIMIWOperationCallback)callback;

/*!
 获取聊天室的信息（包含部分成员信息和当前聊天室中的成员总数）

 @param targetId     聊天室 ID
 @param memberCount  需要获取的成员信息的数量（目前获取到的聊天室信息中仅包含不多于 20 人的成员信息，即 0 <= count <=
 20，传入 0 获取到的聊天室信息将或仅包含成员总数，不包含具体的成员列表）
 @param order        需要获取的成员列表的顺序（最早加入或是最晚加入的部分成员）
 @param callback     结果回调

 @discussion
 因为聊天室一般成员数量巨大，权衡效率和用户体验，目前返回的聊天室信息仅包含不多于 20
 人的成员信息和当前成员总数。如果您使用 RC_ChatRoom_Member_Asc
 升序方式查询，将返回最早加入的成员信息列表，按加入时间从旧到新排列；如果您使用 RC_ChatRoom_Member_Desc
 降序方式查询，将返回最晚加入的成员信息列表，按加入时间从新到旧排列。
 */
- (void)getChatRoomInfo:(NSString *)targetId
            memberCount:(int)memberCount
                  order:(RCChatRoomMemberOrder)order
               callback:(RCIMIWOperationCallbackWithChatRoomInfo)callback;

/*!
 从服务器端获取聊天室的历史消息
 @param targetId         聊天室ID
 @param recordTime       起始的消息发送时间戳，毫秒
 @param count            需要获取的消息数量， 0 < count <= 200
 @param order            拉取顺序，RC_Timestamp_Desc:倒序，RC_Timestamp_ASC:正序
 @param callback         结果回调

 @discussion
 此方法从服务器端获取聊天室的历史消息，但是必须先开通聊天室消息云存储功能。
 指定开始时间,比如2016年9月1日10点(1472695200000),
 默认是0(正序:从存储的第一条消息开始拉取,倒序:从存储的最后一条消息开始拉取)
 */
- (void)getChatRoomRemoteMessages:(NSString *)targetId
                       recordTime:(long long)recordTime
                            count:(int)count
                            order:(RCTimestampOrder)order
                         callback:(RCIMIWOperationCallbackWithMessageListAndSyncTime)callback;

/*!
 设置聊天室自定义属性

 @param roomId              聊天室 ID
 @param key                 聊天室属性名称，Key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，最大长度 128 个字符
 @param value               聊天室属性对应的值，最大长度 4096 个字符
 @param sendNotification    是否需要发送通知，如果发送通知，聊天室中的其他用户会接收到 RCChatroomKVNotificationMessage
 通知消息，消息内容中包含操作类型(type)、属性名称(key)、属性名称对应的值(value)和自定义字段(extra)
 @param autoRemove          用户掉线或退出时，是否自动删除该 Key、Value 值；自动删除时不会发送通知
 @param forceOverWrite      是否强制设置
 @param notificationExtra   通知的自定义字段，RCChatroomKVNotificationMessage 通知消息中会包含此字段，最大长度 2 kb
 @param callback            结果回调

 @discussion 必须先开通聊天室状态存储功能
 强制设置聊天室自定义属性，当 key 不存在时，代表增加属性； 当 key 已经存在时，代表更新属性的值。
 */
- (void)setChatRoomEntry:(NSString *)roomId
                     key:(NSString *)key
                   value:(NSString *)value
        sendNotification:(BOOL)sendNotification
              autoRemove:(BOOL)autoRemove
          forceOverWrite:(BOOL)forceOverWrite
       notificationExtra:(NSString *)notificationExtra
                callback:(RCIMIWOperationCallback)callback;

/*!
 批量设置聊天室自定义属性

 @param roomId            聊天室 ID
 @param chatRoomEntryDic  聊天室属性，key 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式，最大长度 128 个字符，value 聊天室属性对应的值，最大长度 4096 个字符，最多一次设置 10 条
 @param autoRemove        用户掉线或退出时，是否自动删除该 Key、Value 值
 @param overWrite         是否强制覆盖
 @param callback          结果回调

 @discussion 必须先开通聊天室状态存储功能
 */
- (void)setChatRoomEntries:(NSString *)roomId
          chatRoomEntryDic:(NSDictionary<NSString *, NSString *> *)chatRoomEntryDic
                autoRemove:(BOOL)autoRemove
                 overWrite:(BOOL)overWrite
                  callback:(RCIMIWOperationCallback)callback;

/*!
 删除聊天室自定义属性

 @param roomId             聊天室 ID
 @param key                聊天室属性名称
 @param forceRemove        是否强制删除
 @param sendNotification   是否需要发送通知，如果发送通知，聊天室中的其他用户会接收到 RCChatroomKVNotificationMessage
 通知消息，消息内容中包含操作类型(type)、属性名称(key)、属性名称对应的值(value)和自定义字段(extra)
 @param notificationExtra  通知的自定义字段，RCChatroomKVNotificationMessage 通知消息中会包含此字段，最大长度 2 kb
 @param callback           结果回调

 @discussion 必须先开通聊天室状态存储功能
 */
- (void)removeChatRoomEntry:(NSString *)roomId
                        key:(NSString *)key
                forceRemove:(BOOL)forceRemove
           sendNotification:(BOOL)sendNotification
          notificationExtra:(NSString *)notificationExtra
                   callback:(RCIMIWOperationCallback)callback;

/*!
 批量删除聊天室自定义属性

 @param roomId              聊天室 ID
 @param chatRoomEntryList   聊天室属性名称，最多一次删除 10 条
 @param force               是否强制覆盖
 @param callback            结果回调 当 nErrorCode 为 RC_KV_STORE_NOT_ALL_SUCCESS（23428）的时候，entries 才会有值（key 为设置失败的 key，value 为该 key 对应的错误码）

 @discussion 必须先开通聊天室状态存储功能
 */
- (void)removeChatRoomEntries:(NSString *)roomId
            chatRoomEntryList:(NSArray<NSString *> *)chatRoomEntryList
                        force:(BOOL)force
                     callback:(RCIMIWOperationCallbackWithChatRoomEntry)callback;

/*!
 获取聊天室单个属性

 @param roomId              聊天室 ID
 @param key                 聊天室属性名称
 @param callback            结果回调

 @discussion 必须先开通聊天室状态存储功能
 */
- (void)getChatRoomEntry:(NSString *)roomId
                     key:(NSString *)key
                callback:(RCIMIWOperationCallbackWithChatRoomEntry)callback;

/*!
 获取聊天室所有自定义属性

 @param roomId          聊天室 ID
 @param callback        结果回调

 @discussion 必须先开通聊天室状态存储功能
 */
- (void)getAllChatRoomEntries:(NSString *)roomId
                     callback:(RCIMIWOperationCallbackWithChatRoomEntry)callback;

/*!
 将某个用户加入黑名单

 @param userId          需要加入黑名单的用户 ID
 @param callback        结果回调

 @discussion 将对方加入黑名单后，对方再发消息时，就会提示“您的消息已经发出, 但被对方拒收”。但您仍然可以给对方发送消息。
 */
- (void)addToBlackList:(NSString *)userId
              callback:(RCIMIWOperationCallback)callback;

/*!
 将某个用户移出黑名单

 @param userId          需要移出黑名单的用户 ID
 @param callback        结果回调
 */
- (void)removeFromBlackList:(NSString *)userId
                   callback:(RCIMIWOperationCallback)callback;

/*!
 查询已经设置的黑名单列表

 @param callback        结果回调
 */
- (void)getBlackList:(RCIMIWOperationCallbackWithStringList)callback;

/*!
 查询某个用户是否已经在黑名单中

 @param userId          需要查询的用户 ID
 @param callback        结果回调
 [status:该用户是否在黑名单中。0 表示已经在黑名单中，101 表示不在黑名单中]
 */
- (void)getBlackListStatus:(NSString *)userId
                  callback:(RCIMIWOperationCallbackWithBlackListStatus)callback;

/*!
 全局屏蔽某个时间段的消息提醒

 @param startTime       开始消息免打扰时间，格式为 HH:MM:SS
 @param spanMinutes     需要消息免打扰分钟数，0 < spanMinutes < 1440（ 比如，您设置的起始时间是 00：00， 结束时间为
 23：59，则 spanMinutes 为 23 * 60 + 59 = 1439 分钟。）
 @param callback        结果回调

 @discussion 此方法设置的屏蔽时间会在每天该时间段时生效。
 */
- (void)setNotificationQuietHours:(NSString *)startTime
                      spanMinutes:(int)spanMinutes
                         callback:(RCIMIWOperationCallback)callback;

/*!
 删除已设置的全局时间段消息提醒屏蔽

 @param callback        结果回调
 */
- (void)removeNotificationQuietHours:(RCIMIWOperationCallback)callback;

/*!
 查询已设置的全局时间段消息提醒屏蔽

 @param callback        结果回调 [startTime:已设置的屏蔽开始时间,
 spansMin:已设置的屏蔽时间分钟数，0 < spansMin < 1440, status:查询失败的错误码]
 */
- (void)getNotificationQuietHours:(RCIMIWOperationCallbackWithNotificationQuietHourInfo)callback;

@end

NS_ASSUME_NONNULL_END
