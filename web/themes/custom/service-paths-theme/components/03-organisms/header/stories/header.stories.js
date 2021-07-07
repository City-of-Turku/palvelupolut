import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import headerTemplate from '../header.twig';

import breadcrumbData from '../../../02-molecules/navigation/breadcrumbs/stories/breadcrumbs.yml';
import languageMenuData from '../../../02-molecules/navigation/language-switcher/stories/language-switcher.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Organisms/Header' };

export const header = () => (
  <ComponentWrapper
    markup={headerTemplate({
      ...languageMenuData,
      ...breadcrumbData,
    })}
  />
);
