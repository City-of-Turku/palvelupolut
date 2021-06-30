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

      // $form['organization'] = [
      //   '#type' => 'select',
      //   '#options' => $organizations,
      //   '#title' => $this->t('Organization'),
      //   '#default_value' => $config->get('organization'),
      // ];
      $form['organizations'] = [
        '#type' => 'checkboxes',
        '#options' => $organizations,
        '#title' => $this->t('Organizations'),
        '#default_value' => $config->get('organizations'),
        '#multiple' => TRUE,
      ];

      if ($config->get('organizations')) {
        $form['organizations_tabs'] = [
          '#type' => 'vertical_tabs',
          '#parents' => ['organizations_tabs'],
          '#title' => 'Selected Organizations',
        ];

        foreach (array_filter($config->get('organizations')) as $key => $organization) {
          $form['selected_organizations_' . $organization] = [
            '#type' => 'details',
            '#title' => $organizations[$organization],
            '#group' => 'organizations_tabs',
          ];

          $services = $ptv_service->getServicesByOrganization($organization);
          $form['selected_organizations_' . $organization]['services'] = [
            '#type' => 'details',
            '#title' => $this->t('Services') . ' (' . count($services) . ')',
          ];
          $form['selected_organizations_' . $organization]['services']['organization_services_' . $organization] = [
            '#type' => 'checkboxes',
            '#options' => $services,
            '#default_value' => array_keys($services),
            '#attributes' => ['disabled' => TRUE],
          ];

          $service_channels = $ptv_service->getServiceChannelsByOrganization($organization);
          $form['selected_organizations_' . $organization]['channels'] = [
            '#type' => 'details',
            '#title' => $this->t('Service Channels') . ' (' . count($service_channels) . ')',
          ];
          $form['selected_organizations_' . $organization]['channels']['organization_service_channels_' . $organization] = [
            '#type' => 'checkboxes',
            '#options' => $service_channels,
            '#default_value' => array_keys($service_channels),
            '#attributes' => ['disabled' => TRUE],
          ];

        }
      }

    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   *
   * @return void
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $settings = $this->config('ptv.settings');
    $ptv_service = \Drupal::service('ptv.api_service');

    if ($form_state->getValue('municipality') && $form_state->getValue('municipality') != '_none') {
      $settings->set('municipality', $form_state->getValue('municipality'));
      $settings->set('organizations', $form_state->getValue('organizations'));
      $services = [];
      $service_channels = [];
      foreach ($form_state->getValue('organizations') as $organization) {
        $services += $ptv_service->getServicesByOrganization($organization);
        $service_channels += $ptv_service->getServiceChannelsByOrganization($organization);
      }
      $settings->set('services', $services);
      $settings->set('service_channels', $service_channels);
    }
    else {
      $settings->set('municipality', '');
      $settings->set('organizations', '');
      $settings->set('services', '');
      $settings->set('service_channels', '');
    }
    $settings->save();

    parent::submitForm($form, $form_state);
  }

}
