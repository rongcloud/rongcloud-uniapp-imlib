//
//  RCIMIWPushNotificationMessage.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/24.
//

#import <Foundation/Foundation.h>
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongIMWrapper/RCIMIWDefine.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWPushNotificationMessage : NSObject

/// 对应推送消息的唯一Id,如果是消息转push，则为消息的uid
@property (nonatomic, copy) NSString *pushId;
@property (nonatomic, copy) NSString *targetId;
@property (nonatomic, copy) NSString *objectName;
@property (nonatomic, copy) NSString *senderId;
@property (nonatomic, copy) NSString *senderName;
@property (nonatomic, copy) NSString *senderPortrait;
@property (nonatomic, copy) NSString *targetUserName;
@property (nonatomic, copy) NSString *toUserId;
@property (nonatomic, copy) NSString *pushTitle;
@property (nonatomic, copy) NSString *pushContent;
@property (nonatomic, copy) NSString *pushData;
@property (nonatomic, copy) NSString *extra;
@property (nonatomic, assign) RCConversationType conversationType;
@property (nonatomic, assign) long receivedTime;
@property (nonatomic, assign) bool showPushTitle;
@property (nonatomic, assign) bool showPushContent;
///是push消息时为true, 后台消息时为false
@property (nonatomic, assign) bool isFromPush;
@property (nonatomic, copy) RCIMIWPushSourceType pushSource;

@property (nonatomic, copy) NSString *notifycationId;
@property (nonatomic, copy) NSString *channelId;
@property (nonatomic, copy) NSString *collapseKeyFCM;
@property (nonatomic, copy) NSString *imageUrl;
@property (nonatomic, copy) NSString *busChannel;

@end

NS_ASSUME_NONNULL_END
