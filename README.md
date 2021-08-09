# rongcloud-uniapp-imlib

## 关键目录说明
1. src: ts代码
2. example: uniapp 测试demo
3. example/config/config.js： 连接配置信息
4. function: 测试接口目录
5. example/nativeplugins: 原生插件目录

## 初始化
```
npm install
```

## 编译
```
npm run build:dev
```

## 导入原生插件
1. 使用 hbuilder 打开 example 目录
2. 将原生插件放入 nativeplugins 目录下
3. 在 manifest.json 中添加本地插件配置
4. 打自定义调试基座