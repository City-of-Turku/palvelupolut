# Service Paths

palvelupolut.fi is in archive mode and no longer maintained. The site is behind HTTP authentication, credentials can be found in the `silta/silta.yml` file.  HTTP authentication is disabled for Wunder Telia VPN users and selected Turku IP addresses.

## Production environment

- URL: <https://palvelupolut.fi>
- URL: <https://production.turku-service-paths-drupal.finland.wdr.io>
- SSH: `ssh www-admin@production-shell.client-fi-turku-service-paths -J www-admin@ssh.finland.wdr.io`
- Drush alias: `drush @prod st`.

### Storybook - Service Paths design system

- URL: <https://storybook.palvelupolut.fi>
- Silta setup: `web/themes/custom/service-paths-theme/silta`

## Staging environment

- URL: <https://master.turku-service-paths-drupal.dev.wdr.io>
- SSH: `ssh www-admin@master-shell.client-fi-turku-service-paths -J www-admin@ssh.dev.wdr.io`
- Drush alias: `drush @master st`

Drush alias for **current** Silta feature branch deployment is `drush @current st`.

## Local environment

- URL: <https://service-paths.lndo.site>
- Storybook: <https://storybook.lndo.site>
- SSH: `lando ssh (-s <service>)`
- Logs: `lando logs -s <service>`

### Setup

1. Read the [Lando docs](https://docs.lando.dev/) and install the **latest** [Lando](https://github.com/lando/lando/releases).
2. Check out the repo: `git clone git@github.com:wunderio/client-fi-turku-service-paths.git service-paths && cd service-paths`.
3. Start the site by running `lando start`.
4. Import data:
   1. `lando syncdb` - (**connect to VPN first!**) synchronise local DB with sanitised `production` environment or
   2. `lando db-import db.sql.gz`.
5. Update database & enable development components: `lando drush deploy`.

### Services

- Mailhog for mail management: <http://mail-service-paths.lndo.site>

### [Tools](https://docs.lando.dev/core/v3/tooling.html)

- `lando` - tools / commands overview.
- `lando grumphp <commands>` - run [GrumPHP](https://github.com/phpro/grumphp) code quality checks. Modified or new files are checked on git commit, see more at `lando grumphp -h` or [wunderio/code-quality](https://github.com/wunderio/code-quality).
- `lando import` - import the services data via `drush migrate` tasks.
- `lando npm <commands>` - run [npm](https://www.npmjs.com/) commands.
- `lando psalm <commands>` - run [Psalm](https://psalm.dev/) commands.
- `lando syncdb` - synchronise local database with production environment.
- `lando xdebug <mode>` - load [Xdebug](https://xdebug.org/) in the selected [mode(s)](https://xdebug.org/docs/all_settings#mode).

### Drupal development hints

- [Updating Drupal core](https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer).
- [Altering scaffold files](https://www.drupal.org/docs/develop/using-composer/using-drupals-composer-scaffold#toc_4) (`robots.txt`, `.htaccess` etc.).

