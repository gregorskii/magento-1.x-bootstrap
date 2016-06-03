#!/usr/bin/env bash

# Define globals
MAGERUN_INSTALL_DIR=/usr/local/bin/
DB_USER=magento_user
DB_PASSWORD=1234
DB_NAME=magento
BASE_URL=http://magento-test.localhost/
CURRENT_DIR=$(pwd)

# Install Magerun if it does not exist
if [ -f ${MAGERUN_INSTALL_DIR}/n98-magerun.phar ]; then
   echo "Skipping n98-magerun install"
else
    curl -sS http://files.magerun.net/n98-magerun-latest.phar -o ${MAGERUN_INSTALL_DIR}/n98-magerun.phar
    chmod +x ${MAGERUN_INSTALL_DIR}/n98-magerun.phar
fi

# Copy base VD config if one does not exist
if [ ! -f ~/.n98-magerun.yaml ]; then
    cp ./tools/.n98-magerun.yaml ~/.n98-magerun.yaml
fi

# Install Magento using n98-magerun
if [ ! -d './magento' ]; then
    php -dmemory_limit=1024M -f ${MAGERUN_INSTALL_DIR}/n98-magerun.phar install \
        --magentoVersionByName="magento-mirror-1.9.2.1" \
        --dbHost="localhost" \
        --dbUser=${DB_USER} \
        --dbPass=${DB_PASSWORD} \
        --dbName=${DB_NAME} \
        --installSampleData=no \
        --installationFolder="magento" \
        --useDefaultConfigParams=yes \
        --baseUrl=${BASE_URL}

    sh ./sync.sh
    sh ./install_packages.sh

else
    echo 'Magento already installed'
fi
