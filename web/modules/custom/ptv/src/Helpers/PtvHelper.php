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
   */
  public function prepareMigrateIterator($config, $key, $langcodes) {

    $config = \Drupal::config($config);
    $config_data = $config->get($key);

    $data = [];
    foreach ($config_data as $key => $name) {
      // Service Channel Kastun päiväkoti (Pyörämäentie 4)
      // if ($key == '552b8911-9117-472c-81eb-bf0fcd9b14e3') {
      // if ($key == 'e268fd9e-89b6-447c-b5e4-2b82c3a1137c') { // Service Varhaiskasvatuksen vuorohoito.
      foreach ($langcodes as $langcode) {
        $data[] = ['id' => $key, 'name' => $name, 'langcode' => $langcode];
      }
      // }
    }

    return $data;

  }

  /**
   * Returns an array.
   *
   * @return array|mixed|string[][]
   */
  public function prepareMigrateData($key, $langcode, $id) {

    $ptv_service = \Drupal::service('ptv.api_service');
    $data = [];
    $translations = [];
    switch ($key) {
      case 'services':
        $object = $ptv_service->getService($id);
        $ontology_terms = [];
        $target_groups = [];
        $service_classes = [];
        foreach ($object->serviceNames as $value) {
          if ($value->language == 'fi') {
            $name = $value->value;
          }
          if ($value->language == $langcode) {
            $name = $value->value;
            break;
          }
        }
        foreach ($object->serviceDescriptions as $value) {
          if ($value->language == $langcode) {
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
        if (isset($object->ontologyTerms)) {
          foreach ($object->ontologyTerms as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $ontology_terms[] = $value->value;
              }
            }
          }
        }
        if (isset($object->targetGroups)) {
          foreach ($object->targetGroups as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $target_groups[] = $value->value;
              }
            }
          }
        }
        if (isset($object->requirements)) {
          foreach ($object->requirements as $requirement) {
            if ($requirement->language == $langcode) {
              $requirements = $requirement->value;
            }
          }
        }
        if (isset($object->serviceClasses)) {
          foreach ($object->serviceClasses as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $service_classes[] = $value->value;
              }
            }
          }
        }

        $data = [
          'id' => $id,
          'name' => $name,
          'langcode' => $langcode,
          'summary' => isset($summary) ? $summary : '',
          'description' => isset($description) ? $description : '',
          'user_instruction' => isset($user_instruction) ? $user_instruction : '',
          'charge_info' => isset($charge_info) ? $charge_info : '',
          'ontology_terms' => $ontology_terms,
          'target_groups' => $target_groups,
          'requirements' => isset($requirements) ? $requirements : '',
          'service_classes' => $service_classes,
        ];

        break;

      case 'service_channels':

        $object = $ptv_service->getServiceChannel($id);
        foreach ($object->serviceChannelNames as $value) {
          $name = $value->value;
          if ($value->language == 'fi') {
            $name = $value->value;
          }
          if ($value->language == $langcode) {
            $name = $value->value;
            break;
          }
        }
        $services = [];
        foreach ($object->services as $value) {
          $services[] = $value->service->id;
        }
        $address = [];
        $langs = [];
        $phone_numbers = [];
        $ontology_terms = [];
        $opening_hours = [];
        $accessibility = '';

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
        if (isset($object->emails)) {
          foreach ($object->emails as $value) {
            if ($value->language == $langcode) {
              $email = $value->value;
            }
          }
        }
        if (isset($object->phoneNumbers)) {
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
        if (isset($object->webPages)) {
          foreach ($object->webPages as $value) {
            if ($value->language == $langcode) {
              $webpage['uri'] = $value->url;
              $webpage['title'] = $value->value;
            }
          }
        }
        if (isset($object->languages)) {
          $langs = $object->languages;
        }

        if (isset($object->addresses)) {
          foreach ($object->addresses as $value) {
            foreach ($value->streetAddress->street as $street) {
              if ($street->language == $langcode) {
                $address['address_line1'] = $street->value . ' ' . $value->streetAddress->streetNumber;
              }
            }
            $post_code = $value->streetAddress->postalCode;
            foreach ($value->streetAddress->postOffice as $postOffice) {
              if ($postOffice->language == $langcode) {
                $address['locality'] = $postOffice->value;
                $address['postal_code'] = $post_code;
                $address['country_code'] = 'FI';
              }
            }

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
              foreach ($sentences as $key => $value) {
                $accessibility .= '<h4>' . $value['group'] . '</h4>';
                foreach ($value['sentences'] as $sentence) {
                  $accessibility .= '<p>' . $sentence . '</p>';
                }
              }
            }
          }
        }
        if (isset($object->ontologyTerms)) {
          foreach ($object->ontologyTerms as $term) {
            foreach ($term->name as $value) {
              if ($value->language == $langcode) {
                $ontology_terms[] = $value->value;
              }
            }
          }
        }
        if (isset($object->serviceHours)) {
          $i = 0;
          foreach ($object->serviceHours as $serviceHours) {
            if ($serviceHours->validForNow) {
              foreach ($serviceHours->additionalInformation as $key => $value) {
                if ($value->language == $langcode) {
                  $opening_hours[$i]['first'] = $value->value;
                  $i++;
                }
              }
              if ($serviceHours->isAlwaysOpen) {
                $opening_hours[$i]['first'] = 'Week';
                $opening_hours[$i]['second'] = 'Always Open';
                continue;
              }
              $save_time = NULL;
              $h = 0;
              $times = [];
              foreach ($serviceHours->openingHour as $day) {
                $time = substr($day->from, 0, -3) . ' - ' . substr($day->to, 0, -3);
                $weekday = $day->dayFrom;
                $weekday .= !empty($day->dayTo) ? ' - ' . $day->dayTo : '';
                $times[$h][$time][] = $weekday;
                if ($save_time && $save_time != $time) {
                  $h++;
                }
                $save_time = $time;
              }
              foreach ($times as $key => $days) {
                $final_time = array_key_first($days);
                $days_array = current($days);
                $final_days = $days_array[0] . ' - ' . array_pop($days_array);
                $opening_hours[$i]['first'] = $final_days;
                $opening_hours[$i]['second'] = $final_time;
                $i++;
              }

            }
          }
        }

        $data = [
          'id' => $id,
          'name' => isset($name) ? $name : $id,
          'langcode' => $langcode,
          'services' => $services,
          'summary' => isset($summary) ? $summary : '',
          'description' => isset($description) ? $description : '',
          'email' => isset($email) ? $email : '',
          'phone_numbers' => $phone_numbers,
          'webpage' => isset($webpage) ? $webpage : '',
          'address' => isset($address) ? $address : '',
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

}
