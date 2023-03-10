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

    // Set to TRUE to quickly debug with only a set id values.
    // NOTE! Never use on production!
    $debug = FALSE;
    if ($debug) {
      $tmp_ids = [
        '0573053b-08b9-47dd-9130-65f3a60dbdba',
        'f57476db-1451-4f6b-a53d-11c7615c6c28',
      ];
    }

    $data = [];
    foreach ($config_data as $key => $name) {
      if ($debug) {
        if (in_array($key, $tmp_ids)) {
          foreach ($langcodes as $langcode) {
            $data[] = ['id' => $key, 'name' => $name, 'langcode' => $langcode];
          }
        }
      }
      else {
        foreach ($langcodes as $langcode) {
          $data[] = ['id' => $key, 'name' => $name, 'langcode' => $langcode];
        }
      }
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
        $holiday_opening_hours = [];
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
          $opening_hours = $this->getOpeningHours($object->serviceHours, $langcode);
          $holiday_opening_hours = $this->getOpeningHours($object->serviceHours, $langcode, 'holiday');
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
          'holiday_opening_hours' => $holiday_opening_hours,
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

  /**
   * Get structured opening hours data.
   *
   * @param array $service_hours
   *   Service hours from PTV API.
   * @param string $langcode
   *   Current language id.
   * @param string $type
   *   Type of opening hours. Allowed values are 'regular' and 'holiday'.
   *   Defaults to 'regular'.
   *
   * @return array
   *   Structured opening hours as expected by a migration into a double field.
   */
  public function getOpeningHours(array $service_hours, string $langcode, string $type = 'regular') {
    $date_formatter = \Drupal::service('date.formatter');
    $opening_hours = [];
    $weekday_keys = [
      'Monday' => 0,
      'Tuesday' => 0,
      'Wednesday' => 0,
      'Thursday' => 0,
      'Friday' => 0,
      'Saturday' => 0,
      'Sunday' => 0,
    ];
    $weekdays = array_keys($weekday_keys);
    $i = 0;

    foreach ($service_hours as $service_hour) {
      // Check if service hour type matches requested type.
      $type_ok = FALSE;
      if ($type === 'regular' && $service_hour->serviceHourType === 'DaysOfTheWeek' && $service_hour->validForNow) {
        $type_ok = TRUE;
      }
      elseif ($type === 'holiday' && $service_hour->serviceHourType === 'Exceptional') {
        $type_ok = TRUE;
      }

      // Skip service hours that don't match requested type.
      if (!$type_ok) {
        continue;
      }

      // Check for a group title.
      foreach ($service_hour->additionalInformation as $key => $value) {
        if ($value->language == $langcode) {
          $opening_hours[$i]['first'] = $value->value;
          $i++;
        }
      }

      // Check for valid time range.
      if ($service_hour->validFrom) {
        $opening_hours[$i]['first'] = 'valid_from';
        $opening_hours[$i]['second'] = $date_formatter->format(strtotime($service_hour->validFrom), 'date');
        $i++;
      }
      if ($service_hour->validTo) {
        $opening_hours[$i]['first'] = 'valid_to';
        $opening_hours[$i]['second'] = $date_formatter->format(strtotime($service_hour->validTo), 'date');
        $i++;
      }

      // Check if always open.
      if ($service_hour->isAlwaysOpen) {
        $opening_hours[$i]['second'] = t('Always open', [], ['langcode' => $langcode]);
        $i++;
        continue;
      }

      // Check if closed.
      if ($service_hour->isClosed) {
        $opening_hours[$i]['second'] = t('Closed', [], ['langcode' => $langcode]);
        $i++;
        continue;
      }

      // Process opening hours. Collect all times for each weekday.
      // Weekdays might be separate data fields or set as a range for
      // a single opening hour data block, so we'll spread any ranges
      // into separate weekdays to have a uniform data set for later.
      $times_per_day = [];
      foreach ($service_hour->openingHour as $day) {
        $time = substr(str_replace(':', '.', $day->from), 0, -3) . ' - ' . substr(str_replace(':', '.', ltrim($day->to, 0)), 0, -3);
        $time = ltrim($time, '0');
        $times_per_day[$day->dayFrom][] = $time;

        if ($day->dayTo) {
          $from_found = FALSE;
          foreach ($weekdays as $weekday) {
            // Skip until dayFrom is reached.
            if ($weekday === $day->dayFrom) {
              $from_found = TRUE;
              continue;
            }

            if ($from_found) {
              $times_per_day[$weekday][] = $time;
            }
          }
        }
      }

      // Make sure times per day is always in proper weekday order.
      $times_per_day = array_merge($weekday_keys, $times_per_day);
      $times_per_day = array_filter($times_per_day);

      // Group weekdays with identical opening hours, for consecutive
      // weekdays only.
      $grouped_times = [];
      $last_weekday = NULL;
      $last_data_weekday = NULL;
      $last_time_array = [];
      $last_group_index = NULL;
      foreach ($weekdays as $weekday) {
        if (isset($times_per_day[$weekday])) {
          if ($last_weekday === $last_data_weekday && $last_time_array === $times_per_day[$weekday]) {
            $grouped_times[$last_group_index]['end'] = $weekday;
          }
          else {
            $grouped_times[] = [
              'start' => $weekday,
              'end' => NULL,
              'times' => $times_per_day[$weekday],
            ];
          }
          $last_data_weekday = $weekday;
          $last_time_array = $times_per_day[$weekday];
        }

        $last_weekday = $weekday;
        $last_group_index = array_key_last($grouped_times);
      }

      // Build results array.
      $time_last_separator = ' ' . t('and', [], ['langcode' => $langcode]) . ' ';
      foreach ($grouped_times as $grouped_time) {
        // Weekday array, that will be imploded into a string with
        // proper separator; first item is the start, second the end.
        $weekday = [
          $this->getTranslatedDay($grouped_time['start'], $langcode),
        ];
        if ($grouped_time['end']) {
          $weekday[] = $this->getTranslatedDay($grouped_time['end'], $langcode);
        }

        // Remove the last time from times array. The remaining times
        // array can be imploded into a string with comma, and then the
        // last item will be added separated by an 'and'.
        $last_time = array_pop($grouped_time['times']);
        $times = [];
        if ($grouped_time['times']) {
          $times[] = implode(', ', $grouped_time['times']);
        }
        $times[] = $last_time;
        $opening_hours[$i]['first'] = implode(' - ', $weekday);
        $opening_hours[$i]['second'] = implode($time_last_separator, $times);
        $i++;
      }
    }

    return $opening_hours;
  }

}
