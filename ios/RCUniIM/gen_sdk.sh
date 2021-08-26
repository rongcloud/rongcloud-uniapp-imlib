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


cp -af framework/*.xcframework bin/

echo "Uni-app SDK 已生成在 bin/ 中"
