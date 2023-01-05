<?php

namespace Drupal\ptv\Helpers;

/**
 * Helper class for PTV related data.
 */
class PtvHelper {

  /**
   * Returns an array.
   *
   * @return array
   *   Returns array of items.
   */
  public function prepareMigrateIterator($config, $key, $langcodes) {

    $config = \Drupal::config($config);
    $config_data = $config->get($key);

    $tmp_ids = [
      // 'ff000abb-d4ba-4342-977b-743215b4d567',
      // 'e1d74431-eee4-485c-bcc2-27c69ec7462b',
      // '353d9358-ed47-445c-889f-b505444fb216',
      // '70bef918-cd73-4a0d-90f1-52e6c835c9fa',
      // '552b8911-9117-472c-81eb-bf0fcd9b14e3',
      // '814d1a4c-2656-4348-b54b-8b04ede310ba',
      // 'afa50539-473f-4823-baf4-d728a1bae7cb',
      // 'afa50539-473f-4823-baf4-d728a1bae7cb',
      // 'ea68d45c-082a-4eae-9ecc-3331d072ff25'
    ];

    $data = [];
    foreach ($config_data as $key => $name) {
      // If (in_array($key, $tmp_ids)) {.
      foreach ($langcodes as $langcode) {
        $data[] = ['id' => $key, 'name' => $name, 'langcode' => $langcode];
      }
      // }
    }

    return $data;

  }

  /**
   * Returns an array of item's data.
   */
  public function prepareMigrateData($key, $langcode, $id, $skip_missing_translations = FALSE) {

    $ptv_service = \Drupal::service('ptv.api_service');
    $data = [];
    $translation_missing = TRUE;

    switch ($key) {
      case 'services':
        $object = $ptv_service->getService($id);
        $general_description = NULL;
        if (!empty($object->generalDescriptionId)) {
          $general_description = $ptv_service->getGeneralDescription($object->generalDescriptionId);
        }
        $ontology_terms = [];
        $target_groups = [];
        $service_classes = [];

        if (!empty($object->serviceNames) && is_array($object->serviceNames)) {
          foreach ($object->serviceNames as $value) {
            if ($value->type == 'Name') {
              $name = $value->value;
              if ($value->language == 'fi') {
                $name = $value->value;
              }
              if ($value->language == $langcode) {
                $name = $value->value;
                $translation_missing = FALSE;
                break;
              }
            }
          }
        }

        // Skip an empty translation.
        if ($skip_missing_translations && $translation_missing) {
          $data = [
            'id' => $id,
            'name' => $name ?? $id,
            'langcode' => FALSE,
          ];

          break;
        }

        if (!empty($object->serviceDescriptions) && is_array($object->serviceDescriptions)) {
          foreach ($object->serviceDescriptions as $value) {
            if (isset($value->language, $value->type) && $value->language == $langcode) {
              switch ($value->type) {
                case 'Summary':
                  $summary = $value->value;
                  break;

                case 'Description':
                  $description = $value->value;
                  break;

                case 'UserInstruction':
                  $user_instruction = $value->value;
                  break;

                case 'ChargeTypeAdditionalInfo':
                  $charge_info = $value->value;
                  break;
              }
            }
          }
        }

        if (
          !empty($general_description->descriptions) &&
          is_array($general_description->descriptions)
        ) {
          foreach ($general_description->descriptions as $value) {
            if ($value->language == $langcode) {
              switch ($value->type) {
                case 'BackgroundDescription':
                  $background_description = $value->value;
                  break;
              }
            }
          }
        }

        if (isset($object->ontologyTerms) && is_array($object->ontologyTerms)) {
          foreach ($object->ontologyTerms as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $ontology_terms[] = [
                  'name' => $value->value,
                  'uri' => $term->uri,
                ];
              }
            }
          }
        }

        if (isset($object->targetGroups) && is_array($object->targetGroups)) {
          foreach ($object->targetGroups as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $target_groups[] = [
                  'name' => $value->value,
                  'uri' => $term->uri,
                ];
              }
            }
          }
        }
        if (isset($object->requirements) && is_array($object->requirements)) {
          foreach ($object->requirements as $requirement) {
            if ($requirement->language == $langcode) {
              $requirements = $requirement->value;
            }
          }
        }

        if (isset($object->serviceClasses) && is_array($object->serviceClasses)) {
          foreach ($object->serviceClasses as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $service_classes[] = [
                  'name' => $value->value,
                  'uri' => $term->uri,
                ];
              }
            }
          }
        }

        if (
          !empty($general_description->legislation) &&
          is_array($general_description->legislation)
        ) {
          $legislation_links = [];
          foreach ($general_description->legislation as $legislation) {
            $legislation_link = [
              'title' => '',
              'uri' => '',
            ];
            if (isset($legislation->names)) {
              foreach ($legislation->names as $linkName) {
                if ($linkName->language == $langcode) {
                  $legislation_link['title'] = $linkName->value;
                }
              }
            }
            if (isset($legislation->webPages)) {
              foreach ($legislation->webPages as $linkUrl) {
                if ($linkUrl->language == $langcode) {
                  $legislation_link['uri'] = $linkUrl->url;
                }
              }
            }
            $legislation_links[] = $legislation_link;
          }
        }

        $data = [
          'id' => $id,
          'name' => $name ?? $id,
          'langcode' => $langcode,
          'summary' => $summary ?? '',
          'description' => $description ?? '',
          'background_description' => $background_description ?? '',
          'legislation_links' => $legislation_links ?? [],
          'user_instruction' => $user_instruction ?? '',
          'charge_info' => $charge_info ?? '',
          'ontology_terms' => $ontology_terms,
          'target_groups' => $target_groups,
          'requirements' => $requirements ?? '',
          'service_classes' => $service_classes,
        ];

        break;

      case 'service_channels':

        $object = $ptv_service->getServiceChannel($id);
        $services = [];
        $address = [];
        $coordinates = [];
        $langs = [];
        $phone_numbers = [];
        $ontology_terms = [];
        $opening_hours = [];
        $accessibility = '';

        if (!empty($object->serviceChannelNames) && is_array($object->serviceChannelNames)) {
          foreach ($object->serviceChannelNames as $value) {
            if ($value->type == 'Name') {
              $name = $value->value;
              if ($value->language == 'fi') {
                $name = $value->value;
              }
              if ($value->language == $langcode) {
                $name = $value->value;
                $translation_missing = FALSE;
                break;
              }
            }
          }
        }

        // Skip an empty translation.
        if ($skip_missing_translations && $translation_missing) {
          $data = [
            'id' => $id,
            'name' => $name ?? $id,
            'langcode' => FALSE,
          ];

          break;
        }

        if (isset($object->services) && is_array($object->services)) {
          foreach ($object->services as $value) {
            $services[] = $value->service->id;
          }
        }

        if (isset($object->serviceChannelDescriptions) && is_array($object->serviceChannelDescriptions)) {
          foreach ($object->serviceChannelDescriptions as $value) {
            if ($value->language == $langcode) {
              switch ($value->type) {
                case 'Summary':
                  $summary = $value->value;
                  break;

                case 'Description':
                  $description = $value->value;
                  break;
              }
            }
          }
        }

        if (isset($object->emails) && is_array($object->emails)) {
          foreach ($object->emails as $value) {
            if ($value->language == $langcode) {
              $email = $value->value;
            }
          }
        }

        if (isset($object->phoneNumbers) && is_array($object->phoneNumbers)) {
          $i = 0;
          foreach ($object->phoneNumbers as $value) {
            if ($value->language == $langcode) {
              $phone = $value->prefixNumber . ' ' . $value->number;
              $phone_numbers[$i]['first'] = $value->additionalInformation;
              $phone_numbers[$i]['second'] = $phone;
              $i++;
            }
          }
        }

        if (isset($object->webPages) && is_array($object->webPages)) {
          foreach ($object->webPages as $value) {
            if ($value->language == $langcode) {
              $webpage['uri'] = $value->url;
              $webpage['title'] = $value->value;
            }
          }
        }

        if (isset($object->languages) && is_array($object->languages)) {
          $langs = $object->languages;
        }

        if (isset($object->addresses) && is_array($object->addresses)) {
          foreach ($object->addresses as $value) {
            if (isset($value->streetAddress->street) && is_array($value->streetAddress->street)) {
              foreach ($value->streetAddress->street as $street) {
                if ($street->language == $langcode) {
                  $address['address_line1'] = $street->value . ' ' . $value->streetAddress->streetNumber;
                }
              }
            }

            if (isset($value->streetAddress->postOffice) && is_array($value->streetAddress->postOffice)) {
              $post_code = $value->streetAddress->postalCode;
              foreach ($value->streetAddress->postOffice as $postOffice) {
                if ($postOffice->language == $langcode) {
                  $address['locality'] = $postOffice->value;
                  $address['postal_code'] = $post_code;
                  $address['country_code'] = 'FI';
                }
              }
            }
            $coordinates['first'] = $value->streetAddress->latitude;
            $coordinates['second'] = $value->streetAddress->longitude;

            $sentences = [];
            $i = 0;
            foreach ($value->entrances as $entrance) {
              foreach ($entrance->accessibilitySentences as $sentenceGroup) {

                foreach ($sentenceGroup->sentenceGroup as $group) {
                  if ($group->language == $langcode) {
                    $sentences[$i]['group'] = $group->value;
                  }
                }

                foreach ($sentenceGroup->sentences as $sentence) {
                  foreach ($sentence->sentence as $sentence_value) {
                    if ($sentence_value->language == $langcode) {
                      $sentences[$i]['sentences'][] = $sentence_value->value;
                    }
                  }
                }
                $i++;
              }
            }

            if (!empty($sentences)) {
              foreach ($sentences as $key => $row) {
                $accessibility .= '<h4>' . $row['group'] . '</h4>';
                $accessibility .= '<ul>';
                foreach ($row['sentences'] as $sentence) {
                  $accessibility .= '<li>' . $sentence . '</li>';
                }
                $accessibility .= '</ul>';
              }
            }
          }
        }

        if (isset($object->ontologyTerms) && is_array($object->ontologyTerms)) {
          foreach ($object->ontologyTerms as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $ontology_terms[] = [
                  'name' => $value->value,
                  'uri' => $term->uri,
                ];
              }
            }
          }
        }

        if (isset($object->serviceHours) && is_array($object->serviceHours)) {
          $i = 0;
          $ii = 0;
          foreach ($object->serviceHours as $serviceHours) {
            if ($serviceHours->validForNow) {
              foreach ($serviceHours->additionalInformation as $key => $value) {
                if ($value->language == $langcode) {
                  $opening_hours[$i]['first'] = $value->value;
                  $i++;
                }
              }
              if ($serviceHours->isAlwaysOpen) {
                $opening_hours[$i]['first'] = 'Always Open';
                continue;
              }
              $save_time = NULL;
              $h = 0;
              $times = [];
              foreach ($serviceHours->openingHour as $day) {
                $time = substr(str_replace(':', '.', $day->from), 0, -3) . ' - ' . substr(str_replace(':', '.', ltrim($day->to, 0)), 0, -3);
                $weekday = $day->dayFrom;
                $weekday .= !empty($day->dayTo) ? ' - ' . $day->dayTo : '';

                if ($save_time && $save_time != $time) {
                  $h++;
                }
                $save_time = $time;
                $day_names[$weekday][] = $time;
              }

              $weekdays = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ];
              $groups = [];
              $g = 0;
              $save_days = NULL;
              foreach ($weekdays as $day) {
                if (isset($day_names[$day])) {
                  if ($save_days && $save_days !== $day_names[$day]) {
                    $g++;
                  }
                  $groups[$g]['days'][] = $this->getTranslatedDay($day, $langcode);
                  if (isset($groups[$g]['times']) && is_array($groups[$g]['times'])) {
                    $groups[$g]['times'] = array_merge($day_names[$day], $groups[$g]['times']);
                  }
                  else {
                    $groups[$g]['times'] = $day_names[$day];
                  }
                  $groups[$g]['times'] = array_values(array_unique($groups[$g]['times']));

                  $save_days = $day_names[$day];
                }
              }

              $separator = t('and', [], ['langcode' => $langcode]);
              foreach ($groups as $group) {
                $days = $group['days'];
                $times = $group['times'];
                sort($times);
                // phpcs:disable
                $times = array_map(function ($item) {
                    return ltrim($item, 0);
                }, $times);
                // phpcs:enable
                $first = current($days);
                if (count($days) > 1) {
                  $last_day = array_pop($days);
                  $first = $first . ' - ' . $last_day;
                }
                $second = implode(' ' . $separator . ' ', $times);
                $opening_hours[$ii]['first'] = $first;
                $opening_hours[$ii]['second'] = $second;
                $ii++;
              }
            }
          }
        }

        $data = [
          'id' => $id,
          'name' => $name ?? $id,
          'langcode' => $langcode,
          'services' => $services,
          'summary' => $summary ?? '',
          'description' => $description ?? '',
          'email' => $email ?? '',
          'phone_numbers' => $phone_numbers,
          'webpage' => $webpage ?? '',
          'address' => $address ?? '',
          'coordinates' => $coordinates ?? '',
          'langs' => $langs,
          'accessibility' => $accessibility,
          'ontology_terms' => $ontology_terms,
          'opening_hours' => $opening_hours,
          'channel_type' => $object->serviceChannelType,
        ];

        break;

    }
    return $data;
  }

  /**
   * Returns string.
   */
  public function getTranslatedDay($var, $lang) {
    $days = [
      'Monday' => t('Monday', [], ['langcode' => $lang]),
      'Tuesday' => t('Tuesday', [], ['langcode' => $lang]),
      'Wednesday' => t('Wednesday', [], ['langcode' => $lang]),
      'Thursday' => t('Thursday', [], ['langcode' => $lang]),
      'Friday' => t('Friday', [], ['langcode' => $lang]),
      'Saturday' => t('Saturday', [], ['langcode' => $lang]),
      'Sunday' => t('Sunday', [], ['langcode' => $lang]),
    ];
    if (in_array($var, array_keys($days))) {
      return $days[$var];
    }
    return $var;
  }

}
