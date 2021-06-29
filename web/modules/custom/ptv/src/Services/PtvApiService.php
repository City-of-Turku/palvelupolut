<?php

namespace Drupal\ptv\Services;

use Drupal\ptv\PtvClient;
use Drupal\Core\Language\LanguageManagerInterface;

/**
 * Class PtvApiService.
 */
class PtvApiService {

  /**
   * The HTTP client.
   *
   * @var \Drupal\ptv\PtvClient
   */
  protected $client;

  /**
   * PTV Open API endpoint.
   *
   * @var string
   */
  protected $endpoint = NULL;

  /**
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * PTV Service constructor.
   *
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   */
  public function __construct(LanguageManagerInterface $language_manager) {
    $this->languageManager = $language_manager;
    $this->setPtvClient();
    $this->endpoint = 'https://api.palvelutietovaranto.suomi.fi/api/v11/';
  }

  /**
   * Set the PTV client.
   *
   * @return void
   */
  public function setPtvClient(): void {

    $http_options = [
      'baseUrl' => $this->endpoint,
      'headers' => [],
    ];
    $this->client = new PtvClient($http_options);
  }

  /**
   * Makes a request to the PTV API.
   *
   * @param string $method
   *   The REST method to use when making the request.
   * @param string $path
   *   The API path to request.
   * @param array $parameters
   *   Associative array of parameters to send in the request body.
   * @param bool $returnAssoc
   *   TRUE to return Mailchimp API response as an associative array.
   *
   * @return mixed
   *   Object or Array if $returnAssoc is TRUE.
   */
  public function request($method, $path, $parameters = NULL, $returnAssoc = FALSE) {
    return $this->client->handleRequest($method, $this->endpoint . $path, $options = [], $parameters, $returnAssoc);
  }

  /**
   * Returns list of all municipalities.
   *
   * @return array
   */
  public function getMunicipalitiesCodes() {
    $response = $this->request('GET', 'CodeList/GetMunicipalityCodes');

    $langcode = $this->languageManager->getCurrentLanguage()->getId();

    $results = [];
    if ($response && !empty($response)) {
      foreach ($response as $item) {
        foreach ($item->names as $value) {
          $names[$value->language] = $value->value;
        }
        $name = $names[$langcode];
        $results[$item->code] = $name;
      }
    }
    return $results;
  }

  /**
   * Returns Services filtered by area.
   *
   * @return array
   */
  public function getServicesByAreaCode($area_type, $code) {
    $response = $this->request('GET', 'Service/area/' . $area_type . '/code/' . $code);

    $results = [];
    if ($response && !empty($response->itemList)) {
      foreach ($response->itemList as $item) {
        // foreach ($item->serviceNames as $value) {
        //   if ($value->type == 'Name') {
        //     $name = $value->value;
        //   }
        // }
        $results[$item->id] = $item->name;
      }
    }
    asort($results);
    return $results;
  }

  /**
   * Returns Services of Organization.
   *
   * @return array
   */
  public function getServicesByOrganization($id) {
    $response = $this->request('GET', 'Organization/' . $id);

    $results = [];
    if ($response && !empty($response->services)) {
      foreach ($response->services as $item) {
        $results[$item->service->id] = $item->service->name;
      }
    }
    asort($results);
    return $results;
  }

  /**
   * Returns Service Channels filtered by area.
   *
   * @return array
   */
  public function getServiceChannelsByOrganization($organization) {
    $response = $this->request('GET', 'ServiceChannel/organization/' . $organization);

    $results = [];
    if ($response && !empty($response->itemList)) {
      foreach ($response->itemList as $item) {
        $results[$item->id] = $item->name;
      }
    }
    asort($results);
    return $results;
  }

  /**
   * Returns Organizations filtered by area.
   *
   * @return array
   */
  public function getOrganizationsByAreaCode($area_type, $code) {
    $response = $this->request('GET', 'Organization/area/' . $area_type . '/code/' . $code);

    $results = [];
    if ($response && !empty($response->itemList)) {
      foreach ($response->itemList as $item) {
        $results[$item->id] = $item->name;
      }
    }
    asort($results);
    return $results;
  }

  /**
   * Returns Service object.
   *
   * @return object
   */
  public function getService($id) {
    $response = $this->request('GET', 'Service/' . $id);
    if ($response) {
      return $response;
    }
    return NULL;
  }

  /**
   * Returns Service Channel object.
   *
   * @return object
   */
  public function getServiceChannel($id) {
    $response = $this->request('GET', 'ServiceChannel/' . $id);
    if ($response) {
      return $response;
    }
    return NULL;
  }

}
