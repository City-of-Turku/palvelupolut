/* eslint-disable no-continue, no-restricted-syntax, no-use-before-define */

Drupal.behaviors.turkuHeaderOverlay = {
  eventHeaderDialogOpened: 'headerDialog:dialogOpened',
  eventHeaderDialogClosed: 'headerDialog:dialogClosed',
  attach(context) {
    const { currentLayout } = Drupal.behaviors.turkuMainMenu;
    const body = context.querySelector('body');
    const headerOverlay = context.querySelector('.header-overlay__dialog');
    const switcher = headerOverlay?.querySelector('.menu-switcher');
    const mainMenu = headerOverlay?.querySelector('.menu-main');
    const extraMenu = headerOverlay?.querySelector('.menu-extra');
    const languageSwitcher = headerOverlay?.querySelector('.language-switcher');
    const focusCatcherBefore = headerOverlay?.querySelector(
      '.header-overlay__catch-focus--before',
    );
    const focusCatcherAfter = headerOverlay?.querySelector(
      '.header-overlay__catch-focus--after',
    );

    if (!switcher) {
      return;
    }

    /**
     * Event handler: closes the dialog when focus moves outside the overlay.
     * @param event
     */
    function handleFocusOutside(event) {
      // The focus has moved somewhere outside the overlay.
      if (!headerOverlay.contains(event.target)) {
        // Close the dialog.
        toggleDialog(true, false);
      }
    }

    /**
     * Toggles the header main menu dialog.
     *
     * @param {boolean|undefined} shouldClose
     *  When true the dialog will close. If undefined the switcher state will
     *  determine whether the dialog will be closed or opened.
     * @param {boolean} shouldReceiveFocus
     *  Indicates whether the switcher should be focused when the overlay is
     *  closed.
     */
    function toggleDialog(shouldClose = undefined, shouldReceiveFocus = true) {
      const isExpanded = switcher.getAttribute('aria-expanded') === 'true';
      const close =
        typeof shouldClose !== 'undefined' ? shouldClose : isExpanded;
      const eventType = close
        ? Drupal.behaviors.wunderHeaderOverlay.eventHeaderDialogClosed
        : Drupal.behaviors.wunderHeaderOverlay.eventHeaderDialogOpened;

      // Toggle the switcher and overlay behavior.
      body.setAttribute('data-header-overlay-expanded', !close);
      switcher.setAttribute('aria-expanded', !close);
      mainMenu.setAttribute('aria-hidden', close);

      // Toggle focus catchers tabindex.
      focusCatcherBefore.setAttribute('tabindex', close ? '-1' : '0');
      focusCatcherAfter.setAttribute('tabindex', close ? '-1' : '0');

      // Dispatch an event to let main menu react.
      const dialogEvent = new Event(eventType, { bubbles: true });
      headerOverlay.dispatchEvent(dialogEvent);

      // Make sure to move focus inside the dialog after it has been toggled.
      if (shouldReceiveFocus) {
        switcher.focus();
      }

      // Catch the focus being moved out of the overlay and close the menu.
      if (!close) {
        body.addEventListener('focusin', handleFocusOutside);
      } else {
        body.removeEventListener('focusin', handleFocusOutside);
      }
    }

    // Toggle the dialog on click.
    switcher.addEventListener('click', () => {
      toggleDialog();
    });

    // Cycle focus back to last link item once the start of the dialog has been
    // reached. E.g, when shift + tab'ing.
    focusCatcherBefore.addEventListener('focus', () => {
      const orderedMenus = [extraMenu, mainMenu];
      if (currentLayout() === 'small') {
        orderedMenus.unshift(languageSwitcher);
      }

      // Loop through the header overlay menus and get the last links of the
      // first matching menu sorted by order.
      for (const menu of orderedMenus) {
        const links = menu.querySelectorAll('a');
        if (!menu || !links) continue;

        // Get the last element of the NodeList.
        const lastLink = links[links.length - 1];
        lastLink?.focus();
        break;
      }
    });

    // Cycle focus back to switcher button once the end of the dialog has been
    // reached.
    focusCatcherAfter.addEventListener('focus', () => {
      switcher.focus();
    });

    // Close dialog on ESC key.
    body.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        // Close the dialog.
        toggleDialog(true);
      }
    });
  },
};
