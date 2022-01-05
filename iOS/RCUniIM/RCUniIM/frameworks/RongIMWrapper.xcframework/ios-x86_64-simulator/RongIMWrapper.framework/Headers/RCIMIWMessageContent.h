//
//  RCIMIWMessageContent.h
//  RongIMWrapper
//
//  Created by joyoki on 2021/12/20.
//

#import <RongIMLibCore/RongIMLibCore.h>

@interface RCIMIWMessageContent : RCMessageContent

@property (nonatomic, copy) NSString *messageType;

@property (nonatomic, strong) NSDictionary<NSString*, NSString*> *mFields;

+ (instancetype)messageWithType:(NSString *)messageType fields:(NSDictionary<NSString*, NSString*> *)fields;

@end

