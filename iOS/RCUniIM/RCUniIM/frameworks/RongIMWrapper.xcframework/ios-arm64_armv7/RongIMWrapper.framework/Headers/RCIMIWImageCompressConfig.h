//
//  RCIMIWImageCompressConfig.h
//  RongIMWrapper
//
//  Created by RongCloud on 2021/12/20.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWImageCompressConfig : NSObject

/*!
 大图压缩率
 */
@property(nonatomic, assign) int imageQuality;

/*!
 大图压缩最大边
 */
@property(nonatomic, assign) int imageMaxSize;

/*!
 大图剪裁阈值 200k
 */
@property(nonatomic, assign) int imageMinLength;

/*!
 缩略图压缩率
 */
@property(nonatomic, assign) int thumbQuality;

/*!
 生成缩略图最大边
 */
@property(nonatomic, assign) int thumbMaxSize;

/*!
 缩略图最小边，小于则使用原图
 */
@property(nonatomic, assign) int thumbMinSize;

/// sight
@property(nonatomic, assign) int sightCompressWidth;

@property(nonatomic, assign) int sightCompressHeight;

@end

NS_ASSUME_NONNULL_END
