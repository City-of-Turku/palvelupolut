Drupal.behaviors.wunderHeaderBranding = {
  attach: (context) => {
    const header = context.querySelector('.header__main');
    const expandContent = context.querySelector('.js-expand-content');
    const expandButtonOpen = context.querySelector('.js-expand-button-open');
    const expandButtonClose = context.querySelector('.js-expand-button-close');

    const verticalOffset = 50;
    let scroll = 0;

    if (!header) {
      return;
    }

    const setHeaderScrollState = () => {
      scroll = window.scrollY;

      if (scroll > verticalOffset) {
        header.classList.add('header__main--compact');
      } else {
        header.classList.remove('header__main--compact');
      }
    };

    /**
     * Create a copy of the header to act as a placeholder that prevents
     * content from shifting upwards caused by the header's fixed position.
     */
    const cloneHeader = () => {
      const placeholder = header.cloneNode(true);
      placeholder.classList.add('header__main--placeholder');
      // Make the placeholder invisible. This should prevent screen reader access.
      placeholder.style.visibility = 'hidden';
      placeholder.style.position = 'relative';
      // Explicitly prevent screen reader or keyboard access for safe measure.
      placeholder.setAttribute('aria-hidden', true);
      placeholder.setAttribute('tabindex', '-1');
      // Remove duplicate ID attributes
      const childrenWithIDs = placeholder.querySelectorAll('[id]');
      childrenWithIDs.forEach((child) => child.removeAttribute('id'));
      // Insert the header placeholder right after the current header.
      header.insertAdjacentElement('afterend', placeholder);
    };
    cloneHeader();

    /**
     * Helper for expanding the content area
     *
     */
    const expand = () => {
      expandContent.classList.add('is-expanded');
    };

    /**
     * Helper for shrinking the content area
     *
     */
    const shrink = () => {
      expandContent.classList.remove('is-expanded');
    };

    expandButtonOpen?.addEventListener('click', (event) => {
      event.preventDefault();
      expand();
    });

    expandButtonClose?.addEventListener('click', (event) => {
      event.preventDefault();
      shrink();
    });

    // Monitor active element and close the expanded content if the area
    // loses its focus
    document.addEventListener(
      'focus',
      () => {
        if (expandContent?.contains(document.activeElement) === false) shrink();
      },
      true,
    );

    window.addEventListener('scroll', setHeaderScrollState);
  },
};
