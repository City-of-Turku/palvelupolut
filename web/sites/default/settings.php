<?php

/**
 * @file
 * Drupal site-specific configuration file.
 */

// Database settings, overridden per environment.
use Drupal\Core\Installer\InstallerKernel;

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

// Location of the site configuration files.
$settings['config_sync_directory'] = '../config/sync';

// Set state cache flag to TRUE.
$settings['state_cache'] = TRUE;

// Configuration split settings for development.
$config['config_split.config_split.production']['status'] = FALSE;
$config['config_split.config_split.development']['status'] = TRUE;

// File proxy origin site.
$config['stage_file_proxy.settings']['origin'] = 'https://palvelupolut.fi';

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

    // Configuration split settings for production.
    $config['config_split.config_split.production']['status'] = TRUE;
    $config['config_split.config_split.development']['status'] = FALSE;

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
    // Skip file system permissions hardening.
    $settings['skip_permissions_hardening'] = TRUE;

    // Skip trusted host pattern.
    $settings['trusted_host_patterns'] = ['.*'];
    $config['system.performance']['css']['preprocess'] = FALSE;
    $config['system.performance']['js']['preprocess'] = FALSE;

    // Enable Twig debugging.
    $config['system.performance']['twig.config']['debug'] = TRUE;
    $config['system.performance']['twig.config']['auto_reload'] = TRUE;


    if (class_exists('Kint')) {
      Kint::$depth_limit = 4;
    }
    break;

  default:
    $settings['simple_environment_indicator'] = '#2F2942 Test';
    break;
}

// Load services definition file.
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';

// The default list of directories that will be ignored by Drupal's file API.
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

// Load local development override configuration, if available.
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}

// Lando configuration overrides.
if (getenv('LANDO_INFO')) {
  $settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.lando.yml';
}

// Silta cluster configuration overrides.
if (isset($_ENV['SILTA_CLUSTER']) && file_exists($app_root . '/' . $site_path . '/settings.silta.php')) {
  include $app_root . '/' . $site_path . '/settings.silta.php';
}

// Set the memcache server hostname when a memcached server is available.
if (getenv('MEMCACHED_HOST')) {
  $settings['memcache']['servers'] = [getenv('MEMCACHED_HOST') . ':11211' => 'default'];

  // Ensure the memcache Drupal module exists and one of the memcache libraries is found.
  // Cache backends should not be set to memcache during installation.
  // @see https://www.drupal.org/project/drupal/issues/2766509
  if (!InstallerKernel::installationAttempted() && (class_exists('Memcache', FALSE) || class_exists('Memcached', FALSE))) {
    $settings['cache']['default'] = 'cache.backend.memcache';
  }

  // Memcache configuration.
  if (class_exists('Memcached', FALSE)) {
    $settings['memcache']['extension'] = 'Memcached';
    // Memcached PECL Extension Support.
    $settings['memcache']['options'] = [
      // Enable compression for PHP 7.
      \Memcached::OPT_COMPRESSION => TRUE,
      \Memcached::OPT_DISTRIBUTION => \Memcached::DISTRIBUTION_CONSISTENT,
      // Decrease latency.
      \Memcached::OPT_TCP_NODELAY => TRUE,
    ];
  }
}
