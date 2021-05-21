Drupal.behaviors.turkuMainMenu = {
  /**
   * Helper for getting the current layout.
   *
   * @return {string}
   *  One of 'xl', 'large' or 'small'.
   */
  currentLayout: () => {
    const width = window.innerWidth;
    if (width >= 1224) {
      return 'xl';
    }
    if (width >= 920) {
      return 'large';
    }
    return 'small';
  },
  debounce: (callback, delay) => {
    delay = delay || 100;
    let timer;
    return (...args) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };
  },
  attach: (context) => {
    const { currentLayout, debounce } = Drupal.behaviors.turkuMainMenu;
    const {
      eventHeaderDialogOpened,
      eventHeaderDialogClosed,
    } = Drupal.behaviors.turkuHeaderOverlay;
    const eventMainLevelChanged = 'mainMenu:mainLevelChanged';
    const spacerElementSelector = '.menu-main__spacer';
    const menuWrapperSelector = '.menu';
    const subMenuWrapperSelector = '.menu--sub';
    const subMenuToggleSelector = '.menu__expand-submenu';
    const subMenuCollapseSelector = '.menu__collapse-submenu';
    const drawerSelector = '.menu__drawer';
    const menuItemSelector = '.menu__item';
    const activeMenuItemSelector = '.menu__item[data-active="true"]';
    const activeLinkSelector = '.menu__link.is-active';
    const menuControlSelector =
      '.menu__link, .menu__expand-submenu, .menu__collapse-submenu';
    const menuToggleSelector = '.menu__expand-submenu, .menu__collapse-submenu';
    const titleSelector = '.menu__parent-title';

    // Get main menu if not initialised. Set initialised class.
    const mainMenu = context.querySelector(
      '.menu-main:not(.menu-main--processed)',
    );

    if (!mainMenu) {
      return;
    }

    const spacerElement = mainMenu.querySelector(spacerElementSelector);
    mainMenu.classList.add('menu-main--processed');

    /**
     * Helper for checking if click event is from keyboard or not.
     *
     * @param {MouseEvent} event
     */
    const isClickKeyboard = (event) =>
      event.screenX === 0 && event.screenY === 0;

    /**
     * Helper for getting the height of an element.
     *
     * @return {int}
     *  The height in pixels.
     */
    const getHeight = (element) => {
      if (element && typeof element.getBoundingClientRect !== 'undefined') {
        const rect = element.getBoundingClientRect();
        return rect.height;
      }
      return 0;
    };

    /**
     * Helper for getting disables-parent setting.
     * @param {HTMLElement} subMenuWrapper
     */
    const getDisablesParent = (subMenuWrapper) => {
      const menuLevel = parseInt(
        subMenuWrapper.getAttribute('data-menu-level'),
        10,
      );
      const disablesParentLevel = 2;

      return menuLevel >= disablesParentLevel;
    };

    /**
     * Helper for enabling or disabling menu items only within a specific
     * submenu. This is used when hiding parent submenu items when a child
     * submenu is opened on top. Otherwise keyboards and screen readers could
     * access invisible menu items behind the active submenu level.
     *
     * @param {HTMLElement} subMenuWrapper
     * @param {int} menuLevel
     * @param {bool} enabled
     */
    const enableSubItems = (subMenuWrapper, menuLevel, enabled) => {
      const levelSelector = `[data-menu-level="${menuLevel}"]`;
      const selector = `
        .menu__link${levelSelector},
        .menu__expand-submenu${levelSelector},
        .menu__collapse-submenu${levelSelector}
      `;
      const childTitleSelector = `
        .menu--sub${levelSelector} > ${titleSelector}
      `;

      const menuControls = subMenuWrapper.querySelectorAll(selector);
      const title = subMenuWrapper.parentElement.querySelector(
        childTitleSelector,
      );

      menuControls.forEach((menuControl) => {
        // Top level menu items should be reachable and focusable. However on
        // mobile layout they are visually hidden and should not accessible
        // by screenreaders or keyboard.
        if (menuLevel === 1 && currentLayout() !== 'small') {
          return;
        }
        menuControl.setAttribute('aria-hidden', !enabled);
        menuControl.setAttribute('tabindex', enabled ? 0 : -1);
      });

      if (title) {
        title.setAttribute('aria-hidden', !enabled);
      }
    };

    /**
     * Helper for activating a specific submenu. Also disables parent menu
     * for keyboard and screen reader support. Sets main submenu spacer
     * height to fit the child submenu.
     *
     * @param {HTMLElement} subMenuWrapper
     *  The menu wrapper element that needs to be toggled.
     * @param {bool} expand
     *  Indicates whether the submenu should be expanded.
     */
    const toggleSubMenu = (subMenuWrapper, expand) => {
      const parentSubMenuWrapper = subMenuWrapper.parentElement.closest(
        menuWrapperSelector,
      );
      const drawer = subMenuWrapper.closest(drawerSelector);
      const menuItem = subMenuWrapper.closest(menuItemSelector);
      const titleElement = drawer.querySelector(titleSelector);
      const quickLinks = drawer.querySelector('.menu__quick-links');
      let spacerHeight;
      let quickLinkMinHeight;
      let menuPadding;

      if (!menuItem) {
        return;
      }

      const subMenuToggle = menuItem.querySelector(subMenuToggleSelector);

      // Get settings.
      const menuLevel =
        parseInt(subMenuWrapper.getAttribute('data-menu-level'), 10) || 0;
      const disablesParent = getDisablesParent(subMenuWrapper);

      // Set submenu wrapper and toggle state for assistive technologies.
      subMenuWrapper.setAttribute('aria-hidden', !expand);
      subMenuToggle.setAttribute('aria-expanded', expand);

      // Mark active menu items.
      menuItem.setAttribute('data-active', expand);

      // Set a helpful data attribute to parent submenu wrapper.
      parentSubMenuWrapper.setAttribute('data-child-sub-expanded', expand);

      // Enable menu items as they may have been disabled by child submenu.
      enableSubItems(subMenuWrapper, menuLevel, true);

      // Disable parent menu if needed for this menu level. This is for
      // keyboard and screen reader support so focus doesn't get lost in
      // menu items covered by the submenu.
      if (disablesParent) {
        enableSubItems(parentSubMenuWrapper, menuLevel - 1, !expand);
      }

      // Toggle the drawer if the submenu to be toggled is the first menu just
      // below the top submenu.
      if (drawer && menuLevel === 2) {
        drawer.setAttribute('aria-hidden', !expand);
      }

      // Collapse child submenus inside the submenu being expanded.
      subMenuWrapper
        .querySelectorAll(menuWrapperSelector)
        .forEach((childSubMenuWrapper) => {
          toggleSubMenu(childSubMenuWrapper, false);
        });

      if (spacerElement) {
        // Set mainSubMenu height to match active submenu.
        const subMenuHeight = getHeight(subMenuWrapper);
        const quickLinksHeight = getHeight(quickLinks);
        const baseHeight = Math.max(subMenuHeight, quickLinksHeight);
        const titleHeight = getHeight(titleElement);
        const drawerPadding = 100;

        switch (currentLayout()) {
          case 'xl':
            spacerHeight = `${baseHeight + titleHeight + drawerPadding}px`;
            quickLinkMinHeight = `${subMenuHeight}px`;
            menuPadding = 0;
            break;
          case 'large':
            spacerHeight = `${
              subMenuHeight + quickLinksHeight + titleHeight + drawerPadding
            }px`;
            quickLinkMinHeight = 0;
            menuPadding = 0;
            break;
          default:
            spacerHeight = `${subMenuHeight + titleHeight}px`;
            quickLinkMinHeight = 0;
            menuPadding = `${quickLinksHeight}px`;
        }
        spacerElement.style.height = spacerHeight;

        // Add space underneath the menu to accomodate Quick links on small
        // viewports.
        mainMenu.style.marginBottom = menuPadding;

        if (quickLinks) {
          // Make the Quick links height match that of the submenu.
          quickLinks.style.minHeight = quickLinkMinHeight;
        }
      }
    };

    /**
     * Helper for moving between submenu levels. Decides which menu to toggle:
     * opens parent submenu when moving up a level.
     * Sets focus on the relevant controls.
     *
     * @param {HTMLElement} menuItem
     * @param {bool} expand
     *   Indicates whether to expand or collapse the submenu.
     * @param {bool} handleFocus
     */
    const switchSubMenu = (menuItem, expand, handleFocus) => {
      const subMenuWrapper = menuItem.querySelector(menuWrapperSelector);
      const parentSubMenuWrapper = menuItem.closest(menuWrapperSelector);

      // Store first relevant control so it can be focused after submenus have
      // been toggled.
      let firstControl;

      // When expanding, always expand child submenu.
      // When closing, differentiate between nested and root submenus:
      //  - For nested menus toggle parent which also collapses child submenus
      //    inside it. This way parent is prepared correctly when closing its
      //    child submenu.
      //  - Root menu item closes child submenu instead as it doesn't have a
      //    parent to prepare.
      if (expand) {
        toggleSubMenu(subMenuWrapper, true);
        firstControl = subMenuWrapper.querySelector(menuControlSelector);
      }
      // Closing nested menu: toggle parent.
      else if (
        parentSubMenuWrapper &&
        getDisablesParent(parentSubMenuWrapper)
      ) {
        toggleSubMenu(parentSubMenuWrapper, true);
        firstControl = menuItem.querySelector(menuToggleSelector);
      }
      // Closing root menu: close child submenu.
      else {
        toggleSubMenu(subMenuWrapper, false);
        firstControl = menuItem.querySelector(menuToggleSelector);
      }

      if (handleFocus && firstControl) {
        // Move focus to first control.
        firstControl.focus({ preventScroll: true });
      }
    };

    /**
     * Close all submenus and remove height from spacer element.
     */
    const closeMenu = () => {
      // Close all submenus that might be open.
      mainMenu
        .querySelectorAll(subMenuWrapperSelector)
        .forEach((subMenuWrapper) => {
          toggleSubMenu(subMenuWrapper, false);
        });
      // Reset spacer height.
      spacerElement.style.height = 0;
    };

    // Get all sub toggles and add behavior.
    const subToggles = mainMenu.querySelectorAll(subMenuToggleSelector);
    subToggles.forEach((subToggle) => {
      const subMenuWrapper = subToggle.closest(menuWrapperSelector);
      const menuLevel =
        parseInt(subMenuWrapper.getAttribute('data-menu-level'), 10) || 1;
      const menuItem = subToggle.closest(menuItemSelector);

      subToggle.addEventListener('click', (event) => {
        const isExpanded = subToggle.getAttribute('aria-expanded') === 'true';

        // Handle first level change.
        if (menuLevel === 1) {
          const mainMenuMainLevelChanged = new Event(eventMainLevelChanged);
          mainMenu.dispatchEvent(mainMenuMainLevelChanged);
        }

        switchSubMenu(menuItem, !isExpanded, isClickKeyboard(event));
      });
    });

    // Get all sub collapse buttons and add behavior.
    const subCollapses = mainMenu.querySelectorAll(subMenuCollapseSelector);
    subCollapses.forEach((subCollapse) => {
      const subMenuWrapper = subCollapse.closest(menuWrapperSelector);
      let parentMenuItem = subMenuWrapper.closest(menuItemSelector);

      // The markup for mobile sub collapses is different: the parent menu
      // item is just one level above them.
      if (subCollapse.matches(`${subMenuCollapseSelector}--mobile`)) {
        parentMenuItem = subCollapse.closest(menuItemSelector);
      }

      subCollapse.addEventListener('click', (event) => {
        switchSubMenu(parentMenuItem, false, isClickKeyboard(event));
      });
    });

    // Close submenu on esc. Depends on event bubbling from child to parent
    // so it starts by closing the deepest level first.
    const subMenuWrappers = mainMenu.querySelectorAll(menuWrapperSelector);
    subMenuWrappers.forEach((subMenuWrapper) => {
      subMenuWrapper.addEventListener('keydown', (event) => {
        // Check if 1. esc is pressed, 2. wrapper is not hidden, 3. wrapper
        // has parent wrapper i.e. isn't the root wrapper.

        if (
          event.keyCode === 27 &&
          subMenuWrapper.getAttribute('aria-hidden') === 'false' &&
          subMenuWrapper.parentElement.closest(menuWrapperSelector)
        ) {
          event.stopPropagation();

          // Find and collapse parent menu item.
          const parentMenuItem = subMenuWrapper.parentElement.closest(
            menuItemSelector,
          );
          switchSubMenu(parentMenuItem, false, true);
        }
      });
    });

    // Close main level on esc. This is to catch esc outside submenu wrappers.
    mainMenu.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) {
        const mainMenuMainLevelChanged = new Event(eventMainLevelChanged);
        mainMenu.dispatchEvent(mainMenuMainLevelChanged);
      }
    });

    // Handle main level change. Closes other main level submenus.
    mainMenu.addEventListener(eventMainLevelChanged, closeMenu);

    // Close submenus on Header dialog close event.
    document.addEventListener(eventHeaderDialogClosed, closeMenu);

    // Initialise menu by opening the sub-menu of the currently active page on
    // dialog open.
    document.addEventListener(eventHeaderDialogOpened, () => {
      if (currentLayout() !== 'small') {
        const activeLink = mainMenu.querySelector(activeLinkSelector);

        if (!activeLink) return;

        // Follow the currently active page up until the top menu and create
        // an active trail array with submenu toggles of each menu level.
        const activeTrail = [];
        let subMenu = activeLink.closest(menuWrapperSelector);
        let subMenuWrapper = subMenu?.closest(menuItemSelector);
        let menuToggle = subMenuWrapper?.querySelector(subMenuToggleSelector);

        while (menuToggle) {
          activeTrail.unshift(menuToggle);
          subMenu = menuToggle.closest(menuWrapperSelector);
          subMenuWrapper = subMenu?.closest(menuItemSelector);
          menuToggle = subMenuWrapper?.querySelector(subMenuToggleSelector);
        }

        // The currently active page is a top level link without a parent. If
        // it has a submenu expand that.
        if (activeTrail.length === 0) {
          const linkWrapper = activeLink.closest(menuItemSelector);
          const toggle = linkWrapper?.querySelector(subMenuToggleSelector);
          toggle?.click();
        }
        // Follow the active trail and expand all of it's submenus until the
        // active menu item is reached.
        else {
          activeTrail.forEach((ancestor) => {
            ancestor?.click();
          });
        }
      }
    });

    // Reset the menu layout on viewport resize events.
    window.addEventListener(
      'resize',
      debounce(() => {
        const menuIsClosed = mainMenu.getAttribute('aria-hidden') === 'true';
        if (menuIsClosed) {
          return;
        }

        // Get the currently open submenu by finding the deepest currently
        // active menu item.
        const activeMenuItems = mainMenu.querySelectorAll(
          activeMenuItemSelector,
        );
        // The last active menu item should be the deepest nested menu item.
        const deepestMenuItem = activeMenuItems[activeMenuItems.length - 1];
        const activeSubMenu = deepestMenuItem?.querySelector(
          menuWrapperSelector,
        );

        if (activeSubMenu) {
          toggleSubMenu(activeSubMenu, true);
        }
      }, 200),
    );
  },
};
