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
              if (hashref && hashref != 'javascript:void(0);') {
                // add class for css and set target to blank to open external links in new window
                $(this)
                  .addClass('link--external--text')
                  .attr('target', '_blank')
                  .append('<i class="fas fa-external-link-alt"></i>');
              }
            }
          });
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
