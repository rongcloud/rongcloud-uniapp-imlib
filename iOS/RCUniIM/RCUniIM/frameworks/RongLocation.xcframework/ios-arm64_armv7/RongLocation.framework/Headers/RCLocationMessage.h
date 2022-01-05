/**
 * Copyright (c) 2014-2015, RongCloud.
 * All rights reserved.
 *
 * All the contents are the copyright of RongCloud Network Technology Co.Ltd.
 * Unless otherwise credited. http://rongcloud.cn
 *
 */

//  RCLocationMessage.h
//  Created by Heq.Shinoda on 14-6-13.

#import <RongIMLibCore/RongIMLibCore.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>

/*!
 *  \~chinese
 地理位置消息的类型名
 
 *  \~english
 The type name of the geolocation message 
 */
#define RCLocationMessageTypeIdentifier @"RC:LBSMsg"

/*!
 *  \~chinese
 地理位置消息类

 @discussion 地理位置消息类，此消息会进行存储并计入未读消息数。
 
 @remarks 内容类消息
 
 *  \~english
 Geolocation message class.

 @ discussion Geolocation message class, which is stored and counted as unread messages.
  
  @ remarks content class message.
 */
@interface RCLocationMessage : RCMessageContent <NSCoding>

/*!
 *  \~chinese
 地理位置的二维坐标
 
 *  \~english
 Two-dimensional coordinates of geographical location.
 */
@property (nonatomic, assign) CLLocationCoordinate2D location;

/*!
 *  \~chinese
 地理位置的名称
 
 *  \~english
 The name of the geographic location
 */
@property (nonatomic, copy) NSString *locationName;

/*!
 *  \~chinese
 地理位置的缩略图
 
 *  \~english
 A thumbnail of a geographical location
 */
@property (nonatomic, strong) UIImage *thumbnailImage;

/*!
 *  \~chinese
 地理位置的附加信息
 
 *  \~english
 Additional information about geographical location
 */
@property (nonatomic, copy) NSString *extra;

/*!
 *  \~chinese
 初始化地理位置消息

 @param image 地理位置的缩略图
 @param location 地理位置的二维坐标
 @param locationName 地理位置的名称
 @return 地理位置消息的对象
 
 *  \~english
 Initialize geolocation messages.

 @param image A thumbnail of a geographical location.
 @param location Two-dimensional coordinates of geographical location.
 @param locationName The name of the geographic location.
 @ return objects of geolocation messages.
 */
+ (instancetype)messageWithLocationImage:(UIImage *)image
                                location:(CLLocationCoordinate2D)location
                            locationName:(NSString *)locationName;

@end
