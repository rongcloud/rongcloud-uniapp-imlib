# 开发测试说明

## IMLib-uni 项目

1. 安装依赖
```
npm install
```

2. 编译
```
npm run build:dev
```

3. 创建 npm 包软链
```
npm link
```

## example 项目

### 开发环境初始化
1. imlib-uni 包软链接初始化
```
npm link @rongcloud/imlib-uni
```
或者直接通过 `npm install @rongcloud/imlib-uni --save ` 来安装

2. 使用 Hbuilder 打开该目录

3. 在 config/config.js 文件中 userList 里加入测试的账号

4. 将原生插件放到 nativeplugins 目录下

5. 在 manifest.json -> APP 原生插件配置 -> 本地插件中加入原生插件

6. 运行 -> 运行到手机 -> 制作自定义调试基座

7. 运行 -> 运行到手机 -> 运行基座选择 -> 选择自定义基座
