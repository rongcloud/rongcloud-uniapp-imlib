//
//  RCIMIWDefine.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/24.
//

#ifndef RCIMIWDefine_h
#define RCIMIWDefine_h

#import <Foundation/Foundation.h>
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongChatRoom/RongChatRoom.h>

@class RCIMIWPushNotificationMessage;
@class RCIMIWTypingStatus;

/*!
 连接状态
 */
typedef NS_ENUM(NSInteger, RCIMIWConnectionStatus) {
    
    /// 未知错误
    RCIMIWConnectionStatusUnknown = -1,
    
    /// 连接成功
    RCIMIWConnectionStatusConnected = 0,
    
    /// 连接中
    RCIMIWConnectionStatusConnecting = 1,
    
    /// 用户账户在其他设备登录，本机会被踢掉线
    RCIMIWConnectionStatusKickedByOtherClient = 2,
    
    /// 网络不可用
    RCIMIWConnectionStatusNetworkUnavailable = 3,
    
    /// Token 不正确
    RCIMIWConnectionStatusTokenIncorrect = 4,
    
    /// 用户被开发者后台封禁
    RCIMIWConnectionStatusUserBlocked = 5,
    
    /// 用户主动调用 disconnect 或 logout 接口断开连接
    RCIMIWConnectionStatusDisConnected = 6,
    
    /// 连接暂时挂起（多是由于网络问题导致），SDK 会在合适时机进行自动重连
    RCIMIWConnectionStatusSuspend = 13,

    /// 自动连接超时，SDK 将不会继续连接，用户需要做超时处理，再自行调用 connectWithToken 接口进行连接
    RCIMIWConnectionStatusTimeout = 14
};

/*!
 推送渠道类型
 */
typedef NSString * RCIMIWPushType;
extern RCIMIWPushType const RCIMIWPushType_UNKNOWN;
extern RCIMIWPushType const RCIMIWPushType_RONG;
extern RCIMIWPushType const RCIMIWPushType_HW;
extern RCIMIWPushType const RCIMIWPushType_MI;
extern RCIMIWPushType const RCIMIWPushType_FCM;
extern RCIMIWPushType const RCIMIWPushType_GCM;
extern RCIMIWPushType const RCIMIWPushType_MEIZU;
extern RCIMIWPushType const RCIMIWPushType_VIVO;
extern RCIMIWPushType const RCIMIWPushType_OPPO;
extern RCIMIWPushType const RCIMIWPushType_APPLE;

/*!
 推送类型
 */
typedef NSString * RCIMIWPushSourceType;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeUnkown;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeOfflineMessage;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeFromAdmin;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeLocalMessage;

/*!
 消息通知监听
 */
@protocol RCIMIWNotificationMessageListener <NSObject>

/*!
 消息通知到达

 @param pushType 推送渠道类型
 @param notificationMessage 消息对象
 */
- (void)onNotificationMessageArrived:(RCIMIWPushType)pushType
                 notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

/*!
 消息通知被点击

 @param pushType 推送渠道类型
 @param notificationMessage 消息对象
 */
- (void)onNotificationMessageClicked:(RCIMIWPushType)pushType
                 notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

@end

/*!
 消息接收监听
 */
@protocol RCIMIWMessageReceivedListener <NSObject>

/*!
 接收消息的回调方法

 @param message 当前接收到的消息
 @param nLeft 还剩余的未接收的消息数，left>=0
 @param offline 是否是离线消息
 @param hasPackage SDK 拉取服务器的消息以包(package)的形式批量拉取，有 package 存在就意味着远端服务器还有消息尚未被 SDK
 拉取
 @discussion 开发者可以根据 nLeft、offline、hasPackage 来决定何时的时机刷新 UI ；建议当 hasPackage=0
 并且 nLeft=0 时刷新 UI
 */
- (void)onReceived:(RCMessage *)message
              left:(int)nLeft
           offline:(BOOL)offline
        hasPackage:(BOOL)hasPackage;
@end

/*!
 消息已读回执监听
 */
@protocol RCIMIWReadReceiptListener <NSObject>

/*!
 收到已读回执

 @param identifier 会话标识
 @param lastMessageSendTime 已阅读的最后一条消息的 sendTime
 
 @discussion 收到这个回调之后可以更新这个会话中 messageTime 以前的消息 UI 为已读（底层数据库消息状态已经改为已读）。
 */
- (void)onReadReceiptReceived:(RCConversationIdentifier *)identifier
          lastMessageSendTime:(long long)lastMessageSendTime;

/*!
 请求消息已读回执

 @param identifier 会话标识
 @param messageUId 请求已读回执的消息ID
 */
- (void)onReadReceiptRequest:(RCConversationIdentifier *)identifier
                  messageUId:(NSString *)messageUId;

/*!
 消息已读回执响应
 
 @param identifier 会话标识
 @param messageUId      请求已读回执的消息ID
 @param respondUserIdList 已读userId列表
 */
- (void)onReadReceiptResponse:(RCConversationIdentifier *)identifier
                   messageUId:(NSString *)messageUId
            respondUserIdList:(NSDictionary *)respondUserIdList;

@end


@protocol RCIMIWTypingStatusChangedLitener <NSObject>

/*!
 用户输入状态变化的回调

 @param identifier    会话标识
 @param typingStatusList 正在输入的RCIMIWTypingStatus列表（空数组表示当前没有用户正在输入）

 @discussion
 当客户端收到用户输入状态的变化时，会回调此接口，通知发生变化的会话以及当前正在输入的RCIMIWTypingStatus列表。

 @warning 目前仅支持单聊。
 */
- (void)onTypingStatusChanged:(RCConversationIdentifier *)identifier
             typingStatusList:(NSArray<RCIMIWTypingStatus *> *)typingStatusList;

@end

typedef void(^RCIMIWOperationCallback)(RCErrorCode code);
typedef void(^RCIMIWOperationCallbackWithBool)(RCErrorCode code, BOOL flag);
typedef void(^RCIMIWOperationCallbackWithInt)(RCErrorCode code, int value);
typedef void(^RCIMIWOperationCallbackWithString)(RCErrorCode code, NSString *string);
typedef void(^RCIMIWOperationCallbackWithStringList)(RCErrorCode code, NSArray<NSString *> *stringList);
typedef void(^RCIMIWOperationCallbackWithPushLanguage)(RCErrorCode code, RCPushLauguage pushLang);
typedef void(^RCIMIWOperationCallbackWithMessage)(RCErrorCode code, RCMessage *message);
typedef void(^RCIMIWOperationCallbackWithMessageList)(RCErrorCode code, NSArray *messages);
typedef void(^RCIMIWOperationCallbackWithMessageListAndSyncTime)(RCErrorCode code, NSArray *messages, long long syncTime);
typedef void(^RCIMIWOperationCallbackWithConversation)(RCErrorCode code, RCConversation *conversation);
typedef void(^RCIMIWOperationCallbackWithConversationList)(RCErrorCode code, NSArray *conversations);
typedef void(^RCIMIWOperationCallbackWithConversationIdentifier)(RCErrorCode code, RCConversationIdentifier *identifier);
typedef void(^RCIMIWOperationCallbackWithSearchConversationResultList)(RCErrorCode code, NSArray<RCSearchConversationResult *> *searchConversationResults);
typedef void(^RCIMIWOperationCallbackWithConversationNotificationStatus)(RCErrorCode code, RCConversationNotificationStatus status);
typedef void(^RCIMIWOperationCallbackWithRecallNotificationMessage)(RCErrorCode code, RCRecallNotificationMessage *messageContent);
typedef void(^RCIMIWOperationCallbackWithTagInfoList)(RCErrorCode code, NSArray<RCTagInfo *> *tagInfos);
typedef void(^RCIMIWOperationCallbackWithConversationTagInfoList)(RCErrorCode code, NSArray<RCConversationTagInfo *> *conversationTagInfos);
typedef void(^RCIMIWOperationCallbackWithChatRoomInfo)(RCErrorCode code, RCChatRoomInfo *chatRoomInfo);
typedef void(^RCIMIWOperationCallbackWithNotificationQuietHourInfo)(RCErrorCode code, NSString *startTime, int spansMin);
typedef void(^RCIMIWOperationCallbackWithBlackListStatus)(RCErrorCode code, int status);
typedef void(^RCIMIWOperationCallbackWithChatRoomEntry)(RCErrorCode code, NSDictionary *entry);



#endif /* RCIMIWDefine_h */
