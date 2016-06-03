<?php

class Demo_UnWrapper_Model_Observer
{
    public function cmsPageRenderEvent($observer)
    {
        $page = $observer->getPage();
        $content = $page->getContent();
        $helper = Mage::helper('unwrapper')->processContent($content);
        $content = $helper->processContent($content);
        $page->setContent($content);
    }
}
