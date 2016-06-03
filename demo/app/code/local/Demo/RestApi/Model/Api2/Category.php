<?php

class Demo_RestApi_Model_Api2_Category extends Mage_Api2_Model_Resource {
    public function _retrieve() {
        $category_id = $this->getRequest()->getParam('id');
        $category = Mage::getModel('catalog/category')->load($category_id);
        $category->setStoreId($this->_getStore()->getId());

        $data = array();
        $data['entity_id'] = $category_id;
        $data['name'] = $category->getName();
        $data['parent_id'] = $category->getParentId();
        $data['children'] = $category->getResource()->getChildren($category, false);
        $data['is_active'] = $category->getIsActive() ? 1 : 0;
        $data['level'] = $category->getLevel();
        $data['position'] = $category->getPosition();
        $data['url_key'] = $category->getUrlKey();
        return $data;
    }

    protected function _retrieveCollection() {
        $model = Mage::getModel('catalog/category');
        $model->setStoreId($this->_getStore()->getId());
        $collection = $model->getCollection()
            ->addAttributeToSelect(array_keys(
                $this->getAvailableAttributes($this->getUserType(), Mage_Api2_Model_Resource::OPERATION_ATTRIBUTE_READ)
            ));
        $this->_applyCollectionModifiers($collection);
        return $collection->load()->toArray();
    }
}
