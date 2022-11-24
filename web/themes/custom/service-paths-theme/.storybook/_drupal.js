// Simple Drupal.behaviors usage for Storybook

window.Drupal = { behaviors: {} };
window.drupalSettings = {};

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
  }

  drupalSettings.servicePathsTheme = {
    // This should reflect the output from
    // @01-atoms/images/fontawesome-icon/fontawesome-icon.twig.
    iconMarkupExternalLink: `
      <svg class="fontawesome-icon fontawesome-icon--external-link" aria-hidden="true">
        <title>Opens in new window</title>
        <use xlink:href="sprites/fontawesome.svg#external-link-alt"></use>
      </svg>
      <span class="visually-hidden">
        (opens in a new window, goes to a different website)
      </span>
    `,
  };

})(Drupal, window.drupalSettings);
