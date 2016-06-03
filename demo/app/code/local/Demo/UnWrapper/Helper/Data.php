<?php

class Demo_UnWrapper_Helper_Data extends Mage_Core_Helper_Abstract
{
    public function processContent($content)
    {
        // Remove wrapping paragraphs around widgets:
        $content = preg_replace('/\<p\>{{(.*?)}}\<\/p\>/', '{{$1}}', $content);

        // Remove div around widgets
        $content = preg_replace('/\<div\>{{(.*?)}}\<\/div\>/', '{{$1}}', $content);

        // Remove empty paragraphs:
        $content = preg_replace('/<p>(|\s*|&nbsp;|\n)<\/p>/', '', $content);

        return $content;
    }
}
