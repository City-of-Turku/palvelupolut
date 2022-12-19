<?php

/**
 * @file
 * Contains all hook_post_update_NAME() implementations.
 */

/**
 * Delete all taxonomy terms for PTV originating vocabularies.
 *
 * This is to allow the next migration process to properly map translations.
 */
function ptv_post_update_delete_taxonomy_terms(array &$sandbox) {
  $message = '';

  $storage = \Drupal::entityTypeManager()->getStorage('taxonomy_term');
  $query = $storage->getQuery();
  $query->condition('vid', ['tags', 'service_classes', 'target_groups'], 'IN');
  $result = $query->execute();

  if (empty($result)) {
    $message = t('No taxonomy terms found, so nothing to delete.');
  }
  else {
    foreach (array_chunk($result, 50, TRUE) as $chunk) {
      $entities = $storage->loadMultiple($chunk);
      $storage->delete($entities);
    }
    $message = t('Deleted all taxonomy terms (%count) from Tags, Service Classes and Target Groups vocabularies.', [
      '%count' => count($result),
    ]);
  }

  return $message;
}
