//
//  RCRealTimeLocationManager.h
//  RongIMLib
//
//  Created by litao on 15/7/14.
//  Copyright (c) 2015RongCloud RongCloud. All rights reserved.
//

#import <RongIMLibCore/RongIMLibCore.h>
#import "RCRealTimeLocationCommonDefine.h"
#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>

/*!
 *  \~chinese
 实时位置共享监听器
 
 *  \~english
 Real-time location sharing listener 
 */
@protocol RCRealTimeLocationObserver <NSObject>
@optional

/*!
 *  \~chinese
 实时位置共享状态改变的回调

 @param status  当前实时位置共享的状态
 
 *  \~english
 Callback for real-time location sharing state change.

 @param status Status of current real-time location sharing.
 */
- (void)onRealTimeLocationStatusChange:(RCRealTimeLocationStatus)status;

/*!
 *  \~chinese
 参与者位置发生变化的回调

 @param location    参与者的当前位置
 @param type        坐标体系类型
 @param userId      位置发生变化的参与者的用户 ID
 
 *  \~english
 Callback for a change in the location of the participant.

 @param location Current location of the participant.
 @param type Coordinate system type.
 @param userId User ID of the participant whose location has changed.
 */
- (void)onReceiveLocation:(CLLocation *)location type:(RCRealTimeLocationType)type fromUserId:(NSString *)userId;

/*!
 *  \~chinese
 有参与者加入实时位置共享的回调

 @param userId      加入实时位置共享的参与者的用户 ID
 
 *  \~english
 Callback for participants participating in real-time location sharing.

 @param userId User ID of participants participating in real-time location sharing.
 */
- (void)onParticipantsJoin:(NSString *)userId;

/*!
 *  \~chinese
 有参与者退出实时位置共享的回调

 @param userId      退出实时位置共享的参与者的用户 ID
 
 *  \~english
 Callback for participants exiting real-time location sharing.

 @param userId User ID of participants exiting live location sharing.
 */
- (void)onParticipantsQuit:(NSString *)userId;

/*!
 *  \~chinese
 更新位置信息失败的回调

 @param description     失败信息
 
 *  \~english
 Callback for failing to update location information.

 @param description Failure message.
 */
- (void)onUpdateLocationFailed:(NSString *)description;

/*!
 *  \~chinese
 发起实时位置共享失败后执行

 @param messageId   发起失败的消息 ID
 
 *  \~english
 Execute after initiating real-time location sharing failed.

 @param messageId Initiating failed message ID.
 */
- (void)onStartRealTimeLocationFailed:(long)messageId;

@end

/*!
 *  \~chinese
 实时位置共享代理
 
 *  \~english
 Real-time location sharing agent
 */
@protocol RCRealTimeLocationProxy <NSObject>

/*!
 *  \~chinese
 发起实时位置共享
 
 *  \~english
 Initiate real-time location sharing
 */
- (void)startRealTimeLocation;

/*!
 *  \~chinese
 加入实时位置共享
 
 *  \~english
 Join real-time location sharing
 */
- (void)joinRealTimeLocation;

/*!
 *  \~chinese
 退出实时位置共享
 
 *  \~english
 Exit real-time location sharing
 */
- (void)quitRealTimeLocation;

/*!
 *  \~chinese
 注册实时位置共享监听

 @param delegate    实时位置共享监听
 
 *  \~english
 Register real-time location sharing listening.

 @param delegate Real-time location sharing listening.
 */
- (void)addRealTimeLocationObserver:(id<RCRealTimeLocationObserver>)delegate;

/*!
 *  \~chinese
 移除实时位置共享监听

 @param delegate    实时位置共享监听
 
 *  \~english
 Remove real-time location sharing listening.

 @param delegate Real-time location sharing listening.
 */
- (void)removeRealTimeLocationObserver:(id<RCRealTimeLocationObserver>)delegate;

/*!
 *  \~chinese
 获取当前实时位置共享的参与者列表

 @return    当前参与者列表
 
 *  \~english
 Get the list of participants for the current real-time location sharing.

 @ return Current participant list.
 */
- (NSArray *)getParticipants;

/*!
 *  \~chinese
 获取当前实时位置共享状态

 @return    当前实时位置共享状态
 
 *  \~english
 Get the current real-time location sharing status.

 @ return Current real-time location sharing status.
 */
- (RCRealTimeLocationStatus)getStatus;

/*!
 *  \~chinese
 获取参与者的当前位置

 @param userId  需要获取参与者的用户ID

 @return        该参与者的位置信息
 
 *  \~english
 Get the current location of the participant.

 @param userId The user ID of the participant shall be obtained.

 @ return The location information of the participant.
 */
- (CLLocation *)getLocation:(NSString *)userId;

@end

/*!
 *  \~chinese
 实时位置共享管理类
 
 *  \~english
 Real-time location sharing management class.
 */
@interface RCRealTimeLocationManager : NSObject

/*!
 *  \~chinese
 获取实时位置共享的核心类单例

 @return    实时位置共享的核心类单例
 
 *  \~english
 Get a single example of the core class of real-time location sharing.

 @ return Single example of core classes for real-time location sharing.
 */
+ (instancetype)sharedManager;

/*!
 *  \~chinese
 获取实时位置共享的代理

 @param conversationType    会话类型
 @param targetId            目标会话ID
 @param successBlock        获取代理成功的处理
 @param errorBlock          获取代理失败的处理
 
 *  \~english
 Get agents for real-time location sharing.

 @param conversationType Conversation type
 @param targetId Target conversation ID.
 @param successBlock Get the successful processing of the agent.
 @param errorBlock Get the handling of agent failure.
 */
- (void)getRealTimeLocationProxy:(RCConversationType)conversationType
                        targetId:(NSString *)targetId
                         success:(void (^)(id<RCRealTimeLocationProxy> locationShare))successBlock
                           error:(void (^)(RCRealTimeLocationErrorCode status))errorBlock;

@end
