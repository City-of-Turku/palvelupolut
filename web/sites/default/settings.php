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

// Environment-specific settings.
$env = $_ENV['ENVIRONMENT_NAME'];
switch ($env) {
  case 'production':
    $settings['simple_environment_indicator'] = '#9E005D Production';
    // Warden settings.
    $config['warden.settings']['warden_token'] = $_ENV['WARDEN_TOKEN'];
    break;

  case 'master':
    $settings['simple_environment_indicator'] = '#5B37BF Stage';
    break;

  case 'local':
    $settings['simple_environment_indicator'] = '#2F2942 Local';
    // Skip file system permissions hardening.
    $settings['skip_permissions_hardening'] = TRUE;
    // Skip trusted host pattern.
    $settings['trusted_host_patterns'] = ['.*'];
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

// Warden settings.
// Shared security token between the site and Warden server.
$config['warden.settings']['warden_token'] = $_ENV['WARDEN_TOKEN'];
// Location of the Warden server, no trailing slash.
$config['warden.settings']['warden_server_host_path'] = 'https://warden.wunder.io';
// Allow refreshing site data from the Warden server.
$config['warden.settings']['warden_allow_requests'] = TRUE;
// Basic HTTP authorization credentials.
$config['warden.settings']['warden_http_username'] = 'warden';
$config['warden.settings']['warden_http_password'] = 'wunder';
// IP addresses of the Warden server allowed to make callback requests.
$config['warden.settings']['warden_public_allow_ips'] = '35.228.188.78,35.228.81.50,10.0.0.0/8';
// Define the module locations.
$config['warden.settings']['warden_preg_match_custom'] = '{^modules\/custom\/*}';
$config['warden.settings']['warden_preg_match_contrib'] = '{^modules\/contrib\/*}';
$config['warden.settings']['warden_match_contrib'] = TRUE;

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
if (getenv('LANDO_INFO') && file_exists($app_root . '/' . $site_path . '/settings.lando.php')) {
  include $app_root . '/' . $site_path . '/settings.lando.php';
}

// Silta cluster configuration overrides.
if (isset($_ENV['SILTA_CLUSTER']) && file_exists($app_root . '/' . $site_path . '/settings.silta.php')) {
  include $app_root . '/' . $site_path . '/settings.silta.php';
}
