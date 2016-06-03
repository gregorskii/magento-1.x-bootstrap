<?php

    $storeId = Mage_Core_Model_App::ADMIN_STORE_ID;
    $packagePath = realpath(__DIR__ . '/..');

    $cmsBlocks = array(
        array(
            'stores' => $storeId,
            'title' => 'Footer',
            'identifier' => 'footer',
            'is_active' => 1,
            'content' => file_get_contents($packagePath . '/cms_blocks_0.1.0/footer.html')
        ),
        array(
            'stores' => $storeId,
            'title' => 'Menu',
            'identifier' => 'menu',
            'is_active' => 1,
            'content' => file_get_contents($packagePath . '/cms_blocks_0.1.0/menu.html')
        )
    );

    foreach ($cmsBlocks as $block) {
        Mage::getModel('demo_cms/import')->saveCmsData($block, $storeId, false);
    }

    $cmsPages = array (
        array(
            'title' => 'Home',
            'content_heading' => '',
            'root_template'   => '1 column',
            'identifier' => 'home',
            'is_active' => '1',
            'stores' => array($storeId),
            'content' => file_get_contents($packagePath . '/cms_pages_0.1.0/home.html')
        )
    );

    /**
     * For Multi Stores
     * Can run shortly by using saveCmsData
     */
    foreach ($cmsPages as $page) {
        Mage::getModel('demo_cms/import')->saveCmsData($page, $storeId, true);
    }

    $cmsPagesToRemove = array(
        array(
            'identifier' => 'about-magento-demo-store'
        ),
        array(
            'identifier' => 'customer-service'
        )
    );

    foreach ($cmsPagesToRemove as $page) {
        // Check if static block $page
        $collection = Mage::getModel('cms/page')->load($page['identifier']);
        $block_identifier = $collection->getData('identifier');

        if($block_identifier) {
            $page = Mage::getModel('cms/page')->load($page['identifier']);
            $page->delete();
        }
    }
