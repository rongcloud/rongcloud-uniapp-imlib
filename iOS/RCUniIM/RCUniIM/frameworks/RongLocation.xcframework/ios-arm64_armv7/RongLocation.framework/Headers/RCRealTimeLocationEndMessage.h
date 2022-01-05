//
//  RCRealTimeLocationEndMessage.h
//  RongIMLib
//
//  Created by RongCloud on 15/8/13.
//  Copyright (c) 2015RongCloud RongCloud. All rights reserved.
//

#import <RongIMLibCore/RongIMLibCore.h>

/*!
 *  \~chinese
 实时位置共享的结束消息的类型名
 
 *  \~english
 The type name of the end message for real-time location sharing 
 */
#define RCRealTimeLocationEndMessageTypeIdentifier @"RC:RLEnd"

/*!
 *  \~chinese
 实时位置共享的结束消息类

 @discussion 实时位置共享的结束消息类，此消息会进行存储并计入未读消息数。
 
 @remarks 信令类消息
 
 *  \~english
 End message class for real-time location sharing.

 @ discussion The end message class of  real-time location sharing, which is stored and counted as unread messages.
  
  @ remarks signaling message
 */
@interface RCRealTimeLocationEndMessage : RCMessageContent

/*!
 *  \~chinese
 结束消息的附加信息
 
 *  \~english
 Additional information for the end message
 */
@property (nonatomic, copy) NSString *extra;

/*!
 *  \~chinese
 初始化实时位置共享的结束消息

 @param extra   附加信息
 @return        初始化实时位置共享的结束消息对象
 
 *  \~english
 Initialize the end message for real-time location sharing.

 @param extra Additional information
 @ return initialize the end message object for real-time location sharing
 */
+ (instancetype)messageWithExtra:(NSString *)extra;

@end
