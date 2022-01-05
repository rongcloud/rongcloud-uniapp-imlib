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


# 二次开发

所有 js 调用 OC 的接口上面都有注解，需要把 selector 写入注解，js 才可直接调用

## 1.入参

js 和 OC 交互的入参支持 基本数据类型，String，Dictionary

## 2.接口类型

> 无返回值

直接调用即可

参见 `init` 方法

> callback/block 返回

最后一个参数为 uni 提供的的 callback，返回的数据必须是 `Dictionary`

参见 `connect` 方法

> listener/delegate 返回

由 uni 的系统类实现，返回的数据必须是 `Dictionary`，多次使用同一 listener 注意需要有 `eventId` 进行配对

参见 `接受消息代理`

> FAQ

使用 callback 与 listener 的时机

多次触发的需要 listener

单次触发可以建议是 callback，也可以用 listener