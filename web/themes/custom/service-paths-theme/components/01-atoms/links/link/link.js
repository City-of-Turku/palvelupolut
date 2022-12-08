/**
 * @file
 * link.js
 *
 * Defines the behavior of the media bundle gallery.
 *
 */
(($, Drupal, settings) => {
  Drupal.behaviors.link = {
    attach() {
      $(window).scroll(() => {
        if ($(window).scrollTop() > 500) {
          $('.link--back-to-top').addClass('js-show');
        } else {
          $('.link--back-to-top').removeClass('js-show');
        }
      });

      const $mailLinks = $('a[href^="mailto:"]');
      const $telLinks = $('a[href^="tel:"]');
      // exclude mail-links and loop through the rest
      $('a')
        .once()
        .not($mailLinks)
        .not($telLinks)
        // eslint-disable-next-line func-names
        .each(function () {
          // Skip if link contains host url since it's an internal link.
          if (String(this.href).indexOf(window.location.host) === -1) {
            // Check if it is an internal anchor without href
            const hashref = this.href;
            // eslint-disable-next-line no-script-url
            if (hashref && hashref !== 'javascript:void(0);') {
              // Add class for css and set target to blank to open external
              // links in new window.
              $(this)
                .addClass('link link--external--text')
                .attr('target', '_blank');

              if (settings.servicePathsTheme !== undefined) {
                const $extIconContainer = $(`<span class="foo-bar"></span>`);
                $extIconContainer.append(
                  settings.servicePathsTheme.iconMarkupExternalLink,
                );
                $(this).append($extIconContainer);
              }
            }
          }
        });

      $('a[href^="mailto:"]')
        .once()
        .append(
          `<span class="visually-hidden">${Drupal.t('Email address')}</span>`,
        );
      $('a[href^="tel:"]')
        .once()
        .append(`<span class="visually-hidden">${Drupal.t('Phone')}</span>`);
    },
  };
})(jQuery, Drupal, drupalSettings);
