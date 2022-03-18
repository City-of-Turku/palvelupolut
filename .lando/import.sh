#!/bin/bash
set -exu

# Import the services data.
drush migrate:reset-status services;
drush migrate:import services --sync;

drush migrate:reset-status services_translations;
drush migrate:import services_translations --sync --update;

drush migrate:reset-status service_channels;
drush migrate:import service_channels --sync;
