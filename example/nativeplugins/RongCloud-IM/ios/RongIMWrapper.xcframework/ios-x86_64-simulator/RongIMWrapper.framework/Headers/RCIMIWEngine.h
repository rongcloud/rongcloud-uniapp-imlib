//
//  RCIMIWEngine.h
//  RongIMWrapper
//
//  Created by joyoki on 2021/12/15.
//

#import <Foundation/Foundation.h>
#import "RCIMIWDefine.h"

@class RCIMIWEngineSetup;

NS_ASSUME_NONNULL_BEGIN

@interface RCIMIWEngine : NSObject

+ (instancetype)initWithAppKey:(NSString *)key;

+ (instancetype)initWithAppKey:(NSString *)key config:(RCIMIWEngineSetup *)config;

+ (instancetype)getInstance;

- (void)setDeviceTokenForApplePush:(NSString *)deviceToken;

- (void)setPushContentShowStatus:(BOOL)showContent callback:(RCIMIWOperationCallback)callback;
- (void)getPushContentShowStatus:(RCIMIWOperationCallbackWithBool)callback;

- (void)setPushLanguage:(RCPushLauguage)lang callback:(RCIMIWOperationCallback)callback;
- (void)getPushLanguage:(RCIMIWOperationCallbackWithPushLanguage)callback;

- (void)setPushReceiveStatus:(BOOL)receive callback:(RCIMIWOperationCallback)callback;
- (void)getPushReceiveStatus:(RCIMIWOperationCallbackWithBool)callback;

- (void)notifyOnNotificationMessageArrived:(RCIMIWPushType)pushType
                       notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;
- (void)notifyOnNotificationMessageClicked:(RCIMIWPushType)pushType
                       notificationMessage:(RCIMIWPushNotificationMessage *)notificationMessage;
- (void)setOnNotificationMessageListener:(id<RCIMIWNotificationMessageListener>)listener;

- (void)setOfflineMessageDuration:(int)duration callback:(RCIMIWOperationCallback)callback;
- (void)getOfflineMessageDuration:(RCIMIWOperationCallbackWithInt)callback;

- (void)setKickReconnectedDevice:(BOOL)kick;

- (long long)getDeltaTime;

- (NSString *)getCurrentUserID;

// 连接管理
- (RCIMIWConnectionStatus)getConnectionStatus;
- (void)connect:(NSString *)token callback:(RCIMIWOperationCallbackWithString)callback;
- (void)disconnect;
- (void)logout;

// 会话管理
- (void)getConversation:(RCConversationIdentifier *)identifier
               callback:(RCIMIWOperationCallbackWithConversation)callback;
- (void)removeConversation:(RCConversationIdentifier *)identifier
                  callback:(RCIMIWOperationCallback)callback;
- (void)getConversationList:(NSArray<NSNumber *> *)conversationTypes
                   callback:(RCIMIWOperationCallbackWithConversationList)callback;
- (void)getConversationListByPage:(NSArray<NSNumber *> *)conversationTypes
                            count:(int)count
                        startTime:(long long)startTime
                         callback:(RCIMIWOperationCallbackWithConversationList)callback;
- (void)searchConversation:(NSString *)keyword
      conversationTypeList:(NSArray<NSNumber *> *)conversationTypes
            objectNameList:(NSArray<NSString *> *)objectNames
                  callback:(RCIMIWOperationCallbackWithSearchConversationResultList)callback;
- (void)clearConversations:(NSArray<NSNumber *> *)conversationTypes
                  callback:(RCIMIWOperationCallback)callback;

// 草稿
- (void)getTextMessageDraft:(RCConversationIdentifier *)identifier
                   callback:(RCIMIWOperationCallbackWithString)callback;
- (void)saveTextMessageDraft:(RCConversationIdentifier *)identifier
                   textDraft:(NSString *)textDraft
                    callback:(RCIMIWOperationCallback)callback;
- (void)clearTextMessageDraft:(RCConversationIdentifier *)identifier
                     callback:(RCIMIWOperationCallback)callback;

// 未读计数
- (void)getUnreadCount:(RCConversationIdentifier *)identifier
              callback:(RCIMIWOperationCallbackWithInt)callback;
- (void)getUnreadCountByTag:(NSString *)tagId
             containBlocked:(BOOL)containBlocked
                   callback:(RCIMIWOperationCallbackWithInt)callback;
- (void)getUnreadCountByConversationTypes:(NSArray<NSNumber *> *)conversationTypes
                              containsDND:(BOOL)containsDND
                                 callback:(RCIMIWOperationCallbackWithInt)callback;
- (void)getTotalUnreadCount:(RCIMIWOperationCallbackWithInt)callback;
- (void)clearMessagesUnreadStatus:(RCConversationIdentifier *)identifier
                         callback:(RCIMIWOperationCallback)callback;
- (void)getFirstUnreadMessage:(RCConversationIdentifier *)identifier
                     callback:(RCIMIWOperationCallbackWithMessage)callback;
- (void)getUnreadMentionedMessages:(RCConversationIdentifier *)identifier
                          callback:(RCIMIWOperationCallbackWithMessageList)callback;

// 会话提醒管理
- (void)setConversationNotificationStatus:(RCConversationIdentifier *)identifier
                                isBlocked:(BOOL)isBlocked
                                 callback:(RCIMIWOperationCallbackWithConversationNotificationStatus)callback;

- (void)getConversationNotificationStatus:(RCConversationIdentifier *)identifier
                                 callback:(RCIMIWOperationCallbackWithConversationNotificationStatus)callback;

- (void)getBlockedConversationList:(NSArray<NSNumber *> *)conversationTypes
                          callback:(RCIMIWOperationCallbackWithConversationList)callback;


// 会话置顶
- (void)setConversationStatusListener:(id<RCConversationStatusChangeDelegate>)listener;
- (void)setConversationToTop:(RCConversationIdentifier *)identifier
                       isTop:(BOOL)isTop
                    callback:(RCIMIWOperationCallback)callback;
- (void)getToppedConversationList:(NSArray<NSNumber *> *)conversationTypes
                         callback:(RCIMIWOperationCallbackWithConversationList)callback;

// 输入状态
- (void)setTypingStatusChangedListener:(id<RCTypingStatusDelegate>)listener;
- (void)setTypingUpdateSeconds:(NSInteger)typingUpdateSeconds;
- (void)sendTypingStatus:(RCConversationIdentifier *)identifier typingContent:(NSString *)typingContent;

// 消息管理
- (void)setOnMessageReceivedListener:(id<RCIMClientReceiveMessageDelegate>)listener;

- (void)getMessage:(long)messageId callback:(RCIMIWOperationCallbackWithMessage)callback;
- (void)getMessageByUid:(NSString *)messageUId callback:(RCIMIWOperationCallbackWithMessage)callback;
- (void)setMessageReceivedStatus:(long)messageId
                          status:(RCReceivedStatus)status
                        callback:(RCIMIWOperationCallback)callback;
- (void)setMessageSentStatus:(long)messageId
                      status:(RCSentStatus)status
                    callback:(RCIMIWOperationCallback)callback;
- (void)setMessageExtra:(long)messageId
                  extra:(NSString *)extra
               callback:(RCIMIWOperationCallback)callback;

// 加载消息
- (void)getMessages:(RCConversationIdentifier *)identifier
             option:(RCHistoryMessageOption *)option
           callback:(RCIMIWOperationCallbackWithMessageList)callback;
// 以 messageId 为依据分页加载本地消息
- (void)getHistoryMessages:(RCConversationIdentifier *)identifier
             lastMessageId:(long)lastMessageId
                     count:(int)count
                  callback:(RCIMIWOperationCallbackWithMessageList)callback;
// 本方法仅为指定时间跳转到消息，不可作为分页加载方法使用
- (void)getHistoryMessages:(RCConversationIdentifier *)identifier
                  sentTime:(long)sentTime
               beforeCount:(int)beforeCount
                afterCount:(int)afterCount
                  callback:(RCIMIWOperationCallbackWithMessageList)callback;
// 以时间为依据分页加载远端消息
- (void)getRemoteHistoryMessages:(RCConversationIdentifier *)identifier
          remoteHistoryMsgOption:(RCRemoteHistoryMsgOption *)option
                        callback:(RCIMIWOperationCallbackWithMessageList)callback;

- (void)searchMessages:(RCConversationIdentifier *)identifier
               keyword:(NSString *)keyword
                 count:(int)count
             beginTime:(long)beginTime
              callback:(RCIMIWOperationCallbackWithMessageList)callback;




// 发送消息
- (RCMessage *)sendMessage:(RCConversationIdentifier *)identifier
            messageContent:(RCMessageContent *)content
               pushContent:(NSString *)pushContent
                  pushData:(NSString *)pushData
             messageConfig:(RCMessageConfig *)messageConfig
              successBlock:(void (^)(RCMessage *successMessage))successBlock
                errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

- (RCMessage *)sendMessage:(RCMessage *)message
               pushContent:(NSString *)pushContent
                  pushData:(NSString *)pushData
                sendOption:(RCSendMessageOption *)sendOption
              successBlock:(void (^)(RCMessage *successMessage))successBlock
                errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

// 发送媒体消息
- (RCMessage *)sendMediaMessage:(RCMessage *)message
                    pushContent:(NSString *)pushContent
                       pushData:(NSString *)pushData
                  progressBlock:(void (^)(int progress, RCMessage *progressMessage))progressBlock
                   successBlock:(void (^)(RCMessage *successMessage))successBlock
                     errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock
                         cancel:(void (^)(RCMessage *cancelMessage))cancelBlock;

// 发送定向消息
- (RCMessage *)sendDirectionalMessage:(RCConversationIdentifier *)identifier
                           userIdList:(NSArray<NSString *> *)userIdList
                       messageContent:(RCMessageContent *)messageContent
                          pushContent:(NSString *)pushContent
                             pushData:(NSString *)pushData
                         successBlock:(void (^)(RCMessage *successMessage))successBlock
                           errorBlock:(void (^)(RCErrorCode nErrorCode, RCMessage *errorMessage))errorBlock;

// 媒体消息下载管理
- (void)downloadMediaMessage:(RCMessage *)message
                    progress:(void (^)(int progress))progressBlock
                     success:(void (^)(NSString *mediaPath))successBlock
                       error:(void (^)(RCErrorCode errorCode))errorBlock
                      cancel:(void (^)(void))cancelBlock;

- (void)cancelDownloadMediaMessage:(RCMessage *)message;

// 本地插入消息
- (void)insertMessages:(NSArray<RCMessage *> *)messageList
              callback:(RCIMIWOperationCallback)callback;

- (void)insertIncomingMessage:(RCConversationIdentifier *)identifier
                     senderId:(NSString *)senderId
               receivedStatus:(RCReceivedStatus)receivedStatus
                      content:(RCMessageContent *)content
                     sentTime:(long long)sentTime
                     callback:(RCIMIWOperationCallbackWithMessage)callback;

- (void)insertOutgoingMessage:(RCConversationIdentifier *)identifier
                     senderId:(NSString *)senderId
                   sentStatus:(RCSentStatus)sentStatus
                      content:(RCMessageContent *)content
                     sentTime:(long long)sentTime
                     callback:(RCIMIWOperationCallbackWithMessage)callback;

// 撤回
- (void)recallMessage:(RCMessage *)message
          pushContent:(NSString *)pushContent
             callback:(RCIMIWOperationCallbackWithRecallNotificationMessage)callback;

// 删除消息
- (void)deleteMessages:(NSArray<NSNumber *> *)messageIdList
              callback:(RCIMIWOperationCallback)callback;
- (void)deleteRemoteMessages:(RCConversationIdentifier *)identifier
                 messageList:(NSArray<RCMessage *> *)messageList
                    callback:(RCIMIWOperationCallback)callback;
- (void)clearMessages:(RCConversationIdentifier *)identifier
             callback:(RCIMIWOperationCallback)callback;
- (void)clearRemoteMessages:(RCConversationIdentifier *)identifier
                 recordTime:(long long)recordTime
                   callback:(RCIMIWOperationCallback)callback;

// 已读回执
- (void)sendReadReceiptMessage:(RCConversationIdentifier *)identifier
                     timestamp:(long long)timestamp
                      callback:(RCIMIWOperationCallback)callback;

- (void)sendReadReceiptRequest:(RCMessage *)message
                      callback:(RCIMIWOperationCallback)callback;

- (void)sendReadReceiptResponse:(RCConversationIdentifier *)identifier
                    messageList:(NSArray<RCMessage *> *)messageList
                       callback:(RCIMIWOperationCallback)callback;

- (void)syncConversationReadStatus:(RCConversationIdentifier *)identifier
                         timestamp:(long long)timestamp
                          callback:(RCIMIWOperationCallbackWithConversationIdentifier)callback;

@end

NS_ASSUME_NONNULL_END
