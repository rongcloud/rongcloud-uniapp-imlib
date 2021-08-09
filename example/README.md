# 开发测试说明

## IMLib-uni 项目

1. 安装依赖
```
npm install
```

2. 创建 npm 包软链
```
npm link
```

3. 编译
```
npm run dev
```

## uniapp-native-plugin-demo

### 开发环境初始化
1. imlib-uni 包软链接初始化
```
npm link @rongcloud/imlib-uni
```

2. 将原生插件放到 nativeplugins 目录下

3. 在 manifest.json -> APP 原生插件配置 -> 本地插件中加入原生插件

4. 运行 -> 运行到手机 -> 制作自定义调试基座

5. 运行 -> 运行到手机 -> 运行基座选择 -> 选择自定义基座

### 开发说明

1. 在 config/interfaceList.js 文件中添加测试接口
