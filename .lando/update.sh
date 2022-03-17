#!/bin/bash
set -exu

# Enable development modules.
drush @local en devel update stage_file_proxy -y

# Disable Warden module.
drush @local pmu warden -y

# Update the local database.
drush @local updb -y

# Clear caches.
drush @local cc drush
drush @local cr -y

# Generate login URL.
drush @local uli
