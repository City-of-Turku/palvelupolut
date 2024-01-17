<?php

/**
 * @file
 * Drupal site-specific configuration file.
 */

// Database settings, overridden per environment.
$databases = [];
$databases['default']['default'] = [
  'database' => $_ENV['DB_NAME_DRUPAL'],
  'username' => $_ENV['DB_USER_DRUPAL'],
  'password' => $_ENV['DB_PASS_DRUPAL'],
  'prefix' => '',
  'host' => $_ENV['DB_HOST_DRUPAL'],
  'port' => '3306',
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

// Salt for one-time login links, cancel links, form tokens, etc.
$settings['hash_salt'] = $_ENV['HASH_SALT'];

// Disable Updates log
$settings['updates_log_disabled'] = TRUE;
$config['config_split.config_split.production']['status'] = FALSE;

// Default SMTP settings.
$config['smtp.settings']['smtp_host'] = 'mailhog';
$config['smtp.settings']['smtp_port'] = '1025';
$config['smtp.settings']['smtp_protocol'] = 'standard';
$config['smtp.settings']['smtp_on'] = 1;

// Environment-specific settings.
$env = $_ENV['ENVIRONMENT_NAME'];
switch ($env) {
  case 'production':
    $settings['simple_environment_indicator'] = '#9E005D Production';

    // Enable Updates log
    $settings['updates_log_disabled'] = FALSE;
    $config['config_split.config_split.production']['status'] = TRUE;

    // SMTP settings.
    $config['smtp.settings']['smtp_host'] = 'smtp.turku.fi';
    $config['smtp.settings']['smtp_port'] = '587';
    break;

  case 'master':
    $settings['simple_environment_indicator'] = '#5B37BF Stage';

    // SMTP settings.
    $config['smtp.settings']['smtp_host'] = 'master-mailhog';
    $config['smtp.settings']['smtp_port'] = '1025';
    break;

  case 'local':
  case 'lando':
    $settings['simple_environment_indicator'] = '#2F2942 Local';
    // File proxy origin site.
    $config['stage_file_proxy.settings']['origin'] = 'https://palvelupolut.fi';
    // Skip file system permissions hardening.
    $settings['skip_permissions_hardening'] = TRUE;
    // Skip trusted host pattern.
    $settings['trusted_host_patterns'] = ['.*'];
    // $config['google_analytics.settings']['account'] = 'UA-XXXXXXXXX-99';
    $config['system.performance']['css']['preprocess'] = FALSE;
    $config['system.performance']['js']['preprocess'] = FALSE;

    if (class_exists('Kint')) {
      Kint::$depth_limit = 4;
    }
    break;

  default:
    $settings['simple_environment_indicator'] = '#2F2942 Test';
    break;
}

// Location of the site configuration files.
$settings['config_sync_directory'] = '../config/sync';

// Load services definition file.
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

/**
 * The default list of directories that will be ignored by Drupal's file API.
 *
 * By default ignore node_modules and bower_components folders to avoid issues
 * with common frontend tools and recursive scanning of directories looking for
 * extensions.
 *
 * @see file_scan_directory()
 * @see \Drupal\Core\Extension\ExtensionDiscovery::scanDirectory()
 */
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

/**
 * Load local development override configuration, if available.
 *
 * Use settings.local.php to override variables on secondary (staging,
 * development, etc) installations of this site. Typically used to disable
 * caching, JavaScript/CSS compression, re-routing of outgoing emails, and
 * other things that should not happen on development and testing sites.
 */
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}

/**
 * Lando configuration overrides.
 */
if (getenv('LANDO_INFO')) {
  $settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.lando.yml';
}

// Silta cluster configuration overrides.
if (isset($_ENV['SILTA_CLUSTER']) && file_exists($app_root . '/' . $site_path . '/settings.silta.php')) {
  include $app_root . '/' . $site_path . '/settings.silta.php';
}
