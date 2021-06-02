import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import '../../../02-molecules/navigation/menu-main/menu-main';

import home from './home.twig';

import mainMenuData from '../../../02-molecules/navigation/menu-main/stories/menu-main.yml';
import languageMenuData from '../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';
import breadcrumbData from '../../../02-molecules/navigation/breadcrumbs/stories/breadcrumbs.yml';
import socialMenuData from '../../../02-molecules/navigation/menu-social/stories/menu-social.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages/Landing Pages' };

export const homePage = () => (
  <ComponentWrapper
    markup={home({
      ...mainMenuData,
      ...languageMenuData,
      ...breadcrumbData,
      ...socialMenuData,
    })}
  />
);
