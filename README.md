# Service Paths

## Production environment

- URL: <https://palvelupolut.fi>
- URL: <https://production.turku-service-paths-drupal.finland.wdr.io>
- SSH: `ssh www-admin@production-shell.client-fi-turku-service-paths -J www-admin@ssh.finland.wdr.io`
- Drush alias: `drush @prod st`

## Staging environment

- URL: <https://master.turku-service-paths-drupal.dev.wdr.io>
- SSH: `ssh www-admin@master-shell.client-fi-turku-service-paths -J www-admin@ssh.dev.wdr.io`
- Drush alias: `drush @master st`

Drush alias for **current** Silta feature branch deployment is `drush @current st`.

## Local environment

- URL: <https://service-paths.lndo.site>
- SSH: `lando ssh (-s <service>)`
- Logs: `lando logs -s <service>`
- Drush alias: `drush @local st`

### [Setup](https://docs.lando.dev/basics/installation.html)

1. Install the latest [Lando](https://github.com/lando/lando/releases) and read the [documentation](https://docs.lando.dev/).
2. Update your project name and other Lando [Drupal 9 recipe](https://docs.lando.dev/config/drupal9.html)'s parameters at `.lando.yml`.
3. Run `lando start`.
4. Run `lando db-import db.sql.gz`.

### Services

- Mailhog for mail management: <http://mail.service-paths.lndo.site/>

### [Tools](https://docs.lando.dev/config/tooling.html)

- `lando` - tools / commands overview.
- `lando grumphp <commands>` - run [GrumPHP](https://github.com/phpro/grumphp) code quality checks. Modified or new files are checked on git commit, see more at `lando grumphp -h` or [wunderio/code-quality](https://github.com/wunderio/code-quality).
- `lando npm <commands>` - run [npm](https://www.npmjs.com/) commands.
- `lando psalm <commands>` - run [Psalm](https://psalm.dev/) commands.
- `lando syncdb` - synchronise local database with production environment.
- `lando update` - update database & enable develpoment components.
- `lando xdebug <mode>` - load [Xdebug](https://xdebug.org/) in the selected [mode(s)](https://xdebug.org/docs/all_settings#mode).

### Drupal development hints

- [Updating Drupal core](https://www.drupal.org/docs/8/update/update-core-via-composer).
- [Altering scaffold files](https://www.drupal.org/docs/develop/using-composer/using-drupals-composer-scaffold#toc_4) (`robots.txt`, `.htaccess` etc.).
