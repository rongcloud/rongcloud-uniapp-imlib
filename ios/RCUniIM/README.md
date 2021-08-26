# iOS Uni-app SDK 项目

## 配置

请在 readme 同级目录执行如下操作

> 1.创建 framework 目录

```
mkdir framework
```

> 2.下载 IMLibCore 和 ChatRoom 并放到 framework 目录 

> 3.打开 RCUniIM 项目

SDK 源码在 RCUniIM.m

> 4.集成 uniapp 原生 SDK 开发

下载 uniapp 原生 SDK ： 下载地址参见 gitbook 内的 uniapp 文档

打开 SDK 中的 HBuilder-Hello 项目，将 RCUniIM.xcodeproj 依赖进去，并把 libcore 和 chatroom 依赖进去

## 生成 SDK

执行

```
sh gen_sdk.sh
```
完毕之后，SDK 生成在 bin 目录，应该其中会包含

`RCUniIM.framework`，`RongChatRoom.xcframework`，`RongIMLibCore.xcframework`
