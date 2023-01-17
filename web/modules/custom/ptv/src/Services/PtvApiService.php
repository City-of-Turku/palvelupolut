<?php

namespace Drupal\ptv\Services;

use Drupal\ptv\PtvClient;
use Drupal\Core\Language\LanguageManagerInterface;

/**
 * Service for getting PTV data.
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
   * Language Manager.
   *
   * @var \Drupal\Core\Language\LanguageManagerInterface
   */
  protected $languageManager;

  /**
   * PTV Service constructor.
   *
   * @param \Drupal\Core\Language\LanguageManagerInterface $language_manager
   *   Language Manager.
   */
  public function __construct(LanguageManagerInterface $language_manager) {
    $this->languageManager = $language_manager;
    $this->setPtvClient();
    $this->endpoint = 'https://api.palvelutietovaranto.suomi.fi/api/v11/';
  }

  /**
   * Set the PTV client.
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
  public function request($method, $path, array $parameters = [], $returnAssoc = FALSE) {
    return $this->client->handleRequest($method, $this->endpoint . $path, $options = [], $parameters, $returnAssoc);
  }

  /**
   * Returns list of all municipalities.
   *
   * @return array
   *   Returns Municipality codes.
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
   */
  public function getServicesByAreaCode($area_type, $code) {
    $response = $this->request('GET', 'Service/area/' . $area_type . '/code/' . $code);

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
   * Returns Services of Organization.
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
   */
  public function getServiceChannelsByOrganization($organization) {
    $response = $this->request('GET', 'ServiceChannel/organization/' . $organization);
    $multiple_pages = FALSE;
    if ($response && isset($response->pageCount) && $response->pageCount > 1) {
      $multiple_pages = TRUE;
      $page_count = $response->pageCount;
    }

    $results = [];
    if ($multiple_pages) {
      $active_page = 1;
      while ($active_page <= $page_count) {
        $response = $this->request('GET', 'ServiceChannel/organization/' . $organization . '?page=' . $active_page);
        if ($response && !empty($response->itemList)) {
          foreach ($response->itemList as $item) {
            $results[$item->id] = $item->name;
          }
        }
        $active_page++;
      }
    }
    else {
      if ($response && !empty($response->itemList)) {
        foreach ($response->itemList as $item) {
          $results[$item->id] = $item->name;
        }
      }
    }
    asort($results);
    return $results;
  }

  /**
   * Returns Organizations filtered by area.
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
   */
  public function getServiceChannel($id) {
    $response = $this->request('GET', 'ServiceChannel/' . $id);
    if ($response) {
      return $response;
    }
    return NULL;
  }

  /**
   * Get a General Description object.
   *
   * @param string $id
   *   General description id.
   *
   * @return array|null
   *   Returns General Description data or NULL.
   */
  public function getGeneralDescription($id) {
    $response = $this->request('GET', 'GeneralDescription/' . $id);
    if ($response) {
      return $response;
    }
    return NULL;
  }

}
