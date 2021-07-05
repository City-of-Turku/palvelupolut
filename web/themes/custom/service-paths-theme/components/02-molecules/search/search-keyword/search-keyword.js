Drupal.behaviors.servicePathsSearchKeyword = {
  attach(context) {
    // Find elements
    const openButton = context.querySelector('.js-search-keyword-open');
    const closeButton = context.querySelector('.js-search-keyword-close');
    const content = context.querySelector('.js-search-keyword-content');
    const textInput = content?.querySelector('input[type="text"]');
    const searchButton = context.querySelector('.js-search-keyword-search');

    /**
     * Helper for opening the search keyword element
     *
     */
    const open = () => {
      openButton?.setAttribute('aria-expanded', true);
      closeButton?.setAttribute('aria-expanded', true);
      content?.setAttribute('aria-hidden', false);
      textInput?.focus();
    };

    /**
     * Helper for closing the search keyword element
     *
     */
    const close = () => {
      openButton?.setAttribute('aria-expanded', false);
      closeButton?.setAttribute('aria-expanded', false);
      content?.setAttribute('aria-hidden', true);
      if (textInput) textInput.value = '';
    };

    /**
     * Helper for submitting the keyword
     *
     */
    const submit = () => {
      searchButton?.click();
    };

    // Add event listeners
    openButton?.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });

    closeButton?.addEventListener('click', (event) => {
      event.preventDefault();
      close();
    });

    content?.addEventListener('keydown', (event) => {
      // Escape key
      if (event.keyCode === 27) {
        close();
      }
    });

    textInput?.addEventListener('keydown', (event) => {
      // Return key
      if (event.keyCode === 13) {
        submit();
      }
    });

    // Monitor active element and close the search keyword if search keyword content
    // loses its focus
    document.addEventListener(
      'focus',
      () => {
        if (content?.contains(document.activeElement) === false) close();
      },
      true,
    );
  },
};
