# 二次开发文档

项目的根目录 `android` & `ios` 两个文件夹是 uni 适配层，负责 js 和原生代码的桥接，按需改动，之后会生成对应平台的 SDK

## 组合原生插件

可以下载公有云版本的 SDK 对比理解：https://ext.dcloud.net.cn/plugin?id=6120

uni 原生插件的文件组织形式如下：

```
.
├── android
│   ├── RCUniIM.aar
│   ├── im_chatroom-5.1.3.aar
│   ├── im_libcore-5.1.3.aar
│   └── libs
│       ├── gson-2.8.6.jar
│       └── tools_push_lib-5.1.3.jar
├── ios
│   ├── RCUniIM.framework
│   ├── RongChatRoom.framework
│   └── RongIMLibCore.framework
└── package.json
```

`android` 目录内包含 Android SDK，其中 `tools_push_lib.jar` 只有私有云才有 

`ios` 目录内包含 iOS SDK，其中 uni 不支持 xcframework，所以要将 xcframework 合并成 framework，合并脚本[参见](../ios/RCUniIM/gen_sdk.sh)

`package.json` 是配置文件，包含名称，id，版本号，iOS & Android 的相关配置，具体参见下面的模板

公有云和私有云的配置文件是固定的，参见本目录的两个模板

`private.package.json` 私有云配置文件，后续发版只更新版本号


`public.package.json` 公有云配置文件，后续发版只更新版本号
