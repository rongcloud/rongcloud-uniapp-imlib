//
//  RCIMIWConverter.h
//  RongIMWrapper
//
//  Created by joyoki on 2021/12/21.
//

#import <Foundation/Foundation.h>
#import <RongIMLibCore/RongIMLibCore.h>
//#import <RongLocation/RongLocation.h>
#import "RCIMIWPushNotificationMessage.h"

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWConverter : NSObject

+ (NSDictionary *)fromMessage:(RCMessage *)message;
+ (NSDictionary *)fromMessageContent:(NSString *)objectName messageContent:(RCMessageContent *)messageContent;
+ (NSDictionary *)fromConversation:(RCConversation *)conversation;
+ (NSDictionary *)fromConversationIdentifier:(RCConversationIdentifier *)conversationIdentifier;
+ (NSDictionary *)fromPushNotificationMessage:(RCIMIWPushNotificationMessage *)message;


+ (RCMessage *)toMessage:(NSDictionary *)map;
+ (RCMessageContent *)toMessageContent:(NSDictionary *)map;
+ (RCConversation *)toConversation:(NSDictionary *)map;
+ (RCConversationIdentifier *)toConversationIdentifier:(NSDictionary *)map;
+ (RCIMIWPushNotificationMessage *)toPushNotificationMessage:(NSDictionary *)map;

@end

NS_ASSUME_NONNULL_END
