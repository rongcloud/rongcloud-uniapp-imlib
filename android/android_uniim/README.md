# Android Uni-app SDK 项目

## 集成

### 1. 导入 Module

* 第一步 下载 uniapp 原生 SDK ： [下载地址](https://nativesupport.dcloud.net.cn/NativePlugin/course/android)

打开 SDK 中的 HBuilder-Hello 项目

* 第二步 打开工程， File -> New -> Import Module。 找到下载的 Module 组件导入。
在主工程的 build.gradle 文件中配置 Module, 如下:

```
dependencies {
    ...
    api project(':android_uniim')
    ...
}

```


### 2. 导入 jar

### 前提

参考 [sdk集成方式](https://docs.rongcloud.cn/v4/views/im/ui/guide/quick/include/android.html) 方式集成 融云 IM

1. 通过下面生成 `jar` 包的方式生成对应的 `jar`

2. 添加 jar 到项目工程 `libs` 目录

## 生成 jar

执行

```
./gradlew uniplugin_module:build -x lint
./gradlew uniplugin_module:makeJar
```
完毕之后，`jar` 在 `build/libs/` 目录，生成 `Rong_UniApp.jar`

在项目 `build.gradle` 中定义：
```
//生成 jar 名字
def JAR_NAME = "Rong_UniApp"
//生成 jar 路径
def OUTPUT_PATH = "build/libs/"
```

可自行修改名称和生成目标路径

