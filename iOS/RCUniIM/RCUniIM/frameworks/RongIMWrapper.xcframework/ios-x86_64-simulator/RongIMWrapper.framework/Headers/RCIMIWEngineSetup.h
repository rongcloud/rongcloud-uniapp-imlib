//
//  RCIMIWEngineSetup.h
//  RongIMWrapper
//
//  Created by joyoki on 2021/12/15.
//

#import <Foundation/Foundation.h>

@class RCIMIWImageCompressConfig;

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWEngineSetup : NSObject

@property (nonatomic, copy) NSString *naviServer;
@property (nonatomic, copy) NSString *fileServer;
@property (nonatomic, copy) NSString *statisticServer;
@property (nonatomic, copy) NSString *appVersion;
@property (nonatomic, strong) RCIMIWImageCompressConfig *imageCompressConfig;

@end

NS_ASSUME_NONNULL_END
