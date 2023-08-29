<?php

namespace Drupal\ptv\EventSubscriber;

use Drupal\Core\Database\Connection;
use Drupal\migrate\Event\MigrateEvents;
use Drupal\migrate\Event\MigrateImportEvent;
use Drupal\migrate\Plugin\MigrateIdMapInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Import and sync source and destination.
 */
class PtvMigrationEvents implements EventSubscriberInterface {

  /**
   * The DB connection.
   *
   * @var \Drupal\Core\Database\Connection
   */
  private Connection $connection;

  /**
   * The constructor.
   *
   * @param \Drupal\Core\Database\Connection $connection
   *   The connection.
   */
  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events = [];
    $events[MigrateEvents::PRE_IMPORT][] = ['unpublishMissing'];
    return $events;
  }

  /**
   * Hash ids consistently for comparison.
   */
  protected function standardizeIds($ids) {
    ksort($ids);
    return json_encode($ids, JSON_NUMERIC_CHECK);
  }

  /**
   * Saves the node in "unpublished" state.
   *
   * @param \Drupal\node\Entity\Node $default
   *   The node.
   * @param string $lang
   *   The lang code.
   *
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  private function unpublishTranslation(Node $default, string $lang): void {
    $node = $default->getTranslation($lang);
    $node->set('status', '0');
    $node->set('revision_log', 'Data no longer available in PTV');
    $node->setRevisionUserId(1);
    $node->setRevisionCreationTime(time());
    $node->save();
  }

  /**
   * The reverse of MigrateIdMapInterface::prepareUpdate().
   */
  private function reversePrepareUpdate(string $migration_id): void {
    $map_to_update = 'migrate_map_' . $migration_id;
    $this->connection->update($map_to_update)
      ->fields([
        'source_row_status' => MigrateIdMapInterface::STATUS_IMPORTED,
      ])
      ->condition('source_row_status', MigrateIdMapInterface::STATUS_NEEDS_UPDATE, '=')
      ->execute();
  }

  /**
   * Event callback to sync source and destination.
   *
   * @param \Drupal\migrate\Event\MigrateImportEvent $event
   *   The migration import event.
   */
  public function unpublishMissing(MigrateImportEvent $event) {
    $migration = $event->getMigration();
    if (!in_array($migration->id(), ['services', 'service_channels'])) {
      return;
    }
    $id_map = $migration->getIdMap();
    // This marks in the mapping that the Nodes NEED an update.
    // Without this we can not easily "parse" the ID info from the Source.
    $id_map->prepareUpdate();
    // Clone so that any generators aren't initialized prematurely.
    $source = clone $migration->getSourcePlugin();
    $source->rewind();
    $source_id_values = [];
    while ($source->valid()) {
      $source_id_values[] = $this->standardizeIds($source->current()
        ->getSourceIdValues());
      $source->next();
    }
    $id_map->rewind();
    // Loop through the mapping information to see if we have any mappings that
    // do not exist in the PTV info.
    while ($id_map->valid()) {
      $map_source_id = $id_map->currentSource();
      if (!in_array($this->standardizeIds($map_source_id), $source_id_values, TRUE)) {
        $destination_ids = $id_map->currentDestination();
        $node = Node::load($destination_ids['nid']);
        if ($node instanceof Node && $node->isPublished()) {
          foreach ($node->getTranslationLanguages() as $lang_code => $lang) {
            $this->unpublishTranslation($node, $lang_code);
          }
        }
      }
      $id_map->next();
    }
    // Reverse the $id_map->prepareUpdate() so we don`t force updated the nodes.
    $this->reversePrepareUpdate($migration->id());
  }

}
