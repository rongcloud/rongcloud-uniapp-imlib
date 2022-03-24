//
//  RCIMIWMessageContent.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/20.
//

#import <RongIMLibCore/RongIMLibCore.h>

/*!
 自定义消息
 */
@interface RCIMIWMessageContent : RCMessageContent
/*!
 消息类型
 */
@property (nonatomic, copy) NSString *messageType;
/*!
 消息字段
 */
@property (nonatomic, strong) NSDictionary<NSString*, NSString*> *mFields;

+ (instancetype)messageWithType:(NSString *)messageType fields:(NSDictionary<NSString*, NSString*> *)fields;

@end

