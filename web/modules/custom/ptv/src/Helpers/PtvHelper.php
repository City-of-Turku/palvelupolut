<?php

namespace Drupal\ptv\Helpers;

/**
 * Helper class for PTV related data.
 */
class PtvHelper {

  /**
   * Returns an array.
   *
   * @return array|mixed|string[][]
   */
  public function prepareMigrateIterator($config, $key, $langcodes) {

    $config = \Drupal::config($config);
    $config_data = $config->get($key);

    $data = [];
    foreach ($config_data as $key => $name) {
      foreach ($langcodes as $langcode) {
        $data[] = ['id' => $key, 'name' => $name, 'langcode' => $langcode];
      }

    }

    return $data;

  }

  /**
   * Returns an array.
   *
   * @return array|mixed|string[][]
   */
  public function prepareMigrateData($key, $langcodes, $id) {

    $ptv_service = \Drupal::service('ptv.api_service');
    // $config_data = $config->get($key);

    $data = [];
    switch ($key) {
      case 'services':
          $object = $ptv_service->getService($id);
          $summaries = [];
          $descriptions = [];
          foreach ($object->serviceDescriptions as $value) {
            if (in_array($value->language, $langcodes)) {
              switch ($value->type) {
                case 'Summary':
                  $summaries[$value->language] = $value->value;
                  break;

                case 'Description':
                  $descriptions[$value->language] = $value->value;
                  break;
              }
            }
          }
          foreach ($object->serviceNames as $value) {
            if (in_array($value->language, $langcodes)) {
              $name = $value->value;
              $data = [
                'id' => $id,
                'name' => $name,
                'langcode' => $value->language,
                'summary' => $summaries[$value->language],
                'description' => $descriptions[$value->language],
              ];
            }
          }

        // ksm($data);
        break;

      case 'service_channels':

          $object = $ptv_service->getServiceChannel($id);
          // ksm($object);
          $services = [];
          foreach ($object->services as $value) {
            $services[] = $value->service->id;
          }
          $summaries = [];
          $descriptions = [];
          $emails = [];
          $phones = [];
          $webpages = [];
          $address = [];
          $location = [];
          $languages = [];

          foreach ($object->serviceChannelDescriptions as $value) {
            switch ($value->type) {
              case 'Summary':
                $summaries[$value->language] = $value->value;
                break;

              case 'Description':
                $descriptions[$value->language] = $value->value;
                break;
            }
          }
          if (isset($object->emails)) {
            foreach ($object->emails as $value) {
              $emails[$value->language] = $value->value;
            }
          }
          if (isset($object->phoneNumbers)) {
            foreach ($object->phoneNumbers as $value) {
              $phones[$value->language] = $value->prefixNumber . ' ' . $value->number;
            }
          }
          if (isset($object->webPages)) {
            foreach ($object->webPages as $value) {
              $webpages[$value->language]['uri'] = $value->url;
              $webpages[$value->language]['title'] = $value->value;
            }
          }
          if (isset($object->languages)) {
            $languages = $object->languages;
          }

          if (isset($object->addresses)) {
            foreach ($object->addresses as $value) {
              foreach ($value->streetAddress->street as $street) {
                $address[$street->language]['address_line1'] = $street->value . ' ' . $value->streetAddress->streetNumber;
              }
              $post_code = $value->streetAddress->postalCode;
              foreach ($value->streetAddress->postOffice as $postOffice) {
                $address[$postOffice->language]['locality'] = $postOffice->value;
                $address[$postOffice->language]['postal_code'] = $post_code;
                $address[$postOffice->language]['country_code'] = 'FI';
              }
              foreach ($value->entrances->accessibilitySentences as $accessibility) {

              }
            }
          }
          foreach ($object->serviceChannelNames as $value) {
            if (in_array($value->language, $langcodes)) {
              $name = $value->value;
              $data = [
                'id' => $key,
                'name' => $name,
                'langcode' => $value->language,
                'services' => $services,
                'summary' => $summaries[$value->language],
                'description' => $descriptions[$value->language],
                'email' => !empty($emails) ? $emails[$value->language] : '',
                'phone' => !empty($phones) ? $phones[$value->language] : '',
                'webpage' => !empty($webpages) ? $webpages[$value->language] : '',
                'address' => !empty($address) ? $address[$value->language] : '',
                'langauges' => $languages,
              ];
            }
          }

        break;

    }

    return $data;

  }

}
