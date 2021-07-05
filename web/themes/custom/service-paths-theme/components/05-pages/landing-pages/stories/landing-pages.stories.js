import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import home from './home.twig';

import languageMenuData from '../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';
import breadcrumbData from '../../../02-molecules/navigation/breadcrumbs/stories/breadcrumbs.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages/Landing Pages' };

export const homePage = () => (
  <ComponentWrapper
    markup={home({
      ...languageMenuData,
      ...breadcrumbData,
    })}
  />
);
