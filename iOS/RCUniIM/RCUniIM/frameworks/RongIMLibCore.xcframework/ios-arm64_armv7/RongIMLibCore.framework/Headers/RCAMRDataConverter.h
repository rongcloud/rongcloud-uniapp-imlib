/**
 * Copyright (c) 2014-2015, RongCloud.
 * All rights reserved.
 *
 * All the contents are the copyright of RongCloud Network Technology Co.Ltd.
 * Unless otherwise credited. http://rongcloud.cn
 *
 */

//  RCAMRDataConverter.h
//  Created by Heq.Shinoda on 14-6-17.

#ifndef __RCAMRDataConverter
#define __RCAMRDataConverter

#include "interf_dec.h"
#include "interf_enc.h"
#import <Foundation/Foundation.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*!
 *  \~chinese
 AMR 格式与 WAV 格式音频转换工具类
 *  \~english
 AMR format and WAV format audio conversion tool class
 */
@interface RCAMRDataConverter : NSObject

/*!
 *  \~chinese
 获取 AMR 格式与 WAV 格式音频转换工具类单例

 @return AMR 格式与 WAV 格式音频转换工具类单例
 
 *  \~english
 Get a single example of the audio conversion tool class between AMR format and WAV format.

 @ return Single example of AMR format and WAV format Audio conversion tool class.
 */
+ (RCAMRDataConverter *)sharedAMRDataConverter;

/*!
 *  \~chinese
 将 AMR 格式的音频数据转化为 WAV 格式的音频数据

 @param data    AMR 格式的音频数据，可以是 AMR-NB 或者 AMR-WB 格式
 @return        WAV 格式的音频数据
 
 *  \~english
 Convert audio data in AMR format to audio data in WAV format.

 @param data Audio data in AMR format, which can be AMR-NB or AMR-WB format.
 @ return WAV format audio data.
 */
- (NSData *)decodeAMRToWAVE:(NSData *)data;

/*!
 *  \~chinese
 将 AMR 格式的音频数据转化为 WAV 格式的音频数据

 @param data    AMR格式的音频数据，必须是 AMR-NB 的格式
 @return        WAV格式的音频数据
 
 *  \~english
 Convert audio data in AMR format to audio data in WAV format.

 @param data Audio data in AMR format, must be in AMR-NB format.
 @ return WAV format audio data.
 */
- (NSData *)decodeAMRToWAVEWithoutHeader:(NSData *)data;

/*!
 *  \~chinese
 将 WAV 格式的音频数据转化为 AMR 格式的音频数据（8KHz/16KHz 采样）

 @param data            WAV 格式的音频数据
 @return                AMR-NB/AMR-WB 格式的音频数据
 @discussion 如果采样率为 8KHz 则返回 AMR-NB 格式数据，如果采样率为 16KHz 则返回 AMR-WB 格式数据。
 
 *  \~english
 Convert audio data in WAV format to audio data in AMR format (8KHz/16KHz sampling).

 @param data Audio data in WAV format.
 @ return AMR-NB/AMR-WB format audio data.
 @ discussion Return data in AMR-NB format if the sampling rate is 8KHz and AMR-WB format if the sampling rate is 16KHz.
 */
- (NSData *)encodeWAVEToAMR:(NSData *)data;

@end

#endif
