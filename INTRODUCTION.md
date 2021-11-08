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