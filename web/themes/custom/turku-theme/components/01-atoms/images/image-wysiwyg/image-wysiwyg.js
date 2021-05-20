Drupal.behaviors.wunderImageWysiwyg = {
  attach: (context) => {
    const figureSelector = 'figure';
    const figures = context.querySelectorAll(figureSelector);
    figures.forEach((figure) => {
      // Merge nested images with it's wrapper element.
      const nestedImage = figure.querySelector('.image-wysiwyg');

      if (nestedImage) {
        // Move the children.
        while (nestedImage.hasChildNodes()) {
          figure.prepend(nestedImage.firstChild);
        }
        // Append the nested images classes to the parent.
        nestedImage.classList.forEach((className) =>
          figure.classList.add(className),
        );
        // Finally, remove the empty wrapper.
        figure.removeChild(nestedImage);
      }
    });
  },
};
