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
    },
  };
})(jQuery, Drupal, drupalSettings);
