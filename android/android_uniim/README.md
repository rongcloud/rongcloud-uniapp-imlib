# Android Uni-app SDK 项目

## 集成

### 1. 导入 Module

* 第一步 下载 uniapp 原生 SDK ：[下载地址](https://nativesupport.dcloud.net.cn/NativePlugin/course/android)

下载融云原生插件

[公有云插件下载地址](https://downloads.rongcloud.cn/RongCloud_uniapp_IMLib_5.1.3.zip)

[私有云插件下载地址](https://downloads.rongcloud.cn/RongCloud_uniapp_IMLib_Private_5.1.3.zip)

注：如果使用私有云 SDK 需要联系融云的商务询问私有云相关事宜

打开 SDK 中的 HBuilder-Hello 项目

* 第二步 

 可以采用两种方式导入 sdk ，分别如下所示：
 
 1. 将第二步下载的 `uniapp sdk` 复制到 `UniPlugin-Hello-AS` 下 `libs`
 目录下（im_chatroom-5.1.3.aar，im_libcore-5.1.3.aar， gson-2.8.6.jar，android_uniim-release.aar）
 
 2. 采用 `gradle` 依赖 融云 `sdk`,在 `build.gradle` 中添加依赖
 
 ```
 dependencies {
    ......
    api 'cn.rongcloud.sdk:im_chatroom:5.1.3'
 }
 此时只需要下载 `android_uniim-release.aar`，放在 `UniPlugin-Hello-AS` 下 `libs` 目录下。
 ```

* 第三步 参考 [Uniapp 配置工程](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android) 检查各项配置，特别注意 `appkey` `appid` 配置


### 生成 aar 、jar 方法

执行

```
./gradlew android_uniim:build -x lint  // 生成 aar
./gradlew android_uniim:makeJar   // 生成 jar
```
完毕之后，
`aar` 在 `build/outputs` 目录，生成 `android_uniim-debug.aar` `android_uniim-release.aar` 
`jar` 在 `build/libs/` 目录，生成 `Rong_UniApp.jar`

在项目 `build.gradle` 中定义：
```
//生成 jar 名字
def JAR_NAME = "Rong_UniApp"
//生成 jar 路径
def OUTPUT_PATH = "build/libs/"
```

可自行修改 `jar` 名称和生成目标路径

