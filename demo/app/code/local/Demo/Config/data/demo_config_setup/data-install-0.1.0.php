<?php

$config = array(
    "design/package/name" => "demo",
    "design/head/default_title" => "Demo Site",
    "design/head/default_description" => "Great Site",
    "design/head/default_keywords" => "Site",
    "design/header/welcome" => "Welcome to Magento!",
    "design/head/default_robots" => "*",
    "design/footer/copyright" => "© 2015 Magento Test. All Rights Reserved.",
    "dev/template/allow_symlink" => 1
);

$changeData = new Mage_Core_Model_Config();

foreach($config as $key => $value) {
    $changeData->saveConfig($key, $value, 'default', 0);
}
