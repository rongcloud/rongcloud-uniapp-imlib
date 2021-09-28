# 私有云相关

### 自签证书问题

SDK 默认仅支持 HTTPS

如果私有云部署的是自签 HTTPS 证书或者是 HTTP 服务，那么 SDK 将无法连接

**解决方案：**

因为 Uni SDK 使用原生插件，所以只能通过原生代码进行自签证书的信任

具体操作如下：

> Android

[使用 Android Studio 导入安卓原生插件](android/android_uniim/README.md)

然后向融云索要 Android 自签证书认证代码放到 Uni 原生项目

> iOS

[使用 Xcode 导入 ios 原生插件](ios/RCUniIM/手动导入.md)

然后向融云索要 iOS 自签证书认证代码放到 Uni 原生项目
