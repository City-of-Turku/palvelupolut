import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import '../../../02-molecules/navigation/menu-main/menu-main';

import articleTemplate from './article.twig';

import mainMenuData from '../../../02-molecules/navigation/menu-main/stories/menu-main.yml';
import languageMenuData from '../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';
import breadcrumbData from '../../../02-molecules/navigation/breadcrumbs/stories/breadcrumbs.yml';
import socialMenuData from '../../../02-molecules/navigation/menu-social/stories/menu-social.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Pages/Content Types' };

export const article = () => (
  <ComponentWrapper
    markup={articleTemplate({
      ...mainMenuData,
      ...languageMenuData,
      ...breadcrumbData,
      ...socialMenuData,
    })}
  />
);
