<?php

namespace Drupal\ptv;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

/**
 * PTV client to handle requests to API.
 */
class PtvClient {

  /**
   * The GuzzleHttp client.
   *
   * @var \GuzzleHttp\Client
   */
  private $guzzle;

  /**
   * CkanClient constructor.
   *
   * @param array $config
   *   Guzzle HTTP configuration options.
   */
  public function __construct(array $config = []) {
    $this->guzzle = new Client($config);
  }

  /**
   * Request handler.
   */
  public function handleRequest(string $method, string $uri = '', array $options = [], ?array $parameters = [], bool $returnAssoc = FALSE) {
    if (!empty($parameters)) {
      if ($method == 'GET') {
        // Send parameters as query string parameters.
        $options['query'] = $parameters;
      }
      else {
        // Send parameters as JSON in request body.
        $options['json'] = (object) $parameters;
      }
    }

    try {
      $response = $this->guzzle->request($method, $uri, $options);
      $data = json_decode($response->getBody(), $returnAssoc);

      return $data;
    }
    catch (RequestException $e) {
      watchdog_exception('ptv', $e);
    }
  }

}
