<?php

namespace Drupal\ptv\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SourcePluginBase;
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Row;
use Drupal\ptv\Helpers\PtvHelper;

/**
 * Source returning a row based on the constants provided.
 *
 * Example:
 *
 * @code
 * source:
 *   plugin: config
 *   configuration_name: label.setting
 *   key: key
 *   default_langcode: en
 *   languages:
 *    - en
 *    - fi
 *   skip_missing_translations: false
 * @endcode
 *
 * This will return a single row containing 'constants/entity_type' and
 * 'constants/field_name' elements, with values of 'user' and 'image',
 * respectively.
 *
 * For additional configuration keys, refer to the parent class:
 * @see \Drupal\migrate\Plugin\migrate\source\SourcePluginBase
 *
 * @MigrateSource(
 *   id = "config",
 *   source_module = "ptv"
 * )
 */
class ConfigurationSource extends SourcePluginBase {

  /**
   * The source configuration name.
   *
   * @var array
   */
  protected $sourceConfig;

  /**
   * The source configuration key.
   *
   * @var array
   */
  protected $sourceKey;

  /**
   * Set for base migration, without translations.
   *
   * @var array
   */
  protected $defaultLangcode;

  /**
   * Translation languages.
   *
   * @var array
   */
  protected $languages;

  /**
   * Should we skip missing translations.
   *
   * @var bool
   */
  protected $skipMissingTranslations;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $migration);

    $this->sourceConfig = $configuration['configuration_name'];
    $this->sourceKey = $configuration['key'];
    $this->defaultLangcode = $configuration['default_langcode'] ?? NULL;
    $this->languages = $configuration['languages'] ?? NULL;
    $this->skipMissingTranslations = $configuration['skip_missing_translations'] ?? FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    return [
      'id' => t('ID'),
      'name' => t('Name'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function initializeIterator() {

    $helper = new PtvHelper();
    $langcodes = [];
    if ($this->defaultLangcode) {
      $langcodes[] = $this->defaultLangcode;
    }
    if ($this->languages) {
      $langcodes = $this->languages;
    }

    $data = $helper->prepareMigrateIterator($this->sourceConfig, $this->sourceKey, $langcodes);
    return new \ArrayIterator($data);
  }

  /**
   * Allows class to decide how it will react when it is treated like a string.
   */
  public function __toString() {
    return '';
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    $ids['id']['type'] = 'string';
    $ids['langcode']['type'] = 'string';
    if ($this->defaultLangcode) {
      unset($ids['langcode']);
    }
    return $ids;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    $helper = new PtvHelper();

    $id = $row->getSourceProperty('id');
    $langcode = $row->getSourceProperty('langcode');
    $data = $helper->prepareMigrateData($this->sourceKey, $langcode, $id, $this->skipMissingTranslations);

    foreach ($data as $key => $value) {
      $row->setSourceProperty($key, $value);
    }
    return parent::prepareRow($row);
  }

}
