<?php

namespace Drupal\ptv\EventSubscriber;

use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigrateImportEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Drupal\node\NodeInterface;

/**
 * Import and sync source and destination.
 */
class PtvMigrationEvents implements EventSubscriberInterface {

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events = [];
    $events[MigrateEvents::PRE_IMPORT][] = ['unpublishMissing'];
    return $events;
  }

  /**
   * Event callback to sync source and destination.
   *
   * @param \Drupal\migrate\Event\MigrateImportEvent $event
   *   The migration import event.
   */
  public function unpublishMissing(MigrateImportEvent $event) {
    // $migration = $event->getMigration();
    // $nodeStorage = \Drupal::entityTypeManager()->getStorage('node');
    // $site_languages = \Drupal::languageManager()->getLanguages();
    // foreach ($site_languages as $lang) {
    //   $languages[$lang->getId()] = $lang->getId();
    // }

    // if ($migration->id() === 'services' || $migration->id() === 'service_channels') {
    //   $id_map = $migration->getIdMap();
    //   $id_map->prepareUpdate();
    //   // Clone so that any generators aren't initialized prematurely.
    //   $source = clone $migration->getSourcePlugin();
    //   $source->rewind();
    //   $source_id_values = [];
    //   while ($source->valid()) {
    //     $source_id_values[] = $source->current()->getSourceIdValues();
    //     $source->next();
    //   }
    //   $id_map->rewind();

    //   while ($id_map->valid()) {
    //     $map_source_id = $id_map->currentSource();
    //     if (!in_array($map_source_id, $source_id_values, TRUE)) {
    //       $destination_ids = $id_map->currentDestination();
    //       if (!empty($destination_ids['nid'])) {
    //         $node = $nodeStorage->load($destination_ids['nid']);
    //         if ($node instanceof NodeInterface) {
    //           foreach ($languages as $lang_code) {
    //             if ($node->hasTranslation($lang_code)) {
    //               $node = $node->getTranslation($lang_code);
    //               $status = $node->get('status')->getString();
    //               if ($status == '1') {
    //                 $node->set('status', 0);
    //                 $node->save();
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //     $id_map->next();
    //   }
    // }
  }

}
