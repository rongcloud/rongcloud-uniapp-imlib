//
//  RCIMIWTypingStatus.h
//  RongIMWrapper
//
//  Created by joyoki on 2022/1/4.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWTypingStatus : NSObject

/*!
 用户Id
 */
@property (nonatomic, copy) NSString *userId;

/*!
 发送时间
 */
@property (nonatomic, assign) long long sentTime;

/*!
 消息类型  例如：RC:TxtMsg
 */
@property (nonatomic, copy) NSString * typingContentType;


@end

NS_ASSUME_NONNULL_END
