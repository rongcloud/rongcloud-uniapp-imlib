//
//  RCRealTimeLocationCommonDefine.h
//  RongIMLib
//
//  Created by LiFei on 2018/3/8.
//  Copyright © 2018RongCloud RongCloud. All rights reserved.
//

#ifndef RCRealTimeLocationCommonDefine_h
#define RCRealTimeLocationCommonDefine_h

/**
 *  \~chinese
 坐标体系类型

 - RCRealTimeLocationTypeWGS84: WGS-84
 - RCRealTimeLocationTypeGCJ02: GCJ-02
 - RCRealTimeLocationTypeBD09: BD-09
 
 *  \~english
 Coordinate system type.

 - RCRealTimeLocationTypeWGS84: WGS-84.
 - RCRealTimeLocationTypeGCJ02: GCJ-02.
 - RCRealTimeLocationTypeBD09: BD-09
 */
typedef NS_ENUM(NSUInteger, RCRealTimeLocationType) {
    RCRealTimeLocationTypeWGS84 = 1,
    RCRealTimeLocationTypeGCJ02 = 2,
    RCRealTimeLocationTypeBD09 = 3
};

/*!
 *  \~chinese
 实时位置共享状态
 
 *  \~english
 Real-time location sharing status.
 */
typedef NS_ENUM(NSInteger, RCRealTimeLocationStatus) {
    /*!
     *  \~chinese
     实时位置共享，初始状态
     
     *  \~english
     Real-time location sharing, initial status
     */
    RC_REAL_TIME_LOCATION_STATUS_IDLE,
    /*!
     *  \~chinese
     实时位置共享，接收状态
     
     *  \~english
     Real-time location sharing, receiving status
     */
    RC_REAL_TIME_LOCATION_STATUS_INCOMING,
    /*!
     *  \~chinese
     实时位置共享，发起状态
     
     *  \~english
     Real-time location sharing, initiating status
     */
    RC_REAL_TIME_LOCATION_STATUS_OUTGOING,
    /*!
     *  \~chinese
     实时位置共享，共享状态
     
     *  \~english
     Real-time location sharing, sharing status
     */
    RC_REAL_TIME_LOCATION_STATUS_CONNECTED
};

/*!
 *  \~chinese
 实时位置共享错误码
 
 *  \~english
 Real-time location sharing error code
 */
typedef NS_ENUM(NSInteger, RCRealTimeLocationErrorCode) {
    /*!
     *  \~chinese
     当前设备不支持实时位置共享
     
     *  \~english
     Current device does not support real-time location sharing
     */
    RC_REAL_TIME_LOCATION_NOT_SUPPORT,
    /*!
     *  \~chinese
     当前会话不支持实时位置共享
     
     *  \~english
     Current conversation does not support real-time location sharing
     */
    RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT,
    /*!
     *  \~chinese
     当前会话超出了参与者人数限制
     
     *  \~english
     The current conversation exceeds the limit on the number of participants
     */
    RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT,
    /*!
     *  \~chinese
     获取当前会话信息失败
     
     *  \~english
     Failed to get current conversation information
     */
    RC_REAL_TIME_LOCATION_GET_CONVERSATION_FAILURE
};

#endif /* RCRealTimeLocationCommonDefine_h */
