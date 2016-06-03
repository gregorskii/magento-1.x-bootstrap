#!/usr/bin/env bash

CURRENT_DIR=$(pwd)
APP_NAME=demo

# Remove any previous symlinks
rm -rf ./magento/app/code/local
rm -rf ./magento/app/design/frontend/${APP_NAME}
rm -rf ./magento/skin/frontend/${APP_NAME}
find ./magento/app/etc/modules/ -name *.xml -type l -delete

# Symlink VD Magento files
ln -s ${CURRENT_DIR}/${APP_NAME}/app/code/local ./magento/app/code/local
ln -s ${CURRENT_DIR}/${APP_NAME}/app/design/frontend/${APP_NAME} ./magento/app/design/frontend/${APP_NAME}
ln -s ${CURRENT_DIR}/${APP_NAME}/skin/frontend/${APP_NAME} ./magento/skin/frontend/${APP_NAME}

# Symlink all VD Module Config Files
ln -s ${CURRENT_DIR}/${APP_NAME}/app/etc/modules/*.xml ./magento/app/etc/modules/

# Overwrite Assets in webroot
cp -n ${CURRENT_DIR}/${APP_NAME}/.htaccess      ./magento/.htaccess
cp -n ${CURRENT_DIR}/${APP_NAME}/favicon.ico    ./magento/favicon.ico

cd ./magento/
modman repair
rm -rf ./.modgit
modgit init
