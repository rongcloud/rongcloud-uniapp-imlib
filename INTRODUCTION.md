# @rongcloud/imlib-uni

说明：本项目是对融云 IM 在 DCloud 中的原生插件 RCUniIM 做了一层 typescript 封装。使用前需要先安装原生插件 RCUniIM。

## 使用说明

1. 在 DCloud 插件市场搜索并安装 RCUniIM（私有云安装 RCUniIM-Private），或者手动下载安装插件放入 nativeplugins 目录下。

2. 在 manifest.json -> APP 原生插件配置 -> 加入原生插件 RCUniIM（或 RCUniIM-Private）。

3. 运行 -> 运行到手机 -> 制作自定义调试基座。

4. 安装 @rongcloud/imlib-uni
```
npm install @rongcloud/imlib-uni --save
// 私有云为 enterprise 版本
npm install @rongcloud/imlib-uni@enterprise --save
```

5. 在项目中引入
```
import {init, connect} from '@rongcloud/imlib-uni'
```

## 私有云注意事项
1. 私有云连接问题

需要手动配置 SDK 私有云服务器地址，否则 SDK 将连接到公有云环境

请在调用 SDK init 方法之后 connect 方法之前，调用该接口设置私有云服务器地址

```
setServerInfo ('<naviServerUrl>', '<fileServerUrl>')
```

2. 自签证书问题

SDK 默认仅支持 HTTPS

如果私有云部署的是自签 HTTPS 证书或者是 HTTP 服务，那么 SDK 将无法连接

**解决方案：**

因 Uni SDK 使用原生插件，所以只能通过原生代码进行自签证书的信任

具体操作如下：

Android:

[使用 Android Studio 导入安卓原生插件](android/android_uniim/README.md)

然后向融云索要 Android 自签证书认证代码放到 Uni 原生项目

iOS:

[使用 Xcode 导入 iOS 原生插件](ios/RCUniIM/手动导入.md)

然后向融云索要 iOS 自签证书认证代码放到 Uni 原生项目