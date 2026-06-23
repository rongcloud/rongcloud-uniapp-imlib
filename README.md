> [!WARNING]
> ⚠️ **暂停维护说明**
>
> 本仓库为早期基于 RCUniIM 插件的 uni-app 示例。鉴于 RCUniIM 已被标记为废弃，该 Demo 已不再维护。 若您需要最新的 uni-app IMLib 集成方案，请直接使用基于 RCUniIMV2 原生插件的新版 Demo：https://github.com/rongcloud/im-uni-app-wrapper。

# rongcloud-uniapp-imlib

本项目为融云即时通讯能力库（IMLib）的 uni-app 示例 Demo，基于融云 uni-app IMLib RCUniIM 原生插件，旨在帮助开发者快速集成并全面掌握融云 IM 的核心功能。

[demo 测试文档](./example/README.md)

[imlib-uni 包使用文档](./INTRODUCTION.md)

[imlib-uni 接口文档](https://rongcloud.github.io/rongcloud-uniapp-imlib/)

## 关键目录说明

├── README.md 				// 使用说明				 	<br>
├── android                 // Android 端源码			<br>
├── docs                    // API 文档 					<br>
├── example                 // uniapp 测试 Demo 			<br>
├── ios                     // iOS 端源码 				<br>
└── src                     // TS 接口文件				<br>

## 初始化
```
npm install
```

## 编译
```
npm run build:dev
```

## 打包
```
npm run release
```

## 生成文档
```
npm run doc
```
