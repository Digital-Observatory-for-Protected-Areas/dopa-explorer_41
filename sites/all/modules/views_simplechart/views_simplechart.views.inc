<?php

/**
 * Implements of hook_views_plugins(). 
 */
function views_simplechart_views_plugins() {
  $module_path = drupal_get_path('module', 'views_simplechart');
  return array(
    'style' => array(
      'views_simplechart_plugin_style' => array(
        'title' => t('Views Simple Chart'),
        'help' => t('Simple Chart Visualization'),
        'path' => $module_path . '/plugins',
        'handler' => 'ViewsSimplechartPluginStyle',
        'parent' => 'default',
        'uses row plugin' => FALSE,
        'uses grouping' => FALSE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'type' => 'normal'
      )
    )
  );
}