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
          const moreText = readMore.find('a').html();
          const lessText = Drupal.t('Read less');
          readMore.on('click', function (e) {
            e.preventDefault();
            cardText.toggleClass('open');
            if (cardText.hasClass('open')) {
              readMore.find('a').html(lessText);
            } else {
              readMore.find('a').html(moreText);
            }
          });
        });
    },
  };
})(jQuery, Drupal, drupalSettings);
