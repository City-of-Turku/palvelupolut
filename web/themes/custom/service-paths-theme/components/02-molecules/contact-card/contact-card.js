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
      $(document).ready(function () {
        $('.leaflet-control-container', context)
          .once()
          .each(function (i) {
            const zoomIn = $(this).find('.leaflet-control-zoom-in');
            const zoomOut = $(this).find('.leaflet-control-zoom-out');
            const zoomInText = Drupal.t('Zoom in');
            const zoomOutText = Drupal.t('Zoom out');
            zoomIn.attr('title', zoomInText);
            zoomOut.attr('title', zoomOutText);
          });
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
