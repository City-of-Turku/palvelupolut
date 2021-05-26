<?php

namespace Drupal\ptv\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a settings form for administering PTV variables.
 */
class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ptv_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function getEditableConfigNames() {
    return ['ptv.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $ptv_service = \Drupal::service('ptv.api_service');
    $config = $this->config('ptv.settings');

    $municipalities = $ptv_service->getMunicipalitiesCodes();
    $form['municipality'] = [
      '#type' => 'select',
      '#options' => ['_none' => '-Select-'] + $municipalities,
      '#title' => $this->t('Municipalitiy'),
      '#default_value' => $config->get('municipality'),
      '#chosen' => FALSE,
    ];

    if ($config->get('municipality')) {
      $organizations = $ptv_service->getOrganizationsByAreaCode('Municipality', $config->get('municipality'));
      $form['organization'] = [
        '#type' => 'select',
        '#options' => $organizations,
        '#title' => $this->t('Organization'),
        '#default_value' => $config->get('organization'),
      ];

      if ($config->get('organization')) {

        $services = $ptv_service->getServicesByOrganization($config->get('organization'));
        // $services = $ptv_service->getServicesByAreaCode('Municipality', $config->get('municipality'));
        $form['services'] = [
          '#type' => 'select',
          '#options' => $services,
          '#title' => $this->t('Services'),
          '#default_value' => $config->get('services'),
          '#chosen' => TRUE,
          '#multiple' => TRUE,
        ];

        if ($config->get('services')) {
          $form['tabs'] = [
            '#type' => 'vertical_tabs',
            '#parents' => ['tabs'],
            '#title' => 'Selected Services',
          ];
          foreach ($config->get('services') as $service) {
            $service_channels = [];
            $form['selected_services_' . $service] = [
              '#type' => 'details',
              '#title' => $services[$service],
              '#group' => 'tabs',
            ];
            $service_data = $ptv_service->getService($service);
            foreach ($service_data->serviceChannels as $channel) {
              $service_channels[$channel->serviceChannel->id] = $channel->serviceChannel->name;
            }
            $form['selected_services_' . $service]['service_channels_' . $service] = [
              '#type' => 'checkboxes',
              '#options' => $service_channels,
              '#title' => $this->t('Service channels'),
              '#default_value' => $config->get('service_channels_' . $service),
            ];
            // $service_channels = $ptv_service->getServiceChannelsByAreaCode('Municipality', $config->get('municipality'));
            // ksm($service_channels);
            // $form['selected_services']['service_' . $service] = [
            //   '#markup' => dump($ptv_service->getService($service)),
            // ];
            // ksm($ptv_service->getService($service));
          }

        }

      }

    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $settings = $this->config('ptv.settings');

    if ($form_state->getValue('municipality') && $form_state->getValue('municipality') != '_none') {
      $settings->set('municipality', $form_state->getValue('municipality'));
      $settings->set('organization', $form_state->getValue('organization'));
      $settings->set('services', $form_state->getValue('services'));
      foreach ($form_state->getValue('services') as $service) {
        $settings->set('service_channels_' . $service, $form_state->getValue('service_channels_' . $service));
        foreach ($form_state->getValue('service_channels_' . $service) as $key => $value) {
          if ($value) {
            $service_channels[] = $value;
          }
        }

      }
      $settings->set('service_channels', $service_channels);
    }
    else {
      $settings->set('municipality', '');
      $settings->set('organization', '');
      $settings->set('services', '');
      $settings->set('service_channels', '');
    }
    $settings->save();

    parent::submitForm($form, $form_state);
  }

}
