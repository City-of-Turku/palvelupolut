#!/bin/bash
set -exu

# Create the translations directory if it doesn't exist.
mkdir -p /app/web/sites/default/files/translations

# Update the local database.
drush @local updatedb --no-cache-clear -y
drush @local cache:rebuild -y

# Import configuration.
# drush @local cim -y
# drush @local cache:rebuild -y

# Enable development modules.
drush @local pm:enable stage_file_proxy -y
drush @local cache:rebuild -y

# Generate login URL.
drush @local user:login
