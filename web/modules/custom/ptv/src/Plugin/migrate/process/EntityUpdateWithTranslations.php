<?php

namespace Drupal\ptv\Plugin\migrate\process;

use Drupal\Component\Utility\NestedArray;
use Drupal\migrate\MigrateExecutableInterface;
use Drupal\migrate\Row;
use Drupal\migrate_plus\Plugin\migrate\process\EntityGenerate;

/**
 * This plugin generates or updates entities, including translations.
 *
 * The plugin allows setting up a field mapping for target entity, where source
 * field can be a global source field, or a key in the source data array.
 *
 * Example:
 * @code
 * destination:
 *   plugin: 'entity:node'
 * process:
 *   foo: bar
 *   field_tags:
 *     plugin: ptv_entity_update_with_translations
 *     source: tags
 *     default_values:
 *       description: Default description
 *     values:
 *       language: language
 *       field_long_description: some_source_array_key
 *       field_foo: '@foo'
 * @endcode
 *
 * @see \Drupal\migrate_plus\Plugin\migrate\process\EntityGenerate
 *
 * @MigrateProcessPlugin(
 *   id = "ptv_entity_update_with_translations"
 * )
 */
class EntityUpdateWithTranslations extends EntityGenerate {

  /**
   * {@inheritdoc}
   */
  public function transform($value, MigrateExecutableInterface $migrateExecutable, Row $row, $destinationProperty) {
    $this->row = $row;
    $this->migrateExecutable = $migrateExecutable;

    // If the source data is an empty array, return the same.
    if (gettype($value) === 'array' && count($value) === 0) {
      return [];
    }

    // In case of subfields ('field_reference/target_id'), extract the field
    // name only.
    $parts = explode('/', $destinationProperty);
    $destinationProperty = reset($parts);
    $this->determineLookupProperties($destinationProperty);

    $this->destinationProperty = $this->configuration['destination_field'] ?? NULL;

    // Use $value for query lookup by default. If we have an entity field
    // mapping for the value_key field, use that key value from $value array
    // instead to avoid accidental false positives.
    $query_lookup_value = $value;
    $value_source_key = NULL;
    if (isset($this->configuration['value_key'])
      && isset($this->configuration['values'][$this->configuration['value_key']])) {
      $value_source_key = $this->configuration['values'][$this->configuration['value_key']];
    }
    if ($value_source_key && $value[$value_source_key]) {
      $query_lookup_value = $value[$value_source_key];
    }

    // Check to see if we have an existing entity.
    $entity_id = $this->query($query_lookup_value);
    if (is_array($entity_id)) {
      $entity_id = reset($entity_id);
    }

    // Update or generate entity.
    return $this->updateEntity($value, $entity_id);
  }

  /**
   * Generates an entity for a given value.
   *
   * Identical to EntityGenerate::generateEntity() with the exception of
   * allowing $value to be of mixed types.
   *
   * @param mixed $value
   *   Value to use in creation of the entity.
   *
   * @return int|string|null
   *   The entity id of the generated entity or NULL.
   */
  protected function createEntity($value) {
    if (!empty($value)) {
      $entity = $this->entityTypeManager
        ->getStorage($this->lookupEntityType)
        ->create($this->entity($value));
      $entity->save();

      return $entity->id();
    }

    return NULL;
  }

  /**
   * Generate or update an entity with given values.
   *
   * @param array $value
   *   Values for entity.
   * @param int|string|null $entity_id
   *   Single entity id. Optional, defaults to null.
   *
   * @return int|string|null
   *   The entity id or NULL.
   */
  protected function updateEntity(array $value, $entity_id = NULL) {
    if (empty($value)) {
      return NULL;
    }

    // Entity doesn't exist yet; create a new one.
    if (!$entity_id) {
      return $this->createEntity($value);
    }

    $langcode = $this->row->get('langcode');
    $entity_values = $this->entity($value);
    /** @var \Drupal\Core\Entity\ContentEntityBase $entity */
    $entity = $this->entityTypeManager
      ->getStorage($this->lookupEntityType)
      ->load($entity_id);

    // Add a new translation for current langcode, if missing.
    if (!$entity->hasTranslation($langcode)) {
      $entity->addTranslation($langcode, $entity_values);
    }
    // Finally, update existing translations, including the default one
    // to make sure destination keeps up to date with the source.
    else {
      $entity_translation = $entity->getTranslation($langcode);

      foreach ($entity_values as $field_name => $field_value) {
        if ($entity_translation->hasField($field_name)) {
          $entity_translation->set($field_name, $field_value);
        }
      }
    }

    $entity->save();

    return $entity->id();
  }

  /**
   * {@inheritdoc}
   */
  protected function entity($value): array {
    $entity_values = [];

    if ($this->lookupBundleKey) {
      $entity_values[$this->lookupBundleKey] = $this->lookupBundle;
    }

    // Gather any static default values for properties/fields.
    if (isset($this->configuration['default_values']) && is_array($this->configuration['default_values'])) {
      foreach ($this->configuration['default_values'] as $key => $value) {
        $entity_values[$key] = $value;
      }
    }
    // Gather any additional properties/fields.
    if (isset($this->configuration['values']) && is_array($this->configuration['values'])) {
      foreach ($this->configuration['values'] as $key => $property) {
        // Try fetching source value from value array first, and if not found
        // fetch it from row properties.
        $source_value = $value[$property] ?? $this->row->get($property);
        NestedArray::setValue($entity_values, explode(Row::PROPERTY_SEPARATOR, $key), $source_value, TRUE);
      }
    }

    return $entity_values;
  }

}
