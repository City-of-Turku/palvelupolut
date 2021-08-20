<?php

/**
 * @file
 * Settings for Lando environment.
 */

$config['stage_file_proxy.settings']['disabled'] = 0;
// $config['google_analytics.settings']['account'] = 'UA-XXXXXXXXX-99';
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

if (class_exists('Kint')) {
  Kint::$max_depth = 4;
}
