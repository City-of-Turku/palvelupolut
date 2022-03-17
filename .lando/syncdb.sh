#!/bin/bash
set -exu

# Synchronize local database with production environment & sanitise database.
drush sql-sync @prod @local -y
drush @local sqlsan -y
drush @local cc drush
