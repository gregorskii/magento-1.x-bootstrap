<?php

    $this->startSetup();

    $this->addAttribute(Mage_Catalog_Model_Product::ENTITY, 'item', array(
        'group'             => 'General',
        'input'             => 'text',
        'type'              => 'text',
        'label'             => 'item',
        'backend'           => '',
        'visible'           => true,
        'required'          => true,
        'visible_on_front'  => true,
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_WEBSITE,
    ));

    $this->addAttribute(Mage_Catalog_Model_Product::ENTITY, 'year', array(
        'group'             => 'General',
        'input'             => 'text',
        'type'              => 'text',
        'label'             => 'Year',
        'backend'           => '',
        'visible'           => true,
        'required'          => true,
        'visible_on_front'  => true,
        'global'            => Mage_Catalog_Model_Resource_Eav_Attribute::SCOPE_WEBSITE,
    ));

    $this->endSetup();
