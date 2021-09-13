/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/**
 * @file
 * contact-card.js
 *
 * Defines the behavior of the media bundle gallery.
 *
 */

(function ($, Drupal) {
  Drupal.behaviors.contact_card = {
    attach: function (context) {
      $('.contact-card.collapsible', context)
        .once()
        .each(function (i) {
          const readMore = $(this).find('.contact-card__more-link');
          const cardText = $(this).find('.contact-card__link-list');
          readMore.on('click', function (e) {
            e.preventDefault();
            cardText.toggleClass('open');
            readMore.hide();
          });
        });
    },
  };
})(jQuery, Drupal, drupalSettings);
