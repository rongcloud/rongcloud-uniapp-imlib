#!/bin/sh

echo "编译 SDK 到 bin 目录"

BIN_DIR="bin"
if [ ! -d "$BIN_DIR" ]; then
    mkdir -p "$BIN_DIR"
fi

BIN_DIR_TMP="bin_tmp"
if [ ! -d "$BIN_DIR_TMP" ]; then
    mkdir -p "$BIN_DIR_TMP"
fi

if [ ! -d "$BIN_DIR_TMP/${PLATFORM_NAME}.sdk" ]; then
    mkdir -p "$BIN_DIR_TMP/${PLATFORM_NAME}.sdk"
fi


cp -af ${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.framework/ ${BIN_DIR}/${TARGET_NAME}.framework
cp -af ${BUILT_PRODUCTS_DIR}/${TARGET_NAME}.framework/ ${BIN_DIR_TMP}/${PLATFORM_NAME}.sdk/${TARGET_NAME}.framework
lipo -create $BIN_DIR_TMP/*.sdk/${TARGET_NAME}.framework/${TARGET_NAME} -output ${BIN_DIR}/${TARGET_NAME}.framework/${TARGET_NAME}
