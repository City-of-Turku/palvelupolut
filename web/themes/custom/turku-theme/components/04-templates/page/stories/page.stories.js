import React from 'react';
import { ComponentWrapper } from '../../../storybook/storybook';

import pageDefaultTemplate from './page-default.twig';
import pageWideContentTemplate from './page-wide-content.twig';
import pageWithSidebarTemplate from './page-with-sidebar.twig';

import mainMenu from '../../../02-molecules/navigation/menu-main/stories/menu-main.yml';
import socialMenu from '../../../02-molecules/navigation/menu-social/stories/menu-social.yml';

/**
 * Storybook Definition.
 */
export default { title: 'Templates/Layout' };

export const defaultLayout = () => (
  <ComponentWrapper
    markup={pageDefaultTemplate({
      ...mainMenu,
      ...socialMenu,
    })}
  />
);
export const wideContent = () => (
  <ComponentWrapper
    markup={pageWideContentTemplate({
      ...mainMenu,
      ...socialMenu,
    })}
  />
);

export const withSidebar = () => (
  <ComponentWrapper
    markup={pageWithSidebarTemplate({
      ...mainMenu,
      ...socialMenu,
    })}
  />
);
