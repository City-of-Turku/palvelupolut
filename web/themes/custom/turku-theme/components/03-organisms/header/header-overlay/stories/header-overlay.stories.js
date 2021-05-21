import React from 'react';
import {
  CollectionWrapper,
  ComponentWrapper,
} from '../../../../storybook/storybook';

import headerOverlayTemplate from './header-overlay.twig';

import menuMainData from '../../../../02-molecules/navigation/menu-main/stories/menu-main.yml';
import languageMenuData from '../../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';

import '../header-overlay';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Header' };

export const headerOverlay = () => (
  <CollectionWrapper>
    <ComponentWrapper
      markup={headerOverlayTemplate({
        ...menuMainData,
        ...languageMenuData,
      })}
      label="Header overlay"
    />
  </CollectionWrapper>
);
