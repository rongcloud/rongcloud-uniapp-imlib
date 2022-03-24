//
//  RCIMIWConverter.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/21.
//

#import <Foundation/Foundation.h>
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongLocation/RongLocation.h>

@class RCIMIWPushNotificationMessage;

NS_ASSUME_NONNULL_BEGIN
/*!
 模型转换器
 */
@interface RCIMIWConverter : NSObject

/// object to dictionary
+ (NSDictionary *)fromMessage:(RCMessage *)message;
+ (NSDictionary *)fromMessageContent:(NSString *)objectName messageContent:(RCMessageContent *)messageContent;
+ (NSDictionary *)fromConversation:(RCConversation *)conversation;
+ (NSDictionary *)fromConversationIdentifier:(RCConversationIdentifier *)conversationIdentifier;
+ (NSDictionary *)fromPushNotificationMessage:(RCIMIWPushNotificationMessage *)message;

/// dictionary to object
+ (RCMessage *)toMessage:(NSDictionary *)map;
+ (RCMessageContent *)toMessageContent:(NSDictionary *)map;
+ (RCConversation *)toConversation:(NSDictionary *)map;
+ (RCConversationIdentifier *)toConversationIdentifier:(NSDictionary *)map;
+ (RCIMIWPushNotificationMessage *)toPushNotificationMessage:(NSDictionary *)map;

@end

NS_ASSUME_NONNULL_END
