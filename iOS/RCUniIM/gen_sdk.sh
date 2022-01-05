#!/bin/sh

# clear env
echo "清理编译缓存开始"

rm -rf "bin/"
rm -rf "bin_tmp/"
rm -rf "build/"

echo "清理编译缓存结束"
# clear env end

CONFIGURATION="Release"
PROJECT_NAME="RCUniIM.xcodeproj"
targetName="RCUniIM"
TARGET_DECIVE="iphoneos"
TARGET_I386="iphonesimulator"

xcodebuild clean -configuration $CONFIGURATION -sdk $TARGET_DECIVE
xcodebuild clean -configuration $CONFIGURATION -sdk $TARGET_I386

echo "编译模拟器开始 ${targetName}"
xcodebuild -project ${PROJECT_NAME} -target "$targetName" -configuration $CONFIGURATION  -sdk $TARGET_I386 build
echo "编译模拟器结束 ${targetName}"

echo "编译真机开始 ${targetName}"
xcodebuild -project ${PROJECT_NAME} -target "$targetName" -configuration $CONFIGURATION  -sdk $TARGET_DECIVE build
echo "编译真机结束 ${targetName}"

echo "copy xcframework start"
cp -af framework/*.xcframework bin/
echo "copy xcframework end"

cd bin/

# 将 xcframework 转为 framework
# uniapp 不支持 xcframework 动态库，仅支持 framework 动态库
function lipo_create(){
    TARGET_NAME=$1
    echo
    echo "${TARGET_NAME}.xcframework > ${TARGET_NAME}.framework"
    cp -af ${TARGET_NAME}.xcframework/ios-arm*/${TARGET_NAME}.framework ${TARGET_NAME}.framework

    lipo -create ${TARGET_NAME}.xcframework/ios*/${TARGET_NAME}.framework/${TARGET_NAME} -output ${TARGET_NAME}.framework/${TARGET_NAME}
}

lipo_create RongChatRoom
lipo_create RongIMLibCore
lipo_create RongIMWrapper

echo
file RongChatRoom.framework/RongChatRoom

echo
file RongIMLibCore.framework/RongIMLibCore

echo
file RongIMWrapper.framework/RongIMWrapper

rm -rf *.xcframework
echo
echo "Uni-app SDK 已生成在 bin/ 中"
