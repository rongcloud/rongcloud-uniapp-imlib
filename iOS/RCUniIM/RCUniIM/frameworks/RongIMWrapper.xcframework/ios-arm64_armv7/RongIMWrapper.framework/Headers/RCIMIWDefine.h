//
//  RCIMIWDefine.h
//  RongIMWrapper
//
//  Created by joyoki on 2021/12/24.
//

#ifndef RCIMIWDefine_h
#define RCIMIWDefine_h

#import <Foundation/Foundation.h>
#import <RongIMLibCore/RongIMLibCore.h>

@class RCIMIWPushNotificationMessage;

/// 连接状态
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

typedef NSString * RCIMIWPushSourceType;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeUnkown;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeOfflineMessage;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeFromAdmin;
extern RCIMIWPushSourceType const RCIMIWPushSourceTypeLocalMessage;


@protocol RCIMIWNotificationMessageListener <NSObject>

- (void)OnNotificationMessageArrived:(RCIMIWPushType)pushType
                 notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

- (void)OnNotificationMessageClicked:(RCIMIWPushType)pushType
                 notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;

@end

typedef void(^RCIMIWOperationCallback)(RCErrorCode code);
typedef void(^RCIMIWOperationCallbackWithBool)(RCErrorCode code, BOOL flag);
typedef void(^RCIMIWOperationCallbackWithInt)(RCErrorCode code, int value);
typedef void(^RCIMIWOperationCallbackWithString)(RCErrorCode code, NSString *string);
typedef void(^RCIMIWOperationCallbackWithPushLanguage)(RCErrorCode code, RCPushLauguage pushLang);
typedef void(^RCIMIWOperationCallbackWithMessage)(RCErrorCode code, RCMessage *message);
typedef void(^RCIMIWOperationCallbackWithMessageList)(RCErrorCode code, NSArray *messages);
typedef void(^RCIMIWOperationCallbackWithConversation)(RCErrorCode code, RCConversation *conversation);
typedef void(^RCIMIWOperationCallbackWithConversationList)(RCErrorCode code, NSArray *conversations);
typedef void(^RCIMIWOperationCallbackWithConversationIdentifier)(RCErrorCode code, RCConversationIdentifier *identifier);
typedef void(^RCIMIWOperationCallbackWithSearchConversationResultList)(RCErrorCode code, NSArray<RCSearchConversationResult *> *searchConversationResults);
typedef void(^RCIMIWOperationCallbackWithConversationNotificationStatus)(RCErrorCode code, RCConversationNotificationStatus status);
typedef void(^RCIMIWOperationCallbackWithRecallNotificationMessage)(RCErrorCode code, RCRecallNotificationMessage *messageContent);



#endif /* RCIMIWDefine_h */
