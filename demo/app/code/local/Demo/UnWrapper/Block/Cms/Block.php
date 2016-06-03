<?php

class Demo_UnWrapper_Block_Cms_Block extends Mage_Cms_Block_Block
{
    /**
     * Prepare Content HTML
     *
     * @return string
     */
    protected function _toHtml()
    {
        $blockId = $this->getBlockId();
        $html = '';
        if ($blockId) {
            $block = Mage::getModel('cms/block')
                ->setStoreId(Mage::app()->getStore()->getId())
                ->load($blockId);
            if ($block->getIsActive()) {
                $helper = Mage::helper('unwrapper');
                $processor = $helper->getBlockTemplateProcessor();
                $html = $processor->filter(
                    $helper->processContent($block->getContent())
                );
                $this->addModelTags($block);
            }
        }
        return $html;
    }
}
