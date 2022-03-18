#!/bin/bash
set -exu

# Disable Warden module.
drush @local pmu dblog warden -y

# Enable development modules.
drush @local en dblog devel update stage_file_proxy -y

# Update the local database.
drush @local updb -y

# Clear caches.
drush @local cc drush
drush @local cr -y

# Generate login URL.
drush @local uli
