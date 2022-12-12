// Simple Drupal.behaviors usage for Storybook.
import Twig from 'twig';
import { setupTwig } from './setupTwig';
import iconMarkupExternalLinkTemplate from "../components/01-atoms/images/fontawesome-icon/fontawesome-icon.twig";
const iconMarkupExternalLinkData = {
  fontawesome_icon__name: 'external-link-alt',
  fontawesome_icon__decorative: true,
  fontawesome_icon__modifiers: ['external-link']
};
window.Drupal = { behaviors: {} };
window.drupalSettings = {};

// We need full twig support here.
setupTwig(Twig);

(function (Drupal, drupalSettings) {
  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    const behaviors = Drupal.behaviors;

    Object.keys(behaviors).forEach(function (i) {
      if (typeof behaviors[i].attach === 'function') {
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  Drupal.t = function (text) {
    return text;
  };

  drupalSettings.servicePathsTheme = {
    // This should reflect the output from
    // @01-atoms/images/fontawesome-icon/fontawesome-icon.twig.
    iconMarkupExternalLink: iconMarkupExternalLinkTemplate(iconMarkupExternalLinkData)
  };

})(Drupal, window.drupalSettings);
