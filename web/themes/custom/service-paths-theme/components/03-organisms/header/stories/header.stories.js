import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import headerTemplate from '../header.twig';

import breadcrumbData from '../../../02-molecules/navigation/breadcrumbs/stories/breadcrumbs.yml';
import mainMenuData from '../../../02-molecules/navigation/menu-main/stories/menu-main.yml';
import languageMenuData from '../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';

import '../../../02-molecules/navigation/menu-main/menu-main';
import '../header';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Header' };

export const header = () => (
  <ComponentWrapper
    markup={headerTemplate({
      ...mainMenuData,
      ...languageMenuData,
      ...breadcrumbData,
    })}
  />
);
