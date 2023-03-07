/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */

(function ($, Drupal) {
  Drupal.behaviors.dialogComponent = {
    attach: function () {
      /**
       * Selectors for all focusable elements
       * @type {string}
       */
      const FOCUSABLE_ELEMENT_SELECTORS =
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';

      const KEY_CODE_MAP = {
        TAB: 9,
      };

      let focusCleanUp;

      /**
       * A stateless keyboard utility to -
       * - Trap focus,
       * - Focus the correct Element
       * @param config {
       *   el: HTMLElement. The Parent element, within which the focus should be trapped
       *   focusElement: <Optional> HTMLElement. If Not provided, focus is put to the first focusable element
       * }
       * @return {Function} Function. The cleanup function. To undo everything done for handling A11Y
       */
      function loopFocus(config) {
        if (!config) {
          throw new Error(
            'Could not initialize focus-trapping - Config Missing',
          );
        }
        const { el } = config;
        const { focusElement } = config;

        if (!el) {
          throw new Error(
            'Could not initialize focus-trapping - Element Missing',
          );
        }

        const focusableElements = el.querySelectorAll(
          FOCUSABLE_ELEMENT_SELECTORS,
        );
        let keyboardHandler;

        // There can be containers without any focusable element.
        if (focusableElements.length > 0) {
          const firstFocusableEl = focusableElements[0];
          const lastFocusableEl =
            focusableElements[focusableElements.length - 1];
          const elementToFocus = focusElement || firstFocusableEl;
          elementToFocus.focus();

          keyboardHandler = function (e) {
            if (e.keyCode === KEY_CODE_MAP.TAB) {
              // Rotate Focus
              if (e.shiftKey && document.activeElement === firstFocusableEl) {
                e.preventDefault();
                lastFocusableEl.focus();
              } else if (
                !e.shiftKey &&
                document.activeElement === lastFocusableEl
              ) {
                e.preventDefault();
                firstFocusableEl.focus();
              }
            }
          };
          el.addEventListener('keydown', keyboardHandler);
        }

        // The cleanup function. Put future cleanup tasks inside this.
        return function cleanUp() {
          if (keyboardHandler) {
            el.removeEventListener('keydown', keyboardHandler);
          }
        };
      }

      /**
       * Register click handlers for dialog links.
       */
      const dialogLinks = $('.dialog__link');
      dialogLinks.once('dialogLinks').each(function () {
        const dialogId = $(this).attr('href');
        const dialog = $(dialogId);

        // Click event listener.
        $(this).on('click', function (e) {
          e.preventDefault();
          dialog.addClass('open');
          focusCleanUp = loopFocus({
            el: dialog[0],
          });
        });
      });

      // Dialog close handler.
      const dialogClose = (dialogElement) => {
        dialogElement.removeClass('open');
        focusCleanUp();
      };

      // Close button click event listener.
      const dialogCloseButtons = $('.dialog__close').find('button');
      dialogCloseButtons.once('dialogCloseButtons').on('click', function (e) {
        const dialog = $(e.target).parents('.dialog');

        // Set focus back to triggering element.
        const trigger = $(`[href="#${dialog.attr('id')}"]`);
        trigger.focus();

        // Close the dialog.
        dialogClose(dialog);
      });

      // Attach listener for clicks outside language switcher.
      $(document)
        .once('dialogs')
        .on('click keydown', function (e) {
          $('.dialog.open').each(function () {
            const dialog = $(this);

            // Detect key presses.
            if (e.key) {
              if (e.key === 'Escape') {
                // Close all dialogs on Esc-key.
                dialogClose(dialog);
              }

              // Do nothing more on key presses.
              return;
            }

            const clickedElement = $(e.target);
            const clickedDialogLinkTarget = clickedElement.hasClass(
              'dialog__link',
            )
              ? $(clickedElement.attr('href'))
              : false;
            const targetId = clickedDialogLinkTarget
              ? clickedDialogLinkTarget.attr('id')
              : false;

            // Close this dialog if:
            // 1. Currently clicked element is not a dialog link that would
            //    open this dialog.
            // 2. Currently clicked element is not inside this dialog.
            if (
              dialog.attr('id') !== targetId &&
              dialog.find(clickedElement).length === 0
            ) {
              dialogClose(dialog);
            }
          });
        });
    },
  };
})(jQuery, Drupal);
