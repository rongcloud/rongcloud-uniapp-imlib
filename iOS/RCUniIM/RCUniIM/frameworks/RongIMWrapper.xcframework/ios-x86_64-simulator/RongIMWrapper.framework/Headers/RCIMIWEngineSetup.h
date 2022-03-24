//
//  RCIMIWEngineSetup.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/15.
//

#import <Foundation/Foundation.h>

@class RCIMIWImageCompressConfig;

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWEngineSetup : NSObject

/*!
 导航服务器地址
 */
@property (nonatomic, copy) NSString *naviServer;

/*!
 文件服务器地址
 */
@property (nonatomic, copy) NSString *fileServer;

/*!
 统计服务器地址
 */
@property (nonatomic, copy) NSString *statisticServer;

/*!
 设置集成 SDK 的用户 App 版本信息。便于融云排查问题时，作为分析依据，属于自愿行为。
 */
@property (nonatomic, copy) NSString *appVersion;

/*!
 图片压缩配置
 */
@property (nonatomic, strong) RCIMIWImageCompressConfig *imageCompressConfig;

@end

NS_ASSUME_NONNULL_END

