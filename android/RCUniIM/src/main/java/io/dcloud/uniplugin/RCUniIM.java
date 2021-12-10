package io.dcloud.uniplugin;

import android.util.Log;

import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import io.dcloud.feature.uniapp.annotation.UniJSMethod;
import io.dcloud.feature.uniapp.bridge.UniJSCallback;
import io.dcloud.feature.uniapp.common.UniModule;
import io.rong.imlib.IRongCoreCallback;
import io.rong.imlib.IRongCoreEnum;
import io.rong.imlib.IRongCoreListener;
import io.rong.imlib.RongCommonDefine;
import io.rong.imlib.RongCoreClient;
import io.rong.imlib.chatroom.base.RongChatRoomClient;
import io.rong.imlib.model.ChatRoomInfo;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.Message;
import io.rong.imlib.model.MessageContent;
import io.rong.imlib.model.SearchConversationResult;
import io.rong.imlib.typingmessage.TypingStatus;
import io.rong.message.MediaMessageContent;
import io.rong.message.RecallNotificationMessage;
import io.rong.push.RongPushClient;
import io.rong.push.pushconfig.PushConfig;

import static io.dcloud.uniplugin.Convert.createBooleanCallback;
import static io.dcloud.uniplugin.Convert.createBooleanResultCallback;
import static io.dcloud.uniplugin.Convert.createConversationListCallback;
import static io.dcloud.uniplugin.Convert.createConversationNotificationStatusCallback;
import static io.dcloud.uniplugin.Convert.createMessageCallback;
import static io.dcloud.uniplugin.Convert.createMessagesCallback;
import static io.dcloud.uniplugin.Convert.createOperationCallback;
import static io.dcloud.uniplugin.Convert.errorCallback;
import static io.dcloud.uniplugin.Convert.successCallback;
import static io.dcloud.uniplugin.Convert.toConversationTypeArray;
import static io.dcloud.uniplugin.Convert.toJSON;
import static io.dcloud.uniplugin.Convert.toMessage;
import static io.dcloud.uniplugin.Convert.toMessageContent;
import static io.dcloud.uniplugin.Convert.toStringArray;


public class RCUniIM extends UniModule {

    private static final String TAG = "RCUniIM";

    @UniJSMethod()
    public void init(String appKey) {
        if (isValidContext()) {
            RongCoreClient.init(mUniSDKInstance.getContext(), appKey);
        }

        RongCoreClient.setConnectionStatusListener(new IRongCoreListener.ConnectionStatusListener() {
            @Override
            public void onChanged(ConnectionStatus connectionStatus) {
                Log.e(TAG, "onChanged : " + connectionStatus.getValue());
                Map<String, Object> map = new HashMap<>();
                map.put("status", connectionStatus.getValue());
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-connection-status", RCUniIM.this, map);
                }
            }
        });


        RongCoreClient.setOnReceiveMessageListener(new IRongCoreListener.OnReceiveMessageListener() {
            @Override
            public boolean onReceived(Message message, int left) {
                Map<String, Object> map = new HashMap<>();
                map.put("message", toJSON(message));
                map.put("left", left);
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-receive-message", RCUniIM.this, map);
                }
                return false;
            }
        });

        RongCoreClient.setTypingStatusListener(new IRongCoreListener.TypingStatusListener() {
            @Override
            public void onTypingStatusChanged(Conversation.ConversationType conversationType, String targetId, Collection<TypingStatus> collection) {
                Map<String, Object> map = new HashMap<>();
                map.put("conversationType", conversationType.getValue());
                map.put("targetId", targetId);
                if (collection.size() > 0) {
                    Iterator<TypingStatus> iterator = collection.iterator();
                    TypingStatus status = (TypingStatus) iterator.next();
                    map.put("userId", status.getUserId());
                    map.put("sentTime", status.getSentTime());
                    map.put("typingContentType", status.getTypingContentType());
                }
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-typing-status", RCUniIM.this, map);
                }
            }
        });

        RongCoreClient.setReadReceiptListener(new IRongCoreListener.ReadReceiptListener() {
            @Override
            public void onReadReceiptReceived(Message message) {
                Map<String, Object> map = new HashMap<>();
                map.put("message", message);
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-read-receipt-received", RCUniIM.this, map);
                }
            }

            @Override
            public void onMessageReceiptRequest(Conversation.ConversationType conversationType, String targetId, String messageUId) {
                Map<String, Object> map = new HashMap<>();
                map.put("conversationType", conversationType.getValue());
                map.put("targetId", targetId);
                map.put("messageUId", messageUId);
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-receipt-request", RCUniIM.this, map);
                }
            }

            @Override
            public void onMessageReceiptResponse(Conversation.ConversationType conversationType, String targetId, String messageUId, HashMap<String, Long> respondUserIdList) {
                Map<String, Object> userIdListMap = new HashMap<>();
                for (String userId : respondUserIdList.keySet()) {
                    Long readTime = respondUserIdList.get(userId);
                    if (readTime != null) {
                        userIdListMap.put(userId, readTime);
                    }
                }
                Map<String, Object> map = new HashMap<>();
                map.put("conversationType", conversationType.getValue());
                map.put("targetId", targetId);
                map.put("messageUId", messageUId);
                map.put("users", userIdListMap);
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-receipt-response", RCUniIM.this, map);
                }
            }
        });

        RongCoreClient.setRCLogInfoListener(new IRongCoreListener.RCLogInfoListener() {
            @Override
            public void onRCLogInfoOccurred(String log) {
                Map<String, Object> map = new HashMap<>();
                map.put("logInfo", log);
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-log", RCUniIM.this, map);
                }
            }
        });

        RongCoreClient.setOnRecallMessageListener(new IRongCoreListener.OnRecallMessageListener() {
            @Override
            public boolean onMessageRecalled(Message message, RecallNotificationMessage recallNotificationMessage) {
                Map<String, Object> map = new HashMap<>();
                map.put("messageId", message.getMessageId());
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-recall", RCUniIM.this, map);
                }
                return false;
            }
        });
    }

    private boolean isValidContext() {
        return mUniSDKInstance != null && mUniSDKInstance.getContext() != null;
    }

    @UniJSMethod()
    public void connect(String token, final UniJSCallback callback) {
        RongCoreClient.connect(token, new IRongCoreCallback.ConnectCallback() {
            @Override
            public void onSuccess(String s) {
                JSONObject data = new JSONObject();
                data.put("userId", s);
                data.put("code", 0);
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.ConnectionErrorCode connectionErrorCode) {
                JSONObject data = new JSONObject();
                data.put("code", connectionErrorCode.getValue());
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onDatabaseOpened(IRongCoreEnum.DatabaseOpenStatus databaseOpenStatus) {

            }
        });
    }

    @UniJSMethod()
    public void disconnect(Boolean isReceivePush) {
        if (isReceivePush) {
            RongCoreClient.getInstance().disconnect();
        } else {
            RongCoreClient.getInstance().logout();
        }
    }

    @UniJSMethod()
    public void setServerInfo(String naviServer, String fileServer) {
        RongCoreClient.setServerInfo(naviServer, fileServer);
    }

    @UniJSMethod()
    public void sendMessage(Map<String, Object> data, UniJSCallback uniJSCallback) {
        if (!isValidContext()) {
            return;
        }
        try {
            Message message = toMessage(mUniSDKInstance.getContext(), data);
            String pushContent = getStringFromMap(data, "pushContent");
            String pushData = getStringFromMap(data, "pushData");
            RongCoreClient.getInstance().sendMessage(message, pushContent, pushData, createSendMessageCallback(uniJSCallback));
        } catch (Exception e) {
            Log.i(TAG, "e :" + e.toString());
            onSendMessageError(uniJSCallback);
        }
    }

    private void onSendMessageError(UniJSCallback uniJSCallback) {
        JSONObject messageData = new JSONObject();
        messageData.put("code", IRongCoreEnum.CoreErrorCode.PARAMETER_ERROR.getValue());
        messageData.put("messageId", -1);
        if (uniJSCallback != null) {
            uniJSCallback.invokeAndKeepAlive(messageData);
        }
    }

    @UniJSMethod()
    public void sendMediaMessage(Map<String, Object> data, String eventId) {
        if (!isValidContext()) {
            return;
        }
        try {
            Message message = toMessage(mUniSDKInstance.getContext(), data);
            String pushContent = getStringFromMap(data, "pushContent");
            String pushData = getStringFromMap(data, "pushData");
            RongCoreClient.getInstance().sendMediaMessage(message, pushContent, pushData, createSendMediaMessageCallback(eventId));
        } catch (Exception e) {
            Log.i(TAG, "e :" + e.toString());
            Map<String, Object> map = new HashMap<>();
            map.put("type", "error");
            map.put("eventId", eventId);
            map.put("errorCode", IRongCoreEnum.CoreErrorCode.PARAMETER_ERROR.getValue());
            map.put("messageId", -1);
            if (mUniSDKInstance != null) {
                mUniSDKInstance.fireModuleEvent("rcimlib-send-message", RCUniIM.this, map);
            }
        }
    }

    @UniJSMethod()
    public void sendDirectionalMessage(Map<String, Object> data, Object[] users, UniJSCallback uniJSCallback) {
        if (!isValidContext()) {
            return;
        }
        try {
            Conversation.ConversationType conversationType = Conversation.ConversationType.setValue(Integer.parseInt(String.valueOf(data.get("conversationType"))));
            MessageContent messageContent = toMessageContent(mUniSDKInstance.getContext(), (Map<String, Object>) data.get("content"));
            String targetId = (String) data.get("targetId");
            String pushContent = getStringFromMap(data, "pushContent");
            String pushData = getStringFromMap(data, "pushData");
            String[] array = toStringArray(users);
            RongCoreClient.getInstance().sendDirectionalMessage(
                    conversationType, targetId, messageContent, array, pushContent, pushData, createSendMessageCallback(uniJSCallback));
        } catch (Exception e) {
            onSendMessageError(uniJSCallback);
        }
    }


    @UniJSMethod()
    public void recallMessage(int id, final String pushContent, final UniJSCallback callback) {
        RongCoreClient.getInstance().getMessage(id, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                RongCoreClient.getInstance().recallMessage(message, pushContent, new IRongCoreCallback.ResultCallback<RecallNotificationMessage>() {
                    @Override
                    public void onSuccess(RecallNotificationMessage message) {
                        JSONObject data = new JSONObject();
                        data.put("code", 0);
                        JSONObject map = new JSONObject();
                        map.put("objectName", "RC:RcNtf");
                        map.put("operatorId", message.getOperatorId());
                        map.put("recallTime", message.getRecallTime());
                        map.put("originalObjectName", message.getOriginalObjectName());
                        map.put("isAdmin", message.isAdmin());
                        data.put("message", map);
                        if (callback != null) {
                            callback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        JSONObject data = new JSONObject();
                        data.put("code", coreErrorCode.getValue());
                        if (callback != null) {
                            callback.invokeAndKeepAlive(data);
                        }
                    }
                });
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                JSONObject data = new JSONObject();
                data.put("value", coreErrorCode.getValue());
                data.put("message", coreErrorCode.getMessage());
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }
        });
    }

    @UniJSMethod()
    public void getHistoryMessages(
            int type, String targetId, String objectName, int oldestMessageId, int count, boolean isForward, final UniJSCallback callback) {
        if (objectName == null || objectName.isEmpty()) {
            RongCoreClient.getInstance().getHistoryMessages(
                    Conversation.ConversationType.setValue(type), targetId, oldestMessageId, count, createMessagesCallback(callback));
        } else {
            RongCommonDefine.GetMessageDirection direction = isForward ? RongCommonDefine.GetMessageDirection.FRONT : RongCommonDefine.GetMessageDirection.BEHIND;
            RongCoreClient.getInstance().getHistoryMessages(
                    Conversation.ConversationType.setValue(type), targetId, objectName, oldestMessageId, count, direction, createMessagesCallback(callback));
        }
    }

    @UniJSMethod()
    public void getHistoryMessagesByTimestamp(
            int type, String targetId, Object[] objectNames, double timestamp, int count, boolean isForward, final UniJSCallback callback) {
        if (objectNames == null || objectNames.length == 0) {
            RongCoreClient.getInstance().getHistoryMessages(
                    Conversation.ConversationType.setValue(type), targetId, (long) timestamp, count, 0, createMessagesCallback(callback));
        } else {
            RongCommonDefine.GetMessageDirection direction = isForward ? RongCommonDefine.GetMessageDirection.FRONT : RongCommonDefine.GetMessageDirection.BEHIND;
            ArrayList<String> names = Convert.toStringList(objectNames);
            RongCoreClient.getInstance().getHistoryMessages(
                    Conversation.ConversationType.setValue(type), targetId, names, (long) timestamp, count, direction, createMessagesCallback(callback));
        }
    }

    @UniJSMethod()
    public void getRemoteHistoryMessages(int type, String targetId, double sentTime, int count, final UniJSCallback uniJSCallback) {
        IRongCoreCallback.ResultCallback<List<Message>> callback = createMessagesCallback(uniJSCallback);
        Conversation.ConversationType conversationType = Conversation.ConversationType.setValue(type);
        RongCoreClient.getInstance().getRemoteHistoryMessages(conversationType, targetId, (long) sentTime, count, callback);
    }

    @UniJSMethod()
    public void insertOutgoingMessage(int type, String targetId, int status, Map<String, Object> content, int sentTime, final UniJSCallback uniJSCallback) {
        MessageContent messageContent = toMessageContent(mUniSDKInstance.getContext(), content);
        Message.SentStatus sentStatus = Message.SentStatus.setValue(status);
        Conversation.ConversationType conversationType = Conversation.ConversationType.setValue(type);
        if (sentTime <= 0) {
            RongCoreClient.getInstance().insertOutgoingMessage(
                    conversationType, targetId, sentStatus, messageContent, createMessageCallback(uniJSCallback));
        } else {
            RongCoreClient.getInstance().insertOutgoingMessage(
                    conversationType, targetId, sentStatus, messageContent, sentTime, createMessageCallback(uniJSCallback));
        }
    }

    @UniJSMethod()
    public void insertIncomingMessage(int type, String targetId, String senderId, int status, Map<String, Object> content, int sentTime, final UniJSCallback uniJSCallback) {
        MessageContent messageContent = toMessageContent(mUniSDKInstance.getContext(), content);
        Message.ReceivedStatus receivedStatus = new Message.ReceivedStatus(status);
        Conversation.ConversationType conversationType = Conversation.ConversationType.setValue(type);
        if (sentTime == 0) {
            RongCoreClient.getInstance().insertIncomingMessage(
                    conversationType, targetId, senderId, receivedStatus, messageContent, createMessageCallback(uniJSCallback));
        } else {
            RongCoreClient.getInstance().insertIncomingMessage(
                    conversationType, targetId, senderId, receivedStatus, messageContent, sentTime, createMessageCallback(uniJSCallback));
        }
    }

    @UniJSMethod()
    public void clearMessages(int type, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().clearMessages(
                Conversation.ConversationType.setValue(type), targetId, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void deleteMessages(int type, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().deleteMessages(
                Conversation.ConversationType.setValue(type), targetId, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void deleteMessagesByIds(Object[] ids, final UniJSCallback uniJSCallback) {
        int[] array = new int[ids.length];
        for (int i = 0; i < ids.length; i += 1) {
            array[i] = (int) ids[i];
        }
        RongCoreClient.getInstance().deleteMessages(array, createBooleanCallback(uniJSCallback));
    }

//    @UniJSMethod()
//    public void deleteMessages(int type, String targetId, Object[] messages, final UniJSCallback uniJSCallback) {
//        Message[] array = new Message[messages.length];
//        for (int i = 0; i < messages.length; i += 1) {
//            Map message = (Map) messages[i];
//            if (message == null) {
//                array[i] = null;
//            } else {
//                array[i] = toMessage(mUniSDKInstance.getContext(), message);
//            }
//        }
//        RongIMClient.getInstance().deleteRemoteMessages(
//                Conversation.ConversationType.setValue(type), targetId, array, new RongIMClient.OperationCallback() {
//                    @Override
//                    public void onSuccess() {
//                        successCallback(uniJSCallback);
//                    }
//
//                    @Override
//                    public void onError(RongIMClient.ErrorCode errorCode) {
//                        errorCallback(errorCode, uniJSCallback);
//                    }
//                });
//    }

    @UniJSMethod()
    public void searchConversations(String keyword, Object[] types, Object[] objectNames, final UniJSCallback uniJSCallback) {
        Conversation.ConversationType[] conversationTypes = toConversationTypeArray(types);
        String[] objectNamesArray = toStringArray(objectNames);
        RongCoreClient.getInstance().searchConversations(
                keyword, conversationTypes, objectNamesArray, new IRongCoreCallback.ResultCallback<List<SearchConversationResult>>() {
                    @Override
                    public void onSuccess(List<SearchConversationResult> conversations) {
                        if (conversations == null) {
                            return;
                        }
                        int size = conversations.size();
                        Object[] result = new Object[size];
                        int count = 0;
                        for (SearchConversationResult item : conversations) {
                            Map<String, Object> map = new HashMap<>();
                            map.put("conversation", toJSON(item.getConversation()));
                            map.put("matchCount", item.getMatchCount());
                            result[count] = map;
                            count++;
                        }
                        JSONObject data = new JSONObject();
                        data.put("code", 0);
                        data.put("result", result);
                        if (uniJSCallback != null) {
                            uniJSCallback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        errorCallback(coreErrorCode, uniJSCallback);
                    }
                });
    }

    @UniJSMethod()
    public void searchMessages(int conversationType, String targetId, String keyword, int count, double startTime, final UniJSCallback uniJSCallback) {
        IRongCoreCallback.ResultCallback<List<Message>> callback = createMessagesCallback(uniJSCallback);
        RongCoreClient.getInstance().searchMessages(
                Conversation.ConversationType.setValue(conversationType), targetId, keyword, count, (long) startTime, callback);
    }

    @UniJSMethod()
    public void getConversation(int conversationType, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getConversation(
                Conversation.ConversationType.setValue(conversationType), targetId, new IRongCoreCallback.ResultCallback<Conversation>() {
                    @Override
                    public void onSuccess(Conversation conversation) {
                        JSONObject data = new JSONObject();
                        data.put("code", 0);
                        if (conversation == null) {
                            data.put("conversation", new HashMap<>());
                        } else {
                            data.put("conversation", toJSON(conversation));
                        }
                        if (uniJSCallback != null) {
                            uniJSCallback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        errorCallback(coreErrorCode, uniJSCallback);
                    }
                });
    }

    @UniJSMethod()
    public void getConversationList(Object[] conversationTypes, int count, int timestamp, final UniJSCallback uniJSCallback) {
        Conversation.ConversationType[] types = toConversationTypeArray(conversationTypes);
        IRongCoreCallback.ResultCallback<List<Conversation>> callback = createConversationListCallback(uniJSCallback);
        if (types.length > 0) {
            if (count > 0) {
                RongCoreClient.getInstance().getConversationListByPage(callback, timestamp, count, types);
            } else {
                RongCoreClient.getInstance().getConversationList(callback, types);
            }
        } else {
            RongCoreClient.getInstance().getConversationList(callback);
        }
    }

    @UniJSMethod()
    public void getBlockedConversationList(Object[] conversationTypes, final UniJSCallback uniJSCallback) {
        Conversation.ConversationType[] types = toConversationTypeArray(conversationTypes);
        RongCoreClient.getInstance().getBlockedConversationList(createConversationListCallback(uniJSCallback), types);
    }

    @UniJSMethod()
    public void removeConversation(int conversationType, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().removeConversation(
                Conversation.ConversationType.setValue(conversationType), targetId, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setConversationNotificationStatus(int conversationType, String targetId, boolean isBlock, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setConversationNotificationStatus(
                Conversation.ConversationType.setValue(conversationType),
                targetId,
                isBlock ? Conversation.ConversationNotificationStatus.DO_NOT_DISTURB : Conversation.ConversationNotificationStatus.NOTIFY,
                createConversationNotificationStatusCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getConversationNotificationStatus(int conversationType, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getConversationNotificationStatus(
                Conversation.ConversationType.setValue(conversationType), targetId, createConversationNotificationStatusCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void saveTextMessageDraft(int conversationType, String targetId, String content, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().saveTextMessageDraft(
                Conversation.ConversationType.setValue(conversationType), targetId, content, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getTextMessageDraft(int conversationType, String targetId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getTextMessageDraft(
                Conversation.ConversationType.setValue(conversationType), targetId, new IRongCoreCallback.ResultCallback<String>() {
                    @Override
                    public void onSuccess(String content) {
                        JSONObject data = new JSONObject();
                        data.put("code", 0);
                        data.put("draft", content);
                        if (uniJSCallback != null) {
                            uniJSCallback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        errorCallback(coreErrorCode, uniJSCallback);
                    }
                });
    }

    @UniJSMethod()
    public void getTotalUnreadCount(final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getTotalUnreadCount(new IRongCoreCallback.ResultCallback<Integer>() {
            @Override
            public void onSuccess(Integer count) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("count", count);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void getUnreadCount(int conversationType, String targetId, Object[] conversationTypes, final UniJSCallback uniJSCallback) {
        IRongCoreCallback.ResultCallback<Integer> callback = new IRongCoreCallback.ResultCallback<Integer>() {
            @Override
            public void onSuccess(Integer count) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("count", count);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        };
        if (conversationType <= 0) {
            Conversation.ConversationType[] types = toConversationTypeArray(conversationTypes);
            RongCoreClient.getInstance().getUnreadCount(callback, types);
        } else {
            RongCoreClient.getInstance().getUnreadCount(Conversation.ConversationType.setValue(conversationType), targetId, callback);
        }
    }

    @UniJSMethod()
    public void clearMessagesUnreadStatus(int conversationType, String targetId, double time, final UniJSCallback uniJSCallback) {
        if (time <= 0) {
            RongCoreClient.getInstance().clearMessagesUnreadStatus(
                    Conversation.ConversationType.setValue(conversationType), targetId, createBooleanCallback(uniJSCallback));
        } else {
            RongCoreClient.getInstance().clearMessagesUnreadStatus(
                    Conversation.ConversationType.setValue(conversationType), targetId, (long) time, new IRongCoreCallback.OperationCallback() {
                        @Override
                        public void onSuccess() {
                            successCallback(uniJSCallback);
                        }

                        @Override
                        public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                            errorCallback(coreErrorCode, uniJSCallback);
                        }
                    });
        }
    }

    @UniJSMethod()
    public void addToBlacklist(String userId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().addToBlacklist(userId, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void removeFromBlacklist(String userId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().removeFromBlacklist(userId, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getBlacklistStatus(String userId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getBlacklistStatus(userId, new IRongCoreCallback.ResultCallback<IRongCoreEnum.BlacklistStatus>() {
            @Override
            public void onSuccess(IRongCoreEnum.BlacklistStatus blacklistStatus) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("status", blacklistStatus == IRongCoreEnum.BlacklistStatus.IN_BLACK_LIST);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }


    @UniJSMethod()
    public void getBlacklist(final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getBlacklist(new IRongCoreCallback.GetBlacklistCallback() {
            @Override
            public void onSuccess(String[] strings) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                if (strings == null || strings.length <= 0) {
                    data.put("list", new String[0]);
                } else {
                    data.put("list", strings);
                }
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void joinChatRoom(String targetId, int messageCount, final UniJSCallback uniJSCallback) {
        RongChatRoomClient.getInstance().joinChatRoom(targetId, messageCount, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void joinExistChatRoom(String targetId, int messageCount, final UniJSCallback uniJSCallback) {
        RongChatRoomClient.getInstance().joinExistChatRoom(targetId, messageCount, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void quitChatRoom(String targetId, final UniJSCallback uniJSCallback) {
        RongChatRoomClient.getInstance().quitChatRoom(targetId, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getChatRoomInfo(String targetId, int memberCount, int order, final UniJSCallback uniJSCallback) {
        ChatRoomInfo.ChatRoomMemberOrder memberOrder = order == ChatRoomInfo.ChatRoomMemberOrder.RC_CHAT_ROOM_MEMBER_ASC.getValue() ?
                ChatRoomInfo.ChatRoomMemberOrder.RC_CHAT_ROOM_MEMBER_ASC : ChatRoomInfo.ChatRoomMemberOrder.RC_CHAT_ROOM_MEMBER_DESC;
        RongChatRoomClient.getInstance().getChatRoomInfo(targetId, memberCount, memberOrder, new IRongCoreCallback.ResultCallback<ChatRoomInfo>() {
            @Override
            public void onSuccess(ChatRoomInfo chatRoomInfo) {
                JSONObject data = new JSONObject();
                Map<String, Object> map = new HashMap<>();
                if (chatRoomInfo == null) {
                    data.put("chatRoomInfo", new HashMap<>());
                } else {
                    map.put("targetId", chatRoomInfo.getChatRoomId());
                    map.put("totalMemberCount", chatRoomInfo.getTotalMemberCount());
                    map.put("memberOrder", chatRoomInfo.getMemberOrder().getValue());
                    int size = chatRoomInfo.getMemberInfo().size();
                    Object[] array = new Object[size];
                    for (int i = 0; i < size; i++) {
                        Map<String, Object> item = new HashMap<>();
                        item.put("userId", chatRoomInfo.getMemberInfo().get(i).getUserId());
                        item.put("joinTime", chatRoomInfo.getMemberInfo().get(i).getJoinTime());
                        array[i] = item;
                    }
                    map.put("members", array);
                    data.put("chatRoomInfo", map);
                }
                data.put("code", 0);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void sendTypingStatus(int conversationType, String targetId, String typingContentType) {
        RongCoreClient.getInstance().sendTypingStatus(Conversation.ConversationType.setValue(conversationType), targetId, typingContentType);
    }

    @UniJSMethod()
    public void sendReadReceiptMessage(int conversationType, String targetId, double timestamp) {
        RongCoreClient.getInstance().sendReadReceiptMessage(Conversation.ConversationType.setValue(conversationType), targetId, (long) timestamp);
    }

    @UniJSMethod()
    public void sendReadReceiptRequest(int messageId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessage(messageId, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                RongCoreClient.getInstance().sendReadReceiptRequest(message, createOperationCallback(uniJSCallback));
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void cleanRemoteHistoryMessages(int conversationType, String targetId, double timestamp, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().cleanRemoteHistoryMessages(
                Conversation.ConversationType.setValue(conversationType), targetId, (long) timestamp, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setReconnectKickEnable(boolean enabled) {
        RongCoreClient.getInstance().setReconnectKickEnable(enabled);
    }

    @UniJSMethod()
    public void setStatisticServer(String server) {
        RongCoreClient.setStatisticDomain(server);
    }

    @UniJSMethod()
    public void syncConversationReadStatus(int conversationType, String targetId, double timestamp, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().syncConversationReadStatus(
                Conversation.ConversationType.setValue(conversationType), targetId, (long) timestamp, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void cancelSendMediaMessage(int messageId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessage(messageId, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                RongCoreClient.getInstance().cancelSendMediaMessage(message, createOperationCallback(uniJSCallback));
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void cancelDownloadMediaMessage(int messageId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessage(messageId, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                RongCoreClient.getInstance().cancelDownloadMediaMessage(message, createOperationCallback(uniJSCallback));
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void downloadMediaMessage(int messageId, final String eventId) {
        RongCoreClient.getInstance().getMessage(messageId, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                RongCoreClient.getInstance().downloadMediaMessage(message, new IRongCoreCallback.IDownloadMediaMessageCallback() {
                    @Override
                    public void onSuccess(Message message) {
                        MediaMessageContent media = (MediaMessageContent) message.getContent();
                        Map<String, Object> map = new HashMap<>();
                        map.put("type", "success");
                        map.put("eventId", eventId);
                        map.put("path", media.getLocalPath().toString());
                        if (mUniSDKInstance != null) {
                            mUniSDKInstance.fireModuleEvent("rcimlib-download-media-message", RCUniIM.this, map);
                        }
                    }

                    @Override
                    public void onProgress(Message message, int i) {
                        Map<String, Object> map = new HashMap<>();
                        map.put("type", "progress");
                        map.put("eventId", eventId);
                        map.put("progress", i);
                        if (mUniSDKInstance != null) {
                            mUniSDKInstance.fireModuleEvent("rcimlib-download-media-message", RCUniIM.this, map);
                        }
                    }

                    @Override
                    public void onError(Message message, IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        Map<String, Object> map = new HashMap<>();
                        map.put("type", "error");
                        map.put("eventId", eventId);
                        map.put("errorCode", coreErrorCode.getValue());
                        if (mUniSDKInstance != null) {
                            mUniSDKInstance.fireModuleEvent("rcimlib-download-media-message", RCUniIM.this, map);
                        }
                    }

                    @Override
                    public void onCanceled(Message message) {
                        Map<String, Object> map = new HashMap<>();
                        map.put("type", "cancel");
                        map.put("eventId", eventId);
                        if (mUniSDKInstance != null) {
                            mUniSDKInstance.fireModuleEvent("rcimlib-download-media-message", RCUniIM.this, map);
                        }
                    }
                });
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", "error");
                map.put("code", coreErrorCode.getValue());
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-download-media-message", RCUniIM.this, map);
                }
            }
        });
    }

    @UniJSMethod()
    public void getMessage(int messageId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessage(messageId, createMessageCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getMessageByUId(String UId, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessageByUid(UId, createMessageCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setMessageExtra(int messageId, String extra, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setMessageExtra(messageId, extra, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getMessageSendTime(int messageId, final UniJSCallback uniJSCallback) {
        JSONObject data = new JSONObject();
        data.put("sendTime", RongCoreClient.getInstance().getSendTimeByMessageId(messageId));
        if (uniJSCallback != null) {
            uniJSCallback.invokeAndKeepAlive(data);
        }
    }

    @UniJSMethod()
    public void getMessageCount(final int conversationType, final String targetId, final UniJSCallback callback) {
        RongCoreClient.getInstance().getMessageCount(Conversation.ConversationType.setValue(conversationType),
                targetId, new IRongCoreCallback.ResultCallback<Integer>() {
                    @Override
                    public void onSuccess(Integer integer) {
                        JSONObject data = new JSONObject();
                        data.put("code", 0);
                        data.put("count", integer);
                        if (callback != null) {
                            callback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        JSONObject data = new JSONObject();
                        data.put("code", coreErrorCode.getValue());
                        if (callback != null) {
                            callback.invokeAndKeepAlive(data);
                        }
                    }
                });
    }

    @UniJSMethod()
    public void getFirstUnreadMessage(int conversationType, String targetId, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getTheFirstUnreadMessage(
                Conversation.ConversationType.setValue(conversationType), targetId, createMessageCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getUnreadMentionedMessages(int conversationType, String targetId, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getUnreadMentionedMessages(
                Conversation.ConversationType.setValue(conversationType), targetId, createMessagesCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getTopConversationList(final Object[] conversationTypes, final UniJSCallback uniJSCallback) {
        Conversation.ConversationType[] types = toConversationTypeArray(conversationTypes);
        RongCoreClient.getInstance().getTopConversationList(createConversationListCallback(uniJSCallback), types);
    }

    @UniJSMethod()
    public void setConversationToTop(int conversationType, String targetId, Boolean isTop, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setConversationToTop(
                Conversation.ConversationType.setValue(conversationType), targetId, isTop, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void clearTextMessageDraft(int conversationType, String targetId, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().clearTextMessageDraft(
                Conversation.ConversationType.setValue(conversationType), targetId, createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getRemoteChatRoomHistoryMessages(String targetId, double recordTime, int count, int order, final UniJSCallback uniJSCallback) {
        IRongCoreEnum.TimestampOrder timestampOrder = order == 0 ? IRongCoreEnum.TimestampOrder.RC_TIMESTAMP_DESC : IRongCoreEnum.TimestampOrder.RC_TIMESTAMP_ASC;
        RongChatRoomClient.getInstance().getChatroomHistoryMessages(
                targetId, (long) recordTime, count, timestampOrder, new IRongCoreCallback.IChatRoomHistoryMessageCallback() {
                    @Override
                    public void onSuccess(List<Message> list, long syncTime) {
                        JSONObject data = new JSONObject();
                        if (list == null || list.isEmpty()) {
                            data.put("messages", new Object[0]);
                        } else {
                            data.put("messages", toJSON(list));
                        }
                        data.put("syncTime", syncTime);
                        data.put("code", 0);
                        if (uniJSCallback != null) {
                            uniJSCallback.invokeAndKeepAlive(data);
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        errorCallback(coreErrorCode, uniJSCallback);
                    }
                });
    }

    @UniJSMethod()
    public void cleanHistoryMessages(int conversationType, String targetId, double timestamp, boolean clearRemote, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().cleanHistoryMessages(
                Conversation.ConversationType.setValue(conversationType), targetId, (long) timestamp, clearRemote, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getConnectionStatus(UniJSCallback uniJSCallback) {
        JSONObject data = new JSONObject();
        data.put("status", RongCoreClient.getInstance().getCurrentConnectionStatus().getValue());
        if (uniJSCallback != null) {
            uniJSCallback.invokeAndKeepAlive(data);
        }
    }

    @UniJSMethod()
    public void sendReadReceiptResponse(final int conversationType, final String targetId, Object[] messages, final UniJSCallback uniJSCallback) {
        if (!isValidContext()) {
            return;
        }
        final CountDownLatch countDownLatch = new CountDownLatch(messages.length);
        final ArrayList<Message> list = new ArrayList<>();
        for (Object message : messages) {
            final Map<String, Object> map = (Map<String, Object>) message;
            if (map != null) {
                final String msgUid = (String) map.get("messageUId");
                RongCoreClient.getInstance().getMessageByUid(msgUid, new IRongCoreCallback.ResultCallback<Message>() {
                    @Override
                    public void onSuccess(Message message) {
                        list.add(message);
                        countDownLatch.countDown();
                        if (countDownLatch.getCount() == 0) {
                            RongCoreClient.getInstance().sendReadReceiptResponse(
                                    Conversation.ConversationType.setValue(conversationType), targetId, list, createOperationCallback(uniJSCallback));
                        }
                    }

                    @Override
                    public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                        countDownLatch.countDown();
                    }
                });
            }
        }
    }


    @UniJSMethod()
    public void setMessageSentStatus(int messageId, final int status, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getMessage(messageId, new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                message.setSentStatus(Message.SentStatus.setValue(status));
                RongCoreClient.getInstance().setMessageSentStatus(message, createBooleanCallback(uniJSCallback));
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void setMessageReceivedStatus(int messageId, int status, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setMessageReceivedStatus(messageId, new Message.ReceivedStatus(status), createBooleanCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setNotificationQuietHours(String startTime, int spanMinutes, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setNotificationQuietHours(startTime, spanMinutes, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getNotificationQuietHours(final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getNotificationQuietHours(new IRongCoreCallback.GetNotificationQuietHoursCallback() {
            @Override
            public void onSuccess(String startTime, int spanMinutes) {
                Map<String, Object> map = new HashMap<>();
                map.put("startTime", startTime);
                map.put("spanMinutes", spanMinutes);
                JSONObject data = new JSONObject();
                data.put("result", map);
                data.put("code", 0);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void removeNotificationQuietHours(UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().removeNotificationQuietHours(createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getOfflineMessageDuration(final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getOfflineMessageDuration(new IRongCoreCallback.ResultCallback<String>() {
            @Override
            public void onSuccess(String s) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("duration", s);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void setOfflineMessageDuration(int duration, final UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setOfflineMessageDuration(duration, new IRongCoreCallback.ResultCallback<Long>() {
            @Override
            public void onSuccess(Long n) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        });
    }

    @UniJSMethod()
    public void getCurrentUserId(UniJSCallback uniJSCallback) {
        JSONObject data = new JSONObject();
        data.put("userId", RongCoreClient.getInstance().getCurrentUserId());
        if (uniJSCallback != null) {
            uniJSCallback.invokeAndKeepAlive(data);
        }
    }

    @UniJSMethod()
    public void setPushContentShowStatus(boolean status, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setPushContentShowStatus(status, createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void getPushContentShowStatus(UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().getPushContentShowStatus(createBooleanResultCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setPushLanguageCode(String language, UniJSCallback uniJSCallback) {
        RongCoreClient.getInstance().setPushLanguage(IRongCoreEnum.PushLanguage.valueOf(language), createOperationCallback(uniJSCallback));
    }

    @UniJSMethod()
    public void setPushConfig(Map<String, Object> map) {
        PushConfig.Builder pushConfig = new PushConfig.Builder();
        if (map == null) {
            return;
        }
        if (map.containsKey("FCM")) {
            pushConfig = pushConfig.enableFCM((Boolean) map.get("FCM"));
        }
        if (map.containsKey("HW")) {
            pushConfig = pushConfig.enableHWPush((Boolean) map.get("HW"));
        }

        if (map.containsKey("VIVO")) {
            pushConfig = pushConfig.enableVivoPush((Boolean) map.get("VIVO"));
        }
        if (map.containsKey("MI")) {
            Map miMap = (Map) map.get("MI");
            if (miMap != null) {
                pushConfig = pushConfig.enableMiPush((String) miMap.get("MI_PUSH_APPID"), (String) miMap.get("MI_PUSH_APPKEY"));
            }
        }
        if (map.containsKey("MEIZU")) {
            Map meizuMap = (Map) map.get("MEIZU");
            if (meizuMap != null) {
                pushConfig = pushConfig.enableMeiZuPush((String) meizuMap.get("MEIZU_PUSH_APPID"), (String) meizuMap.get("MEIZU_PUSH_APPKEY"));
            }
        }

        if (map.containsKey("OPPO")) {
            Map oppoMap = (Map) map.get("OPPO");
            if (oppoMap != null) {
                pushConfig = pushConfig.enableOppoPush((String) oppoMap.get("OPPO_PUSH_APPID"), (String) oppoMap.get("OPPO_PUSH_APPKEY"));
            }
        }
        RongPushClient.setPushConfig(pushConfig.build());
    }


    private String getStringFromMap(Map<String, Object> map, String key) {
        String value = null;
        if (map.containsKey(key)) {
            value = (String) map.get(key);
        }
        return value;
    }

    private IRongCoreCallback.ISendMediaMessageCallback createSendMediaMessageCallback(final String eventId) {
        return new IRongCoreCallback.ISendMediaMessageCallback() {
            @Override
            public void onAttached(Message message) {

            }

            @Override
            public void onProgress(Message message, int progress) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", "progress");
                map.put("eventId", eventId);
                map.put("progress", progress);
                if (message != null) {
                    map.put("messageId", message.getMessageId());
                }
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-send-message", RCUniIM.this, map);
                }
            }

            @Override
            public void onSuccess(Message message) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", "success");
                map.put("eventId", eventId);
                if (message != null) {
                    map.put("messageId", message.getMessageId());
                }
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-send-message", RCUniIM.this, map);
                }
            }

            @Override
            public void onError(Message message, IRongCoreEnum.CoreErrorCode coreErrorCode) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", "error");
                map.put("eventId", eventId);
                map.put("errorCode", coreErrorCode.getValue());
                if (message != null) {
                    map.put("messageId", message.getMessageId());
                }
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-send-message", RCUniIM.this, map);
                }
            }

            @Override
            public void onCanceled(Message message) {
                Map<String, Object> map = new HashMap<>();
                map.put("type", "cancel");
                map.put("eventId", eventId);
                if (message != null) {
                    map.put("messageId", message.getMessageId());
                }
                if (mUniSDKInstance != null) {
                    mUniSDKInstance.fireModuleEvent("rcimlib-send-message", RCUniIM.this, map);
                }
            }
        };
    }


    private IRongCoreCallback.ISendMessageCallback createSendMessageCallback(final UniJSCallback uniJSCallback) {
        return new IRongCoreCallback.ISendMessageCallback() {
            @Override
            public void onAttached(Message message) {

            }

            @Override
            public void onSuccess(Message message) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("messageId", message.getMessageId());
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(Message message, IRongCoreEnum.CoreErrorCode coreErrorCode) {
                JSONObject data = new JSONObject();
                data.put("code", coreErrorCode.getValue());
                data.put("messageId", message.getMessageId());
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }
        };
    }
}
