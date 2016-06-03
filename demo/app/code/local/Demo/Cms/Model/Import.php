<?php

    class Demo_Cms_Model_Import
    {
        function saveCmsData($data, $storeId, $isPage = false)
        {
            $store = array(
                $storeId
            );

            $store[] = Mage_Core_Model_App::ADMIN_STORE_ID;

            if ($isPage)  {
                $model = Mage::getModel('cms/page');
            }
            else {
                $model = Mage::getModel('cms/block');
            }

            $collection = $model->getCollection()->addFieldToFilter('identifier', $data['identifier'])->addStoreFilter($storeId);
            $cmsItem = $collection->getFirstItem();

            if ($cmsItem && ($cmsItem->getBlockId() || $cmsItem->getPageId())) {
                $oldData = $cmsItem->getData();
                $data = array_merge($oldData, $data);
                $cmsItem->setData($data)->save();
            }
            else {
                $model->setData($data)->save();
            }

            return;
        }
    }
