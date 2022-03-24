package io.dcloud.uniplugin;

import android.content.Context;
import android.net.Uri;
import android.text.TextUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.rongcloud.imlib.iw.confg.RCIMIWEngineSetup;
import cn.rongcloud.imlib.iw.message.RCCommandMessage;
import cn.rongcloud.imlib.iw.message.RCNormalMessage;
import cn.rongcloud.imlib.iw.message.RCStatusMessage;
import cn.rongcloud.imlib.iw.message.RCStorageMessage;
import io.dcloud.feature.uniapp.bridge.UniJSCallback;
import io.rong.imlib.IRongCoreCallback;
import io.rong.imlib.IRongCoreEnum;
import io.rong.imlib.model.Conversation;
import io.rong.imlib.model.MentionedInfo;
import io.rong.imlib.model.Message;
import io.rong.imlib.model.MessageContent;
import io.rong.imlib.model.UserInfo;
import io.rong.imlib.typingmessage.TypingStatusMessage;
import io.rong.message.CommandMessage;
import io.rong.message.CommandNotificationMessage;
import io.rong.message.ContactNotificationMessage;
import io.rong.message.FileMessage;
import io.rong.message.GIFMessage;
import io.rong.message.GroupNotificationMessage;
import io.rong.message.HQVoiceMessage;
import io.rong.message.ImageMessage;
import io.rong.message.InformationNotificationMessage;
import io.rong.message.ProfileNotificationMessage;
import io.rong.message.ReadReceiptMessage;
import io.rong.message.RecallNotificationMessage;
import io.rong.message.SightMessage;
import io.rong.message.TextMessage;
import io.rong.message.VoiceMessage;
import io.rong.push.pushconfig.PushConfig;

class Convert {
    private static final int CUSTOM_COMMAND_MESSAGE = 0;
    private static final int CUSTOM_STORAGE_MESSAGE = 1;
    private static final int CUSTOM_NORMAL_MESSAGE = 2;
    private static final int CUSTOM_STATUS_MESSAGE = 3;

    static String getStringFromMap(String key, Map<String, Object> map) {
        if (null == map || !map.containsKey(key))
            return "";
        return map.get(key).toString();
    }

    static RCIMIWEngineSetup toEngineSetup(Map<String, Object> setup) {
        String navServer = getStringFromMap("naviServer", setup);
        String fileServer = getStringFromMap("fileServer", setup);
        String statisticServer = getStringFromMap("statisticServer", setup);
        String appVersion = getStringFromMap("appVersion", setup);

        RCIMIWEngineSetup.Builder builder = RCIMIWEngineSetup.newBuilder();

        if (!TextUtils.isEmpty(appVersion))
            builder = builder.appVersion(appVersion);

        if (!TextUtils.isEmpty(navServer) || !TextUtils.isEmpty(fileServer))
            builder = builder.serverInfo(navServer, fileServer);

        if (!TextUtils.isEmpty(statisticServer))
            builder = builder.statisticServer(statisticServer);

        Map<String, Object> pushConfigMap = (Map<String, Object>) setup.get("androidPushConfig");
        if (pushConfigMap == null) {
            return builder.build();
        }
        String miAppId = getStringFromMap("miAppId", pushConfigMap);
        String miAppKey = getStringFromMap("miAppKey", pushConfigMap);
        String meizuAppId = getStringFromMap("meizuAppId", pushConfigMap);
        String meizuAppKey = getStringFromMap("meizuAppKey", pushConfigMap);
        String oppoAppKey = getStringFromMap("oppoAppKey", pushConfigMap);
        String oppoAppSecret = getStringFromMap("oppoAppSecret", pushConfigMap);

        PushConfig.Builder pushConfigBuilder = new PushConfig.Builder();

        if (!TextUtils.isEmpty(miAppId) && !TextUtils.isEmpty(miAppKey))
            pushConfigBuilder = pushConfigBuilder.enableMiPush(miAppId, miAppKey);
        if (!TextUtils.isEmpty(meizuAppId) && !TextUtils.isEmpty(meizuAppKey))
            pushConfigBuilder = pushConfigBuilder.enableMeiZuPush(meizuAppId, meizuAppKey);
        if (!TextUtils.isEmpty(oppoAppKey) && !TextUtils.isEmpty(oppoAppSecret))
            pushConfigBuilder = pushConfigBuilder.enableOppoPush(oppoAppKey, oppoAppSecret);

        builder = builder.androidPushConfig(pushConfigBuilder.build());
        return builder.build();
    }

    static Map<String, Object> toJSON(Message message) {
        Map<String, Object> map = new HashMap<>();
        map.put("conversationType", message.getConversationType().getValue());
        map.put("targetId", message.getTargetId());
        map.put("messageUId", message.getUId());
        map.put("messageId", message.getMessageId());
        map.put("messageDirection", message.getMessageDirection().getValue());
        map.put("senderUserId", message.getSenderUserId());
        map.put("sentTime", (double) message.getSentTime());
        map.put("receivedTime", (double) message.getReceivedTime());
        if (message.getSentStatus() != null) {
            map.put("sentStatus", message.getSentStatus().getValue());
        }
        if (message.getReceivedStatus() != null) {
            map.put("receivedStatus", message.getReceivedStatus().getFlag());
        }
        map.put("extra", message.getExtra());
        map.put("objectName", message.getObjectName());
        String objectName = message.getObjectName();
        map.put("content", Convert.toJSON(objectName, message.getContent()));
        return map;
    }

    static Map<String, Object> toJSON(String objectName, MessageContent content) {

        Map<String, Object> map = new HashMap<>();
        if (TextUtils.isEmpty(objectName)) {
            return map;
        }
        map.put("objectName", objectName);
        switch (objectName) {
            case "RC:TxtMsg":
                TextMessage text = (TextMessage) content;
                map.put("content", text.getContent());
                map.put("extra", text.getExtra());
                break;
            case "RC:ImgMsg": {
                ImageMessage image = (ImageMessage) content;
                String local = "";
                Uri localUri = image.getLocalUri();
                if (localUri != null) {
                    local = localUri.toString();
                }
                String remote = "";
                Uri remoteUri = image.getRemoteUri();
                if (remoteUri != null) {
                    remote = remoteUri.toString();
                }
                String thumbnail = "";
                Uri thumbnailUri = image.getThumUri();
                if (thumbnailUri != null) {
                    thumbnail = thumbnailUri.toString();
                }
                map.put("local", local);
                map.put("remote", remote);
                map.put("thumbnail", thumbnail);
                map.put("isFull", image.isFull());
                map.put("extra", image.getExtra());
                break;
            }
            case "RC:FileMsg": {
                FileMessage file = (FileMessage) content;
                String local = "";
                Uri localUri = file.getLocalPath();
                if (localUri != null) {
                    local = localUri.toString();
                }
                String remote = "";
                Uri remoteUri = file.getFileUrl();
                if (remoteUri != null) {
                    remote = remoteUri.toString();
                }
                map.put("local", local);
                map.put("remote", remote);
                map.put("name", file.getName());
                map.put("size", file.getSize());
                map.put("fileType", file.getType());
                map.put("extra", file.getExtra());
                break;
            }
            case "RC:SightMsg": {
                SightMessage sight = (SightMessage) content;
                String local = "";
                Uri localUri = sight.getLocalPath();
                if (localUri != null) {
                    local = localUri.toString();
                }
                String remote = "";
                Uri remoteUri = sight.getMediaUrl();
                if (remoteUri != null) {
                    remote = remoteUri.toString();
                }
                String thumbnail = "";
                Uri thumbnailUri = sight.getThumbUri();
                if (thumbnailUri != null) {
                    thumbnail = thumbnailUri.toString();
                }
                map.put("local", local);
                map.put("remote", remote);
                map.put("thumbnail", thumbnail);
                map.put("name", sight.getName());
                map.put("base64", sight.getBase64());
                map.put("size", sight.getSize());
                map.put("duration", sight.getDuration());
                map.put("extra", sight.getExtra());
                break;
            }
            case "RC:VcMsg": {
                VoiceMessage voice = (VoiceMessage) content;
                map.put("local", voice.getUri().toString());
                map.put("duration", voice.getDuration());
                map.put("extra", voice.getExtra());
                break;
            }
            case "RC:RcNtf": {
                RecallNotificationMessage message = (RecallNotificationMessage) content;
                map.put("operatorId", message.getOperatorId());
                map.put("recallTime", message.getRecallTime());
                map.put("originalObjectName", message.getOriginalObjectName());
                map.put("isAdmin", message.isAdmin());
                break;
            }
            case "RC:CmdNtf": {
                CommandNotificationMessage message = (CommandNotificationMessage) content;
                map.put("data", message.getData());
                map.put("name", message.getName());
                break;
            }
            case "RC:CmdMsg": {
                CommandMessage message = (CommandMessage) content;
                map.put("data", message.getData());
                map.put("name", message.getName());
                break;
            }
            case "RC:ContactNtf": {
                ContactNotificationMessage message = (ContactNotificationMessage) content;
                map.put("extra", message.getExtra());
                map.put("message", message.getMessage());
                map.put("operation", message.getOperation());
                map.put("sourceUserId", message.getSourceUserId());
                map.put("targetUserId", message.getTargetUserId());
                break;
            }
            case "RC:ProfileNtf": {
                ProfileNotificationMessage message = (ProfileNotificationMessage) content;
                map.put("extra", message.getExtra());
                map.put("data", message.getData());
                map.put("operation", message.getOperation());
                break;
            }
            case "RC:InfoNtf": {
                InformationNotificationMessage message = (InformationNotificationMessage) content;
                map.put("extra", message.getExtra());
                map.put("message", message.getMessage());
                break;
            }
            case "RC:GrpNtf": {
                GroupNotificationMessage message = (GroupNotificationMessage) content;
                map.put("extra", message.getExtra());
                map.put("message", message.getMessage());
                map.put("data", message.getData());
                map.put("operation", message.getOperation());
                map.put("operatorUserId", message.getOperatorUserId());
                break;
            }
            case "RC:ReadNtf": {
                ReadReceiptMessage message = (ReadReceiptMessage) content;
                map.put("type", message.getType().getValue());
                map.put("messageUId", message.getMessageUId());
                map.put("lastMessageSendTime", message.getLastMessageSendTime());
                break;
            }
            case "RC:TypSts": {
                TypingStatusMessage message = (TypingStatusMessage) content;
                map.put("data", message.getData());
                map.put("typingContentType", message.getTypingContentType());
                break;
            }
            case "RC:HQVCMsg": {
                HQVoiceMessage message = (HQVoiceMessage) content;
                String local = "";
                Uri localUri = message.getLocalPath();
                if (localUri != null) {
                    local = localUri.toString();
                }
                String remote = "";
                Uri remoteUri = message.getMediaUrl();
                if (remoteUri != null) {
                    remote = remoteUri.toString();
                }
                map.put("local", local);
                map.put("remote", remote);
                map.put("duration", message.getDuration());
                map.put("extra", message.getExtra());
                break;
            }
            case "RC:GIFMsg": {
                GIFMessage message = (GIFMessage) content;
                String local = "";
                Uri localUri = message.getLocalPath();
                if (localUri != null) {
                    local = localUri.toString();
                }
                String remote = "";
                Uri remoteUri = message.getRemoteUri();
                if (remoteUri != null) {
                    remote = remoteUri.toString();
                }
                map.put("local", local);
                map.put("remote", remote);
                map.put("gifDataSize", message.getGifDataSize());
                map.put("width", message.getWidth());
                map.put("height", message.getHeight());
                map.put("extra", message.getExtra());
                break;
            }
            case "RC:IWCmdMsg": {
                RCCommandMessage iwCmdMsg = (RCCommandMessage) content;
                map.put("objectName", iwCmdMsg.messageType);
                map.put("extra", TextUtils.isEmpty(iwCmdMsg.getExtra()) ? "" : iwCmdMsg.getExtra());
                map.put("customType", CUSTOM_COMMAND_MESSAGE);
                map.put("customFields", iwCmdMsg.messageFields);

                break;
            }
            case "RC:IWStorageMsg": {
                RCStorageMessage iwStoreMsg = (RCStorageMessage) content;
                map.put("objectName", iwStoreMsg.messageType);
                map.put("extra", TextUtils.isEmpty(iwStoreMsg.getExtra()) ? "" : iwStoreMsg.getExtra());
                map.put("customType", CUSTOM_STORAGE_MESSAGE);
                map.put("customFields", iwStoreMsg.messageFields);

                break;
            }
            case "RC:IWNormalMsg": {
                RCNormalMessage iwNormalMsg = (RCNormalMessage) content;
                map.put("objectName", iwNormalMsg.messageType);
                map.put("extra", TextUtils.isEmpty(iwNormalMsg.getExtra()) ? "" : iwNormalMsg.getExtra());
                map.put("customType", CUSTOM_NORMAL_MESSAGE);
                map.put("customFields", iwNormalMsg.messageFields);

                break;
            }
            case "RC:IWStatusMsg": {
                RCStatusMessage iwStatusMsg = (RCStatusMessage) content;
                map.put("objectName", iwStatusMsg.messageType);
                map.put("extra", TextUtils.isEmpty(iwStatusMsg.getExtra()) ? "" : iwStatusMsg.getExtra());
                map.put("customType", CUSTOM_STATUS_MESSAGE);
                map.put("customFields", iwStatusMsg.messageFields);

                break;
            }
        }

        if (content != null && content.getUserInfo() != null) {
            map.put("userInfo", toUserInfoJSON(content.getUserInfo()));
        }
        return map;
    }

    static Map<String, Object> toUserInfoJSON(UserInfo userInfo) {
        if (userInfo == null)
            return null;
        Map<String, Object> map = new HashMap<>();
        map.put("userId", userInfo.getUserId());
        map.put("name", userInfo.getName());
        map.put("portraitUrl", userInfo.getPortraitUri() == null ? "" : userInfo.getPortraitUri().toString());
        map.put("extra", userInfo.getExtra() != null ? userInfo.getExtra() : "");
        return map;
    }

    static Map<String, Object> toJSON(Conversation conversation) {
        if (conversation == null) {
            return null;
        }
        Map<String, Object> map = new HashMap<>();
        map.put("conversationType", conversation.getConversationType().getValue());
        map.put("conversationTitle", conversation.getConversationTitle());
        map.put("isTop", conversation.isTop());
        map.put("unreadMessageCount", conversation.getUnreadMessageCount());
        map.put("draft", conversation.getDraft());
        map.put("targetId", conversation.getTargetId());
        map.put("objectName", conversation.getObjectName());
        map.put("latestMessageId", conversation.getLatestMessageId());
        map.put("latestMessage", Convert.toJSON(conversation.getObjectName(), conversation.getLatestMessage()));
        map.put("receivedStatus", conversation.getReceivedStatus().getFlag());
        map.put("receivedTime", conversation.getReceivedTime());
        map.put("sentStatus", conversation.getSentStatus().getValue());
        map.put("sentTime", conversation.getSentTime());
        map.put("senderUserId", conversation.getSenderUserId());
        map.put("mentionedCount", conversation.getMentionedCount());
        map.put("hasUnreadMentioned", conversation.getMentionedCount() > 0);
        return map;
    }

    static Message toMessage(Context context, Map<String, Object> map) {
        Conversation.ConversationType conversationType = Conversation.ConversationType.setValue(Integer.parseInt(String.valueOf(map.get("conversationType"))));
        MessageContent content = toMessageContent(context, (Map) map.get("content"));
        return Message.obtain((String) map.get("targetId"), conversationType, content);
    }

    static MessageContent toCustomMessageContent(Map<String, Object> map) {
        MessageContent content = null;

        if (false == map.containsKey("customType") || false == map.containsKey("objectName")
                || false == map.containsKey("customFields")) {
            return null;
        }

        int customMessageType = Integer.parseInt(map.get("customType").toString());
        String customMessageObjectName = (String) map.get("objectName");
        Map<String, String> customMessageFields = (Map<String, String>) map.get("customFields");

        if (customMessageType < 0 || customMessageType > 3 || TextUtils.isEmpty(customMessageObjectName)
                || customMessageFields == null || customMessageFields.size() <= 0) {
            return null;
        }

        if (customMessageType == CUSTOM_COMMAND_MESSAGE) {
            content = new RCCommandMessage(customMessageObjectName, customMessageFields);
        } else if (customMessageType == CUSTOM_STORAGE_MESSAGE) {
            content = new RCStorageMessage(customMessageObjectName, customMessageFields);
        } else if (customMessageType == CUSTOM_NORMAL_MESSAGE) {
            content = new RCNormalMessage(customMessageObjectName, customMessageFields);
        } else if (customMessageType == CUSTOM_STATUS_MESSAGE) {
            content = new RCStatusMessage(customMessageObjectName, customMessageFields);
        }
        return content;
    }

    static MessageContent toMessageContent(Context context, Map<String, Object> map) {
        if (map == null) {
            return null;
        }
        MessageContent messageContent = null;
        String objectName = (String) map.get("objectName");

        if (map.containsKey("customType") && map.containsKey("customFields")) {
            messageContent = toCustomMessageContent(map);
        } else if (objectName != null) {
            switch (objectName) {
                case "RC:TxtMsg":
                    messageContent = TextMessage.obtain((String) map.get("content"));
                    if (map.containsKey("extra")) {
                        ((TextMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:ImgMsg":
                    Uri uri = Utils.getFileUri(context, (String) map.get("local"));
                    messageContent = ImageMessage.obtain(uri, uri);
                    if (map.containsKey("isFull")) {
                        ((ImageMessage) messageContent).setIsFull((Boolean) map.get("isFull"));
                    }
                    if (map.containsKey("extra")) {
                        ((ImageMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:FileMsg":
                    String path = (String) map.get("local");
                    assert path != null;
                    messageContent = FileMessage.obtain(context, Uri.parse("file://" + path));
                    if (map.containsKey("extra")) {
                        ((FileMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:SightMsg":
                    messageContent = SightMessage.obtain(context, Uri.parse("file://" + (String) map.get("local")), (Integer) map.get("duration"));
                    if (map.containsKey("extra")) {
                        ((SightMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:VcMsg":
                    Uri voice = Utils.getFileUri(context, (String) map.get("local"));
                    messageContent = VoiceMessage.obtain(voice, (Integer) map.get("duration"));
                    if (map.containsKey("extra")) {
                        ((VoiceMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:CmdMsg":
                    messageContent = CommandMessage.obtain((String) map.get("name"), (String) map.get("data"));
                    break;
                case "RC:CmdNtf":
                    messageContent = CommandNotificationMessage.obtain((String) map.get("name"), (String) map.get("data"));
                    break;
                case "RC:ContactNtf":
                    messageContent = ContactNotificationMessage.obtain(
                            (String) map.get("operation"),
                            (String) map.get("sourceUserId"),
                            (String) map.get("targetUserId"),
                            (String) map.get("message"));
                    if (map.containsKey("extra")) {
                        ((ContactNotificationMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:InfoNtf":
                    messageContent = InformationNotificationMessage.obtain((String) map.get("message"));
                    break;
                case "RC:GrpNtf":
                    messageContent = GroupNotificationMessage.obtain(
                            (String) map.get("operatorUserId"),
                            (String) map.get("operation"),
                            (String) map.get("data"),
                            (String) map.get("message"));
                    break;
                case "RC:ReadNtf":
                    messageContent = ReadReceiptMessage.obtain((long) map.get("sentTime"));
                    break;
                case "RC:HQVCMsg":
                    messageContent = HQVoiceMessage.obtain(
                            Utils.getFileUri(context, (String) map.get("local")), (Integer) map.get("duration"));
                    if (map.containsKey("extra")) {
                        ((HQVoiceMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
                case "RC:GIFMsg":
                    messageContent = GIFMessage.obtain(Utils.getFileUri(context, (String) map.get("local")));
                    if (map.containsKey("extra")) {
                        ((GIFMessage) messageContent).setExtra((String) map.get("extra"));
                    }
                    break;
            }
        }

        if (messageContent != null && map.containsKey("userInfo")) {
            Map userInfoMap = (Map) map.get("userInfo");
            if (userInfoMap != null) {
                UserInfo userInfo = new UserInfo(
                        (String) userInfoMap.get("userId"),
                        (String) userInfoMap.get("name"),
                        Uri.parse((String) userInfoMap.get("portraitUrl")));
                if (userInfoMap.containsKey("extra")) {
                    userInfo.setExtra((String) userInfoMap.get("extra"));
                }
                messageContent.setUserInfo(userInfo);
            }
        }

        if (messageContent != null && map.containsKey("mentionedInfo")) {
            Map mentionedMap = (Map) map.get("mentionedInfo");
            if (mentionedMap != null) {
                MentionedInfo.MentionedType type = MentionedInfo.MentionedType.valueOf(Integer.parseInt(String.valueOf(mentionedMap.get("type"))));
                ArrayList<String> userIdList = new ArrayList<>();
                if (mentionedMap.get("userIdList") instanceof Object[]) {
                    userIdList = toStringList((Object[]) mentionedMap.get("userIdList"));
                } else if (mentionedMap.get("userIdList") instanceof JSONArray) {
                    userIdList = toJsonStringList((JSONArray) mentionedMap.get("userIdList"));
                }
                String content = mentionedMap.containsKey("mentionedContent") ?
                        (String) mentionedMap.get("mentionedContent") : null;
                MentionedInfo mentionedInfo = new MentionedInfo(type, userIdList, content);
                messageContent.setMentionedInfo(mentionedInfo);
            }
        }

        return messageContent;
    }

    static ArrayList<String> toStringList(Object[] array) {
        if (array == null) {
            return null;
        }
        ArrayList<String> list = new ArrayList<>();
        for (Object o : array) {
            list.add((String) o);
        }
        return list;
    }


    static ArrayList<String> toJsonStringList(JSONArray array) {
        if (array == null) {
            return null;
        }
        String string = JSONObject.toJSONString(array, SerializerFeature.WriteClassName);
        return (ArrayList<String>) JSONObject.parseArray(string, String.class);
    }

    static String[] toStringArray(Object[] items) {
        String[] array = new String[items.length];
        for (int i = 0; i < items.length; i += 1) {
            array[i] = (String) items[i];
        }
        return array;
    }

    static Object[] toJSON(List<Message> messages) {
        if (messages == null) {
            return new Object[0];
        }
        int size = messages.size();
        Object[] array = new Object[size];
        for (int i = 0; i < size; i++) {
            array[i] = toJSON(messages.get(i));
        }
        return array;
    }

    static IRongCoreCallback.ResultCallback<Boolean> createBooleanCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.ResultCallback<Boolean>() {
            @Override
            public void onSuccess(Boolean result) {
                successCallback(callback);
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static IRongCoreCallback.ResultCallback<Boolean> createBooleanResultCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.ResultCallback<Boolean>() {
            @Override
            public void onSuccess(Boolean result) {
                successResultCallback(callback, result);
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static IRongCoreCallback.ResultCallback<Message> createMessageCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.ResultCallback<Message>() {
            @Override
            public void onSuccess(Message message) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                if (message == null) {
                    data.put("message", new HashMap<>());
                } else {
                    data.put("message", toJSON(message));
                }
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static IRongCoreCallback.ResultCallback<List<Conversation>> createConversationListCallback(final UniJSCallback uniJSCallback) {
        return new IRongCoreCallback.ResultCallback<List<Conversation>>() {
            @Override
            public void onSuccess(List<Conversation> conversations) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                if (conversations == null) {
                    data.put("conversations", new Object[0]);
                    if (uniJSCallback != null) {
                        uniJSCallback.invokeAndKeepAlive(data);
                    }
                    return;
                }
                Object[] array = new Object[conversations.size()];
                int count = 0;
                for (Conversation conversation : conversations) {
                    array[count] = (toJSON(conversation));
                    count++;
                }
                data.put("conversations", array);
                if (uniJSCallback != null) {
                    uniJSCallback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, uniJSCallback);
            }
        };
    }

    static IRongCoreCallback.ResultCallback<List<Message>> createMessagesCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.ResultCallback<List<Message>>() {
            @Override
            public void onSuccess(List<Message> messages) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("messages", toJSON(messages));
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static IRongCoreCallback.ResultCallback<Conversation.ConversationNotificationStatus> createConversationNotificationStatusCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.ResultCallback<Conversation.ConversationNotificationStatus>() {

            @Override
            public void onSuccess(Conversation.ConversationNotificationStatus conversationNotificationStatus) {
                JSONObject data = new JSONObject();
                data.put("code", 0);
                data.put("status", conversationNotificationStatus.getValue());
                if (callback != null) {
                    callback.invokeAndKeepAlive(data);
                }
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static IRongCoreCallback.OperationCallback createOperationCallback(final UniJSCallback callback) {
        return new IRongCoreCallback.OperationCallback() {
            @Override
            public void onSuccess() {
                successCallback(callback);
            }

            @Override
            public void onError(IRongCoreEnum.CoreErrorCode coreErrorCode) {
                errorCallback(coreErrorCode, callback);
            }
        };
    }

    static void errorCallback(IRongCoreEnum.CoreErrorCode errorCode, UniJSCallback callback) {
        JSONObject data = new JSONObject();
        data.put("code", errorCode.getValue());
        if (callback != null) {
            callback.invokeAndKeepAlive(data);
        }
    }

    static void successCallback(UniJSCallback callback) {
        JSONObject data = new JSONObject();
        data.put("code", 0);
        if (callback != null) {
            callback.invokeAndKeepAlive(data);
        }
    }

    static void successResultCallback(UniJSCallback callback, boolean result) {
        JSONObject data = new JSONObject();
        data.put("code", 0);
        data.put("status", result);
        if (callback != null) {
            callback.invokeAndKeepAlive(data);
        }
    }

    static Conversation.ConversationType[] toConversationTypeArray(Object[] array) {
        Conversation.ConversationType[] conversationTypesArray = new Conversation.ConversationType[array.length];
        for (int i = 0; i < array.length; i += 1) {
            conversationTypesArray[i] = Conversation.ConversationType.setValue((Integer) array[i]);
        }
        return conversationTypesArray;
    }
}
