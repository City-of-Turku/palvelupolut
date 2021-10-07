/**
 * @file
 * link.js
 *
 * Defines the behavior of the media bundle gallery.
 *
 */

(function ($, Drupal) {
  Drupal.behaviors.link = {
    attach() {
      $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
          $('.link--back-to-top').addClass('js-show');
        } else {
          $('.link--back-to-top').removeClass('js-show');
        }
      });

      $(document).ready(function () {
        const $mailLinks = $('a[href^="mailto:"]');
        const $telLinks = $('a[href^="tel:"]');
        // exclude mail-links and loop through the rest
        $('.text-long a')
          .once()
          .not($mailLinks)
          .not($telLinks)
          .each(function () {
            // skip if link contains host url since its an internal link
            if (String(this.href).indexOf(window.location.host) == -1) {
              // Check if it is an internal anchor without href
              const hashref = this.href;
              const descrText = Drupal.t('(opens in a new window, goes to a different website)');
              if (hashref && hashref != 'javascript:void(0);') {
                // add class for css and set target to blank to open external links in new window
                $(this)
                  .addClass('link--external--text')
                  .attr('target', '_blank')
                  .append('<i class="fas fa-external-link-alt" aria-hidden="true"></i>')
                  .append('<span class="visually-hidden">' + descrText + '</span>');
              }
            }
          });
      });
    },
  };
  Drupal.behaviors.externalLink = {
    attach: function (context) {
      $.expr[':'].external = function(obj) {
        return !obj.href.match(/^mailto\:/) && (obj.hostname != location.hostname);
      };
      $('a:external').addClass('external_link');
      $('a:external').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        window.open(this.href, '_blank');
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
