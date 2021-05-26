<?php

namespace Drupal\ptv;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

/**
 * Class PtvClient.
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
  public function __construct($config = []) {
    $this->guzzle = new Client($config);
  }

  /**
   * @inheritdoc
   */
  public function handleRequest($method, $uri = '', $options = [], $parameters = [], $returnAssoc = FALSE) {
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
