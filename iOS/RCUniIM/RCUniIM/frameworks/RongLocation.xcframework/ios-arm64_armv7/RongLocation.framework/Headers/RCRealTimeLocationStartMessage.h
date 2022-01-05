//
//  RCRealTimeLocationStartMessage.h
//  RongIMLib
//
//  Created by litao on 15/7/14.
//  Copyright (c) 2015RongCloud RongCloud. All rights reserved.
//

#import <RongIMLibCore/RongIMLibCore.h>

/*!
 *  \~chinese
 实时位置共享的发起消息的类型名
 
 *  \~english
 Type name of the originating message for real-time location sharing. 
 */
#define RCRealTimeLocationStartMessageTypeIdentifier @"RC:RLStart"

/*!
 *  \~chinese
 实时位置共享的发起消息类

 @discussion 实时位置共享的发起消息类，此消息会进行存储并计入未读消息数。
 
 @remarks 信令类消息
 
 *  \~english
 Initiating message class for real-time location sharing.

 @ discussion The initiating message class of real-time location sharing, which is stored and counted as unread messages.
  
  @ remarks signaling message
 */
@interface RCRealTimeLocationStartMessage : RCMessageContent

/*!
 *  \~chinese
 发起消息的附加信息
 
 *  \~english
 Additional information for initiating messages
 */
@property (nonatomic, copy) NSString *extra;

/*!
 *  \~chinese
 初始化实时位置共享的发起消息

 @param extra   附加信息
 @return        初始化实时位置共享的发起消息对象
 
 *  \~english
 Initialize the initiation message for real-time location sharing.

 @param extra Additional information.
 @ return initialize the initiating message object for real-time location sharing.
 */
+ (instancetype)messageWithExtra:(NSString *)extra;

@end
