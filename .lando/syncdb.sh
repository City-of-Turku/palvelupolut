#!/bin/bash
set -exu

# Synchronize local database with production environment & sanitise database.
drush sql-sync @prod @local -y
drush sqlsan -y
drush cc drush
