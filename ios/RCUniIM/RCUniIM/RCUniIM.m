//
//  RCUniIM.m
//  RCUniIM
//
//  Created by Qi on 2021/8/16.
//

#import "RCUniIM.h"
#import <RongIMLibCore/RongIMLibCore.h>
#import <RongChatRoom/RongChatRoom.h>

@interface RCUniIM ()<RCConnectionStatusChangeDelegate,RCIMClientReceiveMessageDelegate, RCTypingStatusDelegate, RCLogInfoDelegate>

@end

@implementation RCUniIM

UNI_EXPORT_METHOD_SYNC(@selector(check:value:));
- (void)check:(NSString *)mName value:(id)value {
    NSLog(@"[check] %@ : %@",mName,value);
}

UNI_EXPORT_METHOD_SYNC(@selector(setServerInfo:file:));
- (void)setServerInfo:(NSString *)navigate
                 file:(NSString *)file {//done
    [[RCCoreClient sharedCoreClient] setServerInfo:navigate fileServer:file];
}

UNI_EXPORT_METHOD_SYNC(@selector(setStatisticServer:));
- (void)setStatisticServer:(NSString *)server {
    [RCCoreClient.sharedCoreClient setStatisticServer:server];
}

//设置安卓的推送配置，iOS 空实现
UNI_EXPORT_METHOD_SYNC(@selector(setPushConfig:));
- (void)setPushConfig:(NSDictionary *)dic {
    
}

UNI_EXPORT_METHOD_SYNC(@selector(init:));
- (void)init:(NSString *)key {//done
    [self asyncProcessInMainThread:^{
        [[RCCoreClient sharedCoreClient] initWithAppKey:key];
        [RCCoreClient sharedCoreClient].logLevel = RC_Log_Level_Verbose;
        [[RCCoreClient sharedCoreClient] setRCConnectionStatusChangeDelegate:self];
        [[RCCoreClient sharedCoreClient] setReceiveMessageDelegate:self object:nil];
        [[RCCoreClient sharedCoreClient] setRCTypingStatusDelegate:self];
    }];
}

UNI_EXPORT_METHOD(@selector(connect:callback:));//done
- (void)connect:(NSString *)token callback:(UniModuleKeepAliveCallback)callback {
    [self asyncProcessInMainThread:^{
        [[RCCoreClient sharedCoreClient] connectWithToken:token dbOpened:^(RCDBErrorCode code) {
        } success:^(NSString *userId) {
            NSMutableDictionary *dic = [NSMutableDictionary dictionary];
            [dic setObject:@(0) forKey:@"code"];
            [dic setObject:userId forKey:@"userId"];
            if(callback) {
                callback(dic, NO);
            }
        } error:^(RCConnectErrorCode errorCode) {
            NSMutableDictionary *dic = [NSMutableDictionary dictionary];
            [dic setObject:@(errorCode) forKey:@"code"];
            if(callback) {
                callback(dic, NO);
            }
        }];
    }];
}

UNI_EXPORT_METHOD_SYNC(@selector(disconnect:));//done
- (void)disconnect:(BOOL)isReceivePush {
    [[RCCoreClient sharedCoreClient] disconnect:isReceivePush];
}

UNI_EXPORT_METHOD_SYNC(@selector(setReconnectKickEnable:));//done
- (void)setReconnectKickEnable:(BOOL)enbale {
    [[RCCoreClient sharedCoreClient] setReconnectKickEnable:enbale];
}

UNI_EXPORT_METHOD_SYNC(@selector(getConnectionStatus:));//done
- (void)getConnectionStatus:(UniModuleKeepAliveCallback)callback {
    RCConnectionStatus status = [[RCCoreClient sharedCoreClient] getConnectionStatus];
    if(callback) {
        callback(@{@"status":@(status)},NO);
    }
}

UNI_EXPORT_METHOD_SYNC(@selector(setMessageSentStatus:status:callback:));
- (void)setMessageSentStatus:(int)msgId status:(int)status callback:(UniModuleKeepAliveCallback)callback  {//done
    bool ret = [[RCCoreClient sharedCoreClient] setMessageSentStatus:msgId sentStatus:status];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD_SYNC(@selector(setMessageReceivedStatus:status:callback:));
- (void)setMessageReceivedStatus:(long)msgId status:(int)status callback:(UniModuleKeepAliveCallback)callback{//done
    BOOL ret = [[RCCoreClient sharedCoreClient] setMessageReceivedStatus:msgId receivedStatus:status];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD_SYNC(@selector(sendMessage:callback:));
- (void)sendMessage:(NSDictionary *)message callback:(UniModuleKeepAliveCallback)callback{//done
    [[RCCoreClient sharedCoreClient] sendMessage:[message[@"conversationType"] intValue] targetId:message[@"targetId"] content:[self toMessageContent:message[@"content"]] pushContent:message[@"pushContent"] pushData:message[@"pushData"] success:^(long messageId) {
            if(callback) {
                callback(@{@"code":@(0),@"messageId":@(messageId)},NO);
            }
        } error:^(RCErrorCode nErrorCode, long messageId) {
            if(callback) {
                callback(@{@"code":@(nErrorCode),@"messageId":@(messageId)},NO);
            }
        }];
}

UNI_EXPORT_METHOD_SYNC(@selector(sendMediaMessage:eventId:));
- (void)sendMediaMessage:(NSDictionary *)message eventId:(NSString *)eventId {//done
    [[RCCoreClient sharedCoreClient] sendMediaMessage:[message[@"conversationType"] intValue] targetId:message[@"targetId"] content:[self toMessageContent:message[@"content"]] pushContent:message[@"pushContent"] pushData:message[@"pushData"] progress:^(int progress, long messageId) {
        [self sendEventWithName:@"rcimlib-send-message"
                           body:@{
                             @"type" : @"progress",
                             @"eventId":eventId,
                             @"messageId" : @(messageId),
                             @"progress" : @(progress),
                           }];
        } success:^(long messageId) {
            [self sendEventWithName:@"rcimlib-send-message"
                               body:@{
                                 @"type" : @"success",
                                 @"eventId":eventId,
                                 @"messageId" : @(messageId),
                               }];
        } error:^(RCErrorCode errorCode, long messageId) {
            [self sendEventWithName:@"rcimlib-send-message"
                               body:@{
                                 @"type" : @"error",
                                 @"eventId":eventId,
                                 @"messageId" : @(messageId),
                                 @"errorCode" : @(errorCode),
                               }];
        } cancel:^(long messageId) {
            [self sendEventWithName:@"rcimlib-send-message"
                               body:@{
                                 @"type" : @"cancel",
                                 @"eventId":eventId,
                                 @"messageId" : @(messageId),
                               }];
        }];
}


UNI_EXPORT_METHOD_SYNC(@selector(sendDirectionalMessage:userIdList:callback:));
- (void)sendDirectionalMessage:(NSDictionary *)message userIdList:(NSArray *)userIdList callback:(UniModuleKeepAliveCallback)callback {//done
    [[RCCoreClient sharedCoreClient] sendDirectionalMessage:[message[@"conversationType"] intValue] targetId:message[@"targetId"] toUserIdList:userIdList content:[self toMessageContent:message[@"content"]] pushContent:message[@"pushContent"] pushData:message[@"pushData"] success:^(long messageId) {
            if(callback) {
                callback(@{@"code":@(0),@"messageId":@(messageId)},NO);
            }
        } error:^(RCErrorCode nErrorCode, long messageId) {
            if(callback) {
                callback(@{@"code":@(nErrorCode),@"messageId":@(messageId)},NO);
            }
        }];
}

UNI_EXPORT_METHOD(@selector(recallMessage:pushContent:callback:));
- (void)recallMessage:(int)messageId pushContent:(NSString *)pushContent callback:(UniModuleKeepAliveCallback)callback {//done
    RCMessage *message = [[RCCoreClient sharedCoreClient] getMessage:messageId];
    [[RCCoreClient sharedCoreClient] recallMessage:message pushContent:pushContent success:^(long messageId) {
            RCMessage *msg = [[RCCoreClient sharedCoreClient] getMessage:messageId];
            NSDictionary *dic = @{@"code":@(0),@"message":[self fromMessageContent:msg.content]};
            if(callback) {
                callback(dic,NO);
            }
        } error:^(RCErrorCode errorcode) {
            if(callback) {
                callback(@{@"code":@(errorcode)},NO);
            }
        }];
}

UNI_EXPORT_METHOD_SYNC(@selector(sendTypingStatus:targetId:typingContentType:));
- (void)sendTypingStatus:(int)conversationType targetId:(NSString *)targetId typingContentType:(NSString *)typingContentType {//done
    [[RCCoreClient sharedCoreClient] sendTypingStatus:conversationType targetId:targetId contentType:typingContentType];
}

UNI_EXPORT_METHOD_SYNC(@selector(sendReadReceiptMessage:targetId:timestamp:));
- (void)sendReadReceiptMessage:(int)conversationType targetId:(NSString *)targetId timestamp:(double)timestamp {//done
    [[RCCoreClient sharedCoreClient] sendReadReceiptMessage:conversationType targetId:targetId time:timestamp success:^{
            NSLog(@"sendReadReceiptMessageSuccess");
        } error:^(RCErrorCode nErrorCode) {
            NSLog(@"sendReadReceiptMessageError");
        }];
}

UNI_EXPORT_METHOD(@selector(sendReadReceiptRequest:callback:));
- (void)sendReadReceiptRequest:(int)messageId callback:(UniModuleKeepAliveCallback)callback {//done
    RCMessage *message = [[RCCoreClient sharedCoreClient] getMessage:messageId];
    [[RCCoreClient sharedCoreClient] sendReadReceiptRequest:message success:^{
            if(callback) {
                callback(@{@"code":@(0)},NO);
            }
        } error:^(RCErrorCode nErrorCode) {
            if(callback) {
                callback(@{@"code":@(nErrorCode)},NO);
            }
        }];
}

UNI_EXPORT_METHOD(@selector(setOfflineMessageDuration:callback:));
- (void)setOfflineMessageDuration:(int)duration callback:(UniModuleKeepAliveCallback)callback {//done
    [[RCCoreClient sharedCoreClient] setOfflineMessageDuration:duration success:^{
            if(callback) {
                callback(@{@"code":@(0)},NO);
            }
        } failure:^(RCErrorCode nErrorCode) {
            if(callback) {
                callback(@{@"code":@(nErrorCode)},NO);
            }
        }];
}

UNI_EXPORT_METHOD(@selector(getOfflineMessageDuration:));
- (void)getOfflineMessageDuration:(UniModuleKeepAliveCallback)callback {//done
    int duration = [RCCoreClient.sharedCoreClient getOfflineMessageDuration];
    if(callback) {
        callback(@{@"code":@(0),@"duration":@(duration)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getHistoryMessages:targetId:objectName:baseMessageId:count:isForward:callback:));
- (void)getHistoryMessages:(int)conversationType targetId:(NSString *)targetId objectName:(NSString *)objectName baseMessageId:(int)baseMessageId count:(int)count isForward:(BOOL)isForward callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray *messages;
    if(objectName && objectName.length > 0) {
        messages = [RCCoreClient.sharedCoreClient getHistoryMessages:conversationType targetId:targetId objectName:objectName baseMessageId:baseMessageId isForward:isForward count:count];
    }else {
        messages = [RCCoreClient.sharedCoreClient getHistoryMessages:conversationType targetId:targetId oldestMessageId:baseMessageId count:count];
    }
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
    for (int i = 0; i < messages.count; i += 1) {
      array[i] = [self fromMessage:messages[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"messages":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getHistoryMessagesByTimestamp:targetId:objectNames:timestamp:count:isForward:callback:));
- (void)getHistoryMessagesByTimestamp:(int)conversationType targetId:(NSString *)targetId objectNames:(NSArray<NSString *> *)objectNames timestamp:(double)timestamp count:(int)count isForward:(BOOL)isForward callback:(UniModuleKeepAliveCallback)callback{//done
    NSArray *messages;
    if(objectNames && objectNames.count >0) {
        messages = [RCCoreClient.sharedCoreClient getHistoryMessages:conversationType targetId:targetId objectNames:objectNames sentTime:timestamp isForward:isForward count:count];
    }else {
        messages = [RCCoreClient.sharedCoreClient getHistoryMessages:conversationType targetId:targetId sentTime:timestamp beforeCount:count afterCount:0];
    }
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
    for (int i = 0; i < messages.count; i += 1) {
      array[i] = [self fromMessage:messages[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"messages":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(insertOutgoingMessage:targetId:sentStatus:content:sentTime:callback:));
- (void)insertOutgoingMessage:(int)conversationType targetId:(NSString *)targetId sentStatus:(int)sentStatus content:(NSDictionary *)content sentTime:(double)sentTime callback:(UniModuleKeepAliveCallback)callback {//done
    RCMessage *message;
    if(sentTime) {
        message = [RCCoreClient.sharedCoreClient insertOutgoingMessage:conversationType targetId:targetId sentStatus:sentStatus content:[self toMessageContent:content] sentTime:sentTime];
    }else {
        message = [RCCoreClient.sharedCoreClient insertOutgoingMessage:conversationType targetId:targetId sentStatus:sentStatus content:[self toMessageContent:content]];
    }
    if(message) {
        if(callback) {
            callback(@{@"code":@(0),@"message":[self fromMessage:message]},NO);
        }
    }else {
        if(callback) {
            callback(@{@"code":@(-1)},NO);
        }
    }
}

UNI_EXPORT_METHOD(@selector(insertIncomingMessage: targetId: senderId: receiveStatus: content: sentTime:  callback:));
- (void)insertIncomingMessage:(int)conversationType targetId:(NSString *)targetId senderId:(NSString *)senderId receiveStatus:(int)receiveStatus content:(NSDictionary *)content sentTime:(double)sentTime callback:(UniModuleKeepAliveCallback)callback{//done
    RCMessage *message;
    if(sentTime) {
        message = [RCCoreClient.sharedCoreClient insertIncomingMessage:conversationType targetId:targetId senderUserId:senderId receivedStatus:receiveStatus content:[self toMessageContent:content] sentTime:sentTime];
    }else {
        message = [RCCoreClient.sharedCoreClient insertIncomingMessage:conversationType targetId:targetId senderUserId:senderId receivedStatus:receiveStatus content:[self toMessageContent:content]];
    }
    
    if(message) {
        if(callback) {
            callback(@{@"code":@(0),@"message":[self fromMessage:message]},NO);
        }
    }else {
        if(callback) {
            callback(@{@"code":@(-1)},NO);
        }
    }
}

UNI_EXPORT_METHOD(@selector(clearMessages: targetId: callback:));
- (void)clearMessages:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    bool ret = [[RCCoreClient sharedCoreClient] clearMessages:conversationType targetId:targetId];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(cancelSendMediaMessage: callback:));
- (void)cancelSendMediaMessage:(int)messageId callback:(UniModuleKeepAliveCallback)callback{//done
    bool ret = [[RCCoreClient sharedCoreClient] cancelSendMediaMessage:messageId];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(cancelDownloadMediaMessage: callback:));
- (void)cancelDownloadMediaMessage:(int)messageId callback:(UniModuleKeepAliveCallback)callback{//done
    bool ret = [[RCCoreClient sharedCoreClient] cancelDownloadMediaMessage:messageId];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD_SYNC(@selector(downloadMediaMessage:eventId:));
- (void)downloadMediaMessage:(int)messageId eventId:(NSString *)eventId{//done
    [RCCoreClient.sharedCoreClient downloadMediaMessage:messageId progress:^(int progress) {
        [self sendEventWithName:@"rcimlib-download-media-message"
                           body:@{
                             @"type" : @"progress",
                             @"eventId" : eventId,
                             @"progress" : @(progress),
                           }];
    } success:^(NSString *mediaPath) {
        [self sendEventWithName:@"rcimlib-download-media-message"
                           body:@{
                             @"type" : @"success",
                             @"eventId" : eventId,
                             @"path" : mediaPath,
                           }];
    } error:^(RCErrorCode errorCode) {
        [self sendEventWithName:@"rcimlib-download-media-message"
                           body:@{
                             @"type" : @"error",
                             @"eventId" : eventId,
                             @"errorCode" : @(errorCode),
                           }];
    } cancel:^{
        [self sendEventWithName:@"rcimlib-download-media-message"
                           body:@{
                             @"type" : @"cancel",
                             @"eventId" : eventId,
                           }];
    }];
}

UNI_EXPORT_METHOD(@selector(deleteMessages: targetId: callback:));
- (void)deleteMessages:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient deleteMessages:conversationType targetId:targetId success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getRemoteHistoryMessages: targetId: time: count: callback:));
- (void)getRemoteHistoryMessages:(int)conversationType targetId:(NSString *)targetId time:(double)time count:(double)count callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient getRemoteHistoryMessages:conversationType targetId:targetId recordTime:time count:count success:^(NSArray *messages, BOOL isRemaining) {
        NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
        for (int i = 0; i < messages.count; i += 1) {
          array[i] = [self fromMessage:messages[i]];
        }
        if(callback) {
            callback(@{@"code":@(0),@"messages":array},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(cleanRemoteHistoryMessages: targetId: time: callback:));
- (void)cleanRemoteHistoryMessages:(int)conversationType targetId:(NSString *)targetId time:(double)time callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient clearRemoteHistoryMessages:conversationType targetId:targetId recordTime:time success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(cleanHistoryMessages: targetId: time: cleanRemote: callback:));
- (void)cleanHistoryMessages:(int)conversationType targetId:(NSString *)targetId time:(double)time cleanRemote:(BOOL)cleanRemote callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient clearHistoryMessages:conversationType targetId:targetId recordTime:time clearRemote:cleanRemote success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(deleteMessagesByIds: callback:));
- (void)deleteMessagesByIds:(NSArray *)ids callback:(UniModuleKeepAliveCallback)callback {//done
    bool ret = [RCCoreClient.sharedCoreClient deleteMessages:ids];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(searchConversations: conversationTypes: messageTypes: callback:));
- (void)searchConversations:(NSString *)keyword conversationTypes:(NSArray<NSNumber *> *)conversationTypes messageTypes:(NSArray<NSString *> *)messageTypes callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray<RCSearchConversationResult *> *results = [RCCoreClient.sharedCoreClient searchConversations:conversationTypes messageType:messageTypes keyword:keyword];
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:results.count];
    for (int i = 0; i < results.count; i += 1) {
      array[i] = @{
        @"matchCount" : @(results[i].matchCount),
        @"conversation" : [self fromConversation:results[i].conversation]
      };
    }
    if(callback) {
        callback(@{@"code":@(0),@"result":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(searchMessages: targetId: keyword: count: startTime: callback:));
- (void)searchMessages:(int)conversationType targetId:(NSString *)targetId keyword:(NSString *)keyword count:(int)count startTime:(double)startTime callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray *messages = [RCCoreClient.sharedCoreClient searchMessages:conversationType targetId:targetId keyword:keyword count:count startTime:startTime];
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
    for (int i = 0; i < messages.count; i += 1) {
      array[i] = [self fromMessage:messages[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"result":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getMessage: callback:));
- (void)getMessage:(int)messageId callback:(UniModuleKeepAliveCallback)callback {//done
    RCMessage *message = [RCCoreClient.sharedCoreClient getMessage:messageId];
    if(message) {
        if(callback) {
            callback(@{@"code":@(0),@"message":[self fromMessage:message]},NO);
        }
    }else {
        if(callback) {
            callback(@{@"code":@(-1)},NO);
        }
    }
}

UNI_EXPORT_METHOD(@selector(getMessageByUId: callback:));//done
- (void)getMessageByUId:(NSString *)UId callback:(UniModuleKeepAliveCallback)callback {
    RCMessage *message = [RCCoreClient.sharedCoreClient getMessageByUId:UId];
    NSDictionary *dic = [NSDictionary new];
    if(message) {
        dic = [self fromMessage:message];
    }
    if(callback) {
        callback(@{@"code":@(0),@"message":dic},NO);
    }
}

UNI_EXPORT_METHOD(@selector(setMessageExtra: extra: callback:));
- (void)setMessageExtra:(int)messageId extra:(NSString *)extra callback:(UniModuleKeepAliveCallback)callback {//done
    bool ret = [RCCoreClient.sharedCoreClient setMessageExtra:messageId value:extra];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getMessageSendTime: callback:));
- (void)getMessageSendTime:(int)messageId callback:(UniModuleKeepAliveCallback)callback {//done
    long long time = [RCCoreClient.sharedCoreClient getMessageSendTime:messageId];
    if(callback) {
        callback(@{@"sendTime":@(time)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getMessageCount: targetId: callback:));
- (void)getMessageCount:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    int count = [RCCoreClient.sharedCoreClient getMessageCount:conversationType targetId:targetId];
    if(callback) {
        callback(@{@"code":@(0),@"count":@(count)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getFirstUnreadMessage: targetId: callback:));
- (void)getFirstUnreadMessage:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback{//done
    RCMessage *message = [RCCoreClient.sharedCoreClient getFirstUnreadMessage:conversationType targetId:targetId];
    if(message) {
        if(callback) {
            callback(@{@"code":@(0),@"message":[self fromMessage:message]},NO);
        }
    }else {
        if(callback) {
            callback(@{@"code":@(-1)},NO);
        }
    }
}

UNI_EXPORT_METHOD(@selector(getUnreadMentionedMessages: targetId: callback:));
- (void)getUnreadMentionedMessages:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray *messages = [RCCoreClient.sharedCoreClient getUnreadMentionedMessages:conversationType targetId:targetId];
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
    for (int i = 0; i < messages.count; i += 1) {
      array[i] = [self fromMessage:messages[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"messages":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(sendReadReceiptResponse: targetId: messages: callback:));
- (void)sendReadReceiptResponse:(int)conversationType targetId:(NSString *)targetId messages:(NSArray *)messages callback:(UniModuleKeepAliveCallback)callback {//done
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
    for (int i = 0; i < messages.count; i += 1) {//done
      array[i] = [self fromMessage:messages[i]];
    }
    [RCCoreClient.sharedCoreClient sendReadReceiptResponse:conversationType targetId:targetId messageList:array success:^{
            if(callback) {
                callback(@{@"code":@(0)},NO);
            }
        } error:^(RCErrorCode nErrorCode) {
            if(callback) {
                callback(@{@"code":@(nErrorCode)},NO);
            }
        }];
}

UNI_EXPORT_METHOD(@selector(getConversation: targetId: callback:));
- (void)getConversation:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    RCConversation *con = [RCCoreClient.sharedCoreClient getConversation:conversationType targetId:targetId];
    if(con) {
        if(callback) {
            callback(@{@"code":@(0),@"conversation":[self fromConversation:con]},NO);
        }
    }else {
        if(callback) {
            callback(@{@"code":@(-1)},NO);
        }
    }
}

UNI_EXPORT_METHOD(@selector(removeConversation: targetId: callback:));
- (void)removeConversation:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    bool ret = [RCCoreClient.sharedCoreClient removeConversation:conversationType targetId:targetId];
    int code = ret ? 0 : -1;
    if(callback){
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getConversationList: count: timestamp: callback:));
- (void)getConversationList:(NSArray<NSNumber *> *)conversationTypes count:(int)count timestamp:(double)timestamp callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray *list ;
    if(count > 0) {
        list = [RCCoreClient.sharedCoreClient getConversationList:conversationTypes count:count startTime:timestamp];
    }else {
        list = [RCCoreClient.sharedCoreClient getConversationList:conversationTypes];
    }
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:list.count];
    for (int i = 0; i < list.count; i += 1) {
      array[i] = [self fromConversation:list[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"conversations":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getBlockedConversationList: callback:));
- (void)getBlockedConversationList:(NSArray<NSNumber *> *)conversationTypes callback:(UniModuleKeepAliveCallback)callback {//done
    NSArray *list = [RCCoreClient.sharedCoreClient getBlockedConversationList:conversationTypes];
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:list.count];
    for (int i = 0; i < list.count; i += 1) {
      array[i] = [self fromConversation:list[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"conversations":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(setConversationToTop: targetId: isTop: callback:));
- (void)setConversationToTop:(int)conversationType targetId:(NSString *)targetId isTop:(BOOL)isTop callback:(UniModuleKeepAliveCallback)callback {//done
    bool ret = [RCCoreClient.sharedCoreClient setConversationToTop:conversationType targetId:targetId isTop:isTop];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getTopConversationList: callback:));//done
- (void)getTopConversationList:(NSArray<NSNumber *> *)conversationTypes callback:(UniModuleKeepAliveCallback)callback {
    NSArray *list = [RCCoreClient.sharedCoreClient getTopConversationList:conversationTypes];
    NSMutableArray *array = [NSMutableArray arrayWithCapacity:list.count];
    for (int i = 0; i < list.count; i += 1) {
      array[i] = [self fromConversation:list[i]];
    }
    if(callback) {
        callback(@{@"code":@(0),@"conversations":array},NO);
    }
}

UNI_EXPORT_METHOD(@selector(setConversationNotificationStatus: targetId: isBlock: callback:));//done
- (void)setConversationNotificationStatus:(int)conversationType targetId:(NSString *)targetId isBlock:(BOOL)isBlock callback:(UniModuleKeepAliveCallback)callback {
    [RCCoreClient.sharedCoreClient setConversationNotificationStatus:conversationType targetId:targetId isBlocked:isBlock success:^(RCConversationNotificationStatus nStatus) {
        if(callback) {
            callback(@{@"code":@(0),@"status":@(nStatus)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getConversationNotificationStatus: targetId: callback:));
- (void)getConversationNotificationStatus:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient getConversationNotificationStatus:conversationType targetId:targetId success:^(RCConversationNotificationStatus nStatus) {
        if(callback) {
            callback(@{@"code":@(0),@"status":@(nStatus)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(setNotificationQuietHours: span: callback:));//done
- (void)setNotificationQuietHours:(NSString *)startTime span:(int)span callback:(UniModuleKeepAliveCallback)callback{
    [RCCoreClient.sharedCoreClient setNotificationQuietHours:startTime spanMins:span success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getNotificationQuietHours:));
- (void)getNotificationQuietHours:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient getNotificationQuietHours:^(NSString *startTime, int spansMin) {
        startTime = startTime ? startTime : @"";
        if(callback) {
            callback(@{@"code":@(0),@"startTime" : startTime, @"spanMinutes" : @(spansMin)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(removeNotificationQuietHours:));//done
- (void)removeNotificationQuietHours:(UniModuleKeepAliveCallback)callback {
    [RCCoreClient.sharedCoreClient removeNotificationQuietHours:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(syncConversationReadStatus: targetId: timestamp: callback:));
- (void)syncConversationReadStatus:(int)conversationType targetId:(NSString *)targetId timestamp:(double)timestamp callback:(UniModuleKeepAliveCallback)callback{//done
    [RCCoreClient.sharedCoreClient syncConversationReadStatus:conversationType targetId:targetId time:timestamp success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode nErrorCode) {
        if(callback) {
            callback(@{@"code":@(nErrorCode)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(saveTextMessageDraft: targetId: content: callback:));
- (void)saveTextMessageDraft:(int)conversationType targetId:(NSString *)targetId content:(NSString *)content callback:(UniModuleKeepAliveCallback)callback{//done
    bool ret = [RCCoreClient.sharedCoreClient saveTextMessageDraft:conversationType targetId:targetId content:content];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getTextMessageDraft: targetId: callback:));//done
- (void)getTextMessageDraft:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback{
    NSString *draft = [RCCoreClient.sharedCoreClient getTextMessageDraft:conversationType targetId:targetId];
    if(!draft) {
        draft = @"";
    }
    if(callback) {
        callback(@{@"code":@(0),@"draft":draft},NO);
    }
}

UNI_EXPORT_METHOD(@selector(clearTextMessageDraft: targetId: callback:));
- (void)clearTextMessageDraft:(int)conversationType targetId:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback{//done
    bool ret = [RCCoreClient.sharedCoreClient clearTextMessageDraft:conversationType targetId:targetId];
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getTotalUnreadCount:));
- (void)getTotalUnreadCount:(UniModuleKeepAliveCallback)callback {//done
    int count = [RCCoreClient.sharedCoreClient getTotalUnreadCount];
    if(callback) {
        callback(@{@"code":@(0),@"count":@(count)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(getUnreadCount: targetId: conversationTypes: callback:));
- (void)getUnreadCount:(int)conversationType targetId:(NSString *)targetId conversationTypes:(NSArray<NSNumber *> *)conversationTypes callback:(UniModuleKeepAliveCallback)callback{//done
    int count = -1;
    if(conversationTypes.count > 0) {
        count = [RCCoreClient.sharedCoreClient getUnreadCount:conversationTypes];
    }else {
        count = [RCCoreClient.sharedCoreClient getUnreadCount:conversationType targetId:targetId];
    }
    if(callback) {
        callback(@{@"code":@(0),@"count":@(count)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(clearMessagesUnreadStatus: targetId: time: callback:));
- (void)clearMessagesUnreadStatus:(int)conversationType targetId:(NSString *)targetId time:(double)time callback:(UniModuleKeepAliveCallback)callback{//done
    bool ret ;
    if(time <= 0) {
        ret = [RCCoreClient.sharedCoreClient clearMessagesUnreadStatus:conversationType targetId:targetId];
    }else {
        ret = [RCCoreClient.sharedCoreClient clearMessagesUnreadStatus:conversationType targetId:targetId time:time];
    }
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(addToBlacklist: callback:));
- (void)addToBlacklist:(NSString *)userId callback:(UniModuleKeepAliveCallback)callback{
    [RCCoreClient.sharedCoreClient addToBlacklist:userId success:^{//done
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(removeFromBlacklist: callback:));
- (void)removeFromBlacklist:(NSString *)userId callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient removeFromBlacklist:userId success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getBlacklistStatus: callback:));
- (void)getBlacklistStatus:(NSString *)userId callback:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient getBlacklistStatus:userId success:^(int bizStatus) {
        if(callback) {
            callback(@{@"code":@(0),@"status":@(bizStatus == 0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getBlacklist:));
- (void)getBlacklist:(UniModuleKeepAliveCallback)callback {//done
    [RCCoreClient.sharedCoreClient getBlacklist:^(NSArray *blockUserIds) {
        if(!blockUserIds) {
            blockUserIds = [NSArray new];
        }
        if(callback) {
            callback(@{@"code":@(0),@"list":blockUserIds},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(joinChatRoom: messageCount: callback:));
- (void)joinChatRoom:(NSString *)targetId messageCount:(int)messageCount callback:(UniModuleKeepAliveCallback)callback{//done
    [RCChatRoomClient.sharedChatRoomClient joinChatRoom:targetId messageCount:messageCount success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(joinExistChatRoom: messageCount: callback:));
- (void)joinExistChatRoom:(NSString *)targetId messageCount:(int)messageCount callback:(UniModuleKeepAliveCallback)callback {//done
    [RCChatRoomClient.sharedChatRoomClient joinExistChatRoom:targetId messageCount:messageCount success:^{
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(quitChatRoom: callback:));
- (void)quitChatRoom:(NSString *)targetId callback:(UniModuleKeepAliveCallback)callback  {
    [RCChatRoomClient.sharedChatRoomClient quitChatRoom:targetId success:^{//done
        if(callback) {
            callback(@{@"code":@(0)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getChatRoomInfo: count: order: callback:));
- (void)getChatRoomInfo:(NSString *)targetId count:(int)count order:(int)order callback:(UniModuleKeepAliveCallback)callback{//done
    [RCChatRoomClient.sharedChatRoomClient getChatRoomInfo:targetId count:count order:order success:^(RCChatRoomInfo * _Nonnull chatRoomInfo) {
        if(callback) {
            callback(@{@"code":@(0),@"chatRoomInfo":[self fromChatRoomInfo:chatRoomInfo]},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getRemoteChatRoomHistoryMessages: recordTime: count: order: callback:));//done
- (void)getRemoteChatRoomHistoryMessages:(NSString *)targetId recordTime:(double)recordTime count:(double)count order:(double)order callback:(UniModuleKeepAliveCallback)callback{
    [RCChatRoomClient.sharedChatRoomClient getRemoteChatroomHistoryMessages:targetId recordTime:recordTime count:count order:order success:^(NSArray * _Nonnull messages, long long syncTime) {
        NSMutableArray *array = [NSMutableArray arrayWithCapacity:messages.count];
        for (int i = 0; i < messages.count; i += 1) {
          array[i] = [self fromMessage:messages[i]];
        }
        if(callback) {
            callback(@{@"code":@(0),@"messages" : array, @"syncTime" : @(syncTime)},NO);
        }
    } error:^(RCErrorCode status) {
        if(callback) {
            callback(@{@"code":@(status)},NO);
        }
    }];
}

UNI_EXPORT_METHOD(@selector(getCurrentUserId:));//done
- (void)getCurrentUserId:(UniModuleKeepAliveCallback)callback {
    NSString *userId = RCCoreClient.sharedCoreClient.currentUserInfo.userId;
    if(!userId) {
        userId = @"";
    }
    if(callback) {
        callback(@{@"userId":userId},NO);
    }
}

UNI_EXPORT_METHOD(@selector(setPushContentShowStatus:callback:));//done
- (void)setPushContentShowStatus:(BOOL)status callback:(UniModuleKeepAliveCallback)callback {
    [RCCoreClient.sharedCoreClient.pushProfile setPushReceiveStatus:status success:^{
            if(callback) {
                callback(@{@"code":@(0)},NO);
            }
        } error:^(RCErrorCode status) {
            if(callback) {
                callback(@{@"code":@(status)},NO);
            }
        }];
}

UNI_EXPORT_METHOD(@selector(getPushContentShowStatus:));//done
- (void)getPushContentShowStatus:(UniModuleKeepAliveCallback)callback {
    BOOL ret = RCCoreClient.sharedCoreClient.pushProfile.isShowPushContent;
    int code = ret ? 0 : -1;
    if(callback) {
        callback(@{@"code":@(code),@"status":@(ret)},NO);
    }
}

UNI_EXPORT_METHOD(@selector(setPushLanguageCode:callback:));//done
- (void)setPushLanguageCode:(NSString *)code callback:(UniModuleKeepAliveCallback)callback {
    [RCCoreClient.sharedCoreClient.pushProfile setPushLauguageCode:code success:^{
            if(callback) {
                callback(@{@"code":@(0)},NO);
            }
        } error:^(RCErrorCode status) {
            if(callback) {
                callback(@{@"code":@(status)},NO);
            }
        }];
}

#pragma mark - delegate
- (void)onConnectionStatusChanged:(RCConnectionStatus)status {//done
    [self sendEventWithName:@"rcimlib-connection-status" body:@{@"status":@(status)}];
}

- (void)onReceived:(RCMessage *)message left:(int)left object:(id)object {//done
    [self sendEventWithName:@"rcimlib-receive-message"
                       body:@{@"message" : [self fromMessage:message], @"left" : @(left)}];
}
- (void)onTypingStatusChanged:(RCConversationType)conversationType
                     targetId:(NSString *)targetId
                       status:(NSArray *)status {//done
    if (status.count > 0) {
      RCUserTypingStatus *item = status[0];
      [self sendEventWithName:@"rcimlib-typing-status"
                         body:@{
                           @"conversationType" : @(conversationType),
                           @"targetId" : targetId ? targetId : @"",
                           @"userId" : item.userId ? item.userId : @"",
                           @"typingContentType" : item.contentType ? item.contentType : @"",
                         }];
    } else {
      [self sendEventWithName:@"rcimlib-typing-status"
                         body:@{
                           @"conversationType" : @(conversationType),
                           @"targetId" : targetId ? targetId : @"",
                         }];
    }
}

- (void)didOccurLog:(NSString *)logInfo {//done
    if(!logInfo) {
        return;
    }
    [self sendEventWithName:@"rcimlib-log" body:@{@"logInfo":logInfo}];
}

- (void)onMessageReceiptRequest:(RCConversationType)conversationType
                       targetId:(NSString *)targetId
                     messageUId:(NSString *)messageUId {//done
  [self sendEventWithName:@"rcimlib-receipt-request"
                     body:@{
                       @"conversationType" : @(conversationType),
                       @"targetId" : targetId ? targetId : @"",
                       @"messageUId" : messageUId ? messageUId : @"",
                     }];
}

- (void)onMessageRecalled:(long)messageId {//done
    [self sendEventWithName:@"rcimlib-recall" body:@{@"messageId":@(messageId)}];
}

- (void)onMessageReceiptResponse:(RCConversationType)conversationType
                        targetId:(NSString *)targetId
                      messageUId:(NSString *)messageUId
                      readerList:(NSMutableDictionary *)userIdList {//done
  [self sendEventWithName:@"rcimlib-receipt-response"
                     body:@{
                       @"conversationType" : @(conversationType),
                       @"targetId" : targetId ? targetId : @"",
                       @"messageUId" : messageUId ? messageUId : @"",
                       @"users" : userIdList ? messageUId : [NSDictionary new],
                     }];
}

#pragma mark - helper

- (void)asyncProcessInMainThread:(void (^)(void))block {
    if ([NSThread isMainThread]) {
        block();
    } else {
        dispatch_async(dispatch_get_main_queue(), ^{
            block();
        });
    }
}


- (void)sendEventWithName:(NSString *)name body:(NSDictionary *)dic {
    [self.uniInstance fireModuleEvent:[self class] eventName:name params:dic];
}

- (void)callback:(UniModuleKeepAliveCallback)callback error:(int)error {
    if(callback) {
        callback([@(error) stringValue],NO);
    }
}

- (RCMessageContent *)toMessageContent:(NSDictionary *)content {
  NSString *objectName = content[@"objectName"];
  RCMessageContent *messageContent;

  if ([objectName isEqualToString:@"RC:TxtMsg"]) {
    RCTextMessage *text = [RCTextMessage messageWithContent:content[@"content"]];
    text.extra = content[@"extra"];
    messageContent = text;
  } else if ([objectName isEqualToString:@"RC:ImgMsg"]) {
    NSString *local = content[@"local"];
    RCImageMessage *image = [RCImageMessage
        messageWithImageURI:[local stringByReplacingOccurrencesOfString:@"file://" withString:@""]];
    image.extra = content[@"extra"];
    messageContent = image;
  } else if ([objectName isEqualToString:@"RC:FileMsg"]) {
    NSString *local = content[@"local"];
    RCFileMessage *file = [RCFileMessage
        messageWithFile:[local stringByReplacingOccurrencesOfString:@"file://" withString:@""]];
    file.extra = content[@"extra"];
    messageContent = file;
  } else if ([objectName isEqualToString:@"RC:VcMsg"]) {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:content[@"data"] options:0];
    RCVoiceMessage *voice = [RCVoiceMessage messageWithAudio:data
                                                    duration:[content[@"duration"] intValue]];
    voice.extra = content[@"extra"];
    messageContent = voice;
  } else if ([objectName isEqualToString:@"RC:CmdMsg"]) {
    messageContent = [RCCommandMessage messageWithName:content[@"name"] data:content[@"data"]];
  } else if ([objectName isEqualToString:@"RC:ContactNtf"]) {
    messageContent =
        [RCContactNotificationMessage notificationWithOperation:content[@"operation"]
                                                   sourceUserId:content[@"sourceUserId"]
                                                   targetUserId:content[@"targetUserId"]
                                                        message:content[@"message"]
                                                          extra:content[@"extra"]];
  } else if ([objectName isEqualToString:@"RC:HQVCMsg"]) {
    NSString *local = content[@"local"];
    RCHQVoiceMessage *message = [RCHQVoiceMessage
        messageWithPath:[local stringByReplacingOccurrencesOfString:@"file://" withString:@""]
               duration:[content[@"duration"] intValue]];
    message.extra = content[@"extra"];
    messageContent = message;
  } else if ([objectName isEqualToString:@"RC:GIFMsg"]) {
    // TODO: RCGIFMessage
  }

  if (messageContent) {
    NSDictionary *userInfo = content[@"userInfo"];
    if (userInfo) {
      messageContent.senderUserInfo = [[RCUserInfo alloc] initWithUserId:userInfo[@"userId"]
                                                                    name:userInfo[@"name"]
                                                                portrait:userInfo[@"portraitUrl"]];
    }

    NSDictionary *mentionedInfo = content[@"mentionedInfo"];
    if (mentionedInfo) {
      messageContent.mentionedInfo =
          [[RCMentionedInfo alloc] initWithMentionedType:[mentionedInfo[@"type"] intValue]
                                              userIdList:mentionedInfo[@"userIdList"]
                                        mentionedContent:mentionedInfo[@"mentionedContent"]];
    }
  }

  return messageContent;
}

- (NSDictionary *)fromChatRoomInfo:(RCChatRoomInfo *)chatRoomInfo {
  if(!chatRoomInfo) {
    return [NSDictionary new];
  }
  return @{
    @"targetId" : chatRoomInfo.targetId ? chatRoomInfo.targetId :@"",
    @"memberOrder" : @(chatRoomInfo.memberOrder),
    @"totalMemberCount" : @(chatRoomInfo.totalMemberCount),
    @"members" : [self fromMemberInfoArray:chatRoomInfo.memberInfoArray],
  };
}

- (NSArray *)fromMemberInfoArray:(NSArray<RCChatRoomMemberInfo *> *)list {
  if(list.count <= 0) {
    return [NSArray new];
  }
  NSMutableArray *array = [NSMutableArray arrayWithCapacity:list.count];
  for (int i = 0; i < list.count; i += 1) {
    array[i] = @{
      @"userId" : list[i].userId,
      @"joinTime" : @(list[i].joinTime),
    };
  }
  return array;
}

- (NSDictionary *)fromMessage:(RCMessage *)message {
  if(!message) {
    return [NSDictionary new];
  }
  return @{
    @"conversationType" : @(message.conversationType),
    @"objectName" : message.objectName ? message.objectName : @"",
    @"targetId" : message.targetId ? message.targetId : @"",
    @"messageUId" : message.messageUId ? message.messageUId : @"",
    @"messageId" : @(message.messageId),
    @"messageDirection" : @(message.messageDirection),
    @"senderUserId" : message.senderUserId ? message.senderUserId : @"",
    @"sentTime" : @(message.sentTime),
    @"sentStatus" : @(message.sentStatus),
    @"receivedStatus" : @(message.receivedStatus),
    @"receivedTime" : @(message.receivedTime),
    @"content" : [self fromMessageContent:message.content],
    @"extra" : message.extra ? message.extra : @"",
  };
}

- (NSDictionary *)fromConversation:(RCConversation *)conversation {
  if(!conversation) {
    return [NSDictionary new];
  }
  return @{
    @"conversationType" : @(conversation.conversationType),
    @"conversationTitle" : conversation.conversationTitle ? conversation.conversationTitle : @"",
    @"isTop" : @(conversation.isTop),
    @"unreadMessageCount" : @(conversation.unreadMessageCount),
    @"draft" : conversation.draft ? conversation.draft : @"",
    @"targetId" : conversation.targetId ? conversation.targetId : @"",
    @"objectName" : conversation.objectName ? conversation.objectName :@"",
    @"latestMessageId" : @(conversation.lastestMessageId),
    @"latestMessage" : [self fromMessageContent:conversation.lastestMessage],
    @"receivedStatus" : @(conversation.receivedStatus),
    @"receivedTime" : @(conversation.receivedTime),
    @"sentTime" : @(conversation.sentTime),
    @"sentStatus" : @(conversation.sentStatus),
    @"senderUserId" : conversation.senderUserId ? conversation.senderUserId : @"",
    @"hasUnreadMentioned" : @(conversation.hasUnreadMentioned),
  };
}

- (NSDictionary *)fromMessageContent:(RCMessageContent *)content {
  if ([content isKindOfClass:[RCImageMessage class]]) {
    RCImageMessage *image = (RCImageMessage *)content;
    return @{
      @"objectName" : @"RC:ImgMsg",
      @"local" : image.localPath ? image.localPath : @"",
      @"remote" : image.remoteUrl ? image.remoteUrl : @"",
      @"isFull" : @(image.isFull),
      @"extra" : image.extra ? image.extra : @""
    };
  } else if ([content isKindOfClass:[RCTextMessage class]]) {
    RCTextMessage *text = (RCTextMessage *)content;
    return @{
      @"objectName" : @"RC:TxtMsg",
      @"content" : text.content ? text.content : @"",
      @"extra" : text.extra ? text.extra : @""
    };
  } else if ([content isKindOfClass:[RCFileMessage class]]) {
    RCFileMessage *file = (RCFileMessage *)content;
    return @{
      @"objectName" : @"RC:FileMsg",
      @"local" : file.localPath ? file.localPath : @"",
      @"remote" : file.remoteUrl ? file.remoteUrl : @"",
      @"name" : file.name ? file.name : @"",
      @"fileType" : file.type ? file.type : @"",
      @"size" : @(file.size),
      @"extra" : file.extra ? file.extra : @"",
    };
  } else if ([content isKindOfClass:[RCVoiceMessage class]]) {
    RCVoiceMessage *message = (RCVoiceMessage *)content;
    NSString *data = @"";
    if (message.wavAudioData) {
      data = [message.wavAudioData base64EncodedStringWithOptions:0];
    }
    return @{
      @"objectName" : @"RC:VcMsg",
      @"data" : data ? data : @"",
      @"duration" : @(message.duration),
      @"extra" : message.extra ? message.extra : @"",
    };
  } else if ([content isKindOfClass:[RCRecallNotificationMessage class]]) {
    RCRecallNotificationMessage *message = (RCRecallNotificationMessage *)content;
    return @{
      @"objectName" : @"RC:RcNtf",
      @"operatorId" : message.operatorId ? message.operatorId : @"",
      @"recallTime" : @(message.recallTime),
      @"originalObjectName" : message.originalObjectName ? message.originalObjectName : @"",
      @"isAdmin" : @(message.isAdmin),
    };
  } else if ([content isKindOfClass:[RCContactNotificationMessage class]]) {
    RCContactNotificationMessage *message = (RCContactNotificationMessage *)content;
    return @{
      @"objectName" : @"RC:ContactNtf",
      @"sourceUserId" : message.sourceUserId ? message.sourceUserId : @"",
      @"targetUserId" : message.targetUserId ? message.targetUserId : @"",
      @"message" : message.message ?  message.message : @"",
      @"operation" : message.operation ? message.operation : @"",
      @"extra" : message.extra ? message.extra : @""
    };
  } else if ([content isKindOfClass:[RCCommandNotificationMessage class]]) {
    RCCommandNotificationMessage *message = (RCCommandNotificationMessage *)content;
    return @{
        @"objectName" : @"RC:CmdNtf",
        @"name" : message.name ? message.name : @"",
        @"data" : message.data ? message.data : @""
    };
  } else if ([content isKindOfClass:[RCProfileNotificationMessage class]]) {
    RCProfileNotificationMessage *message = (RCProfileNotificationMessage *)content;
    return @{
      @"objectName" : @"RC:ProfileNtf",
      @"operation" : message.operation ? message.operation : @"",
      @"data" : message.data ? message.data : @"",
      @"extra" : message.extra ? message.extra : @""
    };
  } else if ([content isKindOfClass:[RCInformationNotificationMessage class]]) {
    RCInformationNotificationMessage *message = (RCInformationNotificationMessage *)content;
    return @{
      @"objectName" : @"RC:InfoNtf",
      @"message" : message.message ? message.message : @"",
      @"extra" : message.extra ? message.extra : @""
    };
  } else if ([content isKindOfClass:[RCGroupNotificationMessage class]]) {
    RCGroupNotificationMessage *message = (RCGroupNotificationMessage *)content;
    return @{
      @"objectName" : @"RC:GrpNtf",
      @"operation" : message.operation ?  message.operation : @"",
      @"operatorUserId" : message.operatorUserId ? message.operatorUserId : @"",
      @"message" : message.message ? message.message : @"",
      @"data" : message.data ? message.data : @"",
      @"extra" : message.extra ? message.extra : @""
    };
  } else if ([content isKindOfClass:[RCHQVoiceMessage class]]) {
    RCHQVoiceMessage *message = (RCHQVoiceMessage *)content;
    return @{
      @"objectName" : @"RC:HQVCMsg",
      @"local" : message.localPath ? message.localPath : @"",
      @"remote" : message.remoteUrl ? message.remoteUrl : @"",
      @"duration" : @(message.duration),
      @"extra" : message.extra ? message.extra : @"",
    };
  } else if ([content isKindOfClass:[RCGIFMessage class]]) {
    RCGIFMessage *message = (RCGIFMessage *)content;
    return @{
      @"objectName" : @"RC:GIFMsg",
      @"local" : message.localPath ? message.localPath : @"",
      @"remote" : message.remoteUrl ? message.remoteUrl : @"",
      @"width" : @(message.width),
      @"height" : @(message.height),
      @"gifDataSize" : @(message.gifDataSize),
      @"extra" : message.extra ? message.extra : @"",
    };
  }

  return @{@"error" : @"Content type not yet supported"};
}
@end
